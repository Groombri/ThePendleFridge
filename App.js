import { SafeAreaView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './app/screens/HomeScreen';
import BarcodeScannerScreen from './app/screens/BarcodeScannerScreen';
import DrawerNav from "./app/components/DrawerNav";
import SafeViewAndroid from "./app/styles/SafeViewAndroid";
import NotificationsScreen from './app/screens/NotificationsScreen';

const Stack = createStackNavigator();

/**
 * The Pendle fridge app driver. Ensures that all contents are contained within a custom SafeAreaView.
 * @returns the navigation stack to navigate between each screen.
 */
export default function App() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DrawerNav" screenOptions={{headerShown: false}}>
          <Stack.Screen name="DrawerNav" component={DrawerNav} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


