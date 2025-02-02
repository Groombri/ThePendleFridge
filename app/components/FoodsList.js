import { React, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TextStyles from "../styles/TextStyles";

/**
 * Renders a list of food items the user is interested in.
 * Users can add and delete items from the list.
 * Max number of items is 10
 * Based on https://medium.com/@worachote/building-a-todo-list-app-with-react-native-a-step-by-step-guide-7ed7871d3f98
 */
export const FoodsList = ({ notifyFoodsEnabled, foods }) => {
  const [foodList, setFoodList] = useState([]);
  const [text, setText] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);

  //on every rerender, if notificationTimes are enabled, set users notification times to times on the time picker
  useEffect(() => {
    if (notifyFoodsEnabled) {
      if (isFirstRender) {
        setFoodList(foods);
        setIsFirstRender(false);
      } else {
        handleSettingChange("notifyFoods", foodList);
      }
    }
  }, [foodList, notifyFoodsEnabled]);

  /**
   * Adds a food item to the list.
   * Items must have a length larger than 1 and there must not be
   * more than 10 items in the list.
   */
  const addLabel = () => {
    const newLabel = { id: Date.now(), text };
    if (foodList.length >= 10) {
      Alert.alert(
        "Failed to add item",
        "You have reached the max number of items!"
      );
    } else if (text.length > 1) {
      setFoodList([...foodList, newLabel]);
      setText("");
    } else {
      Alert.alert("Failed to add item", "Text not valid");
    }
  };

  const deleteLabel = (id) => {
    setFoodList(foodList.filter((label) => label.id !== id));
  };

  //Renders the list component
  return (
    <View>
      {foodList.map((label) => (
        <FoodLabel key={label.id} label={label} deleteLabel={deleteLabel} />
      ))}
      <View style={styles.foodLabel}>
        <Text style={{ fontSize: 40, marginRight: 10 }}>•</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add item here..."
          maxLength={30}
          style={[styles.labelText, styles.labelInput]}
        />
        <TouchableOpacity onPress={addLabel}>
          <Ionicons name="add-circle" size={35} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FoodLabel = ({ label, deleteLabel }) => {
  return (
    <View style={styles.foodLabel}>
      <Text style={{ fontSize: 40, marginRight: 10 }}>•</Text>
      <Text style={[TextStyles.bodyTitle, styles.labelText]}>{label.text}</Text>
      <TouchableOpacity onPress={() => deleteLabel(label.id)}>
        <Ionicons name="remove-circle" size={35} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  foodLabel: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 25,
  },
  labelInput: {
    fontSize: 20,
  },
});
