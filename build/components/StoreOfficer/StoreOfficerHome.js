'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _md = require('react-icons/lib/md');

var MaterialIcon = _interopRequireWildcard(_md);

var _StoreOfficerPalette = require('./StoreOfficerPalette');

var _StoreOfficerPalette2 = _interopRequireDefault(_StoreOfficerPalette);

var _materialUi = require('material-ui');

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _url = require('./../../config/url');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreOfficerHome = function (_React$Component) {
  _inherits(StoreOfficerHome, _React$Component);

  function StoreOfficerHome(props) {
    _classCallCheck(this, StoreOfficerHome);

    var _this = _possibleConstructorReturn(this, (StoreOfficerHome.__proto__ || Object.getPrototypeOf(StoreOfficerHome)).call(this, props));

    _this.deletePurchaseOrder = function () {
      _this.cancelPOFunc();
    };

    _this.handleClose = function () {
      _this.setState({ open: false });
    };

    _this.handleChange = function (event, index, value) {
      _this.setState({ selectedVendorPos: value });
    };

    _this.cancelPOconfirmation = function () {

      var actions = [_react2.default.createElement(_materialUi.FlatButton, {
        label: 'Back',
        primary: true,
        onClick: _this.handleClose
      }), _react2.default.createElement(_materialUi.FlatButton, {
        label: 'Delete',
        primary: true,
        keyboardFocused: true,
        onClick: _this.deletePurchaseOrder
      })];

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _materialUi.Dialog,
          {
            title: 'Delete Purchase Order',
            actions: actions,
            modal: false,
            open: _this.state.open,
            onRequestClose: _this.handleClose
          },
          'Are you sure you want to delete the purchase order ?'
        )
      );
    };

    _this.placePurchaseOrder = function () {

      if (_this.state.flag == 1) {
        var items = [];
        for (var i = 0; i < _this.state.vendors_info.length; i++) {
          items.push(_react2.default.createElement(_MenuItem2.default, { value: i, key: i, primaryText: _this.state.vendors_info[i].vendor_code + " " + _this.state.vendors_info[i].name }));
        }
        return _react2.default.createElement(
          'div',
          { style: styles.outerContainerStyle },
          _react2.default.createElement(
            'span',
            { style: styles.headingStyle },
            'Place Purchase Order'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.innerContainerStyle },
            _react2.default.createElement(
              'span',
              { style: styles.textLabel },
              'Order Details:'
            ),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Order_Number',
                  floatingLabelText: '*Order_Number',
                  value: _this.state.order_number,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ order_number: newValue });
                  },
                  style: styles.textFieldStyle
                })
              ),
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'YYYY-MM-DD',
                  floatingLabelText: '*Order_Date',
                  value: _this.state.order_date,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ order_date: newValue });
                  },
                  style: styles.textFieldStyle
                })
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('div', { style: styles.dividerStyle }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'span',
              { style: styles.textLabel },
              'Item Details:'
            ),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Item Specification',
                  floatingLabelText: '*Specification',
                  name: 'specification',
                  multiLine: true,
                  rows: 6,
                  rowsMax: 6,
                  value: _this.state.specification,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ specification: newValue });
                  },
                  style: styles.corriStyle
                })
              ),
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Quantity/Rate',
                  floatingLabelText: '*Quantity/Rate',
                  value: _this.state.quantity_rate,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ quantity_rate: newValue });
                  },
                  style: styles.textFieldStyle
                }),
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Duties/Charges',
                  floatingLabelText: '*Duties/Charges',
                  value: _this.state.duties_charges,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ duties_charges: newValue });
                  },
                  style: styles.textFieldStyle
                }),
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'YYYY-MM-DD',
                  floatingLabelText: '*Delivery Date',
                  value: _this.state.delivery_date,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ delivery_date: newValue });
                  },
                  style: styles.textFieldStyle
                })
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('div', { style: styles.dividerStyle }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(
                  'span',
                  { style: styles.textLabel },
                  'Vendor Details:'
                ),
                _react2.default.createElement(
                  _SelectField2.default,
                  {
                    value: _this.state.selectedVendorPos,
                    onChange: _this.handleChange,
                    maxHeight: 200
                  },
                  items
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(
                  'span',
                  { style: styles.textLabel },
                  'Tender Details:'
                ),
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Tender number',
                  floatingLabelText: '*Tender number',
                  value: _this.state.tender_no,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ tender_no: newValue });
                  },
                  style: styles.textFieldStyle
                }),
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Tender type',
                  floatingLabelText: '*Tender type',
                  value: _this.state.tender_type,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ tender_type: newValue });
                  },
                  style: styles.textFieldStyle
                }),
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'YYYY-MM-DD',
                  floatingLabelText: '*Opened on',
                  value: _this.state.opened_on,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ opened_on: newValue });
                  },
                  style: styles.textFieldStyle
                })
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('div', { style: styles.dividerStyle }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'span',
              { style: styles.textLabel },
              'Offer Details:'
            ),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Offer_No',
                  floatingLabelText: '*Offer_No',
                  value: _this.state.offer_no,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ offer_no: newValue });
                  },
                  style: styles.textFieldStyle
                })
              ),
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'YYYY-MM-DD',
                  floatingLabelText: '*Offer_Date',
                  value: _this.state.offer_date,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ offer_date: newValue });
                  },
                  style: styles.textFieldStyle
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30 } },
              _this.state.update == 1 ? _react2.default.createElement(_materialUi.RaisedButton, { label: 'Place Order', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                  _this.place_order(event);
                } }) : null,
              _this.state.update == 2 ? _react2.default.createElement(_materialUi.RaisedButton, { label: 'Update Order', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                  _this.updatePO(event);
                } }) : null
            )
          )
        );
      }
    };

    _this.showVendors = function () {

      if (_this.state.flag == 3) return _react2.default.createElement(
        'div',
        { style: { flex: 1 } },
        _react2.default.createElement(
          'div',
          { style: styles.outerContainerStyle },
          _react2.default.createElement(
            'span',
            { style: styles.headingStyle },
            'List of Vendors'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.itemHeaderContainer },
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'S.No.'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'Code'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'Name'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'Email'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'Mobile'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'Address'
          )
        ),
        _this.state.responseDataArray.map(function (member, key) {
          return _react2.default.createElement(
            'div',
            { style: styles.itemContainer },
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              key + 1
            ),
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              member.vendor_code
            ),
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              member.name
            ),
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              member.email
            ),
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              member.mobile
            ),
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              member.address
            )
          );
        })
      );
    };

    _this.showPurchaseOrders = function () {

      var statusArray = ["IC Generated", "Approved", "Items Dispatched", "Items Accepted", "Items Rejected", "Amendment Requested", "Amendment Inspector Nominated", "Corrigendum Generated", "Finished"];

      if (_this.state.flag == 5) return _react2.default.createElement(
        'div',
        { style: { flex: 1 } },
        _react2.default.createElement(
          'div',
          { style: styles.outerContainerStyle },
          _react2.default.createElement(
            'span',
            { style: styles.headingStyle },
            'List of Purchase Orders'
          )
        ),
        _this.state.responseDataArray.map(function (member, key) {
          return _react2.default.createElement(
            'div',
            { style: styles.purchaseOrderContainer },
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'span',
                  { style: styles.textLabel },
                  'Order Number:'
                ),
                ' ',
                member.order_number
              ),
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'span',
                  { style: styles.textLabel },
                  'Status:'
                ),
                ' ',
                _react2.default.createElement(
                  'span',
                  { style: _this.getStatusStyle(member.status) },
                  member.status
                )
              )
            ),
            _react2.default.createElement('div', { style: styles.dividerStyle }),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(
                  'span',
                  { style: styles.textStyle },
                  'Order Details'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Order Date: ',
                  member.order_date
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Offer No: ',
                  member.offer_no
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Offer Date: ',
                  member.offer_date
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(
                  'span',
                  { style: styles.textStyle },
                  'Item Details'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Specification: ',
                  member.itemdetails.specification
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Quantity Rate: ',
                  member.itemdetails.quantity_rate
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Duties Charges: ',
                  member.itemdetails.duties_charges
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Delivery Date: ',
                  member.itemdetails.delivery_date
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(
                  'span',
                  { style: styles.textStyle },
                  'Vendor Details'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Code: ',
                  member.vendor_info.code
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Name: ',
                  member.vendor_info.name
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Email: ',
                  member.vendor_info.email
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Address: ',
                  member.vendor_info.address
                )
              ),
              member.inspected_by != undefined || member.inspected_by != null ? _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(
                  'span',
                  { style: styles.textStyle },
                  'Inspector Details'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Name: ',
                  member.inspected_by.name
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Mobile: ',
                  member.inspected_by.mobile
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Email: ',
                  member.inspected_by.email
                )
              ) : null,
              _react2.default.createElement(
                'div',
                { style: styles.boxStyle },
                _react2.default.createElement(
                  'span',
                  { style: styles.textStyle },
                  'Tender Details'
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'No: ',
                  member.tender_info.tender_no
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Type: ',
                  member.tender_info.tender_type
                ),
                _react2.default.createElement(
                  'span',
                  { style: styles.purchaseCell },
                  'Opened On: ',
                  member.tender_info.opened_on
                )
              )
            ),
            member.status == 'Initiated' ? _react2.default.createElement(
              'div',
              { style: styles.buttonPOContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, { label: 'Cancel Order', primary: true, style: styles.buttonStyle, onClick: function onClick() {
                  _this.handleOpen(member.order_number);
                } }),
              _react2.default.createElement(_materialUi.RaisedButton, { label: 'Update Order', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                  _this.getOrderInfo(event, member.order_number);
                } })
            ) : null,
            member.ic_id != undefined ? _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('div', { style: styles.dividerStyle }),
              _react2.default.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row', justifyContent: 'center' } },
                _react2.default.createElement(
                  'span',
                  { style: styles.textLabel },
                  'Latest Inspection Certificate Details'
                )
              ),
              _react2.default.createElement('div', { style: styles.dividerStyle }),
              _react2.default.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } },
                _react2.default.createElement(
                  'div',
                  { style: styles.icBoxStyle },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Quantity Offered: ',
                    member.ic_id.quantity_offered
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Quantity Accepted: ',
                    member.ic_id.quantity_approved
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Quantity On Order: ',
                    member.ic_id.quantity_on_order
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Quantity Supplied/Inspected So Far: ',
                    member.ic_id.quantity_supplied_so_far
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Balance Quantity: ',
                    member.ic_id.balance_quantity
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Date when materials were offered for inspection: ',
                    member.ic_id.materials_offered_date
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { style: styles.icBoxStyle },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Unit Price: ',
                    member.ic_id.unit_price
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Inspection Date: ',
                    member.ic_id.inspection_date
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'IC Signed On: ',
                    member.ic_id.ic_signed_on
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Inspecting Officer Name: ',
                    member.ic_id.inspector_name
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Inspecting Officer Mobile: ',
                    member.ic_id.inspector_mobile
                  ),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Remarks: ',
                    member.ic_id.remarks
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { style: { marginTop: 10, marginLeft: 60 } },
                _react2.default.createElement(
                  'span',
                  null,
                  'Location of Seal: ',
                  member.ic_id.location_of_seal
                )
              ),
              member.ic_id.rejection_reason != undefined ? _react2.default.createElement(
                'div',
                { style: { marginTop: 10, marginLeft: 60 } },
                _react2.default.createElement(
                  'span',
                  null,
                  'Rejection Reason: ',
                  member.ic_id.rejection_reason
                )
              ) : null,
              _react2.default.createElement(
                'div',
                { style: styles.buttonContainerStyle },
                _react2.default.createElement(_materialUi.RaisedButton, {
                  label: 'SEE ALL ICs',
                  primary: true,
                  style: styles.buttonStyle,
                  onClick: function onClick() {
                    return _this.fetchAllEntities("AllIC", member.order_number);
                  }
                })
              )
            ) : null,
            member.status == "Items Dispatched" ? _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(_materialUi.RaisedButton, { label: 'Accept Items', primary: true, style: styles.buttonStyle, onClick: function onClick() {
                  return _this.updatePoStatus("Items Accepted", member.order_number);
                } }),
              _react2.default.createElement(_materialUi.RaisedButton, { label: 'Reject Items', primary: true, style: styles.buttonStyle, onClick: function onClick() {
                  return _this.setState({ flag: 11, order_number: member.order_number, ic_id: member.ic_id._id });
                } })
            ) : null
          );
        })
      );
    };

    _this.showCorrigendumTable = function () {
      if (_this.state.corrigendum_flag == 1) return _react2.default.createElement(
        'div',
        { style: { border: '2px solid #989898', borderRadius: 4, boxShadow: '1px 3px 5px', padding: '20px', margin: '10px' } },
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' } },
          _react2.default.createElement(
            'span',
            { style: styles.corrigendumLabel },
            'Corrigendum Details'
          ),
          _react2.default.createElement(
            'span',
            { style: { flex: 1 } },
            _react2.default.createElement(
              'span',
              { style: { fontWeight: 'bold', color: '#000099' } },
              'Corrigendum No.: '
            ),
            _this.state.corrigendum_array.corrigendum_number
          )
        ),
        _react2.default.createElement('div', { style: styles.dividerStyle }),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } },
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-around' } },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                { style: styles.BoldText },
                'Inspector Name: '
              ),
              _this.state.corrigendum_array.generated_by.name
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                { style: styles.BoldText },
                'Inspector Mobile: '
              ),
              _this.state.corrigendum_array.generated_by.mobile
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column' } },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                { style: styles.BoldText },
                'Updates: '
              ),
              _this.state.corrigendum_array.update_values
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                { style: styles.BoldText },
                'Remarks: '
              ),
              _this.state.corrigendum_array.remarks
            )
          )
        )
      );
    };

    _this.rejectionPoReason = function () {
      if (_this.state.flag == 11) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'Rejection Reason'
        ),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
          _react2.default.createElement(_materialUi.TextField, {
            name: 'Reason',
            multiLine: true,
            rows: 6,
            rowsMax: 6,
            onChange: function onChange(event, newValue) {
              return _this.setState({ rejection_reason: newValue });
            },
            style: styles.rejectReasonStyle
          }),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } },
            _react2.default.createElement(_materialUi.RaisedButton, { label: 'Submit', primary: true, style: styles.reasonButtonStyle, onClick: function onClick(event) {
                _this.updateIC(_this.state.rejection_reason, _this.state.order_number, _this.state.ic_id);
              } }),
            _react2.default.createElement(_materialUi.RaisedButton, { label: 'Back', primary: true, style: styles.reasonButtonStyle, onClick: function onClick(event) {
                _this.fetchAllEntities("Purchase_Order", _this.state._id);
              } })
          )
        )
      );
    };

    _this.addVendor = function () {
      if (_this.state.flag == 6) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'Vendor Panel'
        ),
        _react2.default.createElement(
          'div',
          { style: styles.innerContainerStyleUpdate },
          _react2.default.createElement(
            'div',
            { style: styles.childContainer },
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdPerson, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Vendor Code',
                floatingLabelText: '*Vendor Code',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ vendor_code: newValue });
                },
                style: styles.textFieldStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdPerson, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Name',
                floatingLabelText: '*Name',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ name: newValue });
                },
                style: styles.textFieldStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdMail, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Email',
                floatingLabelText: '*Email',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ email: newValue });
                },
                style: styles.textFieldStyle
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { style: styles.childContainer },
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdPhoneIphone, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Mobile',
                floatingLabelText: '*Mobile',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ mobile: newValue });
                },
                style: styles.textFieldStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdLocationOn, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Address',
                floatingLabelText: 'Address',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ address: newValue });
                },
                style: styles.textFieldStyle
              })
            )
          )
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          { style: styles.textCellStyle },
          _react2.default.createElement(_materialUi.RaisedButton, { label: 'ADD', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
              _this.addVendorFunc(event);
            } })
        )
      );
    };

    _this.showProfile = function () {

      if (_this.state.flag == 10) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'My Profile'
        ),
        _react2.default.createElement(
          'div',
          { style: styles.innerContainerStyleUpdate },
          _react2.default.createElement(
            'div',
            { style: styles.childContainer },
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdPerson, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Enter name',
                floatingLabelText: 'Name',
                value: _this.state.name,
                onChange: function onChange(event, newValue) {
                  return _this.setState({ name: newValue });
                },
                style: styles.textFieldStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdLockOpen, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Enter password',
                floatingLabelText: 'Password',
                value: _this.state.password,
                onChange: function onChange(event, newValue) {
                  return _this.setState({ password: newValue });
                },
                style: styles.textFieldStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdPhoneIphone, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Enter mobile number',
                floatingLabelText: 'Mobile Number',
                value: _this.state.mobile,
                onChange: function onChange(event, newValue) {
                  return _this.setState({ mobile: newValue });
                },
                style: styles.textFieldStyle
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { style: styles.childContainer },
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdMail, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Enter email',
                floatingLabelText: 'Email',
                value: _this.state.email,
                onChange: function onChange(event, newValue) {
                  return _this.setState({ email: newValue });
                },
                style: styles.textFieldStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdLocationOn, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Enter location',
                floatingLabelText: 'Location',
                value: _this.state.location,
                onChange: function onChange(event, newValue) {
                  return _this.setState({ location: newValue });
                },
                style: styles.textFieldStyle
              })
            )
          )
        ),
        _react2.default.createElement(_materialUi.RaisedButton, {
          label: 'UPDATE',
          primary: true,
          style: styles.buttonStyle,
          onClick: function onClick(event) {
            return _this.updateInfo(event);
          }
        })
      );
    };

    _this.showIC = function () {

      if (_this.state.flag == 12) return _react2.default.createElement(
        'div',
        { style: { flex: 1 } },
        _react2.default.createElement('div', { style: styles.dividerStyle }),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 } },
          _react2.default.createElement(
            'span',
            { style: styles.ICLabel },
            'Inspection Certificate Details'
          )
        ),
        _react2.default.createElement('div', { style: styles.dividerStyle }),
        _this.state.responseDataArray.map(function (member, key) {
          return _react2.default.createElement(
            'div',
            { style: { border: '2px solid #989898', borderRadius: 4, boxShadow: '1px 3px 5px', padding: '20px', margin: '10px' } },
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } },
              _react2.default.createElement(
                'div',
                { style: styles.icBoxStyle },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Quantity Offered: '
                  ),
                  member.quantity_offered
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Quantity Accepted: '
                  ),
                  member.quantity_approved
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Quantity On Order: '
                  ),
                  member.quantity_on_order
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Quantity Supplied/Inspected So Far: '
                  ),
                  member.quantity_supplied_so_far
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Balance Quantity: '
                  ),
                  member.balance_quantity
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Date when materials were offered for inspection: '
                  ),
                  member.materials_offered_date
                )
              ),
              _react2.default.createElement(
                'div',
                { style: styles.icBoxStyle },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Unit Price: '
                  ),
                  member.unit_price
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Inspection Date: '
                  ),
                  member.inspection_date
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'IC Signed On: '
                  ),
                  member.ic_signed_on
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Inspecting Officer Name: '
                  ),
                  member.inspector_name
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Inspecting Officer Mobile: '
                  ),
                  member.inspector_mobile
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: styles.BoldText },
                    'Remarks: '
                  ),
                  member.remarks
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { marginTop: 10, marginLeft: 60 } },
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'span',
                  { style: styles.BoldText },
                  'Location of Seal: '
                ),
                member.location_of_seal
              )
            ),
            member.rejection_reason != undefined ? _react2.default.createElement(
              'div',
              { style: { marginTop: 10, marginLeft: 60 } },
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'span',
                  { style: styles.BoldText },
                  'Rejection Reason: '
                ),
                member.rejection_reason
              )
            ) : null,
            _react2.default.createElement('div', { style: styles.dividerStyle }),
            member.corrigendum_id != undefined ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement('br', null),
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'See Corrigendum',
                primary: true,
                onClick: function onClick() {
                  return _this.getCorrigendum(member.corrigendum_id);
                }
              })
            ) : null,
            member.corrigendum_id != undefined && member.corrigendum_id == _this.state.corrigendum_array._id ? _this.showCorrigendumTable() : null
          );
        })
      );
    };

    _this.state = {
      responseDataArray: [],
      corrigendum_array: [],
      vendor_code: '',
      name: '',
      email: '',
      mobile: '',
      location: '',
      address: '',
      password: '',
      flag: -1,
      order_number: '',
      order_date: '',
      specification: '',
      quantity_rate: '',
      duties_charges: '',
      delivery_date: '',
      tender_no: '',
      tender_type: '',
      opened_on: '',
      offer_no: '',
      offer_date: '',
      selectedVendorPos: 0,
      vendors_info: [],
      update: -1,
      open: false,
      rejection_reason: '',
      unit_price: '',
      balance_quantity: '',
      quantity_supplied_so_far: '',
      quantity_on_order: '',
      update_values: ''
    };

    return _this;
  }

  _createClass(StoreOfficerHome, [{
    key: 'handleOpen',
    value: function handleOpen(orderNumber) {
      this.setState({
        open: true,
        order_number: orderNumber
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({ _id: userInfo.userId });
      this.fetchAllEntities("Purchase_Order", userInfo.userId);
      this.vendorByStoreOfficer(userInfo.userId);
    }
  }, {
    key: 'clearVendorFields',
    value: function clearVendorFields() {
      this.setState({ vendor_code: '', name: '', email: '', mobile: '', address: '' });
      this.fetchAllEntities("Vendor", this.state._id);
    }
  }, {
    key: 'clearPurchaseFields',
    value: function clearPurchaseFields() {
      this.setState({
        order_number: '',
        order_date: '',
        specification: '',
        quantity_rate: '',
        duties_charges: '',
        delivery_date: '',
        tender_no: '',
        tender_type: '',
        opened_on: '',
        offer_no: '',
        offer_date: '',
        selectedVendorPos: 0
      });
      this.fetchAllEntities("Purchase_Order", this.state._id);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_materialUi.AppBar, { title: 'StoreOfficer Home', width: '50%' }),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(_StoreOfficerPalette2.default, {
                onClickPlacePurchaseOrder: function onClickPlacePurchaseOrder() {
                  return _this2.setState({ flag: 1, update: 1 });
                },
                onClickVendors: function onClickVendors() {
                  return _this2.fetchAllEntities("Vendor", _this2.state._id);
                },
                onClickPurchaseOrders: function onClickPurchaseOrders() {
                  return _this2.fetchAllEntities("Purchase_Order", _this2.state._id);
                },
                onClickAddVendor: function onClickAddVendor() {
                  return _this2.setState({ flag: 6 });
                },
                onClickProfile: function onClickProfile() {
                  return _this2.getProfileInfo(_this2);
                },
                onClickLogout: function onClickLogout() {
                  return _this2.logout();
                }
              }),
              this.placePurchaseOrder(),
              this.showVendors(),
              this.showIC(),
              this.showPurchaseOrders(),
              this.addVendor(),
              this.showProfile(),
              this.cancelPOconfirmation(),
              this.rejectionPoReason()
            )
          )
        )
      );
    }
  }, {
    key: 'logout',
    value: function logout() {
      localStorage.clear();
      this.props.history.replace({
        pathname: '/'
      });
    }
  }, {
    key: 'getCorrigendum',
    value: function getCorrigendum(corrigendum_id) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.oneCorrigendumUrl + corrigendum_id;

      _axios2.default.get(apiUrl).then(function (response) {
        console.log(response);
        that.setState({ corrigendum_array: response.data, corrigendum_flag: 1 });
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updateIC',
    value: function updateIC(rejection_reason, orderNumber, ic_id) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateICInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": orderNumber,
        "ic_id": ic_id,
        "rejection_reason": rejection_reason
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.updatePoStatus("Items Rejected", orderNumber);
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'vendorByStoreOfficer',
    value: function vendorByStoreOfficer(userId) {
      var that = this;
      var apiUrl = _url.baseUrl + _url.VendorByStoreOfficerUrl + userId;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.setState({ vendors_info: response.data });
        } else if (response.status == 404) {
          alert("No Vendors found with this id");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'addVendorFunc',
    value: function addVendorFunc(event) {
      var that = this;

      if (that.state.vendor_code == '' || that.state.name == '' || that.state.email == '' || that.state.mobile == '') {
        alert("Required fields shouldn't be empty!!");
        return;
      }

      var apiUrl = _url.baseUrl + _url.addVendorUrl;
      var body = {
        "vendor_code": that.state.vendor_code,
        "name": that.state.name,
        "mobile": that.state.mobile,
        "email": that.state.email,
        "role": "Vendor",
        "storeofficer_id": that.state._id,
        "address": that.state.address
      };

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
        if (response.status == 200) {
          that.clearVendorFields();
        } else if (response.status == 204) {
          alert("Vendor is already present!");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'cancelPOFunc',
    value: function cancelPOFunc(event) {
      var that = this;
      var apiUrl = _url.baseUrl + _url.deletePOUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": that.state.order_number
      }, { headers: headers }).then(function (response) {
        if (response.status == 200) {
          that.fetchAllEntities("Purchase_Order", that.state._id);
        } else if (response.status == 404) {
          alert("Purchase Order is not present!");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'place_order',
    value: function place_order(event) {
      var that = this;

      if (that.state.specification == '' || that.state.quantity_rate == '' || that.state.duties_charges == '' || that.state.delivery_date == '' || that.state.tender_no == '' || that.state.tender_type == '' || that.state.opened_on == '' || that.state.order_number == '' || that.state.order_date == '' || that.state.offer_no == '' || that.state.offer_date == '' || that.state._id == '') {
        alert("Required fields shouldn't be empty!!");
        return;
      }
      if (that.state.delivery_date.charAt(4) != '-' || that.state.delivery_date.charAt(7) != '-') {
        alert("Date should be in the YYYY-MM-DD format!!");
        that.setState({ flag: 1 });
        return;
      }
      if (that.state.order_date.charAt(4) != '-' || that.state.order_date.charAt(7) != '-') {
        alert("Date should be in the YYYY-MM-DD format!!");
        that.setState({ flag: 1 });
        return;
      }
      if (that.state.offer_date.charAt(4) != '-' || that.state.offer_date.charAt(7) != '-') {
        alert("Date should be in the YYYY-MM-DD format!!");
        that.setState({ flag: 1 });
        return;
      }
      if (that.state.opened_on.charAt(4) != '-' || that.state.opened_on.charAt(7) != '-') {
        alert("Date should be in the YYYY-MM-DD format!!");
        that.setState({ flag: 1 });
        return;
      }

      var apiUrl = _url.baseUrl + _url.addPurchaseOrderUrl;
      var itemdetails = {
        specification: that.state.specification,
        quantity_rate: that.state.quantity_rate,
        duties_charges: that.state.duties_charges,
        delivery_date: that.state.delivery_date
      };

      var vendor_info = {
        code: that.state.vendors_info[that.state.selectedVendorPos].vendor_code,
        name: that.state.vendors_info[that.state.selectedVendorPos].name,
        email: that.state.vendors_info[that.state.selectedVendorPos].email,
        address: that.state.vendors_info[that.state.selectedVendorPos].address
      };

      var tender_info = {
        tender_no: that.state.tender_no,
        tender_type: that.state.tender_type,
        opened_on: that.state.opened_on
      };

      var body = {
        "order_number": that.state.order_number,
        "order_date": that.state.order_date,
        "itemdetails": itemdetails,
        "vendor_info": vendor_info,
        "tender_info": tender_info,
        "offer_no": that.state.offer_no,
        "offer_date": that.state.offer_date,
        "storeofficer_id": that.state._id,
        "status": "Initiated"
      };

      console.log(body);

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
        if (response.status == 200) {
          that.clearPurchaseFields();
        } else if (response.status == 204) {
          alert("Order is already present!");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getOrderInfo',
    value: function getOrderInfo(event, order_number) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.onePurchaseOrderUrl + order_number;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.setState({
            order_number: response.data.order_number,
            order_date: response.data.order_date,
            specification: response.data.itemdetails.specification,
            quantity_rate: response.data.itemdetails.quantity_rate,
            duties_charges: response.data.itemdetails.duties_charges,
            delivery_date: response.data.itemdetails.delivery_date,
            tender_no: response.data.tender_info.tender_no,
            tender_type: response.data.tender_info.tender_type,
            opened_on: response.data.tender_info.opened_on,
            offer_no: response.data.offer_no,
            offer_date: response.data.offer_date,
            storeofficer_id: response.data.storeofficer_id,
            selectedVendorPos: that.state.vendors_info.findIndex(function (x) {
              return x.vendor_code == response.data.vendor_info.code;
            }),
            flag: 1,
            update: 2
          });
        } else if (response.status == 404) {
          alert("No Purchase Order found with this order number");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updatePO',
    value: function updatePO(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updatePOInfoUrl;

      var itemdetails = {
        specification: that.state.specification,
        quantity_rate: that.state.quantity_rate,
        duties_charges: that.state.duties_charges,
        delivery_date: that.state.delivery_date
      };

      var vendor_info = {
        code: that.state.vendors_info[that.state.selectedVendorPos].vendor_code,
        name: that.state.vendors_info[that.state.selectedVendorPos].name,
        email: that.state.vendors_info[that.state.selectedVendorPos].email,
        address: that.state.vendors_info[that.state.selectedVendorPos].address
      };

      var tender_info = {
        tender_no: that.state.tender_no,
        tender_type: that.state.tender_type,
        opened_on: that.state.opened_on
      };

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": that.state.order_number,
        "order_date": that.state.order_date,
        "itemdetails": itemdetails,
        "vendor_info": vendor_info,
        "tender_info": tender_info,
        "offer_no": that.state.offer_no,
        "offer_date": that.state.offer_date,
        "storeofficer_id": that.state.storeofficer_id
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.fetchAllEntities("Purchase_Order", that.state._id);
        } else if (response.status == 204) {
          alert("Purchase Order to be updated is not present!");
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updatePoStatus',
    value: function updatePoStatus(status, orderNumber) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updatePOInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": orderNumber,
        "status": status
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.fetchAllEntities("Purchase_Order", that.state._id);
        } else if (response.status == 204) {
          alert("Purchase Order to be updated is not present!");
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getProfileInfo',
    value: function getProfileInfo(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.getStoreOfficerInfoUrl + that.state._id;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.setState({ name: response.data.name, email: response.data.email, mobile: response.data.mobile, location: response.data.location, password: response.data.password, flag: 10 });
        } else if (response.status == 404) {
          alert("No StoreOfficer found with this id");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updateInfo',
    value: function updateInfo(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateStoreOfficerInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "_id": that.state._id,
        "name": that.state.name,
        "mobile": that.state.mobile,
        "email": that.state.email,
        "password": that.state.password,
        "role": "StoreOfficer",
        "location": that.state.location
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          alert("Information is updated successfully!");
        } else if (response.status == 204) {
          alert("Mobile number to be updated is already present!");
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'fetchAllEntities',
    value: function fetchAllEntities(type, userId) {

      var that = this;
      var apiUrl = _url.baseUrl;
      if (type == "Vendor") {
        apiUrl += _url.VendorByStoreOfficerUrl + userId;
      } else if (type == "Purchase_Order") {
        apiUrl += _url.POUrlByStoreOfficer + userId;
      } else if (type == "AllIC") {
        apiUrl += _url.allIcUrl + userId;
      }

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200 && type == "Vendor") {
          that.setState({ responseDataArray: response.data, vendors_info: response.data, flag: 3 });
        } else if (response.status == 200 && type == "AllIC") {
          that.setState({ responseDataArray: response.data, flag: 12 });
        } else if (response.status == 200 && type == "Purchase_Order") {
          that.setState({
            responseDataArray: response.data,
            flag: 5,
            open: false
          });
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getStatusStyle',
    value: function getStatusStyle(status) {
      if (status == 'InProgress') {
        return styles.inProgressStyle;
      } else if (status == 'Initiated') {
        return styles.initiatedStyle;
      } else if (status == 'Processed') {
        return styles.processedStyle;
      } else if (status == 'Forwarded') {
        return styles.forwardedStyle;
      } else if (status == 'Assigned') {
        return styles.assignedStyle;
      } else if (status == 'Intimated') {
        return styles.intimatedStyle;
      } else if (status == 'Visited') {
        return styles.visitedStyle;
      } else if (status == 'Passed') {
        return styles.passedStyle;
      } else if (status == 'Rejected') {
        return styles.rejectedStyle;
      } else if (status == 'Approved') {
        return styles.approvedStyle;
      } else if (status == 'IR Partial') {
        return styles.IRPartialStyle;
      } else if (status == 'Items Dispatched') {
        return styles.dispatchedStyle;
      } else if (status == 'Items Accepted') {
        return styles.itemAcceptedStyle;
      } else if (status == 'Items Rejected') {
        return styles.itemRejectedStyle;
      } else if (status == 'Amendment Requested') {
        return styles.amendmentRequestedStyle;
      } else if (status == 'Amendment Inspector Nominated') {
        return styles.nominatedStyle;
      } else if (status == 'Corrigendum Generated') {
        return styles.generatedStyle;
      } else if (status == 'Finished') {
        return styles.finishedStyle;
      }
    }
  }]);

  return StoreOfficerHome;
}(_react2.default.Component);

exports.default = StoreOfficerHome;


var styles = {
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
    margin: 20,
    width: '80%'
  },
  innerContainerStyleUpdate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    width: '80%'
  },
  childContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    padding: 20
  },
  buttonStyle: {
    width: '18%',
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 15
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
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #aaa69d',
    margin: 5,
    padding: 5
  },
  textCellContainer: {
    flex: 1,
    textAlign: 'center'
  },
  purchaseCell: {},
  textLabel: {
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#006266',
    textAlign: 'center'
  },
  BoldText: {
    fontWeight: 'Bold'
  },
  corrigendumLabel: {
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#ff5719',
    fontSize: '18px',
    flex: 2
  },
  ICLabel: {
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#FF1493',
    fontSize: '20px'
  },
  textStyle: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    color: '#009432',
    margin: '2px'
  },
  boxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginRight: '10px'
  },
  purchaseOrderContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #aaa69d',
    borderRadius: 4,
    margin: 12,
    padding: 8
  },
  dividerStyle: {
    height: '1px',
    backgroundColor: '#d1ccc0',
    margin: '4px',
    marginTop: 10
  },
  iconSize: 18,
  textFieldStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: -10
  },
  textCellStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  iconStyle: {
    marginTop: 18
  },
  headingStyle: {
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Montserrat',
    fontSize: '22px',
    marginTop: 10,
    fontWeight: 'Bold',
    color: '#006266'
  },
  initiatedStyle: {
    backgroundColor: 'rgb(255,153,0)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  inProgressStyle: {
    backgroundColor: 'rgb(50,70,195)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  processedStyle: {
    backgroundColor: 'rgb(50,220,50)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  forwardedStyle: {
    backgroundColor: 'rgb(255, 75, 100)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  assignedStyle: {
    backgroundColor: 'rgb(180, 75, 12)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  IRPartialStyle: {
    backgroundColor: '#420420',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  intimatedStyle: {
    backgroundColor: 'rgb(193, 181, 12)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  visitedStyle: {
    backgroundColor: 'rgb(94, 13, 193)',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  passedStyle: {
    backgroundColor: '#13B47E',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  rejectedStyle: {
    backgroundColor: '#FF0000',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  approvedStyle: {
    backgroundColor: '#33FF00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  dispatchedStyle: {
    backgroundColor: '#663399',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  itemAcceptedStyle: {
    backgroundColor: '#FFCC00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  itemRejectedStyle: {
    backgroundColor: '#CC0000',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  amendmentRequestedStyle: {
    backgroundColor: '#809BBD',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  nominatedStyle: {
    backgroundColor: '#D683B2',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  generatedStyle: {
    backgroundColor: '#00CCFF',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  finishedStyle: {
    backgroundColor: '#99FF00',
    borderRadius: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonPOContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 25
  },
  buttonContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 12
  },
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: '60px'
  },
  rejectReasonStyle: {
    margin: 15,
    padding: 4,
    boxShadow: '1px 3px 5px #A9A9A9',
    border: '1px solid #D3D3D3'
  },
  reasonButtonStyle: {
    width: '18%',
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 15,
    flex: 1
  },
  corriStyle: {
    margin: 15,
    padding: 4,
    boxShadow: '1px 3px 5px #A9A9A9',
    border: '1px solid #D3D3D3'
  }
};