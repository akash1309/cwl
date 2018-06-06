import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { baseUrl } from './../../config/url';

import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField
} from 'material-ui';


class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state={
      mobile:'',
      password:'',
      confirmPassword:'',
      flag: -1
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>

            <AppBar
              title="CWL Login"
            />

            <div style={styles.outerContainerStyle}>
              <div style={styles.innerContainerStyle}>
                <TextField
                  hintText="Enter your mobile number"
                  floatingLabelText="Mobile Number"
                  onChange = {(event,newValue) => this.setState({mobile:newValue, flag: -1})}
                  style={{ marginTop: 10 }}
                />

                {
                  this.state.flag == -1 ?
                  <RaisedButton label="Next" primary={true} style={styles.buttonStyle} onClick={(event) => this.handleClick(event)}/>
                  : null
                }
                {
                  this.state.flag == 1 ?
                  <div style={styles.outerContainerStyle}>
                    <TextField
                      type="password"
                      hintText="Enter Password"
                      floatingLabelText="Password"
                      onChange = {(event,newValue) => this.setState({password:newValue})}
                      style={{ marginTop: -10 }}
                    />
                    <br/>
                    <RaisedButton label="Login" primary={true} style={styles.buttonStyle} onClick={() => this.setState({ flag: 0 })}/>
                  </div>
                  : null
                }
                {
                  this.state.flag == 0 ?
                  <div style={styles.outerContainerStyle}>
                    <TextField
                      type="password"
                      hintText="Enter Password"
                      floatingLabelText="Password"
                      onChange = {(event,newValue) => this.setState({password:newValue})}
                      style={{ marginTop: -10 }}
                    />
                    <TextField
                      type="password"
                      hintText="Enter Confirm Password"
                      floatingLabelText="Confirm Password"
                      onChange = {(event,newValue) => this.setState({confirmPassword:newValue})}
                      style={{ marginTop: -10 }}
                    />
                  <RaisedButton label="Sign Up" primary={true} style={styles.buttonStyle} onClick={() => this.setState({ flag: 1 })}/>
                  </div>
                  : null
                }
              </div>
            </div>

          </div>

        </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event){

    var that = this;
    var apiUrl = baseUrl + "/signup/" + this.state.mobile;

    axios.get(apiUrl)
    .then(function (response) {
      if(response.status == 200){
        that.setState({ flag: response.data.flag });
      }
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });

  }

}

const styles = {
  outerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #00BCD4',
    borderRadius: 25,
    margin: 70,
    padding: 30
  },
  buttonStyle: {
    margin: 15
  }
};

export default Dashboard;
