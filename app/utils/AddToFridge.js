import { getDatabase, ref, set, get, child } from "firebase/database";
import app from "../config/firebaseConfig";

/**
 * Function that takes a foodItem and adds it to the fridge.
 * If the item already exists in the fridge, it will update the quantity.
 * see https://firebase.google.com/docs/database/web/read-and-write#write_data
 * and https://firebase.google.com/docs/database/web/read-and-write#read_data_once
 */
export default function AddToFridge(foodItem) {

    const id = foodItem["productId"];
    const productName = foodItem["name"];
    const itemSize = foodItem["size"];
    const ingredients = foodItem["ingredients"];
    const allergens = foodItem["allergens"];
    const traces = foodItem["traces"];
    const image = foodItem["image"];
    const keywords = foodItem["keywords"];

    //get reference to database and productId
    const dbRef = ref(getDatabase(app));
    const productRef = child(dbRef, 'product/' + id);

    //check if the productId is already in the fridge database
    get(productRef).then((snapshot) => {
        if(snapshot.exists()) {
            
            //if the product exists, update the quantity
            const existingProduct = snapshot.val();
            const newQuantity = existingProduct.quantity + 1;

            set(productRef, {
                name: productName,
                quantity: newQuantity,
                size: itemSize,
                ingredients,
                allergens,
                traces,
                image,
                keywords
            });
        }
        else { //if this product is not in the fridge, add it
            
            set(productRef, {
                name: productName,
                quantity: 1,
                size: itemSize,
                ingredients,
                allergens,
                traces,
                image,
                keywords
            });
        }
    }).catch((error) => {
        console.error(error);
    });
}