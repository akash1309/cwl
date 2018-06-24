import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import * as MaterialIcon from 'react-icons/lib/md';
import StoreOfficerPalette from './StoreOfficerPalette';
import {
  AppBar,
  RaisedButton,
  TextField,
  Dialog,
  FlatButton
} from 'material-ui';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
  baseUrl ,
  allVendorUrl ,
  addPurchaseOrderUrl ,
  addVendorUrl,
  allPurchaseOrderUrl,
  getInfoUrl,
  updateInfoUrl ,
  addItemUrl ,
  allItemUrl,
  deletePOUrl,
  deleteItemUrl,
  updatePOInfoUrl,
  onePurchaseOrderUrl,
  VendorByStoreOfficerUrl,
  POUrlByStoreOfficer,
} from './../../config/url';

export default class StoreOfficerHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    responseDataArray : [],
    vendor_code : '',
    name : '',
    email : '',
    mobile : '',
    location : '',
    address: '',
    password : '',
    flag : -1,
    order_number : '' ,
    order_date : '' ,
    specification:  '',
    quantity_rate:  '',
    duties_charges: '',
    delivery_date:  '',
    tender_no:     '',
    tender_type:   '',
    opened_on :    '',
    offer_no : '' ,
    offer_date : '',
    model_number : '',
    quantity:      '',
    selectedVendorPos: 0,
    vendors_info : [],
    update : -1,
    open: false
   }


 };

  handleOpen(orderNumber){
    this.setState({
      open: true,
      order_number: orderNumber
    });
  };

  deletePurchaseOrder = () => {
    this.cancelPOFunc();
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, value) => {
   this.setState({selectedVendorPos : value});
  };

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({_id: userInfo.userId});
    this.fetchAllEntities("Purchase_Order",userInfo.userId);
    this.vendorByStoreOfficer(userInfo.userId);
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="StoreOfficer Home" width="50%" />

            <div style={{ display: 'flex', flexDirection: 'row'}}>

              <StoreOfficerPalette
                onClickPlacePurchaseOrder = {() => this.setState({flag:1, update: 1})}
                onClickIntimateDycee = {() => this.fetchAllEntities("Purchase_Order",this.state._id)}
                onClickVendors = {() => this.fetchAllEntities("Vendor",this.state._id)}
                onClickItems = {() => this.fetchAllEntities("AllItems")}
                onClickPurchaseOrders = {() => this.fetchAllEntities("Purchase_Order",this.state._id)}
                onClickAddVendor = {() => this.setState({flag:6})}
                onClickAddItem = {() => this.setState({flag:7})}
                onClickDeleteItem = {() => this.setState({flag:8})}
                onClickProfile = {() => this.getProfileInfo(this)}
              />

              { this.placePurchaseOrder() }
              { this.intimateDycee() }
              { this.showVendors() }
              { this.showItems() }
              { this.showPurchaseOrders() }
              { this.addVendor() }
              { this.addItem() }
              { this.deleteItem() }
              { this.showProfile() }
              { this.cancelPOconfirmation() }

            </div>
          </div>
        </MuiThemeProvider>
      </div>

    );
  }

  cancelPOconfirmation = () => {

    const actions = [
      <FlatButton
        label="Back"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onClick={this.deletePurchaseOrder}
      />,
    ];

    return(
      <div>
        <Dialog
          title="Delete Purchase Order"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete the purchase order ?
        </Dialog>
      </div>
    );
  }



  placePurchaseOrder = () => {

    if(this.state.flag == 1)
    {
      let items = [];
      for (let i = 0; i < this.state.vendors_info.length; i++ ) {
        items.push(<MenuItem value={i} key={i} primaryText={this.state.vendors_info[i].vendor_code + " " + this.state.vendors_info[i].name} />);
      }
      return (

        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>Place Purchase Order</span>
          <div style={styles.innerContainerStyle}>
            <span style={styles.textLabel}>Order Details:</span>
            <div style={{display : 'flex', flexDirection:'row'}}>
              <div style={styles.boxStyle}>
                <TextField
                  hintText="Order_Number"
                  floatingLabelText="Order_Number"
                  value = {this.state.order_number}
                  onChange = {(event,newValue) => this.setState({order_number:newValue })}
                  style={styles.textFieldStyle}
                />
              </div>
              <div style={styles.boxStyle}>
                <TextField
                  hintText="Order_Date"
                  floatingLabelText="Order_Date"
                  value= {this.state.order_date}
                  onChange = {(event,newValue) => this.setState({order_date:newValue})}
                  style={styles.textFieldStyle}
                />
              </div>
            </div>
            <br/>
            <div style={styles.dividerStyle}/>
            <br/>
            <span style={styles.textLabel}>Item Details:</span>
            <div style={{display : 'flex' , flexDirection:'row'}}>
              <div style={styles.boxStyle}>
                <TextField
                  hintText="Item Specification"
                  floatingLabelText="Specification"
                  name="specification"
                  multiLine={true}
                  rows={6}
                  rowsMax={6}
                  value= {this.state.specification}
                  onChange = {(event,newValue) => this.setState({specification:newValue })}
                  style={styles.textFieldStyle}
                />
              </div>
              <div style={styles.boxStyle}>
                <TextField
                  hintText="Quantity/Rate"
                  floatingLabelText="Quantity/Rate"
                  value= {this.state.quantity_rate}
                  onChange = {(event,newValue) => this.setState({quantity_rate:newValue })}
                  style={styles.textFieldStyle}
                />
                <TextField
                  hintText="Duties/Charges"
                  floatingLabelText="Duties/Charges"
                  value= {this.state.duties_charges}
                  onChange = {(event,newValue) => this.setState({duties_charges:newValue })}
                  style={styles.textFieldStyle}
                />
                <TextField
                  hintText="Delivery Date"
                  floatingLabelText="Delivery Date"
                  value= {this.state.delivery_date}
                  onChange = {(event,newValue) => this.setState({delivery_date:newValue })}
                  style={styles.textFieldStyle}
                />
              </div>
            </div>
            <br/>
            <div style={styles.dividerStyle}/>
            <br/>
            <div style={{display : 'flex' , flexDirection:'row'}}>
              <div style={styles.boxStyle}>
                  <span style={styles.textLabel}>Vendor Details:</span>
                  <SelectField
                    value={this.state.selectedVendorPos}
                    onChange={this.handleChange}
                    maxHeight={200}
                  >
                    {items}
                  </SelectField>
              </div>
              <div style={styles.boxStyle}>
                  <span style={styles.textLabel}>Tender Details:</span>
                  <TextField
                    hintText="Tender number"
                    floatingLabelText="Tender number"
                    value= {this.state.tender_no}
                    onChange = {(event,newValue) => this.setState({tender_no:newValue })}
                    style={styles.textFieldStyle}
                  />
                  <TextField
                    hintText="Tender type"
                    floatingLabelText="Tender type"
                    value= {this.state.tender_type}
                    onChange = {(event,newValue) => this.setState({tender_type:newValue })}
                    style={styles.textFieldStyle}
                  />
                  <TextField
                    hintText="Opened on"
                    floatingLabelText="Opened on"
                    value= {this.state.opened_on}
                    onChange = {(event,newValue) => this.setState({opened_on:newValue })}
                    style={styles.textFieldStyle}
                  />
              </div>
            </div>
            <br/>
            <div style={styles.dividerStyle}/>
            <br/>

            <span style={styles.textLabel}>Offer Details:</span>
            <div style={{display : 'flex' , flexDirection:'row'}}>
              <div style={styles.boxStyle}>
                <TextField
                  hintText="Offer_No"
                  floatingLabelText="Offer_No"
                  value= {this.state.offer_no}
                  onChange = {(event,newValue) => this.setState({offer_no:newValue })}
                  style={styles.textFieldStyle}
                />
              </div>
              <div style={styles.boxStyle}>
                <TextField
                  hintText="Offer_Date"
                  floatingLabelText="Offer_Date"
                  value= {this.state.offer_date}
                  onChange = {(event,newValue) => this.setState({offer_date:newValue })}
                  style={styles.textFieldStyle}
                />
              </div>
            </div>
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'center', marginTop:30}}>
            { this.state.update == 1 ?
            <RaisedButton label="Place Order" primary={true} style={styles.buttonStyle} onClick={(event) => {this.place_order(event)}} />
            : null
            }
            { this.state.update == 2 ?
            <RaisedButton label="Update Order" primary={true} style={styles.buttonStyle} onClick={(event) => {this.updatePO(event)}} />
            : null
            }

            </div>
          </div>
        </div>

      );
    }
  }

  intimateDycee = () => {

  }

  showVendors = () => {

    if(this.state.flag == 3)
    return(
      <div style={{flex : 1}}>
        <div style = {styles.outerContainerStyle}>
          <span style={styles.headingStyle}>List of Vendors</span>
        </div>
        <div style={styles.itemHeaderContainer}>
          <span style={styles.textCellContainer}>Code</span>
          <span style={styles.textCellContainer}>Name</span>
          <span style={styles.textCellContainer}>Email</span>
          <span style={styles.textCellContainer}>Mobile</span>
          <span style={styles.textCellContainer}>Address</span>
        </div>
        {
          this.state.responseDataArray.map((member,key) => {
            return (
              <div style={styles.itemContainer}>
                <span style={styles.textCellContainer}>{member.vendor_code}</span>
                <span style={styles.textCellContainer}>{member.name}</span>
                <span style={styles.textCellContainer}>{member.email}</span>
                <span style={styles.textCellContainer}>{member.mobile}</span>
                <span style={styles.textCellContainer}>{member.address}</span>
              </div>
            )
          })
        }
      </div>
    );

  }

  showItems = () => {

    if(this.state.flag == 4)
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

  showPurchaseOrders = () => {

    if(this.state.flag == 5)
      return(
        <div style={{ flex:1 }}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of Purchase Orders</span>
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

                  { member.status == 'Initiated' ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton label="Cancel Order" primary={true} style={styles.buttonStyle} onClick={() => {this.handleOpen(member.order_number)}}/>
                      <RaisedButton label="Update Order" primary={true} style={styles.buttonStyle} onClick={(event) => {this.getOrderInfo(event,member.order_number)}}/>
                    </div>
                  : null }

                </div>
              )
            })
          }
        </div>
      );
  }


  addVendor = () => {
    if(this.state.flag == 6)
      return (
        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>Vendor Panel</span>
          <div style={styles.innerContainerStyle}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPerson size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Vendor Code"
                floatingLabelText="Code"
                onChange = {(event,newValue) => this.setState({vendor_code:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
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
                hintText="Address"
                floatingLabelText="Address"
                onChange = {(event,newValue) => this.setState({address:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <br/>
            <div style={styles.textCellStyle}>
              <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.addVendorFunc(event)}} />
            </div>
          </div>
        </div>
      );
  }

  addItem = () => {

    if(this.state.flag == 7)
      return (
        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>Item Addition</span>
          <div style={styles.innerContainerStyle}>
          <div style={styles.textCellStyle}>
            <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Model_number"
                floatingLabelText="Model_number"
                onChange = {(event,newValue) => this.setState({model_number:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Name"
                floatingLabelText="Name"
                onChange = {(event,newValue) => this.setState({name:newValue })}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity"
                floatingLabelText="Quantity"
                onChange = {(event,newValue) => this.setState({quantity:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <br/>
            <div style={styles.textCellStyle}>
              <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.addItemFunc(event)}} />
            </div>
          </div>
        </div>
      );
  }

  deleteItem = () => {
    if(this.state.flag == 8)
    return (
      <div style={styles.outerContainerStyle}>
        <div style={styles.innerContainerStyle}>
        <span style={styles.headingStyle}>Item Deletion</span>

        <div style={styles.textCellStyle}>
          <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
            <TextField
              hintText="model_number"
              floatingLabelText="model_number"
              onChange = {(event,newValue) => this.setState({model_number:newValue})}
              style={styles.textFieldStyle}
            />
          </div>
          <br/>
          <div style={styles.textCellStyle}>
            <RaisedButton label="DELETE" primary={true} style={styles.buttonStyle} onClick={(event) => {this.deleteItemFunc(event)}} />
          </div>
        </div>
      </div>

    );
  }

  showProfile = () => {

    if(this.state.flag == 10 )
    return (

      <div style={styles.outerContainerStyle}>
        <span style={styles.headingStyle}>My Profile</span>
        <div style={styles.innerContainerStyleUpdate}>
          <div style={styles.childContainer}>
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
          </div>
          <div style={styles.childContainer}>
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
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdLocationOn size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Enter location"
                floatingLabelText="Location"
                value = {this.state.location}
                onChange = {(event,newValue) => this.setState({location:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
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

vendorByStoreOfficer(userId) {
  var that = this;
  var apiUrl = baseUrl + VendorByStoreOfficerUrl + userId;

  axios.get(apiUrl)
  .then(function (response) {
    console.log(response);
    if(response.status == 200){
      that.setState({vendors_info : response.data});
    }
    else if(response.status == 404) {
      alert("No Vendors found with this id");
    }
  })
  .catch(function (error) {
      alert(error.response.data.message);
  })

}
  addVendorFunc(event){
    var that=this;
    var apiUrl=baseUrl + addVendorUrl;
    var body = {
      "vendor_code" : that.state.vendor_code,
      "name" : that.state.name ,
      "mobile" : that.state.mobile,
      "email" : that.state.email,
      "role" : "Vendor",
      "storeofficer_id" : that.state._id,
      "address" : that.state.address
    };
    axios.post(apiUrl, body)
   .then(response => {
       if(response.status == 200){
          that.fetchAllEntities("Vendor",that.state._id);
         }
         else if(response.status == 204) {
           alert("Vendor is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

 cancelPOFunc(event){
   var that=this;
   var apiUrl=baseUrl + deletePOUrl;
   axios.post(apiUrl,{
      "order_number" : that.state.order_number
    })
    .then(response => {
      if(response.status == 200){
         that.fetchAllEntities("Purchase_Order", that.state._id);
        }
        else if(response.status == 404) {
          alert("Purchase Order is not present!");
        }
    })
    .catch(error => {
      alert(error.response.data.message);
    })
 }

 deleteItemFunc(event){
   var that=this;
   var apiUrl=baseUrl + deleteItemUrl;
   axios.post(apiUrl,{
      "model_number" : that.state.model_number
    })
    .then(response => {
      if(response.status == 200){
         alert("Item deleted successfully!");
        }
        else if(response.status == 404) {
          alert("Item is not present!");
        }
    })
    .catch(error => {
      alert(error.response.data.message);
    })
 }


  addItemFunc(event){
    var that=this;
    var apiUrl=baseUrl + addItemUrl;
    axios.post(apiUrl,{
        "model_number" : that.state.model_number ,
        "name" : that.state.name,
        "quantity" : that.state.quantity
    })
   .then(response => {
       if(response.status == 200){
          alert("Item added successfully!");
         }
         else if(response.status == 204) {
           alert("Item is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }


  place_order(event){
    var that=this;
    var apiUrl=baseUrl + addPurchaseOrderUrl;
    var itemdetails = {
      specification: that.state.specification,
      quantity_rate: that.state.quantity_rate,
      duties_charges: that.state.duties_charges,
      delivery_date: that.state.delivery_date
    };

    var vendor_info = {
      code : that.state.vendors_info[that.state.selectedVendorPos].vendor_code,
      email : that.state.vendors_info[that.state.selectedVendorPos].email,
      address: that.state.vendors_info[that.state.selectedVendorPos].address
    };

    var tender_info = {
      tender_no: that.state.tender_no,
      tender_type: that.state.tender_type,
      opened_on: that.state.opened_on
    };

    var body = {
      "order_number" :    that.state.order_number ,
      "order_date" :      that.state.order_date,
      "itemdetails" :     itemdetails,
      "vendor_info" :     vendor_info,
      "tender_info" :     tender_info,
      "offer_no" :        that.state.offer_no,
      "offer_date" :      that.state.offer_date,
      "storeofficer_id" : that.state._id,
      "status":           "Initiated",
    };

    console.log(body);

    axios.post(apiUrl,body)
   .then(response => {
       if(response.status == 200){
          //alert("Order placed successfully!");
          that.fetchAllEntities("Purchase_Order", that.state._id);
         }
         else if(response.status == 204) {
           alert("Order is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

  getOrderInfo(event,order_number){

    var that = this;
    var apiUrl = baseUrl + onePurchaseOrderUrl + order_number;

    axios.get(apiUrl)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
          that.setState({
            order_number :  response.data.order_number ,
            order_date :    response.data.order_date,
            specification : response.data.itemdetails.specification,
            quantity_rate:  response.data.itemdetails.quantity_rate,
            duties_charges: response.data.itemdetails.duties_charges,
            delivery_date:  response.data.itemdetails.delivery_date,
            tender_no:      response.data.tender_info.tender_no,
            tender_type:    response.data.tender_info.tender_type,
            opened_on:      response.data.tender_info.opened_on,
            offer_no:       response.data.offer_no,
            offer_date:     response.data.offer_date,
            storeofficer_id:response.data.storeofficer_id,
            selectedVendorPos : that.state.vendors_info.findIndex(x => x.vendor_code == response.data.vendor_info.code),
            flag:1,
            update :2
          });

      }
      else if(response.status == 404) {
        alert("No Purchase Order found with this order number");
      }
    })
    .catch(function (error) {
        alert(error.response.data.message);
    })
  }

  updatePO(event){

    var that = this;
    var apiUrl = baseUrl + updatePOInfoUrl;

    var itemdetails = {
      specification: that.state.specification,
      quantity_rate: that.state.quantity_rate,
      duties_charges: that.state.duties_charges,
      delivery_date: that.state.delivery_date
    };

    var vendor_info = {
      code : that.state.vendors_info[that.state.selectedVendorPos].vendor_code,
      email : that.state.vendors_info[that.state.selectedVendorPos].email,
      address: that.state.vendors_info[that.state.selectedVendorPos].address
    };

    var tender_info = {
      tender_no: that.state.tender_no,
      tender_type: that.state.tender_type,
      opened_on: that.state.opened_on
    };

    axios.post(apiUrl,{
      "order_number" : that.state.order_number ,
      "order_date" :  that.state.order_date,
      "itemdetails" : itemdetails,
      "vendor_info" : vendor_info,
      "tender_info" : tender_info,
      "offer_no" :    that.state.offer_no,
      "offer_date" : that.state.offer_date,
      "storeofficer_id" : that.state.storeofficer_id
    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        that.fetchAllEntities("Purchase_Order", that.state._id);
      //  alert("Information is updated successfully!");
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

  getProfileInfo(event){

    var that = this;
    var apiUrl = baseUrl + getInfoUrl + that.state._id;

    axios.get(apiUrl)
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
          that.setState({name : response.data.name , email : response.data.email, mobile : response.data.mobile, location : response.data.location, password : response.data.password, flag:10});

      }
      else if(response.status == 404) {
        alert("No StoreOfficer found with this id");
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
      "role" : "StoreOfficer",
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



  fetchAllEntities(type,userId){

    var that = this;
    let apiUrl = baseUrl;
    if(type == "Vendor"){
      apiUrl += VendorByStoreOfficerUrl + userId;
    }
    else if(type == "Purchase_Order"){
      apiUrl += POUrlByStoreOfficer + userId;
    }
    else if(type == "AllItems"){
      apiUrl += allItemUrl;
    }

    const headers = {
      SECURITY_TOKEN: userId
    };

    axios.get(apiUrl, { headers })
    .then( response => {
      console.log(response);
      if(response.status == 200 && type == "Vendor"){
        that.setState({ responseDataArray : response.data , flag :3});
      }
      else if(response.status == 200 && type == "AllItems"){
        that.setState({ responseDataArray : response.data , flag :4});
      }
      else if(response.status == 200 && type == "Purchase_Order"){
        that.setState({
          responseDataArray : response.data,
          flag:5,
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
  innerContainerStyleUpdate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    width : '80%',
  },
  childContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    padding: 20
  },
  buttonStyle: {
    width : '18%',
    borderRadius : 5,
    textAlign : 'center'
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
    color: '#006266',
    textAlign : 'center'
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
    flexWrap: 'wrap',
    marginRight:'10px'
  },
  purchaseOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #aaa69d',
    borderRadius: 4,
    margin: 12,
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
    marginLeft: 15,
    marginRight: 15,
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
  buttonContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'space-around',
    marginTop: 25
  }
};
