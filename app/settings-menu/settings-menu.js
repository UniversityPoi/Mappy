import { Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/user/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "../../styles/settings-menu.style";
import mainStyles from '../../styles/main.style';

import Register from '../../components/modal/register/Register';
import Login from '../../components/modal/login/Login';



export default function SettingsMenu() {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const logout = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        dispatch(setUser(null));
      })
      .catch(error => {
        ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
      })
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
          <Text style={mainStyles.text}>Hello {user.email}</Text>
          <TouchableOpacity style={mainStyles.button} onPress={logout}>
            <Text style={mainStyles.buttonText}>Logout</Text>
          </TouchableOpacity>
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