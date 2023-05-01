import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./navbar";


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <p className="primary-subheading">Library Management System</p>
          <h1 className="primary-heading">
            Your Favourite Books Place is our Library.
          </h1>
          <p className="primary-text">
            Welcome to our Libraray Managemnet System, where you can find all kinds of your favourite book.
          </p>
          {/* <button className="secondary-button">
            Explore 
          </button> */}
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;