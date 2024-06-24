import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { SearchIcon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <div className='header'>
        <div className='section1'>
          <div id='findDesigner'>
            <h3>Find designers <FaChevronDown /></h3>
            <div className='dropdown'>
              <div className='item'>
                <p>Designer search</p>
                <small>Quickly find your next designer</small>
              </div>
              <div className='item'>
                <p>Post a job</p>
                <small>The #1 job board for design talent</small>
              </div>
            </div>
          </div>
          <h3>Inspiration</h3>
          <div id='Courses'>
            <h3>Courses <FaChevronDown /></h3>
            <div className='dropdown'>
              <div className='item'>
                <p>UX Diploma</p>
                <small>Learn UX design from scratch in 6 months</small>
              </div>
              <div className='item'>
                <p>UI Certificate</p>
                <small>12-week UI skill building for designers</small>
              </div>
              <hr />
              <div className='item'>
                <p>Live interactive workshops</p>
                <small>with design professionals</small>
              </div>
            </div>
          </div>
          <h3>Jobs</h3>
          <h3>Go pro</h3>
        </div>
        <div className='section2'>
          <h3>Dribbble</h3>
        </div>
        <div className='section3'>
          <button><SearchIcon style={{width:"20px",backgroundColor:"transparent",color:"gray"}}/><span>Search...</span></button>
          <div>A</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

