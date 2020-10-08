import React from "react";
import { Route, Switch } from "react-router-dom";
//Private Route
import PrivateRoute from "./PrivateRoutes";

import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Users from "../../pages/Users";
import Activated from "../../pages/Activated";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/activated" component={Activated} />
      </Switch>
    </div>
  );
};

export default Routes;
