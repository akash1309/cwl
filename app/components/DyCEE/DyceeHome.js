import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { baseUrl ,  allVendorUrl ,addPurchaseOrderUrl ,addVendorUrl, allPurchaseOrderUrl, getInfoUrl, updateInfoUrl ,addItemUrl , allItemUrl , allInspectorUrl } from './../../config/url';
import axios from 'axios';
import * as FaIcon from 'react-icons/lib/fa';
import * as MaterialIcon from 'react-icons/lib/md';
import DyCeePalette from './DyCeePalette';
import {
  AppBar,
  RaisedButton,
  TextField, IconButton, SvgIcon,
} from 'material-ui';

export default class DyCeeHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      getall : [],
      name : '',
      email : '',
      mobile : '',
      location : '',
      password : '',
      flag : -1
    };
  }

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({_id: userInfo.userId});
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>

          <AppBar title="DyCEE Home" width="50%"/>

          <div style={{ display: 'flex', flexDirection: 'row'}}>

            <DyCeePalette
              onClickItems={() => this.getall(this,"AllItems")}
              onClickVendors={() => this.getall(this,"Vendor")}
              onClickInspectors={() => this.getall(this,"Inspector")}
              onClickAddInspector={() => this.setState({flag : 1})}
              onClickPurchaseOrder={() => this.getall(this,"Purchase_Order")}
              onClickIC={() => this.getall(this,"AllItems")}
              onClickCorrigendum={() => this.getall(this,"AllItems")}
              onClickApprovalLetter={() => this.getall(this,"AllItems")}
              onClickProfile={() => this.getPreviousInfo(this)}
            />


            { this.state.flag == 6 ?

              <div style={{ flex: 1 }}>
                <div style={styles.itemHeaderContainer}>
                  <span style={styles.textCellContainer}>Item Name</span>
                  <span style={styles.textCellContainer}>Model Number</span>
                  <span style={styles.textCellContainer}>Quantity</span>
                </div>
                {
                 this.state.getall.map((member,key) => {
                  return(
                    <div style={styles.itemContainer}>
                      <span style={styles.textCellContainer}>{member.name}</span>
                      <span style={styles.textCellContainer}>{member.model_number}</span>
                      <span style={styles.textCellContainer}>{member.quantity}</span>
                    </div>
                  )
                 })
                }
              </div>

            : null }

            { this.state.flag == 7 || this.state.flag == 8 ?
              <div style={{ flex: 1 }}>
                <div style={styles.itemHeaderContainer}>
                  <span style={styles.textCellContainer}>Name</span>
                  <span style={styles.textCellContainer}>Email</span>
                  <span style={styles.textCellContainer}>Mobile</span>
                  <span style={styles.textCellContainer}>Location</span>
                </div>
                {
                 this.state.getall.map((member,key) => {
                  return(
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
            : null }

            { this.state.flag == 1 ?
              <div style={styles.outerContainerStyle}>
                <div style={styles.innerContainerStyle}>

                  <div>
                    <MaterialIcon.MdPerson size={styles.iconSize}/>
                    <TextField
                      hintText="Enter name"
                      floatingLabelText="Name"
                      onChange = {(event,newValue) => this.setState({name:newValue})}
                      style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                    />
                  </div>

                  <div>
                    <MaterialIcon.MdPhoneIphone size={styles.iconSize}/>
                    <TextField
                      hintText="Enter mobile number"
                      floatingLabelText="Mobile Number"
                      onChange = {(event,newValue) => this.setState({mobile:newValue})}
                      style={{marginLeft: 10 ,marginRight : 10, marginTop : 2 }}
                    />
                  </div>

                  <div>
                    <MaterialIcon.MdMail size={styles.iconSize}/>
                    <TextField
                      hintText="Enter email"
                      floatingLabelText="Email"
                      onChange = {(event,newValue) => this.setState({email:newValue})}
                      style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                    />
                  </div>

                  <div>
                    <MaterialIcon.MdLocationOn size={styles.iconSize}/>
                    <TextField
                      hintText="Enter location"
                      floatingLabelText="Location"
                      onChange = {(event,newValue) => this.setState({location:newValue})}
                      style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                    />
                  </div>

                  <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => this.handleInspector(event)}/>

                </div>
              </div>
              : null
            }

            { this.state.flag == 2 ?
              <div style={styles.outerContainerStyle}>
                <div style={styles.innerContainerStyle}>

                  <div>
                    <MaterialIcon.MdPerson size={styles.iconSize}/>
                    <TextField
                      hintText="Enter name"
                      floatingLabelText="Name"
                      value = {this.state.name}
                      onChange = {(event,newValue) => this.setState({name:newValue})}
                      style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                    />
                  </div>

                <div>
                  <MaterialIcon.MdLockOpen size={styles.iconSize}/>
                  <TextField
                    hintText="Enter password"
                    floatingLabelText="Password"
                    value = {this.state.password}
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                    style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                  />
                </div>

                <div>
                  <MaterialIcon.MdPhoneIphone size={styles.iconSize}/>
                  <TextField
                    hintText="Enter mobile number"
                    floatingLabelText="Mobile Number"
                    value = {this.state.mobile}
                    onChange = {(event,newValue) => this.setState({mobile:newValue})}
                    style={{marginLeft: 10 ,marginRight : 10, marginTop : 2 }}
                  />
                </div>

                <div>
                  <MaterialIcon.MdMail size={styles.iconSize}/>
                  <TextField
                    hintText="Enter email"
                    floatingLabelText="Email"
                    value = {this.state.email}
                    onChange = {(event,newValue) => this.setState({email:newValue})}
                    style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
                  />
                </div>

                <div>
                  <MaterialIcon.MdLocationOn size={styles.iconSize}/>
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

            { this.state.flag == 5 ?
              <div style={{ flex: 1 }}>
                {
                 this.state.getall.map((member,key) => {
                  return(
                    <div style={styles.purchaseOrderContainer}>

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
        that.setState({
          name : response.data.name ,
          email : response.data.email,
          mobile : response.data.mobile,
          location : response.data.location,
          password : response.data.password,
          flag : 2
        });
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
    if(type == "Vendor"){
      apiUrl += allVendorUrl;
    }
    else if(type == "Purchase_Order"){
      apiUrl += allPurchaseOrderUrl;
    }
    else if(type == "AllItems"){
      apiUrl += allItemUrl;
    }
    else if(type == "Inspector"){
      apiUrl += allInspectorUrl;
    }

    console.log(apiUrl);
    axios.get(apiUrl)
    .then( response => {
      console.log(response);
      if(response.status == 200 && type == "Vendor"){
        that.setState({ getall : response.data, flag :7});
      }
      else if(response.status == 200 && type == "Purchase_Order"){
        that.setState({ getall : response.data, flag :5});
      }
      else if(response.status == 200 && type == "AllItems"){
        that.setState({ getall : response.data, flag :6});
      }
      else if(response.status == 200 && type == "Inspector"){
        that.setState({ getall : response.data, flag :8});
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
    flex: 1
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
    width: '80%'
  },
  buttonStyle: {
    margin: 30
  },
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
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #aaa69d',
    margin: 5,
    padding: 5
  },
  itemHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f5cd79',
    borderRadius: 2,
    margin: 5,
    padding: 5
  },
  textCellContainer: {
    flex: 1,
    textAlign: 'center'
  },
  purchaseCell: {

  },
  textLabel:{
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#006266'
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
  boxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  textStyle: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    color: '#009432',
    margin: '2px'
  },
  iconSize: 20
};
