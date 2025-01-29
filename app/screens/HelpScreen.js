import { Text, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";

export default function HelpScreen() {
  return (
    <View style={DefaultPageStyle.container}>
      <CustomHeader title="User Guide" />
      <View style={DefaultPageStyle.body}>
        <Text style={TextStyles.bodyTitle}>Hello</Text>
        <Text style={TextStyles.bodyMain}>This is the guide page.</Text>
      </View>
    </View>
  );
}
