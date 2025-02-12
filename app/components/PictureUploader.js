import React from "react";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { Image } from "expo-image";

/**
 * Allows the user to upload their own photo of the product.
 * If no photo exists, use default image ("no-image.png"),
 * If a photo exists from OpenFoodFacts, use this.
 * When a user clicks on the image, upload their own using expo-image-picker
 * @returns JSX touchable product image
 */
const PictureUploader = ({ imageUri, setImageUri }) => {
  const handleTakePicture = async () => {
    //request camera permissions
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

    //if the user doesnt cancel the upload at any point, set the new image to the uploaded image
    if (!result.canceled) {
      imageUri = result.assets[0].uri;
      await storeImage(imageUri);
    }
  };

  //stores the image in firebase storage so that other devices can view it
  const storeImage = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `productImages/${uuid.v4()}.jpg`);

      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);

      setImageUri(downloadUrl);
    } catch (error) {
      Alert.alert("Upload failed", "Something went wrong");
      console.error(error);
    }
  };

  //return the PictureUploader component for use in the ItemInfoModal
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
          <AntDesign name="cloudupload" size={30} color="rgb(21, 102, 207)" />
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
    bottom: -15,
    right: -20,
    padding: 5,
  },
});
