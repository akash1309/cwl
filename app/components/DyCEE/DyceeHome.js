import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'react-toolbox/lib/font_icon';
import {Glyphicon} from 'react-bootstrap';
import { baseUrl, inspectorUrl, getInfoUrl, updateInfoUrl } from './../../config/url';
import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField, IconButton, SvgIcon,
} from 'material-ui';

const GitHubIcon = (props) => (
    <SvgIcon {...props}>
        {<path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>}
    </SvgIcon>
);

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

class DyCeeHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      _id : props.location.state._id,
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : -1,
      open : false
    }
    this._toggle = this._toggle.bind(this);
  };

  _toggle(e) {
    var status = this.state.open;
    if(status == false) {
      status = true
    }
    else {
      status = false
    }
    this.setState({open : status});
    console.log(status);
   }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar title="DyCEE Home" iconElementLeft={
            <IconButton
              onClick={ this._toggle } >
              <GitHubIcon />
              </IconButton>
          } />

          { this.state.open == true ?
            <Paper style={style.paper}>
               <Menu disableAutoFocus={true}>
               <MenuItem primaryText="All Items" leftIcon={<RemoveRedEye />}  />
               <MenuItem primaryText="All Vendors" leftIcon={<RemoveRedEye />}  />
               <MenuItem primaryText="All Inspectors" leftIcon={<RemoveRedEye />}  />
               <Divider />
               <MenuItem primaryText="Add Inspector" leftIcon={<PersonAdd />} onClick={(event) => this.setState({flag : 1})} />
                 <Divider />
                 <MenuItem primaryText="All Purchase_Order" leftIcon={<RemoveRedEye />}  />
                 <MenuItem primaryText="All I.C." leftIcon={<RemoveRedEye />} />
                 <Divider />
                 <MenuItem primaryText="Corrigendum Approval" leftIcon={<ContentCopy />} />
                 <MenuItem primaryText="Approval Letter" leftIcon={<ContentCopy />} />
                 <Divider />
                 <MenuItem primaryText="Update My_Infomation" leftIcon={<RemoveRedEye />} onClick={(event) => this.getPreviousInfo(event)} />
               </Menu>
            </Paper>
            : null
            }

            { this.state.flag == 1 ?
            <div style={styles.outerContainerStyle}>
              <div style={styles.innerContainerStyle}>
              <div>
              <span className="glyphicon glyphicon-check" aria-hidden="true" />
              <TextField
                hintText="Enter Dycee id"
                floatingLabelText="Id"
                value = {this.state._id}
                style={{ marginLeft: 10 ,marginRight : 10, marginTop : 5}}
              />
              </div>
              <div>
              <span className="glyphicon glyphicon-user" aria-hidden="true" />
              <TextField
                hintText="Enter name"
                floatingLabelText="Name"
                onChange = {(event,newValue) => this.setState({name:newValue})}
                style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
              />
              </div>
              <div>
              <span className="glyphicon glyphicon-phone" aria-hidden="true" />
              <TextField
                hintText="Enter mobile number"
                floatingLabelText="Mobile Number"
                onChange = {(event,newValue) => this.setState({mobile:newValue})}
                style={{marginLeft: 10 ,marginRight : 10, marginTop : 2 }}
              /></div>
              <div>
              <span className="glyphicon glyphicon-envelope" aria-hidden="true" />
              <TextField
                hintText="Enter email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
                style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
              /></div>
              <div>
              <span className="glyphicon glyphicon-globe" aria-hidden="true" />
              <TextField
                hintText="Enter location"
                floatingLabelText="Location"
                onChange = {(event,newValue) => this.setState({location:newValue})}
                style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
              /></div>
              <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => this.handleInspector(event)}/>

              </div>
            </div>
            : null
          }

          { this.state.flag == 2 ?
          <div style={styles.outerContainerStyle}>
            <div style={styles.innerContainerStyleUpdate}>
            <div>
            <span className="glyphicon glyphicon-check" aria-hidden="true" />
            <TextField
              hintText="Enter Dycee id"
              floatingLabelText="Id"
              value = {this.state._id}
              style={{ marginLeft: 10 ,marginRight : 10, marginTop : 5}}
            />
            </div>
            <div>
            <span className="glyphicon glyphicon-user" aria-hidden="true" />
            <TextField
              hintText="Enter name"
              floatingLabelText="Name"
              value = {this.state.name}
              onChange = {(event,newValue) => this.setState({name:newValue})}
              style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
            />
            </div>
            <div>
            <span className="glyphicon glyphicon-lock" aria-hidden="true" />
            <TextField
              hintText="Enter password"
              floatingLabelText="Password"
              value = {this.state.password}
              onChange = {(event,newValue) => this.setState({password:newValue})}
              style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
            /></div>
            <div>
            <span className="glyphicon glyphicon-phone" aria-hidden="true" />
            <TextField
              hintText="Enter mobile number"
              floatingLabelText="Mobile Number"
              value = {this.state.mobile}
              onChange = {(event,newValue) => this.setState({mobile:newValue})}
              style={{marginLeft: 10 ,marginRight : 10, marginTop : 2 }}
            /></div>
            <div>
            <span className="glyphicon glyphicon-envelope" aria-hidden="true" />
            <TextField
              hintText="Enter email"
              floatingLabelText="Email"
              value = {this.state.email}
              onChange = {(event,newValue) => this.setState({email:newValue})}
              style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
            /></div>
            <div>
            <span className="glyphicon glyphicon-globe" aria-hidden="true" />
            <TextField
              hintText="Enter location"
              floatingLabelText="Location"
              value = {this.state.location}
              onChange = {(event,newValue) => this.setState({location:newValue})}
              style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
            /></div>
            <RaisedButton label="UPDATE" primary={true} style={styles.buttonStyle} onClick={(event) => this.updateInfo(event)}/>

            </div>
          </div>
          : null
        }

          </div>
        </MuiThemeProvider>
      </div>
    );
  }


