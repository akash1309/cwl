import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import * as MaterialIcon from 'react-icons/lib/md';
import DyCeePalette from './DyCeePalette';

import {
  baseUrl ,
  allVendorUrl ,
  allInspectorUrl,
  storeOfficerUrl,
  inspectorUrl,
  addStoreOfficerUrl,
  dyceePOUrl,
  getInfoUrl,
  updateInfoUrl ,
  allItemUrl ,
  icGenerateUrl ,
  allIcUrl,
  POUrlByStoreOfficer,
  dyceeInspectorUrl,
  updatePOInfoUrl
} from './../../config/url';

import {
  AppBar,
  RaisedButton,
  TextField, IconButton, SvgIcon,
  Dialog,
  FlatButton
} from 'material-ui';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class DyCeeHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      responseDataArray : [],
      storeOfficerArray: [],
      selectedStoreOfficerPos: 0,
      selectedInspectorPos: 0,
      inspectorArray: [],
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : 4,
      order_number : '' ,
      quantity_offered:   '',
  	  quantity_approved:  '',
  	  location_of_seal :  '',
  	  ic_id:              '',
  	  inspection_date :   '',
  	  ic_signed_on :	    '',
  	  inspector_name :    '',
  	  inspector_mobile:	  '',
      type : '',
      open: false,
      updateflag : ''
    }
  };

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({id: userInfo.userId, role: userInfo.role});
    this.fetchStoreOfficers(userInfo.userId);
    this.fetchInspectors(userInfo.userId);
  }

  handleChange = (event, index, value) => {
   this.setState({selectedStoreOfficerPos : value});
   this.fetchAllEntities("Purchase_Order", this.state.storeOfficerArray[value]._id);
  };

  handleInspectorChange = (event, index, value) => {
   this.setState({selectedInspectorPos : value});
  };

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="DyCEE Home" width="50%"/>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <DyCeePalette
                onClickItems={() => this.fetchAllEntities("AllItems")}
                onClickVendors={() => this.fetchAllEntities("Vendor")}
                onClickInspectors={() => this.fetchAllEntities("Inspector")}
                onClickStoreOfficers = {() => this.fetchAllEntities("StoreOfficer")}
                onClickAddInspector={() => this.setState({flag : 3 , type : 'Inspector'})}
                onClickAddStoreOfficer = {() => this.setState({flag : 3, type : 'StoreOfficer'})}
                onClickPurchaseOrder={() => this.setState({flag: 4})}
                onClickCreateIC={() => this.setState({flag :5})}
                onClickIC ={() => this.fetchAllEntities("AllIC")}
                onClickCorrigendumApproval={() => this.fetchAllEntities("AllItems")}
                onClickApprovalLetter={() => this.fetchAllEntities("AllItems")}
                onClickProfile={() => this.getProfileInfo()}
              />

              { this.showPurchaseOrders() }
              { this.showItems() }
              { this.showPeople() }
              { this.addPeople() }
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

  handleOpen(orderNumber,updateflag){
    this.setState({
      open: true,
      order_number: orderNumber,
      updateflag : updateflag
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  showInspector = () => {

    let items = [];
    for (let i = 0; i < this.state.inspectorArray.length; i++ ) {
      items.push(<MenuItem value={i} key={i} primaryText={this.state.inspectorArray[i].name} />);
    }

    const actions = [
      <FlatButton
        label="Back"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Assign"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          let body = {};
          if(this.state.updateflag == "inspectionInspector")
          {
            body = {
            "order_number": this.state.order_number,
            "inspected_by": this.state.inspectorArray[this.state.selectedInspectorPos]._id,
            "status" : "Assigned"
            };
          }
          else if(this.state.updateflag == "amendmentInspector")
          {
            body = {
              "order_number" : this.state.order_number,
              "status" : "Amendment Inspector Nominated",
              "amendmentInspector" : this.state.inspectorArray[this.state.selectedInspectorPos]._id
            }
          }
          this.updatePoStatus(body)}}
      />,
    ];

    return(
      <div>
        <Dialog
          title="Assign Inspector"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <SelectField
            value={this.state.selectedInspectorPos}
            onChange={this.handleInspectorChange}
            maxHeight={200}
          >
            {items}
          </SelectField>
        </Dialog>
      </div>
    );
  }

  updatePoStatus(body){

    console.log(body);
    var that = this;
    var apiUrl = baseUrl + updatePOInfoUrl;
    console.log(that.state.inspectorArray[that.state.selectedInspectorPos]);
    axios.post(apiUrl,body)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        that.fetchAllEntities("Purchase_Order", that.state.storeOfficerArray[that.state.selectedStoreOfficerPos]._id);
      }
      else if(response.status == 204) {
        alert("Purchase Order to be updated is not present!");
      }
    })
    .catch(function (error) {
      console.log(error.response);
      alert(error.response.data.message);
    });
  }

