import { firestore } from "../config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as Device from "expo-device";

/**
 * Updates a user setting in the user database when changed
 */
export default async function ReadSettings(settingName) {
  const userId = Device.osBuildId; //get unique device id
  const userRef = doc(firestore, "users", userId); //get user reference from database

  try {
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return data[settingName] || null;
    } else {
      console.log("setting not found");
      return null;
    }
  } catch (error) {
    console.error("Error updating settings: ", error);
    return null;
  }
}
