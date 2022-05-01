import React from "react";
import { useNavigate } from "react-router-dom";
import useEventList from "./useEventList";
import EventsHeader from "./EventsHeader";

const EventList = (props) => {
  const {
    events: { page, hasNextPage, items, totalItems, totalPages },
    removeEvent,
    handlePageChange,
  } = useEventList();
  console.log(items);
  const navigate = useNavigate();
  return (
    <div>
      <EventsHeader />
      <section className="event-area pos-relative event-bg pt-120 pb-120">
        <div className="event-shape spahe1 bounce-animate" data-depth=".3">
          <img src="assets/img/event/p1.png" alt="" />
        </div>
        <div className="event-shape spahe2 bounce-animate" data-depth=".3">
          <img src="assets/img/event/p2.png" alt="" />
        </div>
        <div className="event-shape spahe3 bounce-animate" data-depth=".3">
          <img src="assets/img/event/p3.png" alt="" />
        </div>
        <div className="event-shape spahe4 bounce-animate" data-depth=".3">
          <img src="assets/img/event/p4.png" alt="" />
        </div>
        <div className="event-shape spahe5 bounce-animate" data-depth=".3">
          <img src="assets/img/event/p5.png" alt="" />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-9 col-lg-8">
              <div className="section-title white-text mb-65">
                <p>
                  <span /> events{" "}
                </p>
                <h1>Upcoming Events</h1>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 d-none d-xl-block">
              <div className="section-link mb-65 text-right">
                <a className="btn-border btn-soft" href="#">
                  more events
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="basic-tab">
                <ul
                  className="nav tab-menu justify-content-center mb-50"
                  id="eventTab"
                  role="tablist"
                >
                  <li className="nav-item"></li>
                  <li className="nav-item"></li>
                  <li className="nav-item">
                    <a
                      className="nav-link active show"
                      id="contact-tabe"
                      data-toggle="tab"
                      href="#contacte"
                      role="tab"
                      aria-selected="true"
                    >
                      Howdy!
                    </a>
                  </li>
                </ul>

                {items.map((el) => (
                  <div className="event-wrapper mb-40">
                    <div className="row">
                      <div className="col-lg-3 d-flex align-items-center">
                        <div className="event-time">
                          <div className="event-icon mb-20">
                            <img
                              src="assets/img/event/icon/event-icon2.png"
                              alt=""
                            />
                          </div>
                          <div className="event-time-text">
                            <h4>
                              {el.StartDate} {el.EndDate}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 d-flex align-items-center ">
                        <div className="event-info">
                          <h3>
                            <a href="#">{el.EventName}.</a>
                          </h3>
                          <div className="event-meta mb-15">
                            <span>Speaker: Legend D. Jank,</span>
                            <span>Vanue: New York, USA</span>
                          </div>
                          <p>{el.EventDescription}</p>
                        </div>
                      </div>
                      <div className="col-lg-3 d-flex align-items-center justify-content-start justify-content-lg-end">
                        <div className="event-btn">
                          <a
                            href={"/eventsdet/" + el._id}
                            className="btn-circle"
                          >
                            join today
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="basic-pagination basic-pagination-2 text-center mb-40">
            <ul>
              {page > 1 && (
                <li>
                  <a onClick={() => handlePageChange(page - 1)}>
                    <i class="fas fa-angle-double-left"></i>
                  </a>
                </li>
              )}

              {/* <li>
              <a href="#">{page}</a>
            </li> */}
              <li class="active">
                <a href="#">{page}</a>
              </li>
              {/* <li>
              <a href="#">03</a>
            </li> */}

              {hasNextPage && (
                <>
                  <li>
                    <a href="#">
                      <i class="fas fa-ellipsis-h"></i>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handlePageChange(page + 1)}>
                      <i class="fas fa-angle-double-right"></i>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
export default EventList;
