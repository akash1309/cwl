'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _url = require('./../../config/url');

var _md = require('react-icons/lib/md');

var MaterialIcon = _interopRequireWildcard(_md);

var _InspectorPalette = require('./InspectorPalette');

var _InspectorPalette2 = _interopRequireDefault(_InspectorPalette);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _materialUi = require('material-ui');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InspectorHome = function (_Component) {
  _inherits(InspectorHome, _Component);

  function InspectorHome(props) {
    _classCallCheck(this, InspectorHome);

    var _this = _possibleConstructorReturn(this, (InspectorHome.__proto__ || Object.getPrototypeOf(InspectorHome)).call(this, props));

    _this.handleChange = function (event, index, value) {

      if (value == 0) _this.setState({ selectedIrStatusPos: value, report_status: 'Partial' });else {
        _this.setState({ selectedIrStatusPos: value, report_status: 'Complete' });
      }
    };

    _this.handleChangeStatus = function (event, index, value) {

      if (value == 0) _this.setState({ selectedItemStatusPos: value, item_status: 'Pass' });else {
        _this.setState({ selectedItemStatusPos: value, item_status: 'Fail' });
      }
    };

    _this.showProfile = function () {
      if (_this.state.flag == 2) return _react2.default.createElement(
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

    _this.addCorrigendum = function () {
      if (_this.state.flag == 3) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'Corrigendum Generation'
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
              _react2.default.createElement(MaterialIcon.MdDescription, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Corrigendum Number',
                floatingLabelText: '*Corrigendum Number',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ corrigendum_number: newValue });
                }
              }),
              _react2.default.createElement(MaterialIcon.MdChromeReaderMode, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Order Number',
                floatingLabelText: 'Order Number',
                value: _this.state.order_number,
                inputStyle: styles.opaqueTextStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdChromeReaderMode, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Vendor Code',
                floatingLabelText: 'Vendor Code',
                value: _this.state.vendor_code,
                inputStyle: styles.opaqueTextStyle
              }),
              _react2.default.createElement(MaterialIcon.MdDateRange, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'YYYY-MM-DD',
                floatingLabelText: 'Order Date',
                value: _this.state.order_date,
                inputStyle: styles.opaqueTextStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdReceipt, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'I.C. id',
                floatingLabelText: 'I.C. id',
                value: _this.state.ic_id,
                inputStyle: styles.opaqueTextStyle
              }),
              _react2.default.createElement(MaterialIcon.MdDateRange, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'YYYY-MM-DD',
                floatingLabelText: 'I.C. Date',
                value: _this.state.ic_signed_on,
                inputStyle: styles.opaqueTextStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Quantity Offered',
                floatingLabelText: 'Quantity Offered',
                value: _this.state.quantity_offered,
                inputStyle: styles.opaqueTextStyle
              }),
              _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Quantity Accepted',
                floatingLabelText: 'Quantity Accepted',
                value: _this.state.quantity_approved,
                inputStyle: styles.opaqueTextStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Quantity On Order',
                floatingLabelText: 'Quantity On Order',
                value: _this.state.quantity_on_order,
                inputStyle: styles.opaqueTextStyle
              }),
              _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Qty Supplied/Inspected So Far',
                floatingLabelText: 'Qty Supplied/Inspected So Far',
                value: _this.state.quantity_supplied_so_far,
                inputStyle: styles.opaqueTextStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Balance Quantity',
                floatingLabelText: 'Balance Quantity',
                value: _this.state.balance_quantity,
                inputStyle: styles.opaqueTextStyle
              }),
              _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Unit Price',
                floatingLabelText: 'Unit Price',
                value: _this.state.unit_price,
                inputStyle: styles.opaqueTextStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row', alignItems: 'center' } },
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Updated Values',
                floatingLabelText: '*Updated Values',
                multiLine: true,
                rows: 6,
                rowsMax: 6,
                onChange: function onChange(event, newValue) {
                  return _this.setState({ update_values: newValue });
                },
                style: styles.corriStyle
              }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'Remarks',
                floatingLabelText: 'Remarks',
                multiLine: true,
                rows: 6,
                rowsMax: 6,
                onChange: function onChange(event, newValue) {
                  return _this.setState({ remarks: newValue });
                },
                style: styles.corriStyle
              })
            )
          )
        ),
        _react2.default.createElement(_materialUi.RaisedButton, {
          label: 'Generate',
          primary: true,
          style: styles.buttonStyle,
          onClick: function onClick(event) {
            _this.generateCorrigendum(event);
          }
        })
      );
    };

    _this.addInspectionReport = function () {
      if (_this.state.flag == 4) {
        return _react2.default.createElement(
          'div',
          { style: styles.outerContainerStyle },
          _react2.default.createElement(
            'span',
            { style: styles.headingStyle },
            'Inspection Report Generation'
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
                _react2.default.createElement(MaterialIcon.MdDescription, { size: styles.iconSize, style: styles.iconStyle }),
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Order Number',
                  floatingLabelText: 'Order Number',
                  value: _this.state.order_number,
                  onChange: function onChange(event, newValue) {
                    return _this.setState({ order_number: newValue });
                  },
                  style: styles.textFieldStyle
                })
              ),
              _react2.default.createElement(
                'div',
                { style: styles.textCellStyle },
                _react2.default.createElement(MaterialIcon.MdReceipt, { size: styles.iconSize, style: styles.selectIconStyle }),
                _react2.default.createElement(
                  _SelectField2.default,
                  {
                    floatingLabelText: 'Report Status',
                    value: _this.state.selectedIrStatusPos,
                    onChange: _this.handleChange,
                    maxHeight: 200
                  },
                  _react2.default.createElement(_MenuItem2.default, { value: '0', key: '0', primaryText: 'Partial' }),
                  _react2.default.createElement(_MenuItem2.default, { value: '1', key: '1', primaryText: 'Complete' })
                )
              ),
              _this.state.report_status == 'Complete' ? _react2.default.createElement(
                'div',
                { style: styles.textCellStyle },
                _react2.default.createElement(MaterialIcon.MdReceipt, { size: styles.iconSize, style: styles.selectIconStyle }),
                _react2.default.createElement(
                  _SelectField2.default,
                  {
                    floatingLabelText: 'Item Status',
                    value: _this.state.selectedItemStatusPos,
                    onChange: _this.handleChangeStatus,
                    maxHeight: 200 },
                  _react2.default.createElement(_MenuItem2.default, { value: '0', key: '0', primaryText: 'Pass' }),
                  _react2.default.createElement(_MenuItem2.default, { value: '1', key: '1', primaryText: 'Fail' })
                )
              ) : null
            )
          ),
          _react2.default.createElement(_materialUi.RaisedButton, {
            label: 'Generate',
            primary: true,
            style: styles.buttonStyle,
            onClick: function onClick(event) {
              _this.generateInspectionReport(event);
            }
          })
        );
      }
    };

    _this.showPurchaseOrders = function () {

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
            member.status == "Assigned" ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Visit',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick(event) {
                  _this.setState({ flag: 6, order_number: member.order_number, vendor_code: member.vendor_info.code, vendor_email: member.vendor_info.email });
                }
              })
            ) : null,
            member.status == "Intimated" ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Visited',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick(event) {
                  _this.updateVisitStatus("Visited", member.order_number, member.vendor_info.code);
                }
              })
            ) : null,
            member.status == "Visited" ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Add Inspection Report',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick(event) {
                  return _this.setState({ flag: 4, order_number: member.order_number, vendor_code: member.vendor_info.code, vendor_email: member.vendor_info.email });
                }
              })
            ) : null,
            member.status == "Passed" ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Create I.C.',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick() {
                  return _this.setState({
                    flag: 7,
                    order_number: member.order_number,
                    inspector_name: member.inspected_by.name,
                    inspector_mobile: member.inspected_by.mobile,
                    vendor_email: member.vendor_info.email
                  });
                }
              })
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
                    'Date when items were offered for inspection: ',
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
            member.status == "Amendment Inspector Nominated" && member.amendmentInspector == _this.state._id ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Add Corrigendum',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick(event) {
                  return _this.setState({
                    flag: 3,
                    order_number: member.order_number,
                    vendor_code: member.vendor_info.code,
                    ic_id: member.ic_id._id,
                    order_date: member.order_date,
                    ic_signed_on: member.ic_id.ic_signed_on,
                    unit_price: member.ic_id.unit_price,
                    balance_quantity: member.ic_id.balance_quantity,
                    quantity_offered: member.ic_id.quantity_offered,
                    quantity_approved: member.ic_id.quantity_approved,
                    quantity_on_order: member.ic_id.quantity_on_order,
                    quantity_supplied_so_far: member.ic_id.quantity_supplied_so_far,
                    update_values: '',
                    remarks: ''
                  });
                }
              })
            ) : null
          );
        })
      );
    };

    _this.createIC = function () {

      if (_this.state.flag == 7) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'IC Generation'
        ),
        _react2.default.createElement(
          'div',
          { style: styles.childContainer },
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
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
            { style: styles.textCellStyle },
            _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Quantity_offered',
              floatingLabelText: '*Quantity_offered',
              onChange: function onChange(event, newValue) {
                return _this.setState({ quantity_offered: newValue });
              },
              style: styles.textFieldStyle
            }),
            _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Quantity_accepted',
              floatingLabelText: '*Quantity_accepted',
              onChange: function onChange(event, newValue) {
                return _this.setState({ quantity_approved: newValue });
              },
              style: styles.textFieldStyle
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Quantity On Order',
              floatingLabelText: '*Quantity On Order',
              onChange: function onChange(event, newValue) {
                return _this.setState({ quantity_on_order: newValue });
              },
              style: styles.textFieldStyle
            }),
            _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Qty Supplied/Inspected So Far',
              floatingLabelText: '*Qty Supplied/Inspected So Far',
              onChange: function onChange(event, newValue) {
                return _this.setState({ quantity_supplied_so_far: newValue });
              },
              style: styles.textFieldStyle
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Balance Quantity',
              floatingLabelText: '*Balance Quantity',
              value: _this.state.balance_quantity,
              onChange: function onChange(event, newValue) {
                return _this.setState({ balance_quantity: newValue });
              },
              style: styles.textFieldStyle
            }),
            _react2.default.createElement(MaterialIcon.MdDateRange, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'YYYY-MM-DD',
              floatingLabelText: '*Date item offered for inspection',
              onChange: function onChange(event, newValue) {
                return _this.setState({ materials_offered_date: newValue });
              },
              style: styles.textFieldStyle
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(MaterialIcon.MdDateRange, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'YYYY-MM-DD',
              floatingLabelText: '*Inspection Date',
              onChange: function onChange(event, newValue) {
                return _this.setState({ inspection_date: newValue });
              },
              style: styles.textFieldStyle
            }),
            _react2.default.createElement(MaterialIcon.MdMap, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Unit Price',
              floatingLabelText: '*Unit Price',
              value: _this.state.unit_price,
              onChange: function onChange(event, newValue) {
                return _this.setState({ unit_price: newValue });
              },
              style: styles.textFieldStyle
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(MaterialIcon.MdPeopleOutline, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Inspecting Officer Name',
              floatingLabelText: '*Inspecting Officer Name',
              value: _this.state.inspector_name,
              style: styles.textFieldStyle
            }),
            _react2.default.createElement(MaterialIcon.MdPhoneIphone, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Inspecting Officer Mobile',
              floatingLabelText: '*Inspecting Officer Mobile',
              value: _this.state.inspector_mobile,
              style: styles.textFieldStyle
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Location_of_seal',
              floatingLabelText: '*Location_of_seal',
              multiLine: true,
              rows: 2,
              rowsMax: 4,
              onChange: function onChange(event, newValue) {
                return _this.setState({ location_of_seal: newValue });
              },
              style: styles.areaStyle
            }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'Remarks',
              floatingLabelText: 'Remarks if any',
              multiLine: true,
              rows: 2,
              rowsMax: 4,
              onChange: function onChange(event, newValue) {
                return _this.setState({ remarks: newValue });
              },
              style: styles.areaStyle
            })
          ),
          _react2.default.createElement(
            'div',
            { style: styles.signedOnStyle },
            _react2.default.createElement(MaterialIcon.MdDateRange, { size: styles.iconSize, style: styles.iconStyle }),
            _react2.default.createElement(_materialUi.TextField, {
              hintText: 'YYYY-MM-DD',
              floatingLabelText: '*IC Signed On',
              onChange: function onChange(event, newValue) {
                return _this.setState({ ic_signed_on: newValue });
              },
              style: styles.textFieldStyle
            })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(_materialUi.RaisedButton, { label: 'Generate', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                _this.createICFunc(event);
              } })
          )
        )
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

    _this.visitform = function () {
      if (_this.state.flag == 6) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'Visit Information'
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
              _react2.default.createElement(MaterialIcon.MdDescription, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: 'YYYY-MM-DD',
                floatingLabelText: '*Date',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ date: newValue });
                },
                style: styles.textFieldStyle
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.textCellStyle },
              _react2.default.createElement(MaterialIcon.MdChromeReaderMode, { size: styles.iconSize, style: styles.iconStyle }),
              _react2.default.createElement(_materialUi.TextField, {
                hintText: '__am/pm',
                floatingLabelText: '*Time',
                onChange: function onChange(event, newValue) {
                  return _this.setState({ time: newValue });
                },
                style: styles.textFieldStyle
              })
            )
          )
        ),
        _react2.default.createElement(_materialUi.RaisedButton, {
          label: 'Set',
          primary: true,
          style: styles.buttonStyle,
          onClick: function onClick(event) {
            _this.generateVisit(event);
          }
        })
      );
    };

    _this.showIC = function () {

      if (_this.state.flag == 8) return _react2.default.createElement(
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

    _this.state = {
      responseDataArray: [],
      corrigendum_array: [],
      name: '',
      email: '',
      mobile: '',
      location: '',
      password: '',
      flag: -1,
      order_number: '',
      order_date: '',
      corrigendum_number: '',
      ic_id: '',
      inspector_name: '',
      inspector_mobile: '',
      date: '',
      time: '',
      vendor_code: '',
      report_status: '',
      item_status: '',
      selectedIrStatusPos: '',
      selectedItemStatusPos: '',
      rejection_reason: '',
      remarks: '',
      unit_price: '',
      balance_quantity: '',
      quantity_supplied_so_far: '',
      quantity_on_order: '',
      ic_signed_on: '',
      inspection_date: '',
      update_values: '',
      quantity_offered: '',
      quantity_approved: '',
      location_of_seal: '',
      materials_offered_date: ''
    };
    return _this;
  }

  _createClass(InspectorHome, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({
        _id: userInfo.userId,
        role: userInfo.role
      });
      this.fetchAllEntities("Purchase_Order", userInfo.userId);
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
          _react2.default.createElement(_materialUi.AppBar, { title: 'Inspector Home', width: '50%' }),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'row' } },
            _react2.default.createElement(_InspectorPalette2.default, {
              onClickPurchaseOrders: function onClickPurchaseOrders() {
                return _this2.fetchAllEntities("Purchase_Order", _this2.state._id);
              },
              onClickProfile: function onClickProfile() {
                return _this2.getProfileInfo(_this2);
              },
              onClickLogout: function onClickLogout() {
                return _this2.logout();
              }
            }),
            this.showPurchaseOrders(),
            this.createIC(),
            this.showIC(),
            this.addCorrigendum(),
            this.showProfile(),
            this.addInspectionReport(),
            this.visitform()
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
    key: 'createICFunc',
    value: function createICFunc(event) {
      var that = this;
      var apiUrl = _url.baseUrl + _url.icGenerateUrl;

      if (that.state.order_number == '' || that.state.quantity_offered == '' || that.state.quantity_approved == '' || that.state.location_of_seal == '' || that.state.inspection_date == '' || that.state.ic_signed_on == '' || that.state.inspector_name == '' || that.state.inspector_mobile == '' || that.state.quantity_on_order == '' || that.state.quantity_supplied_so_far == '' || that.state.balance_quantity == '' || that.state.unit_price == '' || that.state.materials_offered_date == '') {
        alert("Required fields shouldn't be empty!!");
        return;
      }

      if (that.state.ic_signed_on.charAt(4) != '-' || that.state.ic_signed_on.charAt(7) != '-') {
        alert("Date should be in the YYYY-MM-DD format!!");
        that.setState({ flag: 7 });
        return;
      }
      if (that.state.inspection_date.charAt(4) != '-' || that.state.inspection_date.charAt(7) != '-') {
        alert("Date should be in the YYYY-MM-DD format!!");
        that.setState({ flag: 7 });
        return;
      }
      if (that.state.materials_offered_date.charAt(4) != '-' || that.state.materials_offered_date.charAt(7) != '-') {
        alert("Date should be in the YYYY-MM-DD format!!");
        that.setState({ flag: 7 });
        return;
      }

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": that.state.order_number,
        "quantity_offered": that.state.quantity_offered,
        "quantity_approved": that.state.quantity_approved,
        "location_of_seal": that.state.location_of_seal,
        "inspection_date": that.state.inspection_date,
        "ic_signed_on": that.state.ic_signed_on,
        "inspector_name": that.state.inspector_name,
        "inspector_mobile": that.state.inspector_mobile,
        "quantity_on_order": that.state.quantity_on_order,
        "quantity_supplied_so_far": that.state.quantity_supplied_so_far,
        "balance_quantity": that.state.balance_quantity,
        "unit_price": that.state.unit_price,
        "remarks": that.state.remarks,
        "materials_offered_date": that.state.materials_offered_date

      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.setState({
            quantity_offered: '',
            quantity_approved: '',
            location_of_seal: '',
            inspection_date: '',
            ic_signed_on: '',
            inspector_name: '',
            inspector_mobile: '',
            quantity_on_order: '',
            quantity_supplied_so_far: '',
            balance_quantity: '',
            unit_price: '',
            remarks: '',
            materials_offered_date: ''
          });
          var body = {
            "order_number": that.state.order_number,
            "ic_id": response.data._id,
            "status": "IC Generated",
            "email": that.state.vendor_email
          };
          that.updatePoStatus(body);
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
      var apiUrl = _url.baseUrl + _url.getInspectorInfoUrl + that.state._id;

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
            flag: 2
          });
        } else if (response.status == 404) {
          alert("No Inspector found with this id");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updateInfo',
    value: function updateInfo(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateInspectorInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      var body = {
        "_id": that.state._id,
        "name": that.state.name,
        "mobile": that.state.mobile,
        "email": that.state.email,
        "password": that.state.password,
        "role": "Inspector",
        "location": that.state.location
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
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
    key: 'generateCorrigendum',
    value: function generateCorrigendum(event) {

      var that = this;
      if (that.state.corrigendum_number == '' || that.state.update_values == '') {
        alert("Required fields shouldn't be empty!!");
        return;
      }
      var apiUrl = _url.baseUrl + _url.generateCorrigendumUrl;
      var body = {
        corrigendum_number: that.state.corrigendum_number,
        order_number: that.state.order_number,
        order_date: that.state.order_date,
        ic_id: that.state.ic_id,
        generated_by: that.state._id,
        remarks: that.state.remarks,
        update_values: that.state.update_values
      };

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
        if (response.status == 200) {
          that.setState({ remarks: '', update_values: '' });
          that.updateIC(that.state.order_number, that.state.ic_id, response.data._id);
        } else if (response.status == 204) {
          alert("Corrigendum is already present!");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updateIC',
    value: function updateIC(orderNumber, ic_id, corrigendum_id) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateICInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": orderNumber,
        "ic_id": ic_id,
        "corrigendum_id": corrigendum_id
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.getDyceeEmail(that.state._id);
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getDyceeEmail',
    value: function getDyceeEmail(inspector_id) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.getDyceeEmailUrl + inspector_id;

      console.log(apiUrl);
      _axios2.default.get(apiUrl).then(function (response) {
        console.log(response);
        var corr_body = {
          "order_number": that.state.order_number,
          "status": "Corrigendum Generated",
          "email": response.data.email
        };
        that.updatePoStatus(corr_body);
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getCorrigendum',
    value: function getCorrigendum(corrigendum_id) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.oneCorrigendumUrl + corrigendum_id;

      console.log(apiUrl);
      _axios2.default.get(apiUrl).then(function (response) {
        console.log(response);
        that.setState({ corrigendum_array: response.data, corrigendum_flag: 1 });
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'generateInspectionReport',
    value: function generateInspectionReport(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.addInspectionReportUrl;
      var report_status = '';
      if (that.state.selectedIrStatusPos == '0') {
        report_status = "Partial";
      } else {
        report_status = "Complete";
      }
      var item_status = '';
      if (that.state.selectedItemStatusPos == '0') {
        item_status = "Pass";
      } else {
        item_status = "Fail";
      }
      var body = {
        order_number: that.state.order_number,
        item_status: item_status,
        report_status: report_status
      };

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          if (report_status == "Partial") {
            that.removeVisit(that.state.order_number, that.state.vendor_code, "IR Partial");
          } else if (item_status == "Pass") {
            var body1 = {
              "order_number": that.state.order_number,
              "status": "Passed"
            };
            that.updatePoStatus(body1);
          } else if (item_status == "Fail") {
            that.removeVisit(that.state.order_number, that.state.vendor_code, "Rejected");
          }
          //alert("Inspection_Report generated successfully!");
        } else if (response.status == 204) {
          alert("Inspection_Report is already present!");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'removeVisit',
    value: function removeVisit(orderNumber, vendor_code, status) {
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
          var body = {
            "order_number": orderNumber,
            "status": status,
            "email": that.state.vendor_email
          };
          that.updatePoStatus(body);
        } else if (response.status == 204) {
          alert("Visit to be removed is not present!");
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
        apiUrl = apiUrl + _url.inspectorPOUrl + userId;
      } else if (type == "AllIC") {
        apiUrl += _url.allIcUrl + userId;
      }

      var headers = {
        SECURITY_TOKEN: userId
      };

      console.log(apiUrl);
      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200 && type == "Purchase_Order") {
          that.setState({ responseDataArray: response.data, flag: 5 });
        } else if (response.status == 200 && type == "AllIC") {
          that.setState({ responseDataArray: response.data, flag: 8 });
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'generateVisit',
    value: function generateVisit(event) {

      var that = this;

      if (that.state.date == '' || that.state.time == '') {
        alert("Required fields shouldn't be empty!!");
        return;
      }
      var apiUrl = _url.baseUrl + _url.addVisitUrl;
      var body = {
        order_number: that.state.order_number,
        date: that.state.date,
        time: that.state.time,
        inspector_id: that.state._id,
        vendor_code: that.state.vendor_code,
        visit_status: "Intimated"
      };

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
        if (response.status == 200) {
          console.log(response);
          that.setState({ date: '', time: '' });
          var body1 = {
            "order_number": that.state.order_number,
            "status": "Intimated",
            "email": that.state.vendor_email
          };
          that.updatePoStatus(body1);
        } else if (response.status == 204) {
          alert("Visit is already present for this order!");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getStatusStyle',
    value: function getStatusStyle(status) {

      if (status == 'Assigned') {
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
      } else if (status == 'IC Generated') {
        return styles.ICGeneratedStyle;
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
    key: 'updatePoStatus',
    value: function updatePoStatus(body) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updatePOInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
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
    key: 'updateVisitStatus',
    value: function updateVisitStatus(status, orderNumber, vendor_code) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateVisitInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "order_number": orderNumber,
        "vendor_code": vendor_code,
        "visit_status": status
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          var body = {
            "order_number": orderNumber,
            "status": status
          };
          that.updatePoStatus(body);
        } else if (response.status == 204) {
          alert("Visit to be updated is not present!");
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }]);

  return InspectorHome;
}(_react.Component);

exports.default = InspectorHome;


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
    margin: '4px'
  },
  iconSize: 18,
  textFieldStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: -10
  },
  opaqueTextStyle: {
    marginLeft: 15,
    color: '#C0C0C0'
  },
  textCellStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  signedOnStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 10
  },
  iconStyle: {
    marginTop: 18
  },
  selectIconStyle: {
    marginTop: 18,
    marginRight: 18
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
  ICGeneratedStyle: {
    backgroundColor: '#8a496b',
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
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: '60px'
  },
  corriStyle: {
    margin: 15,
    padding: 8,
    paddingRight: 8,
    boxShadow: '1px 3px 5px #A9A9A9',
    border: '1px solid #D3D3D3'
  },
  areaStyle: {
    margin: 15,
    padding: 4,
    boxShadow: '1px 3px 5px #A9A9A9',
    border: '1px solid #D3D3D3'
  },
  buttonContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 12
  }
};