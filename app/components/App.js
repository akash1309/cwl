import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Login from './LoginScreens/Login';
import InspectorHome from './Inspector/InspectorHome';
import CeeHome from './CEE/CeeHome';
import DyceeHome from './DyCEE/DyceeHome';
import VendorHome from './Vendor/VendorHome';
import StoreOfficerHome from './StoreOfficer/StoreOfficerHome';

export default function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/inspector" exact component={InspectorHome} />
        <Route path="/cee" exact component={CeeHome} />
        <Route path="/dycee" exact component={DyceeHome} />
        <Route path="/vendor" exact component={VendorHome} />
        <Route path="/storeofficer" exact component={StoreOfficerHome} />

      </Switch>
    </div>
  )
};

// <Route path="/pokemon" exact render={() => (<Redirect to="/pokemon/ability/telepathy" />)} />
// <Route path="/pokemon/ability/:ability" render={(location) => (<List pokemon={pokemon.list} location={location} />)} />
