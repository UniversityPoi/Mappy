import { View, Image, Text } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import icons from '../../../constants/icons';
import styles from './marker.style';

const Marker = ({ name = "New Location", coords }) => {
  const markerSize = 100 + name.length * 2;

  return (
    <Mapbox.MarkerView coordinate={[coords[0], coords[1] + 0.000175]} allowOverlap={true}>
      <View style={[styles.markerContainer, { width: markerSize, height: markerSize }]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <Image source={icons.marker2} resizeMode='cover' style={styles.markerImage}/>
      </View>
    </Mapbox.MarkerView>
  );
};

export default Marker;
