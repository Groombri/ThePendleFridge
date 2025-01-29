import { React, useState } from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import YellowButton from "./YellowButton";
import ModalStyles from "../styles/ModalStyles";
import TextStyles from "../styles/TextStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import UpdateFridge from "../utils/UpdateFridge";

/**
 * Lets the user pick the quantity of an item that they'd like to take from the fridge.
 * In the form of a modal, displays item information at top, the available quantities in the middle,
 * and a button to confirm that they'd like to take this quantity at the bottom.
 * See handleButtonPress() to see how the confirm button works.
 * @param {product} product the selected product
 * @param {id} id the id of the selected product
 * @param {onClose} onClose handles closing the QuantityPicker
 * @returns the JSX of this component
 */
export const QuantityPicker = ({ product, id, onClose }) => {
  //select the first item on the ScrollPicker by default
  const [selectedIndex, setSelectedIndex] = useState(0);

  //initialise quantity options (available quantities the user can take for the product)
  const quantity = product.quantity;
  let quantityOptions = [];

  //populate quantity options with the correct available quantities
  if (quantity === "many") {
    quantityOptions = ["Take some", "Take all remaining"];
  } else {
    //if product quantity is measurable, available quantities are 1 to quantity
    //e.g. Peanut Butter quantity = 4, so available quantities = [1,2,3,4]
    quantityOptions = Array.from({ length: quantity }, (_, i) => i + 1);
  }

  //for some reason wouldn't allow me to scroll to all items, so padding items added to end
  quantityOptions = [...quantityOptions, "", "", ""];

  return (
    <View style={ModalStyles.container}>
      <Modal transparent={true} animationType="fade" onRequestClose={onClose}>
        <View style={ModalStyles.modalOverlay}>
          <View style={[ModalStyles.modalContent, { height: 550 }]}>
            <View style={ModalStyles.row}>
              <TouchableOpacity
                style={ModalStyles.closeModalButton}
                onPress={onClose}
              >
                <AntDesign name="closecircle" style={ModalStyles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={ModalStyles.modalTitleText}>Item selected:</Text>
            <View style={styles.productWrapper}>
              <View style={styles.inLine}>
                <Image
                  source={
                    product.image
                      ? { uri: product.image }
                      : require("../assets/images/no-image.png") //fallback image
                  }
                  style={styles.productImage}
                />
                <Text
                  style={TextStyles.bodyMain}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {product.name}
                </Text>
              </View>
            </View>
            <Text style={ModalStyles.modalTitleText}>Select quantity:</Text>
            <View style={styles.scrollPickerContainer}>
              <ScrollPicker
                dataSource={quantityOptions}
                selectedIndex={0}
                onValueChange={(data, index) => {
                  setSelectedIndex(index);
                }}
                wrapperHeight={70}
                itemHeight={50}
                activeItemTextStyle={{
                  fontFamily: "Poppins",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                itemTextStyle={{ fontFamily: "Poppins", fontSize: 20 }}
              />
            </View>
            <YellowButton
              title="Confirm"
              onPress={() =>
                handleButtonPress(
                  product,
                  id,
                  quantityOptions[selectedIndex],
                  onClose
                )
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

/**
 * Handles when the user presses the confirm button.
 * The user will be asked to confirm that they wish to continue,
 * if so, the selected quantity of selected product will be taken from the fridge.
 * @param {*} product
 * @param {*} quantity
 */
function handleButtonPress(product, id, quantity, onClose) {
  const confirmString =
    quantity === 1
      ? `Do you wish to take the ${product.name}?`
      : quantity > 1
      ? `Do you wish to take ${quantity} ${product.name}?`
      : `Do you wish to ${String(quantity).toLowerCase()} ${product.name}?`;

  Alert.alert("Please confirm", confirmString, [
    {
      text: "Back",
    },
    {
      text: "Continue",
      onPress: () => {
        UpdateFridge(id, quantity);
        onClose();
      },
    },
  ]);
}

const styles = StyleSheet.create({
  productWrapper: {
    width: "100%",
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgb(239, 239, 239)",
    opacity: 0.9,
  },
  scrollPickerContainer: {
    backgroundColor: "rgb(239, 239, 239)",
    height: "40%",
    width: "100%",
    margin: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgb(239, 239, 239)",
  },
  inLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  productTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    margin: 10,
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
});
