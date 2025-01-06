import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Hamburger menu button for page navigation
const MenuButton = () => {
    const navigation = useNavigation(); //allows navigation object to be accessed even though component isnt screen
    return (
        <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            activeOpacity={0.8}
        >
        <Image style={styles.burger_icon} source={require('../assets/images/burger_menu.png')}/>  
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    burger_icon: {
        width: 30,
        height: 30,
    }
});

export default MenuButton;