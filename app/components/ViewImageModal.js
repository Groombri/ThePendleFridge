import React from "react";
import { View, StyleSheet, Modal, Image } from "react-native";

export const ViewImageModal = ({ visible, onClose, image }) => {
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
      >
        <Image
          source={
            image ? { uri: image } : require("../assets/images/no-image.png") // Fallback image
          }
          style={styles.image}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
