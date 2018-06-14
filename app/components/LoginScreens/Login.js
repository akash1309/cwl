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
    console.log("loginProps", props);
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
                    <RaisedButton label="Login" primary={true} style={styles.buttonStyle} onClick={(event) => {this.handleLogin(event)}} />
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

  handleClick(event){

    var that = this;
    var apiUrl = baseUrl + validateUrl + this.state.mobile;

    axios.get(apiUrl)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        that.setState({ flag: response.data.flag , role: response.data.role, _id : response.data._id });
      }
    })
    .catch(function (error) {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  handleLogin(event){
    var that = this;
    var apiUrl = baseUrl+loginUrl;
    axios.post(apiUrl,{
      "mobile" : this.state.mobile,
      "password" : this.state.password
    })
    .then(response => {
        if(response.status == 200) {
          console.log(response);
          //console.log("ROle is"+this.state.role);
          if(this.state.role == "CEE")
          {
              this.props.history.push({
                pathname : '/cee',
                state : { _id : that.state._id }
              });
          }
          else if(this.state.role == "DyCEE")
          {
              this.props.history.push("/dycee");
          }
          else if(this.state.role == "Inspector")
          {
              this.props.history.push("/inspector");
          }
          else if(this.state.role == "Vendor")
          {
              this.props.history.push("/vendor");
          }
          else if(this.state.role == "StoreOfficer")
          {
              this.props.history.push("/storeofficer");
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
          console.log(response);

          if(this.state.role == "CEE")
          {
            this.props.history.push({
              pathname : '/cee',
              state : { _id : that.state._id }
            });
          }
          else if(this.state.role == "DyCEE")
          {
              this.props.history.push("/dycee");
          }
          else if(this.state.role == "Inspector")
          {
              this.props.history.push("/inspector");
          }
          else if(this.state.role == "Vendor")
          {
              this.props.history.push("/vendor");
          }
          else if(this.state.role == "StoreOfficer")
          {
              this.props.history.push("/storeofficer");
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
