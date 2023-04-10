import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import "./css/navBar.css";

const Navbar = () => {
  const [navItem, setNavItems] = useState(config.navbar);

  return (
    <>
      <section className="navbar-bg sticky">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h2 className="logo">
                <span>T</span>eragon
              </h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {navItem.map((item) => (
                  <li className="nav-item navItem" key={item.title}>
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={item.uri}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
