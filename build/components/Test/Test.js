'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DialogExampleSimple = function (_React$Component) {
  _inherits(DialogExampleSimple, _React$Component);

  function DialogExampleSimple() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DialogExampleSimple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DialogExampleSimple.__proto__ || Object.getPrototypeOf(DialogExampleSimple)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleOpen = function () {
      _this.setState({ open: true });
    }, _this.handleClose = function () {
      _this.setState({ open: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DialogExampleSimple, [{
    key: 'render',
    value: function render() {
      var actions = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Cancel',
        primary: true,
        onClick: this.handleClose
      }), _react2.default.createElement(_FlatButton2.default, {
        label: 'Delete',
        primary: true,
        keyboardFocused: true,
        onClick: this.handleClose
      })];

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RaisedButton2.default, { label: 'Dialog', onClick: this.handleOpen }),
        _react2.default.createElement(
          _Dialog2.default,
          {
            title: 'Delete Purchase Order',
            actions: actions,
            modal: false,
            open: this.state.open,
            onRequestClose: this.handleClose
          },
          'Are you sure you want to delete the purchase order ?'
        )
      );
    }
  }]);

  return DialogExampleSimple;
}(_react2.default.Component);

exports.default = DialogExampleSimple;