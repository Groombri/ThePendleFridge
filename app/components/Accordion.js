import { React, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import TextStyles from "../styles/TextStyles";
import Entypo from "@expo/vector-icons/Entypo";

/**
 * Collapsible accordion to toggle display of all product info
 * Based on https://blog.logrocket.com/building-react-native-collapsible-accordions/
 * @param {*} param0
 */
function Accordion({ image, title, children }) {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const styles = StyleSheet.create({
    productWrapper: {
      width: "90%",
      marginTop: 6,
      marginBottom: 8,
      borderWidth: 1,
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderColor: expanded ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)",
      // shadowColor: "black",
      // shadowOffset: { width: 2, height: 2 },
      // shadowOpacity: 0.3,
      // shadowRadius: 2,
      // elevation: 5,
      backgroundColor: "rgb(239, 239, 239)",
    },
    productInfo: {
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.productInfo}
        onPress={toggleItem}
      >
        <Image
          source={
            image ? { uri: image } : require("../assets/images/no-image.png") // Fallback image
          }
          style={styles.productImage}
        />
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
      {expanded && <View style={styles.bodyContent}>{children}</View>}
    </View>
  );
}

export default Accordion;
