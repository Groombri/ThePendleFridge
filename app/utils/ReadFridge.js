import { getDatabase, ref, child, get } from "firebase/database";

export default function ReadFridge() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'product/')).then((snapshot) => {
        if(snapshot.exists()) {
            console.log(snapshot.val());
        } 
        else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

