import { useState } from 'react';
import { Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import icons from '../constants/icons';
import styles from '../styles/index.style';
import mainStyles from '../styles/main.style';

import Map from '../components/main/map/Map';
import HeaderButton from '../components/header/HeaderButton';



const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={mainStyles.safeArea}>
      <StatusBar hidden={false}></StatusBar>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerStyle: mainStyles.stackScreenHeader,
          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              <HeaderButton icon={icons.favorite}/>
              <HeaderButton icon={icons.marker}/>
            </View>
          ),
          headerRight: () => <HeaderButton icon={icons.menu} handlePress={() => {router.push("/settings-menu/settings-menu")}}/>,
          headerTitle:""
        }}/>
    </SafeAreaView>
  );
}

export default Home;