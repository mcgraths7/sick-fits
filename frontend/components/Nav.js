/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <div>
    <Link href="/">Home</Link>
    <Link href="/sell">Sell!</Link>
  </div>
);

export default Nav;
