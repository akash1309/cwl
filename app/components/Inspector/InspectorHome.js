import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField
} from 'material-ui';

class InspectorHome extends React.Component {

  constructor(props) {
    super(props);
    console.log("InspectorProps", props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
            title="Inspector Home"
          />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default InspectorHome ;
