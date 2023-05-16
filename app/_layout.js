import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { Store } from "../redux/store";

const Layout = () => {
  return (
    <Provider store={Store}>
      <Stack></Stack>
    </Provider>
  );
}

export default Layout;