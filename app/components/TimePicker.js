import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StringToDate, DateToString } from "../utils/DateUtils";
import handleSettingChange from "../utils/UpdateSettings";

/**
 * Allows the user to select two times. For use in notification settings where
 * user will only receive notifications between the two times selected.
 */
const TimePicker = ({ notificationTimesEnabled, notificationTimes }) => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isTimePicker2Visible, setTimePicker2Visible] = useState(false);
  const [time, setTime] = useState(DateToString(new Date(0, 0, 0, 9, 0)));
  const [time2, setTime2] = useState(DateToString(new Date(0, 0, 0, 17, 0)));
  const [isFirstRender, setIsFirstRender] = useState(true);

  //on every rerender, if notificationTimes are enabled, set users notification times to times on the time picker
  useEffect(() => {
    if (notificationTimesEnabled) {
      let times = [time, time2];
      //if this is the first render, get the times from the users settings
      if (isFirstRender && notificationTimes.length === 2) {
        setTime(notificationTimes[0]);
        setTime2(notificationTimes[1]);
        times = [time, time2];
        setIsFirstRender(false);
      } else {
        handleSettingChange("notificationTimes", times);
      }
    }
  }, [time, time2, notificationTimesEnabled]);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const showTimePicker2 = () => {
    setTimePicker2Visible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
    setTimePicker2Visible(false);
  };

  const handleConfirm = (time) => {
    setTime(DateToString(time));
    hideTimePicker();
  };

  const handleConfirm2 = (time) => {
    setTime2(DateToString(time));
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Between </Text>
      <Button title={time} onPress={showTimePicker} />
      <Text style={styles.text}>and </Text>
      <Button title={time2} onPress={showTimePicker2} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        date={StringToDate(time)}
      />
      <DateTimePickerModal
        isVisible={isTimePicker2Visible}
        mode="time"
        onConfirm={handleConfirm2}
        onCancel={hideTimePicker}
        date={StringToDate(time2)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 15,
    marginRight: -5,
  },
});

export default TimePicker;
