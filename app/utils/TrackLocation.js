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

/**
 * The task to be carried out when there is a geofencing location event.
 * In this case, it checks the users location and updates the isOnCampus field in the
 * database to if they are on campus or not.
 */
TaskManager.defineTask(TASK, ({ data: { eventType, region }, error }) => {
  if (error) {
    console.error(error);
    return;
  }

  if (eventType === Location.GeofencingRegionState.Inside) {
    handleSettingChange("isOnCampus", true);
  } else if (eventType === Location.GeofencingRegionState.Outside) {
    handleSettingChange("isOnCampus", false);
  }
});

//starts location tracking
export const startLocationCheck = async () => {
  //upon first instance, location permissions are needed
  try {
    //get foreground location permissions
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

    console.log("awaiting request for background...");

    //get background location permissions
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

    //if permissions have been granted, start checking whether user is on campus
    await Location.startGeofencingAsync(TASK, CAMPUS, {
      accuracy: Location.Accuracy.High,
    });
    console.log("Geofencing started");
  } catch (error) {
    console.error(error);
  }
};

//stops checking the users location
export const stopLocationCheck = async () => {
  await Location.stopGeofencingAsync(TASK);
  console.log("Geofencing stopped");
};
