import { React, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import TextStyles from "../styles/TextStyles";
import ReadFridge from "../utils/ReadFridge";
import ItemInfoModal from "../components/ItemInfoModal";
import { RefreshControl } from "react-native-gesture-handler";
import Accordion from "../components/Accordion";
import YellowButton from "../components/YellowButton";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

/**
 * The application's home screen. This includes the apps custom header + donate an item button.
 * The body contains the current inventory of the fridge.
 * @param {*} navigation ...
 * @returns the contents of the Home Screen, initially as the initialRoute in the Drawer Navigator.
 */
function HomeScreen({ navigation, route }) {
  const [scannedItem, setScannedItem] = useState(null); //stores an item that has been scanned
  const [isItemInfoModalVisible, setItemInfoModalVisible] = useState(false); //the modal that displays the info of the scannedItem
  const [refreshing, setRefreshing] = useState(false);
  const [fridgeContents, setFridgeContents] = useState(null); //fridge contents are set to null by default
  const [loadingContents, setLoadingContents] = useState(true); //loads fridge contents from start

  //Read the fridges contents when HomeScreen mounts
  useEffect(() => {
    //if a scanned item has been passed into the home screen, store the item and display modal
    if (route.params?.scannedItem) {
      //optional chaining (?.) returns undefined if obj is undefined or null, instead of error
      setScannedItem(route.params.scannedItem);
      setItemInfoModalVisible(true);
    }

    ReadFridge((data) => {
      if (data) {
        setFridgeContents(data);
      } else {
        console.log("NO data or ERROR");
        setFridgeContents(null);
      }
      //once contents have been loaded, set loading to false
      setLoadingContents(false);
    });
  }, [route.params]);

  //https://reactnative.dev/docs/refreshcontrol
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  //if contents are loading whilst user is in the screen, display message to let them know
  const loading = (
    <View style={styles.container}>
      <View style={styles.loading}>
        <ActivityIndicator size="large" style={{ margin: 10 }} />
        <Text style={TextStyles.bodyMain}>Loading fridge contents...</Text>
      </View>
    </View>
  );

  //if the fridge is empty, display message in the body's <ScrollView>
  const fridgeEmptyContent = (
    <>
      <Image
        style={styles.empty_icon}
        source={require("../assets/images/empty.png")}
      />
      <Text style={TextStyles.bodyMain}>
        It looks like there's no food in at the moment...
      </Text>
      <TouchableOpacity
        navigation={navigation}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Text style={TextStyles.link}>Configure notification settings</Text>
      </TouchableOpacity>
      <Text style={TextStyles.bodyMain}>
        to know when food is next donated.
      </Text>
    </>
  );

  let fridgeNotEmptyContent;

  //if fridge contents have been loaded, render the products
  if (!loadingContents) {
    fridgeNotEmptyContent = renderProducts(fridgeContents);
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="The Pendle Fridge"
        route="Home"
        navigation={navigation}
      />
      <Animated.View entering={FadeInDown.duration(1000)} style={styles.body}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loadingContents
            ? loading
            : fridgeContents === "null"
            ? fridgeEmptyContent
            : fridgeNotEmptyContent}
        </ScrollView>
      </Animated.View>
      <ItemInfoModal
        visible={isItemInfoModalVisible}
        scannedItem={scannedItem}
        onClose={() => {
          setItemInfoModalVisible(false);
        }}
      />
    </View>
  );
}

/**
 * Takes the entire contents of the fridge and displays each individual item
 * @param {*} fridgeContents the entire contents of the fridge as a JSON string
 */
function renderProducts(fridgeContents) {
  return (
    <>
      <View style={styles.inventoryHeader}>
        <Text style={TextStyles.bodyTitle}>What's in?</Text>
      </View>
      {/* for every item in the fridge, display accordion with its details */}
      {Object.entries(fridgeContents).map(([id, product]) => (
        <Accordion key={id} image={product.image} title={product.name}>
          <Text style={TextStyles.small}>
            Name: <Text style={TextStyles.smallBold}>{product.name}</Text>
          </Text>
          <Text style={TextStyles.small}>
            Quantity:{" "}
            <Text style={TextStyles.smallBold}>{product.quantity}</Text>
          </Text>
          <Text style={TextStyles.small}>
            Ingredients:{" "}
            <Text style={TextStyles.smallBold}>{product.ingredients}</Text>
          </Text>
          <Text style={TextStyles.small}>
            Allergens:{" "}
            <Text style={TextStyles.smallBold}>{product.allergens}</Text>
          </Text>
          <Text style={TextStyles.small}>
            Traces: <Text style={TextStyles.smallBold}>{product.traces}</Text>
          </Text>
          <Text style={TextStyles.small}>
            Date donated:{" "}
            <Text style={TextStyles.smallBold}>{product.date}</Text>
          </Text>
          <YellowButton
            title="Take item"
            onPress={() => console.log("TAKEN")}
          />
        </Accordion>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 4,
    backgroundColor: "white",
  },
  loading: {
    flex: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 20,
  },
  empty_icon: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  inventoryHeader: {
    width: "90%",
    padding: 5,
  },
});

export default HomeScreen;
