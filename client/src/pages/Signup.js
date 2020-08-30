import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/action.auth';

const Signup = ({ signup, check_authenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [signupData, SetSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = signupData;

  const onChange = (e) =>
    SetSignupData({ ...signupData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
    setAccountCreated(true);
  };

  //check authentication
  if (check_authenticated) {
    return <Redirect to="/" />;
  }

  if (accountCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Sign Up to your create an account</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Your name here"
          name="name"
          autoComplete="on"
          onChange={(e) => onChange(e)}
        />
        <br />
        <input
          type="email"
          placeholder="Your email here"
          name="email"
          autoComplete="on"
          onChange={(e) => onChange(e)}
        />
        <br />
        <input
          type="password"
          placeholder="Your password here"
          name="password"
          autoComplete="on"
          onChange={(e) => onChange(e)}
        />
        <br />
        <button type="submit">Create New Account</button>
      </form>
      <br />
      <br />
      <br />
      <h6>
        Already have an account?<Link to="/login">Login</Link>
      </h6>
    </div>
  );
};

const mapStateToProps = (state) => ({
  check_authenticated: state.auth.check_authenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
