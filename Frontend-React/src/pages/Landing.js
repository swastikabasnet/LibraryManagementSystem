import React from 'react'
import Home from "../components/home";
import About from "../components/about";
import Work from "../components/work";
import Test from "../components/testimonials";
import Footer from "../components/footer";

const Landing = () => {
  return (
    <div className="App">
        <Home/>
        <About/>
        <Work/>
        <Test/>
        <Footer/>
    </div>
  )
}

export default Landing