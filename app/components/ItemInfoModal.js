import { React, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import YellowButton from "./YellowButton";
import { TextInput } from "react-native-gesture-handler";
import ConstructItem from "../utils/ConstructItem";
import AddToFridge from "../utils/AddToFridge";
import DropDownPicker from "react-native-dropdown-picker";
import ModalStyles from "../styles/ModalStyles";
import PictureUploader from "./PictureUploader";

/**
 * The modal shown after an item is scanned or if the user decides to enter details manually.
 * Allows the user to fill in any missing gaps or correct wrong information before then donating the item to the fridge.
 * If an item has been scanned, displays a modal with pre-filled info.
 * If an item is being entered manually, displays a different modal with empty info.
 * @param {*} scannedItem a foodItem with information if scanned, an empty item (see ConstructEmptyItem) if not
 * @returns the JSX for the appropriate modal
 */
const ItemInfoModal = ({ visible, onClose, scannedItem }) => {
  //initialise hooks for item information
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [allergens, setAllergens] = useState("");
  const [traces, setTraces] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [imageUri, setImageUri] = useState("");

  //set quantity dropdown select to closed as default
  const [isPickerOpen, setPickerOpen] = useState(false);

  //initialise hooks for appropriate modal type
  const [title, setTitle] = useState("Does this look right?");
  const [subTitle, setSubTitle] = useState(
    "Some data from the barcode scan may be missing or incorrect."
  );

  //for awaiting add to fridge to be resolved
  const [loading, setLoading] = useState(false);

  //on each re-render
  useEffect(() => {
    //if an item has been scanned
    if (scannedItem) {
      //if the item is empty (user has chosen to enter product details manually)
      if (scannedItem.name === "EMPTY_ITEM") {
        //set values for text fields as empty
        setName("");
        setSize("");
        setAllergens("");
        setTraces("");
        setIngredients("");
        setImageUri("");

        //set appropriate modal type
        setTitle("Enter product details");
        setSubTitle("Please provide as much information as you can.");
      }
      //if the item isn't empty (user has scanned an item from barcode/photo)
      else {
        console.log(scannedItem.image);
        //set values for text fields as new scanned item info
        setName(scannedItem.name || "");
        setSize(scannedItem.size || "");
        setTraces(scannedItem.traces || "");
        setIngredients(scannedItem.ingredients || "");

        //if allergen info from OpenFoodFacts exists, remove the language tag "en:" from each allergen
        setAllergens(
          scannedItem.allergens.length === 0
            ? ""
            : scannedItem.allergens
                .split(",")
                .map((allergen) =>
                  allergen.startsWith("en:") ? allergen.slice(3) : allergen
                )
                .join(",") || ""
        );
        setImageUri(scannedItem.image || "");
      }

      setSelectedQuantity(1); //always set the default quantity as 1
    }
  }, [scannedItem]);

  //if an item has been scanned, render the modal with its info
  if (scannedItem) {
    return (
      <View style={ModalStyles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={visible}
          onRequestClose={onClose}
        >
          <View style={ModalStyles.modalOverlay}>
            <View style={ModalStyles.modalContent}>
              <View style={ModalStyles.row}>
                <TouchableOpacity
                  style={ModalStyles.closeModalButton}
                  onPress={onClose}
                >
                  <AntDesign name="closecircle" style={ModalStyles.closeIcon} />
                </TouchableOpacity>
              </View>
              <ScrollView
                contentContainerStyle={styles.scrollView}
                automaticallyAdjustKeyboardInsets={true}
              >
                <Text style={ModalStyles.modalTitleText}>{title}</Text>
                <Text style={ModalStyles.modalText}>{subTitle} </Text>
                <PictureUploader
                  imageUri={imageUri}
                  setImageUri={setImageUri}
                />
                <View style={styles.fieldContainer}>
                  <Text style={styles.requiredField}>Product name*: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={(newName) => setName(newName)}
                    multiline={true}
                    maxLength={80}
                  />
                  <Text style={ModalStyles.modalText}>Product size: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={size}
                    onChangeText={(newSize) => setSize(newSize)}
                    multiline={true}
                    maxLength={20}
                  />
                  <Text style={styles.requiredField}>Quantity*: </Text>
                  <View>
                    <DropDownPicker
                      containerStyle={styles.quantityPicker}
                      open={isPickerOpen}
                      setOpen={setPickerOpen}
                      value={selectedQuantity}
                      setValue={setSelectedQuantity}
                      items={quantityItems}
                    ></DropDownPicker>
                  </View>
                  <Text style={ModalStyles.modalText}>Allergens: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={allergens}
                    onChangeText={(newAllergens) => setAllergens(newAllergens)}
                    maxLength={50}
                  />
                  <Text style={ModalStyles.modalText}>
                    May contain traces of:{" "}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={traces}
                    onChangeText={(newTraces) => setTraces(newTraces)}
                    multiline={true}
                    maxLength={40}
                  />
                  <Text style={ModalStyles.modalText}>Ingredients: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={ingredients}
                    onChangeText={(newIngredients) =>
                      setIngredients(newIngredients)
                    }
                    multiline={true}
                    maxLength={300}
                  />
                </View>
                {loading ? (
                  <ActivityIndicator size="large" color="green" />
                ) : (
                  <YellowButton
                    title="Donate item"
                    onPress={async () => {
                      //only close the modal if the info is valid
                      const isValid = await validateInfo(
                        scannedItem,
                        setLoading
                      );

                      if (isValid === true) {
                        Alert.alert(
                          "Item added",
                          "Thank you for your donation ❤️"
                        );
                        onClose();
                      }
                    }}
                  />
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );

    /**
     * Checks if the entered item information is valid, adds item to fridge if so.
     * @param {*} scannedItem the item whose information is being entered
     * @returns true if entered details are valid, false if not
     * ---------------------------------------------------------------------------------
     * Validation rules:
     * For max lengths, see maxLength property of fields
     * Name must not be empty
     * Size, ingredients, allergens, traces optional
     */
    async function validateInfo(scannedItem, setLoading) {
      //reject if there is no product name (null or white space)
      if (!name || name.trim() === "") {
        Alert.alert("Donation failed", "Product name required");
        return false;
      }

      //if fields are valid, reconstruct the item with the field values and add to the fridge
      const finalItem = ConstructItem(
        scannedItem.productId,
        name.trim(), //.trim() removes whitespace from the start and end
        selectedQuantity,
        size.trim(),
        ingredients.trim(),
        allergens,
        traces.trim(),
        imageUri,
        scannedItem.keywords
      );

      setLoading(true);

      try {
        await AddToFridge(JSON.parse(finalItem));
        setLoading(false);
        return true;
      } catch (error) {
        setLoading(false);
        Alert.alert(
          "Error",
          "The request timed out. Please check your internet connection and try again."
        );
        return false;
      }
    }
  }
};

//the quantity values for the drop down picker
const quantityItems = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "Many", value: "many" },
];

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  textInput: {
    width: 300,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  requiredField: {
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: "500",
    color: "red",
    textAlign: "center",
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
  quantityPicker: {
    width: 300,
    margin: 5,
  },
});

export default ItemInfoModal;
