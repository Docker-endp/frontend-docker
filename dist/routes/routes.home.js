"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllerHome = require("../controllers/controller.home.js");
var rutaHome = (0, _express.Router)();
rutaHome.get("/", _controllerHome.home);
rutaHome.get("/register", _controllerHome.register);
rutaHome.get("/login", _controllerHome.login);
var _default = exports["default"] = rutaHome;