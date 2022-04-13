import DatePicker from "react-datepicker";
import { EventAdd } from "../../actions/eventActions";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import React, { useState, useRef } from "react";
import EventForm from "../../components/Events/EventForm";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddEvent = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [EventName, setEventName] = useState("");
  const [EventDescription, setEventDescription] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const onChangeEventName = (e) => {
    const EventName = e.target.value;
    setEventName(EventName);
  };
  const onChangeEventDescription = (e) => {
    const EventDescription = e.target.value;
    setEventDescription(EventDescription);
  };

  const onChangeStartDate = (e) => {
    const StartDate = e.target.value;
    setStartDate(StartDate);
  };
  const onChangeEndDate = (e) => {
    const EndDate = e.target.value;
    setEndDate(EndDate);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("EventName", EventName);
    formData.append("EventDescription", EventDescription);
    formData.append("StartDate", StartDate);
    formData.append("EndDate", EndDate);
    var object = {};
    formData.forEach((value, key) => {
      // Reflect.has in favor of: object.hasOwnProperty(key)
      if (!Reflect.has(object, key)) {
        object[key] = value;
        return;
      }
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
      }
      object[key].push(value);
    });
    var json = JSON.stringify(object);
    console.log("FORMDATA" + formData);
    console.log("AAAA " + json);

    console.log(json);

    dispatch(EventAdd(json))
      .then(() => {
        navigate("/events");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <section className="contact-form-area">
      <div className="container">
        <div className="form-wrapper grey-bg">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8">
              <div className="section-title mb-55">
                <p>
                  <span /> Events
                </p>
                <h1>Add your event</h1>
              </div>
            </div>
            <div className="col-xl-4 col-lg-3 d-none d-xl-block "></div>
          </div>
          <EventForm />

          {/* <form id="contact-form" onSubmit={handleAddEvent}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-box user-icon mb-30">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={EventName}
                      onChange={onChangeEventName}
                      validations={[required]}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-box email-icon mb-30">
                    <input
                      type="text"
                      name="description"
                      placeholder="Your description"
                      value={EventDescription}
                      onChange={onChangeEventDescription}
                      validations={[required]}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-box date-icon mb-30">
                    <input
                      type="date"
                      name="startdate"
                      placeholder="Your start date"
                      value={StartDate}
                      onChange={onChangeStartDate}
                      validations={[required]}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-box date-icon mb-30">
                    <input
                      type="date"
                      name="enddate"
                      placeholder="Your enddate"
                      value={EndDate}
                      onChange={onChangeEndDate}
                      validations={[required]}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="contact-btn text-center">
                    <button className="btn" type="submit">
                      Add Event <img src="assets/img/icon/arrow.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </form> */}
          <p className="ajax-response text-center" />
        </div>
      </div>
    </section>
  );
};
export default AddEvent;
