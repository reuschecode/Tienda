"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProductoById = exports.updateProductoById = exports.getProductoById = exports.getProductos = exports.createProducto = void 0;

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createProducto = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, nombre, precio, stock, query;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, precio = _req$body.precio, stock = _req$body.stock;
            query = "INSERT INTO producto(nombre, precio, stock) VALUES (?, ?, ?);";
            _context.next = 4;
            return _database["default"].query(query, [nombre, precio, stock], function (err, rows, fields) {
              if (!err) {
                res.json({
                  status: 'Se guardó al producto.'
                });
              } else {
                console.log(err);
                res.json({
                  error: "Ocurrió un error al ingresar producto."
                });
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createProducto(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProducto = createProducto;

var getProductos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _database["default"].query('SELECT * FROM producto', function (err, rows, fields) {
              if (!err) {
                res.json(rows);
              } else {
                console.log(err);
                res.json({
                  error: "Ocurrió un error al obtener productos."
                });
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getProductos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProductos = getProductos;

var getProductoById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var productoId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            productoId = req.params.productoId;
            _context3.next = 3;
            return _database["default"].query('SELECT * FROM producto WHERE idproducto = ?', [productoId], function (err, rows, fields) {
              if (!err) {
                res.json(rows[0]);
              } else {
                console.log(err);
                res.json({
                  error: "Ocurrió un error al obtener producto."
                });
              }
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getProductoById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProductoById = getProductoById;

var updateProductoById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, nombre, precio, stock, idproducto, productoId, query;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, nombre = _req$body2.nombre, precio = _req$body2.precio, stock = _req$body2.stock, idproducto = _req$body2.idproducto;
            productoId = req.params.productoId;
            query = "UPDATE producto SET nombre = ?, precio = ?, stock = ? WHERE idproducto = ?;";
            _context4.next = 5;
            return _database["default"].query(query, [nombre, precio, stock, productoId], function (err, rows, fields) {
              if (!err) {
                res.json({
                  status: 'Se actualizó al producto.'
                });
              } else {
                console.log(err);
                res.json({
                  error: "Ocurrió un error al actualizar producto."
                });
              }
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateProductoById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateProductoById = updateProductoById;

var deleteProductoById = function deleteProductoById(req, res) {};

exports.deleteProductoById = deleteProductoById;