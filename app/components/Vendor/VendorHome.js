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
  allIcUrl,
  vendorPOUrl,
  updatePOInfoUrl,
  getVisitUrl
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
      flag : 4,
      code : '',
    }
  }

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({_id: userInfo.userId , code : userInfo.code});
    this.fetchAllEntities("Purchase_Order", userInfo.code);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Vendor Home" width="50%" />

            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh'}}>

              <VendorPalette
                onClickItems = {() => this.fetchAllEntities("AllItems")}
                onClickVisits = {() => this.getVisits()}
                onClickPurchaseOrders = {() => this.fetchAllEntities("Purchase_Order", this.state.code)}
                onClickInspectionCalls = {() => this.fetchAllEntities("Purchase_Order")}
                onClickIC = {() => this.fetchAllEntities("IC")}
                onClickAmendmentRequest = {() => this.fetchAllEntities("Purchase_Order")}
                onClickProfile = {() => this.getProfileInfo()}
              />

              { this.showProfile() }
              { this.showIC() }
              { this.showItems() }
              { this.showPurchaseOrders() }
              { this.showVisits() }

            </div>
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
    {
      let statusArray = ["Approved","Items Dispatched","Items Accepted","Items Rejected","Amendment Requested","Amendment Inspector Nominated"];

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
                    <span>
                      <span style={styles.textLabel}>Status:</span>
                      <span style={this.getStatusStyle(member.status)}>{member.status}</span>
                    </span>
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
                      ( member.status == "Assigned" || member.status == "Passed" || member.status == "Rejected" || statusArray.some(x => x == member.status) ) ?
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

                  <div style={styles.buttonContainerStyle}>

                    {
                      member.status == "Initiated" ?
                        <RaisedButton
                          label="Start"
                          primary={true}
                          style={styles.buttonStyle}
                          onClick={() => this.updatePoStatus("InProgress",member.order_number)}
                        />
                      : null
                    }
                    {
                      member.status == "InProgress" ?
                        <RaisedButton
                          label="Process"
                          primary={true}
                          style={styles.buttonStyle}
                          onClick={() => this.updatePoStatus("Processed",member.order_number)}
                        />
                      : null
                    }

                  </div>
                  {
                    ( statusArray.some(x => x == member.status)) ?
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
                        {
                          member.status == "Approved" ?
                          <div style={styles.icBoxStyle}>
                            <br/>
                            <RaisedButton
                              label="Items Dispatched"
                              primary={true}
                              style={styles.buttonStyle}
                              onClick={() => this.updatePoStatus("Items Dispatched",member.order_number)}
                            />
                          </div>
                          : null
                        }
                      </div>
                    : null
                  }
                </div>
              )
            })
          }
        </div>
      );
    }
  }

  showVisits = () => {
    if(this.state.flag == 5)
        return (
              <div style = {styles.visitOuterContainer}>
              {
                this.state.responseDataArray.map((member,key) => {
                  return (
                    <div style = {styles.visitInnerContainer}>
                      <div style = {styles.visitLeftBoxStyle}>
                      </div>
                      <div style = {styles.visitRightBoxStyle}>
                        <span style = {styles.visitHeadingStyle}>
                          {member.inspector_id.name}
                        </span>
                        <span style = {styles.visitLowerHeadingStyle}>
                          {'( Inspector, ' + member.inspector_id.location+' )'}
                        </span>
                        <div style={styles.visitdividerStyle}/>
                        <div style = {{display:'flex',flexDirection:'row'}}>
                          <div style = {{display:'flex',flexDirection:'column',alignItems:'flex-start',marginLeft:10,marginRight:10}}>
                            <MaterialIcon.MdShoppingBasket size={styles.iconSize} style={styles.visiticonStyle} />
                            <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.visiticonStyle} />
                            <MaterialIcon.MdAccessTime size={styles.iconSize} style={styles.visiticonStyle} />
                            <MaterialIcon.MdMail size={styles.iconSize} style={styles.visiticonStyle} />
                            <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.visiticonStyle} />
                          </div>
                          <div style = {{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                            <span style={styles.visitTextKeyStyle}>Order Number:</span>
                            <span style={styles.visitTextKeyStyle}>Visiting Date: </span>
                            <span style={styles.visitTextKeyStyle}>Visiting Time: </span>
                            <span style={styles.visitTextKeyStyle}>Email: </span>
                            <span style={styles.visitTextKeyStyle}>Mobile:</span>
                          </div>
                          <div style = {{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                            <span style={styles.visitTextStyle}>{member.order_number}</span>
                            <span style={styles.visitTextStyle}>{member.date}</span>
                            <span style={styles.visitTextStyle}>{member.time}</span>
                            <span style={styles.visitTextStyle}>{member.inspector_id.email}</span>
                            <span style={styles.visitTextStyle}>{member.inspector_id.mobile}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            );

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


  fetchAllEntities(type, vendorCode){

    var that = this;
    let apiUrl = baseUrl;

    if(type == "Purchase_Order"){
      apiUrl =apiUrl+vendorPOUrl+vendorCode;
    }
    else if(type == "AllItems"){
      apiUrl += allItemUrl;
    }
    else if(type == "IC"){
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

  getVisits(){
    var that = this;
    let apiUrl = baseUrl + getVisitUrl + that.state.code;

    axios.get(apiUrl)
    .then( response => {
      console.log(response);

      if(response.status == 200){
        that.setState({ responseDataArray : response.data , flag :5});
      }
    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });
  }


  updatePoStatus(status,orderNumber){

    var that = this;
    var apiUrl = baseUrl + updatePOInfoUrl;

    axios.post(apiUrl,{
      "order_number": orderNumber,
      "status" : status
    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        that.fetchAllEntities("Purchase_Order", that.state.code);
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
    marginTop : 20,
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
  },
  visitOuterContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex : 1
  },
  visitInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    width : '48%',
    height : '30%',
    borderRadius: 25,
    border : '0.5px solid rgb(220,220,220)',
    boxShadow: '1px 6px 6px rgb(169,169,169)',
  },
  visitLeftBoxStyle: {
    flex : 2,
    backgroundColor : 'black',
    borderRadius : 5
  },
  visitRightBoxStyle: {
    flex: 3,
    display : 'flex',
    flexDirection : 'column',
  },
  visitHeadingStyle: {
    textAlign : 'right',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    margin : 10,
    fontWeight: 'Bold',
    color: 'rgb(255,215,0)'

  },
  visitLowerHeadingStyle: {
    textAlign : 'right',
    fontFamily: 'Montserrat',
    fontSize: '12px',
    marginRight : 10,
    fontWeight: 'Bold',
    color: 'rgb(255, 75, 100)'
  },
  visitdividerStyle: {
    height: '1px',
    backgroundColor: 'black',
    margin: '4px',
    marginTop: 10
  },
  visitTextStyle: {
    fontFamily: 'Montserrat',
    marginRight : 10,
    flex : 2,
    justifyContent : 'flex-end',
    color: 'black'
  },
  visitTextKeyStyle: {
    fontFamily: 'Montserrat',
    marginRight : 10,
    flex : 2,
    justifyContent : 'flex-start',
    color : 'rgb(0,128,128)'
  },
  visiticonStyle: {
    flex : 1
  },
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems : 'center'
  },
};
