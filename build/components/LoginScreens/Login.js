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

var _reactRouterDom = require('react-router-dom');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    console.log('Login', props);
    _this.state = {
      mobile: '',
      password: '',
      confirmPassword: '',
      flag: -1,
      role: '',
      _id: ''
    };
    return _this;
  }

  _createClass(Login, [{
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
                    return _this2.isMobilePresent(event);
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
                  _react2.default.createElement(_materialUi.RaisedButton, { label: 'Login', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                      _this2.checkLogin(event);
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
                  _react2.default.createElement(_materialUi.RaisedButton, { label: 'Sign Up', primary: true, style: styles.buttonStyle, onClick: function onClick(event) {
                      _this2.handleSignUp(event);
                    } })
                ) : null
              )
            )
          )
        )
      );
    }
  }, {
    key: 'isMobilePresent',
    value: function isMobilePresent(event) {

      var that = this;
      var apiUrl = _url.baseUrl + _url.validateUrl + this.state.mobile;

      _axios2.default.get(apiUrl).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          var userInfo = {
            role: response.data.role,
            userId: response.data._id,
            code: response.data.code
          };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          that.setState({ flag: response.data.flag, role: response.data.role });
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'checkLogin',
    value: function checkLogin(event) {
      var _this3 = this;

      var that = this;
      var apiUrl = _url.baseUrl + _url.loginUrl;

      _axios2.default.post(apiUrl, {
        "mobile": this.state.mobile,
        "password": this.state.password
      }).then(function (response) {
        if (response.status == 200) {

          if (_this3.state.role == "CEE") {
            _this3.props.history.push({
              pathname: '/cee'
            });
          } else if (_this3.state.role == "DyCEE") {
            _this3.props.history.push({
              pathname: '/dycee'
            });
          } else if (_this3.state.role == "Inspector") {
            _this3.props.history.push({
              pathname: '/inspector'
            });
          } else if (_this3.state.role == "Vendor") {
            _this3.props.history.push({
              pathname: '/vendor'
            });
          } else if (_this3.state.role == "StoreOfficer") {
            _this3.props.history.push({
              pathname: '/storeofficer'
            });
          }
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }, {
    key: 'handleSignUp',
    value: function handleSignUp(event) {
      var _this4 = this;

      var password = this.state.password;
      var confirmPassword = this.state.confirmPassword;
      var that = this;

      if (password != confirmPassword) {
        alert("Password and ConfirmPassword fields are not matching.");
        return;
      }

      var apiUrl = _url.baseUrl + _url.signupUrl;

      _axios2.default.post(apiUrl, {
        "mobile": this.state.mobile,
        "password": password

      }).then(function (response) {
        if (response.status == 200) {
          //  console.log(response);

          if (_this4.state.role == "CEE") {
            _this4.props.history.push({
              pathname: '/cee'
            });
          } else if (_this4.state.role == "DyCEE") {
            _this4.props.history.push({
              pathname: '/dycee'
            });
          } else if (_this4.state.role == "Inspector") {
            _this4.props.history.push({
              pathname: '/inspector'
            });
          } else if (_this4.state.role == "Vendor") {
            _this4.props.history.push({
              pathname: '/vendor'
            });
          } else if (_this4.state.role == "StoreOfficer") {
            _this4.props.history.push({
              pathname: '/storeofficer'
            });
          }
        }
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }]);

  return Login;
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

exports.default = Login;