import { View, Text, Modal, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useFetch, registerUserOptions } from '../../../hooks/useFetch';

import styles from './register.style';
import mainStyles from '../../../styles/main.style';



const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^(?![-_])[a-zA-Z0-9-_]{3,10}$/;


export default function Register() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = () => {
    if (!usernameRegex.test(username)) displayMessage('Invalid username!');
    else if (!emailRegex.test(email)) displayMessage('Invalid email!');
    else if (password !== confirmPassword) displayMessage('Passwords do not match!');
    else if (!passwordRegex.test(password)) displayMessage('Password must contain mininum of 8 chars, lower, upper and digit!');
    else {
      useFetch(registerUserOptions(username, email, password, confirmPassword))
        .then(response => {
          if (response.error) {
            if (!response.error.errors) displayMessage(JSON.stringify(response.error.message));
          } 
          else {
            displayMessage(JSON.stringify(response.data.message));
            if (response.status == 200) setVisible(false);
          }
        });
    }
  }

  const displayMessage = message => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
  }

  return (
    <View>

      <TouchableOpacity style={mainStyles.button} onPress={() => setVisible(true)}>
        <Text style={mainStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        visible={visible}
        transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={mainStyles.text}>Username</Text>
            <TextInput style={mainStyles.inputText}
              numberOfLines={1}
              maxLength={10}
              inputMode='text'
              textContentType='name'
              textAlign='center'
              placeholder='Enter your Username'
              onChangeText={value => setUsername(value)}/>

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

            <Text style={mainStyles.text}>Confirm Password</Text>
            <TextInput style={mainStyles.inputText}
              maxLength={256}
              textAlign='center'
              secureTextEntry={true}
              textContentType='password'
              passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
              placeholder='Enter your Password again'
              onChangeText={value => setConfirmPassword(value)}/>

            <TouchableOpacity style={mainStyles.button} onPress={register}>
              <Text style={mainStyles.buttonText}>Sign Up</Text>
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