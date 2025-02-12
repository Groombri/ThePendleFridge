import { View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./app/components/DrawerNav";
import SafeViewAndroid from "./app/styles/SafeViewAndroid";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef, useState } from "react";
import AddNewUser from "./app/utils/AddNewUser";
import * as Notifications from "expo-notifications";
import ReadSettings from "./app/utils/ReadSettings";
import { startLocationCheck } from "./app/utils/TrackLocation";
import NotificationsScreen from "./app/screens/NotificationsScreen";

/**
 * The Pendle fridge app driver. Ensures that all contents are contained within a custom SafeAreaView.
 * Handles initiation and listens for notifications.
 * @returns the screen navigation handler <DrawerNav> within a navigation container and SafeAreaView.
 */
export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notifications, setNotifications] = useState([]);

  //things to initialise upon opening the app
  useEffect(() => {
    async function init() {
      //locks the screen orientation
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );

      //checks if the device is new, if so create new user
      await AddNewUser();

      //checks if campus notifications are enabled, if so monitor the users location
      const campusEnabled = await ReadSettings("campusNotificationsEnabled");
      if (campusEnabled) {
        startLocationCheck();
      }
    }

    //initialise user
    init();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotifications([...notifications, notification]);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User Tapped Notification:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <NavigationContainer>
          <DrawerNav notifications={notifications} />
        </NavigationContainer>
      </SafeAreaView>
      <View style={{ backgroundColor: "transparent", height: 34 }} />
    </View>
  );
}
