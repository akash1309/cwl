'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _md = require('react-icons/lib/md');

var MaterialIcon = _interopRequireWildcard(_md);

var _VendorPalette = require('./VendorPalette');

var _VendorPalette2 = _interopRequireDefault(_VendorPalette);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _url = require('./../../config/url');

var _materialUi = require('material-ui');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VendorHome = function (_Component) {
  _inherits(VendorHome, _Component);

  function VendorHome(props) {
    _classCallCheck(this, VendorHome);

    var _this = _possibleConstructorReturn(this, (VendorHome.__proto__ || Object.getPrototypeOf(VendorHome)).call(this, props));

    _this.showProfile = function () {

      if (_this.state.flag == 1) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'My Profile'
        ),
        _react2.default.createElement(
          'div',
          { style: styles.innerContainerStyle },
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

      if (_this.state.flag == 2) return _react2.default.createElement(
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
                style: styles.buttonStyle,
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

    _this.showPurchaseOrders = function () {

      if (_this.state.flag == 4) {
        var statusArray = ["IC Generated", "Items Dispatched", "Items Accepted", "Items Rejected", "Amendment Requested", "Amendment Inspector Nominated", "Corrigendum Generated", "Approved", "Finished"];

        return _react2.default.createElement(
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
              _react2.default.createElement(
                'div',
                { style: styles.buttonContainerStyle },
                member.status == "Initiated" || member.status == "Items Rejected" || member.status == "Rejected" || member.status == "Approved" || member.status == "IR Partial" ? _react2.default.createElement(_materialUi.RaisedButton, {
                  label: 'Start',
                  primary: true,
                  style: styles.buttonStyle,
                  onClick: function onClick() {
                    return _this.updatePoStatus("InProgress", member.order_number);
                  }
                }) : null,
                member.status == "InProgress" ? _react2.default.createElement(_materialUi.RaisedButton, {
                  label: 'Process',
                  primary: true,
                  style: styles.buttonStyle,
                  onClick: function onClick() {
                    return _this.updatePoStatus("Processed", member.order_number);
                  }
                }) : null
              ),
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
              member.status == "IC Generated" ? _react2.default.createElement(
                'div',
                { style: styles.icBoxStyle },
                _react2.default.createElement('br', null),
                _react2.default.createElement(_materialUi.RaisedButton, {
                  label: 'Items Dispatched',
                  primary: true,
                  style: styles.buttonStyle,
                  onClick: function onClick() {
                    return _this.updatePoStatus("Items Dispatched", member.order_number);
                  }
                })
              ) : null,
              member.status == "Items Accepted" ? _react2.default.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } },
                _react2.default.createElement(_materialUi.RaisedButton, {
                  label: 'OK',
                  primary: true,
                  style: styles.buttonStyle,
                  onClick: function onClick() {
                    return _this.checkBalanceQty(member.ic_id.balance_quantity, member.order_number, member.vendor_info.code);
                  }
                }),
                _react2.default.createElement(_materialUi.RaisedButton, {
                  label: 'Request Amendment',
                  primary: true,
                  style: styles.buttonStyle,
                  onClick: function onClick() {
                    return _this.updatePoStatus("Amendment Requested", member.order_number);
                  }
                })
              ) : null
            );
          })
        );
      }
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

    _this.showVisits = function () {
      if (_this.state.flag == 5) return _react2.default.createElement(
        'div',
        { style: styles.visitOuterContainer },
        _this.state.responseDataArray.map(function (member, key) {
          return _react2.default.createElement(
            'div',
            { style: styles.visitInnerContainer },
            _react2.default.createElement('div', { style: styles.visitLeftBoxStyle }),
            _react2.default.createElement(
              'div',
              { style: styles.visitRightBoxStyle },
              _react2.default.createElement(
                'span',
                { style: styles.visitHeadingStyle },
                member.inspector_id.name
              ),
              _react2.default.createElement(
                'span',
                { style: styles.visitLowerHeadingStyle },
                '( Inspector, ' + member.inspector_id.location + ' )'
              ),
              _react2.default.createElement('div', { style: styles.visitdividerStyle }),
              _react2.default.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'row' } },
                _react2.default.createElement(
                  'div',
                  { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10, marginRight: 10 } },
                  _react2.default.createElement(MaterialIcon.MdShoppingBasket, { size: styles.iconSize, style: styles.visiticonStyle }),
                  _react2.default.createElement(MaterialIcon.MdDateRange, { size: styles.iconSize, style: styles.visiticonStyle }),
                  _react2.default.createElement(MaterialIcon.MdAccessTime, { size: styles.iconSize, style: styles.visiticonStyle }),
                  _react2.default.createElement(MaterialIcon.MdMail, { size: styles.iconSize, style: styles.visiticonStyle }),
                  _react2.default.createElement(MaterialIcon.MdPhoneIphone, { size: styles.iconSize, style: styles.visiticonStyle })
                ),
                _react2.default.createElement(
                  'div',
                  { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' } },
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextKeyStyle },
                    'Order Number:'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextKeyStyle },
                    'Visiting Date: '
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextKeyStyle },
                    'Visiting Time: '
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextKeyStyle },
                    'Email: '
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextKeyStyle },
                    'Mobile:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextStyle },
                    member.order_number
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextStyle },
                    member.date
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextStyle },
                    member.time
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextStyle },
                    member.inspector_id.email
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: styles.visitTextStyle },
                    member.inspector_id.mobile
                  )
                )
              )
            )
          );
        })
      );
    };

    _this.state = {
      responseDataArray: [],
      corrigendum_array: [],
      name: '',
      email: '',
      mobile: '',
      location: '',
      password: '',
      flag: 4,
      code: ''
    };
    return _this;
  }

  _createClass(VendorHome, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({ _id: userInfo.userId, code: userInfo.code });
      this.fetchAllEntities("Purchase_Order", userInfo.code);
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
            _react2.default.createElement(_materialUi.AppBar, { title: 'Vendor Home', width: '50%' }),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row', height: '100vh' } },
              _react2.default.createElement(_VendorPalette2.default, {
                onClickPurchaseOrders: function onClickPurchaseOrders() {
                  return _this2.fetchAllEntities("Purchase_Order", _this2.state.code);
                },
                onClickVisits: function onClickVisits() {
                  return _this2.getVisits();
                },
                onClickProfile: function onClickProfile() {
                  return _this2.getProfileInfo();
                },
                onClickLogout: function onClickLogout() {
                  return _this2.logout();
                }
              }),
              this.showProfile(),
              this.showIC(),
              this.showPurchaseOrders(),
              this.showVisits()
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
  }, {
    key: 'checkBalanceQty',
    value: function checkBalanceQty(balance_quantity, orderNumber, vendor_code) {
      if (balance_quantity == 0) {
        this.updatePoStatus("Finished", orderNumber);
      } else {
        this.removeVisit(orderNumber, vendor_code);
      }
    }
  }, {
    key: 'removeVisit',
    value: function removeVisit(orderNumber, vendor_code) {
      var that = this;
      var apiUrl = _url.baseUrl + _url.removeVisitUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": orderNumber,
        "vendor_code": vendor_code
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.updatePoStatus("Approved", orderNumber);
        } else if (response.status == 204) {
          alert("Visit to be removed is not present!");
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
      var apiUrl = _url.baseUrl + _url.getVendorInfoUrl + that.state._id;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.setState({
            name: response.data.name,
            email: response.data.email,
            mobile: response.data.mobile,
            location: response.data.location,
            password: response.data.password,
            flag: 1
          });
        } else if (response.status == 404) {
          alert("No Vendor found with this id");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updateInfo',
    value: function updateInfo(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateVendorInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "_id": that.state._id,
        "name": that.state.name,
        "mobile": that.state.mobile,
        "email": that.state.email,
        "password": that.state.password,
        "role": "Vendor",
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

      if (type == "Purchase_Order") {
        apiUrl = apiUrl + _url.vendorPOUrl + userId;
      } else if (type == "AllIC") {
        apiUrl += _url.allIcUrl + userId;
      }

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);

        if (response.status == 200 && type == "AllIC") {
          that.setState({ responseDataArray: response.data, flag: 2 });
        } else if (response.status == 200 && type == "Purchase_Order") {
          that.setState({ responseDataArray: response.data, flag: 4 });
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getVisits',
    value: function getVisits() {
      var that = this;
      var apiUrl = _url.baseUrl + _url.getVisitUrl + that.state.code;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);

        if (response.status == 200) {
          that.setState({ responseDataArray: response.data, flag: 5 });
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
          that.fetchAllEntities("Purchase_Order", that.state.code);
        } else if (response.status == 204) {
          alert("Purchase Order to be updated is not present!");
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }]);

  return VendorHome;
}(_react.Component);

