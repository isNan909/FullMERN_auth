import React from "react";

import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

//Private route component
//any component passed as props can only be accessed if the
//user is authenticated else would be redireted to /login
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
