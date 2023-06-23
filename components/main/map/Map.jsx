import { View, ToastAndroid } from 'react-native';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch, addFavoriteLocationsOptions, getFavoriteLocationsOptions, addLocation } from '../../../hooks/useFetch';
import { setLocation } from "../../../redux/location/locationActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mapbox from '@rnmapbox/maps';
import Constants from "expo-constants";
import NewFavoriteLocation from '../../modal/new-favorite-location/NewFavoriteLocation';
import Marker from '../marker/Marker';

import styles from './map.style';


Mapbox.setAccessToken(Constants?.expoConfig?.extra?.MAPBOX_PUBLIC_KEY);

const UPDATE_DISTANCE = 5;


const Map = forwardRef((props, ref) => {
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [userCamera, setUserCamera] = useState([<Mapbox.Camera key='camera' followUserLocation followZoomLevel={15} />]);
  const [newFavoriteMarker, setNewFavoriteMarker] = useState(null);
  const [newFavoriteMarkerLocation, setNewFavoriteMarkerLocation] = useState(null);
  const [shouldShowFavoriteLocationModal, setShouldShowFavoriteLocationModal] = useState(false);
  const { user } = useSelector(state => state.userReducer);
  const { favoriteLocations } = useSelector(state => state.locationReducer);
  const { camera } = useSelector(state => state.cameraReducer);
  const dispatch = useDispatch();



  useImperativeHandle(ref, () => ({
    _centerCamera() { centerCamera() },
    _setNewFavorite() { createNewFavoriteMarker() }
  }));


  const centerCamera = () => {
    setUserCamera([
      <Mapbox.Camera
        key={Math.random().toString(36).substring(7)}
        followUserLocation
        followZoomLevel={15}
      />
    ]);
  }


  const createNewFavoriteMarker = () => {
    if (newFavoriteMarker != null) {
      setShouldShowFavoriteLocationModal(true);
      return;
    }

    setNewFavoriteMarker(
      <Mapbox.PointAnnotation
        id={Math.random().toString(36).substring(7)}
        coordinate={[currentLocation.longitude, currentLocation.latitude]}
        draggable={true}
        onDragEnd={onFavoriteMarkerDrag}>
      </Mapbox.PointAnnotation>
    );
    setShouldShowFavoriteLocationModal(true);
    setNewFavoriteMarkerLocation([currentLocation.longitude, currentLocation.latitude]);
  }


  const userLocationOnUpdate = (location) => {
    if (user) {
      useFetch(addLocation({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
      }, user.token));
    }

    setCurrentLocation(location.coords);
  }


  const onNewFavoriteLocationConfirm = (name) => {
    if (name.length < 3 || name.length > 20) {
      displayMessage("Location name must be between 3 and 20 characters!");
      return;
    }

    var newLocation = {
      name: name,
      coordinates: {
        latitude: newFavoriteMarkerLocation[0],
        longitude: newFavoriteMarkerLocation[1]
      }
    };

    if (user) {
      useFetch(addFavoriteLocationsOptions(newLocation, user.token))
        .then(_ => {
          displayMessage(`Added ${name}!`);
          fetchFavoriteLocations(user.token);
        })
        .catch(error => {
          displayMessage(error);
        });
    }

    onNewFavoriteLocationClose();
  }


  const fetchFavoriteLocations = (token) => {
    useFetch(getFavoriteLocationsOptions(token))
      .then(data => {
        AsyncStorage.setItem('favoriteLocations', JSON.stringify(data))
          .then(() => dispatch(setLocation(data)));
      })
  }


  const onNewFavoriteLocationClose = () => {
    setNewFavoriteMarker(null);
    setShouldShowFavoriteLocationModal(false);
  }


  const onNewFavoriteLocationHide = () => {
    setShouldShowFavoriteLocationModal(false);
  }


  const onFavoriteMarkerDrag = (value) => {
    setNewFavoriteMarkerLocation(value.geometry.coordinates);
  }


  const displayMessage = message => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
  }


  return (
    <View style={styles.mapContainer}>
      <Mapbox.MapView style={styles.map} scaleBarEnabled={false} compassEnabled>
        <Mapbox.UserLocation onUpdate={userLocationOnUpdate} minDisplacement={UPDATE_DISTANCE} visible animated />
        {userCamera}
        {camera}
        {newFavoriteMarker}

        {
          favoriteLocations && favoriteLocations.map((marker, _) => (
            <Marker
              key={marker.id}
              name={marker.name}
              coords={[marker.latitude, marker.longitude]}
            />
          ))
        }

      </Mapbox.MapView>

      <NewFavoriteLocation
        visible={shouldShowFavoriteLocationModal}
        onConfirm={onNewFavoriteLocationConfirm}
        onCancel={onNewFavoriteLocationClose}
        onHide={onNewFavoriteLocationHide} />
    </View>
  );
});

export default Map;
