import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Mapbox from '@rnmapbox/maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import ImageButton from '../buttons/ImageButton';
import { setCamera } from '../../redux/camera/cameraAction';
import { setLocation } from '../../redux/location/locationActions';
import { useFetch, deleteFavoriteLocationOptions, getFavoriteLocationsOptions } from '../../hooks/useFetch';

import mainStyles from '../../styles/main.style';
import icons from '../../constants/icons';
import styles from './favorite-location-list.style';



const FavoriteLocationList = () => {
  const { favoriteLocations } = useSelector(state => state.locationReducer);
  const { user } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const router = useRouter();


  const focusLocation = (location) => {
    dispatch(setCamera([
      <Mapbox.Camera
        key={location.id}
        centerCoordinate={[location.latitude, location.longitude]}
      />
    ]));

    router.back();
  }


  const deleteFavoriteLocation = (id) => {
    useFetch(deleteFavoriteLocationOptions(id, user.token))
      .then(response => {
        if (response.status == 200) fetchFavoriteLocations(user.token);
      })
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



  return (
    <>
      <Text style={[mainStyles.text, styles.container]}>Your Favorite Locations</Text>
      <ScrollView>
        {
          favoriteLocations && favoriteLocations.map((location, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{location.name}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => { focusLocation(location) }}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <ImageButton icon={icons.trash} handlePress={() => { deleteFavoriteLocation(location.id) }} />
            </View>
          ))
        }
      </ScrollView>
    </>
  );
};

export default FavoriteLocationList;