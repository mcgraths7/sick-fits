/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Nav from './Nav';

const Header = () => (
  <div>
    <div className="bar">
      <a href="">Sick Fits</a>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <p>Cart</p>
  </div>
);

export default Header;
