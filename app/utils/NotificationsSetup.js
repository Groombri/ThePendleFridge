import * as Notifications from "expo-notifications";
import handleSettingChange from "./UpdateSettings";
import { Alert } from "react-native";

/**
 * Upon first instance, gets permissions from user to send push notifications
 */
export const getNotificationPermissions = async () => {
  //get existing status of notification permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  //if permissions are currently not granted, request them
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();

    //if new request was denied
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Please grant permission to receive notifications."
      );
    }
  }

  //if permissions granted, assign user a notification token
  const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
  handleSettingChange("pushToken", pushToken);
};
