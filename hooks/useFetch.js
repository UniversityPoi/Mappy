import axios from "axios";

const API_URL = 'https://mappy-test-server.azurewebsites.net';

export const useFetch = async (options) => {
  let data = null;
  let error = null;
  let status = null;

  try {
    const response = await axios.request(options);
    status = response.status;
    data = response.data;
  } catch (err) {
    error = err;
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