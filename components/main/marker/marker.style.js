import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
});

export default styles;