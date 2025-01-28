import React from "react";
import { StyleSheet, Modal, Image, Pressable } from "react-native";

export const ViewImageModal = ({ visible, onClose, image }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Image
          source={
            image ? { uri: image } : require("../assets/images/no-image.png") // Fallback image
          }
          style={styles.image}
        />
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
