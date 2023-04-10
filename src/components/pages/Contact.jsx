import React, { useState } from "react";
import config from "../../../config";
import Footer from "../Footer";
import Navbar from "../Navbar";
import "../css/contactUs.css"

const Contact = () => {
  const [contact, setContact] = useState(config.conatctUs);

  return (
    <>
    <Navbar/>
      <section className="contactus-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="contact-leftside col-12 col-lg-5">
                  <h1 className="main-heading fw-bold">{contact.title}</h1>
                  <p className="main-hero-para">{contact.desc}</p>
                  <figure>
                    <img
                      src={contact.imageHome}
                      alt="Teragon Contact Us"
                      className="img-fluid"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Contact;
