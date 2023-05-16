import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userActions';

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
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const register = () => {
    if (!usernameRegex.test(username)) setError('Invalid username!');
    else if (!emailRegex.test(email)) setError('Invalid email!');
    else if (password !== confirmPassword) setError('Passwords do not match!');
    else if (!passwordRegex.test(password)) setError('Password must contain min 8 chars, lower, upper and digit!');
    else {
      dispatch(setUser({ username: username, email: email, token: password }));
      setVisible(false);
    }
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

            {error ? (<Text style={mainStyles.warningText}>{error}</Text>) : null}

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