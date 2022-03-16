/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const register = (username, email, password , firstName , lastName , address , birthdate) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    username,
    email,
    password,
    address , 
    birthdate
  });
};
 
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.user.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("infos", JSON.stringify(response.data.infos));
      }
      return response.data;
    });
};

const reset_password = (username) => {
  return axios
      .post(API_URL + "reset-password", {
        username
      })
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message)
        }
        return response.data;
      });
};


const logout = () => {
  localStorage.removeItem("user");
 localStorage.removeItem("infos");
};

export default  {
  register,
  login,
  logout,
  reset_password
};
