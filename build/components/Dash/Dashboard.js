'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Dashboard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Dashboard() {
  return _react2.default.createElement(
    'div',
    { style: styles.divStyle },
    _react2.default.createElement(
      'p',
      { style: styles.pStyle },
      'Get started with style'
    )
  );
}

var styles = {
  divStyle: {
    margin: '40px',
    border: '5px solid pink'
  },
  pStyle: {
    fontSize: '15px',
    textAlign: 'center'
  }
};