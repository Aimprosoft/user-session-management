import React, {Component} from 'react';
import HomePage from 'src/browser/container/HomePage/HomePage';
import UserPage from 'src/browser/container/UserPage/UserPage';
import {Route, Switch} from 'react-router';
import LoginPage from 'src/browser/container/LoginPage/LoginPage';
import {Redirect} from 'react-router-dom';
import {isSigned} from 'src/browser/utils/AuthenticationUtil';
import '@babel/polyfill';

const ProtectedRoute = ({...props}) =>
  isSigned() ? <Route {...props} /> : <Redirect to="/login" />;

const NoMatch = ({location}) => (
  <div>
    <h3>
      Page {location.uri} <code>{location.pathname}</code> not found
    </h3>
  </div>
);

export default class SiteRouter extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute path="/users/:status" component={UserPage} />
        <Route path="/login" component={LoginPage} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
