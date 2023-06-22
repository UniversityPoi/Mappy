import * as Network from 'expo-network';


export const onInternetAccess = async (callback, onError) => {
  Network.getNetworkStateAsync()
    .then(state => {
      if (state.isConnected) {
        callback();
      } else {
        onError('No internet Access!');
      }
    })
    .catch(error => {
      onError(error);
    });
}