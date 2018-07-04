import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
   baseUrl,
   getInfoUrl,
   updateInfoUrl ,
   allVendorUrl ,
   generateCorrigendumUrl ,
   addInspectionReportUrl,
   inspectorPOUrl,
   addVisitUrl,
   updatePOInfoUrl,
   updateVisitInfoUrl,
   removeVisitUrl,
   oneCorrigendumUrl,
   icGenerateUrl,
   allIcUrl,
   updateICInfoUrl
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
      corrigendum_array : [],
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
      inspector_name :  	'',
      inspector_mobile :	'',
      date : '',
      time : '',
      vendor_code: '',
      report_status:'',
      item_status:'',
      selectedIrStatusPos: '',
      selectedItemStatusPos: '',
      rejection_reason : '',
      remarks : '',
      unit_price: '',
      balance_quantity: '',
      quantity_supplied_so_far: '',
      quantity_on_order: '',
      ic_signed_on:'',
      inspection_date :   '',
      update_values: '',
      quantity_offered:   '',
  	  quantity_approved:  '',
      location_of_seal :  '',
      materials_offered_date : ''
    }
  }

  handleChange = (event, index, value) => {

    if(value == 0)
      this.setState({selectedIrStatusPos : value, report_status:'Partial'});
    else {
      this.setState({selectedIrStatusPos : value, report_status:'Complete'});
    }
  };

  handleChangeStatus = (event, index, value) => {

    if(value == 0)
      this.setState({selectedItemStatusPos : value, item_status:'Pass'});
    else {
      this.setState({selectedItemStatusPos : value, item_status:'Fail'});
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
              onClickProfile = {() => this.getProfileInfo(this)}
            />

            { this.showVendors() }
            { this.showPurchaseOrders() }
            { this.createIC() }
            { this.showIC() }
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
          <span style={styles.textCellContainer}>S.No.</span>
          <span style={styles.textCellContainer}>Code</span>
          <span style={styles.textCellContainer}>Name</span>
          <span style={styles.textCellContainer}>Email</span>
          <span style={styles.textCellContainer}>Mobile</span>
          <span style={styles.textCellContainer}>Location</span>
        </div>
        {
          this.state.responseDataArray.map((member,key) => {
            return (
              <div style={styles.itemContainer}>
                <span style={styles.textCellContainer}>{key + 1}</span>
                <span style={styles.textCellContainer}>{member.vendor_code}</span>
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
                floatingLabelText="*Corrigendum Number"
                onChange = {(event,newValue) => this.setState({corrigendum_number:newValue})}
              />
              <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Order Number"
                floatingLabelText="Order Number"
                value={this.state.order_number}
                inputStyle={styles.opaqueTextStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="Vendor Code"
                floatingLabelText="Vendor Code"
                value={this.state.vendor_code}
                inputStyle={styles.opaqueTextStyle}
              />
              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="YYYY-MM-DD"
                floatingLabelText="Order Date"
                value={this.state.order_date}
                inputStyle={styles.opaqueTextStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdReceipt size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="I.C. id"
                floatingLabelText="I.C. id"
                value={this.state.ic_id}
                inputStyle={styles.opaqueTextStyle}
              />

              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle} />
              <TextField
                hintText="YYYY-MM-DD"
                floatingLabelText="I.C. Date"
                value={this.state.ic_signed_on}
                inputStyle={styles.opaqueTextStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity Offered"
                floatingLabelText="Quantity Offered"
                value={this.state.quantity_offered}
                inputStyle={styles.opaqueTextStyle}
              />
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity Accepted"
                floatingLabelText="Quantity Accepted"
                value={this.state.quantity_approved}
                inputStyle={styles.opaqueTextStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity On Order"
                floatingLabelText="Quantity On Order"
                value={this.state.quantity_on_order}
                inputStyle={styles.opaqueTextStyle}
              />
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Qty Supplied/Inspected So Far"
                floatingLabelText="Qty Supplied/Inspected So Far"
                value={this.state.quantity_supplied_so_far}
                inputStyle={styles.opaqueTextStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Balance Quantity"
                floatingLabelText="Balance Quantity"
                value = {this.state.balance_quantity}
                inputStyle={styles.opaqueTextStyle}
              />

              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Unit Price"
                floatingLabelText="Unit Price"
                value = {this.state.unit_price}
                inputStyle={styles.opaqueTextStyle}
              />
            </div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
               <TextField
                hintText="Updated Values"
                floatingLabelText="*Updated Values"
                multiLine={true}
                rows={6}
                rowsMax={6}
                onChange = {(event,newValue) => this.setState({update_values:newValue})}
                style={styles.corriStyle}
                />
                <TextField
                hintText="Remarks"
                floatingLabelText="Remarks"
                multiLine={true}
                rows={6}
                rowsMax={6}
                onChange = {(event,newValue) => this.setState({remarks:newValue})}
                style={styles.corriStyle}
                />
            </div>
          </div>
        </div>

        <RaisedButton
          label="Generate"
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
                  value={this.state.order_number}
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

              { this.state.report_status == 'Complete' ?

               <div style={styles.textCellStyle}>
                <MaterialIcon.MdReceipt size={styles.iconSize} style={styles.selectIconStyle} />
                <SelectField
                  floatingLabelText="Item Status"
                  value={this.state.selectedItemStatusPos}
                  onChange={this.handleChangeStatus}
                  maxHeight={200} >
                  <MenuItem value='0' key='0' primaryText='Pass' />
                  <MenuItem value='1' key='1' primaryText='Fail' />
                </SelectField>
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
                  {
                    member.status == "Assigned" ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton
                        label="Visit"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={(event) => {this.setState({flag : 6 , order_number :member.order_number, vendor_code : member.vendor_info.code})}}
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
                        onClick={(event) => {this.updateVisitStatus("Visited",member.order_number,member.vendor_info.code)}}
                      />
                    </div>
                    : null
                  }
                  {
                    member.status == "Visited" ?
                    <div style={styles.buttonContainerStyle}>
                      <RaisedButton
                        label="Add Inspection Report"
                        primary={true}
                        style={styles.buttonStyle}
                        onClick={(event) => this.setState({flag : 4 , order_number : member.order_number , vendor_code : member.vendor_info.code})}
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
                          flag :7,
                          order_number:member.order_number,
                          inspector_name:member.inspected_by.name,
                          inspector_mobile : member.inspected_by.mobile
                        })}
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
                            <span>Date when items were offered for inspection: {member.ic_id.materials_offered_date}</span>

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
                    (member.status == "Amendment Inspector Nominated" && member.amendmentInspector==this.state._id) ?
                      <div style={styles.buttonContainerStyle}>
                        <RaisedButton
                          label="Add Corrigendum"
                          primary={true}
                          style={styles.buttonStyle}
                          onClick={(event) => this.setState({
                            flag : 3 ,
                              order_number : member.order_number ,
                              vendor_code : member.vendor_info.code ,
                              ic_id : member.ic_id._id,
                              order_date : member.order_date,
                              ic_signed_on : member.ic_id.ic_signed_on,
                              unit_price : member.ic_id.unit_price,
                              balance_quantity : member.ic_id.balance_quantity,
                              quantity_offered : member.ic_id.quantity_offered,
                              quantity_approved : member.ic_id.quantity_approved,
                              quantity_on_order: member.ic_id.quantity_on_order,
                              quantity_supplied_so_far : member.ic_id.quantity_supplied_so_far,
                              update_values : '',
                              remarks : ''
                            })
                          }
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

  createIC = () => {

    if(this.state.flag == 7)
      return (
        <div style={styles.outerContainerStyle}>
          <span style={styles.headingStyle}>IC Generation</span>
          <div style={styles.childContainer}>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Order_Number"
                floatingLabelText="*Order_Number"
                value = {this.state.order_number}
                onChange = {(event,newValue) => this.setState({order_number:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity_offered"
                floatingLabelText="*Quantity_offered"
                onChange = {(event,newValue) => this.setState({quantity_offered:newValue})}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity_accepted"
                floatingLabelText="*Quantity_accepted"
                onChange = {(event,newValue) => this.setState({quantity_approved:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Quantity On Order"
                floatingLabelText="*Quantity On Order"
                onChange = {(event,newValue) => this.setState({quantity_on_order:newValue})}
                style={styles.textFieldStyle}
              />
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Qty Supplied/Inspected So Far"
                floatingLabelText="*Qty Supplied/Inspected So Far"
                onChange = {(event,newValue) => this.setState({quantity_supplied_so_far:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Balance Quantity"
                floatingLabelText="*Balance Quantity"
                value = {this.state.balance_quantity}
                onChange = {(event,newValue) => this.setState({balance_quantity:newValue})}
                style={styles.textFieldStyle}
              />
              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="YYYY-MM-DD"
                floatingLabelText="*Date item offered for inspection"
                onChange = {(event,newValue) => this.setState({materials_offered_date:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="YYYY-MM-DD"
                floatingLabelText="*Inspection Date"
                onChange = {(event,newValue) => this.setState({inspection_date:newValue})}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdMap size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Unit Price"
                floatingLabelText="*Unit Price"
                value = {this.state.unit_price}
                onChange = {(event,newValue) => this.setState({unit_price:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <MaterialIcon.MdPeopleOutline size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Inspecting Officer Name"
                floatingLabelText="*Inspecting Officer Name"
                value = {this.state.inspector_name}
                style={styles.textFieldStyle}
              />

              <MaterialIcon.MdPhoneIphone size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="Inspecting Officer Mobile"
                floatingLabelText="*Inspecting Officer Mobile"
                value = {this.state.inspector_mobile}
                style={styles.textFieldStyle}
              />
            </div>
            <div style={styles.textCellStyle}>
              <TextField
                hintText="Location_of_seal"
                floatingLabelText="*Location_of_seal"
                multiLine={true}
                rows={2}
                rowsMax={4}
                onChange = {(event,newValue) => this.setState({location_of_seal:newValue})}
                style={styles.areaStyle}
              />
              <TextField
              hintText="Remarks"
              floatingLabelText="Remarks if any"
              multiLine={true}
              rows={2}
              rowsMax={4}
              onChange = {(event,newValue) => this.setState({remarks:newValue})}
              style={styles.areaStyle}
              />
            </div>
            <div style={styles.signedOnStyle}>
              <MaterialIcon.MdDateRange size={styles.iconSize} style={styles.iconStyle}/>
              <TextField
                hintText="YYYY-MM-DD"
                floatingLabelText="*IC Signed On"
                onChange = {(event,newValue) => this.setState({ic_signed_on:newValue})}
                style={styles.textFieldStyle}
              />
            </div>
            <br/>
            <div style={styles.textCellStyle}>
              <RaisedButton label="Generate" primary={true} style={styles.buttonStyle} onClick={(event) => {this.createICFunc(event)}} />
            </div>
          </div>
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
                 hintText="YYYY-MM-DD"
                 floatingLabelText="*Date"
                 onChange = {(event,newValue) => this.setState({date:newValue})}
                 style={styles.textFieldStyle}
               />
             </div>
             <div style={styles.textCellStyle}>
               <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle} />
               <TextField
                 hintText="__am/pm"
                 floatingLabelText="*Time"
                 onChange = {(event,newValue) => this.setState({time:newValue})}
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

  showIC = () => {

    if(this.state.flag == 8)
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

  createICFunc(event){
    var that = this;
    var apiUrl = baseUrl + icGenerateUrl;

    if(
      that.state.order_number == '' ||
      that.state.quantity_offered == '' ||
      that.state.quantity_approved == '' ||
      that.state.location_of_seal == '' ||
      that.state.inspection_date == '' ||
      that.state.ic_signed_on == '' ||
      that.state.inspector_name == '' ||
      that.state.inspector_mobile == '' ||
      that.state.quantity_on_order == '' ||
      that.state.quantity_supplied_so_far == '' ||
      that.state.balance_quantity == '' ||
      that.state.unit_price == '' ||
      that.state.materials_offered_date == ''
    ){
      alert("Required fields shouldn't be empty!!");
      return;
    }

    if(that.state.ic_signed_on.charAt(4) != '-' || that.state.ic_signed_on.charAt(7) != '-'){
      alert("Date should be in the YYYY-MM-DD format!!");
      that.setState({flag : 7});
      return;
    }
    if(that.state.inspection_date.charAt(4) != '-' || that.state.inspection_date.charAt(7) != '-'){
      alert("Date should be in the YYYY-MM-DD format!!");
      that.setState({flag : 7});
      return;
    }
    if(that.state.materials_offered_date.charAt(4) != '-' || that.state.materials_offered_date.charAt(7) != '-'){
      alert("Date should be in the YYYY-MM-DD format!!");
      that.setState({flag : 7});
      return;
    }

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl, {
      "order_number" :      that.state.order_number,
      "quantity_offered":   that.state.quantity_offered,
      "quantity_approved":  that.state.quantity_approved,
      "location_of_seal" :  that.state.location_of_seal,
      "inspection_date" :   that.state.inspection_date,
      "ic_signed_on" :	   that.state.ic_signed_on,
      "inspector_name" :    that.state.inspector_name,
      "inspector_mobile" :	  that.state.inspector_mobile,
      "quantity_on_order" : that.state.quantity_on_order,
      "quantity_supplied_so_far" : that.state.quantity_supplied_so_far,
      "balance_quantity" : that.state.balance_quantity,
      "unit_price" :       that.state.unit_price,
      "remarks" :          that.state.remarks,
      "materials_offered_date" : that.state.materials_offered_date

    },{headers})
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        this.setState({
          quantity_offered: '',
          quantity_approved:'',
          location_of_seal:'',
          inspection_date:'',
          ic_signed_on:'',
          inspector_name:'',
          inspector_mobile:'',
          quantity_on_order:'',
          quantity_supplied_so_far:'',
          balance_quantity:'',
          unit_price:'',
          remarks:'',
          materials_offered_date:''
        });
        var body = {
          "order_number": that.state.order_number,
          "ic_id": response.data._id,
          "status" : "IC Generated"
        };
        that.updatePoStatus(body);
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
    if(that.state.corrigendum_number == '' || that.state.update_values == ''){
      alert("Required fields shouldn't be empty!!");
      return;
    }
    var apiUrl = baseUrl + generateCorrigendumUrl;
    var body = {
      corrigendum_number : that.state.corrigendum_number,
	    order_number :     	 that.state.order_number,
	    order_date : 		     that.state.order_date,
	    ic_id:               that.state.ic_id,
	    generated_by :       that.state._id,
      remarks :            that.state.remarks,
      update_values :    that.state.update_values
    };

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl,body,{headers})
    .then(response => {
       if(response.status == 200){
          that.setState({remarks : '', update_values:''});
          that.updateIC(that.state.order_number , that.state.ic_id , response.data._id);
         }
         else if(response.status == 204) {
           alert("Corrigendum is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

  updateIC(orderNumber,ic_id,corrigendum_id){

    var that = this;
    var apiUrl = baseUrl + updateICInfoUrl;

    axios.post(apiUrl,{
      "order_number": orderNumber,
      "ic_id" : ic_id,
      "corrigendum_id" : corrigendum_id
    })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        var corr_body = {
          "order_number": that.state.order_number,
          "status" : "Corrigendum Generated"
        };
        that.updatePoStatus(corr_body);
      }
    })
    .catch(function (error) {
      console.log(error.response);
      alert(error.response.data.message);
    });
  }

  getCorrigendum(corrigendum_id){

    var that = this;
    var apiUrl = baseUrl + oneCorrigendumUrl + corrigendum_id;

    console.log(apiUrl);
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
    let item_status = '';
    if(that.state.selectedItemStatusPos == '0'){
      item_status = "Pass";
    }
    else {
      item_status = "Fail";
    }
    var body = {
	    order_number :       that.state.order_number,
	    item_status:         item_status,
	    report_status :  	   report_status
    };

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl,body,{headers})
    .then(response => {
      console.log(response);
       if(response.status == 200){
            if(report_status == "Partial")
            {
              that.removeVisit(that.state.order_number,that.state.vendor_code,"IR Partial");
            }
            else if(item_status == "Pass")
            {
              var body1 = {
                "order_number": that.state.order_number,
                "status" : "Passed"
              };
              that.updatePoStatus(body1);
            }
            else if(item_status == "Fail")
            {
              that.removeVisit(that.state.order_number,that.state.vendor_code,"Rejected");
            }
          //alert("Inspection_Report generated successfully!");
         }
         else if(response.status == 204) {
           alert("Inspection_Report is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

  removeVisit(orderNumber,vendor_code,status)
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
              "status" : status
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
  fetchAllEntities(type,userId){

    var that = this;
    let apiUrl = baseUrl;

    if(type == "Vendor"){
      apiUrl += allVendorUrl;
    }
    else if(type == "Purchase_Order"){
      apiUrl = apiUrl + inspectorPOUrl + userId;
    }
    else if(type == "AllIC"){
      apiUrl += allIcUrl + userId;
    }

    const headers = {
      SECURITY_TOKEN: that.state._id
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
      else if(response.status == 200 && type == "AllIC"){
        that.setState({ responseDataArray : response.data, flag :8});
      }

    })
    .catch(error => {
      console.log(error.response);
      alert(error.response.data.message);
    });

  }

  generateVisit(event){

    var that = this;

    if(that.state.date == '' || that.state.time == ''){
      alert("Required fields shouldn't be empty!!");
      return;
    }
    var apiUrl = baseUrl + addVisitUrl;
    var body = {
      order_number :  that.state.order_number,
	    date : 	    	  that.state.date,
	    time:           that.state.time,
	    inspector_id:   that.state._id,
      vendor_code :   that.state.vendor_code,
      visit_status :  "Intimated"
    };

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl,body,{headers})
    .then(response => {
       if(response.status == 200){
         console.log(response);
         that.setState({date : '', time: ''});
         var body1 = {
           "order_number": that.state.order_number,
           "status" : "Intimated"
         };
          that.updatePoStatus(body1);
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

  updatePoStatus(body){

    var that = this;
    var apiUrl = baseUrl + updatePOInfoUrl;

    axios.post(apiUrl,body)
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

  updateVisitStatus(status,orderNumber,vendor_code){

    var that = this;
    var apiUrl = baseUrl + updateVisitInfoUrl ;

    const headers = {
      SECURITY_TOKEN: that.state._id
    };

    axios.post(apiUrl,{
      "order_number": orderNumber,
      "vendor_code" : vendor_code,
      "visit_status" : status
    },{headers})
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
        var body = {
          "order_number": orderNumber,
          "status" : status
        };
        that.updatePoStatus(body);
      }
      else if(response.status == 204) {
        alert("Visit to be updated is not present!");
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
  ICLabel:{
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#FF1493',
    fontSize : '20px'
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
  opaqueTextStyle:{
    marginLeft : 15,
    color : '#C0C0C0'
  },
  textCellStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  signedOnStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent: 'flex-end',
    margin: 10,
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
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems : 'left',
    marginLeft : '60px'
  },
  corriStyle: {
    margin: 15,
    padding: 8,
    paddingRight:8,
    boxShadow : '1px 3px 5px #A9A9A9',
    border : '1px solid #D3D3D3'
  },
areaStyle: {
    margin: 15,
    padding: 4,
    boxShadow : '1px 3px 5px #A9A9A9',
    border : '1px solid #D3D3D3'
  },
  buttonContainerStyle: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    margin: 12
  }
};
