import { Text, SafeAreaView, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native';
import { Stack } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../redux/user/userActions";
import { setLocation } from '../redux/location/locationActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from '../components/modal/register/Register';
import Login from '../components/modal/login/Login';
import FavoriteLocationList from '../components/settings/FavoriteLocationList';

import mainStyles from '../styles/main.style';



export default function SettingsMenu() {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();


  const logout = () => {
    AsyncStorage.removeItem('user')
      .then(() => dispatch(setUser(null)))
      .catch(error => displayMessage(JSON.stringify(error)));
    
    AsyncStorage.removeItem('favoriteLocations')
      .then(() => dispatch(setLocation([])))
      .catch(error => displayMessage(JSON.stringify(error)));
  }


  const displayMessage = message => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
  }

  
  return (
    <SafeAreaView style={mainStyles.safeArea}>
      <StatusBar hidden={false}></StatusBar>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerStyle: mainStyles.stackScreenHeader,
          headerTitle: "Settings"
        }} />

      {user ? (
        <>
          <Text style={mainStyles.text}>Hello {user.username}</Text>
          <TouchableOpacity style={mainStyles.button} onPress={logout}>
            <Text style={mainStyles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <FavoriteLocationList/>
        </>
      ) : (
        <>
          <Text style={mainStyles.text}>You are not logged in...</Text>
          <Login />
          <Register />
        </>
      )}
    </SafeAreaView>
  )
}