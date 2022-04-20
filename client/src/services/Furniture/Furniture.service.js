import axios from "axios";
import authHeader from "../auth-header";
const API_URL = "http://localhost:5000/api/furniture/";

const getFurniture = () => {
    return axios.get(API_URL, { headers: authHeader()})
}
const addFurniture = (furniture) => {
    return axios.post(API_URL, furniture,{ headers: authHeader()})
}
const updateFurniture = (id,furniture) => {
    return axios.put(API_URL+id, furniture, { headers: authHeader()})
}

const deleteFurniture = (id) => {
    return axios.delete(API_URL+id, { headers: authHeader()})
}

export {getFurniture ,addFurniture,updateFurniture,deleteFurniture }
