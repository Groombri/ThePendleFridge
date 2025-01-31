import { View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./app/components/DrawerNav";
import SafeViewAndroid from "./app/styles/SafeViewAndroid";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import AddNewUser from "./app/utils/AddNewUser";

/**
 * The Pendle fridge app driver. Ensures that all contents are contained within a custom SafeAreaView.
 * @returns the screen navigation handler <DrawerNav> within a navigation container and SafeAreaView.
 */
export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    AddNewUser();
  });

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      </SafeAreaView>
      <View style={{ backgroundColor: "transparent", height: 34 }} />
    </View>
  );
}
