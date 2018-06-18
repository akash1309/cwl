import React, { Component } from 'react';
import * as MaterialIcon from 'react-icons/lib/md';
import * as FaIcon from 'react-icons/lib/fa';


export default class DyCeePalette extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '280px', backgroundColor: '#f7f1e3', padding: '20px'}}>

        <a onClick={this.props.onClickItems} style={styles.innerContainerStyle}>
          <MaterialIcon.MdShoppingCart size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Items</span>
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

        <a onClick={this.props.onClickAddInspector} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPersonAdd size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Add Inspector</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickPurchaseOrder} style={styles.innerContainerStyle}>
          <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Purchase_Order</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickIC} style={styles.innerContainerStyle}>
          <MaterialIcon.MdReceipt size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>I.C.</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickCorrigendum} style={styles.innerContainerStyle}>
          <MaterialIcon.MdDescription size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Corrigendum Approval</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickApprovalLetter} style={styles.innerContainerStyle}>
          <MaterialIcon.MdAssignment size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Approval Letter</span>
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
