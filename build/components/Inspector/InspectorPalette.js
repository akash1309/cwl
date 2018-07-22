'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('react-icons/lib/md');

var MaterialIcon = _interopRequireWildcard(_md);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InspectorPalette = function (_React$Component) {
  _inherits(InspectorPalette, _React$Component);

  function InspectorPalette(props) {
    _classCallCheck(this, InspectorPalette);

    return _possibleConstructorReturn(this, (InspectorPalette.__proto__ || Object.getPrototypeOf(InspectorPalette)).call(this, props));
  }

  _createClass(InspectorPalette, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { width: '280px', backgroundColor: '#f7f1e3', padding: '20px', height: '100vh' } },
        _react2.default.createElement(
          'a',
          { onClick: this.props.onClickVendors, style: styles.innerContainerStyle },
          _react2.default.createElement(MaterialIcon.MdPeopleOutline, { size: styles.iconSize, style: styles.iconStyle }),
          _react2.default.createElement(
            'span',
            { style: styles.textStyle },
            'Vendors'
          )
        ),
        _react2.default.createElement('div', { style: styles.dividerStyle }),
        _react2.default.createElement(
          'a',
          { onClick: this.props.onClickPurchaseOrders, style: styles.innerContainerStyle },
          _react2.default.createElement(MaterialIcon.MdChromeReaderMode, { size: styles.iconSize, style: styles.iconStyle }),
          _react2.default.createElement(
            'span',
            { style: styles.textStyle },
            'Purchase Orders'
          )
        ),
        _react2.default.createElement('div', { style: styles.dividerStyle }),
        _react2.default.createElement(
          'a',
          { onClick: this.props.onClickProfile, style: styles.innerContainerStyle },
          _react2.default.createElement(MaterialIcon.MdFace, { size: styles.iconSize, style: styles.iconStyle }),
          _react2.default.createElement(
            'span',
            { style: styles.textStyle },
            'My Profile'
          )
        ),
        _react2.default.createElement('div', { style: styles.dividerStyle }),
        _react2.default.createElement(
          'a',
          { onClick: this.props.onClickLogout, style: styles.innerContainerStyle },
          _react2.default.createElement(MaterialIcon.MdPowerSettingsNew, { size: styles.iconSize, style: styles.iconStyle }),
          _react2.default.createElement(
            'span',
            { style: styles.textStyle },
            'Logout'
          )
        ),
        _react2.default.createElement('div', { style: styles.dividerStyle })
      );
    }
  }]);

  return InspectorPalette;
}(_react2.default.Component);

exports.default = InspectorPalette;


var styles = {
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