import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/action.auth';

const Navbar = ({ isAuthenticated, logout }) => {
  const authorizedLinks = (
    <li>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
    </li>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {<> {isAuthenticated ? authorizedLinks : guestLinks}</>}
        </ul>
      </nav>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
