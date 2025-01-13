import { getDatabase, ref, set, get, child } from "firebase/database";
import app from "../config/firebaseConfig";

/**
 * Function that takes a foodItem and adds it to the fridge.
 * If the item already exists in the fridge, it will update the quantity.
 * see https://firebase.google.com/docs/database/web/read-and-write#write_data
 * and https://firebase.google.com/docs/database/web/read-and-write#read_data_once
 */
export default function AddToFridge(foodItem) {
  //assigns properties to those of foodItem. Deals with if a property is empty (undefined)
  const id = foodItem["productId"];
  const productName = handleUndefined(foodItem, "name");
  const itemSize = handleUndefined(foodItem, "size");
  const ingredients = handleUndefined(foodItem, "ingredients");
  const allergens = handleUndefined(foodItem, "allergens");
  const traces = handleUndefined(foodItem, "traces");
  const image = handleUndefined(foodItem, "image");
  const keywords = handleUndefined(foodItem, "keywords");

  //get reference to database and productId
  const dbRef = ref(getDatabase(app));
  const productRef = child(dbRef, "product/" + id);

  //check if the productId is already in the fridge database
  get(productRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        //if the product exists, update the quantity
        const existingProduct = snapshot.val();

        /**
         * "Many" is used for items that the user can't count e.g. a large box of loose carrots.
         * if the item being added has a quantity of "many", display "many"
         * Similarly, if an existing item has a quantity of "many", keep displaying "many"
         * If quantity < 10 and item being added quantity < 10, sum the total quantity
         */
        const newQuantity =
          String(foodItem.quantity).toLowerCase() === "many"
            ? "Many"
            : String(existingProduct.quantity).toLowerCase() === "many"
            ? "Many"
            : existingProduct.quantity + foodItem.quantity;

        set(productRef, {
          name: productName,
          quantity: newQuantity,
          size: itemSize,
          ingredients,
          allergens,
          traces,
          image,
          keywords,
        });
      } else {
        //if this product is not in the fridge, add it

        set(productRef, {
          name: productName,
          quantity: foodItem.quantity,
          size: itemSize,
          ingredients,
          allergens,
          traces,
          image,
          keywords,
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * In some cases, the data about a product from OpenFoodFacts may be partially complete.
 * This should not stop the program, as users are given the option to fill in missing details.
 * What's more, some details e.g. keywords are not required for an item to be donated.
 * @returns a generic food image if the image doesn't exist
 * @returns an empty string if any other property is incomplete
 */
function handleUndefined(foodItem, property) {
  if (property === "image") {
    return foodItem[property] === undefined
      ? "QUESTION MARK"
      : foodItem[property];
  }
  return foodItem[property] === undefined ? "" : foodItem[property];
}
