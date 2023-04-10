import React, { useState } from "react";
import config from "../../config";
import "./css/header.css";

const Header = () => {
  const [header, setHeader] = useState(config.header);

  return (
    <>
      <header>
        <section className="container main-hero-container">
          <div className="row">
            <div className="col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-items-start">
              <h1 className="display-2">
                {header.title[0]}
                <br />
                {header.title[1]}
              </h1>
              <p className="main-hero-para">{header.text}</p>
              <button className="btn-style btn-style-border">
                {header.button}
              </button>
            </div>
          </div>
          <div className="col-6 col-lg-6 header-right-side d-flex justify-content-center align-items-center main-herosection-images">
            <img
              src={header.imageUri.hero1}
              alt="image_teragon_doodle"
              className="main-hero-img2"
            />
            <img
              src={header.imageUri.hero2}
              alt="image_teragon_doodle"
              className="img-fluid"
            />
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
