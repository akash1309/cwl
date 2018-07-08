import React, { Component } from 'react';
import * as MaterialIcon from 'react-icons/lib/md';

export default class VendorPalette extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.outerContainerStyle}>

        <a onClick={this.props.onClickPurchaseOrders} style={styles.innerContainerStyle}>
          <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Purchase Orders</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickVisits} style={styles.innerContainerStyle}>
          <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Visits</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickProfile} style={styles.innerContainerStyle}>
          <MaterialIcon.MdFace size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>My Profile</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickLogout} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPowerSettingsNew size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Logout</span>
        </a>
        <div style={styles.dividerStyle}/>

      </div>
    );
  }
}

const styles = {
  outerContainerStyle: {
    width: '280px',
    backgroundColor: '#f7f1e3',
    padding: '20px',
    paddingBottom: '0px',
    marginRight: '10px',
    height : '100vh'
  },
  innerContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px',
    width: '100%',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  textStyle: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    marginLeft: '24px'
  },
  dividerStyle: {
    height: '1px',
    backgroundColor: '#d1ccc0'
  },
  iconSize: 18
};
