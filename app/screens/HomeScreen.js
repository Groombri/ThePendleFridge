import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import SafeViewAndroid from '../styles/SafeViewAndroid';

// CUSTOM BUTTON
const AppButton = ({ onPress, title }) => (
    <TouchableOpacity 
        onPress={onPress} 
        style={styles.header_button}
        activeOpacity={0.8}
    >
      <Text style={styles.header_button_text}>{title}</Text>
    </TouchableOpacity>
  );

// CUSTOM BUTTON OF HAMBURGER MENU
  const MenuButton = ({ onPress }) => (
    <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.8}
    >
    <Image style={styles.burger_icon} source={require('../assets/images/burger_menu.png')}/>
    </TouchableOpacity>
);

function HomeScreen(props) {
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.header_main}>
                        <MenuButton/>
                        <Text style={styles.title_text}>
                        The Pendle Fridge
                        </Text>
                        <Image style={styles.pendle_icon} source={require('../assets/images/pendle.png')}/>
                    </View>
                    <View style={styles.header_btn_container}>
                        <AppButton title="Donate an item"/>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text>HELLO</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flex: 1,
        backgroundColor: "green",
    },

    header_main: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },

    header_btn_container: {
        alignItems: "center",
    },

    header_button: {
        backgroundColor: "#FFB900",
        width: "80%",
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
    },

    header_button_text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        textAlign: "center",
    },

    burger_icon: {
        width: 30,
        height: 30,
    },

    pendle_icon: {
        width: 50,
        height: 50,
    },

    body: {
        flex: 4,
        backgroundColor: "white"
    },

    title_text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 29,
        color: "white"
    }
});

export default HomeScreen;