import React from 'react';
import Main from './pages/Main';
import Users from './pages/Users';
import UserPosts from './pages/UserPosts';
import UserNewPost from './pages/UserNewPost/UserNewPost';
import { Redirect, Route, Switch } from 'react-router-dom';
import { paths } from './utils/path';

const App = () => {
 return (
  <Switch>
    <Route exact path={paths.main} component={Main} />
    <Route exact path={paths.users} component={Users} />
    <Route exact path={paths.userPosts} component={UserPosts} />
    <Route exact path={paths.userPostsNew} component={UserNewPost} />
    <Redirect to={paths.main} />
  </Switch>
 );
};

export default App;
