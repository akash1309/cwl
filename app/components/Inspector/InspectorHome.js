import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { baseUrl, allPurchaseOrderUrl , inspectorUrl, getInfoUrl, updateInfoUrl ,allVendorUrl , allCorrigendumUrl, generateCorrigendumUrl } from './../../config/url';
import * as MaterialIcon from 'react-icons/lib/md';
import InspectorPalette from './InspectorPalette';
import axios from 'axios';

import {
  AppBar,
  RaisedButton,
  TextField,
} from 'material-ui';

export default class InspectorHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      getall : [],
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : -1,
      order_number : '' ,
      order_date : '' ,
      role : "Inspector",
      corrigendum_number : '',
      ic_id:            	 '',
      ic_date :  			 '',
      inspector_name :  	'',
      inspector_mobile :	''
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

          <AppBar title="Inspector Home" width="50%" />

          <div style={{ display: 'flex', flexDirection: 'row'}}>

              <InspectorPalette
                onClickVendors = {() => this.getall(this,"Vendor")}
                onClickPurchaseOrders = {() => this.getall(this,"Purchase_Order")}
                onClickIntimateVendor = {() => this.getall(this,"Vendor")}
                onClickInspectionReport = {() => this.getall(this,"Vendor")}
                onClickCorrigendum = {() => this.setState( {flag : 3}) }
                onClickUploadIC = {() => this.getall(this,"Vendor")}
                onClickUploadCorrigendum = {() => this.getall(this,"Vendor")}
                onClickUploadRejectionLetter = {() => this.getall(this,"Vendor")}
                onClickProfile = {() => this.getPreviousInfo(this)}
              />

              { this.state.flag == 1 ?

                  <div style={{flex : 1}}>
                    <div style={styles.itemHeaderContainer}>
                      <span style={styles.textCellContainer}>Name</span>
                      <span style={styles.textCellContainer}>Email</span>
                      <span style={styles.textCellContainer}>Mobile</span>
                      <span style={styles.textCellContainer}>Location</span>
                    </div>
                    {
                      this.state.getall.map((member,key) => {
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
                : null

              }

              { this.state.flag == 2 ?

                  <div style={styles.outerContainerStyle}>
                    <div style={styles.innerContainerStyle}>
                      <div>
                        <MaterialIcon.MdPerson size={styles.iconSize} />
                        <TextField
                          hintText="Enter name"
                          floatingLabelText="Name"
                          value = {this.state.name}
                          onChange = {(event,newValue) => this.setState({name:newValue})}
                          style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdLockOpen size={styles.iconSize} />
                        <TextField
                          hintText="Enter password"
                          floatingLabelText="Password"
                          value = {this.state.password}
                          onChange = {(event,newValue) => this.setState({password:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdPhoneIphone size={styles.iconSize} />
                        <TextField
                          hintText="Enter mobile number"
                          floatingLabelText="Mobile Number"
                          value = {this.state.mobile}
                          onChange = {(event,newValue) => this.setState({mobile:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2 }}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdMail size={styles.iconSize} />
                        <TextField
                          hintText="Enter email"
                          floatingLabelText="Email"
                          value = {this.state.email}
                          onChange = {(event,newValue) => this.setState({email:newValue})}
                          style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdLocationOn size={styles.iconSize} />
                        <TextField
                          hintText="Enter location"
                          floatingLabelText="Location"
                          value = {this.state.location}
                          onChange = {(event,newValue) => this.setState({location:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <RaisedButton label="UPDATE" primary={true} style={styles.buttonStyle} onClick={(event) => this.updateInfo(event)}/>

                    </div>
                  </div>
                : null
              }

              { this.state.flag == 3 ?

                  <div style={styles.outerContainerStyle}>
                    <div style={styles.innerContainerStyle}>
                      <div>
                        <MaterialIcon.MdDescription size={styles.iconSize} />
                        <TextField
                          hintText="Corrigendum Number"
                          floatingLabelText="Corrigendum Number"
                          onChange = {(event,newValue) => this.setState({corrigendum_number:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdChromeReaderMode size={styles.iconSize} />
                        <TextField
                          hintText="Order Number"
                          floatingLabelText="Order Number"
                          onChange = {(event,newValue) => this.setState({order_number:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdDateRange size={styles.iconSize} />
                        <TextField
                          hintText="Order Date"
                          floatingLabelText="Order Date"
                          onChange = {(event,newValue) => this.setState({order_date:newValue })}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdReceipt size={styles.iconSize} />
                        <TextField
                          hintText="I.C. id"
                          floatingLabelText="I.C. id"
                          onChange = {(event,newValue) => this.setState({ic_id:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdDateRange size={styles.iconSize} />
                        <TextField
                          hintText="I.C. Date"
                          floatingLabelText="I.C. Date"
                          onChange = {(event,newValue) => this.setState({ic_date:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdPerson size={styles.iconSize} />
                        <TextField
                          hintText="Inspector Name"
                          floatingLabelText="Inspector Name"
                          onChange = {(event,newValue) => this.setState({inspector_name:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <div>
                        <MaterialIcon.MdPhoneIphone size={styles.iconSize} />
                        <TextField
                          hintText="Inspector Mobile"
                          floatingLabelText="Inspector Mobile"
                          onChange = {(event,newValue) => this.setState({inspector_mobile:newValue})}
                          style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                        />
                      </div>
                      <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.generateCorrigendum(event)}} />
                    </div>
                  </div>

                : null
              }

              { this.state.flag == 5 ?

                  <div style={{ flex:1 }}>
                    {
                      this.state.getall.map((member,key) => {
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
                : null
              }

          </div>
        </MuiThemeProvider>
      </div>
    );
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
        alert("No Inspector found with this id");
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
      "role" : that.state.role,
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

  generateCorrigendum(event){
    var that=this;
    var apiUrl=baseUrl + generateCorrigendumUrl;
    axios.post(apiUrl,{
        corrigendum_number : that.state.corrigendum_number,
  	    order_number :   	 that.state.order_number,
  	    order_date : 		 that.state.order_date,
  	    ic_id:            	that.state.ic_id,
  	    ic_date :  			 that.state.ic_date,
  	    inspector_name :  	 that.state.inspector_name,
  	    inspector_mobile :	 that.state.inspector_mobile
    })
   .then(response => {
       if(response.status == 200){
          alert("Corrigendum generated successfully!");
         }
         else if(response.status == 204) {
           alert("Corrigendum is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

  getall(event,type){

  var that = this;
  let apiUrl = baseUrl;
  if(type == "Vendor")
  {
    apiUrl += allVendorUrl;
  }
  else if(type = "Purchase_Order")
  {
    apiUrl += allPurchaseOrderUrl;
  }

  console.log(apiUrl);
  axios.get(apiUrl)
  .then( response => {
    console.log(response);
    if(response.status == 200 && type == "Vendor"){
      that.setState({ getall : response.data , flag :1});
    }
    else if(response.status == 200 && type == "Purchase_Order"){
      that.setState({ getall : response.data , flag :5});
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
    alignItems: 'center',
    border: '2px solid #00BCD4',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    width : '80%'
  },
  buttonStyle: {
    margin: 30
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
  iconSize: 18
};
