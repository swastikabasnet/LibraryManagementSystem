import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";


const About = () => {
  return (
    <div className="about-section-container" id="about">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Library Management System
        </h1>
        <p className="primary-text">
        Library management systems help libraries keep track of their documents inventory and loans, and member subscriptions and profiles, sometimes for multiple physical locations.
        </p>
        <p className="primary-text">
          This application is an online Libraray Management System.
        </p>
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
        </div> */}
      </div>
    </div>
  );
};

export default About;