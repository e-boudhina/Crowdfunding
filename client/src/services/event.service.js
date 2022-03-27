import axios from "axios";

const API_URL = "http://localhost:5000/api/event/";

const config ={
  headers:{
    'content-type': 'multipart/form-data'

}
}
const add = (form ) => {
  console.log("EVENT SERVICE "+form);
  return axios.post(API_URL + "add", JSON.parse(form), {
    'Content-Type': 'application/json'
    });
};
const DELETE_Event = (id)=> {

  
  return axios.delete(API_URL+"delete/"+id);
};
const update = (id,form)=> {
  return axios.put(API_URL+"update/"+id,form,config);
};

const getevent = (id)=> {
  return axios.get(API_URL+"get/"+id);
};
const  allevents= () => {
  return axios.get(API_URL + "all");
};
const findEventByName = (id)=> {
  return axios.get(API_URL+"/event?name=${EventName}");
};
export default  {
  add,
  DELETE_Event,
  update,
  getevent,
  allevents,
  findEventByName
};

  