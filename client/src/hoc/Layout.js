import React from 'react';
import Navbar from '../components/Navbar';

const Layout = (props) => (
  <div>
    <Navbar />
        {props.children}
  </div>
);

export default Layout;
