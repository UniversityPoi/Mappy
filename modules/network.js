import * as Network from 'expo-network';


export const onInternetAccess = () => {
  return new Promise(async (resolve, reject) => {
    Network.getNetworkStateAsync()
      .then(state => {
        if (state.isConnected) {
          resolve();
        } else {
          reject('No internet Access!');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};