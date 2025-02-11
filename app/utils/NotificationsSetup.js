import * as Notifications from "expo-notifications";
import handleSettingChange from "./UpdateSettings";
import { Alert } from "react-native";

export const getNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Permission denied",
      "Please grant permission to receive notifications."
    );
  }

  const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
  handleSettingChange("pushToken", pushToken);
};
