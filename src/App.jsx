import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tabfilter from './components/Tabfilter';
import Footer from './components/Footer';
import End from './components/End';
import Category from './components/Category';



function App() {
  return (
    <Router>
      <div >
        <Navbar />
        <Routes>
          <Route path="/" element={<Tabfilter />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
        <Footer />
        <End />
      </div>
    </Router>
  );
}

export default App;
