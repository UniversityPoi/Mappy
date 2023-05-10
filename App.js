import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

import Constants from "expo-constants";


Mapbox.setAccessToken(Constants?.expoConfig?.extra?.MAPBOX_PUBLIC_KEY);


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.mapContainer}>
        <Mapbox.MapView style={styles.map} scaleBarEnabled={false}>
          <Mapbox.Camera zoomLevel={15} centerCoordinate={[78, 20]}></Mapbox.Camera>
          <Mapbox.PointAnnotation id="point1" coordinate={[78.5, 20.5]}></Mapbox.PointAnnotation>
        </Mapbox.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    height: 300,
    width: '100%',
  },
  map: {
    flex: 1
  }
});
