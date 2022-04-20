/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";
import { useSelector  } from "react-redux";
const API_URL = "http://localhost:5000/api/learning";
const config ={
  headers:{
    'content-type': 'multipart/form-data'
}}
const config2 ={
  headers:{
    'content-type': 'application/json'
}}

export const getAllChapters = () => {
    return axios.get(API_URL+"/chapters/", { headers: authHeader()   })
  }
  export const getChapter = (id) => {
    return axios.get(API_URL+"/chapter/"+id, { headers: authHeader()   })
  }
  export const getCertificates = () => {
    return axios.get(API_URL+"/certificates/", { headers: authHeader()   })
  }
  export const getCategorieslearning = () => {
    return axios.get(API_URL+"/categories-learning/", { headers: authHeader()   })
  }
  export const AddCertificate = (certificate) => {
    return axios.post(API_URL+"/add-certificate/", certificate,config   )
  }
  export const paginateCertificates = async (params) => {
    const data=await axios.get(API_URL+"/certificates-search/", { params }, { headers: authHeader()   })
    return data.data;
  }
  export const getCertificate =  (id) => {
const data =   axios.get(API_URL+"/certificate/"+id, { headers: authHeader()   })
    return data
  }

  export const getProgress =   (params) => {
    console.log(params);
    const settings = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
return   axios.get(API_URL+"/get-progress/",{params}, { headers: authHeader()   })

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


  export default {getAllChapters,getChapter,getCertificates,getCertificate,getProgress
  };