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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    _this.state = {
      mobile: '',
      password: '',
      confirmPassword: '',
      flag: -1
    };
    return _this;
  }

  _createClass(Dashboard, [{
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
            _react2.default.createElement(_materialUi.AppBar, {
              title: 'CWL Login'
            }),
            _react2.default.createElement(
              'div',
              { style: styles.outerContainerStyle },
              _react2.default.createElement(
                'div',
                { style: styles.innerContainerStyle },
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: 'Enter your mobile number',
                  floatingLabelText: 'Mobile Number',
                  onChange: function onChange(event, newValue) {
                    return _this2.setState({ mobile: newValue, flag: -1 });
                  },
                  style: { marginTop: 10 }
                }),
                this.state.flag == -1 ? _react2.default.createElement(_materialUi.RaisedButton, { label: 'Next', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                    return _this2.handleClick(event);
                  } }) : null,
                this.state.flag == 1 ? _react2.default.createElement(
                  'div',
                  { style: styles.outerContainerStyle },
                  _react2.default.createElement(_materialUi.TextField, {
                    type: 'password',
                    hintText: 'Enter Password',
                    floatingLabelText: 'Password',
                    onChange: function onChange(event, newValue) {
                      return _this2.setState({ password: newValue });
                    },
                    style: { marginTop: -10 }
                  }),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement(_materialUi.RaisedButton, { label: 'Login', primary: true, style: styles.buttonStyle, onClick: function onClick() {
                      return _this2.setState({ flag: 0 });
                    } })
                ) : null,
                this.state.flag == 0 ? _react2.default.createElement(
                  'div',
                  { style: styles.outerContainerStyle },
                  _react2.default.createElement(_materialUi.TextField, {
                    type: 'password',
                    hintText: 'Enter Password',
                    floatingLabelText: 'Password',
                    onChange: function onChange(event, newValue) {
                      return _this2.setState({ password: newValue });
                    },
                    style: { marginTop: -10 }
                  }),
                  _react2.default.createElement(_materialUi.TextField, {
                    type: 'password',
                    hintText: 'Enter Confirm Password',
                    floatingLabelText: 'Confirm Password',
                    onChange: function onChange(event, newValue) {
                      return _this2.setState({ confirmPassword: newValue });
                    },
                    style: { marginTop: -10 }
                  }),
                  _react2.default.createElement(_materialUi.RaisedButton, { label: 'Sign Up', primary: true, style: styles.buttonStyle, onClick: function onClick() {
                      return _this2.setState({ flag: 1 });
                    } })
                ) : null
              )
            )
          )
        )
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {

      var that = this;
      var apiUrl = _url.baseUrl + "/signup/" + this.state.mobile;

      _axios2.default.get(apiUrl).then(function (response) {
        if (response.status == 200) {
          that.setState({ flag: response.data.flag });
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }]);

  return Dashboard;
}(_react.Component);

var styles = {
  outerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #00BCD4',
    borderRadius: 25,
    margin: 70,
    padding: 30
  },
  buttonStyle: {
    margin: 15
  }
};

exports.default = Dashboard;