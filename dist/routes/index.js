"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _routesHome = _interopRequireDefault(require("./routes.home.js"));
var _routesDash = _interopRequireDefault(require("./routes.dash.js"));
var ruta = (0, _express.Router)();
ruta.use("/", _routesHome["default"]);
ruta.use("/dash", _routesDash["default"]);
var _default = exports["default"] = ruta;