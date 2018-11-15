import * as React from "react";
import 'babel-polyfill';
import "./app.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider } from "react-redux";
import store from './store/index';
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LoginForm from './pages/LoginForm';
import SignupForm from "./pages/SignupForm";
export default class App extends React.Component {

  render() {
    return (
      <Provider store={store} >
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/signin" component={SignupForm} />
          <AuthenticatedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      </Provider>
    );
  }
}
