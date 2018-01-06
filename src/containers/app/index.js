import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import Login from '../login';
import Register from '../register';
import NoMatch from './noMatch';

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/form">Form</Link>
      <Link to="/tutu">tutu</Link>
    </header>

    {/* <main> */}
    <Route component={NoMatch} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/app" component={Home} />
    {/* </main> */}
  </div>
);

export default App;
