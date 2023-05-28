import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './new-favorite-location.style';

const NewFavoriteLocation = ({ visible, onCancel, onConfirm, onHide }) => {
  const [locationName, setLocationName] = useState('');

  const handleConfirm = () => {
    onConfirm(locationName);
    setLocationName('');
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Location Name</Text>
            <TextInput
              style={styles.input}
              value={locationName}
              onChangeText={setLocationName}
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={onHide} style={[styles.button, styles.hideButton]}>
              <Text style={styles.buttonText}>Change Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewFavoriteLocation;