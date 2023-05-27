import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Mapbox from '@rnmapbox/maps';
import Constants from "expo-constants";

import styles from './map.style';



Mapbox.setAccessToken(Constants?.expoConfig?.extra?.MAPBOX_PUBLIC_KEY);

const UPDATE_DISTANCE = 5;


const Map = () => {
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ coords: { latitude: 0, longitude: 0 } });
  const [userCamera, setUserCamera] = useState(<Mapbox.Camera followUserLocation followZoomLevel={15}/>);
  
  
  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(status => {
        setPermissionGranted(status.granted);
      })
      .catch(err => {
        console.log(err);
      });
  },[])


  const userLocationOnUpdate = (location) => {
    console.log(location);
  }


  return (
    <View style={styles.mapContainer}>
      {isPermissionGranted ?
        <Mapbox.MapView style={styles.map} scaleBarEnabled={false} compassEnabled>
          {userCamera}
          <Mapbox.UserLocation onUpdate={userLocationOnUpdate} minDisplacement={UPDATE_DISTANCE} visible animated/>
          {/* <Mapbox.PointAnnotation draggable={true} id="point1" coordinate={[78.5, 20.5]}></Mapbox.PointAnnotation> */}
        </Mapbox.MapView> 
        : <Text>Please allow Location Permission...</Text>
      }
    </View>
  );
}

export default Map;
