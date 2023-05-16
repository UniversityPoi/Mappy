import { Image, TouchableOpacity } from "react-native";

import styles from "./header-button.style";

const HeaderButton = ({ icon, handlePress }) => {
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

export default HeaderButton;