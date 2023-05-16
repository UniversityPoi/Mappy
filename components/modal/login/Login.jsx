import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userActions';

import styles from './login.style';
import mainStyles from '../../../styles/main.style';



export default function Login() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const login = () => {
    dispatch(setUser({ username: username, email: email, token: password }));
    setVisible(false);
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

            {error ? (<Text style={mainStyles.warningText}>{error}</Text>) : null}

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