import { getDatabase, ref, set, get } from "firebase/database";
import app from "../config/firebaseConfig";

/**
 * 
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

    //if item is already in fridge
    //increase item quantity by entered quantity
    //increase fridge quantity
    
    //if item not in fridge
    //adds item to fridge
    const db = getDatabase(app);
    const productRef = ref(db, 'product/' + id);

    get(productRef).then((snapshot) => {
        if(snapshot.exists()) {
            console.log("EXISTING PRODUCT!");
            
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
        else {
            console.log("NEW PRODUCT!");

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


    console.log("Add to fridge successful!");
}