import { React, useEffect, useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import { ScrollView } from "react-native-gesture-handler";
import { FoodsList } from "../components/FoodsList";
import TimePicker from "../components/TimePicker";
import UpdateSettings from "../utils/UpdateSettings";
import ReadSettings from "../utils/ReadSettings";

/**
 * Displays the users notification settings.
 *
 */
export default function SettingsScreen() {
  //default values for user settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [allergenNotificationsEnabled, setAllergenNotificationsEnabled] =
    useState(false);
  const [campusNotificationsEnabled, setCampusNotificationsEnabled] =
    useState(false);
  const [notificationTimes, setNotificationTimes] = useState(false);
  const [notifyFoods, setNotifyFoods] = useState(false);

  //every time page is rendered, get user settings and display on screen
  useEffect(() => {
    const getSettings = async () => {
      const notifications = await ReadSettings("notificationsEnabled");
      const allergens = await ReadSettings("notificationsEnabled");
      const campus = await ReadSettings("campusNotificationsEnabled");
      const times = await ReadSettings("notificationsEnabled");
      const foods = await ReadSettings("notificationsEnabled");

      if (notifications !== null) {
        setNotificationsEnabled(notifications);
      }
      if (campus !== null) {
        setCampusNotificationsEnabled(campus);
      }
    };

    getSettings();
  });

  //asynchronous function to update settings
  const handleSettingChange = async (settingName, newValue) => {
    await UpdateSettings(settingName, newValue);
  };

  return (
    <View style={DefaultPageStyle.body}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Setting
          text="Enabled"
          value={notificationsEnabled}
          onValueChange={(newValue) => {
            setNotificationsEnabled(newValue);
            handleSettingChange("notificationsEnabled", newValue);
          }}
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
          onValueChange={(newValue) => {
            setCampusNotificationsEnabled(newValue);
            handleSettingChange("campusNotificationsEnabled", newValue);
          }}
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
/**
 * Represents a setting to be rended. Each setting has text, a value, and
 * a function that is called when its value changes.
 * As the settings involve switches, therefore boolean values, the value change will
 * change to the opposite of the value.
 */
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
