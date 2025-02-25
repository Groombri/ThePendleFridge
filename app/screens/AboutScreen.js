import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import { ScrollView } from "react-native-gesture-handler";

export default function AboutScreen({ navigation }) {
  //opens google maps to fridge location
  const openLocation = () => {
    const url =
      "https://www.google.com/maps/place/Pendle+College+Porter/@54.0067755,-2.7848788,20.31z/data=!4m6!3m5!1s0x487b630249f5b5df:0x1d7b80528e6a88b0!8m2!3d54.0066644!4d-2.7847845!16s%2Fg%2F11g6bcmggv?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const openSite = () => {
    const url = "https://www.food.gov.uk/";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={DefaultPageStyle.container}>
      <CustomHeader title="About" />
      <View style={DefaultPageStyle.body}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>What is the fridge?</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            The Pendle Community Fridge is a resource found in{" "}
            <Text style={TextStyles.link} onPress={openLocation}>
              the Pendle Porters lodge
            </Text>{" "}
            for end date or unused food to be distributed rather than wasted.
            Anyone is welcome to donate and take items from the fridge. Please
            only take what you need and leave enough for others to share.
          </Text>
          <Text style={styles.title}>What food can I donate?</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            If you're putting food in the fridge, please only provide things
            that are suitable for someone else to take. We can't accept:
          </Text>
          <View style={styles.rulesContainer}>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ Opened meat, fish, eggs, or milk
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ Food past its use-by date
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ Frozen foods
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ Packaged foods with broken seals
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ Unsafe/unedible food
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ Home-cooked foods
            </Text>
          </View>
          <Text style={styles.title}>Help yourself!</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            Whilst a team of trained volunteers check and clean the fridge
            daily, we ask all users of the fridge to make their own assessment
            of the safety of anything they take.
          </Text>
          <View style={styles.rulesContainer}>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ✅ Check the condition of food before taking and consuming
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ✅ Wash all fruit and veg before consumption
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ✅ If you want to reheat your food,{" "}
              <Text style={TextStyles.link} onPress={openSite}>
                www.food.gov.uk
              </Text>{" "}
              as a source of reference
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ✅ Only take non-sealed food when it has been boxed up and
              labelled by a volunteer
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ Do not take foods from the bottom fridge shelf or top drawer,
              as these items are waiting checks
            </Text>
            <Text style={[TextStyles.bodyMain, styles.rulesText]}>
              ❌ If you have allergies, do not consume any food which does not
              have a manafacturer label listing all ingredients
            </Text>
          </View>
          <Text style={styles.title}>We're here to help 💚</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            If you're struggling with finances, there's plenty of help
            available. Please come and chat to us in the college.
          </Text>
          <Text style={styles.title}>The Pendle Fridge app</Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            This app was created as part of a Computer Science dissertation
            project, with the aim of improving the experience for all involved
            with the community fridge. Users can check the realtime inventory of
            the fridge, and be notified when an item has been donated.{" "}
          </Text>
          <Text style={[TextStyles.bodyMain, styles.rulesText]}>
            For help in using the app, see{" "}
            <Text
              style={TextStyles.link}
              onPress={() => navigation.navigate("How to use")}
            >
              the How to Use page.
            </Text>{" "}
          </Text>
          <Text style={styles.title}>Attributions</Text>
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
    backgroundColor: "rgb(239, 239, 239)",
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
