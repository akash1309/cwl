import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Login from './LoginScreens/Login';

export default function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  )
};

// <Route path="/pokemon" exact render={() => (<Redirect to="/pokemon/ability/telepathy" />)} />
// <Route path="/pokemon/ability/:ability" render={(location) => (<List pokemon={pokemon.list} location={location} />)} />
