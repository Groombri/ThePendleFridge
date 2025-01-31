import { firestore } from "../config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import * as Device from "expo-device";

/**
 * Updates a user setting in the user database when changed
 */
export default async function UpdateSettings(settingName, value) {
  const userId = Device.osBuildId; //get unique device id
  const userRef = doc(firestore, "users", userId); //get user reference from database

  try {
    await updateDoc(userRef, { [settingName]: value });
    console.log(`${settingName} updated successfully`);
  } catch (error) {
    console.error("Error updating settings: ", error);
  }
}
