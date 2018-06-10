import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField
} from 'material-ui';

class StoreOfficerHome extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
            title="StoreOfficer Home"
          />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default StoreOfficerHome ;
