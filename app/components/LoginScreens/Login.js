import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { baseUrl, signupUrl, validateUrl, loginUrl } from './../../config/url';
import {
    Redirect,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField
} from 'material-ui';


class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      mobile:'',
      password:'',
      confirmPassword:'',
      flag: -1,
      role:'',
      _id : ''
    }
  };

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
                  <RaisedButton label="Next" primary={true} style={styles.buttonStyle} onClick={(event) => this.isMobilePresent(event)}/>
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
                    <RaisedButton label="Login" primary={true} style={styles.buttonStyle} onClick={(event) => {this.checkLogin(event)}} />
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
                  <RaisedButton label="Sign Up" primary={true} style={styles.buttonStyle} onClick={(event) => {this.handleSignUp(event)}}/>
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

  isMobilePresent(event){

    var that = this;
    var apiUrl = baseUrl + validateUrl + this.state.mobile;

    axios.get(apiUrl)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        var userInfo = {
          role: response.data.role,
          userId: response.data._id,
          code: response.data.code
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        that.setState({ flag: response.data.flag , role: response.data.role });
      }
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });

  }

  checkLogin(event){

    var that = this;
    var apiUrl = baseUrl+loginUrl;

    axios.post(apiUrl,{
      "mobile" : this.state.mobile,
      "password" : this.state.password
    })
    .then(response => {
        if(response.status == 200) {

          if(this.state.role == "CEE")
          {
              this.props.history.push({
                pathname : '/cee'
              });
          }
          else if(this.state.role == "DyCEE")
          {
            this.props.history.push({
              pathname : '/dycee'
            });
          }
          else if(this.state.role == "Inspector")
          {
            this.props.history.push({
              pathname : '/inspector'
            });
          }
          else if(this.state.role == "Vendor")
          {
            this.props.history.push({
              pathname : '/vendor'
            });
          }
          else if(this.state.role == "StoreOfficer")
          {
            this.props.history.push({
              pathname : '/storeofficer'
            });
          }

        }
    })
    .catch(error => {
      alert(error.response.data.message);
    });

  }



  handleSignUp(event){


    var password = this.state.password;
    var confirmPassword = this.state.confirmPassword;
    var that = this;

    if(password != confirmPassword)
    {
      alert("Password and ConfirmPassword fields are not matching.");
      return;
    }

    var apiUrl = baseUrl + signupUrl;

    axios.post(apiUrl , {
      "mobile" : this.state.mobile,
      "password" : password

    })
    .then(response => {
        if(response.status == 200) {
        //  console.log(response);

          if(this.state.role == "CEE")
          {
            this.props.history.push({
              pathname : '/cee'
            });
          }
          else if(this.state.role == "DyCEE")
          {
            this.props.history.push({
              pathname : '/dycee'
            });
          }
          else if(this.state.role == "Inspector")
          {
            this.props.history.push({
              pathname : '/inspector'
            });
          }
          else if(this.state.role == "Vendor")
          {
            this.props.history.push({
              pathname : '/vendor'
            });
          }
          else if(this.state.role == "StoreOfficer")
          {
            this.props.history.push({
              pathname : '/storeofficer'
            });
          }

        }
    })
    .catch(error => {
      alert(error.response.data.message);
    })


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

export default Login;
