import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="background-image">
        <div className="content">
          <h1 className="heading">Welcome to Our Webflix</h1>
          <p className="description">Make an account to browse our collection of films!</p>

          {/* Footer Links */}
          <div className="mt-16 border-t border-gray-800 pt-8 text-center lg:text-left">
            <div className="text-base font-semibold text-gray-400">
              <Link to="/signup" className="text-white hover:underline">
                Sign Up
              </Link>{' '}
              |{' '}
              <Link to="/terms-and-conditions" className="text-white hover:underline">
                Terms and Conditions
              </Link>{' '}
              |{' '}
              <Link to="/privacy-policy" className="text-white hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
