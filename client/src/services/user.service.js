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
export const updateUser = (user) => {
  return  axios.post(API_URL+"update", user , authHeader())
}
export const getUser  =  (username) =>{
  return   axios.get(API_URL+username, authHeader()  )
}
const getUsers = ()=> {
  return  axios.get(API_URL )
}
const deleteUser = (id)=> {
  return  axios.delete(API_URL +`${id}`, { headers: authHeader()   })
}
const banUser = (username)=> {
  return  axios.post(API_URL+`ban/${username}`, {},{ headers: authHeader()})
}
const unbanUser = (username)=> {
  return  axios.post(API_URL+`unban/${username}`,  {},{ headers: authHeader()   })
}

const makeAdmin = (id)=> {
  return  axios.post(API_URL+`makeAdmin/${id}`, { headers: authHeader()   })
}

const makeIncubator = (id)=> {
  return  axios.get(API_URL+`makeIncubator/${id}`, { headers: authHeader()   })
}
const makeUser = (id)=> {
  return  axios.get(API_URL+`makeUser/${id}`, { headers: authHeader()   })
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers,
  updateUser,
  getUser,
  getUsers,
  banUser,
  unbanUser,
  deleteUser,
  makeAdmin,
  makeIncubator,
  makeUser,
  //refreshUser
};
