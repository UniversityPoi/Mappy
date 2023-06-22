import { View, Image, Text } from 'react-native';

import icons from '../../../constants/icons';
import styles from './marker.style';

const Marker = ({ name = "New Location" }) => {
  const markerSize = 100 + name.length * 2;

  return (
    <View style={[styles.markerContainer, { width: markerSize, height: markerSize }]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <Image source={icons.marker2} style={styles.markerImage}/>
    </View>
  );
};

export default Marker;
