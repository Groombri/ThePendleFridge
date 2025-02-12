import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotificationsScreen from "../screens/NotificationsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import CustomHeader from "./CustomHeader";
import { View } from "react-native";
import TextStyles from "../styles/TextStyles";

const Tab = createMaterialTopTabNavigator();

/**
 * A tab navigator for navigating between the NotificationsScreen and the SettingsScreen.
 */
export default function TabNav({ notifications }) {
  return (
    <View style={DefaultPageStyle.container}>
      <CustomHeader title="Notifications" />
      <View style={DefaultPageStyle.body}>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="My Notifications">
            {() => <NotificationsScreen notifications={notifications} />}
          </Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const screenOptions = () => ({
  swipeEnabled: false,
  tabBarStyle: { backgroundColor: "white" },
  tabBarLabelStyle: TextStyles.bodyMain,
  tabBarIndicatorStyle: { backgroundColor: "green", height: 3 },
});
