import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

import mainStyles from '../../styles/main.style';
import icons from '../../constants/icons';
import ImageButton from '../buttons/ImageButton';

const FavoriteLocationList = () => {
  const { favoriteLocations } = useSelector(state => state.locationReducer);

  const deleteFavoriteLocation = (id) => {
    console.log(id);
  }

  return (
    <>
      <Text style={[mainStyles.text, styles.container]}>Your Favorite Locations</Text>
      <ScrollView>
        {favoriteLocations.map((location, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{location.name}</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <ImageButton icon={icons.trash} handlePress={deleteFavoriteLocation} data={location.id}/>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  text: {
    color: '#FF5A5F',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default FavoriteLocationList;