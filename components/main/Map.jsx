import { StyleSheet, Text, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Constants from "expo-constants";
import styles from './map.style';


Mapbox.setAccessToken(Constants?.expoConfig?.extra?.MAPBOX_PUBLIC_KEY);


const Map = () => {
  return (
    <View style={styles.mapContainer}>
        <Mapbox.MapView style={styles.map} scaleBarEnabled={false}>
          <Mapbox.Camera zoomLevel={15} centerCoordinate={[78, 20]}></Mapbox.Camera>
          <Mapbox.PointAnnotation id="point1" coordinate={[78.5, 20.5]}></Mapbox.PointAnnotation>
        </Mapbox.MapView>
      </View>
  );
}

export default Map;
