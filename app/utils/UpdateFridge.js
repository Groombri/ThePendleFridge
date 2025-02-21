import {
  getDatabase,
  ref,
  get,
  child,
  remove,
  update,
} from "firebase/database";
import app from "../config/firebaseConfig";

/**
 * Function that updates the quantity of a food item in the fridge.
 * When the user takes a certain quantity of an item, this will be updated.
 * see https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data
 */
export default async function UpdateFridge(id, quantityTaken) {
  try {
    //get reference to database and productId
    const dbRef = ref(getDatabase(app));
    const productRef = child(dbRef, "product/" + id);

    //check if the productId is already in the fridge database
    const snapshot = await get(productRef);

    if (snapshot.exists()) {
      const existingProduct = snapshot.val();

      //if user decided to take the whole stock of an item, remove it from the fridge
      if (
        quantityTaken === "Take all remaining" ||
        quantityTaken >= existingProduct.quantity
      ) {
        remove(productRef);
      } else if (quantityTaken === "Take some") {
        //in case of take "some" from uncountable item, do nothing
      }
      //if user decided to take only some of the item, update its quantity
      else if (quantityTaken < existingProduct.quantity) {
        const newQuantity = existingProduct.quantity - quantityTaken;

        update(productRef, {
          quantity: newQuantity,
        });
      }
    } else {
      //if this product is not in the fridge, error
      console.error("Could not find selected product in the fridge");
    }
  } catch (error) {
    console.error("Error updating fridge: ", error);
  }
}
