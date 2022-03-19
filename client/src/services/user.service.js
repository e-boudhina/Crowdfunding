/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { useSelector  } from "react-redux";
const TEST_API_URL = "http://localhost:8080/api/test/";
const API_URL = "http://localhost:8080/api/user/";


const getPublicContent = () => {
  return axios.get(TEST_API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(TEST_API_URL + "user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(TEST_API_URL + "mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(TEST_API_URL + "admin", { headers: authHeader()   })
};

/*const refreshUser = () => {
  return axios.get(API_URL + "refreshuser", { headers: authHeader()  , 
    body: JSON.stringify({ id: localStorage.getItem("user.id") }) } ).then((response) => {
      if (response.data.id) {
        localStorage.setItem("infos", JSON.stringify(response.data.infos));
      }
      return response.data;
    });
};*/


export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  //refreshUser
};