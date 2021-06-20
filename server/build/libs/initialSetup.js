"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialSetup = void 0;

var _database = _interopRequireDefault(require("../database"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initialSetup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            crearPermisos();
            crearRoles();
            crearRolPermisos();
            crearEmpresa();
            crearTienda();
            crearAdmin();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initialSetup() {
    return _ref.apply(this, arguments);
  };
}();

exports.initialSetup = initialSetup;

var crearPermisos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _database["default"].query('SELECT COUNT(*) AS cantidad FROM permiso', /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, rows, fields) {
                var values;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (err) {
                          _context2.next = 8;
                          break;
                        }

                        if (!(rows[0].cantidad > 0)) {
                          _context2.next = 3;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 3:
                        values = [['CREAR_PRODUCTO'], ['EDITAR_PRODUCTO'], ['CREAR_PRODUCTO']];
                        _context2.next = 6;
                        return _database["default"].query("INSERT INTO permiso(nombre_permiso) VALUES ?", [values], function (err, rows, fields) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Se crearon 3 permisos: ");
                            console.warn(values);
                          }
                        });

                      case 6:
                        _context2.next = 9;
                        break;

                      case 8:
                        console.log(err);

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x, _x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  }));

  return function crearPermisos() {
    return _ref2.apply(this, arguments);
  };
}();

var crearRoles = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _database["default"].query('SELECT COUNT(*) AS cantidad FROM rol', /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err, rows, fields) {
                var values;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (err) {
                          _context4.next = 8;
                          break;
                        }

                        if (!(rows[0].cantidad > 0)) {
                          _context4.next = 3;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 3:
                        values = [['ADMIN'], ['ADMIN_EMPRESA'], ['ADMIN_TIENDA'], ['USUARIO_TIENDA']];
                        _context4.next = 6;
                        return _database["default"].query("INSERT INTO rol(nombre_rol) VALUES ?", [values], function (err, rows, fields) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Se crearon 4 roles: ");
                            console.warn(values);
                          }
                        });

                      case 6:
                        _context4.next = 9;
                        break;

                      case 8:
                        console.log(err);

                      case 9:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x4, _x5, _x6) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 3:
            _context5.next = 8;
            break;

          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 5]]);
  }));

  return function crearRoles() {
    return _ref4.apply(this, arguments);
  };
}();

var crearRolPermisos = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _database["default"].query('SELECT COUNT(*) AS cantidad FROM rol_permiso', /*#__PURE__*/function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(err, rows, fields) {
                var values;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (err) {
                          _context6.next = 8;
                          break;
                        }

                        if (!(rows[0].cantidad > 0)) {
                          _context6.next = 3;
                          break;
                        }

                        return _context6.abrupt("return");

                      case 3:
                        values = [[1, 1], [1, 2], [1, 3]];
                        _context6.next = 6;
                        return _database["default"].query("INSERT INTO rol_permiso(rol_id, permiso_id) VALUES ?", [values], function (err, rows, fields) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Se crearon 3 permisos para el rol Admin: ");
                            console.warn(values);
                          }
                        });

                      case 6:
                        _context6.next = 9;
                        break;

                      case 8:
                        console.log(err);

                      case 9:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x7, _x8, _x9) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 3:
            _context7.next = 8;
            break;

          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 5]]);
  }));

  return function crearRolPermisos() {
    return _ref6.apply(this, arguments);
  };
}();

var crearEmpresa = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _database["default"].query('SELECT COUNT(*) AS cantidad FROM empresa', /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(err, rows, fields) {
                var values;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        if (err) {
                          _context8.next = 8;
                          break;
                        }

                        if (!(rows[0].cantidad > 0)) {
                          _context8.next = 3;
                          break;
                        }

                        return _context8.abrupt("return");

                      case 3:
                        values = [['ReusCode', null, null]];
                        _context8.next = 6;
                        return _database["default"].query("INSERT INTO empresa(nombre_empresa, url_imagen, ruc) VALUES ?", [values], function (err, rows, fields) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Se crearon 1 empresa: ");
                            console.warn(values);
                          }
                        });

                      case 6:
                        _context8.next = 9;
                        break;

                      case 8:
                        console.log(err);

                      case 9:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x10, _x11, _x12) {
                return _ref9.apply(this, arguments);
              };
            }());

          case 3:
            _context9.next = 8;
            break;

          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            console.error(_context9.t0);

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 5]]);
  }));

  return function crearEmpresa() {
    return _ref8.apply(this, arguments);
  };
}();

var crearAdmin = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _database["default"].query('SELECT COUNT(*) AS cantidad FROM usuario', /*#__PURE__*/function () {
              var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(err, rows, fields) {
                var values;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        if (err) {
                          _context10.next = 12;
                          break;
                        }

                        if (!(rows[0].cantidad > 0)) {
                          _context10.next = 3;
                          break;
                        }

                        return _context10.abrupt("return");

                      case 3:
                        _context10.next = 5;
                        return encryptPassword('reusche_1');

                      case 5:
                        _context10.t0 = _context10.sent;
                        _context10.t1 = ['reusche488@gmail.com', _context10.t0, 70868712, 1, 1];
                        values = [_context10.t1];
                        _context10.next = 10;
                        return _database["default"].query("INSERT INTO usuario(email, password, dni, id_tienda_fk, id_rol_fk) VALUES ?", [values], function (err, rows, fields) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Se crearon 1 admin: ");
                            console.warn(values);
                          }
                        });

                      case 10:
                        _context10.next = 13;
                        break;

                      case 12:
                        console.log(err);

                      case 13:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function (_x13, _x14, _x15) {
                return _ref11.apply(this, arguments);
              };
            }());

          case 3:
            _context11.next = 8;
            break;

          case 5:
            _context11.prev = 5;
            _context11.t0 = _context11["catch"](0);
            console.error(_context11.t0);

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 5]]);
  }));

  return function crearAdmin() {
    return _ref10.apply(this, arguments);
  };
}();

var crearTienda = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _database["default"].query('SELECT COUNT(*) AS cantidad FROM tienda', /*#__PURE__*/function () {
              var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(err, rows, fields) {
                var values;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        if (err) {
                          _context12.next = 8;
                          break;
                        }

                        if (!(rows[0].cantidad > 0)) {
                          _context12.next = 3;
                          break;
                        }

                        return _context12.abrupt("return");

                      case 3:
                        values = [['ReusCode', 'Cloud', 'Cloud', 1]];
                        _context12.next = 6;
                        return _database["default"].query("INSERT INTO tienda(nombre_tienda, direccion_tienda, departamento_tienda, id_empresa_fk) VALUES ?", [values], function (err, rows, fields) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Se crearon 1 tienda: ");
                            console.warn(values);
                          }
                        });

                      case 6:
                        _context12.next = 9;
                        break;

                      case 8:
                        console.log(err);

                      case 9:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));

              return function (_x16, _x17, _x18) {
                return _ref13.apply(this, arguments);
              };
            }());

          case 3:
            _context13.next = 8;
            break;

          case 5:
            _context13.prev = 5;
            _context13.t0 = _context13["catch"](0);
            console.error(_context13.t0);

          case 8:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 5]]);
  }));

  return function crearTienda() {
    return _ref12.apply(this, arguments);
  };
}();

var encryptPassword = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(password) {
    var salt;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context14.sent;
            _context14.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            return _context14.abrupt("return", _context14.sent);

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function encryptPassword(_x19) {
    return _ref14.apply(this, arguments);
  };
}();