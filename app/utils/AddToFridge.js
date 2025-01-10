import { getDatabase, ref, set} from "firebase/database";
import app from "../config/firebaseConfig";

/**
 * 
 * see https://firebase.google.com/docs/database/web/read-and-write#write_data
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
    set(ref(db, 'product/' + id), {
        name: productName,
        quantity: 1,
        size: itemSize,
        ingredients,
        allergens,
        traces,
        image,
        keywords
    });

    console.log("Add to fridge successful!");
}