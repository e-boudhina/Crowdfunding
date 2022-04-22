import axios from "axios";
import authHeader from "../auth-header";
const API_URL = "http://localhost:5000/api/userRequests/";

const getUserRequests = () => {
    return axios.get(API_URL, { headers: authHeader()})
}
const addUserRequest = (userRequest) => {
    return axios.post(API_URL, userRequest,{ headers: authHeader()})
}
const approveUserRequest = (id) => {
    return axios.get(API_URL+"approve/"+id ,{ headers: authHeader()})
}
const rejectUserRequest = (id) => {
    return axios.get(API_URL+"reject/"+id,{ headers: authHeader()})
}
// const updateFurniture = (id,furniture) => {
//     return axios.put(API_URL+id, furniture, { headers: authHeader()})
// }
//
// const deleteFurniture = (id) => {
//     return axios.delete(API_URL+id, { headers: authHeader()})
// }

export {getUserRequests, addUserRequest,approveUserRequest,rejectUserRequest}
