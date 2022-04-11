/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { useSelector  } from "react-redux";
const API_URL = "http://localhost:5000/api/learning";


export const getAllChapters = () => {
    return axios.get(API_URL+"/chapters/", { headers: authHeader()   })
  }
  export const getChapter = (id) => {
    return axios.get(API_URL+"/chapter/"+id, { headers: authHeader()   })
  }
  export const getCertificates = () => {
    return axios.get(API_URL+"/certificates/", { headers: authHeader()   })
  }
  /*export const getCertificates = (id) => {
axios.get(API_URL+"/certificates/", { headers: authHeader()   })
.then(resp => {
  console.log(resp.data);
  return resp.data
})
.catch(err => {
  // Handle Error Here
  console.error(err);
});
  }*/


  export default {getAllChapters,getChapter,getCertificates
  };