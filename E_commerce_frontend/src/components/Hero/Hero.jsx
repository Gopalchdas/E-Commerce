import React from 'react'
import ("./Hero.css")
import hero_img from "../Assets/hero.jpg"

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
      <h1 className="hero-title">Discover Your Style</h1>
        <p className="hero-subtitle">Trendy. Affordable. Stylish.</p>
        <button >Shop Now</button>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="hero-img" />
      </div>
    </div>
  )
}

export default Hero
