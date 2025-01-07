import { SafeAreaView } from 'react-native';
import DrawerNav from "./app/components/DrawerNav";
import SafeViewAndroid from "./app/styles/SafeViewAndroid";

export default function App() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <DrawerNav />
    </SafeAreaView>
  );
}


