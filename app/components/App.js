import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import List from './List'
import Home from './Home'
import Dashboard from './Dashboard/Dashboard'
export default function App(props) {

    const { pokemon } = props;

    return (
        <div>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/pokemon" exact render={() => (<Redirect to="/pokemon/ability/telepathy" />)} />
            <Route path="/pokemon/ability/:ability" render={(location) => (<List pokemon={pokemon.list} location={location} />)} />
          </Switch>
        </div>
    )
};
