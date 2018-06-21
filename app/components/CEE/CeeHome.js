import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MaterialIcon from 'react-icons/lib/md';
import CeePalette from './CeePalette';

import {
  baseUrl,
  allDyCeeUrl,
  allInspectorUrl ,
  allStoreOfficerUrl,
  allVendorUrl,
  addDyCEEUrl,
  getInfoUrl,
  updateInfoUrl,
  allPurchaseOrderUrl,
  allItemUrl,
  allIcUrl,
  allIrUrl,
  allCorrigendumUrl

} from './../../config/url';

import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField,
} from 'material-ui';


export default class CeeHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      responseDataArray : [],
      flag : -1,
      name :'',
      email : '',
      mobile : '',
      location : '',
      role : "DyCEE"
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
            <AppBar title="CEE Home" width="50%" />
            <div style={{ display: 'flex', flexDirection: 'row'}}>

              <CeePalette
                onClickAddDycee = {() => this.setState({flag : 1 }) }
                onClickDycee = {() => this.fetchAllEntities(this,"DyCEE")}
                onClickVendors = {() => this.fetchAllEntities(this,"Vendor")}
                onClickInspectors = {() => this.fetchAllEntities(this,"Inspector")}
                onClickStoreOfficers = {() => this.fetchAllEntities(this,"StoreOfficer")}
                onClickPurchaseOrders = {() => this.fetchAllEntities(this,"Purchase_Order")}
                onClickItems = {() => this.fetchAllEntities(this,"AllItems")}
                onClickIC = {() => this.fetchAllEntities(this,"AllIC")}
                onClickIR = {() => this.fetchAllEntities(this,"AllIR")}
                onClickCorrigendums = {() => this.fetchAllEntities(this,"Corrigendums")}
                onClickProfile = {() => this.getProfileInfo(this)}
              />

              { this.addDyCEE() }
              { this.showPeople() }
              { this.showPurchaseOrders() }
              { this.showItems() }
              { this.showIC() }
              { this.showIR() }
              { this.showCorrigendums() }
              { this.showProfile() }

            </div>
          </div>

        </MuiThemeProvider>
      </div>
    );
  }

  addDyCEE = () => {
    if(this.state.flag == 1)
      return (
        <div style={styles.outerContainerStyle}>
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
              <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.addDyCEEFunc(event)}} />
            </div>
          </div>
        </div>
      );
  }

  showPeople = () => {

    if(this.state.flag == 2)
    return(
      <div style={{flex : 1}}>
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

  showPurchaseOrders = () => {
    if(this.state.flag == 3)
      return(
        <div style={{ flex:1 }}>
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

  showItems = () => {

    if(this.state.flag == 4)
      return (
        <div style={{flex : 1}}>
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

  showIC = () => {

    if(this.state.flag == 5)
      return (
        <div style={{flex : 1}}>
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

  showIR = () => {

    if(this.state.flag == 6)
      return (
        <div style={{flex : 1}}>
          <div style={styles.itemHeaderContainer}>
            <span style={styles.textCellContainer}>Order No.</span>
            <span style={styles.textCellContainer}>IC id</span>
            <span style={styles.textCellContainer}>Status</span>
          </div>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style={styles.itemContainer}>
                  <span style={styles.textCellContainer}>{member.order_number}</span>
                  <span style={styles.textCellContainer}>{member.ic_id}</span>
                  <span style={styles.textCellContainer}>{member.status}</span>
                </div>
              )
            })
          }
        </div>
      );
  }

  showCorrigendums = () => {

    if(this.state.flag == 7)
      return (
        <div style={{flex : 1}}>
          <div style={styles.itemHeaderContainer}>
            <span style={styles.textCellContainer}>Corrigendum No.</span>
            <span style={styles.textCellContainer}>Order No.</span>
            <span style={styles.textCellContainer}>Order Date</span>
            <span style={styles.textCellContainer}>IC Id</span>
            <span style={styles.textCellContainer}>IC Date</span>
            <span style={styles.textCellContainer}>Inspector Name</span>
            <span style={styles.textCellContainer}>Inspector Mobile</span>
          </div>
          {
            this.state.responseDataArray.map((member,key) => {
              return (
                <div style={styles.itemContainer}>
                  <span style={styles.textCellContainer}>{member.corrigendum_number}</span>
                  <span style={styles.textCellContainer}>{member.order_number}</span>
                  <span style={styles.textCellContainer}>{member.order_date}</span>
                  <span style={styles.textCellContainer}>{member.ic_id}</span>
                  <span style={styles.textCellContainer}>{member.ic_date}</span>
                  <span style={styles.textCellContainer}>{member.inspector_name}</span>
                  <span style={styles.textCellContainer}>{member.inspector_mobile}</span>
                </div>
              )
            })
          }
        </div>
      );
  }

  showProfile = () => {
    if(this.state.flag == 8 )
    return (

      <div style={styles.outerContainerStyle}>
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


  addDyCEEFunc(event){
    var that=this;
    var apiUrl=baseUrl + addDyCEEUrl;
    axios.post(apiUrl,{
        "name" : that.state.name ,
        "mobile" : that.state.mobile,
        "location" : that.state.location,
        "email" : that.state.email,
        "role" : that.state.role,
        "cee_id" : that.state._id
    })
   .then(response => {
       if(response.status == 200){
          alert("DyCee added successfully!");
         }
         else if(response.status == 204) {
           alert("DyCee is already present!");
         }
      })
   .catch(error => {
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
            password : response.data.password,
            flag : 8});
      }
      else if(response.status == 404) {
        alert("No CEE found with this id");
      }
    })
    .catch(function (error) {
        alert(error.response.data.message);
    })
  }

  updateInfo(event){

    console.log("inside updateInfo");

    var that = this;
    var apiUrl = baseUrl + updateInfoUrl;

    axios.post(apiUrl,{
      "_id" : that.state._id,
      "name" : that.state.name,
      "mobile" : that.state.mobile,
      "email" : that.state.email,
      "password" : that.state.password,
      "role" : "CEE"
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
    var apiUrl = baseUrl;

    if(type =="DyCEE")
    {
      apiUrl += allDyCeeUrl;
    }
    else if(type =="Inspector")
    {
      apiUrl += allInspectorUrl;
    }
    else if(type =="StoreOfficer")
    {
      apiUrl += allStoreOfficerUrl;
    }
    else if(type =="Vendor")
    {
      apiUrl += allVendorUrl;
    }
    else if( type == "Purchase_Order")
    {
      apiUrl += allPurchaseOrderUrl;
    }
    else if(type == "AllItems")
    {
      apiUrl += allItemUrl;
    }
    else if(type == "AllIC")
    {
      apiUrl += allIcUrl;
    }
    else if (type == "AllIR")
    {
      apiUrl += allIrUrl;
    }
    else if (type == "Corrigendums")
    {
      apiUrl += allCorrigendumUrl;
    }

    axios.get(apiUrl)
    .then( response => {

      console.log(response);
      if(response.status == 200 && type == "Purchase_Order"){
        that.setState({ responseDataArray : response.data , flag :3});
      }
      else if(response.status == 200 && type == "AllItems"){
        that.setState({ responseDataArray : response.data , flag :4});
      }
      else if(response.status == 200 && type == "AllIC"){
        that.setState({ responseDataArray : response.data , flag :5});
      }
      else if(response.status == 200 && type == "AllIR"){
        that.setState({ responseDataArray : response.data , flag :6});
      }
      else if(response.status == 200 && type == "Corrigendums"){
        that.setState({ responseDataArray : response.data , flag :7});
      }
      else if(response.status == 200){
        that.setState({ responseDataArray : response.data , flag : 2 });
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
  }
};
