import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = () => {
  const [loginData, SetLoginData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // const { name, email, password } = loginData;

  const onChange = (e) =>
    SetLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // add login function
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
          onChange={(e) => onChange(e)}
        />
        <br />
        <input
          type="email"
          placeholder="Your email here"
          name="email"
          onChange={(e) => onChange(e)}
        />
        <br />
        <input
          type="password"
          placeholder="Your password here"
          name="password"
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

export default connect()(Login);
