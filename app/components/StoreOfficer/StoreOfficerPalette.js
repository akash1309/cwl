import React, { Component } from 'react';
import * as MaterialIcon from 'react-icons/lib/md';

export default class StoreOfficerPalette extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ width: '280px', backgroundColor: '#f7f1e3', padding: '20px' , height : '100%'}}>

        <a onClick={this.props.onClickPurchaseOrders} style={styles.innerContainerStyle}>
          <MaterialIcon.MdChromeReaderMode size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Purchase Orders</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickPlacePurchaseOrder} style={styles.innerContainerStyle}>
          <MaterialIcon.MdAddShoppingCart size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Place Purchase Order</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickIntimateDycee} style={styles.innerContainerStyle}>
          <MaterialIcon.MdContactMail size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Intimate DyCEE</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickVendors} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPerson size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Vendors</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickItems} style={styles.innerContainerStyle}>
          <MaterialIcon.MdShoppingBasket size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Items</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickAddVendor} style={styles.innerContainerStyle}>
          <MaterialIcon.MdPersonAdd size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Add Vendor</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickAddItem} style={styles.innerContainerStyle}>
          <MaterialIcon.MdAddToQueue size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Add Item</span>
        </a>
        <div style={styles.dividerStyle}/>

        <a onClick={this.props.onClickDeleteItem} style={styles.innerContainerStyle}>
          <MaterialIcon.MdDeleteForever size={styles.iconSize} style={styles.iconStyle}/>
          <span style={styles.textStyle}>Delete Item</span>
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
