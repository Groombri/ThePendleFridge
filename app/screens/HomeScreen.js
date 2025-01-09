import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import TextStyles from '../styles/TextStyles';
import ReadFridge from '../utils/ReadFridge';

/**
 * The application's home screen. This includes the apps custom header + donate an item button.
 * The body contains the current inventory of the fridge.
 * @param {*} navigation ...
 * @returns the contents of the Home Screen, initially as the initialRoute in the Drawer Navigator.
 */
function HomeScreen({ navigation }) {

  let fridgeContents = "null";

  ReadFridge((data) => {
    if(data) {
      console.log("DATA!", data);
    }
    else {
      console.log("NO data or ERROR");
    }
  });

  //if the fridge is empty, display message in the body's <ScrollView>
  const fridgeEmptyContent = (
    <>
    <Image style={styles.empty_icon} source={require('../assets/images/empty.png')}/>
    <Text style={TextStyles.bodyMain}>
      It looks like there's no food in at the moment...
    </Text>
    <TouchableOpacity 
      navigation={navigation}
      onPress={() => navigation.navigate("Notifications")} 
    >
      <Text style={TextStyles.link}>Configure notification settings</Text>
    </TouchableOpacity>
    <Text style={TextStyles.bodyMain}>to know when food is next donated.</Text>
    </>
  );

  //if the fridge is not empty, display it's contents in the <ScrollView>
  const fridgeNotEmptyContent = (
    <Text style={TextStyles.bodyMain}>{fridgeContents}</Text>
  );
  
  return (
    <View style={styles.container}>
        <CustomHeader title="The Pendle Fridge" route="Home" navigation={navigation} />
        <View style={styles.body}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {fridgeContents === "null" ? fridgeEmptyContent : fridgeNotEmptyContent}
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
    scrollView: {
        alignItems: "center",
        marginTop: 20,
    },
    empty_icon: {
        width: 300,
        height: 300,
        marginTop: 20,
        marginBottom: 20
    }
});

export default HomeScreen;