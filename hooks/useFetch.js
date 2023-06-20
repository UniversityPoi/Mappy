import axios from "axios";

const API_URL = 'https://mappy-server.azurewebsites.net';

export const useFetch = async (options) => {
  let data = null;
  let error = null;
  let status = null;

  try {
    const response = await axios.request(options);
    
    status = response.status;
    data = response.data;
  } catch (err) {
    error = err.response.data;
  }

  return { data, error, status };
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