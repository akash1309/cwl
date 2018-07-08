import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MaterialIcon from 'react-icons/lib/md';
import VendorPalette from './VendorPalette';
import axios from 'axios';

import {
  baseUrl,
  getVendorInfoUrl,
  updateVendorInfoUrl ,
  allIcUrl,
  vendorPOUrl,
  updatePOInfoUrl,
  getVisitUrl,
  oneCorrigendumUrl,
  removeVisitUrl
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
      corrigendum_array : [],
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : 4,
      code : ''
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
                onClickPurchaseOrders = {() => this.fetchAllEntities("Purchase_Order", this.state.code)}
                onClickVisits = {() => this.getVisits()}
                onClickProfile = {() => this.getProfileInfo()}
                onClickLogout={() => this.logout()}
              />

              { this.showProfile() }
              { this.showIC() }
              { this.showPurchaseOrders() }
              { this.showVisits() }

            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  
  logout(){
    this.props.history.replace({
      pathname : '/'
    });
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
                          onClick={() => this.getCorrigendum(member.corrigendum_id)}
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

  showPurchaseOrders = () => {

    if(this.state.flag == 4)
    {
      let statusArray = ["IC Generated","Items Dispatched","Items Accepted","Items Rejected","Amendment Requested","Amendment Inspector Nominated","Corrigendum Generated","Approved","Finished"];

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
                      ( member.inspected_by != undefined || member.inspected_by != null ) ?
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
                      member.status == "Initiated" || member.status == "Items Rejected" || member.status == "Rejected" || member.status == "Approved" || member.status == "IR Partial"?
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
                            onClick={() => this.fetchAllEntities("AllIC",member.order_number)}
                          />
                        </div>

                      </div>
                    : null
                  }
                  {
                    member.status == "IC Generated" ?
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
                  {
                    member.status == "Items Accepted" ?
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                      <RaisedButton
                        label="OK"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick = {() => this.checkBalanceQty(member.ic_id.balance_quantity,member.order_number,member.vendor_info.code)}
                      />
                      <RaisedButton
                        label="Request Amendment"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={() => this.updatePoStatus("Amendment Requested",member.order_number)}
                      />
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
        </div>
      );
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

  getCorrigendum(corrigendum_id){

    var that = this;
    var apiUrl = baseUrl + oneCorrigendumUrl + corrigendum_id;

    axios.get(apiUrl)
    .then( response => {
      console.log(response);
      that.setState({ corrigendum_array : response.data , corrigendum_flag : 1});
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
    else if(status == 'IR Partial'){
      return styles.IRPartialStyle;
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

  checkBalanceQty(balance_quantity,orderNumber,vendor_code){
    if(balance_quantity == 0)
    {
      this.updatePoStatus("Finished",orderNumber);
    }
    else {
      this.removeVisit(orderNumber,vendor_code);
    }
  }

  removeVisit(orderNumber,vendor_code)
  {
    var that = this;
    let apiUrl = baseUrl + removeVisitUrl;

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl,{
      "order_number": orderNumber,
      "vendor_code" : vendor_code
    },{headers})
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
            that.updatePoStatus("Approved",orderNumber);
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

  getProfileInfo(event){

    var that = this;
    var apiUrl = baseUrl + getVendorInfoUrl + that.state._id;

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.get(apiUrl,{headers})
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
    var apiUrl = baseUrl + updateVendorInfoUrl;

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl,{
      "_id" : that.state._id,
      "name" : that.state.name,
      "mobile" : that.state.mobile,
      "email" : that.state.email,
      "password" : that.state.password,
      "role" : "Vendor",
      "location" : that.state.location
    },{headers})
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


  fetchAllEntities(type, userId){

    var that = this;
    let apiUrl = baseUrl;

    if(type == "Purchase_Order"){
      apiUrl =apiUrl+vendorPOUrl+userId;
    }
    else if(type == "AllIC"){
      apiUrl += allIcUrl + userId;
    }

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.get(apiUrl,{headers})
    .then( response => {
      console.log(response);

      if(response.status == 200 && type == "AllIC"){
        that.setState({ responseDataArray : response.data , flag :2});
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

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.get(apiUrl,{headers})
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

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl,{
      "order_number": orderNumber,
      "status" : status
    },{headers})
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
  IRPartialStyle: {
    backgroundColor : '#420420',
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
    width : '500px',
    height : '200px',
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
    alignItems : 'left',
    marginLeft : '60px'
  }
};
