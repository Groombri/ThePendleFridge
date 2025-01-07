import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import TextStyles from '../styles/TextStyles';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <CustomHeader title="The Pendle Fridge" route="Home" />
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