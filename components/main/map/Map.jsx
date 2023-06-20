import { Text, View, ToastAndroid } from 'react-native';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch, addFavoriteLocationsOptions, getFavoriteLocationsOptions } from '../../../hooks/useFetch';
import { setLocation } from "../../../redux/location/locationActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import Mapbox from '@rnmapbox/maps';
import Constants from "expo-constants";
import NewFavoriteLocation from '../../modal/new-favorite-location/NewFavoriteLocation';
import Marker from '../marker/Marker';

import styles from './map.style';


Mapbox.setAccessToken(Constants?.expoConfig?.extra?.MAPBOX_PUBLIC_KEY);

const UPDATE_DISTANCE = 5;


const Map = forwardRef((props, ref) => {
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [userCamera, setUserCamera] = useState([<Mapbox.Camera key='camera' followUserLocation followZoomLevel={15}/>]);
  const [newFavoriteMarker, setNewFavoriteMarker] = useState(null);
  const [newFavoriteMarkerLocation, setNewFavoriteMarkerLocation] = useState(null);
  const [shouldShowFavoriteLocationModal, setShouldShowFavoriteLocationModal] = useState(false);

  const dispatch= useDispatch();

  const { user } = useSelector(state => state.userReducer);
  const { favoriteLocations } = useSelector(state => state.locationReducer);
  const { camera } = useSelector(state => state.cameraReducer);
  

  
  useImperativeHandle(ref, () => ({
    _centerCamera() { centerCamera() },
    _setNewFavorite() { createNewFavoriteMarker() }
  }));
  

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(status => {
        setPermissionGranted(status.granted);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const centerCamera = () => {
    setUserCamera(prev=> 
      [...prev.slice(0, -1), 
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
          <Marker/>
      </Mapbox.PointAnnotation>
    );
    setShouldShowFavoriteLocationModal(true);
    setNewFavoriteMarkerLocation([currentLocation.longitude, currentLocation.latitude]);
  }

  const userLocationOnUpdate = (location) => {
    setCurrentLocation(location.coords);
  }

  const onNewFavoriteLocationConfirm = (markerName) => {
    var newMarker = { 
      name: markerName,
      coordinates: {
        latitude: newFavoriteMarkerLocation[0],
        longitude: newFavoriteMarkerLocation[1]
      }
    };
    
    useFetch(addFavoriteLocationsOptions(newMarker, user.token))
      .then(response => {
        if (response.error) {
          displayMessage(JSON.stringify(response.error.message));
        } else {
          if (response.status == 200) {
            displayMessage(`Added ${markerName}!`);
            fetchFavoriteLocations(user.token);
          }
        }
      });

    onNewFavoriteLocationClose();
  }

  const fetchFavoriteLocations = (token) => {
    useFetch(getFavoriteLocationsOptions(token))
      .then(response => {
        if (response.status == 200) {
          AsyncStorage.setItem('favoriteLocations', JSON.stringify(response.data))
            .then(() => {
              dispatch(setLocation(response.data));
            });
        }
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
      {isPermissionGranted ? <>
        <Mapbox.MapView style={styles.map} scaleBarEnabled={false} compassEnabled>
          <Mapbox.UserLocation onUpdate={userLocationOnUpdate} minDisplacement={UPDATE_DISTANCE} visible animated/>
          {userCamera}
          {camera}
          {newFavoriteMarker}

          {
            favoriteLocations.map((marker, _) => (
              <Mapbox.PointAnnotation
                key={marker.id}
                id={marker.id}
                coordinate={[marker.latitude, marker.longitude]}>
                  <Marker name={marker.name}/>
              </Mapbox.PointAnnotation>
            ))
          }

        </Mapbox.MapView>

        <NewFavoriteLocation 
          visible={shouldShowFavoriteLocationModal}
          onConfirm={onNewFavoriteLocationConfirm}
          onCancel={onNewFavoriteLocationClose}
          onHide={onNewFavoriteLocationHide}/>

        </> : <Text>Please allow Location Permission...</Text>
      }
    </View>
  );
});

export default Map;
