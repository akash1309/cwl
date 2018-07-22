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

var _CeePalette = require('./CeePalette');

var _CeePalette2 = _interopRequireDefault(_CeePalette);

var _url = require('./../../config/url');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _materialUi = require('material-ui');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CeeHome = function (_Component) {
  _inherits(CeeHome, _Component);

  function CeeHome(props) {
    _classCallCheck(this, CeeHome);

    var _this = _possibleConstructorReturn(this, (CeeHome.__proto__ || Object.getPrototypeOf(CeeHome)).call(this, props));

    _this.addDyCEE = function () {
      if (_this.state.flag == 1) return _react2.default.createElement(
        'div',
        { style: styles.outerContainerStyle },
        _react2.default.createElement(
          'span',
          { style: styles.headingStyle },
          'DyCEE Panel'
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
                _this.addDyCEEFunc(event);
              } })
          )
        )
      );
    };

    _this.showPeople = function () {

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
          { style: styles.itemHeaderContainer },
          _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'S.No.'
          ),
          _this.state.type == "Vendor" ? _react2.default.createElement(
            'span',
            { style: styles.textCellContainer },
            'Code'
          ) : null,
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
        _this.state.responseDataArray.map(function (member, key) {
          return _react2.default.createElement(
            'div',
            { style: styles.itemContainer },
            _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              key + 1
            ),
            _this.state.type == "Vendor" ? _react2.default.createElement(
              'span',
              { style: styles.textCellContainer },
              member.vendor_code
            ) : null,
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

    _this.showPurchaseOrders = function () {

      if (_this.state.flag == 3) return _react2.default.createElement(
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

    _this.showIC = function () {

      if (_this.state.flag == 5) return _react2.default.createElement(
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

    _this.showProfile = function () {
      if (_this.state.flag == 8) return _react2.default.createElement(
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
          ),
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
      corrigendum_array: [],
      flag: -1,
      name: '',
      email: '',
      mobile: '',
      location: '',
      role: "DyCEE",
      type: ''
    };
    return _this;
  }

  _createClass(CeeHome, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({ _id: userInfo.userId });
      this.fetchAllEntities("Purchase_Order");
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
            _react2.default.createElement(_materialUi.AppBar, { title: 'CEE Home', width: '50%' }),
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', flexDirection: 'row' } },
              _react2.default.createElement(_CeePalette2.default, {
                onClickAddDycee: function onClickAddDycee() {
                  return _this2.setState({ flag: 1 });
                },
                onClickDycee: function onClickDycee() {
                  return _this2.fetchAllEntities("DyCEE");
                },
                onClickVendors: function onClickVendors() {
                  return _this2.fetchAllEntities("Vendor");
                },
                onClickInspectors: function onClickInspectors() {
                  return _this2.fetchAllEntities("Inspector");
                },
                onClickStoreOfficers: function onClickStoreOfficers() {
                  return _this2.fetchAllEntities("StoreOfficer");
                },
                onClickPurchaseOrders: function onClickPurchaseOrders() {
                  return _this2.fetchAllEntities("Purchase_Order");
                },
                onClickProfile: function onClickProfile() {
                  return _this2.getProfileInfo(_this2);
                },
                onClickLogout: function onClickLogout() {
                  return _this2.logout();
                }

              }),
              this.addDyCEE(),
              this.showPeople(),
              this.showPurchaseOrders(),
              this.showIC(),
              this.showProfile()
            )
          )
        )
      );
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.props.history.replace({
        pathname: '/'
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
    key: 'addDyCEEFunc',
    value: function addDyCEEFunc(event) {
      var that = this;

      if (that.state.name == '' || that.state.email == '' || that.state.mobile == '') {
        alert("Required fields shouldn't be empty!!");
        return;
      }
      var apiUrl = _url.baseUrl + _url.addDyCEEUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "name": that.state.name,
        "mobile": that.state.mobile,
        "location": that.state.location,
        "email": that.state.email,
        "role": that.state.role,
        "cee_id": that.state._id
      }, { headers: headers }).then(function (response) {
        if (response.status == 200) {
          that.setState({ name: '', mobile: '', email: '', location: '' });
          that.fetchAllEntities("DyCEE");
        } else if (response.status == 204) {
          alert("DyCee is already present!");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'getProfileInfo',
    value: function getProfileInfo(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.getCeeInfoUrl + that.state._id;

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
            password: response.data.password,
            flag: 8 });
        } else if (response.status == 404) {
          alert("No CEE found with this id");
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'updateInfo',
    value: function updateInfo(event) {

      console.log("inside updateInfo");

      var that = this;
      var apiUrl = _url.baseUrl + _url.updateCeeInfoUrl;

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.post(apiUrl, {
        "_id": that.state._id,
        "name": that.state.name,
        "mobile": that.state.mobile,
        "email": that.state.email,
        "password": that.state.password,
        "role": "CEE"
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
    key: 'fetchAllEntities',
    value: function fetchAllEntities(type, userId) {

      var that = this;
      var apiUrl = _url.baseUrl;

      if (type == "DyCEE") {
        apiUrl += _url.allDyCeeUrl;
        that.setState({ type: type, responseDataArray: [] });
      } else if (type == "Inspector") {
        apiUrl += _url.allInspectorUrl;
        that.setState({ type: type, responseDataArray: [] });
      } else if (type == "StoreOfficer") {
        apiUrl += _url.allStoreOfficerUrl;
        that.setState({ type: type, responseDataArray: [] });
      } else if (type == "Vendor") {
        apiUrl += _url.allVendorUrl;
        that.setState({ type: type, responseDataArray: [] });
      } else if (type == "Purchase_Order") {
        apiUrl += _url.allPurchaseOrderUrl;
      } else if (type == "AllIC") {
        apiUrl += _url.allIcUrl + userId;
      }

      var headers = {
        SECURITY_TOKEN: that.state._id
      };

      _axios2.default.get(apiUrl, { headers: headers }).then(function (response) {

        console.log(response);
        if (response.status == 200 && type == "Purchase_Order") {
          that.setState({ responseDataArray: response.data, flag: 3 });
        } else if (response.status == 200 && type == "AllIC") {
          that.setState({ responseDataArray: response.data, flag: 5 });
        } else if (response.status == 200) {
          that.setState({ responseDataArray: response.data, flag: 2 });
        }
      }).catch(function (error) {
        console.log(error.response);
        alert(error.response.data.message);
      });
    }
  }]);

  return CeeHome;
}(_react.Component);

exports.default = CeeHome;


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
  }
};