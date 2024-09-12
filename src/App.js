import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Component/Home/Home';
import Contact from './Component/Contact/Contact';
import "./App.css"

const App = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [cookies, setCookies] = useState({
    strictly: false,
    performance: false,
    targeting: false,
    functionality: false,
    unclassified: false,
  });

  // Handle checkbox toggle
  const handleCookieChange = (name) => {
    setCookies((prevCookies) => ({
      ...prevCookies,
      [name]: !prevCookies[name],
    }));
  };

  useEffect(() => {
    const checkGtag = setInterval(() => {
      if (typeof window.gtag === 'function') {
        clearInterval(checkGtag);
      }
    }, 500); // Check every 500ms

    return () => clearInterval(checkGtag); // Cleanup interval on unmount
  }, []);

  // Function to update Google Consent Mode based on user consent
  const updateConsent = (adConsent, analyticsConsent) => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': adConsent ? 'granted' : 'denied',
        'analytics_storage': analyticsConsent ? 'granted' : 'denied',
      });
    } else {
      console.warn('gtag is not available yet');
    }
  };



  // Accept all cookies and update Google Consent Mode
  const acceptAllCookies = () => {
    const updatedCookies = {
      strictly: true,
      performance: true,
      targeting: true,
      functionality: true,
      unclassified: true,
    };
    
    setCookies(updatedCookies);
  
    setTimeout(() => {
      saveCookieConsent(updatedCookies); // Save consent to cookies
      updateConsent(true, true); // Update Google Consent Mode for ads and analytics
      
      // Push the updatedCookies directly instead of relying on state
      pushConsentToDataLayer(updatedCookies); 
  
    }, 500);
  
    setShowSettings(false);
  };
  
  

  // Decline all cookies and update Google Consent Mode
  const declineAllCookies = () => {
    const updatedCookies = {
      strictly: false,
      performance: false,
      targeting: false,
      functionality: false,
      unclassified: false,
    };
  
    setCookies(updatedCookies);
  
    setTimeout(() => {
      saveCookieConsent(updatedCookies);
      updateConsent(false, false);
      
      // Push the updatedCookies directly instead of relying on state
      pushConsentToDataLayer(updatedCookies);
  
    }, 500);
  
    setShowSettings(false);
  };
  

    // Push consent values to GTM dataLayer
    const pushConsentToDataLayer = (updatedCookies) => {

      if(updatedCookies=== undefined){
        console.log("The Value's of Cookies Passed to the Data Layer is",cookies)

      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cookieConsentUpdate',
        strictly: cookies.strictly,
        performance: cookies.performance,
        targeting: cookies.targeting,
        functionality: cookies.functionality,
        unclassified: cookies.unclassified,
      });
    }
    else {
      console.log("The Value's of Cookies Passed to the Data Layer is",updatedCookies)
      
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'cookieConsentUpdate',
          strictly: updatedCookies.strictly,
          performance: updatedCookies.performance,
          targeting: updatedCookies.targeting,
          functionality: updatedCookies.functionality,
          unclassified: updatedCookies.unclassified,
        });
      
      
    }
    };
  

  // Save cookie consent to document.cookie
  const saveCookieConsent = (cookieData) => {
    document.cookie = `CookieConsent=${JSON.stringify(cookieData)}; path=/;`;
  };

  //This Function is to Log current cookies to the console
  // const logCookies = () => {
  //   console.log('Current cookies:', document.cookie);
  // };

  // Determine if any checkbox is checked for showing "Save and Close" button
  const isAnyChecked = Object.values(cookies).some((checked) => checked);

  return (
    <div>
      <Router>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>

      {/* Cookie Consent Pop-up */}
      {showSettings && (
        <div className="cookie-consent-overlay">
          <div className="cookie-consent-popup">
            <h3>Cookie Settings</h3>
            <p>This website uses cookies to improve user experience. You can change your preferences below.</p>
            <div>
              <input
                type="checkbox"
                name="strictly"
                checked={cookies.strictly}
                onChange={() => handleCookieChange('strictly')}
              /> Strictly Necessary <br />
              <input
                type="checkbox"
                name="performance"
                checked={cookies.performance}
                onChange={() => handleCookieChange('performance')}
              /> Performance <br />
              <input
                type="checkbox"
                name="targeting"
                checked={cookies.targeting}
                onChange={() => handleCookieChange('targeting')}
              /> Targeting <br />
              <input
                type="checkbox"
                name="functionality"
                checked={cookies.functionality}
                onChange={() => handleCookieChange('functionality')}
              /> Functionality <br />
              <input
                type="checkbox"
                name="unclassified"
                checked={cookies.unclassified}
                onChange={() => handleCookieChange('unclassified')}
              /> Unclassified <br />
            </div>

            {/* Accept All or Save and Close */}
            {!isAnyChecked ? (
              <button onClick={acceptAllCookies} className="accept-btn">Accept All</button>
            ) : (
              <button onClick={() => { pushConsentToDataLayer(); setShowSettings(false); }} className="save-btn">Save and Close</button>
            )}
            <button onClick={declineAllCookies} className="decline-btn">Decline All</button>
          </div>
        </div>
      )}

      {/* Cookie settings button (to reopen the settings) */}
      <button onClick={() => setShowSettings((prev) => !prev)} className="cookie-settings-btn">
        {showSettings ? "Close Settings" : "Cookie Settings"}
      </button>
      <footer className="footer">
      <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default App;
