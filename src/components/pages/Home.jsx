import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import WhatWeStrive from "../WhatWeStrive";
import AboutUs from "../AboutUs";
import PlacedAt from "../PlacedAt";
import Footer from "../Footer";

const Home = () => {
  return (
    <div className="outer_container">
      <Navbar />
      <Header />
      <WhatWeStrive />
      <AboutUs />
      <PlacedAt />
      <Footer />
    </div>
  );
};

export default Home;
