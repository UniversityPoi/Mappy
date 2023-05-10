import { useState } from 'react';
import { Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from '../styles/index.style';

import Map from '../components/main/Map';
import HeaderRight from '../components/header/right/HeaderRight';

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={ styles.safeArea1 }>
      <StatusBar hidden={false}></StatusBar>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          
          headerStyle: styles.stackScreenHeader,
          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              <Text>Marker</Text>
              <Text>Home</Text>
            </View>
          ),
          headerRight: () => <HeaderRight></HeaderRight>
        }}/>
    </SafeAreaView>
  );
}

export default Home;