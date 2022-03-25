import axios from "axios";

const API_URL = "http://localhost:5000/api/event/";

const config ={
  headers:{
    'content-type': 'multipart/form-data'

}
}
const add = (EventDescription, EventName, StartDate , EndDate ) => {
  return axios.post(API_URL + "add", {
    EventDescription: String ,
    EventName: String ,
    StartDate: Number,
    EndDate: Number
   
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
export default  {
  add,
  DELETE_Event,
  update,
  getevent,
  allevents
};

  