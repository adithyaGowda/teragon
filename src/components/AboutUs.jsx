import React, { useState } from "react";
import config from "../../config";
import "./css/aboutUs.css";

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState(config.aboutUs);
  const [mission, setMission] = useState(config.missonVision);

  return (
    <>
      <section className="common-section our-services">
        <div className="container mb-5">
          <div className="row">
            <div className="col-12 col-lg-7 text-center our-service-leftside-img">
              <img src={aboutUs.aboutImage} alt="About US" />
            </div>
            <div className="col-12 col-lg-5">
              <h1 className="main-heading">{aboutUs.title}</h1>
              <div className="row our-services-info">
                <p className="main-hero-para">{aboutUs.desc[0]}</p>
              </div>
              <div className="row our-services-info">
                <p className="main-hero-para">{aboutUs.desc[1]}</p>
              </div>
              <button className="btn-style btn-style-border btn-pad">
                learn more
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="common-section our-services our-services-rightside">
        <div className="container mb-5">
          <div className="row">
            <div className="col-12 col-lg-5">
              <h1 className="main-heading">{mission.title}</h1>
              <div className="row our-services-rightside-content">
                <p className="main-hero-para">{mission.desc[0]}</p>
              </div>
              <div className="row our-services-rightside-content">
                <p className="main-hero-para">{mission.desc[1]}</p>
              </div>
            </div>
            <div className="col-12 col-lg-7 text-center our-service-rightside-img">
              <img src={mission.missionImage} alt="About US" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
