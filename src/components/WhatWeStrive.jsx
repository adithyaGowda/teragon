import React, { useState } from "react";
import config from "../../config";
import "./css/whatWeStrive.css";

const WhatWeStrive = () => {
  const [striveItems, setStriveItems] = useState(config.strive);
  return (
    <>
      <section>
        <div className="work-container container">
          <h1 className="main-heading text-center">{striveItems.title}</h1>
          <div className="row">
            {striveItems.subTopic.map((topic) => {
              const { logo, title, desc } = topic;
              return (
                <div
                  className="col-12 col-lg-3 text-center work-container-subdiv"
                  key={title}
                >
                  <i className={`fa-solid fa-${logo} fontawesome-style`}></i>
                  <h2 className="sub-heading">{title}</h2>
                  <p className="main-hero-para w-100">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatWeStrive;
