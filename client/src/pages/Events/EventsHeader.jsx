import React from "react";

const EventsHeader = () => (
  <section
    className="page-title-area pt-320 pb-140"
    data-background="assets/img/bg/breadcumb.jpg"
    style={{ backgroundImage: 'url("assets/img/bg/breadcumb.jpg")' }}
  >
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="page-title page-title-white text-center">
            <h2>Event List</h2>
            <div className="breadcrumb-list">
              <ul>
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="#">Pages</a>
                </li>
                <li>Event</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default EventsHeader;
