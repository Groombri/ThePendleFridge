import { getDatabase, ref, onValue } from "firebase/database";
import app from "../config/firebaseConfig";

/**
 * Reads the fridge's contents.
 * Async data handled with callback, if the fridge is populated,
 * the callback will handle the data.
 * @param {*} onData the callback function to handle the data
 * see https://firebase.google.com/docs/database/web/read-and-write#read_data
 */
export default function ReadFridge(onData) {
  const db = getDatabase(app);
  const productRef = ref(db, "product/");
  onValue(
    productRef,
    (snapshot) => {
      const data = snapshot.val();
      onData(data);
    },
    (error) => {
      console.error(error);
      onData(null);
    }
  );
}
