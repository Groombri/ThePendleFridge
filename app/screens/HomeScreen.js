import { React, useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

  const [fridgeContents, setFridgeContents] = useState(null);   //fridge contents are set to null by default
  const [loadingContents, setLoadingContents] = useState(true); //loads fridge contents from start

  //Read the fridges contents when HomeScreen mounts
  useEffect(() => {
    ReadFridge((data) => {
      if(data) {
        setFridgeContents(data); 
      }
      else {
        console.log("NO data or ERROR");
        setFridgeContents(null);
      }
      //once contents have been loaded, set loading to false
      setLoadingContents(false);
    });
  },[]);

  //if contents are loading whilst user is in the screen, display message to let them know
  const loading = (
      <View style={styles.container}>
        <View style={styles.loading}>
          <MaterialIcons name="downloading" style={styles.loadingIcon}size={100} color="green" />
          <Text style={TextStyles.bodyMain}>Loading fridge contents...</Text>
        </View>
      </View>
    );

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
    <Text style={TextStyles.bodyMain}>{JSON.stringify(fridgeContents)}</Text>
  );
  
  return (
    <View style={styles.container}>
        <CustomHeader title="The Pendle Fridge" route="Home" navigation={navigation} />
        <View style={styles.body}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {loadingContents ? loading : (fridgeContents === "null" ? fridgeEmptyContent : fridgeNotEmptyContent)}
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
    loading: {
      flex: 4,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
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