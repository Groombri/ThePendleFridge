import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import SafeViewAndroid from '../styles/SafeViewAndroid';
import CustomHeader from '../components/CustomHeader';
import TextStyles from '../styles/TextStyles';

function HomeScreen() {
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View style={styles.container}>
                <CustomHeader title="The Pendle Fridge" route="Home" />
                <View style={styles.body}>
                    <ScrollView >
                        <Text style={TextStyles.bodyTitle}>Hello</Text>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
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