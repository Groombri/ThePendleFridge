import React from "react";
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
                <View style={styles.fieldContainer}>
                  <Text style={styles.requiredField}>Product name*: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={scannedItem["name"]}
                  />
                  {/* <Image></Image> */}
                  <Text style={styles.modalText}>Product size: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={scannedItem["size"]}
                    multiline={true}
                  />
                  <Text style={styles.requiredField}>Quantity*: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={JSON.stringify(scannedItem["quantity"])}
                  />
                  <Text style={styles.modalText}>Allergens: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={JSON.stringify(scannedItem["allergens"])}
                  />
                  <Text style={styles.modalText}>May contain traces of: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={scannedItem["traces"]}
                    multiline={true}
                  />
                  <Text style={styles.modalText}>Ingredients: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={scannedItem["ingredients"]}
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
  }
};

function validateInfo(scannedItem) {
  console.log("DOMATE!");

  //for each field, validate
  //if not valid, alert and highlight field

  //   else {
  //     const finalItem = ConstructItem(scannedItem["productId"], ...);
  //     AddToFridge(finalItem);
  //   }
}

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
    marginTop: 35,
    marginBottom: 35,
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
});

export default ItemInfoModal;
