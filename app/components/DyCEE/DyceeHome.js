import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import * as MaterialIcon from 'react-icons/lib/md';
import DyCeePalette from './DyCeePalette';

import {
  baseUrl ,
  allVendorUrl ,
  allInspectorUrl,
  allStoreOfficerUrl,
  inspectorUrl,
  addStoreOfficerUrl,
  allPurchaseOrderUrl,
  getInfoUrl,
  updateInfoUrl ,
  allItemUrl ,
  icGenerateUrl ,
  allIcUrl
} from './../../config/url';

import {
  AppBar,
  RaisedButton,
  TextField, IconButton, SvgIcon,
} from 'material-ui';


export default class DyCeeHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      responseDataArray : [],
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : -1,
      order_number : '' ,
      role : "DyCEE",
      quantity_offered:   '',
  	  quantity_approved:  '',
  	  location_of_seal :  '',
  	  ic_id:              '',
  	  inspection_date :   '',
  	  ic_signed_on :	    '',
  	  inspector_name :    '',
  	  inspector_mobile:	  '',
      type : ''

    }
  };

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({_id: userInfo.userId});
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="DyCEE Home" width="50%"/>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <DyCeePalette
                onClickItems={() => this.fetchAllEntities(this,"AllItems")}
                onClickVendors={() => this.fetchAllEntities(this,"Vendor")}
                onClickInspectors={() => this.fetchAllEntities(this,"Inspector")}
                onClickStoreOfficers = {() => this.fetchAllEntities(this,"StoreOfficer")}
                onClickAddInspector={() => this.setState({flag : 3 , type : 'Inspector'})}
                onClickAddStoreOfficer = {() => this.setState({flag : 3, type : 'StoreOfficer'})}
                onClickPurchaseOrder={() => this.fetchAllEntities(this,"Purchase_Order")}
                onClickCreateIC={() => this.setState({flag :5})}
                onClickIC ={() => this.fetchAllEntities(this,"AllIC")}
                onClickCorrigendumApproval={() => this.fetchAllEntities(this,"AllItems")}
                onClickApprovalLetter={() => this.fetchAllEntities(this,"AllItems")}
                onClickProfile={() => this.getProfileInfo(this)}
              />

              { this.showItems() }
              { this.showPeople() }
              { this.addPeople() }
              { this.showPurchaseOrders() }
              { this.createIC() }
              { this.showIC() }
              { this.corrigendumApproval() }
              { this.approvalLetter() }
              { this.showProfile() }
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  showItems = () => {

    if(this.state.flag == 1)
      return (
        <div style={{flex : 1}}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of Items</span>
          </div>
          <div style={styles.itemHeaderContainer}>
            <span style={styles.textCellContainer}>Model_number</span>
            <span style={styles.textCellContainer}>Item_Name</span>
            <span style={styles.textCellContainer}>Quantity</span>
          </div>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style={styles.itemContainer}>
                  <span style={styles.textCellContainer}>{member.model_number}</span>
                  <span style={styles.textCellContainer}>{member.name}</span>
                  <span style={styles.textCellContainer}>{member.quantity}</span>
                </div>
              )
            })
          }
        </div>
      );
  }

  showPeople = () => {

    if(this.state.flag == 2)
      return(
        <div style={{flex : 1}}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of {this.state.type + 's'}</span>
          </div>
          <div style={styles.itemHeaderContainer}>
            <span style={styles.textCellContainer}>Name</span>
            <span style={styles.textCellContainer}>Email</span>
            <span style={styles.textCellContainer}>Mobile</span>
            <span style={styles.textCellContainer}>Location</span>
          </div>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style={styles.itemContainer}>
                  <span style={styles.textCellContainer}>{member.name}</span>
                  <span style={styles.textCellContainer}>{member.email}</span>
                  <span style={styles.textCellContainer}>{member.mobile}</span>
                  <span style={styles.textCellContainer}>{member.location}</span>
                </div>
              )
            })
          }
        </div>
      );
  }

  addPeople = () => {

    if(this.state.flag == 3)
      return (
        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>{this.state.type} Panel</span>
          <div style={styles.innerContainerStyle}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPerson size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Name"
                floatingLabelText="Name"
                onChange = {(event,newValue) => this.setState({name:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMail size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue })}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Mobile"
                floatingLabelText="Mobile"
                onChange = {(event,newValue) => this.setState({mobile:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdLocationOn size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Location"
                floatingLabelText="Location"
                onChange = {(event,newValue) => this.setState({location:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <br/>
            <div style={styles.textCellStyle}>
              <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.addPeopleFunc(event)}} />
            </div>
          </div>
        </div>
      );
  }

  showPurchaseOrders = () => {

    if(this.state.flag == 4)
      return(
        <div style={{ flex:1 }}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of Purchase Orders</span>
          </div>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style = {styles.purchaseOrderContainer}>

                  <span style={styles.purchaseCell}><span style={styles.textLabel}>Order Number:</span> {member.order_number}</span>
                  <div style={styles.dividerStyle}/>

                  <div style={{display:'flex', flexDirection:'row'}}>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Order Details</span>
                      <span style={styles.purchaseCell}>Order Date: {member.order_date}</span>
                      <span style={styles.purchaseCell}>Offer No: {member.offer_no}</span>
                      <span style={styles.purchaseCell}>Offer Date: {member.offer_date}</span>
                    </div>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Item Details</span>
                      <span style={styles.purchaseCell}>Specification: {member.itemdetails.specification}</span>
                      <span style={styles.purchaseCell}>Quantity Rate: {member.itemdetails.quantity_rate}</span>
                      <span style={styles.purchaseCell}>Duties Charges: {member.itemdetails.duties_charges}</span>
                      <span style={styles.purchaseCell}>Delivery Date: {member.itemdetails.delivery_date}</span>
                    </div>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Vendor Details</span>
                      <span style={styles.purchaseCell}>Code: {member.vendor_info.code}</span>
                      <span style={styles.purchaseCell}>Email: {member.vendor_info.email}</span>
                      <span style={styles.purchaseCell}>Address: {member.vendor_info.address}</span>
                    </div>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Tender Details</span>
                      <span style={styles.purchaseCell}>No: {member.tender_info.tender_no}</span>
                      <span style={styles.purchaseCell}>Type: {member.tender_info.tender_type}</span>
                      <span style={styles.purchaseCell}>Opened On: {member.tender_info.opened_on}</span>
                    </div>

                  </div>
                </div>
              )
            })
          }
        </div>
      );
  }

  createIC = () => {

    if(this.state.flag == 5)
      return (
        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>IC Generation</span>
          <div style={styles.innerContainerStyle}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Order_Number"
                floatingLabelText="Order_Number"
                onChange = {(event,newValue) => this.setState({order_number:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity_offered"
                floatingLabelText="Quantity_offered"
                onChange = {(event,newValue) => this.setState({quantity_offered:newValue})}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity_approved"
                floatingLabelText="Quantity_approved"
                onChange = {(event,newValue) => this.setState({quantity_approved:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdLocationOn size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Location_of_seal"
                floatingLabelText="Location_of_seal"
                onChange = {(event,newValue) => this.setState({location_of_seal:newValue})}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Inspection Date"
                floatingLabelText="Inspection Date"
                onChange = {(event,newValue) => this.setState({inspection_date:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdReceipt size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="IC id"
                floatingLabelText="IC id"
                onChange = {(event,newValue) => this.setState({ic_id:newValue})}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="IC Signed On"
                floatingLabelText="IC Signed On"
                onChange = {(event,newValue) => this.setState({ic_signed_on:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPeopleOutline size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Inspector Name"
                floatingLabelText="Inspector Name"
                onChange = {(event,newValue) => this.setState({inspector_name:newValue})}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Inspector Mobile"
                floatingLabelText="Inspector Mobile"
                onChange = {(event,newValue) => this.setState({inspector_mobile:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <br/>
            <div style={styles.textCellStyle}>
              <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.createICFunc(event)}} />
            </div>
          </div>
        </div>
      );
  }

  showIC = () => {

    if(this.state.flag == 6)
      return (
        <div style={{flex : 1}}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of Inspection Certificates</span>
          </div>
          <div style={styles.itemHeaderContainer}>
            <span style={styles.textCellContainer}>Order No.</span>
            <span style={styles.textCellContainer}>Quantity Offered</span>
            <span style={styles.textCellContainer}>Quantity Approved</span>
            <span style={styles.textCellContainer}>Location of Seal</span>
            <span style={styles.textCellContainer}>IC id</span>
            <span style={styles.textCellContainer}>Inspection Date</span>
            <span style={styles.textCellContainer}>IC Signed On</span>
            <span style={styles.textCellContainer}>Inspector Name</span>
            <span style={styles.textCellContainer}>Inspector Mobile</span>
          </div>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style={styles.itemContainer}>
                  <span style={styles.textCellContainer}>{member.order_number}</span>
                  <span style={styles.textCellContainer}>{member.quantity_offered}</span>
                  <span style={styles.textCellContainer}>{member.quantity_approved}</span>
                  <span style={styles.textCellContainer}>{member.location_of_seal}</span>
                  <span style={styles.textCellContainer}>{member.ic_id}</span>
                  <span style={styles.textCellContainer}>{member.inspection_date}</span>
                  <span style={styles.textCellContainer}>{member.ic_signed_on}</span>
                  <span style={styles.textCellContainer}>{member.inspector_name}</span>
                  <span style={styles.textCellContainer}>{member.inspector_mobile}</span>
                </div>
              )
            })
          }
        </div>
      );
  }

  corrigendumApproval = () => {

  }

  approvalLetter = () => {

  }

  showProfile = () => {

    if(this.state.flag == 9 )
      return (

        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>My Profile</span>
          <div style={styles.innerContainerStyle}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPerson size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Enter name"
                floatingLabelText="Name"
                value = {this.state.name}
                onChange = {(event,newValue) => this.setState({name:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdLockOpen size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Enter password"
                floatingLabelText="Password"
                value = {this.state.password}
                onChange = {(event,newValue) => this.setState({password:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Enter mobile number"
                floatingLabelText="Mobile Number"
                value = {this.state.mobile}
                onChange = {(event,newValue) => this.setState({mobile:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMail size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Enter email"
                floatingLabelText="Email"
                value = {this.state.email}
                onChange = {(event,newValue) => this.setState({email:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
          </div>

          <RaisedButton
            label="UPDATE"
            primary={true}
            style={styles.buttonStyle}
            onClick={(event) => this.updateInfo(event)}
          />

        </div>
      );
  }

addPeopleFunc(event){
  var that = this;
  var apiUrl = baseUrl;

  if(that.state.type == "Inspector")
    apiUrl += inspectorUrl;
  else if(that.state.type == "StoreOfficer")
    apiUrl += addStoreOfficerUrl;

  axios.post(apiUrl, {
    "dycee_id" : that.state._id,
    "name" : that.state.name,
    "mobile" : that.state.mobile,
    "email" : that.state.email,
    "location" : that.state.location,
    "role" : that.state.type
  })
  .then(function (response) {
    console.log(response);
    if(response.status == 200){
      alert("User is added successfully");
    }
    else if(response.status == 204) {
      alert("User is already present!");
    }
  })
  .catch(function (error) {
    console.log(error.response);

    alert(error.response.data.message);
  });
}

getProfileInfo(event){

  var that = this;
  var apiUrl = baseUrl + getInfoUrl + that.state._id;

  axios.get(apiUrl)
  .then(function (response) {
    console.log(response);
    if(response.status == 200){
        that.setState({
          name : response.data.name ,
          email : response.data.email,
          mobile : response.data.mobile,
          location : response.data.location,
          password : response.data.password,
          flag:9
        });
    }
    else if(response.status == 404) {
      alert("No DyCEE found with this id");
    }
  })
  .catch(function (error) {
      alert(error.response.data.message);
  })
}

createICFunc(event){
  var that = this;
  var apiUrl = baseUrl + icGenerateUrl;

  axios.post(apiUrl, {
     "order_number" :      that.state.order_number,
 	  "quantity_offered":   that.state.quantity_offered,
 	  "quantity_approved":  that.state.quantity_approved,
 	  "location_of_seal" :  that.state.location_of_seal,
 	  "ic_id" :              that.state.ic_id,
 	  "inspection_date" :   that.state.inspection_date,
 	  "ic_signed_on" :	   that.state.ic_signed_on,
 	  "inspector_name" :    that.state.inspector_name,
 	  "inspector_mobile" :	  that.state.inspector_mobile

  })
  .then(function (response) {
    console.log(response);
    if(response.status == 200){
      alert("IC generated successfully");
    }
    else if(response.status == 204) {
      alert("IC already present!");
    }
  })
  .catch(function (error) {
    console.log(error.response);

    alert(error.response.data.message);
  });
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

fetchAllEntities(event,type){

var that = this;
let apiUrl = baseUrl;
if(type == "Vendor")
{
  apiUrl += allVendorUrl;
  that.setState({type : type});
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
  that.setState({type : type});
}
else if(type == "StoreOfficer")
{
  apiUrl += allStoreOfficerUrl;
  that.setState({type : type});
}
else if(type == "AllIC")
{
  apiUrl += allIcUrl;
}

axios.get(apiUrl)
.then( response => {

  console.log(response);

  if(response.status == 200 && type == "AllItems"){
    that.setState({ responseDataArray : response.data , length : response.data.length  , flag :1});
  }
  else if(response.status == 200 && ( type == "Vendor" || type == "Inspector" || type == "StoreOfficer")){
    that.setState({ responseDataArray : response.data , length : response.data.length  , flag :2});
  }
  else if(response.status == 200 && type == "Purchase_Order"){
    that.setState({ responseDataArray : response.data , length : response.data.length  , flag :4});
  }
  else if(response.status == 200 && type == "AllIC"){
    that.setState({ responseDataArray : response.data , length : response.data.length  , flag :6});
  }

})
.catch(error => {
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
    alignItems: 'center',
    flex : 1
  },
  innerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20,
    width : '80%'
  },
  childContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    padding: 20
  },
  buttonStyle: {
    margin: 0
  },
  itemHeaderContainer: {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f5cd79',
    borderRadius: 2,
    margin: 5,
    padding: 5
  },
  itemContainer: {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #aaa69d',
    margin: 5,
    padding: 5
  },
  textCellContainer: {
    flex : 1,
    textAlign : 'center'
  },
  purchaseCell:{

  },
  textLabel:{
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#006266'
  },
  textStyle:{
    fontFamily: 'Montserrat',
    fontSize: '14px',
    color: '#009432',
    margin: '2px'
  },
  boxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  purchaseOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #aaa69d',
    borderRadius: 4,
    margin: 8,
    padding: 8
  },
  dividerStyle: {
    height: '1px',
    backgroundColor: '#d1ccc0',
    margin: '4px'
  },
  iconSize: 18,
  textFieldStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: -10
  },
  textCellStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  iconStyle: {
    marginTop: 18
  },
  headingStyle: {
    textAlign : 'center',
    width : '100%',
    fontFamily: 'Montserrat',
    fontSize: '22px',
    marginTop : 10,
    fontWeight: 'Bold',
    color: '#006266'
  }
};
