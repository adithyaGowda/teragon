import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import "./css/footer.css";

const Footer = () => {
  const [footer, setFooter] = useState(config.footer);
  const [navBar, setNavBar] = useState(config.navbar);
  const [contact, setContact] = useState(config.conatctUs);

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="col-6 col-lg-4">
                  <h1>{footer.leftTitle}</h1>
                  <ul>
                    {navBar.map((data) => (
                      <li key={data.title}>
                        <Link to={data.uri}>{data.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-6 col-lg-4">
                  <h3>{footer.middleTitle1}</h3>
                  <div className="row footer-mid">
                    <div className="col-sm f">
                    <i className="fas fa-phone fontawesome-style"></i>
                    <h4>{contact.number}</h4></div>                   
                  </div>
                  <br/>
                  <h3>{footer.middleTitle2}</h3>
                  <div className="row footer-mid">
                    <div className="col-sm f">
                    <i className="fas fa-envelope fontawesome-style"></i>
                    <h4>{contact.email}</h4></div>                   
                  </div>
                </div>

                <div className="col-6 col-lg-4 follow">
                  <h3>{footer.rightTitle}</h3>
                  <div className="row">
                    {footer.socials.map((ele) => (
                       <div className="col-3 mx-auto" key={ele.logo}>
                        <Link to={ele.uri}>
                          <i className={`${ele.logo} fontawesome-style`}></i>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-5">
                <p className="main-hero-para text-center w-100">
                  {footer.copyright}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
