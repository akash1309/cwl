import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      username:'',
      password:''
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>

            <AppBar
              title="Login"
            />

            <div style={styles.containerStyle}>
              <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange = {(event,newValue) => this.setState({username:newValue})}
                style={{ marginTop: 20, marginBottom: -20}}
              />
              <br/>
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
              />
              <br/>
              <RaisedButton label="Submit" primary={true} style={styles.buttonStyle} onClick={(event) => this.handleClick(event)}/>
            </div>

          </div>

        </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event){

    var apiBaseUrl = "http://localhost:8080/purchaseorder/add";
    var self = this;
    var payload={
"order_number": "1001",
"order_date": "12-08-2017",
"storeofficer_id": "ftgyhujk",
"itemdetails": {
	"specification": "fghjjk",
	"quantity_rate": "12",
	"duties_charges": "500",
	"delivery_date": "12-10-2017"
},
"vendor_info": {
	"code": "12",
	"email": "fghj@gmail.com",
	"address": "fghjk"

},
"tender_info": {
	"tender_no": "45",
	"tender_type": "fghj",
	"opened_on": "20-08-2017"
},
"offer_no": "12456",
"offer_date": "12-08-2018"
};

    axios.post(apiBaseUrl, payload)
    .then(function (response) {
      console.log(response);
      if(response.data.code == 200){
        console.log("Login successfull");

      }
      else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
      }
      else{
        console.log("Username does not exists");
        alert("Username does not exist");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }


}

const styles = {
  parentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 100

  },
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    margin: 15
  }
};

export default Dashboard;
