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
                  <div class="row">
                    <div class="col-sm"><i className="fab fa-facebook-f"></i></div>
                    <div class="col-sm"><p>{contact.number}</p></div>
                  </div>
                  <h3>{footer.middleTitle2}</h3>
                  <ul>
                    <li>
                      <p>{contact.email}</p>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-lg-4 follow">
                  <h3>{footer.rightTitle}</h3>
                  <div className="row">
                    {footer.socials.map((ele) => (
                      <div className="col-3 mx-auto">
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
