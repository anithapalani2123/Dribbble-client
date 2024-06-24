import React from 'react'
import './Footer.css'
import twitter from '../assets/twitter.png';
import fb from '../assets/facebook.png';
import insta from '../assets/social.png';
import pin from '../assets/pin.png';
const Footer = () => {
  return (
    <div className='Footer'>
        <div className='Footersection1'>
            <h3>Dribbble</h3>
        </div>
        <div className='Footersection2'>
            <h4>For designers</h4>
            <h4>Hire talent</h4>
            <h4>Inspiration</h4>
            <h4>Advertising</h4>
            <h4>Blog</h4>
            <h4>About</h4>
            <h4>Careers</h4>
            <h4>Support</h4>

        </div>
        <div className='Footersection3'>
            <img src={twitter} alt="icon" />
            <img src={fb} alt="" />
            <img src={insta} alt="" />
            <img src={pin} alt="" />
            

        </div>
      
    </div>
  )
}

export default Footer
