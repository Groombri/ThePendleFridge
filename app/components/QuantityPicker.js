import { React, useState } from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import YellowButton from "./YellowButton";
import ModalStyles from "../styles/ModalStyles";
import TextStyles from "../styles/TextStyles";
import AntDesign from "@expo/vector-icons/AntDesign";

export const QuantityPicker = ({ product, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const quantity = product.quantity;
  let quantityOptions = [];

  if (quantity === "many") {
    quantityOptions = ["Take some", "Take all remaining"];
  } else {
    quantityOptions = Array.from({ length: quantity }, (_, i) => i + 1);
  }

  //for some reason wouldn't allow me to scroll to all items, so padding items added to end
  quantityOptions = [...quantityOptions, "", "", ""];

  return (
    <View style={ModalStyles.container}>
      <Modal transparent={true} animationType="slide" onRequestClose={onClose}>
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
              onPress={() => console.log(quantityOptions[selectedIndex])}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