handleInspector(event){
  var that = this;
  var apiUrl = baseUrl + inspectorUrl;

  axios.post(apiUrl, {
    "dycee_id" : that.state._id,
    "name" : that.state.name,
    "mobile" : that.state.mobile,
    "email" : that.state.email,
    "location" : that.state.location,
    "role" : "Inspector"
  })
  .then(function (response) {
    console.log(response);
    if(response.status == 200){
      alert("Inspector is added successfully");
    }
    else if(response.status == 204) {
      alert("Inspector is already present!");
    }
  })
  .catch(function (error) {
    console.log(error.response);

    alert(error.response.data.message);
  });
}

getPreviousInfo(event){

  var that = this;
  var apiUrl = baseUrl + getInfoUrl + that.state._id;

  axios.get(apiUrl)
  .then(function (response) {
    console.log(response);
    if(response.status == 200){
        that.setState({name : response.data.name , email : response.data.email, mobile : response.data.mobile, location : response.data.location, password : response.data.password, flag:2});
        console.log(that.state.name);
    }
    else if(response.status == 404) {
      alert("No DyCEE found with this id");
    }
  })
  .catch(function (error) {
      alert(error.response.data.message);
  })
}

updateInfo(event){

  var that = this;
  var apiUrl = baseUrl + updateInfoUrl;

  axios.post(apiUrl,{
    "_id" : that.state._id,
    "name" : that.state.name,
    "mobile" : that.state.mobile,
    "email" : that.state.email,
    "password" : that.state.password,
    "role" : "DyCEE",
    "location" : that.state.location
  })
  .then(function (response) {
    console.log(response);
    if(response.status == 200){
      alert("Information is updated successfully!");
    }
    else if(response.status == 204) {
      alert("Mobile number to be updated is already present!");
    }
  })
  .catch(function (error) {
    console.log(error.response);
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
    margin: 50,
    padding: 30,
    height : '500px',
    width : '500px'
  },
  innerContainerStyleUpdate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #00BCD4',
    borderRadius: 25,
    margin: 50,
    padding: 30,
    height : '600px',
    width : '500px'
  },
  buttonStyle: {
    margin: 30
  }
};
export default DyCeeHome ;
