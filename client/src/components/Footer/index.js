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

        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Meet our Development Team</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Christian Colon</Card.Subtitle>
    <Card.Text>
            <ul>
              <li><a href="https://github.com/Colon182">Github</a></li>
              <li><a href="https://www.linkedin.com/in/christian-colon-861964218/">LinkedIn</a></li>
            </ul>
    </Card.Text>
    <Card.Subtitle className="mb-2 text-muted">Adam Gonzalez</Card.Subtitle>
    <Card.Text>
            <ul>
              <li><a href="https://github.com/Trgrf">Github</a></li>
              <li><a href="https://www.linkedin.com/in/adam-gonzalez-526709217/">LinkedIn</a></li>
            </ul>
    </Card.Text>
    <Card.Subtitle className="mb-2 text-muted">Jemel Williams</Card.Subtitle>
    <Card.Text>
            <ul>
              <li><a href="https://github.com/jwilliams25400">Github</a></li>
              <li><a href="http://www.linkedin.com/in/jemel-williams-cams-a5b14014">LinkedIn</a></li>
            </ul>
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
  </Card.Body>
</Card>

        <h4>
         &copy;
          <span
            className="symbol"
            role="img"
            aria-label="copyright"
            aria-hidden="false"
          >
        
          </span>{' '}
         Adam. G, Christian.C and Jemel.W, 2021
        </h4>

      </div>
    </footer>
  );
};

export default Footer;
