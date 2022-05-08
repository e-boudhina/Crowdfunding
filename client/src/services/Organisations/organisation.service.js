import axios from "axios";

const API_URL = "http://localhost:5000/api/organization/";

const config ={
  headers:{
    'content-type': 'multipart/form-data'

}
}



const  allOrganisation= () => {
  return axios.get(API_URL + "all");
};
const  allOrganisationForUser= (id) => {
  return axios.get(API_URL + "allForUser/" +id);
  };
const  getUser= (username) => {
  return axios.get(API_URL + "getUser/" +username);
  };

const  AddOrganisation= (form) => {
// const  AddProject= (labelproject,projectdescriptiob,fundneeded,image) => {
  return axios.post(API_URL + "add",form,config);
};
const  FollowOrganisation= (id,idOrganization) => {
// const  AddProject= (labelproject,projectdescriptiob,fundneeded,image) => {
  return axios.post(API_URL + "follow/"+idOrganization+"/"+id);
};
const  fillow= (id,idOrganization) => {
// const  AddProject= (labelproject,projectdescriptiob,fundneeded,image) => {
  return axios.post(API_URL + "follow/"+idOrganization+"/"+id);
};
const  elyes= (id,idOrganization) => {
// const  AddProject= (labelproject,projectdescriptiob,fundneeded,image) => {
  return axios.post(API_URL + "follow/"+idOrganization+"/"+id);
};
const  IsFollowed= (id,idOrganization) => {
// const  AddProject= (labelproject,projectdescriptiob,fundneeded,image) => {
  return axios.post(API_URL + "isFollowed/"+idOrganization+"/"+id);
};

const remove = (id)=> {

  
  return axios.delete(API_URL+"delete/"+id);
};
const sami = (id)=> {

  
  return axios.delete(API_URL+"delete/"+id);
};
const update = (id,form)=> {
  return axios.put(API_URL+"update/"+id,form,config);
};

const getSingle = (id)=> {
  return axios.get(API_URL+"get/"+id);
};



export default  {
  AddOrganisation,
  allOrganisation,
  allOrganisationForUser,
  getSingle,
  remove,
  sami,
  update,
  FollowOrganisation,
  IsFollowed,
  getUser,
  fillow,
  elyes
  // ,
  // login,
  // logout,
};
