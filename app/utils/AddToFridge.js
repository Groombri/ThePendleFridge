import { getDatabase, ref, set} from "firebase/database";
import app from "../config/firebaseConfig";

export default function AddToFridge(id, productName, itemSize, ingredients, allergens, traces, image, keywords) {

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