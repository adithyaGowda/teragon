import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../css/courses.css"
import config from "../../../config";

const Courses = () => {
  const [courses,setCourses] = useState(config.courses);
  return (
    <>
      <Navbar/>
      <section className="service-main-container">
        <div className="work-container container">
          <div className="container service-container">
            <h4 className="text-center fw-bold">
              {courses.desc}
            </h4>
            <div className="row">
              {courses.courseOptions.map((curElem) => {
                const { logo, title, desc } = curElem;
                return (
                    <div
                      className="col-11 col-lg-4 col-xxl-4 work-container-subdiv"
                      key={title}
                    >
                      <img src={logo} alt="tergon-courses" className="courses_img"/>
                      <h2 className="sub-heading">{title}</h2>
                      <p className="main-hero-para">{desc}</p>
                    </div> 
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Courses;
