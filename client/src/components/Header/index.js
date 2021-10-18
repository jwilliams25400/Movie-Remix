import React from 'react';
import HeaderImg from '../../Assets/Movie remix header.jpg'

const Header = () => {
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-content">
      <img style={{width:"1515px", height:"350px"}} src={HeaderImg} alt="Header banner"/>
    </header>
  );
};

export default Header;
