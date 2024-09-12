import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css'; 

const Contact = () => {
  return (
    <div className="contact-container">
      <header className="header">
        <h1 className="logo">My Website</h1>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="title">Contact Us</h2>
        <p className="description">
          Have questions or need assistance? Get in touch with me on my email - ajiteshk.1997@gmail.com .
        </p>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your email" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" placeholder="Your message"></textarea>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </main>

      
    </div>
  );
};

export default Contact;
