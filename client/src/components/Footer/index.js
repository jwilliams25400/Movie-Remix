import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Card, } from 

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
         &copy;
          <span
            className="symbol"
            role="img"
            aria-label="copyright"
            aria-hidden="false"
          >
        
          </span>{' '}
         Adam. G, Christia.C and Jemel.W, 2021
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
