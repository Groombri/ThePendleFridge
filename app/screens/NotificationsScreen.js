import { Text, View, Image, StyleSheet } from "react-native";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import ModalStyles from "../styles/ModalStyles";
import { ScrollView } from "react-native-gesture-handler";

export default function NotificationsScreen({ notifications }) {
  let renderNotifications = (
    <View style={styles.noNotificationContainer}>
      <Text style={ModalStyles.modalTitleText}>No new notifications</Text>
    </View>
  );

  if (notifications.length > 0) {
    renderNotifications = notifications.map((notification, index) => {
      const date = notification.request.content.data.date;
      const image = notification.request.content.data.productImage;
      const title = notification.request.content.body;

      return (
        <View key={index} style={styles.notificationContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <View style={styles.inLine}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../assets/images/no-image.png") //fallback image
              }
              style={styles.productImage}
            />
            <Text style={TextStyles.bodyMain}>{title}</Text>
          </View>
        </View>
      );
    });
  }

  return (
    <ScrollView style={DefaultPageStyle.body}>{renderNotifications}</ScrollView>
  );
}

const styles = StyleSheet.create({
  dateText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
  },
  noNotificationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContainer: {
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    margin: 5,
    padding: 10,
    justifyContent: "center",
    alignitems: "center",
    backgroundColor: "rgb(239, 239, 239)",
    opacity: 0.9,
  },
  inLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
});
