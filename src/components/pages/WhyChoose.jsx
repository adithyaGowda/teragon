import React, { useState } from "react";
import config from "../../../config";
import "../css/WhyChooseUs.css";
import Footer from "../Footer";
import Navbar from "../Navbar";

const WhyChoose = () => {
  const [whyChoose, setWhyChoose] = useState(config.whyChooseUs);
  return (
    <>
      <Navbar />
      <section className="service-main-container">
        <div className="work-container container">
          <div className="container service-container">
            <h6 className="main-heading text-center fw-bold">
              {whyChoose.desc}
            </h6>
            <div className="row">
              {whyChoose.subTopics.map((curElem) => {
                const { logo, title, desc } = curElem;
                return (
                  <>
                    <div
                      className="col-11 col-lg-4 col-xxl-4 work-container-subdiv"
                      key={title}
                    >
                      <i className={`fontawesome-style ${logo}`}></i>
                      <h2 className="sub-heading">{title}</h2>
                      <p className="main-hero-para">{desc}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WhyChoose;
