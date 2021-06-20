"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = exports.signUp = void 0;

var _database = _interopRequireDefault(require("../database"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, dni, id_tienda, rol, query, newPassword;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, dni = _req$body.dni, id_tienda = _req$body.id_tienda;
            rol = req.body.rol;
            if (rol === undefined) rol = 'USUARIO';
            query = "INSERT INTO usuario(email, password, dni, id_rol_fk, id_tienda_fk) VALUES (?, ?, ?, ?, ?);";
            _context.next = 6;
            return encryptPassword(password);

          case 6:
            newPassword = _context.sent;
            _context.next = 9;
            return _database["default"].query(query, [email, newPassword, dni, rol, id_tienda], function (err, rows, fields) {
              console.log(err);

              if (!err) {
                var token = _jsonwebtoken["default"].sign({
                  id: rows.insertId
                }, _config["default"].SECRET, {
                  expiresIn: 57600 //16 horas

                });

                res.status(200).json({
                  message: 'Se guardó al usuario.',
                  token: token
                });
              } else {
                if (err.code === "ER_DUP_ENTRY") {
                  res.json({
                    error: err.sqlMessage,
                    code: err.code,
                    message: "Ya existe un usuario con ese email."
                  });
                }

                if (err.code === "ER_BAD_NULL_ERROR") {
                  res.json({
                    error: err.sqlMessage,
                    code: err.code,
                    message: "Debe especificar todos los datos del formulario."
                  });
                } else {
                  console.log(err);
                  res.json({
                    error: err.sqlMessage,
                    code: err.code,
                    message: "Ocurrió un error desconocido al intentar ingresar un usuario."
                  });
                }

                return;
              }
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var query;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = "SELECT * FROM usuario WHERE email = ?";
            _context3.next = 3;
            return _database["default"].query(query, [req.body.email], /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, rows, fields) {
                var matchPassword, token;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (err) {
                          _context2.next = 16;
                          break;
                        }

                        if (!(rows.length === 0)) {
                          _context2.next = 3;
                          break;
                        }

                        return _context2.abrupt("return", res.json({
                          message: "No se encontró al usuario",
                          status: "NOT_FOUND"
                        }));

                      case 3:
                        _context2.next = 5;
                        return comparePassword(req.body.password, rows[0].password);

                      case 5:
                        matchPassword = _context2.sent;

                        if (rows[0].activo) {
                          _context2.next = 8;
                          break;
                        }

                        return _context2.abrupt("return", res.json({
                          message: "Usuario desabilitado por administrador.",
                          status: "DISABLED"
                        }));

                      case 8:
                        if (matchPassword) {
                          _context2.next = 12;
                          break;
                        }

                        return _context2.abrupt("return", res.json({
                          token: null,
                          message: 'Contraseña inválida.',
                          status: "INVALID_PASSWORD"
                        }));

                      case 12:
                        token = _jsonwebtoken["default"].sign({
                          id: rows[0].idusuario
                        }, _config["default"].SECRET, {
                          expiresIn: 57600
                        });
                        res.json({
                          message: "Usuario válido.",
                          status: "OK",
                          token: token
                        });

                      case 14:
                        _context2.next = 18;
                        break;

                      case 16:
                        console.log(err);
                        res.json({
                          error: err.sqlMessage,
                          code: err.code,
                          message: "Ocurrió un error desconocido al intentar encontrar al usuario."
                        });

                      case 18:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5, _x6, _x7) {
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

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var encryptPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(password) {
    var salt;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context4.sent;
            _context4.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            return _context4.abrupt("return", _context4.sent);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function encryptPassword(_x8) {
    return _ref4.apply(this, arguments);
  };
}();

var comparePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(password, receivedPassword) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _bcryptjs["default"].compare(password, receivedPassword);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function comparePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();