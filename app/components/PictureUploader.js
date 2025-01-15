import React from "react";
import { View, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

const PictureUploader = ({ imageUri, setImageUri }) => {
  const handleTakePicture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission denied",
        "Please grant permission to access camera."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert("Upload photo", "Take a picture of your item", [
          { text: "Proceed", onPress: handleTakePicture },
          { text: "Cancel", style: "cancel" },
        ])
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("../assets/images/no-image.png") // Fallback image
          }
          style={styles.productImage}
        />
        <View style={styles.uploadIcon}>
          <AntDesign name="cloudupload" size={15} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PictureUploader;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: 50,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
  },
  uploadIcon: {
    position: "absolute",
    bottom: -10,
    right: -25,
    backgroundColor: "rgba(24, 119, 242, 0.5)", // Semi-transparent background
    borderRadius: 12,
    padding: 5,
  },
});
