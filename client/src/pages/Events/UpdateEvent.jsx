import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import EventForm from "../../components/Events/EventForm";

const UpdateEvent = () => {
  let { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);

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
                <h1>Update your event</h1>
              </div>
            </div>
            <div className="col-xl-4 col-lg-3 d-none d-xl-block "></div>
          </div>
          <EventForm id={id} />
        </div>
      </div>
    </section>
  );
};
export default UpdateEvent;
