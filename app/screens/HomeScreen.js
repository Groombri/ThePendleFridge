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
import { RefreshControl, TextInput } from "react-native-gesture-handler";
import Accordion from "../components/Accordion";
import YellowButton from "../components/YellowButton";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { QuantityPicker } from "../components/QuantityPicker";
import { SortByDate } from "../utils/DateUtils";
import DonateModal from "../components/DonateModal";

/**
 * The application's home screen. This includes the apps custom header + donate an item button.
 * The body contains the current inventory of the fridge.
 * @param {*} navigation ...
 * @returns the contents of the Home Screen, initially as the initialRoute in the Drawer Navigator.
 */
function HomeScreen({ navigation, route }) {
  const [scannedItem, setScannedItem] = useState(null); //stores an item that has been scanned
  const [isItemInfoModalVisible, setItemInfoModalVisible] = useState(false); //the modal that displays the info of the scannedItem
  const [isDonateModalVisible, setDonateModalVisible] = useState(false); //the modal that displays options for donating an item
  const [isQuantityPickerVisible, setQuantityPickerVisible] = useState(false); //quantity selector for when user takes an item
  const [productToTake, setProductToTake] = useState(null); //the product that the user has selected to take
  const [productToTakeID, setProductToTakeID] = useState(null); //the ID of this product
  const [refreshing, setRefreshing] = useState(false);
  const [fridgeContents, setFridgeContents] = useState(null); //fridge contents are set to null by default
  const [loadingContents, setLoadingContents] = useState(true); //loads fridge contents from start
  const [currentSearch, setCurrentSearch] = useState(""); //the product currently being searched for by the user

  //Read the fridges contents when HomeScreen mounts
  useEffect(() => {
    //if a scanned item has been passed into the home screen, store the item and display modal
    if (route.params?.scannedItem) {
      //optional chaining (?.) returns undefined if obj is undefined or null, instead of error
      setScannedItem(route.params.scannedItem);
      setDonateModalVisible(false);
      setItemInfoModalVisible(true);
    }

    ReadFridge((data) => {
      if (data) {
        setFridgeContents(data);
      } else {
        setFridgeContents(null);
      }
      //once contents have been loaded, set loading to false
      setLoadingContents(false);
    });
  }, [route.params?.scannedItem]);

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
        accessible={true}
        accessibilityLabel="Picture of an empty fridge"
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

  //if fridge contents have been loaded, and the fridge is not empty, render the products
  if (!loadingContents && fridgeContents !== null) {
    fridgeNotEmptyContent = renderProducts(
      fridgeContents,
      setProductToTake,
      setProductToTakeID,
      setQuantityPickerVisible,
      currentSearch,
      setCurrentSearch
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="The Pendle Fridge"
        route="Home"
        navigation={navigation}
        setDonateModalVisible={setDonateModalVisible}
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
            : fridgeContents === null
            ? fridgeEmptyContent
            : fridgeNotEmptyContent}
        </ScrollView>
      </Animated.View>
      <DonateModal
        visible={isDonateModalVisible}
        onClose={() => {
          setDonateModalVisible(false);
        }}
        navigation={navigation}
      />
      <ItemInfoModal
        visible={isItemInfoModalVisible}
        scannedItem={scannedItem}
        onClose={() => {
          setItemInfoModalVisible(false);
        }}
      />
      {isQuantityPickerVisible && productToTake && productToTakeID && (
        <QuantityPicker
          product={productToTake}
          id={productToTakeID}
          onClose={() => setQuantityPickerVisible(false)} // Close the picker
        />
      )}
    </View>
  );
}

/**
 * Takes the entire contents of the fridge and displays each individual item
 * @param {*} fridgeContents the entire contents of the fridge as a JSON string
 */
function renderProducts(
  fridgeContents,
  setProductToTake,
  setProductToTakeID,
  setQuantityPickerVisible,
  currentSearch,
  setCurrentSearch
) {
  //if the user has searched for an item, only render this
  const contentsFilteredBySearch = Object.entries(fridgeContents).filter(
    ([id, product]) => {
      return product.name.toLowerCase().includes(currentSearch.toLowerCase());
    }
  );

  //sort fridge contents by most recently donated
  const contentsSortedByDate = SortByDate(contentsFilteredBySearch);

  return (
    <>
      <View
        style={styles.inventoryHeader}
        accessible={true}
        accessibilityLabel="Home screen"
      >
        <Text style={TextStyles.bodyTitle}>What's in?</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for an item..."
        value={currentSearch}
        onChangeText={setCurrentSearch}
      />
      {/* for every item in the fridge, display accordion with its details */}
      {contentsSortedByDate.map(([id, product]) => (
        <Accordion key={id} image={product.image} title={product.name}>
          <Text style={TextStyles.small}>
            Name: <Text style={TextStyles.smallBold}>{product.name}</Text>
          </Text>
          <Text style={TextStyles.small}>
            Item size: <Text style={TextStyles.smallBold}>{product.size}</Text>
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
            onPress={() => {
              setProductToTake(product);
              setProductToTakeID(id);
              setQuantityPickerVisible(true);
            }}
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
  searchInput: {
    color: "black",
    width: "90%",
    marginTop: 10,
    marginBottom: 7,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default HomeScreen;
