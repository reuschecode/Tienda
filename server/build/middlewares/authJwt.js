"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permisoCrearUsuario = exports.permisoCrearProducto = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.headers["x-access-token"];

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: "No se envió un token."
            }));

          case 4:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            req.userId = decoded.id;
            _context.next = 8;
            return _database["default"].query("SELECT * FROM usuario WHERE idusuario = ?", [req.userId], function (err, rows, fields) {
              if (!err) {
                if (rows.length === 0) return res.status(404).json({
                  message: "No se encontró al usuario"
                });
                rows[0].password = 0;
                if (!rows[0].activo) return res.status(401).json({
                  message: "Usuario desabilitado por administrador."
                });
                next();
              } else {
                console.log(err);
                res.json({
                  error: err.sqlMessage,
                  code: err.code,
                  message: "Ocurrió un error desconocido al intentar encontrar al usuario."
                });
              }
            });

          case 8:
            next();
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json({
              message: "No autorizado."
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var permisoCrearProducto = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var query;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = "SELECT idrol FROM usuario, rol WHERE idusuario = ? AND usuario.id_rol_fk = rol.idrol";
            _context3.next = 3;
            return _database["default"].query(query, [req.userId], /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, rows, fields) {
                var permisos, queryPermisos;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (err) {
                          _context2.next = 9;
                          break;
                        }

                        if (!(rows.length === 0)) {
                          _context2.next = 3;
                          break;
                        }

                        return _context2.abrupt("return", res.status(404).json({
                          message: "El Rol no tiene permisos"
                        }));

                      case 3:
                        permisos = [];
                        queryPermisos = "SELECT nombre_permiso FROM rol_permiso, permiso WHERE rol_permiso.rol_id = ? AND rol_permiso.permiso_id = permiso.idpermiso;";
                        _context2.next = 7;
                        return _database["default"].query(queryPermisos, [rows[0].idrol], function (err, rows, fields) {
                          if (!err) {
                            for (var i = 0; i < rows.length; i++) {
                              if (rows[i].nombre_permiso === "CREAR_PRODUCTO") {
                                next();
                                return;
                              }
                            }

                            return res.status(403).json({
                              message: "Se requiere el permiso de crear producto"
                            });
                          } else {
                            console.log(err);
                            res.json({
                              message: "ERROR"
                            });
                          }
                        });

                      case 7:
                        _context2.next = 10;
                        break;

                      case 9:
                        return _context2.abrupt("return", res.json({
                          message: "ERROR"
                        }));

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x7, _x8, _x9) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function permisoCrearProducto(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.permisoCrearProducto = permisoCrearProducto;

var permisoCrearUsuario = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var query;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = "SELECT idrol FROM usuario, rol WHERE idusuario = ? AND usuario.id_rol_fk = rol.idrol";
            _context5.next = 3;
            return _database["default"].query(query, [req.userId], /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err, rows, fields) {
                var permisos, queryPermisos;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (err) {
                          _context4.next = 9;
                          break;
                        }

                        if (!(rows.length === 0)) {
                          _context4.next = 3;
                          break;
                        }

                        return _context4.abrupt("return", res.status(404).json({
                          message: "El Rol no tiene permisos"
                        }));

                      case 3:
                        permisos = [];
                        queryPermisos = "SELECT nombre_permiso FROM rol_permiso, permiso WHERE rol_permiso.rol_id = ? AND rol_permiso.permiso_id = permiso.idpermiso;";
                        _context4.next = 7;
                        return _database["default"].query(queryPermisos, [rows[0].idrol], function (err, rows, fields) {
                          if (!err) {
                            for (var i = 0; i < rows.length; i++) {
                              if (rows[i].nombre_permiso === "CREAR_USUARIO") {
                                next();
                                return;
                              }
                            }

                            return res.status(403).json({
                              message: "Se requiere el permiso de crear usuario"
                            });
                          } else {
                            console.log(err);
                            res.json({
                              message: "ERROR"
                            });
                          }
                        });

                      case 7:
                        _context4.next = 10;
                        break;

                      case 9:
                        return _context4.abrupt("return", res.json({
                          message: "ERROR"
                        }));

                      case 10:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x13, _x14, _x15) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function permisoCrearUsuario(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.permisoCrearUsuario = permisoCrearUsuario;