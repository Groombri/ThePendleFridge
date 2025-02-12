import { React, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextStyles from "../styles/TextStyles";
import Entypo from "@expo/vector-icons/Entypo";
import { ViewImageModal } from "./ViewImageModal";
import { Image } from "expo-image";

/**
 * Collapsible accordion to toggle display of all product info
 * Based on https://blog.logrocket.com/building-react-native-collapsible-accordions/
 * @param {*} param0
 */
function Accordion({ image, title, children }) {
  const [expanded, setExpanded] = useState(false);
  const [isImageFocused, setImageFocused] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  //styles had to be within function due to use of [expanded] in the terminal operators
  const styles = StyleSheet.create({
    productWrapper: {
      width: "90%",
      marginTop: 6,
      marginBottom: 8,
      borderWidth: 1,
      borderRadius: 10,
      borderBottomLeftRadius: expanded ? 0 : 10,
      borderBottomRightRadius: expanded ? 0 : 10,
      borderColor: expanded ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)",
      shadowColor: "black",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
      backgroundColor: "rgb(239, 239, 239)",
      opacity: 0.9,
    },
    inLine: {
      flexDirection: "row",
      alignItems: "center",
    },
    productTitle: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      flexWrap: "wrap",
      marginRight: 5,
    },
    productImageContainer: {
      padding: 10,
      paddingRight: 0,
    },
    productImage: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 10,
    },
    bodyContent: {
      padding: 10,
      backgroundColor: "white",
    },
  });

  return (
    <View style={styles.productWrapper}>
      <View style={styles.inLine}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.productImageContainer}
          onPress={() => {
            setImageFocused(true);
          }}
        >
          <Image
            source={
              image ? { uri: image } : require("../assets/images/no-image.png") //fallback image
            }
            style={styles.productImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.productTitle}
          onPress={toggleItem}
        >
          <Text
            style={TextStyles.bodyMain}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Entypo
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <ViewImageModal
        visible={isImageFocused}
        onClose={() => {
          setImageFocused(false);
        }}
        image={image}
      ></ViewImageModal>
      {expanded && <View style={styles.bodyContent}>{children}</View>}
    </View>
  );
}

export default Accordion;
