import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";

//import all screens
import HomeScreen from "../screens/HomeScreen";
import HelpScreen from "../screens/HelpScreen";
import AboutScreen from "../screens/AboutScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={screenOptions}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Help" component={HelpScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = ({ route }) => ({
    headerShown: false,
    drawerActiveTintColor: "#333",
    drawerActiveBackgroundColor: "lightgreen",
    drawerContentStyle: {
        backgroundColor: "white",
    },
    drawerLabelStyle: {
        fontFamily: "Poppins",
        fontSize: 29,
        fontWeight: "bold",
        color: "black",
        marginLeft: 15,
        paddingTop: 32,
        paddingBottom: 20,
    },
    drawerIcon: ({ color, size }) => {
      if (route.name === 'Home') {
        return <Entypo name="home" color={iconCol} size={iconSize} />;
      }
      if (route.name === 'Help') {
        return <AntDesign name="questioncircle" size={iconSize} color={iconCol} />;
      }
      if (route.name === 'About') {
        //return <Ionicons name="information-circle-sharp" size={iconSize} color={iconCol} />; //for some reason this icon was smaller
        return <AntDesign name="questioncircle" size={iconSize} color={iconCol} />;
      }
      if (route.name === 'Notifications') {
        return <Entypo name="bell" size={iconSize} color={iconCol} />;
      }
    },
});

const iconSize = 32;
const iconCol = "darkgreen"; 

export default DrawerNav;
