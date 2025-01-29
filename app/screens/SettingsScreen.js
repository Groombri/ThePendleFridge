import { React, useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import DefaultPageStyle from "../styles/DefaultPageStyle";
import TextStyles from "../styles/TextStyles";
import { ScrollView } from "react-native-gesture-handler";

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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={TextStyles.bodyMain}>
          {/* Here you can configure whether to receive notifications on when new
          items have been added to the fridge. */}
        </Text>
        <View style={styles.settingContainer}>
          <Text style={TextStyles.bodyMain}>Enable push notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </View>
        <View style={styles.settingContainer}>
          <Text style={TextStyles.bodyMain}>
            Notify me even if a product matches my allergens
          </Text>
          <Switch
            value={allergenNotificationsEnabled}
            onValueChange={() =>
              setAllergenNotificationsEnabled(!allergenNotificationsEnabled)
            }
          />
        </View>
        <View style={styles.settingContainer}>
          <Text style={TextStyles.bodyMain}>Only notify me when on campus</Text>
          <Switch
            value={campusNotificationsEnabled}
            onValueChange={() =>
              setCampusNotificationsEnabled(!campusNotificationsEnabled)
            }
          />
        </View>
        <View style={styles.settingContainer}>
          <Text style={TextStyles.bodyMain}>Notify me</Text>
          <Switch
            value={notificationTimes}
            onValueChange={() => setNotificationTimes(!notificationTimes)}
          />
        </View>
        <View style={styles.settingContainer}>
          <Text style={TextStyles.bodyMain}>
            Only notify me for certain foods
          </Text>
          <Switch
            value={notifyFoods}
            onValueChange={() => setNotifyFoods(!notifyFoods)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    margin: 20,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
});
