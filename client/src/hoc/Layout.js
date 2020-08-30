import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { check_authenticated, load_user } from '../actions/action.auth';

const Layout = (props) => {
  useEffect(() => {
    props.check_authenticated();
    //props.load_user();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="containerMain">
      <Navbar />
      {props.children}
    </div>
  );
};

export default connect(null, { check_authenticated, load_user })(Layout);
