import React, { useState } from "react";
import config from "../../config";
import "./css/placedAt.css";

const PlacedAt = () => {
  const [placedAt, setPlacedAt] = useState(config.placedAt);

  return (
    <>
      <section className="container h-100">
        <div className="container service-container">
          <h1 className="main-heading text-center fw-bold">{placedAt.title}</h1>
          <div className="slider">
            <div className="logos">
              {placedAt.logos.map((logo) => (
                <img src={logo} alt="logos" className="logo-size" key={logo} />
              ))}
            </div>
            <div className="logos">
              {placedAt.logos.map((logo) => (
                <img src={logo} alt="logos" className="logo-size" key={logo} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlacedAt;
