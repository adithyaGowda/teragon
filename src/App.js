import React from "react";
import { Route, Routes } from "react-router-dom";
import Contact from "./components/pages/Contact";
import Courses from "./components/pages/Courses";
import Error from "./components/pages/Error";
import Events from "./components/pages/Events";
import Home from "./components/pages/Home";
import WhyChoose from "./components/pages/WhyChoose";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/events" element={<Events />} />
        <Route path="/why-choose-us" element={<WhyChoose />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
