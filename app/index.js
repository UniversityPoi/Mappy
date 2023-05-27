import { Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from "react-native";
import { useEffect, useRef } from "react";

import icons from '../constants/icons';
import styles from '../styles/index.style';
import mainStyles from '../styles/main.style';

import Map from '../components/main/map/Map';
import HeaderButton from '../components/header/HeaderButton';



const Home = () => {
  const mapRef = useRef();

  const router = useRouter();
  const dispatch= useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        if (user !== null) {
          dispatch(setUser(JSON.parse(user)));
        }
      });
  }, [])

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
              <HeaderButton icon={icons.marker} handlePress={() => mapRef.current.centerCamera()}/>
            </View>
          ),
          headerRight: () => 
            <HeaderButton icon={icons.menu} handlePress={() => {router.push("/settings-menu/settings-menu")}}/>,
          headerTitle:""
        }}/>

        <Map ref={mapRef}/>
    </SafeAreaView>
  );
}

export default Home;