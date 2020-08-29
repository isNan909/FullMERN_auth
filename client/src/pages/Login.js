import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/action.auth';

const Login = ({ login }) => {
  const [loginData, SetLoginData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = loginData;

  const onChange = (e) =>
    SetLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(name, email, password);
  };

  //will check authentication

  return (
    <div>
      <h1>Login to your account</h1>
      login form
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
        <button type="submit">Login</button>
      </form>
      <br />
      <br />
      <br />
      <h6>
        Already have account?<Link to="/signup">Create Account</Link>
      </h6>
    </div>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     prop: state.prop
//   }
// }

export default connect(null, { login })(Login);
