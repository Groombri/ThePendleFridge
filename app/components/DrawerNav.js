import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Entypo, AntDesign } from "@expo/vector-icons";

//import all screens
import HomeScreen from "../screens/HomeScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
import HelpScreen from "../screens/HelpScreen";
import AboutScreen from "../screens/AboutScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="How to use" component={HelpScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen 
        name="BarcodeScanner" 
        component={BarcodeScannerScreen} 
        options={{drawerItemStyle: {display: "none"}}} //makes sure screen doesn't appear on drawer nav
      />
    </Drawer.Navigator>
  );
}

const screenOptions = ({ route }) => ({
    headerShown: false,
    drawerActiveTintColor: "white",
    drawerInactiveTintColor: "#333",
    drawerActiveBackgroundColor: "green",
    drawerItemStyle: {
      borderRadius: 5,
    },
    drawerContentStyle: {
        backgroundColor: "white",
    },
    drawerLabelStyle: {
        alignItems: "center",
        fontFamily: "Poppins",
        fontSize: 20,
        marginLeft: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    drawerIcon: ({ color }) => {
      if (route.name === 'Home') {
        return <Entypo name="home" size={iconSize} color={color} />;
      }
      if (route.name === 'How to use') {
        return <AntDesign name="questioncircle" size={iconSize} color={color} />;
      }
      if (route.name === 'About') {
        return <AntDesign name="infocirlce" size={iconSize} color={color} />
      }
      if (route.name === 'Notifications') {
        return <Entypo name="bell" size={iconSize} color={color} />;
      }
    },
});

const iconSize = 30; 

export default DrawerNav;
