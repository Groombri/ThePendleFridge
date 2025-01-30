import { React, useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import { ScrollView } from "react-native-gesture-handler";
import { FoodsList } from "../components/FoodsList";

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
        <Text style={TextStyles.bodyMain}>
          {/* Here you can configure whether to receive notifications on when new
          items have been added to the fridge. */}
        </Text>
        <Setting
          text="Enable push notifications"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <Setting
          text="Notify me even if a product matches my allergens"
          value={allergenNotificationsEnabled}
          onValueChange={setAllergenNotificationsEnabled}
        />
        <Setting
          text="Only notify me when on campus"
          value={campusNotificationsEnabled}
          onValueChange={setCampusNotificationsEnabled}
        />
        <Setting
          text="Notify me..."
          value={notificationTimes}
          onValueChange={setNotificationTimes}
        />
        <Setting
          text="Only notify me for certain items"
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
    borderColor: "lightgray",
  },
});
