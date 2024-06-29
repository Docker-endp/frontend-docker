"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controller = require("../controllers/controller.dash");
var rutaDash = (0, _express.Router)();
rutaDash.get("/perfilu", _controller.perfilUsuario);
rutaDash.get("/perfilv", _controller.perfilVendedor);
rutaDash.get("/clientes", _controller.listarUsuarios);
var _default = exports["default"] = rutaDash;