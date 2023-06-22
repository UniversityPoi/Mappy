import { View, Text, Modal, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userActions';
import { setLocation } from "../../../redux/location/locationActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFetch, loginUserOptions, getFavoriteLocationsOptions } from '../../../hooks/useFetch';

import styles from './login.style';
import mainStyles from '../../../styles/main.style';



export default function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const login = () => { 
    useFetch(loginUserOptions(email, password))
    .then(response => {
      if (response.error) {
        var errors = response.error.errors;

        if (errors) {
          if (errors.Email) displayMessage(JSON.stringify(errors.Email[0]));
          else if (errors.Password) displayMessage(JSON.stringify(errors.Password[0]));
        } 
        else {
          displayMessage(JSON.stringify(response.error.message));
        }
      } 
      else {
        displayMessage(JSON.stringify(response.data.message));
        if (response.status == 200) {
          var user = response.data.user;
          user.token = response.data.token;

          storeUser(user);
          fetchFavoriteLocations(user.token);
          setVisible(false);
        }
      }
    });
  }

  const storeUser = user => {
    AsyncStorage.setItem('user', JSON.stringify(user))
      .then(() => {
        dispatch(setUser(user));
        setVisible(false);
      })
      .catch(error => displayMessage(error));
  }


  const fetchFavoriteLocations = (token) => {
    useFetch(getFavoriteLocationsOptions(token))
      .then(response => {
        if (response.status == 200) {
          AsyncStorage.setItem('favoriteLocations', JSON.stringify(response.data))
            .then(() => dispatch(setLocation(response.data)));
        }
      })
  }


  const displayMessage = message => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
  }


  
  return (
    <View>

      <TouchableOpacity style={mainStyles.button} onPress={() => setVisible(true)}>
        <Text style={mainStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        visible={visible}
        transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={mainStyles.text}>Email</Text>
            <TextInput style={mainStyles.inputText}
              maxLength={100}
              inputMode='email'
              textAlign='center'
              textContentType='emailAddress'
              placeholder='Enter your Email'
              onChangeText={value => setEmail(value)}/>

            <Text style={mainStyles.text}>Password</Text>
            <TextInput style={mainStyles.inputText}
              maxLength={256}
              textAlign='center'
              secureTextEntry={true}
              textContentType='password'
              passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
              placeholder='Enter your Password'
              onChangeText={value => setPassword(value)}/>

            <TouchableOpacity style={mainStyles.button} onPress={login}>
              <Text style={mainStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={mainStyles.button} onPress={() => setVisible(false)}>
              <Text style={mainStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}