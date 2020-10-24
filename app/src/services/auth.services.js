import axios from "axios";

const API_URL = `${process.env.REACT_APP_NODE_URL}/auth/`;

const register = (email, password, firstName, lastName) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    firstName,
    lastName
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};