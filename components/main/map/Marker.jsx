import { View, Image, Text } from 'react-native';

import icons from '../../../constants/icons';

const Marker = ({ name = "New Location" }) => {
  const markerSize = 100 + name.length * 2;

  return (
    <View style={[styles.markerContainer, { width: markerSize, height: markerSize }]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <Image
        source={icons.marker2}
        style={styles.markerImage}
      />
    </View>
  );
};

const styles = {
  markerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerImage: {
    width: 45,
    height: 45,
    zIndex: 1,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 2,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
};


export default Marker;
