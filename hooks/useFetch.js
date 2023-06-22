import axios from "axios";
import * as Network from 'expo-network';

const API_URL = 'https://mappy-server.azurewebsites.net';



const onInternetAccess = async (callback, onError) => {
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


export const useFetch = async (options) => {
  return new Promise((resolve, reject) => {
    let data = null;
    let error = null;
    let status = null;

    onInternetAccess(
      () => {
        axios.request(options)
          .then(response => {
            status = response.status;
            data = response.data;
            resolve({ data, error, status });
          })
          .catch(err => {
            error = err.response.data;
            resolve({ data, error, status });
          });
      },
      (err) => {
        error = err;
        resolve({ data, error, status });
      }
    );
  });
};

export const registerUserOptions = (username, email, password, confirmPassword) => {
  return {
    method: 'POST',
    url: `${API_URL}/auth/register`,
    data: { 
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword 
    }
  }
}

export const loginUserOptions = (email, password) => {
  return {
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: { 
      email: email,
      password: password,
    }
  }
}

export const getFavoriteLocationsOptions = (token) => {
  return {
    method: 'GET',
    url: `${API_URL}/favorite-location`,
    headers: { 'Authorization': 'Bearer ' + token }
  }
}

export const addFavoriteLocationsOptions = (location, token) => {
  return {
    method: 'POST',
    url: `${API_URL}/favorite-location`,
    headers: { 'Authorization': 'Bearer ' + token },
    data: location
  }
}

export const deleteFavoriteLocationOptions = (id, token) => {
  return {
    method: 'DELETE',
    url: `${API_URL}/favorite-location/${id}`,
    headers: { 'Authorization': 'Bearer ' + token }
  }
}

export const addLocation = (coordinates, token) => {
  return {
    method: 'POST',
    url: `${API_URL}/location`,
    headers: { 'Authorization': 'Bearer ' + token },
    data: coordinates
  }
}