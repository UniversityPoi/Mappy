import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import styles from "../../styles/settings-menu-style";

export default function SettingsMenu() {
  return (
    <SafeAreaView style={styles.safeArea1}>
      <StatusBar hidden={false}></StatusBar>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerStyle: styles.stackScreenHeader,
          headerTitle: "Settings"
        }} />
      
      
    </SafeAreaView>
  )
}