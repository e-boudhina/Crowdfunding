import axios from "axios";
import { getFormData } from "../helpers/getFormData";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/event/";

const add = async (form) => {
  const reqBody = new FormData();

  getFormData(reqBody, form);

  const response = await axios.post(API_URL, reqBody, { headers: authHeader() });

  return response;
};

const DELETE_Event = (id) => {
  return axios.delete(API_URL + id);
};
const update = (id, form) => {
  return axios.patch(API_URL + id, form);
};

const getevent = (id) => {
  return axios.get(API_URL + id);
};
const allEvents = ({ page, keyword }) => {
  return axios.get(API_URL, { params: { page, keyword } });
};
const getEventById = (id) => {
  return axios.get(API_URL + id);
};
const allEventsForUser = (id) => {
  return axios.get(API_URL + "allForUser/" + id);
};
const JoinEvent = () => {
  return axios.get(API_URL);
};
export default {
  add,
  DELETE_Event,
  update,
  getevent,
  allEvents,
  getEventById,
  allEventsForUser,
  JoinEvent
};
