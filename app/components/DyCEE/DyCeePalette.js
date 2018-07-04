import React, { Component } from 'react';
import * as MaterialIcon from 'react-icons/lib/md';


export default class DyCeePalette extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '280px', backgroundColor: '#f7f1e3', padding: '20px', height : '100vh'}}>

        <a onClick={this.props.onClickPurchaseOrder} style={styles.innerContainerStyle}>
          <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Purchase Orders</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickVendors} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPeopleOutline size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Vendors</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickInspectors} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPeople size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Inspectors</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickStoreOfficers} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPeople size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>StoreOfficers</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickAddInspector} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPersonAdd size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Add Inspector</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickAddStoreOfficer} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPersonAdd size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Add StoreOfficer</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickProfile} style={styles.innerContainerStyle}>
          <MaterialIcon.MdFace size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>My Profile</span>
        </a>
        <div style={styles.dividerStyle}/>

      </div>
    );
  }
}

const styles = {
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
