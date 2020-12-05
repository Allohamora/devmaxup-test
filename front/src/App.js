import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Users from './pages/Users/Users';

const App = () => {
 return (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/users" component={Users} />
  </Switch>
 );
};

export default App;
