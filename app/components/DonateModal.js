import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import YellowButton from './YellowButton';

/**
 * The modal that appears after selecting "Donate an item" in the Home Screen's header.
 * This displays 3 options for providing information on the food item the user wishes to donate:
 * 1. Scan the item's barcode, 2. Take a picture, 3. Enter details manually.
 * 
 * @param {*} param0 
 * @returns the donation options modal
 */
const DonateModal = ({ visible, onClose, navigation }) => {
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
        >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <TouchableOpacity 
                style={styles.closeModalButton} 
                onPress={onClose}
              >
                <AntDesign name="closecircle" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitleText}>Donate a food item</Text>
            <Text style={styles.modalText}>Choose one of the following options to provide us information about the food item: </Text>
            <MaterialCommunityIcons name="barcode-scan" style={styles.modalIcons} />
            <YellowButton title="Scan barcode" onPress={() => {
              //When the "Scan barcode " btn is pressed, close the modal and navigate to BarcodeScannerScreen
              onClose();
              navigation.navigate("BarcodeScannerScreen");
            }}/>
            <MaterialCommunityIcons name="camera" style={styles.modalIcons} />
            <YellowButton title="Take a picture" />
            <AntDesign name="form" style={styles.modalIcons} />
            <YellowButton title="Enter details" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    height: 700,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleText: {
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 5,
    color: "green"
  },
  modalText: {
    fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  modalIcons: {
    color: "black",
    fontSize: 100,
    paddingTop: 20,
    paddingBottom: 5,
  },
  closeIcon: {
    fontSize: 25,
    color: "darkred"
  },
  row: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});

export default DonateModal;
