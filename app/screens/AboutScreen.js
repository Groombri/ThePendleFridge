import { Text, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";

export default function AboutScreen() {
  return (
    <View style={DefaultPageStyle.container}>
      <CustomHeader title="About" />
      <View style={DefaultPageStyle.body}>
        <Text style={TextStyles.bodyTitle}>Hello</Text>
        <Text style={TextStyles.bodyMain}>This is the about page.</Text>
      </View>
    </View>
  );
}
