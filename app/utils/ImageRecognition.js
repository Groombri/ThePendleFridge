import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

//to store image uri
let image;

//set of generic terms to be filtered out
const removeWords = new Set([
  "Food",
  "Produce",
  "Vegetable",
  "Ingredient",
  "Fruit",
  "Recipe",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Superfood",
  "Natural foods",
  "Cooking",
  "Condiment",
  "Staple food",
  "Comfort food",
  "Meat",
  "Label",
  "Box",
  "Packaging and labeling",
  "Junk food",
  "Fast food",
  "Finger food",
  "Side dish",
  "Food group",
]);

/**
 * Starts image recognition by prompting user to take a picture of the item.
 * From this, a seperate function is called that analyses the image and returns the best label.
 * @returns an array of [imageUri, bestLabel] if successfull
 */
export const startImageRecognition = async () => {
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

    //after successfull picture taken, set the image uri and start analysing the image
    if (!result.canceled) {
      image = result.assets[0].uri;
      return await handleImageRecognition(image);
    }

    return null;
  };

  /**
   * Calls Google Cloud Vision API to return a maximum of 10 labels for the image.
   * Any generic labels are then filtered out, with the largest label (most likely to be most specific) being kept.
   * @param {*} uri the uri of the image the user took
   * @returns the most likely label that matches the food item
   */
  const handleImageRecognition = async (uri) => {
    if (!uri) {
      Alert.alert("No image", "Please upload an image first.");
      return null;
    }

    const api =
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCuuhKXGxS3GAKw8j4bX2aOjRtVJvxGkMA";

    try {
      //convert image to be used in API
      const imageData = await fetch(uri);
      const imageBlob = await imageData.blob();
      const base64Image = await blobToBase64(imageBlob);

      //specify label detection, only accept a max of 10 labels
      const requestPayload = {
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
          },
        ],
      };

      //calls the api
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      const data = await response.json();

      //if the api was able to label the image, determine the best label
      if (data.responses && data.responses[0].labelAnnotations) {
        const labelsData = data.responses[0].labelAnnotations; //all data for each label e.g. includes confidence ratings
        const originalLabels = labelsData.map((label) => label.description); //gets just the descriptions for each label e.g. "bread"

        //filters out any of the generic words from the labels
        const filteredLabels = originalLabels.filter(
          (label) => !removeWords.has(label)
        );

        //returns the longest label
        return filteredLabels.reduce((longest, currentWord) =>
          currentWord.length > longest.length ? currentWord : longest
        );
      } else {
        Alert.alert("No Labels", "No labels found in the image.");
        return null;
      }
    } catch (error) {
      console.error("Error calling Cloud Vision API:", error);
      Alert.alert(
        "Error",
        "Something went wrong with the image recognition. Please try again."
      );
      return null;
    }
  };

  //converts blob to base 64 image for use in Cloud Vision API
  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  //returns the image along with the best label from the API
  const finalLabel = await handleTakePicture();
  return [image, finalLabel];
};
