/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Link from 'next/link';

const Home = props => (
  <div>
    <p>Hello There!</p>
    <Link href="/sell">Sell!</Link>
  </div>
);
export default Home;
