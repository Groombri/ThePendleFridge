import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Alert } from "react-native";
import handleSettingChange from "../utils/UpdateSettings";

//geofence task name
const TASK = "check-if-on-campus";

//define campus geofence boundaries
const CAMPUS = [
  {
    identifier: "Lancaster University Campus",
    latitude: 54.008857,
    longitude: -2.785493,
    radius: 800,
  },
];

//FOR TESTING: define home geofence
const HOME = [
  {
    identifier: "Home",
    latitude: 54.038622,
    longitude: -2.793364,
    radius: 800,
  },
];

TaskManager.defineTask(TASK, ({ data: { eventType, region }, error }) => {
  if (error) {
    console.error(error);
    return;
  }

  const userOnCampus = eventType === Location.GeofencingEventType.Enter;
  handleSettingChange("isOnCampus", userOnCampus);
});

export const startLocationCheck = async () => {
  //request permissions
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  console.log("Foreground Permission Status:", foregroundStatus);

  if (foregroundStatus !== "granted") {
    Alert.alert(
      "Permission denied",
      "Please grant permission to access foreground location."
    );
    return;
  }

  try {
    console.log("awaiting request for background...");
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    console.log("Background Permission Status:", backgroundStatus);

    if (backgroundStatus !== "granted") {
      Alert.alert(
        "Permission denied",
        "Please grant permission to access background location."
      );
      return;
    }

    await Location.startGeofencingAsync(TASK, HOME);
    console.log("Geofencing started");
  } catch (error) {
    console.error(error);
  }
};

export const stopLocationCheck = async () => {
  await Location.stopGeofencingAsync(TASK);
  console.log("geofencing stopped");
};
