"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.perfilVendedor = exports.perfilUsuario = exports.listarUsuarios = void 0;
// RUTAS DEL USUARIO

// Perfilusuario
var perfilUsuario = exports.perfilUsuario = function perfilUsuario(req, res) {
  res.render("views.dash.user.ejs");
};

// RUTAS VENDEDOR
var perfilVendedor = exports.perfilVendedor = function perfilVendedor(req, res) {
  res.render("views.dash.vendedor.ejs");
};

// Mostrar Clientes
var listarUsuarios = exports.listarUsuarios = function listarUsuarios(req, res) {
  res.render("views.registrados.clientes.ejs");
};