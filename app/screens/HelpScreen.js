import { Text, View, StyleSheet } from "react-native";
import CustomHeader from "../components/CustomHeader";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import { ScrollView } from "react-native-gesture-handler";

export default function HelpScreen() {
  return (
    <View style={DefaultPageStyle.container}>
      <CustomHeader title="User guide" />
      <View style={DefaultPageStyle.body}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Taking items 😋</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            After taking an item from the fridge, you should use the app to let
            users know about what you took. This is easy:
          </Text>
          <View style={styles.rulesContainer}>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • Click on the item you have taken and then click "Take Item"
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • Select the quantity you took, and then press confirm
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • In cases where someone donated large quantities of an item e.g.
              a box of loose vegetables, the options to take may be "Take some"
              and "Take all remaining"
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • If you have taken the last of this item, select "Take all
              remaining". If not, select "Take some"
            </Text>
          </View>
          <Text style={styles.title}>Donating items 📝</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            There are 3 ways you can donate an item: Barcode Scanning, Image
            Recognition, and Manual Entry.
          </Text>
          <View style={styles.rulesContainer}>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • For most products with barcodes, barcode scanning will recognise
              the product and auto-fill it's information, making it the quickest
              way to donate. Simply check that the auto-fill information is
              correct, and upload a photo if you wish.
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • With image recognition, you can take a picture of a product and
              the AI will auto-fill the item name and picture for you. This
              works best for unpackaged items like loose fruit and veg.
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • You can also simply enter all the details about the item you
              wish to donate yourself, by selecting the Manual Entry option.
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • It is enough to simply just enter the name of the item you are
              donating. However, please do provide as much information as you
              can on the product. This makes the experience easier and safer for
              all involved.
            </Text>
          </View>

          <Text style={styles.title}>Notifications 🔔</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            Head over to the notification settings page to enable notifications.
            Once enabled, you will be notified when an item has been added to
            the fridge. You can also personalise your notification settings to:
          </Text>
          <View style={styles.rulesContainer}>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • Only receive notifications when you are on campus
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • Only receive notifications between certain hours of the day
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              • Only receive notifications for certain items e.g. "Bread",
              "Fruit"
            </Text>
          </View>
          <Text style={styles.title}>Contact 📨</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            Any problems with the app? Anything unclear? If you have something
            you'd like to say, contact e.groombridge@lancaster.ac.uk
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    margin: 20,
  },
  rulesContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  rulesText: {
    marginBottom: 15,
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    marginBottom: 10,
  },
});
