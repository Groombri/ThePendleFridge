import { StyleSheet } from "react-native";

/**
 * The default layout for a page, where the header takes up 1/10th of the container, and the rest is the body.
 * This therefore applies to all pages except the home page, which has a larger header due to the donation button.
 */
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 9,
        backgroundColor: "white"
    },
});