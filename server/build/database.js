"use strict";

var _mysql = _interopRequireDefault(require("mysql"));

var _util = require("util");

var _keys = require("./keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = _mysql["default"].createPool(_keys.database);

db.getConnection(function (err, connection) {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('La conexión a la base de datos fue cerrada.');
    }

    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('La base de datos tiene muchas conexión');
    }

    if (err.code === 'ECONNREFUSED') {
      console.error('La conexión se negó a conectarse');
    }
  }

  if (connection) {
    connection.release();
    console.log("La base de datos está conectada");
  }

  return;
});
db.query = (0, _util.promisify)(db.query);
module.exports = db;