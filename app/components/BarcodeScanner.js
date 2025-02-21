import React, { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CameraView, Camera } from "expo-camera";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import YellowButton from "./YellowButton";
import GetDataFromBarcode from "../utils/GetDataFromBarcode";

/**
 * A barcode scanner that scans EAN-13 barcodes using expo-camera.
 * Based on https://github.com/expo/fyi/blob/main/barcode-scanner-to-expo-camera.md
 * @returns The user's back camera with barcode scanning functionality, filling the entire screen.
 * Contains instruction text and button to close the camera.
 */
const BarcodeScanner = () => {
  const navigation = useNavigation(); //hook allows access to navigation functionality, as isn't passed as prop
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Thanks to https://stackoverflow.com/questions/77415039/cannot-set-expo-camera-scan-interval
   * {lastScannedTimeRef} is used to save a timestamp of the first scan.
   * This makes sure that multiple scans can't take place in the time that it takes for {scanned}
   * to change state. See: handleBarcodeScanned() for use.
   */
  const lastScannedTimeRef = useRef(0);

  //Each time the barcode scanner is navigated to, reset scanned to false to allow for multiple scans
  useFocusEffect(
    useCallback(() => {
      setScanned(false);
    }, [])
  );

  // Request camera permission
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting permission to access camera...</Text>;
  }

  if (hasPermission === false) {
    Alert.alert(
      "Permission denied",
      "Please grant permission to access camera."
    );
  }

  const handleBarcodeScanned = ({ type, data }) => {
    //don't handle the scan if 2 secs have not passed since the last
    const time = Date.now();
    if (scanned || time - lastScannedTimeRef.current < 2000) {
      return;
    }

    //if scan successful: store the timestamp, setScanned to true, process data, then close scanner
    lastScannedTimeRef.current = time;

    setScanned(true);
    setLoading(true);
    handleScannedData({ type, data });
  };

  //Processes the scanned data
  const handleScannedData = async ({ type, data }) => {
    try {
      //gets the product information as JSON object
      const scannedItem = await GetDataFromBarcode(data);

      //if scannedItem exists and has scanned successfully:
      if (
        scannedItem &&
        scannedItem !== "error" &&
        scannedItem !== "abort error"
      ) {
        console.log(scannedItem);
        //parse the scannedItem into the home screen so it can display the ItemInfoModal
        navigation.navigate("Home", { scannedItem });
      }
      //if not, alert the user that the data cannot be fetched from the barcode
      else {
        //alert that lets user know it was a connection issue
        if (scannedItem === "abort error") {
          Alert.alert(
            "Error",
            "The request timed out. Please check your internet connection and try again."
          );
        }
        //alert that lets the user know that the product data wasn't found
        else {
          Alert.alert(
            "Product not found",
            "It seems like we don't have the data for this product. Please donate using another option."
          );
        }
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "The request failed. Please try again or donate another way."
      );
      navigation.navigate("Home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CameraView
      style={StyleSheet.absoluteFillObject}
      onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} //makes sure that it only scans once
      barcodeScannerSettings={{
        barcodeTypes: ["ean13"], //only accept barcode types of EAN-13
      }}
    >
      <View style={styles.textContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFB900" />
        ) : (
          <Text style={styles.instructionText}>
            Point the camera at a barcode
          </Text>
        )}
      </View>
      <View style={styles.closeButtonContainer}>
        <YellowButton
          title="Close"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </CameraView>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  closeButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  instructionText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFB900",
  },
});

export default BarcodeScanner;
