import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, View } from 'react-native';
import SafeViewAndroid from '../styles/SafeViewAndroid';
import CustomHeader from '../components/CustomHeader';
import DefaultPageStyle from '../styles/DefaultPageStyle';
import TextStyles from '../styles/TextStyles';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={DefaultPageStyle.container}>
        <CustomHeader title="Notifications" />
        <View style={DefaultPageStyle.body}>
          <Text style={TextStyles.bodyTitle}>Hello</Text>
          <Text style={TextStyles.bodyMain}>This is the notifications page.</Text>
          <StatusBar style="auto" />
        </View>
      </View>
    </SafeAreaView>
  );
}

