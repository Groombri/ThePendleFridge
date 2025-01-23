import { React, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import YellowButton from "./YellowButton";
import { ConstructEmptyItem } from "../utils/ConstructItem";
import ModalStyles from "../styles/ModalStyles";
import * as ImagePicker from "expo-image-picker";

/**
 * The modal that appears after selecting "Donate an item" in the Home Screen's header.
 * This displays 3 options for providing information on the food item the user wishes to donate:
 * 1. Scan the item's barcode, 2. Take a picture, 3. Enter details manually.
 *
 * @param {*} param0
 * @returns the donation options modal
 */
const DonateModal = ({ visible, onClose, navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState([]);

  // Function to open camera and get image URI
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
      setImageUri(result.assets[0].uri); // Set the image URI after taking the picture
      handleImageRecognition(result.assets[0].uri);
    }
  };

  const handleImageRecognition = async (uri) => {
    if (!uri) {
      Alert.alert("No image", "Please upload an image first.");
      return;
    }

    setLoading(true);
    const api =
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCuuhKXGxS3GAKw8j4bX2aOjRtVJvxGkMA";

    try {
      const imageData = await fetch(uri);
      const imageBlob = await imageData.blob();
      const base64Image = await blobToBase64(imageBlob);

      const requestPayload = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
          },
        ],
      };

      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });
      const data = await response.json();

      if (data.responses && data.responses[0].labelAnnotations) {
        const labelsData = data.responses[0].labelAnnotations;
        labelsData.map((label) => console.log(label.description));
        setLabels(labelsData.map((label) => label.description));
      } else {
        Alert.alert("No Labels", "No labels found in the image.");
      }
    } catch (error) {
      console.error("Error calling Cloud Vision API:", error);
      Alert.alert("Error", "Something went wrong with the image recognition.");
    } finally {
      setLoading(false);
    }
  };

  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

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
            <Text style={ModalStyles.modalTitleText}>Donate a food item</Text>
            <Text style={ModalStyles.modalText}>
              Choose one of the following options to provide us information
              about the food item:{" "}
            </Text>
            <MaterialCommunityIcons
              name="barcode-scan"
              style={ModalStyles.modalIcons}
            />
            <YellowButton
              title="Scan barcode"
              onPress={() => {
                //When the "Scan barcode " btn is pressed, close the modal and navigate to BarcodeScannerScreen
                onClose();
                navigation.navigate("BarcodeScanner");
              }}
            />
            <MaterialCommunityIcons
              name="camera"
              style={ModalStyles.modalIcons}
            />
            <YellowButton
              title="Image recognition"
              onPress={handleTakePicture}
            />
            <AntDesign name="form" style={ModalStyles.modalIcons} />
            <YellowButton
              title="Enter details"
              onPress={() => {
                /**
                 * When the "Enter" details btn is pressed, close the modal and pass an
                 * empty item into the home screen to activate the appropriate ItemInfoModal
                 */
                onClose();

                //uri for when product doesnt have an image
                const image = Image.resolveAssetSource(
                  require("../assets/images/no-image.png")
                ).uri;

                //constructs an empty item for the user to populate
                const scannedItem = JSON.parse(ConstructEmptyItem(image));
                navigation.navigate("Home", { scannedItem });
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DonateModal;
