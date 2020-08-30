import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/action.auth';

const Navbar = ({ check_authenticated, logout }) => {
  const authorizedLinks = (
    <li>
      <a onClick={logout} href="#!">
        Logout
      </a>
    </li>
  );

  const unauthorizedLinks = (
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
          {<> {check_authenticated ? authorizedLinks : unauthorizedLinks}</>}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  check_authenticated: state.auth.check_authenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
