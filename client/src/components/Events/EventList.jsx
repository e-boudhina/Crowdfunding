import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allEvents,
  findEventByName,
  RemoveEvent

} from "../../actions/eventActions";
const EventList = () => {
  
  const events = useSelector(state => state.events);
  const dispatch = useDispatch();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    dispatch(allEvents());
  }, []);
  const [EventName, setEventName] = useState("");
  const onChangeEventName = e => {
    const EventName = e.target.value;
    setEventName(EventName);
  };
  const refreshData = () => {
    setCurrentEvent(null);
    setCurrentIndex(-1);
  };
  const setActiveEvent = (event, index) => {
    setCurrentEvent(event);
    setCurrentIndex(index);
  };
  const findByName = () => {
    refreshData();
    dispatch(findEventByName(EventName));
  };

  return (
    <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
      
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByName}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Events List</h4>
      <ul className="list-group">
          {events && events.map((event, index) => (
            <li
            className={
              "list-group-item " + (index === currentIndex ? "active" : "")
            }
            
            onClick={() => setActiveEvent(event, index)}
            key={index}
            >
              
              {event.EventName}
              
            </li>
           
          ))}
        
    
        </ul>
      <button
          className="m-3 btn btn-sm btn-danger"
          onClick={RemoveEvent}
        ></button>
    
    </div>
    <div className="col-md-6">
      {currentEvent? (
        <div>
          <h4>Tutorial</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentEvent.EventDescription}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentEvent.published ? "Published" : "Pending"}
          </div>
          <Link
            to={"/eventsdet/" + currentEvent.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Event...</p>
        </div>
      )}
    </div>
  </div>
  );
};
export default EventList;


