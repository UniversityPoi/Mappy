import { Image, TouchableOpacity } from "react-native";

import styles from "./image-button.style";

const ImageButton = ({ icon, handlePress, data }) => {
  const _handlePress = () => {
    if (data) {
      handlePress(data);
    } else {
      handlePress();
    }
  }


  return (
    <TouchableOpacity style={styles.btnContainer} onPress={_handlePress}>
      <Image
        source={icon}
        resizeMode='cover'
        style={styles.btnImg}
      />
    </TouchableOpacity>
  );
};

export default ImageButton;