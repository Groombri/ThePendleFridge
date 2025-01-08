import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import TextStyles from '../styles/TextStyles';

/**
 * The applications home screen. This includes the apps custom header + donate an item button.
 * The body contains the current inventory of the fridge.
 * @param {*} navigation ...
 * @returns the contents of the Home Screen to the Stack in App.js
 */
function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
          <CustomHeader title="The Pendle Fridge" route="Home" navigation={navigation} />
          <View style={styles.body}>
              <ScrollView >
                  <Text style={TextStyles.bodyTitle}>What's in?</Text>
              </ScrollView>
          </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    body: {
        flex: 4,
        backgroundColor: "white"
    },
});

export default HomeScreen;