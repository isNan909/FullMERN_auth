import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Routes from "./utils/routing/Routes";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./hoc/Layout";
import { check_authenticated } from "./actions/action.auth";
import setAuthToken from "./utils/setAuthToken";

//Check for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //Setting up token
  useEffect(() => {
    store.dispatch(check_authenticated());
    // eslint-disable-next-line
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Routes} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
