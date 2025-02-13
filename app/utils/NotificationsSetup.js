import * as Notifications from "expo-notifications";
import handleSettingChange from "./UpdateSettings";
import { Alert } from "react-native";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_LISTENER = "BACKGROUND_NOTIFICATION_LISTENER";

TaskManager.defineTask(BACKGROUND_LISTENER, async ({ data, error }) => {
  console.log("TASK ACTIVATED");
  if (error) {
    console.error("Notification task error:", error);
    return;
  }

  if (data) {
    //if android format is undefined, then format for ios
    const dataContent =
      data.data === undefined ? data.body : JSON.parse(data.data.body);
    const { productName, date, productImage } = dataContent;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New product added 🔔", // Title for the notification
        body: `${productName} has been added to the fridge!`, // Body of the notification
        data: { productName, date, productImage }, // Data to be used by the app
      },
      trigger: null,
      content_available: true,
    });
  }
});

/**
 * Upon first instance, gets permissions from user to send push notifications
 */
export const getNotificationPermissions = async () => {
  try {
    //get existing status of notification permissions
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

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
    await handleSettingChange("pushToken", pushToken);

    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_LISTENER
    );
    if (!isRegistered) {
      await Notifications.registerTaskAsync(BACKGROUND_LISTENER);
      console.log("Background notification task registered");
    } else {
      console.log("Background notification task already registered");
    }
  } catch (error) {
    console.error("Error getting notification permissions:", error);
  }
};
