import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Activated from './pages/Activated';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hoc/Layout';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/activated" component={Activated} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