/*
  SyncUpdatePoStatus(body){

    var that = this;
    var apiUrl = baseUrl + updatePOInfoUrl;

    console.log(body);
    axios.post(apiUrl,body)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        that.fetchAllEntities("Purchase_Order", that.state.storeOfficerArray[that.state.selectedStoreOfficerPos]._id);
      }
      else if(response.status == 204) {
        alert("Purchase Order to be updated is not present!");
      }
    })
    .catch(function (error) {
      console.log(error.response);
      alert(error.response.data.message);
    });
  }
*/
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

    let items = [];
    for (let i = 0; i < this.state.storeOfficerArray.length; i++ ) {
      items.push(<MenuItem value={i} key={i} primaryText={this.state.storeOfficerArray[i].name} />);
    }
    let statusArray = ["Approved","Items Dispatched","Items Accepted","Items Rejected","Amendment Requested","Amendment Inspector Nominated"];

    if(this.state.flag == 4)
      return(
        <div style={{ flex:1 }}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of Purchase Orders</span>
          </div>
          <div style={styles.comboStyle}>
            <span style={{...styles.textLabel, marginRight: 20}}>Select Store Officer:</span>
            <SelectField
              value={this.state.selectedStoreOfficerPos}
              onChange={this.handleChange}
              maxHeight={200}
            >
              {items}
            </SelectField>
          </div>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style = {styles.purchaseOrderContainer}>

                  <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-between'}}>
                    <span><span style={styles.textLabel}>Order Number:</span> {member.order_number}</span>
                    <span><span style={styles.textLabel}>Status:</span> <span style={this.getStatusStyle(member.status)}>{member.status}</span></span>
                  </div>
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
                      <span style={styles.purchaseCell}>Name: {member.vendor_info.name}</span>
                      <span style={styles.purchaseCell}>Email: {member.vendor_info.email}</span>
                      <span style={styles.purchaseCell}>Address: {member.vendor_info.address}</span>
                    </div>
                    {
                      (member.status == "Assigned" || member.status == "Passed" || member.status == "Rejected" || statusArray.some(x => x == member.status)) ?
                        <div style={styles.boxStyle}>
                          <span style={styles.textStyle}>Inspector Details</span>
                          <span style={styles.purchaseCell}>Name: {member.inspected_by.name}</span>
                          <span style={styles.purchaseCell}>Mobile: {member.inspected_by.mobile}</span>
                          <span style={styles.purchaseCell}>Email: {member.inspected_by.email}</span>
                        </div>
                      : null
                    }

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Tender Details</span>
                      <span style={styles.purchaseCell}>No: {member.tender_info.tender_no}</span>
                      <span style={styles.purchaseCell}>Type: {member.tender_info.tender_type}</span>
                      <span style={styles.purchaseCell}>Opened On: {member.tender_info.opened_on}</span>
                    </div>

                  </div>
                  {
                    member.status == "Forwarded" ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton
                        label="Assign Inspector"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={() => this.handleOpen(member.order_number,"inspectionInspector")}
                      />
                    </div>
                    : null
                  }
                  {
                    member.status == "Passed" ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton
                        label="Create I.C."
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={() => this.setState({
                          flag :5,
                          order_number:member.order_number,
                          inspector_name:member.inspected_by.name,
                          inspector_mobile : member.inspected_by.mobile
                        })}
                      />
                    </div>
                    : null
                  }
                  {
                    member.status == "Failed" ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton
                        label="Reject"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={() => this.rejectionPo("Rejected",member.order_number)}
                      />
                    </div>
                    : null
                  }
                  {
                    (statusArray.some(x => x == member.status)) ?
                      <div>
                        <div style={styles.dividerStyle}/>
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'center'}}>
                          <span style={styles.textLabel}>Inspection Certificate Details</span>
                        </div>
                        <div style={styles.dividerStyle}/>
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
                          <div style={styles.icBoxStyle}>
                            <span style={styles.purchaseCell}>Quantity Offered: {member.ic_id.quantity_offered}</span>
                            <span style={styles.purchaseCell}>Quantity Approved: {member.ic_id.quantity_approved}</span>
                          </div>
                          <div style={styles.icBoxStyle}>
                            <span style={styles.purchaseCell}>Inspection Date: {member.ic_id.inspection_date}</span>
                            <span style={styles.purchaseCell}>IC Signed On: {member.ic_id.ic_signed_on}</span>
                          </div>
                        </div>

                        <div style={styles.icBoxStyle}>
                          <span style={styles.purchaseCell}>Location of Seal: {member.ic_id.location_of_seal}</span>
                        </div>
                      </div>
                    : null
                  }
                  {
                    member.status == "Amendment Requested" ?
                    <div style={styles.buttonContainerStyle}>
                      <br/>
                      <RaisedButton
                        label="Nominate Inspector"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={() => this.handleOpen(member.order_number,"amendmentInspector")}
                      />
                    </div>
                    : null
                  }
                </div>
              )
            })
          }
          { this.showInspector() }
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
                value = {this.state.order_number}
                onChange = {(event,newValue) => this.setState({order_number:newValue})}
                style={styles.textFieldStyle}
              />
              <MaterialIcon.MdLocationOn size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Location_of_seal"
                floatingLabelText="Location_of_seal"
                onChange = {(event,newValue) => this.setState({location_of_seal:newValue})}
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
              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="IC Signed On"
                floatingLabelText="IC Signed On"
                onChange = {(event,newValue) => this.setState({ic_signed_on:newValue})}
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
              <MaterialIcon.MdPeopleOutline size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Inspector Name"
                floatingLabelText="Inspector Name"
                value = {this.state.inspector_name}
                onChange = {(event,newValue) => this.setState({inspector_name:newValue})}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Inspector Mobile"
                floatingLabelText="Inspector Mobile"
                value = {this.state.inspector_mobile}
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
      "dycee_id" : that.state.id,
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

  rejectionPo(status,orderNumber){

    var that = this;
    var apiUrl = baseUrl + updatePOInfoUrl;

    axios.post(apiUrl,{
      "order_number": orderNumber,
      "status" : status
    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
          that.fetchAllEntities("Purchase_Order", that.state.storeOfficerArray[that.state.selectedStoreOfficerPos]._id);
        }
      else if(response.status == 204) {
        alert("Purchase Order to be rejected is not present!");
      }
    })
    .catch(function (error) {
      console.log(error.response);
      alert(error.response.data.message);
    });
  }

  getProfileInfo(){

    var that = this;
    var apiUrl = baseUrl + getInfoUrl + that.state.id;

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
   	  "inspection_date" :   that.state.inspection_date,
   	  "ic_signed_on" :	   that.state.ic_signed_on,
   	  "inspector_name" :    that.state.inspector_name,
   	  "inspector_mobile" :	  that.state.inspector_mobile

    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        var body = {
          "order_number": that.state.order_number,
          "ic_id": response.data._id,
          "status" : "Approved"
        };
        that.updatePoStatus(body);
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
      "_id" : that.state.id,
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

  fetchStoreOfficers(dyceeId){

    var that = this;
    let apiUrl = baseUrl+storeOfficerUrl+dyceeId;
    console.log("fetchStoreOfficers");
    axios.get(apiUrl)
    .then( response => {
      console.log(response);
      //this.fetchAllEntities("Purchase_Order", this.state.response.data[0].id);
      that.setState({ storeOfficerArray: response.data });
    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  fetchInspectors(dyceeId){
    console.log("fetchInspectors");
    var that = this;
    let apiUrl = baseUrl+dyceeInspectorUrl+dyceeId;

    axios.get(apiUrl)
    .then( response => {
      console.log(response);
      that.setState({ inspectorArray: response.data });
    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  fetchAllEntities(type, userId){

    var that = this;
    let apiUrl = baseUrl;

    if(type == "Vendor"){
      apiUrl += allVendorUrl;
      that.setState({type : type});
    }
    else if(type == "Purchase_Order"){
      apiUrl += POUrlByStoreOfficer + userId;
    }
    else if(type == "AllItems"){
      apiUrl += allItemUrl;
    }
    else if(type == "Inspector"){
      apiUrl += allInspectorUrl;
      that.setState({type : type});
    }
    else if(type == "StoreOfficer"){
      apiUrl += allStoreOfficerUrl;
      that.setState({type : type});
    }
    else if(type == "AllIC"){
      apiUrl += allIcUrl;
    }

    const headers = {
      SECURITY_TOKEN: userId
    };

    axios.get(apiUrl,{headers})
    .then( response => {

      console.log(response);

      if(response.status == 200 && type == "AllItems"){
        that.setState({ responseDataArray : response.data,  flag :1});
      }
      else if(response.status == 200 && ( type == "Vendor" || type == "Inspector" || type == "StoreOfficer")){
        that.setState({ responseDataArray : response.data, flag :2});
      }
      else if(response.status == 200 && type == "AllIC"){
        that.setState({ responseDataArray : response.data, flag :6});
      }
      else if(response.status == 200 && type == "Purchase_Order"){
        that.setState({
          responseDataArray : response.data,
          flag:4,
          open: false
        });
      }

    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  getStatusStyle(status){
    if(status == 'InProgress'){
      return styles.inProgressStyle;
    }
    if(status == 'Initiated'){
      return styles.initiatedStyle;
    }
    if(status == 'Processed'){
      return styles.processedStyle;
    }
    if(status == 'Forwarded'){
      return styles.forwardedStyle;
    }
    if(status == 'Assigned'){
      return styles.assignedStyle;
    }
    if(status == 'Intimated'){
      return styles.intimatedStyle;
    }
    if(status == 'Visited'){
      return styles.visitedStyle;
    }
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
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems : 'center'
  },
  comboStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center'
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
    margin: '4px',
    marginTop: 10
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
  },
  initiatedStyle: {
    backgroundColor : 'rgb(255,153,0)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  inProgressStyle: {
    backgroundColor : 'rgb(50,70,195)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  processedStyle: {
    backgroundColor : 'rgb(50,220,50)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  forwardedStyle: {
    backgroundColor : 'rgb(255, 75, 100)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  assignedStyle: {
    backgroundColor : 'rgb(180, 75, 12)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  intimatedStyle: {
    backgroundColor : 'rgb(193, 181, 12)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  visitedStyle: {
    backgroundColor : 'rgb(94, 13, 193)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  buttonContainerStyle: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    margin: 12
  }
};
