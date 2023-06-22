import { Image, TouchableOpacity } from "react-native";

import styles from "./image-button.style";

const ImageButton = ({ icon, handlePress }) => {
return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={icon}
        resizeMode='cover'
        style={styles.btnImg}
      />
    </TouchableOpacity>
  );
};

export default ImageButton;