import { View, SafeAreaView, StatusBar, ToastAndroid, Text } from 'react-native';
import { useEffect, useRef, useState } from "react";
import { Stack, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userActions";
import { setLocation } from "../redux/location/locationActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFetch, getFavoriteLocationsOptions } from '../hooks/useFetch';
import Map from '../components/main/map/Map';
import ImageButton from '../components/buttons/ImageButton';
import { onInternetAccess } from '../modules/network';

import icons from '../constants/icons';
import mainStyles from '../styles/main.style';



const Home = () => {
  const mapRef = useRef();
  const router = useRouter();
  const dispatch= useDispatch();
  const [isOnline, setIsOnline] = useState(false);
  const [isLocationPermissionGranted, setLocationPermissionGranted] = useState(false);

  
  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(status => setLocationPermissionGranted(status.granted))
      .catch(err => displayMessage(err));

    onInternetAccess(() => setIsOnline(true), (_) => {});

    AsyncStorage.getItem('user')
      .then(user => {
        if (user) {
          var userObj = JSON.parse(user);
          dispatch(setUser(userObj));
          fetchFavoriteLocations(userObj.token);
        }
      });
  }, [])


  const fetchFavoriteLocations = (token) => {
    useFetch(getFavoriteLocationsOptions(token))
      .then(response => {
        if (response.status == 200) {
          AsyncStorage.setItem('favoriteLocations', JSON.stringify(response.data))
            .then(() => dispatch(setLocation(response.data)));
        } else {
          AsyncStorage.getItem('favoriteLocations')
            .then(locations => dispatch(setLocation(locations)));
          ToastAndroid.showWithGravity(response.error, ToastAndroid.LONG, ToastAndroid.TOP);
        }
      })
  }


  return (
    <SafeAreaView style={mainStyles.safeArea}>
      <StatusBar hidden={false}></StatusBar>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerStyle: mainStyles.stackScreenHeader,
          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              <ImageButton icon={icons.favorite} handlePress={() => mapRef.current._setNewFavorite()}/>
              <ImageButton icon={icons.marker} handlePress={() => mapRef.current._centerCamera()}/>
            </View>
          ),
          headerRight: () => 
            <ImageButton icon={icons.menu} handlePress={() => {router.push("./settings-menu")}}/>,
          headerTitle:""
        }}/>

        {
          isLocationPermissionGranted && isOnline ? <Map ref={mapRef}/> :
          !isLocationPermissionGranted ? <Text>Please grand Location Permission and restart the app...</Text> :
          !isOnline ? <Text>Turn on your internet connection and restart the app.../</Text> : null
        }
        
    </SafeAreaView>
  );
}

export default Home;