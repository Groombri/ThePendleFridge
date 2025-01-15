import { StyleSheet } from "react-native";

/**
 * The default layout for a page, where the header takes up 1/10th of the container, and the rest is the body.
 * This therefore applies to all pages except the home page, which has a larger header due to the donation button.
 */
export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 350,
    height: 700,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitleText: {
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 5,
    color: "green",
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
    color: "darkred",
  },
  row: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
