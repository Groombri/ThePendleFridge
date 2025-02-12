import React from "react";
import { StyleSheet, Modal, Pressable } from "react-native";
import { SnapbackZoom } from "react-native-zoom-toolkit";
import { Image } from "expo-image";

/**
 * Allows user to view a product image in a larger, zoomable modal
 */
export const ViewImageModal = ({ visible, onClose, image }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <SnapbackZoom>
          <Image
            source={
              image ? { uri: image } : require("../assets/images/no-image.png") //fallback image
            }
            style={styles.image}
          />
        </SnapbackZoom>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
