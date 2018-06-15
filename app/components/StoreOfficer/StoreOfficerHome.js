import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import { withStyles } from '@material-ui/core/styles';
import { baseUrl ,  allVendorUrl ,addPurchaseOrderUrl ,addVendorUrl, allPurchaseOrderUrl, getInfoUrl, updateInfoUrl ,addItemUrl , allItemUrl } from './../../config/url';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField,IconButton, SvgIcon,
} from 'material-ui';

const GitHubIcon = (props) => (
    <SvgIcon {...props}>
        {<path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>}
    </SvgIcon>
);


const style = {
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
    margin: '5px 5px 5px 5px',
  },
  rowC : {
    display : 'flex',
    'flex-direction' : 'row'
  },
  row : {
    display : 'flex',
    'flex-direction' : 'column'
  }
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize : 14
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class StoreOfficerHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    getall : [],
    length : 0,
    _id : props.location.state._id,
    name : '',
    email : '',
    mobile : '',
    location : '',
    password : '',
    flag : -1,
    open : false ,
    order_number : '' ,
    order_date : '' ,
    itemdetails : {} ,
    specification:  '',
    quantity_rate:  '',
    duties_charges: '',
    delivery_date:  '',
    vendor_info : {} ,
    code:     '',
    email :   '',
    address : '',
    tender_info : {} ,
    tender_no:     '',
    tender_type:   '',
    opened_on :    '',
    offer_no : '' ,
    offer_date : '',
    flag : 0,
    location : '',
    role : "Vendor",
    model_number : '',
    name  :       '',
    quantity:      ''
   }
   this._toggle = this._toggle.bind(this);

 };

 _toggle(e) {
   var status = this.state.open;
   if(status == false) {
     status = true
   }
   else {
     status = false
   }
   this.setState({open : status});
   console.log(status);
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar title="StoreOfficer Home" iconElementLeft={
            <IconButton
              onClick={ this._toggle } >
              <GitHubIcon />
              </IconButton>
          } />

          { this.state.open == true ?
         <Paper style={style.paper}>
             <Menu ref="Menu" disableAutoFocus={true}>
             <MenuItem primaryText="Place Purchase_Order" leftIcon={<RemoveRedEye />}  onClick={(event) => {this.setState( {flag : 1 , open : !this.state.open }) }} />
             <MenuItem primaryText="Intimate_DyCee" leftIcon={<RemoveRedEye />} />
             <Divider />
             <MenuItem primaryText="All Vendors" leftIcon={<RemoveRedEye />} onClick={(event) => {this.getall(event,"Vendor")} } />
             <MenuItem primaryText="All Items" leftIcon={<RemoveRedEye />} onClick={(event) => {this.getall(event,"AllItems")} }/>
             <MenuItem primaryText="All Purchase Orders" leftIcon={<RemoveRedEye />} onClick={(event) => {this.getall(event,"Purchase_Order")} }  />
             <Divider />
             <MenuItem primaryText="Add Vendor" leftIcon={<PersonAdd />} onClick={(event) => {this.setState({flag : 3, open : !this.state.open }) }}/>
             <MenuItem primaryText="Add Items" leftIcon={<PersonAdd />} onClick={(event) => {this.setState({flag : 7, open : !this.state.open }) }}/>
             <Divider />
             <MenuItem primaryText="Delete Items" leftIcon={<Delete />} />
             <MenuItem primaryText="Cancel Purchase_Order" leftIcon={<RemoveRedEye />} />
             <Divider />
             <MenuItem primaryText="Update My_Infomation" leftIcon={<ContentLink />} onClick={(event) => this.getPreviousInfo(event)}/>

           </Menu>
         </Paper>
         : null
         }

         { this.state.flag == 2 ?

          <div>
          <Table style={style.tablediv}>
            <TableHead>
               <TableRow>
                 <CustomTableCell width="25%">Id</CustomTableCell>
                 <CustomTableCell width="15%">Name</CustomTableCell>
                 <CustomTableCell width="25%">Email</CustomTableCell>
                 <CustomTableCell width="15%">Mobile</CustomTableCell>
                 <CustomTableCell width="15%">Location</CustomTableCell>
               </TableRow>
             </TableHead>

             {this.rowsHandler("Vendor")}


          </Table>
          </div>
         : null }


          {
             this.state.flag == 1 ?
              <div>
               <MuiThemeProvider>
                 <div>
                   <div style={styles.outerContainerStyle}>
                     <div style={styles.innerContainerStyle}>
                     <TextField
                       hintText="storeofficer_id"
                       floatingLabelText="storeofficer_id"
                       value = {this.state._id}
                       style={{ marginTop: 10 }}
                     />


                       <div style={style.rowC}>
                         <div style={style.row}>
                           <TextField
                             hintText="Order_Number"
                             floatingLabelText="Order_Number"
                             onChange = {(event,newValue) => this.setState({order_number:newValue })}
                             style={{ marginTop: 10 }}
                           />
                           <TextField
                             hintText="Order_Date"
                             floatingLabelText="Order_Date"
                             onChange = {(event,newValue) => this.setState({order_date:newValue})}
                             style={{ marginTop: 10 }}
                           />
                         </div>
                         <div style = {{marginLeft : 30}} >
                           <TextField
                             hintText="Item Specification"
                             floatingLabelText="Specification"
                             name="specification"
                             multiLine={true}
                             rows={3}
                             rowsMax={5}
                             onChange = {(event,newValue) => this.setState({specification:newValue })}
                             style={{ marginTop: 10 }}
                           />
                           <TextField
                             hintText="Quantity/Rate"
                             floatingLabelText="Quantity/Rate"
                             onChange = {(event,newValue) => this.setState({quantity_rate:newValue })}
                             style={{ marginTop: 10 }}
                           />
                           <TextField
                             hintText="Duties/Charges"
                             floatingLabelText="Duties/Charges"
                             onChange = {(event,newValue) => this.setState({duties_charges:newValue })}
                             style={{ marginTop: 10 }}
                           />
                           <TextField
                             hintText="Delivery Date"
                             floatingLabelText="Delivery Date"
                             onChange = {(event,newValue) => this.setState({delivery_date:newValue })}
                             style={{ marginTop: 10 }}
                           />
                         </div>
                       </div>

                       <div style={style.rowC}>
                         <div>
                           <TextField
                             hintText="Vendor code"
                             floatingLabelText="Code"
                             onChange = {(event,newValue) => this.setState({code:newValue })}
                             style={{ marginTop: 10 }}
                           />
                           <TextField
                             hintText="Email"
                             floatingLabelText="Email"
                             onChange = {(event,newValue) => this.setState({email:newValue })}
                             style={{ marginTop: 10 }}
                           />
                           <TextField
                             hintText="Address"
                             floatingLabelText="Address"
                             multiLine={true}
                             rows={3}
                             rowsMax={5}
                             onChange = {(event,newValue) => this.setState({address:newValue })}
                             style={{ marginTop: 10, marginRight : 30 }}
                           />
                         </div>
                         <div>
                         <TextField
                           hintText="Tender number"
                           floatingLabelText="Tender number"
                           onChange = {(event,newValue) => this.setState({tender_no:newValue })}
                           style={{ marginTop: 10 }}
                         />
                         <TextField
                           hintText="Tender type"
                           floatingLabelText="Tender type"
                           onChange = {(event,newValue) => this.setState({tender_type:newValue })}
                           style={{ marginTop: 10 }}
                         />
                         <TextField
                           hintText="Opened on"
                           floatingLabelText="Opened on"
                           onChange = {(event,newValue) => this.setState({opened_on:newValue })}
                           style={{ marginTop: 10 }}
                         />
                         </div>
                       </div>

                       <div style={style.rowC}>

                           <TextField
                             hintText="Offer_No"
                             floatingLabelText="Offer_No"
                             onChange = {(event,newValue) => this.setState({offer_no:newValue })}
                             style={{ marginTop: 10 , marginRight : 30}}
                           />
                           <TextField
                             hintText="Offer_Date"
                             floatingLabelText="Offer_Date"
                             onChange = {(event,newValue) => this.setState({offer_date:newValue })}
                             style={{ marginTop: 10 }}
                           />
                       </div>

                       <br/>
                       <RaisedButton label="Place Order" primary={true} style={styles.buttonStyle} onClick={(event) => {this.place_order(event)}} />


                     </div>
                   </div>
                 </div>
               </MuiThemeProvider>
             </div>


                     : null
           }

           {
             this.state.flag == 3 ?
             <div>
               <MuiThemeProvider>
                 <div>
                   <div style={styles.outerContainerStyle}>
                     <div style={styles.innerContainerStyle}>
                     <TextField
                       hintText="storeofficer_id"
                       floatingLabelText="storeofficer_id"
                       value = { this.state._id }
                       style={{ marginTop: 10 }}
                     />
                       <TextField
                         hintText="Name"
                         floatingLabelText="Name"
                         errorText="This field is required"
                         onChange = {(event,newValue) => this.setState({name:newValue})}
                         style={{ marginTop: 10 }}
                       />
                       <TextField
                         hintText="Email"
                         floatingLabelText="Email"
                         errorText="This field is required"
                         onChange = {(event,newValue) => this.setState({email:newValue })}
                         style={{ marginTop: 10 }}
                       />
                       <TextField
                         hintText="Mobile"
                         floatingLabelText="Mobile"
                         errorText="This field is required"
                         onChange = {(event,newValue) => this.setState({mobile:newValue})}
                         style={{ marginTop: 10 }}
                       />
                       <TextField
                         hintText="Location"
                         floatingLabelText="Location"
                         errorText="This field is required"
                         onChange = {(event,newValue) => this.setState({location:newValue})}
                         style={{ marginTop: 10 }}
                       />
                       <TextField
                         defaultValue= {this.state.role}
                         style={{ marginTop: 10 }}
                       />
                       <br/>
                       <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.addVendor(event)}} />

                     </div>
                   </div>
                 </div>
               </MuiThemeProvider>
             </div>
           //  this.state.dycee = false

                     : null
           }

           { this.state.flag == 4 ?
           <div style={styles.outerContainerStyle}>
             <div style={styles.innerContainerStyleUpdate}>
             <div>
             <span className="glyphicon glyphicon-check" aria-hidden="true" />
             <TextField
               hintText="Enter Dycee id"
               floatingLabelText="Id"
               value = {this.state._id}
               style={{ marginLeft: 10 ,marginRight : 10, marginTop : 5}}
             />
             </div>
             <div>
             <span className="glyphicon glyphicon-user" aria-hidden="true" />
             <TextField
               hintText="Enter name"
               floatingLabelText="Name"
               value = {this.state.name}
               onChange = {(event,newValue) => this.setState({name:newValue})}
               style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
             />
             </div>
             <div>
             <span className="glyphicon glyphicon-lock" aria-hidden="true" />
             <TextField
               hintText="Enter password"
               floatingLabelText="Password"
               value = {this.state.password}
               onChange = {(event,newValue) => this.setState({password:newValue})}
               style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
             /></div>
             <div>
             <span className="glyphicon glyphicon-phone" aria-hidden="true" />
             <TextField
               hintText="Enter mobile number"
               floatingLabelText="Mobile Number"
               value = {this.state.mobile}
               onChange = {(event,newValue) => this.setState({mobile:newValue})}
               style={{marginLeft: 10 ,marginRight : 10, marginTop : 2 }}
             /></div>
             <div>
             <span className="glyphicon glyphicon-envelope" aria-hidden="true" />
             <TextField
               hintText="Enter email"
               floatingLabelText="Email"
               value = {this.state.email}
               onChange = {(event,newValue) => this.setState({email:newValue})}
               style={{ marginLeft: 10 ,marginRight : 10, marginTop : 2}}
             /></div>
             <div>
             <span className="glyphicon glyphicon-globe" aria-hidden="true" />
             <TextField
               hintText="Enter location"
               floatingLabelText="Location"
               value = {this.state.location}
               onChange = {(event,newValue) => this.setState({location:newValue})}
               style={{marginLeft: 10 ,marginRight : 10, marginTop : 2}}
             /></div>
             <RaisedButton label="UPDATE" primary={true} style={styles.buttonStyle} onClick={(event) => this.updateInfo(event)}/>

             </div>
           </div>
           : null
         }


         { this.state.flag == 6 ?

          <div>
          <Table style={style.tablediv}>
            <TableHead>
               <TableRow>
                 <CustomTableCell width="25%">Model_number</CustomTableCell>
                 <CustomTableCell width="15%">Item Name</CustomTableCell>
                 <CustomTableCell width="25%">Quantity</CustomTableCell>
                 </TableRow>
             </TableHead>

             {this.rowsHandler("AllItems")}


          </Table>
          </div>
         : null }


         { this.state.flag == 5 ?

          <div>
          <Table style={style.tablediv}>
            <TableHead>
               <TableRow>
                 <CustomTableCell width="15%">Order_Number</CustomTableCell>
                 <CustomTableCell width="15%">Order_Date</CustomTableCell>
                 <CustomTableCell width="25%">Item_Details</CustomTableCell>
                 <CustomTableCell width="25%">Tender_Info</CustomTableCell>
                 <CustomTableCell width="25%">Vendor_Info</CustomTableCell>
                 <CustomTableCell width="15%">Offer_No</CustomTableCell>
                 <CustomTableCell width="15%">Offer_Date</CustomTableCell>
               </TableRow>
             </TableHead>

             {this.rowsHandler("Purchase_Order")}


          </Table>
          </div>
         : null }

         {
           this.state.flag == 7 ?
           <div>
             <MuiThemeProvider>
               <div>
                 <div style={styles.outerContainerStyle}>
                   <div style={styles.innerContainerStyle}>
                     <TextField
                       hintText="Model_number"
                       floatingLabelText="Model_number"
                       onChange = {(event,newValue) => this.setState({model_number:newValue})}
                       style={{ marginTop: 10 }}
                     />
                     <TextField
                       hintText="Name"
                       floatingLabelText="Name"
                       onChange = {(event,newValue) => this.setState({name:newValue })}
                       style={{ marginTop: 10 }}
                     />
                     <TextField
                       hintText="Quantity"
                       floatingLabelText="Quantity"
                       onChange = {(event,newValue) => this.setState({quantity:newValue})}
                       style={{ marginTop: 10 }}
                     />
                     <br/>
                     <RaisedButton label="ADD" primary={true} style={styles.buttonStyle} onClick={(event) => {this.addItems(event)}} />

                   </div>
                 </div>
               </div>
             </MuiThemeProvider>
           </div>
         //  this.state.dycee = false

                   : null
         }

          </div>
        </MuiThemeProvider>
      </div>

    );
  }

  addVendor(event){
    var that=this;
    var apiUrl=baseUrl + addVendorUrl;
    axios.post(apiUrl,{
        "name" : that.state.name ,
        "mobile" : that.state.mobile,
        "email" : that.state.email,
        "role" : that.state.role,
        "_id" : that.state._id,
        "location" : that.state.location
    })
   .then(response => {
       if(response.status == 200){
          alert("Vendor added successfully!");
         }
         else if(response.status == 204) {
           alert("Vendor is already present!");
         }
      })
   .catch(error => {
     alert(error.response.data.message);
   });

  }

  addItems(event){
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

    var _itemdetails = '{ "specification" : "'+that.state.specification+'" , "quantity_rate" : "'+that.state.quantity_rate+'" , "duties_charges" : "'+that.state.duties_charges+'" , "delivery_date" : "'+that.state.delivery_date+'" }';
    var _vendor_info = '{ "code" : "'+that.state.code+'" , "email" : "'+that.state.email+'" , "address" : "'+that.state.address+'" }';
    var _tender_info = '{ "tender_no" : "'+that.state.tender_no+'" , "tender_type" : "'+that.state.tender_type+'" , "opened_on" : "'+that.state.opened_on+'" }';

    that.setState({itemdetails : JSON.parse(_itemdetails) , vendor_info : JSON.parse(_vendor_info) , tender_info : JSON.parse(_tender_info)});
    axios.post(apiUrl,{
        "order_number" : that.state.order_number ,
        "order_date" :  that.state.order_date,
        "itemdetails" : that.state.itemdetails,
        "vendor_info" : that.state.vendor_info,
        "tender_info" : that.state.tender_info,
        "offer_no" :    that.state.offer_no,
        "offer_date" : that.state.offer_date,
        "storeofficer_id" : that.state._id
    })
   .then(response => {
       if(response.status == 200){
          alert("Order placed successfully!");
         }
         else if(response.status == 204) {
           alert("Order is already present!");
         }
      })
   .catch(error => {
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
          that.setState({name : response.data.name , email : response.data.email, mobile : response.data.mobile, location : response.data.location, password : response.data.password, flag:4});

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


  getall(event,type){

  var that = this;
  that.setState({ open : !that.state.open });
  let apiUrl = baseUrl;
  if(type == "Vendor")
  {
    apiUrl += allVendorUrl;
  }
  else if(type == "Purchase_Order")
  {
    apiUrl += allPurchaseOrderUrl;
  }
  else if(type == "AllItems")
  {
    apiUrl += allItemUrl;
  }

  console.log(apiUrl);
  axios.get(apiUrl)
  .then( response => {
    console.log(response);
    if(response.status == 200 && type == "Vendor"){
      that.setState({ getall : response.data , length : response.data.length  , flag :2});
    }
    else if(response.status == 200 && type == "Purchase_Order"){
      that.setState({ getall : response.data , length : response.data.length  , flag :5});
    }
    else if(response.status == 200 && type == "AllItems"){
      that.setState({ getall : response.data , length : response.data.length  , flag :6});
    //);
  }
})
  .catch(error => {
    console.log(error.response);
    alert(error.response.data.message);
  });

  }

  singlerowHandler(i,type) {
    var cells = [];
    if(type == "Vendor")
    {
      cells.push(<CustomTableCell width="25%">{this.state.getall[i]._id}</CustomTableCell>)
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].name}</CustomTableCell>)
      cells.push(<CustomTableCell width="25%">{this.state.getall[i].email}</CustomTableCell>)
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].mobile}</CustomTableCell>)
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].location}</CustomTableCell>)
    }
    else if(type == "Purchase_Order")
    {
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].order_number}</CustomTableCell>)
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].order_date}</CustomTableCell>)
      cells.push(<CustomTableCell width="25%">{"Specification : "+this.state.getall[i].itemdetails["specification"]} <br/> {"Quantity_rate : "+this.state.getall[i].itemdetails["quantity_rate"]} <br/> {"Duties_charges : "+this.state.getall[i].itemdetails["duties_charges"]} <br/> {"Delivery_date : "+this.state.getall[i].itemdetails["delivery_date"]}</CustomTableCell>)
      cells.push(<CustomTableCell width="25%">{"Tender_number : "+this.state.getall[i].tender_info["tender_no"]} <br/> {"Tender_type : "+ this.state.getall[i].tender_info["tender_type"]} <br/> {"Opened_on : "+this.state.getall[i].tender_info["opened_on"]}</CustomTableCell>)
      cells.push(<CustomTableCell width="25%">{"Code : "+this.state.getall[i].vendor_info["code"]} <br/> {"Email : "+this.state.getall[i].vendor_info["email"]} <br/> {"Address : "+this.state.getall[i].vendor_info["address"]}</CustomTableCell>)
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].offer_no}</CustomTableCell>)
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].offer_date}</CustomTableCell>)

    }
    else if(type == "AllItems")
    {
      cells.push(<CustomTableCell width="25%">{this.state.getall[i].model_number}</CustomTableCell>)
      cells.push(<CustomTableCell width="15%">{this.state.getall[i].name}</CustomTableCell>)
      cells.push(<CustomTableCell width="25%">{this.state.getall[i].quantity}</CustomTableCell>)
    }

    return <TableRow>{cells}</TableRow>
  }
  rowsHandler(type)
  {
    var cells = [];
    var i;
    for(i=0; i<this.state.getall.length ;i++)
    {
      cells.push(this.singlerowHandler(i,type))
    }
    return <TableBody>{cells}</TableBody>;
  }

}


const styles = {
  outerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width : '1000px',
    height :'1000px'
  },
  innerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #00BCD4',
    borderRadius: 25,
    margin: 70,
    padding: 30,
    width : '900px',
    height :'950px'
  },
  buttonStyle: {
    margin: 15
  }
};

export default StoreOfficerHome ;
