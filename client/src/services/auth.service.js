/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const config ={
  headers:{
    'content-type': 'multipart/form-data'
}}

const registerr = (form) => {
  return axios.post(API_URL + "/auth/signup", form,config);
};


const register = (username, email, password , firstName , lastName , address , birthdate,phone,image) => {
  console.log("AUTH SERVICE image"+JSON.stringify(image));
  return axios.post(API_URL + "/auth/signup", {
    firstName,
    lastName,
    username,
    email,
    password,
    address , 
    birthdate,phone,
    image
  });
};
 
const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/signin", {
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
      .post(API_URL + "/auth/reset-password", {
        username
      })
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message)
        }
        return response.data;
      });
};
const new_password = (password, password_reset_token) => {
  return axios
      .post(API_URL + "/auth/new-password", {
        password,
          password_reset_token
      })
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message)
        }
        return response.data;
      });
};
const verify_email = (token) => {
  return axios
      .post(API_URL + "/auth/verify-email/"+token)
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

const deleteUser = id => {
  console.log("service react , id user : " + id);
  return  axios.delete("http://localhost:5000/api/user/delete/", { data: { id : id}});
};


export default  {
  registerr,
  register,
  login,
  logout,
  deleteUser,
  reset_password,
  new_password,
  verify_email
};
