import { Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/user/userActions';

import styles from "../../styles/settings-menu.style";
import mainStyles from '../../styles/main.style';

import Register from '../../components/modal/register/Register';
import Login from '../../components/modal/login/Login';



export default function SettingsMenu() {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const clearUser = () => dispatch(setUser(null));

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
          <TouchableOpacity style={mainStyles.button} onPress={clearUser}>
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