/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { useSelector  } from "react-redux";
const API_URL = "http://localhost:5000/api/learning";


export const getAllChapters = () => {
    return axios.get(API_URL+"/chapters/", { headers: authHeader()   })
  }

  export default {getAllChapters
  };