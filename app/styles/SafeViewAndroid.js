import { StyleSheet, Platform, StatusBar } from "react-native";

/**
 * As <SafeAreaView> does not work for Android devices, to ensure that screen contents are not hidden
 * e.g. by camera, this calculates the SafeAreaView for an android device, based on the size of its S-Bar
 */
export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "green",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});