exports.default = VendorHome;


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
    margin: 0
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
  textLabel: {
    fontFamily: 'Montserrat',
    fontWeight: 'Bold',
    color: '#006266'
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
    flexDirection: 'column'
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
    margin: '4px',
    marginTop: 10
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
    marginTop: 20,
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
  buttonContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 12
  },
  visitOuterContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  visitInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    width: '500px',
    height: '200px',
    borderRadius: 25,
    border: '0.5px solid rgb(220,220,220)',
    boxShadow: '1px 6px 6px rgb(169,169,169)'
  },
  visitLeftBoxStyle: {
    flex: 2,
    backgroundColor: 'black',
    borderRadius: 5
  },
  visitRightBoxStyle: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  visitHeadingStyle: {
    textAlign: 'right',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    margin: 10,
    fontWeight: 'Bold',
    color: 'rgb(255,215,0)'

  },
  visitLowerHeadingStyle: {
    textAlign: 'right',
    fontFamily: 'Montserrat',
    fontSize: '12px',
    marginRight: 10,
    fontWeight: 'Bold',
    color: 'rgb(255, 75, 100)'
  },
  visitdividerStyle: {
    height: '1px',
    backgroundColor: 'black',
    margin: '4px',
    marginTop: 10
  },
  visitTextStyle: {
    fontFamily: 'Montserrat',
    marginRight: 10,
    flex: 2,
    justifyContent: 'flex-end',
    color: 'black'
  },
  visitTextKeyStyle: {
    fontFamily: 'Montserrat',
    marginRight: 10,
    flex: 2,
    justifyContent: 'flex-start',
    color: 'rgb(0,128,128)'
  },
  visiticonStyle: {
    flex: 1
  },
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: '60px'
  }
};