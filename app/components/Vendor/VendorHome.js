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

import axios from 'axios';
import {
  AppBar,
  RaisedButton,
  TextField
} from 'material-ui';


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
};

class VendorHome extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
            title="Vendor Home"
          />
          <Paper style={style.paper}>
            <Menu ref="Menu" disableAutoFocus={true}>
              <MenuItem primaryText="All Items" leftIcon={<RemoveRedEye />}  onClick={(event) => {this.allDyCee(event,"DyCEE") }}/>
              <MenuItem primaryText="All Orders" leftIcon={<RemoveRedEye />} onClick={(event) => {this.allDyCee(event,"StoreOfficer")} } />
              <MenuItem primaryText="All Inspection_Calls" leftIcon={<RemoveRedEye />} onClick={(event) => {this.allDyCee(event,"Inspector")} } />
               <Divider />
               <MenuItem primaryText="I.C." leftIcon={<RemoveRedEye />} onClick={(event) => {this.allDyCee(event,"Vendor")} } />
               <MenuItem primaryText="Request for Amendment" leftIcon={<RemoveRedEye />} onClick={(event) => {this.allDyCee(event,"Vendor")} } />
              <Divider />
              <MenuItem primaryText="Update My_Infomation" leftIcon={<PersonAdd />} />
            </Menu>
        </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default VendorHome ;
