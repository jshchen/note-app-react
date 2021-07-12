import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, browserHistory, Route } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component = {App}>
      {/* <App /> */}
    </Route>
  </Router>

  ,
  document.getElementById('root'));