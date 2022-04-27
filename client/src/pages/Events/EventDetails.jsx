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

  const Join = () => {
    // tried to use use effect instead of navigate to refresh the page after delete but failed console.log('delete')
    eventService.JoinEvent();
  };
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
      <section className="event-area grey-bg pt-120 pb-90 ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bakix-details-tab">
                <ul
                  className="nav text-center justify-content-center pb-30 mb-50"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Facilities
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Map Directions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab1"
                      data-toggle="tab"
                      href="#profile1"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="bakix-video mb-30">
                        <img src="assets/img/event/details/video.jpg" alt="" />
                        <a
                          className="popup-video"
                          href="https://www.youtube.com/watch?v=Y6MlVop80y0"
                        >
                          <i className="fas fa-play" />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="event-img mb-40">
                        <img src="assets/img/event/details/img1.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-40">
                      <div className="event-img">
                        <img src="assets/img/event/details/img2.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="event-text mb-40">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum. Sed ut
                          perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo. Nemo enim ipsam voluptatem quia voluptas
                          sit aspernatur aut odit aut fugit, sed quia
                          consequuntur magni dolores eos qui ratione voluptatem
                          sequi nesciunt. Neque porro quisquam est, qui dolorem
                          ipsum quia dolor sit amet, consectetur, adipisci
                          velit, sed quia non numquam eius modi tempora incidunt
                          ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
                        <p>
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum. Sed ut perspiciatis unde omnis iste natus
                          error sit voluptatem accusantium doloremque
                          laudantium, totam rem aperiam, eaque ipsa quae ab illo
                          inventore veritatis et quasi architecto beatae vitae
                          dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                          voluptas sit aspernatur aut odit aut fugit, sed quia
                          consequuntur magni dolores eos qui ratione voluptatem
                          sequi nesciunt. Neque porro quisquam est, qui dolorem
                          ipsum quia dolor sit amet, consectetur, adipisci
                          velit, sed quia non numquam eius modi tempora.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="event-gallery mb-30">
                        <img src="assets/img/event/details/img3.jpg" alt="" />
                        <a
                          className="popup-image"
                          href="assets/img/event/details/img3.jpg"
                        >
                          <img
                            src="assets/img/event/details/event-icon.png"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-12">
                      <div
                        id="contact-map"
                        className="map mb-30"
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            backgroundColor: "rgb(229, 227, 223)",
                          }}
                        >
                          <div style={{ overflow: "hidden" }} />
                          <div
                            className="gm-style"
                            style={{
                              position: "absolute",
                              zIndex: 0,
                              left: "0px",
                              top: "0px",
                              height: "100%",
                              width: "100%",
                              padding: "0px",
                              borderWidth: "0px",
                              margin: "0px",
                            }}
                          >
                            <div
                              tabIndex={0}
                              aria-label="Map"
                              aria-roledescription="map"
                              role="region"
                              style={{
                                position: "absolute",
                                zIndex: 0,
                                left: "0px",
                                top: "0px",
                                height: "100%",
                                width: "100%",
                                padding: "0px",
                                borderWidth: "0px",
                                margin: "0px",
                                cursor:
                                  'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
                                touchAction: "pan-x pan-y",
                              }}
                            >
                              <div
                                style={{
                                  zIndex: 1,
                                  position: "absolute",
                                  left: "50%",
                                  top: "50%",
                                  width: "100%",
                                  transform: "translate(0px, 0px)",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "0px",
                                    top: "0px",
                                    zIndex: 100,
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "0px",
                                      top: "0px",
                                      zIndex: 0,
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "absolute",
                                        zIndex: 989,
                                        transform:
                                          "matrix(1, 0, 0, 1, -93, -84)",
                                      }}
                                    >
                                      <div
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                          width: "256px",
                                          height: "256px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "256px",
                                            height: "256px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "0px",
                                    top: "0px",
                                    zIndex: 101,
                                    width: "100%",
                                  }}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "0px",
                                    top: "0px",
                                    zIndex: 102,
                                    width: "100%",
                                  }}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "0px",
                                    top: "0px",
                                    zIndex: 103,
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "0px",
                                      top: "0px",
                                      zIndex: -1,
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "absolute",
                                        zIndex: 989,
                                        transform:
                                          "matrix(1, 0, 0, 1, -93, -84)",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "256px",
                                          height: "256px",
                                          overflow: "hidden",
                                          position: "absolute",
                                          left: "0px",
                                          top: "0px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      width: "27px",
                                      height: "43px",
                                      overflow: "hidden",
                                      position: "absolute",
                                      left: "-14px",
                                      top: "-43px",
                                      zIndex: 0,
                                    }}
                                  >
                                    <img
                                      alt=""
                                      src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
                                      draggable="false"
                                      style={{
                                        position: "absolute",
                                        left: "0px",
                                        top: "0px",
                                        width: "27px",
                                        height: "43px",
                                        userSelect: "none",
                                        border: "0px",
                                        padding: "0px",
                                        margin: "0px",
                                        maxWidth: "none",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "0px",
                                    top: "0px",
                                    zIndex: 0,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  zIndex: 3,
                                  position: "absolute",
                                  height: "100%",
                                  width: "100%",
                                  padding: "0px",
                                  borderWidth: "0px",
                                  margin: "0px",
                                  left: "0px",
                                  top: "0px",
                                  touchAction: "pan-x pan-y",
                                }}
                              >
                                <div
                                  style={{
                                    zIndex: 4,
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    width: "100%",
                                    transform: "translate(0px, 0px)",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "0px",
                                      top: "0px",
                                      zIndex: 104,
                                      width: "100%",
                                    }}
                                  />
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "0px",
                                      top: "0px",
                                      zIndex: 105,
                                      width: "100%",
                                    }}
                                  />
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "0px",
                                      top: "0px",
                                      zIndex: 106,
                                      width: "100%",
                                    }}
                                  >
                                    <span
                                      id="3B5DD7B7-14D2-453C-94FC-E30AD5B1D883"
                                      style={{ display: "none" }}
                                    >
                                      To navigate, press the arrow keys.
                                    </span>
                                    <div
                                      aria-label="Cryptox"
                                      role="img"
                                      tabIndex={-1}
                                      style={{
                                        width: "27px",
                                        height: "43px",
                                        overflow: "hidden",
                                        position: "absolute",
                                        left: "-14px",
                                        top: "-43px",
                                        zIndex: 0,
                                      }}
                                    >
                                      <img
                                        alt=""
                                        src="https://maps.gstatic.com/mapfiles/transparent.png"
                                        draggable="false"
                                        useMap="#gmimap0"
                                        style={{
                                          width: "27px",
                                          height: "43px",
                                          userSelect: "none",
                                          border: "0px",
                                          padding: "0px",
                                          margin: "0px",
                                          maxWidth: "none",
                                        }}
                                      />
                                      <map name="gmimap0" id="gmimap0">
                                        <area
                                          log="miw"
                                          coords="13.5,0,4,3.75,0,13.5,13.5,43,27,13.5,23,3.75"
                                          shape="poly"
                                          tabIndex={-1}
                                          title="Cryptox"
                                          style={{
                                            display: "inline",
                                            position: "absolute",
                                            left: "0px",
                                            top: "0px",
                                            cursor: "pointer",
                                            touchAction: "none",
                                          }}
                                        />
                                      </map>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "0px",
                                      top: "0px",
                                      zIndex: 107,
                                      width: "100%",
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="gm-style-moc"
                                style={{
                                  zIndex: 4,
                                  position: "absolute",
                                  height: "100%",
                                  width: "100%",
                                  padding: "0px",
                                  borderWidth: "0px",
                                  margin: "0px",
                                  left: "0px",
                                  top: "0px",
                                  opacity: 0,
                                }}
                              >
                                <p className="gm-style-mot" />
                              </div>
                            </div>
                            <iframe
                              aria-hidden="true"
                              frameBorder={0}
                              tabIndex={-1}
                              style={{
                                zIndex: -1,
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: "0px",
                                left: "0px",
                                border: "none",
                              }}
                            />
                            <div
                              style={{
                                pointerEvents: "none",
                                width: "100%",
                                height: "100%",
                                boxSizing: "border-box",
                                position: "absolute",
                                zIndex: 1000002,
                                opacity: 0,
                                border: "2px solid rgb(26, 115, 232)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile1"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4">
                      <div className="contact text-center mb-30">
                        <i className="fas fa-envelope" />
                        <h3>Mail Here</h3>
                        <p>info@example.com</p>
                        <p>info@webmail.com</p>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4">
                      <div className="contact text-center mb-30">
                        <i className="fas fa-map-marker-alt" />
                        <h3>Visit Here</h3>
                        <p>
                          27 Division St, New York, NY 10002, Jaklina, United
                          Kingpung
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4  col-lg-4 col-md-4 ">
                      <div className="contact text-center mb-30">
                        <i className="fas fa-phone" />
                        <h3>Call Here</h3>
                        <p>+8 (123) 985 789</p>
                        <p>+787 878897 87</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* event-area end */}
    </main>
  );
};
export default EventDetails;
