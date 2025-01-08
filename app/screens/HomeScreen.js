import { React, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import TextStyles from '../styles/TextStyles';
import BarcodeScanner from '../BarcodeScanner';

function HomeScreen() {

  const [isScannerVisible, setScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleScan = (type, data) => {
    setScannedData({ type, data });
    setScannerVisible(false); // Close the scanner after scan
  };

  // Handle closing the scanner
  const handleCloseScanner = () => {
    setScannerVisible(false);
  };

  let screenContent;

  if(isScannerVisible) {
    screenContent = <BarcodeScanner onScan={handleScan} onClose={handleCloseScanner} />
  }
  else {
    screenContent = (
        <View style={styles.container}>
            <CustomHeader title="The Pendle Fridge" route="Home" />
            <View style={styles.body}>
                <ScrollView >
                    <Text style={TextStyles.bodyTitle}>What's in?</Text>
                    <Button title="Open Camera" onPress={() => setScannerVisible(true)} />
                </ScrollView>
            </View>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      {screenContent}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    body: {
        flex: 4,
        backgroundColor: "white"
    },
});

export default HomeScreen;