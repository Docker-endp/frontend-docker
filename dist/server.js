"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _path = _interopRequireDefault(require("path"));
var _ejs = _interopRequireDefault(require("ejs"));
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var server = (0, _express["default"])();
server.use("/", _index["default"]);

// midlleware
server.set("port", process.env.PORT);
server.set('view engine', 'ejs');
server.set("views", _path["default"].join(__dirname, "views"));
server.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));

// Error 404
server.use("/", function (req, res) {
  res.render("views.error404.ejs");
});
var _default = exports["default"] = server;