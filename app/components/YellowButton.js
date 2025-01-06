import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

/**
 * Creates a custom yellow button to be used throughout the application 
 */
const YellowButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={styles.yellow_button}
            activeOpacity={0.8}
        >
            <Text style={styles.yellow_button_text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    yellow_button: {
        backgroundColor: "#FFB900",
        width: "65%",
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
    },

    yellow_button_text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
        textAlign: "center",
    },
})

export default YellowButton