import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MaterialIcon from 'react-icons/lib/md';
import VendorPalette from './VendorPalette';
import axios from 'axios';
import {
  baseUrl,
  allPurchaseOrderUrl,
  getInfoUrl,
  updateInfoUrl ,
  addItemUrl ,
  allItemUrl ,
  allIcUrl
} from './../../config/url';

import {
  AppBar,
  RaisedButton,
  TextField,
} from 'material-ui';

export default class VendorHome extends Component {

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
    }
  }

  componentDidMount(){
     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
     this.setState({_id: userInfo.userId});
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Vendor Home" width="50%" />

          <div style={{ display: 'flex', flexDirection: 'row'}}>

            <VendorPalette
              onClickItems = {() => this.fetchAllEntities(this,"AllItems")}
              onClickPurchaseOrders = {() => this.fetchAllEntities(this,"Purchase_Order")}
              onClickInspectionCalls = {() => this.fetchAllEntities(this,"Purchase_Order")}
              onClickIC = {() => this.fetchAllEntities(this,"IC")}
              onClickAmendmentRequest = {() => this.fetchAllEntities(this,"Purchase_Order")}
              onClickProfile = {() => this.getProfileInfo(this)}
            />

            { this.showProfile() }
            { this.showIC() }
            { this.showItems() }
            { this.showPurchaseOrders() }

          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  showProfile = () => {

    if(this.state.flag == 1 )
    return (

      <div style={styles.outerContainerStyle}>
        <span style={styles.headingStyle}>My Profile</span>
        <div style={styles.innerContainerStyle}>
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

  showIC = () => {
    if(this.state.flag == 2)
      return (
        <div style={{ flex:1 }}>
          <div style = {styles.outerContainerStyle}>
            <span style={styles.headingStyle}>List of Inspection Certificate</span>
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
                      <span style={styles.purchaseCell}>Quantity Offered: {member.quantity_offered}</span>
                      <span style={styles.purchaseCell}>Quantity Approved: {member.quantity_approved}</span>
                      <span style={styles.purchaseCell}>Seal Location: {member.location_of_seal}</span>
                    </div>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>IC Details</span>
                      <span style={styles.purchaseCell}>Id: {member.ic_id}</span>
                      <span style={styles.purchaseCell}>Inspection Date: {member.inspection_date}</span>
                      <span style={styles.purchaseCell}>Signed On: {member.ic_signed_on}</span>
                    </div>

                    <div style={styles.boxStyle}>
                      <span style={styles.textStyle}>Inspector Details</span>
                      <span style={styles.purchaseCell}>Name: {member.inspector_name}</span>
                      <span style={styles.purchaseCell}>Mobile: {member.inspector_mobile}</span>
                    </div>

                  </div>
                </div>
              )
            })
          }
        </div>
      );
  }

  showItems = () => {

    if(this.state.flag == 3)
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
              flag: 1
            });
        }
        else if(response.status == 404) {
          alert("No Vendor found with this id");
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
      "role" : "Vendor",
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

  if(type == "Purchase_Order")
  {
    apiUrl += allPurchaseOrderUrl;
  }
  else if(type == "AllItems")
  {
    apiUrl += allItemUrl;
  }
  else if(type == "IC")
  {
    apiUrl += allIcUrl;
  }

  console.log(apiUrl);
  axios.get(apiUrl)
  .then( response => {
    console.log(response);

    if(response.status == 200 && type == "IC"){
      that.setState({ responseDataArray : response.data , flag :2});
    }
    else if(response.status == 200 && type == "AllItems"){
      that.setState({ responseDataArray : response.data , flag :3});
    }
    else if(response.status == 200 && type == "Purchase_Order"){
      that.setState({ responseDataArray : response.data , flag :4});
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
    flexDirection: 'row',
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
    marginTop : 20,
    fontWeight: 'Bold',
    color: '#006266'
  }
};
