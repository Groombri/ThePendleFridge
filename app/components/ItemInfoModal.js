import { React, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import YellowButton from "./YellowButton";
import { TextInput } from "react-native-gesture-handler";
import ConstructItem from "../utils/ConstructItem";
import AddToFridge from "../utils/AddToFridge";

const ItemInfoModal = ({ visible, onClose, navigation, scannedItem }) => {
  if (scannedItem !== null) {
    //set default values for text fields as scanned information
    const [name, setName] = useState(scannedItem.name);
    const [size, setSize] = useState(scannedItem.size);
    const [quantity, setQuantity] = useState(scannedItem.quantity);
    const [allergens, setAllergens] = useState(scannedItem.allergens);
    const [traces, setTraces] = useState(scannedItem.traces);
    const [ingredients, setIngredients] = useState(scannedItem.ingredients);

    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={visible}
          onRequestClose={onClose}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={onClose}
                >
                  <AntDesign name="closecircle" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              <ScrollView
                contentContainerStyle={styles.scrollView}
                automaticallyAdjustKeyboardInsets={true}
              >
                <Text style={styles.modalTitleText}>Does this look right?</Text>
                <Text style={styles.modalText}>
                  Some data from the barcode scan maybe missing or incorrect.{" "}
                </Text>
                <Image
                  source={{ uri: scannedItem.image }}
                  style={styles.productImage}
                />
                <View style={styles.fieldContainer}>
                  <Text style={styles.requiredField}>Product name*: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={name}
                    onChangeText={(newName) => setName(newName)}
                  />
                  {/* <Image></Image> */}
                  <Text style={styles.modalText}>Product size: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={size}
                    onChangeText={(newSize) => setSize(newSize)}
                    multiline={true}
                  />
                  <Text style={styles.requiredField}>Quantity*: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={quantity.toString()} //converts quantity to string for display in text input
                    onChangeText={
                      (newQuantity) => setQuantity(Number(newQuantity)) //converts text back into a number
                    }
                  />
                  <Text style={styles.modalText}>Allergens: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={
                      allergens.length === 0 ? "" : allergens.join(", ") //converts array of allergns to string
                    }
                    onChangeText={(newAllergens) =>
                      setAllergens(
                        newAllergens
                          .split(", ")
                          .map((allergen) => allergen.trim()) //converts string input text back into array
                      )
                    }
                  />
                  <Text style={styles.modalText}>May contain traces of: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={traces}
                    onChangeText={(newTraces) => setTraces(newTraces)}
                    multiline={true}
                  />
                  <Text style={styles.modalText}>Ingredients: </Text>
                  <TextInput
                    style={styles.textInput}
                    defaultValue={ingredients}
                    onChangeText={(newIngredients) =>
                      setIngredients(newIngredients)
                    }
                    multiline={true}
                  />
                </View>
                <YellowButton
                  title="Donate item"
                  onPress={() => {
                    validateInfo(scannedItem);
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );

    function validateInfo(scannedItem) {
      console.log(name);

      //for each field, validate
      //if not valid, alert and highlight field

      //   else {
      //     const finalItem = ConstructItem(scannedItem["productId"], ...);
      //     AddToFridge(finalItem);
      //   }
    }
  }
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 350,
    height: 700,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleText: {
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 5,
    color: "green",
  },
  modalText: {
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  modalIcons: {
    color: "black",
    fontSize: 100,
    paddingTop: 20,
    paddingBottom: 5,
  },
  closeIcon: {
    fontSize: 25,
    color: "darkred",
  },
  row: {
    position: "absolute",
    top: 10,
    left: 10,
  },
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
  productImage: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
});

export default ItemInfoModal;
