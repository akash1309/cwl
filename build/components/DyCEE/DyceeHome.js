'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _md = require('react-icons/lib/md');

var MaterialIcon = _interopRequireWildcard(_md);

var _DyCeePalette = require('./DyCeePalette');

var _DyCeePalette2 = _interopRequireDefault(_DyCeePalette);

var _url = require('./../../config/url');

var _materialUi = require('material-ui');

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DyCeeHome = function (_React$Component) {
  _inherits(DyCeeHome, _React$Component);

  function DyCeeHome(props) {
    _classCallCheck(this, DyCeeHome);

    var _this = _possibleConstructorReturn(this, (DyCeeHome.__proto__ || Object.getPrototypeOf(DyCeeHome)).call(this, props));

    _this.handleChange = function (event, index, value) {
      _this.setState({ selectedStoreOfficerPos: value });
      _this.fetchAllEntities("Purchase_Order", _this.state.storeOfficerArray[value]._id);
    };

    _this.handleVendorListChange = function (event, index, value) {
      _this.setState({ selectedStoreOfficerPos: value });
      _this.fetchAllEntities("Vendor", _this.state.storeOfficerArray[value]._id);
    };

    _this.handleInspectorChange = function (event, index, value) {
      _this.setState({ selectedInspectorPos: value });
    };

    _this.handleClose = function () {
      _this.setState({ open: false });
    };

    _this.showInspector = function () {

      var items = [];
      for (var i = 0; i < _this.state.inspectorArray.length; i++) {
        items.push(_react2.default.createElement(_MenuItem2.default, { value: i, key: i, primaryText: _this.state.inspectorArray[i].name }));
      }

      var actions = [_react2.default.createElement(_materialUi.FlatButton, {
        label: 'Back',
        primary: true,
        onClick: _this.handleClose
      }), _react2.default.createElement(_materialUi.FlatButton, {
        label: 'Assign',
        primary: true,
        keyboardFocused: true,
        onClick: function onClick() {
          var body = {};
          if (_this.state.updateflag == "inspectionInspector") {
            body = {
              "order_number": _this.state.order_number,
              "inspected_by": _this.state.inspectorArray[_this.state.selectedInspectorPos]._id,
              "status": "Assigned"
            };
          } else if (_this.state.updateflag == "amendmentInspector") {
            body = {
              "order_number": _this.state.order_number,
              "status": "Amendment Inspector Nominated",
              "amendmentInspector": _this.state.inspectorArray[_this.state.selectedInspectorPos]._id
            };
          }
          _this.updatePoStatus(body);
        }
      })];

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _materialUi.Dialog,
          {
            title: 'Assign Inspector',
            actions: actions,
            modal: false,
            open: _this.state.open,
            onRequestClose: _this.handleClose
          },
          _react2.default.createElement(
            _SelectField2.default,
            {
              value: _this.state.selectedInspectorPos,
              onChange: _this.handleInspectorChange,
              maxHeight: 200
            },
            items
          )
        )
      );
    };

    _this.showVendorList = function () {

      var items = [];
      for (var i = 0; i < _this.state.storeOfficerArray.length; i++) {
        items.push(_react2.default.createElement(_MenuItem2.default, { value: i, key: i, primaryText: _this.state.storeOfficerArray[i].name }));
      }

      if (_this.state.flag == 2) return _react2.default.createElement(
        'div',
        { style: { flex: 1 } },
        _react2.default.createElement(
          'div',
          { style: styles.outerContainerStyle },
          _react2.default.createElement(
            'span',
            { style: styles.headingStyle },
            'List of ',
            _this.state.type + 's'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: styles.comboStyle },
          _react2.default.createElement(
            'span',
            { style: _extends({}, styles.textLabel, { marginRight: 20 }) },
            'Select Store Officer:'
          ),
          _react2.default.createElement(
            _SelectField2.default,
            {
              value: _this.state.selectedStoreOfficerPos,
              onChange: _this.handleVendorListChange,
              maxHeight: 200
            },
            items
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
            'Location'
          ),
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'PO Remaining'
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
              member.location
            ),
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              _this.POCount(member.vendor_code)
            )
          );
        })
      );
    };

    _this.showInspectorList = function () {

      if (_this.state.flag == 10) return _react2.default.createElement(
        'div',
        { style: { flex: 1 } },
        _react2.default.createElement(
          'div',
          { style: styles.outerContainerStyle },
          _react2.default.createElement(
            'span',
            { style: styles.headingStyle },
            'List of ',
            _this.state.type + 's'
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
            'Location'
          )
        ),
        _this.state.inspectorArray.map(function (member, key) {
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
              member.location
            )
          );
        })
      );
    };

    _this.showStoreOfficerList = function () {

      if (_this.state.flag == 11) return _react2.default.createElement(
        'div',
        { style: { flex: 1 } },
        _react2.default.createElement(
          'div',
          { style: styles.outerContainerStyle },
          _react2.default.createElement(
            'span',
            { style: styles.headingStyle },
            'List of ',
            _this.state.type + 's'
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
            'Location'
          )
        ),
        _this.state.storeOfficerArray.map(function (member, key) {
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
              member.location
            )
          );
        })
      );
    };

    _this.addPeople = function () {

      if (_this.state.flag == 3) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          _this.state.type,
          ' Panel'
        ),
        _react2.default.createElement(
          'div',
          { style: styles.innerContainerStyle },
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
          ),
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
              hintText: 'Location',
              floatingLabelText: 'Location',
              onChange: function onChange(event, newValue) {
                return _this.setState({ location: newValue });
              },
              style: styles.textFieldStyle
            })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'div',
            { style: styles.textCellStyle },
            _react2.default.createElement(_materialUi.RaisedButton, { label: 'ADD', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                _this.addPeopleFunc(event);
              } })
          )
        )
      );
    };

    _this.showPurchaseOrders = function () {

      var items = [];
      for (var i = 0; i < _this.state.storeOfficerArray.length; i++) {
        items.push(_react2.default.createElement(_MenuItem2.default, { value: i, key: i, primaryText: _this.state.storeOfficerArray[i].name }));
      }

      if (_this.state.flag == 4) return _react2.default.createElement(
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
        _react2.default.createElement(
          'div',
          { style: styles.comboStyle },
          _react2.default.createElement(
            'span',
            { style: _extends({}, styles.textLabel, { marginRight: 20 }) },
            'Select Store Officer:'
          ),
          _react2.default.createElement(
            _SelectField2.default,
            {
              value: _this.state.selectedStoreOfficerPos,
              onChange: _this.handleChange,
              maxHeight: 200
            },
            items
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
                  null,
                  'Order Date: ',
                  member.order_date
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Offer No: ',
                  member.offer_no
                ),
                _react2.default.createElement(
                  'span',
                  null,
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
                  null,
                  'Specification: ',
                  member.itemdetails.specification
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Quantity Rate: ',
                  member.itemdetails.quantity_rate
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Duties Charges: ',
                  member.itemdetails.duties_charges
                ),
                _react2.default.createElement(
                  'span',
                  null,
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
                  null,
                  'Code: ',
                  member.vendor_info.code
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Name: ',
                  member.vendor_info.name
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Email: ',
                  member.vendor_info.email
                ),
                _react2.default.createElement(
                  'span',
                  null,
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
                  null,
                  'Name: ',
                  member.inspected_by.name
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Mobile: ',
                  member.inspected_by.mobile
                ),
                _react2.default.createElement(
                  'span',
                  null,
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
                  null,
                  'No: ',
                  member.tender_info.tender_no
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Type: ',
                  member.tender_info.tender_type
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'Opened On: ',
                  member.tender_info.opened_on
                )
              )
            ),
            member.status == "Processed" ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Assign Inspector',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick() {
                  return _this.handleOpen(member.order_number, "inspectionInspector");
                }
              })
            ) : null,
            member.status == "Failed" ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Reject',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick() {
                  return _this.rejectionPo("Rejected", member.order_number);
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
                    return _this.fetchAllEntities("AllIC", member.order_number, member.vendor_info.code, member.status);
                  }
                })
              )
            ) : null,
            member.status == "Amendment Requested" ? _react2.default.createElement(
              'div',
              { style: styles.buttonContainerStyle },
              _react2.default.createElement('br', null),
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Nominate Inspector',
                primary: true,
                style: styles.buttonStyle,
                onClick: function onClick() {
                  return _this.handleOpen(member.order_number, "amendmentInspector");
                }
              })
            ) : null
          );
        }),
        _this.showInspector()
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
        ),
        _this.state.status == "Corrigendum Generated" && _this.state.key == "0" ? _react2.default.createElement(
          'div',
          { style: styles.buttonContainerStyle },
          _react2.default.createElement(_materialUi.RaisedButton, {
            label: 'Approve',
            primary: true,
            style: styles.buttonStyle,
            onClick: function onClick() {
              return _this.checkBalanceQty(_this.state.corrigendum_array.ic_id.balance_quantity, _this.state.corrigendum_array.order_number, _this.state.vendor_code);
            }
          })
        ) : null
      );
    };

    _this.showIC = function () {

      if (_this.state.flag == 6) return _react2.default.createElement(
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
                  return _this.getCorrigendum(member.corrigendum_id, key);
                }
              })
            ) : null,
            member.corrigendum_id != undefined && member.corrigendum_id == _this.state.corrigendum_array._id ? _this.showCorrigendumTable() : null
          );
        })
      );
    };

    _this.showProfile = function () {

      if (_this.state.flag == 9) return _react2.default.createElement(
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

    _this.state = {
      responseDataArray: [],
      storeOfficerArray: [],
      corrigendum_array: [],
      selectedStoreOfficerPos: 0,
      selectedInspectorPos: 0,
      inspectorArray: [],
      name: '',
      email: '',
      mobile: '',
      location: '',
      password: '',
      flag: 4,
      type: '',
      open: false,
      updateflag: '',
      rejection_reason: '',
      update_values: ''
    };
    return _this;
  }

  _createClass(DyCeeHome, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({ id: userInfo.userId, role: userInfo.role });
      this.fetchStoreOfficers(userInfo.userId);
      this.fetchInspectors(userInfo.userId);
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
            _react2.default.createElement(_materialUi.AppBar, { title: 'DyCEE Home', width: '50%' }),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(_DyCeePalette2.default, {
                onClickVendors: function onClickVendors() {
                  return _this2.setState({ flag: 2, responseDataArray: [] });
                },
                onClickInspectors: function onClickInspectors() {
                  return _this2.fetchAllEntities("Inspector", _this2.state.id);
                },
                onClickStoreOfficers: function onClickStoreOfficers() {
                  return _this2.fetchAllEntities("StoreOfficer", _this2.state.id);
                },
                onClickAddInspector: function onClickAddInspector() {
                  return _this2.setState({ flag: 3, type: 'Inspector' });
                },
                onClickAddStoreOfficer: function onClickAddStoreOfficer() {
                  return _this2.setState({ flag: 3, type: 'StoreOfficer' });
                },
                onClickPurchaseOrder: function onClickPurchaseOrder() {
                  return _this2.setState({ flag: 4, responseDataArray: [] });
                },
                onClickProfile: function onClickProfile() {
                  return _this2.getProfileInfo();
                },
                onClickLogout: function onClickLogout() {
                  return _this2.logout();
                }
              }),
              this.showPurchaseOrders(),
              this.showVendorList(),
              this.showInspectorList(),
              this.showStoreOfficerList(),
              this.addPeople(),
              this.showIC(),
              this.showProfile()
            )
          )
        )
      );
    }
  }, {
    key: 'handleOpen',
    value: function handleOpen(orderNumber, updateflag) {
      this.setState({
        open: true,
        order_number: orderNumber,
        updateflag: updateflag
      });
    }
  }, {
    key: 'updatePoStatus',
    value: function updatePoStatus(body) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updatePOInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state.id
      };

      _axios2.default.post(apiUrl, body, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.fetchAllEntities("Purchase_Order", that.state.storeOfficerArray[that.state.selectedStoreOfficerPos]._id);
        } else if (response.status == 204) {
          alert("Purchase Order to be updated is not present!");
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getCorrigendum',
    value: function getCorrigendum(corrigendum_id, key) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.oneCorrigendumUrl + corrigendum_id;

      _axios2.default.get(apiUrl).then(function (response) {
        console.log(response);
        that.setState({ corrigendum_array: response.data, key: key, corrigendum_flag: 1 });
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
    key: 'POCount',
    value: function POCount(vendor_code) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.getPOCountUrl + vendor_code;

      _axios2.default.get(apiUrl).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          return response.data.count;
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'checkBalanceQty',
    value: function checkBalanceQty(balance_quantity, orderNumber, vendor_code) {
      if (balance_quantity == 0) {
        var body = {
          "status": "Finished",
          "order_number": orderNumber
        };
        this.updatePoStatus(body);
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
        SECURITY_TOKEN: that.state.id
      };

      _axios2.default.post(apiUrl, {
        "order_number": orderNumber,
        "vendor_code": vendor_code
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          var body = {
            "order_number": orderNumber,
            "status": "Approved"
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
    key: 'addPeopleFunc',
    value: function addPeopleFunc(event) {
      var that = this;
      var apiUrl = _url.baseUrl;

      if (that.state.name == '' || that.state.email == '' || that.state.mobile == '') {
        alert("Required fields shouldn't be empty!!");
        return;
      }

      if (that.state.type == "Inspector") apiUrl += _url.inspectorUrl;else if (that.state.type == "StoreOfficer") apiUrl += _url.addStoreOfficerUrl;

      var headers = {
        SECURITY_TOKEN: that.state.id
      };

      _axios2.default.post(apiUrl, {
        "dycee_id": that.state.id,
        "name": that.state.name,
        "mobile": that.state.mobile,
        "email": that.state.email,
        "location": that.state.location,
        "role": that.state.type
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.clearFields();
        } else if (response.status == 204) {
          alert("User is already present!");
        }
      }).catch(function (error) {
        console.log(error.response);

        alert(error.response.data.message);
      });
    }
  }, {
    key: 'clearFields',
    value: function clearFields() {
      this.setState({ name: '', mobile: '', email: '', location: '' });
      this.fetchAllEntities(this.state.type, this.state.id);
    }
  }, {
    key: 'rejectionPo',
    value: function rejectionPo(status, orderNumber) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updatePOInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state.id
      };

      _axios2.default.post(apiUrl, {
        "order_number": orderNumber,
        "status": status
      }, { headers: headers }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          that.fetchAllEntities("Purchase_Order", that.state.storeOfficerArray[that.state.selectedStoreOfficerPos]._id);
        } else if (response.status == 204) {
          alert("Purchase Order to be rejected is not present!");
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
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
    key: 'getProfileInfo',
    value: function getProfileInfo() {

      var that = this;
      var apiUrl = _url.baseUrl + _url.getDyceeInfoUrl + that.state.id;

      var headers = {
        SECURITY_TOKEN: that.state.id
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
            flag: 9
          });
        } else if (response.status == 404) {
          alert("No DyCEE found with this id");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updateInfo',
    value: function updateInfo(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateDyceeInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state.id
      };

      _axios2.default.post(apiUrl, {
        "_id": that.state.id,
        "name": that.state.name,
        "mobile": that.state.mobile,
        "email": that.state.email,
        "password": that.state.password,
        "role": "DyCEE",
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
    key: 'fetchStoreOfficers',
    value: function fetchStoreOfficers(dyceeId) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.storeOfficerUrl + dyceeId;
      console.log("fetchStoreOfficers");

      var headers = {
        SECURITY_TOKEN: dyceeId
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        //this.fetchAllEntities("Purchase_Order", this.state.response.data[0].id);
        that.setState({ storeOfficerArray: response.data });
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'fetchInspectors',
    value: function fetchInspectors(dyceeId) {
      console.log("fetchInspectors");
      var that = this;
      var apiUrl = _url.baseUrl + _url.dyceeInspectorUrl + dyceeId;

      var headers = {
        SECURITY_TOKEN: dyceeId
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        that.setState({ inspectorArray: response.data });
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'fetchAllEntities',
    value: function fetchAllEntities(type, userId, vendor_code, status) {

      var that = this;
      var apiUrl = _url.baseUrl;

      if (type == "Vendor") {
        apiUrl += _url.VendorByStoreOfficerUrl + userId;
        that.setState({ type: type });
      } else if (type == "Purchase_Order") {
        apiUrl += _url.POUrlByStoreOfficer + userId;
      } else if (type == "Inspector") {
        apiUrl += _url.dyceeInspectorUrl + userId;
        that.setState({ type: type });
      } else if (type == "StoreOfficer") {
        apiUrl += _url.storeOfficerUrl + userId;
        that.setState({ type: type });
      } else if (type == "AllIC") {
        apiUrl += _url.allIcUrl + userId;
      }

      var headers = {
        SECURITY_TOKEN: that.state.id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {

        console.log(response);

        if (response.status == 200 && type == "Vendor") {
          that.setState({ responseDataArray: response.data, flag: 2 });
        } else if (response.status == 200 && type == "Inspector") {
          that.setState({ inspectorArray: response.data, flag: 10 });
        } else if (response.status == 200 && type == "StoreOfficer") {
          that.setState({ storeOfficerArray: response.data, flag: 11 });
        } else if (response.status == 200 && type == "AllIC") {
          that.setState({ responseDataArray: response.data, status: status, vendor_code: vendor_code, flag: 6 });
        } else if (response.status == 200 && type == "Purchase_Order") {
          that.setState({
            responseDataArray: response.data,
            flag: 4,
            open: false
          });
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }]);

  return DyCeeHome;
}(_react2.default.Component);

exports.default = DyCeeHome;


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
  icBoxStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: '60px'
  },
  comboStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center'
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
    marginTop: 10,
    fontWeight: 'Bold',
    color: '#006266'
  },
  buttonContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 12
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
  }
};