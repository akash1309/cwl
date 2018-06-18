import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {Glyphicon} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import { baseUrl ,  allVendorUrl ,addPurchaseOrderUrl ,addVendorUrl, allPurchaseOrderUrl, getInfoUrl, updateInfoUrl ,addItemUrl , allItemUrl , allInspectorUrl } from './../../config/url';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

import * as FaIcon from 'react-icons/lib/fa';
import * as MaterialIcon from 'react-icons/lib/md';
import DyCeePalette from './DyCeePalette';

import {
  AppBar,
  RaisedButton,
  TextField, IconButton, SvgIcon,
} from 'material-ui';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '0 32px 16px 0',
    position : 'absolute',
    zIndex: '1'
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  tablediv : {
    margin: '5px 5px 5px 5px'
  },
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize : 14
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


class DyCeeHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      getall : [],
      length : 0,
      _id : '',
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : -1,
      open : false ,
      order_number : '' ,
      order_date : '' ,
      itemdetails : {} ,
      specification:  '',
      quantity_rate:  '',
      duties_charges: '',
      delivery_date:  '',
      vendor_info : {} ,
      code:     '',
      email :   '',
      address : '',
      tender_info : {} ,
      tender_no:     '',
      tender_type:   '',
      opened_on :    '',
      offer_no : '' ,
      offer_date : '',
      flag : 0,
      location : '',
      role : "DyCEE",
      model_number : '',
      name  :       '',
      quantity:      ''

    }
    this._toggle = this._toggle.bind(this);
  };

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({_id: userInfo.userId});
  }

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
            <AppBar title="DyCEE Home"/>
             
              <DyCeePalette
                onClickItems={(event) => this.getall(event,"AllItems")}
                onClickVendors={(event) => this.getall(event,"Vendor")}
                onClickInspectors={(event) => this.getall(event,"Inspector")}
                onClickAddInspector={(event) => this.setState({flag : 1})}
                onClickPurchaseOrder={(event) => this.getall(event,"Purchase_Order")}
                onClickIC={(event) => this.getall(event,"AllItems")}
                onClickCorrigendum={(event) => this.getall(event,"AllItems")}
                onClickApprovalLetter={(event) => this.getall(event,"AllItems")}
                onClickProfile={(event) => this.getPreviousInfo(event)}
              />


            { this.state.flag == 6 ?

             <div>
             <Table style={style.tablediv}>
               <TableHead>
                  <TableRow>
                    <CustomTableCell width="25%">Model_number</CustomTableCell>
                    <CustomTableCell width="15%">Item Name</CustomTableCell>
                    <CustomTableCell width="25%">Quantity</CustomTableCell>
                  </TableRow>
                </TableHead>

                {this.rowsHandler("AllItems")}


             </Table>
             </div>
            : null }

            { this.state.flag == 7 ?

             <div>
             <Table style={style.tablediv}>
               <TableHead>
                  <TableRow>
                    <CustomTableCell width="25%">Id</CustomTableCell>
                    <CustomTableCell width="15%">Name</CustomTableCell>
                    <CustomTableCell width="25%">Email</CustomTableCell>
                    <CustomTableCell width="15%">Mobile</CustomTableCell>
                    <CustomTableCell width="15%">Location</CustomTableCell>
                  </TableRow>
                </TableHead>

                {this.rowsHandler("Vendor")}


             </Table>
             </div>
            : null }

            { this.state.flag == 8 ?

             <div>
             <Table style={style.tablediv}>
               <TableHead>
                  <TableRow>
                    <CustomTableCell width="25%">Id</CustomTableCell>
                    <CustomTableCell width="15%">Name</CustomTableCell>
                    <CustomTableCell width="25%">Email</CustomTableCell>
                    <CustomTableCell width="15%">Mobile</CustomTableCell>
                    <CustomTableCell width="15%">Location</CustomTableCell>
                  </TableRow>
                </TableHead>

                {this.rowsHandler("Inspector")}


             </Table>
             </div>
            : null }

            { this.state.flag == 1 ?
            <div style={styles.outerContainerStyle}>
              <div style={styles.innerContainerStyle}>

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

        { this.state.flag == 5 ?

         <div>
         <Table style={style.tablediv}>
           <TableHead>
              <TableRow>
                <CustomTableCell width="15%">Order_Number</CustomTableCell>
                <CustomTableCell width="15%">Order_Date</CustomTableCell>
                <CustomTableCell width="25%">Item_Details</CustomTableCell>
                <CustomTableCell width="25%">Tender_Info</CustomTableCell>
                <CustomTableCell width="25%">Vendor_Info</CustomTableCell>
                <CustomTableCell width="15%">Offer_No</CustomTableCell>
                <CustomTableCell width="15%">Offer_Date</CustomTableCell>
              </TableRow>
            </TableHead>

            {this.rowsHandler("Purchase_Order")}


         </Table>
         </div>
        : null }

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

getall(event,type){

var that = this;
that.setState({ open : !that.state.open });
let apiUrl = baseUrl;
if(type == "Vendor")
{
  apiUrl += allVendorUrl;
}
else if(type == "Purchase_Order")
{
  apiUrl += allPurchaseOrderUrl;
}
else if(type == "AllItems")
{
  apiUrl += allItemUrl;
}
else if(type == "Inspector")
{
  apiUrl += allInspectorUrl;
}

console.log(apiUrl);
axios.get(apiUrl)
.then( response => {
  console.log(response);
  if(response.status == 200 && type == "Vendor"){
    that.setState({ getall : response.data , length : response.data.length  , flag :7});
  }
  else if(response.status == 200 && type == "Purchase_Order"){
    that.setState({ getall : response.data , length : response.data.length  , flag :5});
  }
  else if(response.status == 200 && type == "AllItems"){
    that.setState({ getall : response.data , length : response.data.length  , flag :6});
  }
  else if(response.status == 200 && type == "Inspector"){
    that.setState({ getall : response.data , length : response.data.length  , flag :8});

}
})
.catch(error => {
  console.log(error.response);
  alert(error.response.data.message);
});

}

singlerowHandler(i,type) {
  var cells = [];
  if(type == "Vendor")
  {
    cells.push(<CustomTableCell width="25%">{this.state.getall[i]._id}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].name}</CustomTableCell>)
    cells.push(<CustomTableCell width="25%">{this.state.getall[i].email}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].mobile}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].location}</CustomTableCell>)
  }
  else if(type == "Purchase_Order")
  {
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].order_number}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].order_date}</CustomTableCell>)
    cells.push(<CustomTableCell width="25%">{"Specification : "+this.state.getall[i].itemdetails["specification"]} <br/> {"Quantity_rate : "+this.state.getall[i].itemdetails["quantity_rate"]} <br/> {"Duties_charges : "+this.state.getall[i].itemdetails["duties_charges"]} <br/> {"Delivery_date : "+this.state.getall[i].itemdetails["delivery_date"]}</CustomTableCell>)
    cells.push(<CustomTableCell width="25%">{"Tender_number : "+this.state.getall[i].tender_info["tender_no"]} <br/> {"Tender_type : "+ this.state.getall[i].tender_info["tender_type"]} <br/> {"Opened_on : "+this.state.getall[i].tender_info["opened_on"]}</CustomTableCell>)
    cells.push(<CustomTableCell width="25%">{"Code : "+this.state.getall[i].vendor_info["code"]} <br/> {"Email : "+this.state.getall[i].vendor_info["email"]} <br/> {"Address : "+this.state.getall[i].vendor_info["address"]}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].offer_no}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].offer_date}</CustomTableCell>)

  }
  else if(type == "AllItems")
  {
    cells.push(<CustomTableCell width="25%">{this.state.getall[i].model_number}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].name}</CustomTableCell>)
    cells.push(<CustomTableCell width="25%">{this.state.getall[i].quantity}</CustomTableCell>)
  }
  else if(type == "Inspector")
  {
    cells.push(<CustomTableCell width="25%">{this.state.getall[i]._id}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].name}</CustomTableCell>)
    cells.push(<CustomTableCell width="25%">{this.state.getall[i].email}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].mobile}</CustomTableCell>)
    cells.push(<CustomTableCell width="15%">{this.state.getall[i].location}</CustomTableCell>)
  }

  return <TableRow>{cells}</TableRow>
}

rowsHandler(type)
{
  var cells = [];
  var i;
  for(i=0; i<this.state.getall.length ;i++)
  {
    cells.push(this.singlerowHandler(i,type))
  }
  return <TableBody>{cells}</TableBody>;
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
