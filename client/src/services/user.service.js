/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { useSelector  } from "react-redux";
const TEST_API_URL = "http://localhost:5000/api/test/";
const API_URL = "http://localhost:5000/api/user/";


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
const getAllUsers = (keyword) => {
  return axios.get("http://localhost:5000/api/user/searchusers/"+keyword, { headers: authHeader()   })
}
export const updateUser = (user ) => {
  return  axios.post(API_URL+"update", user , authHeader())
}
export const getUser  =  (username) =>{
  return   axios.get(API_URL+username  )

}
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers,
  updateUser,
  getUser
  //refreshUser
};