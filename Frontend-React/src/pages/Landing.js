import React from 'react'
import Home from "../components/home";
import About from "../components/about";
import Work from "../components/work";
import Test from "../components/testimonials";
import Footer from "../components/footer";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Landing = () => {
  // remember me 
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the "isRememberMe" flag is set in the local storage
    const isRememberMe = localStorage.getItem('isRememberMe') === 'true';
    if (isRememberMe) {
      // "Remember me" was checked
      // Retrieve the user ID from the local storage
      const userId = localStorage.getItem('userId');
      // Navigate to the dashboard with the user ID
      navigate('/dashboard', { state: { id: userId } });
    }
  }, []);

  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Test />
      <Footer />
    </div>
  )
}

export default Landing