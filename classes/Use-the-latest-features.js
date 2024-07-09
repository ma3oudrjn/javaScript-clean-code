// use last version of js
//new version
class BasketItems {

    async addToBasketItem(req, res) {
        const items = req.body.items;
        const userId = req.accountInfo.accountId;
        const activeBasket = req.activeBasket;

        try {
            if (activeBasket) {
                const updatedItems = [...activeBasket.items];

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const oneOption = await option.findById(item.option).lean();

                    if (!oneOption) {
                        return res.status(400).json({error: `Option with ID ${item.option} not found`});
                    }

                    let itemExists = false;

                    for (let j = 0; j < updatedItems.length; j++) {
                        if (updatedItems[j].option.toString() === item.option) {
                            const newQuantity = updatedItems[j].quantity + item.quantity;
                            if (newQuantity > oneOption.stock) {
                                return res.status(400).json({error: `Quantity exceeds stock for option ${item.option}`});
                            }
                            if (newQuantity < 0) {
                                return res.status(400).json({error: `Quantity cannot be negative for option ${item.option}`});
                            }
                            updatedItems[j].quantity = newQuantity;
                            itemExists = true;
                            break;
                        }
                    }

                    if (!itemExists) {
                        if (item.quantity > oneOption.stock) {
                            return res.status(400).json({error: `Quantity exceeds stock for option ${item.option}`});
                        }
                        if (item.quantity < 0) {
                            return res.status(400).json({error: `Quantity cannot be negative for option ${item.option}`});
                        }
                        updatedItems.push(item);
                    }
                }

                const updatedCart = await cart.findByIdAndUpdate(
                    activeBasket._id,
                    {items: updatedItems},
                    {new: true}
                );
                for (let i = 0; i < updatedCart.items.length; i++) {
                    if (updatedCart.items[i].quantity === 0) {
                        updatedCart.items.splice(i, 1)[0]
                        await updatedCart.save()
                    }
                }

                return res.status(200).json({success: true, message: 'Basket updated'});
            }

            for (let i = 0; i < items.length; i++) {
                const option = await option.findById(items[i].option).lean();
                if (!option) {
                    return res.status(400).json({error: `Option with ID ${items[i].option} not found`});
                }
                if (items[i].quantity > option.stock) {
                    return res.status(400).json({error: `Quantity exceeds stock for option ${items[i].option}`});
                }
                if (items[i].quantity < 0) {
                    return res.status(400).json({error: `Quantity cannot be negative for option ${items[i].option}`});
                }
            }

            const newCart = new cart({user: userId, items});
            await newCart.save();

            res.status(201).json(newCart);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async startPay(req, res) {
        const {offCode , price , userId  } = req.body
        try{

        }catch(error){
            console.error(error);
            res.status(400).json({error: error.message});

        }
    }

}
//old version of same code
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BasketItems = /*#__PURE__*/function () {
    "use strict";

    function BasketItems() {
        _classCallCheck(this, BasketItems);
    }
    return _createClass(BasketItems, [{
        key: "addToBasketItem",
        value: function () {
            var _addToBasketItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
                var items, userId, activeBasket, updatedItems, i, item, oneOption, itemExists, j, newQuantity, updatedCart, _i, _i2, _option, newCart;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                        case 0:
                            items = req.body.items;
                            userId = req.accountInfo.accountId;
                            activeBasket = req.activeBasket;
                            _context.prev = 3;
                            if (!activeBasket) {
                                _context.next = 51;
                                break;
                            }
                            updatedItems = _toConsumableArray(activeBasket.items);
                            i = 0;
                        case 7:
                            if (!(i < items.length)) {
                                _context.next = 38;
                                break;
                            }
                            item = items[i];
                            _context.next = 11;
                            return option.findById(item.option).lean();
                        case 11:
                            oneOption = _context.sent;
                            if (oneOption) {
                                _context.next = 14;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Option with ID ".concat(item.option, " not found")
                            }));
                        case 14:
                            itemExists = false;
                            j = 0;
                        case 16:
                            if (!(j < updatedItems.length)) {
                                _context.next = 29;
                                break;
                            }
                            if (!(updatedItems[j].option.toString() === item.option)) {
                                _context.next = 26;
                                break;
                            }
                            newQuantity = updatedItems[j].quantity + item.quantity;
                            if (!(newQuantity > oneOption.stock)) {
                                _context.next = 21;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Quantity exceeds stock for option ".concat(item.option)
                            }));
                        case 21:
                            if (!(newQuantity < 0)) {
                                _context.next = 23;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Quantity cannot be negative for option ".concat(item.option)
                            }));
                        case 23:
                            updatedItems[j].quantity = newQuantity;
                            itemExists = true;
                            return _context.abrupt("break", 29);
                        case 26:
                            j++;
                            _context.next = 16;
                            break;
                        case 29:
                            if (itemExists) {
                                _context.next = 35;
                                break;
                            }
                            if (!(item.quantity > oneOption.stock)) {
                                _context.next = 32;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Quantity exceeds stock for option ".concat(item.option)
                            }));
                        case 32:
                            if (!(item.quantity < 0)) {
                                _context.next = 34;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Quantity cannot be negative for option ".concat(item.option)
                            }));
                        case 34:
                            updatedItems.push(item);
                        case 35:
                            i++;
                            _context.next = 7;
                            break;
                        case 38:
                            _context.next = 40;
                            return cart.findByIdAndUpdate(activeBasket._id, {
                                items: updatedItems
                            }, {
                                "new": true
                            });
                        case 40:
                            updatedCart = _context.sent;
                            _i = 0;
                        case 42:
                            if (!(_i < updatedCart.items.length)) {
                                _context.next = 50;
                                break;
                            }
                            if (!(updatedCart.items[_i].quantity === 0)) {
                                _context.next = 47;
                                break;
                            }
                            updatedCart.items.splice(_i, 1)[0];
                            _context.next = 47;
                            return updatedCart.save();
                        case 47:
                            _i++;
                            _context.next = 42;
                            break;
                        case 50:
                            return _context.abrupt("return", res.status(200).json({
                                success: true,
                                message: 'Basket updated'
                            }));
                        case 51:
                            _i2 = 0;
                        case 52:
                            if (!(_i2 < items.length)) {
                                _context.next = 65;
                                break;
                            }
                            _context.next = 55;
                            return _option.findById(items[_i2].option).lean();
                        case 55:
                            _option = _context.sent;
                            if (_option) {
                                _context.next = 58;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Option with ID ".concat(items[_i2].option, " not found")
                            }));
                        case 58:
                            if (!(items[_i2].quantity > _option.stock)) {
                                _context.next = 60;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Quantity exceeds stock for option ".concat(items[_i2].option)
                            }));
                        case 60:
                            if (!(items[_i2].quantity < 0)) {
                                _context.next = 62;
                                break;
                            }
                            return _context.abrupt("return", res.status(400).json({
                                error: "Quantity cannot be negative for option ".concat(items[_i2].option)
                            }));
                        case 62:
                            _i2++;
                            _context.next = 52;
                            break;
                        case 65:
                            newCart = new cart({
                                user: userId,
                                items: items
                            });
                            _context.next = 68;
                            return newCart.save();
                        case 68:
                            res.status(201).json(newCart);
                            _context.next = 74;
                            break;
                        case 71:
                            _context.prev = 71;
                            _context.t0 = _context["catch"](3);
                            res.status(400).json({
                                error: _context.t0.message
                            });
                        case 74:
                        case "end":
                            return _context.stop();
                    }
                }, _callee, null, [[3, 71]]);
            }));
            function addToBasketItem(_x, _x2) {
                return _addToBasketItem.apply(this, arguments);
            }
            return addToBasketItem;
        }()
    }, {
        key: "startPay",
        value: function () {
            var _startPay = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
                var _req$body, offCode, price, userId;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                            _req$body = req.body, offCode = _req$body.offCode, price = _req$body.price, userId = _req$body.userId;
                            try {} catch (error) {
                                console.error(error);
                                res.status(400).json({
                                    error: error.message
                                });
                            }
                        case 2:
                        case "end":
                            return _context2.stop();
                    }
                }, _callee2);
            }));
            function startPay(_x3, _x4) {
                return _startPay.apply(this, arguments);
            }
            return startPay;
        }()
    }]);
}();