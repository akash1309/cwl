import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import * as MaterialIcon from 'react-icons/lib/md';
import DyCeePalette from './DyCeePalette';

import {
  baseUrl ,
  VendorByStoreOfficerUrl ,
  allInspectorUrl,
  storeOfficerUrl,
  inspectorUrl,
  addStoreOfficerUrl,
  dyceePOUrl,
  getInfoUrl,
  updateInfoUrl ,
  allItemUrl ,
  allIcUrl,
  POUrlByStoreOfficer,
  dyceeInspectorUrl,
  updatePOInfoUrl,
  oneCorrigendumUrl,
  getPOCountUrl,
  removeVisitUrl
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
      corrigendum_array : [],
      selectedStoreOfficerPos: 0,
      selectedInspectorPos: 0,
      inspectorArray: [],
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : 4,
      type : '',
      open: false,
      updateflag : '',
      rejection_reason : '',
      update_values: ''
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

  handleVendorListChange = (event , index, value) => {
    this.setState({selectedStoreOfficerPos : value});
    this.fetchAllEntities("Vendor", this.state.storeOfficerArray[value]._id);
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
                onClickVendors={() => this.setState({flag : 2, responseDataArray : []})}
                onClickInspectors={() => this.fetchAllEntities("Inspector",this.state.id)}
                onClickStoreOfficers = {() => this.fetchAllEntities("StoreOfficer",this.state.id)}
                onClickAddInspector={() => this.setState({flag : 3 , type : 'Inspector'})}
                onClickAddStoreOfficer = {() => this.setState({flag : 3, type : 'StoreOfficer'})}
                onClickPurchaseOrder={() => this.setState({flag : 4, responseDataArray : []})}
                onClickIC ={() => this.fetchAllEntities("AllIC")}
                onClickProfile={() => this.getProfileInfo()}
              />

              { this.showPurchaseOrders() }
              { this.showItems() }
              { this.showVendorList() }
              { this.showInspectorList() }
              { this.showStoreOfficerList() }
              { this.addPeople() }
              { this.showIC() }
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

  showVendorList = () => {

    let items = [];
    for (let i = 0; i < this.state.storeOfficerArray.length; i++ ) {
      items.push(<MenuItem value={i} key={i} primaryText={this.state.storeOfficerArray[i].name} />);
    }

    if(this.state.flag == 2)
      return(
        <div style={{flex : 1}}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of {this.state.type + 's'}</span>
          </div>

          <div style={styles.comboStyle}>
            <span style={{...styles.textLabel, marginRight: 20}}>Select Store Officer:</span>
            <SelectField
              value={this.state.selectedStoreOfficerPos}
              onChange={this.handleVendorListChange}
              maxHeight={200}
            >
              {items}
            </SelectField>
          </div>


          <div style={styles.itemHeaderContainer}>
            <span style={styles.textCellContainer}>Code</span>
            <span style={styles.textCellContainer}>Name</span>
            <span style={styles.textCellContainer}>Email</span>
            <span style={styles.textCellContainer}>Mobile</span>
            <span style={styles.textCellContainer}>Location</span>
            <span style={styles.textCellContainer}>PO Remaining</span>
          </div>

          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style={styles.itemContainer}>
                  <span style={styles.textCellContainer}>{member.vendor_code}</span>
                  <span style={styles.textCellContainer}>{member.name}</span>
                  <span style={styles.textCellContainer}>{member.email}</span>
                  <span style={styles.textCellContainer}>{member.mobile}</span>
                  <span style={styles.textCellContainer}>{member.location}</span>
                  <span style={styles.textCellContainer}>{this.POCount(member.vendor_code)}</span>
                </div>
              )
            })
          }
        </div>
      );
  }

  showInspectorList = () => {

    if(this.state.flag == 10)
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
            this.state.inspectorArray.map((member,key) => {
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

  showStoreOfficerList = () => {

    if(this.state.flag == 11)
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
            this.state.storeOfficerArray.map((member,key) => {
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
    console.log("Hi",this.state.responseDataArray);
    let statusArray = ["IC Generated","Approved","Items Dispatched","Items Accepted","Items Rejected","Amendment Requested","Amendment Inspector Nominated","Corrigendum Generated","Finished"];

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
                      <span>Order Date: {member.order_date}</span>
                      <span>Offer No: {member.offer_no}</span>
                      <span>Offer Date: {member.offer_date}</span>
                    </div>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Item Details</span>
                      <span>Specification: {member.itemdetails.specification}</span>
                      <span>Quantity Rate: {member.itemdetails.quantity_rate}</span>
                      <span>Duties Charges: {member.itemdetails.duties_charges}</span>
                      <span>Delivery Date: {member.itemdetails.delivery_date}</span>
                    </div>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Vendor Details</span>
                      <span>Code: {member.vendor_info.code}</span>
                      <span>Name: {member.vendor_info.name}</span>
                      <span>Email: {member.vendor_info.email}</span>
                      <span>Address: {member.vendor_info.address}</span>
                    </div>
                    {
                      ( member.inspected_by != undefined || member.inspected_by != null ) ?
                        <div style={styles.boxStyle}>
                          <span style={styles.textStyle}>Inspector Details</span>
                          <span>Name: {member.inspected_by.name}</span>
                          <span>Mobile: {member.inspected_by.mobile}</span>
                          <span>Email: {member.inspected_by.email}</span>
                        </div>
                      : null
                    }

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Tender Details</span>
                      <span>No: {member.tender_info.tender_no}</span>
                      <span>Type: {member.tender_info.tender_type}</span>
                      <span>Opened On: {member.tender_info.opened_on}</span>
                    </div>

                  </div>
                  {
                    member.status == "Processed" ?
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
                    member.ic_id != undefined ?
                      <div>
                        <div style={styles.dividerStyle}/>
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'center'}}>
                          <span style={styles.textLabel}>Latest Inspection Certificate Details</span>
                        </div>
                        <div style={styles.dividerStyle}/>
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
                          <div style={styles.icBoxStyle}>
                            <span>Quantity Offered: {member.ic_id.quantity_offered}</span>
                            <span>Quantity Accepted: {member.ic_id.quantity_approved}</span>
                            <span>Quantity On Order: {member.ic_id.quantity_on_order}</span>
                            <span>Quantity Supplied/Inspected So Far: {member.ic_id.quantity_supplied_so_far}</span>
                            <span>Balance Quantity: {member.ic_id.balance_quantity}</span>
                            <span>Date when materials were offered for inspection: {member.ic_id.materials_offered_date}</span>

                          </div>
                          <div style={styles.icBoxStyle}>
                            <span>Unit Price: {member.ic_id.unit_price}</span>
                            <span>Inspection Date: {member.ic_id.inspection_date}</span>
                            <span>IC Signed On: {member.ic_id.ic_signed_on}</span>
                            <span>Inspecting Officer Name: {member.ic_id.inspector_name}</span>
                            <span>Inspecting Officer Mobile: {member.ic_id.inspector_mobile}</span>
                            <span>Remarks: {member.ic_id.remarks}</span>

                          </div>
                        </div>

                        <div style={{marginTop : 10, marginLeft:60}}>
                          <span>Location of Seal: {member.ic_id.location_of_seal}</span>
                        </div>
                        { member.ic_id.rejection_reason != undefined ?
                        <div style={{marginTop : 10, marginLeft:60}}>
                          <span>Rejection Reason: {member.ic_id.rejection_reason}</span>
                        </div>
                        :null
                        }
                        <div style={styles.buttonContainerStyle}>
                          <RaisedButton
                            label="SEE ALL ICs"
                            primary={true}
                            style={styles.buttonStyle}
                            onClick={() => this.fetchAllEntities("AllIC",member.order_number,member.vendor_info.code, member.status)}
                          />
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

  showCorrigendumTable = () => {
    if(this.state.corrigendum_flag == 1)
      return (
        <div style={{border : '2px solid #989898' , borderRadius : 4 , boxShadow : '1px 3px 5px', padding : '20px', margin:'10px'}}>
          <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-end'}}>
            <span style={styles.corrigendumLabel}>Corrigendum Details</span>
            <span style={{flex : 1}}><span style={{fontWeight : 'bold' , color : '#000099'}}>Corrigendum No.: </span>{this.state.corrigendum_array.corrigendum_number}</span>
          </div>
          <div style={styles.dividerStyle}/>
          <div style={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
            <div style={{display : 'flex' , flexDirection : 'column' , justifyContent : 'space-around'}}>
              <span><span style={styles.BoldText}>Inspector Name: </span>{this.state.corrigendum_array.generated_by.name}</span>
              <span><span style={styles.BoldText}>Inspector Mobile: </span>{this.state.corrigendum_array.generated_by.mobile}</span>
            </div>
            <div style={{display : 'flex' , flexDirection : 'column' }}>
              <span><span style={styles.BoldText}>Updates: </span>{this.state.corrigendum_array.update_values}</span>
              <span><span style={styles.BoldText}>Remarks: </span>{this.state.corrigendum_array.remarks}</span>
            </div>
          </div>
          {
            this.state.status == "Corrigendum Generated" && this.state.key == "0"?
            <div style={styles.buttonContainerStyle}>
              <RaisedButton
                label="Approve"
                primary={true}
                style={styles.buttonStyle}
                onClick = {() => this.checkBalanceQty(this.state.corrigendum_array.ic_id.balance_quantity,this.state.corrigendum_array.order_number,this.state.vendor_code)}
              />
            </div>
            : null
          }
        </div>
      );
  }

  showIC = () => {

    if(this.state.flag == 6)
      return (
        <div style={{flex : 1}}>
          <div style={styles.dividerStyle}/>
          <div style={{display:'flex', flexDirection:'row',justifyContent:'center',marginTop:20}}>
            <span style={styles.ICLabel}>Inspection Certificate Details</span>
          </div>
          <div style={styles.dividerStyle}/>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style={{border : '2px solid #989898' , borderRadius : 4 , boxShadow : '1px 3px 5px', padding : '20px', margin:'10px'}}>
                  <div style={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
                    <div style={styles.icBoxStyle}>
                      <span><span style={styles.BoldText}>Quantity Offered: </span>{member.quantity_offered}</span>
                      <span><span style={styles.BoldText}>Quantity Accepted: </span>{member.quantity_approved}</span>
                      <span><span style={styles.BoldText}>Quantity On Order: </span>{member.quantity_on_order}</span>
                      <span><span style={styles.BoldText}>Quantity Supplied/Inspected So Far: </span>{member.quantity_supplied_so_far}</span>
                      <span><span style={styles.BoldText}>Balance Quantity: </span>{member.balance_quantity}</span>
                      <span><span style={styles.BoldText}>Date when materials were offered for inspection: </span>{member.materials_offered_date}</span>

                    </div>
                    <div style={styles.icBoxStyle}>
                      <span><span style={styles.BoldText}>Unit Price: </span>{member.unit_price}</span>
                      <span><span style={styles.BoldText}>Inspection Date: </span>{member.inspection_date}</span>
                      <span><span style={styles.BoldText}>IC Signed On: </span>{member.ic_signed_on}</span>
                      <span><span style={styles.BoldText}>Inspecting Officer Name: </span>{member.inspector_name}</span>
                      <span><span style={styles.BoldText}>Inspecting Officer Mobile: </span>{member.inspector_mobile}</span>
                      <span><span style={styles.BoldText}>Remarks: </span>{member.remarks}</span>

                    </div>
                  </div>
                  <div style={{marginTop : 10, marginLeft:60}}>
                    <span><span style={styles.BoldText}>Location of Seal: </span>{member.location_of_seal}</span>
                  </div>
                  {
                    member.rejection_reason != undefined ?
                      <div style={{marginTop : 10, marginLeft:60}}>
                        <span><span style={styles.BoldText}>Rejection Reason: </span>{member.rejection_reason}</span>
                      </div>
                    :null
                  }
                  <div style={styles.dividerStyle}/>
                  {
                    member.corrigendum_id != undefined ?
                      <div style={styles.buttonContainerStyle}>
                        <br/>
                        <RaisedButton
                          label="See Corrigendum"
                          primary={true}
                          style={styles.buttonStyle}
                          onClick={() => this.getCorrigendum(member.corrigendum_id , key)}
                        />
                      </div>
                    : null
                  }
                  {
                    member.corrigendum_id != undefined && member.corrigendum_id == this.state.corrigendum_array._id ?
                      this.showCorrigendumTable()
                    : null
                  }
                </div>
              );
            })
          }
        </div>
      );
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

  getCorrigendum(corrigendum_id,key){

    var that = this;
    var apiUrl = baseUrl + oneCorrigendumUrl + corrigendum_id;

    console.log(apiUrl , ' ',key);
    axios.get(apiUrl)
    .then( response => {
      console.log(response);
      that.setState({ corrigendum_array : response.data , key : key, corrigendum_flag : 1});
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
    else if(status == 'Initiated'){
      return styles.initiatedStyle;
    }
    else if(status == 'Processed'){
      return styles.processedStyle;
    }
    else if(status == 'Forwarded'){
      return styles.forwardedStyle;
    }
    else if(status == 'Assigned'){
      return styles.assignedStyle;
    }
    else if(status == 'Intimated'){
      return styles.intimatedStyle;
    }
    else if(status == 'Visited'){
      return styles.visitedStyle;
    }
    else if(status == 'Passed'){
      return styles.passedStyle;
    }
    else if(status == 'Rejected'){
      return styles.rejectedStyle;
    }
    else if(status == 'Approved'){
      return styles.approvedStyle;
    }
    else if(status == 'Items Dispatched'){
      return styles.dispatchedStyle;
    }
    else if(status == 'Items Accepted'){
      return styles.itemAcceptedStyle;
    }
    else if(status == 'Items Rejected'){
      return styles.itemRejectedStyle;
    }
    else if(status == 'Amendment Requested'){
      return styles.amendmentRequestedStyle;
    }
    else if(status == 'Amendment Inspector Nominated'){
      return styles.nominatedStyle;
    }
    else if(status == 'Corrigendum Generated'){
      return styles.generatedStyle;
    }
    else if(status == 'Finished'){
      return styles.finishedStyle;
    }
  }

  POCount(vendor_code){

    var that = this;
    var apiUrl = baseUrl + getPOCountUrl + vendor_code;

    axios.get(apiUrl)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
          return response.data.count;
      }
    })
    .catch(function (error) {
        alert(error.response.data.message);
    })
  }

  checkBalanceQty(balance_quantity,orderNumber,vendor_code){
    if(balance_quantity == 0)
    {
      var body = {
        "status" : "Finished",
        "order_number" : orderNumber
      };
      this.updatePoStatus(body);
    }
    else {
      this.removeVisit(orderNumber,vendor_code);
    }
  }

  removeVisit(orderNumber,vendor_code)
  {
    var that = this;
    let apiUrl = baseUrl + removeVisitUrl;

    axios.post(apiUrl,{
      "order_number": orderNumber,
      "vendor_code" : vendor_code
    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
            var body = {
              "order_number": orderNumber,
              "status" : "Approved"
            };
            that.updatePoStatus(body);
      }
      else if(response.status == 204) {
        alert("Visit to be removed is not present!");
      }
    })
    .catch(function (error) {
      console.log(error.response);
      alert(error.response.data.message);
    });
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
        that.fetchAllEntities(that.state.type,that.state.id);
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

  fetchAllEntities(type, userId , vendor_code , status){

    var that = this;
    let apiUrl = baseUrl;

    if(type == "Vendor"){
      apiUrl += VendorByStoreOfficerUrl + userId;
      that.setState({type : type});
    }
    else if(type == "Purchase_Order"){
      apiUrl += POUrlByStoreOfficer + userId;
    }
    else if(type == "AllItems"){
      apiUrl += allItemUrl;
    }
    else if(type == "Inspector"){
      apiUrl += dyceeInspectorUrl + userId;
      that.setState({type : type});
    }
    else if(type == "StoreOfficer"){
      apiUrl += storeOfficerUrl + userId;
      that.setState({type : type});
    }
    else if(type == "AllIC"){
      apiUrl += allIcUrl + userId;
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
      else if(response.status == 200 &&  type == "Vendor"){
        that.setState({ responseDataArray : response.data, flag :2});
      }
      else if(response.status == 200 &&  type == "Inspector"){
        that.setState({ inspectorArray : response.data, flag :10});
      }
      else if(response.status == 200 &&  type == "StoreOfficer"){
        that.setState({ storeOfficerArray : response.data, flag :11});
      }
      else if(response.status == 200 && type == "AllIC"){
        that.setState({ responseDataArray : response.data, status : status , vendor_code : vendor_code , flag :6});
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
  BoldText:{
    fontWeight : 'Bold'
  },
  corrigendumLabel: {
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#ff5719',
    fontSize : '18px',
    flex : 2
  },
  textLabel:{
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#006266'
  },
  ICLabel:{
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#FF1493',
    fontSize : '20px'
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
    alignItems : 'left',
    marginLeft : '60px'
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
  buttonContainerStyle: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    margin: 12
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
  passedStyle: {
    backgroundColor : '#13B47E',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  rejectedStyle: {
    backgroundColor : '#FF0000',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  approvedStyle: {
    backgroundColor : '#33FF00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  dispatchedStyle: {
    backgroundColor : '#663399',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  itemAcceptedStyle: {
    backgroundColor : '#FFCC00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  itemRejectedStyle: {
    backgroundColor : '#CC0000',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  amendmentRequestedStyle: {
    backgroundColor : '#809BBD',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  nominatedStyle: {
    backgroundColor : '#D683B2',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  generatedStyle: {
    backgroundColor : '#00CCFF',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  },
  finishedStyle: {
    backgroundColor : '#99FF00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight : 'bold',
    color : 'white'
  }
};
