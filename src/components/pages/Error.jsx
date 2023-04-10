import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import "../css/error.css";

const Error = () => {
  const [error, setError] = useState(config.error);

  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>{error.code}</h1>
          </div>
          <h2>{error.message}</h2>
          <p>{error.desc}</p>
          <Link to={error.homeUri}>{error.button}</Link>
        </div>
      </div>
    </>
  );
};

export default Error;
