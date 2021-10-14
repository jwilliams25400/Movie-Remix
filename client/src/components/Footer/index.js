import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Card, } from 'react-bootstrap'

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
        <h4>Meet our Development Team</h4>
          <h5>Christian Colon</h5>
            <ul>
              <li><a href="https://github.com/Colon182">Github</a></li>
              <li><a href=""></a></li>
            </ul>
          <h5>Adam Gonzalez</h5>
            <ul>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
            </ul>
          <h5>Jemel Williams</h5>
            <ul>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
            </ul>
      </div>
    </footer>
  );
};

export default Footer;
