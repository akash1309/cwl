'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Login = require('./LoginScreens/Login');

var _Login2 = _interopRequireDefault(_Login);

var _InspectorHome = require('./Inspector/InspectorHome');

var _InspectorHome2 = _interopRequireDefault(_InspectorHome);

var _CeeHome = require('./CEE/CeeHome');

var _CeeHome2 = _interopRequireDefault(_CeeHome);

var _DyceeHome = require('./DyCEE/DyceeHome');

var _DyceeHome2 = _interopRequireDefault(_DyceeHome);

var _VendorHome = require('./Vendor/VendorHome');

var _VendorHome2 = _interopRequireDefault(_VendorHome);

var _StoreOfficerHome = require('./StoreOfficer/StoreOfficerHome');

var _StoreOfficerHome2 = _interopRequireDefault(_StoreOfficerHome);

var _Test = require('./Test/Test');

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: _Login2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/inspector', exact: true, component: _InspectorHome2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/cee', exact: true, component: _CeeHome2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/dycee', exact: true, component: _DyceeHome2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/vendor', exact: true, component: _VendorHome2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/storeofficer', exact: true, component: _StoreOfficerHome2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/test', exact: true, component: _Test2.default })
    )
  );
};

// <Route path="/pokemon" exact render={() => (<Redirect to="/pokemon/ability/telepathy" />)} />
// <Route path="/pokemon/ability/:ability" render={(location) => (<List pokemon={pokemon.list} location={location} />)} />