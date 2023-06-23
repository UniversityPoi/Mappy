import axios from "axios";
import { onInternetAccess } from "../modules/network";

const API_URL = 'https://mappy-server.azurewebsites.net';



export const useFetch = (options) => {
  return new Promise((resolve, reject) => {
    onInternetAccess()
      .then(() => {
        axios.request(options)
          .then(response => {
            if (response.status == 200) resolve(response.data);
            else reject(response.data?.message);
          })
          .catch(err => {
            let message = err?.response?.data?.message;
            let errors = err?.response?.data?.errors;

            if (message) reject(message);
            if (errors) reject(errors[Object.keys(errors)[0]][0]);
            else reject("Unexpected error...");
          });
      })
      .catch(err => reject(err));
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