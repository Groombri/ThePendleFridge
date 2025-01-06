import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import YellowButton from '../components/YellowButton';
import MenuButton from '../components/MenuButton';
import DonateModal from '../components/DonateModal';

function CustomHeader({ title, route }) {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.header}>
            <View style={styles.header_main}>
                <MenuButton />
                <Text style={styles.title_text}>{title}</Text>
                <Image style={styles.pendle_icon} source={require('../assets/images/pendle.png')}/>
            </View>
            {route === 'Home' && (  //only displays the donation button on the header if on home page
                <View style={styles.header_btn_container}>
                    <YellowButton 
                        title="Donate an item"
                        onPress={() => {setModalVisible(true)}}
                    />
                    <DonateModal visible={isModalVisible} onClose={() => {setModalVisible(false)}} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
    pendle_icon: {
        width: 37,
        height: 37,
        marginRight: -4
    },
    title_text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 29,
        color: "white",
        marginLeft: 3
    },
});

export default CustomHeader;