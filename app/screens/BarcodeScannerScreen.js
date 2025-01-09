import React from 'react';
import { View, StyleSheet } from 'react-native';
import BarcodeScanner from '../components/BarcodeScanner'

/**
 * Seperate screen for the barcode scanner.
 * @returns The barcode scanner wrapped in it's own view
 */
const BarcodeScannerScreen = () => {
  return (
    <View style={styles.container}>
      <BarcodeScanner />
    </View>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
