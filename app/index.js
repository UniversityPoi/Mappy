import { View, SafeAreaView, StatusBar, ToastAndroid } from 'react-native';
import { useEffect, useRef } from "react";
import { Stack, useRouter } from 'expo-router';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userActions";
import { setLocation } from "../redux/location/locationActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFetch, getFavoriteLocationsOptions } from '../hooks/useFetch';
import Map from '../components/main/map/Map';
import ImageButton from '../components/buttons/ImageButton';

import icons from '../constants/icons';
import mainStyles from '../styles/main.style';



const Home = () => {
  const mapRef = useRef();
  const router = useRouter();
  const dispatch= useDispatch();


  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        if (user !== null) {
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

        <Map ref={mapRef}/>
    </SafeAreaView>
  );
}

export default Home;