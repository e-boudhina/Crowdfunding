import DatePicker from "react-datepicker"
import { CREATE_Event } from "../../actions/eventActions";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';



export default function AddEvents(props){

    return(
        <section className="contact-form-area">
        <div className="container">
          <div className="form-wrapper grey-bg">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8">
                <div className="section-title mb-55">
                  <p><span /> Events</p>
                  <h1>Add your event</h1>
                </div>
              </div>
              <div className="col-xl-4 col-lg-3 d-none d-xl-block ">
               
              </div>
            </div>
            <div className="contact-form">
              <form id="contact-form" action="#">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-box user-icon mb-30">
                      <input type="text" name="name" placeholder="event's name"  />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box email-icon mb-30">
                      <input type="text" name="description" placeholder="Your description" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box date-icon mb-30">
                      <input type="date" name="startdate" placeholder="Your start date" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box date-icon mb-30">
                      <input type="date" name="enddate" placeholder="Your enddate" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                 
                    <div className="contact-btn text-center">
                      <button className="btn" type="submit">Add Event <img src="assets/img/icon/arrow.png" alt="" /></button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="ajax-response text-center" />
            </div>
          </div>
        </div>
      </section>
    )}