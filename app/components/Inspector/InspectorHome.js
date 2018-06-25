import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
   baseUrl,
   allPurchaseOrderUrl ,
   inspectorUrl,
   getInfoUrl,
   updateInfoUrl ,
   allVendorUrl ,
   allCorrigendumUrl,
   generateCorrigendumUrl ,
   addInspectionReportUrl,
   inspectorPOUrl,
   addVisitUrl,
   updatePOInfoUrl,
   } from './../../config/url';
import * as MaterialIcon from 'react-icons/lib/md';
import InspectorPalette from './InspectorPalette';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
  AppBar,
  RaisedButton,
  TextField,
} from 'material-ui';

export default class InspectorHome extends Component {

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
      order_date : '' ,
      corrigendum_number : '',
      ic_id:            	 '',
      ic_date :  			 '',
      inspector_name :  	'',
      inspector_mobile :	'',
      date : '',
      time : '',
      vendor_code: '',
      report_status:'',
      item_status:'',
      selectedIrStatusPos: '',
    }
  }

  handleChange = (event, index, value) => {

    if(value == 0)
      this.setState({selectedIrStatusPos : value, report_status:'Partial'});
    else {
      this.setState({selectedIrStatusPos : value, report_status:'Complete'});
    }
  };

  componentDidMount(){
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({
      _id: userInfo.userId,
      role: userInfo.role
    });
    this.fetchAllEntities("Purchase_Order",userInfo.userId);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>

          <AppBar title="Inspector Home" width="50%" />

          <div style={{ display: 'flex', flexDirection: 'row'}}>

            <InspectorPalette
              onClickVendors = {() => this.fetchAllEntities("Vendor")}
              onClickPurchaseOrders = {() => this.fetchAllEntities("Purchase_Order",this.state._id)}
              onClickIntimateVendor = {() => this.fetchAllEntities("Vendor")}
              onClickInspectionReport = {() => this.setState( {flag : 4}) }
              onClickCorrigendum = {() => this.setState( {flag : 3}) }
              onClickProfile = {() => this.getProfileInfo(this)}
            />

            { this.showVendors() }

            { this.showPurchaseOrders() }

            { this.addCorrigendum() }

            { this.showProfile() }

            {this.addInspectionReport()}

            {this.visitform()}

          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  showVendors = () => {
    if(this.state.flag == 1)
    return(
      <div style={{flex : 1}}>
        <div style = {styles.outerContainerStyle}>
          <span style={styles.headingStyle}>List of Vendors</span>
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

  showProfile = () => {
    if(this.state.flag == 2)
    return(
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
              <MaterialIcon.MdLockOpen size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Enter password"
                floatingLabelText="Password"
                value = {this.state.password}
                onChange = {(event,newValue) => this.setState({password:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.iconStyle} />
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
              <MaterialIcon.MdMail size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Enter email"
                floatingLabelText="Email"
                value = {this.state.email}
                onChange = {(event,newValue) => this.setState({email:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdLocationOn size={styles.iconSize} style={styles.iconStyle} />
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

  addCorrigendum = () => {
    if(this.state.flag == 3)
    return(
      <div style={styles.outerContainerStyle}>
        <span style={styles.headingStyle}>Corrigendum Generation</span>
        <div style={styles.innerContainerStyle}>
          <div style={styles.childContainer}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdDescription size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Corrigendum Number"
                floatingLabelText="Corrigendum Number"
                onChange = {(event,newValue) => this.setState({corrigendum_number:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Order Number"
                floatingLabelText="Order Number"
                onChange = {(event,newValue) => this.setState({order_number:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Order Date"
                floatingLabelText="Order Date"
                onChange = {(event,newValue) => this.setState({order_date:newValue })}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdReceipt size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="I.C. id"
                floatingLabelText="I.C. id"
                onChange = {(event,newValue) => this.setState({ic_id:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
          </div>

          <div style={styles.childContainer}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="I.C. Date"
                floatingLabelText="I.C. Date"
                onChange = {(event,newValue) => this.setState({ic_date:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPerson size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Inspector Name"
                floatingLabelText="Inspector Name"
                onChange = {(event,newValue) => this.setState({inspector_name:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Inspector Mobile"
                floatingLabelText="Inspector Mobile"
                onChange = {(event,newValue) => this.setState({inspector_mobile:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
          </div>
        </div>

        <RaisedButton
          label="ADD"
          primary={true}
          style={styles.buttonStyle}
          onClick={(event) => {this.generateCorrigendum(event)}}
        />

      </div>
    );
  }

  addInspectionReport = () => {
    if(this.state.flag == 4)
    {
      let items = [];
      let statusarray = ["Partial","Complete"]
      for (let i = 0; i < statusarray.length; i++ ) {
        items.push(<MenuItem value={i} key={i} primaryText={statusarray[i]} />);
      }
      return(
        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>Inspection Report Generation</span>
          <div style={styles.innerContainerStyle}>
            <div style={styles.childContainer}>
              <div style={styles.textCellStyle}>
                <MaterialIcon.MdDescription size={styles.iconSize} style={styles.iconStyle} />
                <TextField
                  hintText="Order Number"
                  floatingLabelText="Order Number"
                  onChange = {(event,newValue) => this.setState({order_number:newValue})}
                  style={styles.textFieldStyle}
                />
              </div>
              <div style={styles.textCellStyle}>
                <MaterialIcon.MdReceipt size={styles.iconSize} style={styles.selectIconStyle} />
                <SelectField
                  floatingLabelText="Report Status"
                  value={this.state.selectedIrStatusPos}
                  onChange={this.handleChange}
                  maxHeight={200}
                >
                  <MenuItem value='0' key='0' primaryText='Partial' />
                  <MenuItem value='1' key='1' primaryText='Complete' />
                </SelectField>
              </div>

              { this.state.report_status == "Complete" ?
              <div style={styles.textCellStyle}>
                <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle} />
                <TextField
                  hintText="Passed/Failed"
                  floatingLabelText="Items Status"
                  onChange = {(event,newValue) => this.setState({item_status:newValue })}
                  style={styles.textFieldStyle}
                />
              </div>
              :null
            }

            </div>
            </div>

          <RaisedButton
            label="Generate"
            primary={true}
            style={styles.buttonStyle}
            onClick={(event) => {this.generateInspectionReport(event)}}
          />

        </div>
      );
    }
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
                  {
                    member.status == "Assigned" ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton
                        label="Visit"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={(event) => {this.setState({flag : 6 , order_number :member.order_number})}}
                      />
                    </div>
                    : null
                  }
                  {
                    member.status == "Intimated" ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton
                        label="Visited"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={(event) => {this.updatePoStatus("Visited",member.order_number)}}
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

  visitform = () => {
    if(this.state.flag == 6)
     return(
       <div style={styles.outerContainerStyle}>
         <span style={styles.headingStyle}>Visit Information</span>
         <div style={styles.innerContainerStyle}>
           <div style={styles.childContainer}>
             <div style={styles.textCellStyle}>
               <MaterialIcon.MdDescription size={styles.iconSize} style={styles.iconStyle} />
               <TextField
                 hintText="Date"
                 floatingLabelText="Date"
                 onChange = {(event,newValue) => this.setState({date:newValue})}
                 style={styles.textFieldStyle}
               />
             </div>
             <div style={styles.textCellStyle}>
               <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle} />
               <TextField
                 hintText="Time"
                 floatingLabelText="Time"
                 onChange = {(event,newValue) => this.setState({time:newValue})}
                 style={styles.textFieldStyle}
               />
             </div>
             <div style={styles.textCellStyle}>
               <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle} />
               <TextField
                 hintText="Vendor Code"
                 floatingLabelText="Vendor Code"
                 onChange = {(event,newValue) => this.setState({vendor_code:newValue})}
                 style={styles.textFieldStyle}
               />
             </div>
           </div>
           </div>

         <RaisedButton
           label="Set"
           primary={true}
           style={styles.buttonStyle}
           onClick={(event) => {this.generateVisit(event)}}
         />

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
          flag:2
        });
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
    var body = {
      "_id" : that.state._id,
      "name" : that.state.name,
      "mobile" : that.state.mobile,
      "email" : that.state.email,
      "password" : that.state.password,
      "role" : "Inspector",
      "location" : that.state.location
    };

    axios.post(apiUrl,body)
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

    var that = this;
    var apiUrl = baseUrl + generateCorrigendumUrl;
    var body = {
      corrigendum_number : that.state.corrigendum_number,
	    order_number :   	 that.state.order_number,
	    order_date : 		 that.state.order_date,
	    ic_id:            	that.state.ic_id,
	    ic_date :  			 that.state.ic_date,
	    inspector_name :  	 that.state.inspector_name,
	    inspector_mobile :	 that.state.inspector_mobile
    };

    axios.post(apiUrl,body)
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


  generateInspectionReport(event){

    var that = this;
    var apiUrl = baseUrl + addInspectionReportUrl;
    let report_status = '';
    if(that.state.selectedIrStatusPos == '0'){
      report_status = "Partial";
    }
    else {
      report_status = "Complete";
    }
    var body = {
	    order_number :       that.state.order_number,
	    item_status:         that.state.item_status,
	    report_status :  	   report_status
    };

    axios.post(apiUrl,body)
    .then(response => {
       if(response.status == 200){
          alert("Inspection_Report generated successfully!");
         }
         else if(response.status == 204) {
           alert("Inspection_Report is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

  fetchAllEntities(type,userId){

    var that = this;
    let apiUrl = baseUrl;

    if(type == "Vendor"){
      apiUrl += allVendorUrl;
    }
    else if(type == "Purchase_Order"){
      apiUrl = apiUrl + inspectorPOUrl + userId;
    }

    const headers = {
      SECURITY_TOKEN: userId
    };

    console.log(apiUrl);
    axios.get(apiUrl, { headers })
    .then( response => {
      console.log(response);
      if(response.status == 200 && type == "Vendor"){
        that.setState({ responseDataArray : response.data , flag : 1});
      }
      else if(response.status == 200 && type == "Purchase_Order"){
        that.setState({ responseDataArray : response.data , flag : 5});
      }

    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  generateVisit(event){

    var that = this;
    var apiUrl = baseUrl + addVisitUrl;
    var body = {
      order_number :  that.state.order_number,
	    date : 	    	  that.state.date,
	    time:           that.state.time,
	    inspector_id:   that.state._id,
      vendor_code :   that.state.vendor_code,
      visit_status :  "Intimated"
    };

    axios.post(apiUrl,body)
    .then(response => {
       if(response.status == 200){
         console.log(response);
          that.updatePoStatus("Intimated",that.state.order_number);
         }
         else if(response.status == 204) {
           alert("Visit is already present for this order!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

  getStatusStyle(status){
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
        that.fetchAllEntities("Purchase_Order", that.state._id);
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
  selectIconStyle:{
    marginTop: 18,
    marginRight : 18
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
};
