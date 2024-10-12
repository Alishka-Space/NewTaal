import React from 'react'
import "../hero-header/hero.css";
import { Link } from "react-router-dom";

const HeroHeader = () => {
  return (
    <div className="hero-header">
        <h1 className='hero-title' > Join us and get your first free session with us!</h1>
        <Link className="hero-btn">Sign Up Now</Link>

    </div>
  )
}

export default HeroHeader
