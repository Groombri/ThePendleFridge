import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./app/components/DrawerNav";
import SafeViewAndroid from "./app/styles/SafeViewAndroid";

/**
 * The Pendle fridge app driver. Ensures that all contents are contained within a custom SafeAreaView.
 * @returns the screen navigation handler <DrawerNav> within a navigation container and SafeAreaView.
 */
export default function App() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    </SafeAreaView>
  );
}


