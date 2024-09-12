import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="logo">Ajitesh Website</h1>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="title">Welcome to My Website</h2>
        <p className="description">
          This Website is Build to Check the cookie-consent Functionality Using Google Consent Mode v2
        </p>
        <Link to="/contact" className="contact-button">
          Contact Us
        </Link>
      </main>

     
    </div>
  );
};

export default Home;
