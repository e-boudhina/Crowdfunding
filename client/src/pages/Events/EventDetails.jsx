import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/event.service";
import getImageUrl from "../../helpers/getImageUrl";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";

const EventDetails = (props) => {
  const [event, setEvent] = useState();
  const { id } = useParams();
  //console.log(id);
  const { user: currentUser } = useSelector((state) => state.auth);

  const getEventDetails = (eventId) => {
    eventService
      .getEventById(eventId)
      .then(({ data }) => setEvent(data))
      .catch((err) => console.log(err));
  };
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    getEventDetails(id);
  }, [id]);

  if (!event) return <div>loading</div>;
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <main>
      <Modal closeModal={() => setShowQrCode(false)} isOpen={showQrCode}>
        <div className="d-flex justify-content-center align-items-center">
          <img width={300} src={getImageUrl(event.qrCode)} alt="" />
        </div>
      </Modal>
      {/* page-title-area start */}
      <section
        className="page-title-area pt-320 pb-140"
        data-background="assets/img/bg/breadcumb.jpg"
        style={{ backgroundImage: 'url("/assets/img/bg/breadcumb.jpg")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="page-title page-title-white text-center">
                <h2>Event Details</h2>
                <div className="breadcrumb-list">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Pages</a>
                    </li>
                    <li>Event Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page-title-area end */}
      {/* fund-area start */}
      <section className="fund-area pos-relative pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="event-time-wrapper mb-30">
                <img src={getImageUrl(event.picture)} alt="" />
                <div className="event-count">
                  <ul className="pb-10">
                    <li>
                      <h3>Start</h3>
                      <span>{event.StartDate}</span>
                    </li>
                    <li>
                      <h3>End</h3>
                      <span>{event.EndDate}</span>
                    </li>
                  </ul>
                  <div className="event-timer">
                    <div
                      className="d-sm-flex justify-content-between pt-40"
                      data-countdown="2018/03/01"
                    >
                      <span className="cdown days">
                        <span className="time-count">0</span> <p>Days</p>
                      </span>{" "}
                      <span className="cdown hour">
                        <span className="time-count">0</span> <p>Hour</p>
                      </span>{" "}
                      <span className="cdown minutes">
                        <span className="time-count">00</span> <p>Min</p>
                      </span>{" "}
                      <span className="cdown second">
                        {" "}
                        <span>
                          <span className="time-count">00</span> <p>Sec</p>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="event-day-time pl-15">
                <div className="section-title mb-35">
                  <h1>{event.EventName}</h1>
                </div>
                <ul className="event-place pt-35 pb-15 mb-30">
                  <li>
                    <span>Venue</span>: New York, UK
                  </li>
                  <li>
                    <span>Sponsor</span>: Robert Bruce Co.
                  </li>
                </ul>
                <p>{event.EventDescription}</p>
                <p>This is the event description</p>
                <button className="btn" onClick={() => setShowQrCode(true)}>
                  Join
                </button>
                <br />
                &nbsp;
                <i
                  className="fa fa-trash"
                  onClick={() => props.delete(event._id)}
                  style={{ fontSize: "48px", color: "red", cursor: "pointer" }}
                >
                  &nbsp;
                </i>
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* fund-area end */}
      {/* event-area start */}

      {/* event-area end */}
    </main>
  );
};
export default EventDetails;
