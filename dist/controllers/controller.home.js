"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = exports.home = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();

// Pagina Principal
var home = exports.home = function home(req, res) {
  res.render("views.home.ejs");
};

// Register
var register = exports.register = function register(req, res) {
  res.render("views.register.ejs");
};

// login
var login = exports.login = function login(req, res) {
  res.render("views.login.ejs");
};