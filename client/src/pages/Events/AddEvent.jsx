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
                      <input type="text" name="name" placeholder="event's name" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box email-icon mb-30">
                      <input type="text" name="description" placeholder="Your description" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box phone-icon mb-30">
                      <input type="text" name="phone" placeholder="Your Phone" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box subject-icon mb-30">
                      <input type="text" name="subject" placeholder="Your Subject" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-box message-icon mb-30">
                      <textarea name="message" id="message" cols={30} rows={10} placeholder="Your Message" defaultValue={""} />
                    </div>
                    <div className="contact-btn text-center">
                      <button className="btn" type="submit">get action <img src="assets/img/icon/arrow.png" alt="" /></button>
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