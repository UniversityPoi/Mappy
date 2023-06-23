import { View, ScrollView, Text, Modal, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  const login = () => {
    setIsLoading(true);

    useFetch(loginUserOptions(email, password))
      .then(data => {
        var user = data.user;
        user.token = data.token;

        storeUser(user);
        fetchFavoriteLocations(user.token);
        setVisible(false);
      })
      .catch(error => displayMessage(error))
      .finally(() => setIsLoading(false));
  }

  const storeUser = user => {
    AsyncStorage.setItem('user', JSON.stringify(user))
      .then(() => {
        dispatch(setUser(user));
        setVisible(false);
      });
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
        transparent>
        <View style={styles.centeredView}>
          <ScrollView>
            <View style={styles.modalView}>
              <Text style={mainStyles.text}>Email</Text>
              <TextInput style={mainStyles.inputText}
                maxLength={100}
                inputMode='email'
                textAlign='center'
                textContentType='emailAddress'
                placeholder='Enter your Email'
                onChangeText={value => setEmail(value)} />

              <Text style={mainStyles.text}>Password</Text>
              <TextInput style={mainStyles.inputText}
                maxLength={256}
                textAlign='center'
                secureTextEntry={true}
                textContentType='password'
                passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                placeholder='Enter your Password'
                onChangeText={value => setPassword(value)} />

              <TouchableOpacity style={mainStyles.button} onPress={login} disabled={isLoading}>
                <Text style={mainStyles.buttonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity style={mainStyles.button} onPress={() => setVisible(false)}>
                <Text style={mainStyles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          </View>
      </Modal>
    </View>
  )
}