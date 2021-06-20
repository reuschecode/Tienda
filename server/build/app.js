"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _productos = _interopRequireDefault(require("./routes/productos.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _usuario = _interopRequireDefault(require("./routes/usuario.routes"));

var _initialSetup = require("./libs/initialSetup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //configuracion 

(0, _initialSetup.initialSetup)();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.set('port', process.env.PORT || 3001); //rutas

app.get('/', function (req, res) {
  res.json("bienvenido");
});
app.use('/api/productos', _productos["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/usuario', _usuario["default"]);
var _default = app;
exports["default"] = _default;