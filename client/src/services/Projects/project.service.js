import axios from "axios";

const API_URL = "http://localhost:5000/api/project/";

const config ={
  headers:{
    'content-type': 'multipart/form-data'

}
}



const  allProjects= () => {
  return axios.get(API_URL + "all");
};







const  getprojectsByorg= (id) => {
  return axios.get(API_URL + "getProjectOfOrg/"+id);
};
const  getFollowers= (id) => {
  return axios.get(API_URL + "getFollowersOfOrg/"+id);
};

const  AddProject= (form) => {
// const  AddProject= (labelproject,projectdescriptiob,fundneeded,image) => {
  return axios.post(API_URL + "add",form,config);
};

const remove = (id)=> {

  
  return axios.delete(API_URL+"delete/"+id);
};
const update = (id,form)=> {
  return axios.put(API_URL+"update/"+id,form,config);
};

const getSingle = (id)=> {
  return axios.get(API_URL+"get/"+id);
};



export default  {
  allProjects,
  AddProject,
  getSingle,
  remove,
  update,
  getprojectsByorg,
  getFollowers
  // ,
  // login,
  // logout,
};