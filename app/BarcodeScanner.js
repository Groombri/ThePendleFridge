import React, { useState, useEffect, useRef } from "react";
import { CameraView, Camera } from "expo-camera";
import { StyleSheet, Text, View } from "react-native";
import YellowButton from "./components/YellowButton";

/**
 * A barcode scanner that scans EAN-13 barcodes using expo-camera.
 * @param onScan function to apply to barcode data once scanned.
 * Based on https://github.com/expo/fyi/blob/main/barcode-scanner-to-expo-camera.md
 */
const BarcodeScanner = ({ onScan, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  /**
   * Thanks to https://stackoverflow.com/questions/77415039/cannot-set-expo-camera-scan-interval
   * {lastScannedTimeRef} is used to save a timestamp of the first scan.
   * This makes sure that multiple scans can't take place before {scanned} changes state.
   */
  const lastScannedTimeRef = useRef(0);

  // Request camera permission
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  // Handle the scanned barcode
  const handleBarcodeScanned = ({ type, data }) => {
    
    //don't handle the scan if 2 secs have not passed since last
    const time = Date.now();
    if (scanned || (time - lastScannedTimeRef.current < 2000)) {return}

    lastScannedTimeRef.current = time;
    setScanned(true);
    //onScan(type, data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
  };

  if (hasPermission === null) {
    return <Text>Requesting permission to access camera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Failed to open - please grant permission to access camera.</Text>;
  }

  return (
    <CameraView
      style={StyleSheet.absoluteFillObject}
      onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} //makes sure that it only scans once
      barcodeScannerSettings={{
        barcodeTypes: ["ean13"],
      }}
    >
      <View style={styles.textContainer}>
        <Text>Point the camera at a barcode</Text>
      </View>
      <View style={styles.closeButtonContainer}>
        <YellowButton title="Close" onPress={onClose} />
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
    marginTop: 50
  },
  closeButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50
  },
});

export default BarcodeScanner;
