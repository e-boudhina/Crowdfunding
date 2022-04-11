import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  allEvents,
  findEventByName,
  RemoveEvent,
  Update,
} from "../../actions/eventActions";
const EventList = (props) => {
  console.log(props.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");

  const updateEvent = () => {
    dispatch(Update(currentEvent.id, currentEvent))
      .then((response) => {
        console.log(response);
        setMessage("The event was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const removeEvent = () => {
    dispatch(RemoveEvent(currentEvent.id))
      .then(() => {
        props.history.push("/events");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    dispatch(allEvents());
  }, []);
  const events = useSelector((state) => state.events);

  console.log(events.Events);
  const [EventName, setEventName] = useState("");
  const onChangeEventName = (e) => {
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
    <div className="card-body">
      <h4 className="card-title mb-4">Events List</h4>
      <div className="table-responsive">
        <table className="table table-hover table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th scope="col">(#) Id</th>
              <th scope="col">Name of the Event</th>
              <th scope="col">Event Description</th>
              <th scope="col">StartDate</th>
              <th scope="col">EndDate</th>

              <th scope="col" colSpan={2}>
                Email
              </th>
              {/* <th scope="col" colSpan={2}>List of projects</th> */}
            </tr>
          </thead>
          <tbody>
            {events.Events.map((event, index) => (
              <tr>
                <th scope="row">{event._id}</th>
                <td>
                  <span className="badge bg-success">{event.EventName}</span>
                </td>

                <td>
                  <span className="badge bg-success">
                    {event.EventDescription}
                  </span>
                </td>
                <td>
                  <span className="badge bg-success">{event.StartDate}</span>
                </td>
                <td>
                  <span className="badge bg-success">{event.EndDate}</span>
                </td>
                <td>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/update/" + event._id);
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                  </div>
                </td>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    navigate("/eventsdet", {
                      state: {
                        id: event._id,
                        event: event.EventName,
                        EventName: event.EventDescription,
                        EventDescription: event.StartDate,
                        StartDate: event.EndDate,
                      },
                    });
                  }}
                  class="btn btn-outline-info btn-rounded"
                  data-mdb-ripple-color="dark"
                >
                  Info
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EventList;
