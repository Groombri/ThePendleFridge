import { React, useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import { ScrollView } from "react-native-gesture-handler";
import { FoodsList } from "../components/FoodsList";
import TimePicker from "../components/TimePicker";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [allergenNotificationsEnabled, setAllergenNotificationsEnabled] =
    useState(false);
  const [campusNotificationsEnabled, setCampusNotificationsEnabled] =
    useState(false);
  const [notificationTimes, setNotificationTimes] = useState(false);
  const [notifyFoods, setNotifyFoods] = useState(false);

  return (
    <View style={DefaultPageStyle.body}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Setting
          text="Enabled"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <Text style={styles.titleText}>Notify me...</Text>
        <Setting
          text="Even if a product matches my allergens"
          value={allergenNotificationsEnabled}
          onValueChange={setAllergenNotificationsEnabled}
        />
        <Setting
          text="Only when on campus"
          value={campusNotificationsEnabled}
          onValueChange={setCampusNotificationsEnabled}
        />
        <Setting
          text="Only between certain hours"
          value={notificationTimes}
          onValueChange={setNotificationTimes}
        />
        {notificationTimes && <TimePicker />}
        <Setting
          text="Only for certain items"
          value={notifyFoods}
          onValueChange={setNotifyFoods}
        />
        {notifyFoods && <FoodsList />}
      </ScrollView>
    </View>
  );
}

const Setting = ({ text, value, onValueChange }) => {
  return (
    <View style={styles.settingContainer}>
      <Text style={TextStyles.bodyMain}>{text}</Text>
      <Switch value={value} onValueChange={() => onValueChange(!value)} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    margin: 20,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  titleText: {
    padding: 25,
    paddingBottom: 0,
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 5,
    color: "green",
  },
});
