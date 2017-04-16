! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.functionPlot = t()
    }
}(function() {
    return function t(e, n, r) {
        function i(s, a) {
            if (!n[s]) {
                if (!e[s]) {
                    var u = "function" == typeof require && require;
                    if (!a && u) return u(s, !0);
                    if (o) return o(s, !0);
                    var l = new Error("Cannot find module '" + s + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var c = n[s] = {
                    exports: {}
                };
                e[s][0].call(c.exports, function(t) {
                    var n = e[s][1][t];
                    return i(n ? n : t)
                }, c, c.exports, t, e, n, r)
            }
            return n[s].exports
        }
        for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
        return i
    }({
        1: [function(t, e, n) {
            (function(e) {
                "use strict";

                function r() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }

                function i() {
                    return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function o(t, e) {
                    if (i() < e) throw new RangeError("Invalid typed array length");
                    return s.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = s.prototype) : (null === t && (t = new s(e)), t.length = e), t
                }

                function s(t, e, n) {
                    if (!(s.TYPED_ARRAY_SUPPORT || this instanceof s)) return new s(t, e, n);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return c(this, t)
                    }
                    return a(this, t, e, n)
                }

                function a(t, e, n, r) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? p(t, e, n, r) : "string" == typeof e ? h(t, e, n) : d(t, e)
                }

                function u(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                }

                function l(t, e, n, r) {
                    return u(e), e <= 0 ? o(t, e) : void 0 !== n ? "string" == typeof r ? o(t, e).fill(n, r) : o(t, e).fill(n) : o(t, e)
                }

                function c(t, e) {
                    if (u(e), t = o(t, e < 0 ? 0 : 0 | v(e)), !s.TYPED_ARRAY_SUPPORT)
                        for (var n = 0; n < e; ++n) t[n] = 0;
                    return t
                }

                function h(t, e, n) {
                    if ("string" == typeof n && "" !== n || (n = "utf8"), !s.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                    var r = 0 | m(e, n);
                    t = o(t, r);
                    var i = t.write(e, n);
                    return i !== r && (t = t.slice(0, i)), t
                }

                function f(t, e) {
                    var n = e.length < 0 ? 0 : 0 | v(e.length);
                    t = o(t, n);
                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                    return t
                }

                function p(t, e, n, r) {
                    if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                    return e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r), s.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = s.prototype) : t = f(t, e), t
                }

                function d(t, e) {
                    if (s.isBuffer(e)) {
                        var n = 0 | v(e.length);
                        return t = o(t, n), 0 === t.length ? t : (e.copy(t, 0, 0, n), t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || Z(e.length) ? o(t, 0) : f(t, e);
                        if ("Buffer" === e.type && Q(e.data)) return f(t, e.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }

                function v(t) {
                    if (t >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
                    return 0 | t
                }

                function y(t) {
                    return +t != t && (t = 0), s.alloc(+t)
                }

                function m(t, e) {
                    if (s.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var n = t.length;
                    if (0 === n) return 0;
                    for (var r = !1;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return W(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return $(t).length;
                        default:
                            if (r) return W(t).length;
                            e = ("" + e).toLowerCase(), r = !0
                    }
                }

                function g(t, e, n) {
                    var r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if (n >>>= 0, e >>>= 0, n <= e) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return S(this, e, n);
                        case "utf8":
                        case "utf-8":
                            return k(this, e, n);
                        case "ascii":
                            return P(this, e, n);
                        case "latin1":
                        case "binary":
                            return O(this, e, n);
                        case "base64":
                            return L(this, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return R(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function x(t, e, n) {
                    var r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function w(t, e, n, r, i) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (i) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!i) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = s.from(e, r)), s.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, n, r, i);
                    if ("number" == typeof e) return e = 255 & e, s.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : b(t, [e], n, r, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function b(t, e, n, r, i) {
                    function o(t, e) {
                        return 1 === s ? t[e] : t.readUInt16BE(e * s)
                    }
                    var s = 1,
                        a = t.length,
                        u = e.length;
                    if (void 0 !== r && (r = String(r).toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        s = 2, a /= 2, u /= 2, n /= 2
                    }
                    var l;
                    if (i) {
                        var c = -1;
                        for (l = n; l < a; l++)
                            if (o(t, l) === o(e, c === -1 ? 0 : l - c)) {
                                if (c === -1 && (c = l), l - c + 1 === u) return c * s
                            } else c !== -1 && (l -= l - c), c = -1
                    } else
                        for (n + u > a && (n = a - u), l = n; l >= 0; l--) {
                            for (var h = !0, f = 0; f < u; f++)
                                if (o(t, l + f) !== o(e, f)) {
                                    h = !1;
                                    break
                                }
                            if (h) return l
                        }
                    return -1
                }

                function E(t, e, n, r) {
                    n = Number(n) || 0;
                    var i = t.length - n;
                    r ? (r = Number(r), r > i && (r = i)) : r = i;
                    var o = e.length;
                    if (o % 2 !== 0) throw new TypeError("Invalid hex string");
                    r > o / 2 && (r = o / 2);
                    for (var s = 0; s < r; ++s) {
                        var a = parseInt(e.substr(2 * s, 2), 16);
                        if (isNaN(a)) return s;
                        t[n + s] = a
                    }
                    return s
                }

                function N(t, e, n, r) {
                    return V(W(e, t.length - n), t, n, r)
                }

                function A(t, e, n, r) {
                    return V(G(e), t, n, r)
                }

                function T(t, e, n, r) {
                    return A(t, e, n, r)
                }

                function _(t, e, n, r) {
                    return V($(e), t, n, r)
                }

                function I(t, e, n, r) {
                    return V(X(e, t.length - n), t, n, r)
                }

                function L(t, e, n) {
                    return 0 === e && n === t.length ? J.fromByteArray(t) : J.fromByteArray(t.slice(e, n))
                }

                function k(t, e, n) {
                    n = Math.min(t.length, n);
                    for (var r = [], i = e; i < n;) {
                        var o = t[i],
                            s = null,
                            a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                        if (i + a <= n) {
                            var u, l, c, h;
                            switch (a) {
                                case 1:
                                    o < 128 && (s = o);
                                    break;
                                case 2:
                                    u = t[i + 1], 128 === (192 & u) && (h = (31 & o) << 6 | 63 & u, h > 127 && (s = h));
                                    break;
                                case 3:
                                    u = t[i + 1], l = t[i + 2], 128 === (192 & u) && 128 === (192 & l) && (h = (15 & o) << 12 | (63 & u) << 6 | 63 & l, h > 2047 && (h < 55296 || h > 57343) && (s = h));
                                    break;
                                case 4:
                                    u = t[i + 1], l = t[i + 2], c = t[i + 3], 128 === (192 & u) && 128 === (192 & l) && 128 === (192 & c) && (h = (15 & o) << 18 | (63 & u) << 12 | (63 & l) << 6 | 63 & c, h > 65535 && h < 1114112 && (s = h))
                            }
                        }
                        null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, r.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), r.push(s), i += a
                    }
                    return M(r)
                }

                function M(t) {
                    var e = t.length;
                    if (e <= tt) return String.fromCharCode.apply(String, t);
                    for (var n = "", r = 0; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += tt));
                    return n
                }

                function P(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
                    return r
                }

                function O(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
                    return r
                }

                function S(t, e, n) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    for (var i = "", o = e; o < n; ++o) i += q(t[o]);
                    return i
                }

                function R(t, e, n) {
                    for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
                    return i
                }

                function C(t, e, n) {
                    if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                }

                function H(t, e, n, r, i, o) {
                    if (!s.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
                    if (n + r > t.length) throw new RangeError("Index out of range")
                }

                function U(t, e, n, r) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
                }

                function Y(t, e, n, r) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
                }

                function B(t, e, n, r, i, o) {
                    if (n + r > t.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("Index out of range")
                }

                function F(t, e, n, r, i) {
                    return i || B(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), K.write(t, e, n, r, 23, 4), n + 4
                }

                function D(t, e, n, r, i) {
                    return i || B(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), K.write(t, e, n, r, 52, 8), n + 8
                }

                function j(t) {
                    if (t = z(t).replace(et, ""), t.length < 2) return "";
                    for (; t.length % 4 !== 0;) t += "=";
                    return t
                }

                function z(t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }

                function q(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function W(t, e) {
                    e = e || 1 / 0;
                    for (var n, r = t.length, i = null, o = [], s = 0; s < r; ++s) {
                        if (n = t.charCodeAt(s), n > 55295 && n < 57344) {
                            if (!i) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === r) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                                continue
                            }
                            n = (i - 55296 << 10 | n - 56320) + 65536
                        } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            o.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            o.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return o
                }

                function G(t) {
                    for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                    return e
                }

                function X(t, e) {
                    for (var n, r, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) n = t.charCodeAt(s), r = n >> 8, i = n % 256, o.push(i), o.push(r);
                    return o
                }

                function $(t) {
                    return J.toByteArray(j(t))
                }

                function V(t, e, n, r) {
                    for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
                    return i
                }

                function Z(t) {
                    return t !== t
                }
                var J = t("base64-js"),
                    K = t("ieee754"),
                    Q = t("isarray");
                n.Buffer = s, n.SlowBuffer = y, n.INSPECT_MAX_BYTES = 50, s.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : r(), n.kMaxLength = i(), s.poolSize = 8192, s._augment = function(t) {
                    return t.__proto__ = s.prototype, t
                }, s.from = function(t, e, n) {
                    return a(null, t, e, n)
                }, s.TYPED_ARRAY_SUPPORT && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
                    value: null,
                    configurable: !0
                })), s.alloc = function(t, e, n) {
                    return l(null, t, e, n)
                }, s.allocUnsafe = function(t) {
                    return c(null, t)
                }, s.allocUnsafeSlow = function(t) {
                    return c(null, t)
                }, s.isBuffer = function(t) {
                    return !(null == t || !t._isBuffer)
                }, s.compare = function(t, e) {
                    if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i)
                        if (t[i] !== e[i]) {
                            n = t[i], r = e[i];
                            break
                        }
                    return n < r ? -1 : r < n ? 1 : 0
                }, s.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, s.concat = function(t, e) {
                    if (!Q(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return s.alloc(0);
                    var n;
                    if (void 0 === e)
                        for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    var r = s.allocUnsafe(e),
                        i = 0;
                    for (n = 0; n < t.length; ++n) {
                        var o = t[n];
                        if (!s.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                        o.copy(r, i), i += o.length
                    }
                    return r
                }, s.byteLength = m, s.prototype._isBuffer = !0, s.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) x(this, e, e + 1);
                    return this
                }, s.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) x(this, e, e + 3), x(this, e + 1, e + 2);
                    return this
                }, s.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) x(this, e, e + 7), x(this, e + 1, e + 6), x(this, e + 2, e + 5), x(this, e + 3, e + 4);
                    return this
                }, s.prototype.toString = function() {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? k(this, 0, t) : g.apply(this, arguments)
                }, s.prototype.equals = function(t) {
                    if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === s.compare(this, t)
                }, s.prototype.inspect = function() {
                    var t = "",
                        e = n.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
                }, s.prototype.compare = function(t, e, n, r, i) {
                    if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
                    if (r >= i && e >= n) return 0;
                    if (r >= i) return -1;
                    if (e >= n) return 1;
                    if (e >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
                    for (var o = i - r, a = n - e, u = Math.min(o, a), l = this.slice(r, i), c = t.slice(e, n), h = 0; h < u; ++h)
                        if (l[h] !== c[h]) {
                            o = l[h], a = c[h];
                            break
                        }
                    return o < a ? -1 : a < o ? 1 : 0
                }, s.prototype.includes = function(t, e, n) {
                    return this.indexOf(t, e, n) !== -1
                }, s.prototype.indexOf = function(t, e, n) {
                    return w(this, t, e, n, !0)
                }, s.prototype.lastIndexOf = function(t, e, n) {
                    return w(this, t, e, n, !1)
                }, s.prototype.write = function(t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0;
                    else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e = 0 | e, isFinite(n) ? (n = 0 | n, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    var i = this.length - e;
                    if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    for (var o = !1;;) switch (r) {
                        case "hex":
                            return E(this, t, e, n);
                        case "utf8":
                        case "utf-8":
                            return N(this, t, e, n);
                        case "ascii":
                            return A(this, t, e, n);
                        case "latin1":
                        case "binary":
                            return T(this, t, e, n);
                        case "base64":
                            return _(this, t, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return I(this, t, e, n);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }, s.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var tt = 4096;
                s.prototype.slice = function(t, e) {
                    var n = this.length;
                    t = ~~t, e = void 0 === e ? n : ~~e, t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), e < t && (e = t);
                    var r;
                    if (s.TYPED_ARRAY_SUPPORT) r = this.subarray(t, e), r.__proto__ = s.prototype;
                    else {
                        var i = e - t;
                        r = new s(i, void 0);
                        for (var o = 0; o < i; ++o) r[o] = this[o + t]
                    }
                    return r
                }, s.prototype.readUIntLE = function(t, e, n) {
                    t = 0 | t, e = 0 | e, n || C(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return r
                }, s.prototype.readUIntBE = function(t, e, n) {
                    t = 0 | t, e = 0 | e, n || C(t, e, this.length);
                    for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
                    return r
                }, s.prototype.readUInt8 = function(t, e) {
                    return e || C(t, 1, this.length), this[t]
                }, s.prototype.readUInt16LE = function(t, e) {
                    return e || C(t, 2, this.length), this[t] | this[t + 1] << 8
                }, s.prototype.readUInt16BE = function(t, e) {
                    return e || C(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, s.prototype.readUInt32LE = function(t, e) {
                    return e || C(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, s.prototype.readUInt32BE = function(t, e) {
                    return e || C(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, s.prototype.readIntLE = function(t, e, n) {
                    t = 0 | t, e = 0 | e, n || C(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return i *= 128, r >= i && (r -= Math.pow(2, 8 * e)), r
                }, s.prototype.readIntBE = function(t, e, n) {
                    t = 0 | t, e = 0 | e, n || C(t, e, this.length);
                    for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
                    return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
                }, s.prototype.readInt8 = function(t, e) {
                    return e || C(t, 1, this.length), 128 & this[t] ? (255 - this[t] + 1) * -1 : this[t]
                }, s.prototype.readInt16LE = function(t, e) {
                    e || C(t, 2, this.length);
                    var n = this[t] | this[t + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, s.prototype.readInt16BE = function(t, e) {
                    e || C(t, 2, this.length);
                    var n = this[t + 1] | this[t] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, s.prototype.readInt32LE = function(t, e) {
                    return e || C(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, s.prototype.readInt32BE = function(t, e) {
                    return e || C(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, s.prototype.readFloatLE = function(t, e) {
                    return e || C(t, 4, this.length), K.read(this, t, !0, 23, 4)
                }, s.prototype.readFloatBE = function(t, e) {
                    return e || C(t, 4, this.length), K.read(this, t, !1, 23, 4)
                }, s.prototype.readDoubleLE = function(t, e) {
                    return e || C(t, 8, this.length), K.read(this, t, !0, 52, 8)
                }, s.prototype.readDoubleBE = function(t, e) {
                    return e || C(t, 8, this.length), K.read(this, t, !1, 52, 8)
                }, s.prototype.writeUIntLE = function(t, e, n, r) {
                    if (t = +t, e = 0 | e, n = 0 | n, !r) {
                        var i = Math.pow(2, 8 * n) - 1;
                        H(this, t, e, n, i, 0)
                    }
                    var o = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++s < n && (o *= 256);) this[e + s] = t / o & 255;
                    return e + n
                }, s.prototype.writeUIntBE = function(t, e, n, r) {
                    if (t = +t, e = 0 | e, n = 0 | n, !r) {
                        var i = Math.pow(2, 8 * n) - 1;
                        H(this, t, e, n, i, 0)
                    }
                    var o = n - 1,
                        s = 1;
                    for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) this[e + o] = t / s & 255;
                    return e + n
                }, s.prototype.writeUInt8 = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, s.prototype.writeUInt16LE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
                }, s.prototype.writeUInt16BE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
                }, s.prototype.writeUInt32LE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : Y(this, t, e, !0), e + 4
                }, s.prototype.writeUInt32BE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : Y(this, t, e, !1), e + 4
                }, s.prototype.writeIntLE = function(t, e, n, r) {
                    if (t = +t, e = 0 | e, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        H(this, t, e, n, i - 1, -i)
                    }
                    var o = 0,
                        s = 1,
                        a = 0;
                    for (this[e] = 255 & t; ++o < n && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
                    return e + n
                }, s.prototype.writeIntBE = function(t, e, n, r) {
                    if (t = +t, e = 0 | e, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        H(this, t, e, n, i - 1, -i)
                    }
                    var o = n - 1,
                        s = 1,
                        a = 0;
                    for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
                    return e + n
                }, s.prototype.writeInt8 = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, s.prototype.writeInt16LE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
                }, s.prototype.writeInt16BE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
                }, s.prototype.writeInt32LE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : Y(this, t, e, !0), e + 4
                }, s.prototype.writeInt32BE = function(t, e, n) {
                    return t = +t, e = 0 | e, n || H(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : Y(this, t, e, !1), e + 4
                }, s.prototype.writeFloatLE = function(t, e, n) {
                    return F(this, t, e, !0, n)
                }, s.prototype.writeFloatBE = function(t, e, n) {
                    return F(this, t, e, !1, n)
                }, s.prototype.writeDoubleLE = function(t, e, n) {
                    return D(this, t, e, !0, n)
                }, s.prototype.writeDoubleBE = function(t, e, n) {
                    return D(this, t, e, !1, n)
                }, s.prototype.copy = function(t, e, n, r) {
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    var i, o = r - n;
                    if (this === t && n < e && e < r)
                        for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n];
                    else if (o < 1e3 || !s.TYPED_ARRAY_SUPPORT)
                        for (i = 0; i < o; ++i) t[i + e] = this[i + n];
                    else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
                    return o
                }, s.prototype.fill = function(t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                            var i = t.charCodeAt(0);
                            i < 256 && (t = i)
                        }
                        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !s.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                    } else "number" == typeof t && (t = 255 & t);
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0);
                    var o;
                    if ("number" == typeof t)
                        for (o = e; o < n; ++o) this[o] = t;
                    else {
                        var a = s.isBuffer(t) ? t : W(new s(t, r).toString()),
                            u = a.length;
                        for (o = 0; o < n - e; ++o) this[o + e] = a[o % u]
                    }
                    return this
                };
                var et = /[^+\/0-9A-Za-z-_]/g
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "base64-js": 2,
            ieee754: 3,
            isarray: 4
        }],
        2: [function(t, e, n) {
            "use strict";

            function r(t) {
                var e = t.length;
                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
            }

            function i(t) {
                return 3 * t.length / 4 - r(t)
            }

            function o(t) {
                var e, n, i, o, s, a, u = t.length;
                s = r(t), a = new h(3 * u / 4 - s), i = s > 0 ? u - 4 : u;
                var l = 0;
                for (e = 0, n = 0; e < i; e += 4, n += 3) o = c[t.charCodeAt(e)] << 18 | c[t.charCodeAt(e + 1)] << 12 | c[t.charCodeAt(e + 2)] << 6 | c[t.charCodeAt(e + 3)], a[l++] = o >> 16 & 255, a[l++] = o >> 8 & 255, a[l++] = 255 & o;
                return 2 === s ? (o = c[t.charCodeAt(e)] << 2 | c[t.charCodeAt(e + 1)] >> 4, a[l++] = 255 & o) : 1 === s && (o = c[t.charCodeAt(e)] << 10 | c[t.charCodeAt(e + 1)] << 4 | c[t.charCodeAt(e + 2)] >> 2, a[l++] = o >> 8 & 255, a[l++] = 255 & o), a
            }

            function s(t) {
                return l[t >> 18 & 63] + l[t >> 12 & 63] + l[t >> 6 & 63] + l[63 & t]
            }

            function a(t, e, n) {
                for (var r, i = [], o = e; o < n; o += 3) r = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(s(r));
                return i.join("")
            }

            function u(t) {
                for (var e, n = t.length, r = n % 3, i = "", o = [], s = 16383, u = 0, c = n - r; u < c; u += s) o.push(a(t, u, u + s > c ? c : u + s));
                return 1 === r ? (e = t[n - 1], i += l[e >> 2], i += l[e << 4 & 63], i += "==") : 2 === r && (e = (t[n - 2] << 8) + t[n - 1], i += l[e >> 10], i += l[e >> 4 & 63], i += l[e << 2 & 63], i += "="), o.push(i), o.join("")
            }
            n.byteLength = i, n.toByteArray = o, n.fromByteArray = u;
            for (var l = [], c = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, d = f.length; p < d; ++p) l[p] = f[p], c[f.charCodeAt(p)] = p;
            c["-".charCodeAt(0)] = 62, c["_".charCodeAt(0)] = 63
        }, {}],
        3: [function(t, e, n) {
            n.read = function(t, e, n, r, i) {
                var o, s, a = 8 * i - r - 1,
                    u = (1 << a) - 1,
                    l = u >> 1,
                    c = -7,
                    h = n ? i - 1 : 0,
                    f = n ? -1 : 1,
                    p = t[e + h];
                for (h += f, o = p & (1 << -c) - 1, p >>= -c, c += a; c > 0; o = 256 * o + t[e + h], h += f, c -= 8);
                for (s = o & (1 << -c) - 1, o >>= -c, c += r; c > 0; s = 256 * s + t[e + h], h += f, c -= 8);
                if (0 === o) o = 1 - l;
                else {
                    if (o === u) return s ? NaN : (p ? -1 : 1) * (1 / 0);
                    s += Math.pow(2, r), o -= l
                }
                return (p ? -1 : 1) * s * Math.pow(2, o - r)
            }, n.write = function(t, e, n, r, i, o) {
                var s, a, u, l = 8 * o - i - 1,
                    c = (1 << l) - 1,
                    h = c >> 1,
                    f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    p = r ? 0 : o - 1,
                    d = r ? 1 : -1,
                    v = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = c) : (s = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), e += s + h >= 1 ? f / u : f * Math.pow(2, 1 - h), e * u >= 2 && (s++, u /= 2), s + h >= c ? (a = 0, s = c) : s + h >= 1 ? (a = (e * u - 1) * Math.pow(2, i), s += h) : (a = e * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + p] = 255 & a, p += d, a /= 256, i -= 8);
                for (s = s << i | a, l += i; l > 0; t[n + p] = 255 & s, p += d, s /= 256, l -= 8);
                t[n + p - d] |= 128 * v
            }
        }, {}],
        4: [function(t, e, n) {
            var r = {}.toString;
            e.exports = Array.isArray || function(t) {
                return "[object Array]" == r.call(t)
            }
        }, {}],
        5: [function(t, e, n) {
            function r() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function i(t) {
                return "function" == typeof t
            }

            function o(t) {
                return "number" == typeof t
            }

            function s(t) {
                return "object" == typeof t && null !== t
            }

            function a(t) {
                return void 0 === t
            }
            e.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(t) {
                if (!o(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
                return this._maxListeners = t, this
            }, r.prototype.emit = function(t) {
                var e, n, r, o, u, l;
                if (this._events || (this._events = {}), "error" === t && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                    if (e = arguments[1], e instanceof Error) throw e;
                    var c = new Error('Uncaught, unspecified "error" event. (' + e + ")");
                    throw c.context = e, c
                }
                if (n = this._events[t], a(n)) return !1;
                if (i(n)) switch (arguments.length) {
                    case 1:
                        n.call(this);
                        break;
                    case 2:
                        n.call(this, arguments[1]);
                        break;
                    case 3:
                        n.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        o = Array.prototype.slice.call(arguments, 1), n.apply(this, o)
                } else if (s(n))
                    for (o = Array.prototype.slice.call(arguments, 1), l = n.slice(), r = l.length, u = 0; u < r; u++) l[u].apply(this, o);
                return !0
            }, r.prototype.addListener = function(t, e) {
                var n;
                if (!i(e)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener : e), this._events[t] ? s(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, s(this._events[t]) && !this._events[t].warned && (n = a(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[t].length > n && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())), this
            }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(t, e) {
                function n() {
                    this.removeListener(t, n), r || (r = !0, e.apply(this, arguments))
                }
                if (!i(e)) throw TypeError("listener must be a function");
                var r = !1;
                return n.listener = e, this.on(t, n), this
            }, r.prototype.removeListener = function(t, e) {
                var n, r, o, a;
                if (!i(e)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[t]) return this;
                if (n = this._events[t], o = n.length, r = -1, n === e || i(n.listener) && n.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
                else if (s(n)) {
                    for (a = o; a-- > 0;)
                        if (n[a] === e || n[a].listener && n[a].listener === e) {
                            r = a;
                            break
                        }
                    if (r < 0) return this;
                    1 === n.length ? (n.length = 0, delete this._events[t]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", t, e)
                }
                return this
            }, r.prototype.removeAllListeners = function(t) {
                var e, n;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
                if (0 === arguments.length) {
                    for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (n = this._events[t], i(n)) this.removeListener(t, n);
                else if (n)
                    for (; n.length;) this.removeListener(t, n[n.length - 1]);
                return delete this._events[t], this
            }, r.prototype.listeners = function(t) {
                var e;
                return e = this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
            }, r.prototype.listenerCount = function(t) {
                if (this._events) {
                    var e = this._events[t];
                    if (i(e)) return 1;
                    if (e) return e.length
                }
                return 0
            }, r.listenerCount = function(t, e) {
                return t.listenerCount(e)
            }
        }, {}],
        6: [function(t, e, n) {
            function r() {
                throw new Error("setTimeout has not been defined")
            }

            function i() {
                throw new Error("clearTimeout has not been defined")
            }

            function o(t) {
                if (h === setTimeout) return setTimeout(t, 0);
                if ((h === r || !h) && setTimeout) return h = setTimeout, setTimeout(t, 0);
                try {
                    return h(t, 0)
                } catch (e) {
                    try {
                        return h.call(null, t, 0)
                    } catch (e) {
                        return h.call(this, t, 0)
                    }
                }
            }

            function s(t) {
                if (f === clearTimeout) return clearTimeout(t);
                if ((f === i || !f) && clearTimeout) return f = clearTimeout, clearTimeout(t);
                try {
                    return f(t)
                } catch (e) {
                    try {
                        return f.call(null, t)
                    } catch (e) {
                        return f.call(this, t)
                    }
                }
            }

            function a() {
                y && d && (y = !1, d.length ? v = d.concat(v) : m = -1, v.length && u())
            }

            function u() {
                if (!y) {
                    var t = o(a);
                    y = !0;
                    for (var e = v.length; e;) {
                        for (d = v, v = []; ++m < e;) d && d[m].run();
                        m = -1, e = v.length
                    }
                    d = null, y = !1, s(t)
                }
            }

            function l(t, e) {
                this.fun = t, this.array = e
            }

            function c() {}
            var h, f, p = e.exports = {};
            ! function() {
                try {
                    h = "function" == typeof setTimeout ? setTimeout : r
                } catch (t) {
                    h = r
                }
                try {
                    f = "function" == typeof clearTimeout ? clearTimeout : i
                } catch (t) {
                    f = i
                }
            }();
            var d, v = [],
                y = !1,
                m = -1;
            p.nextTick = function(t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                v.push(new l(t, e)), 1 !== v.length || y || o(u)
            }, l.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = c, p.addListener = c, p.once = c, p.off = c, p.removeListener = c, p.removeAllListeners = c, p.emit = c, p.binding = function(t) {
                throw new Error("process.binding is not supported")
            }, p.cwd = function() {
                return "/"
            }, p.chdir = function(t) {
                throw new Error("process.chdir is not supported")
            }, p.umask = function() {
                return 0
            }
        }, {}],
        7: [function(t, e, n) {
            var r = t("is-object");
            e.exports = function(t) {
                if (!r(t)) throw Error("datum is not an object");
                return t.hasOwnProperty("graphType") || (t.graphType = "interval"), t.hasOwnProperty("sampler") || (t.sampler = "interval" !== t.graphType ? "builtIn" : "interval"), t.hasOwnProperty("fnType") || (t.fnType = "linear"), t
            }
        }, {
            "is-object": 111
        }],
        8: [function(t, e, n) {
            "use strict";

            function r(t, e) {
                var n = e.range || [-(1 / 0), 1 / 0],
                    r = t.meta.xScale,
                    i = Math.max(r.domain()[0], n[0]),
                    o = Math.min(r.domain()[1], n[1]);
                return [i, o]
            }

            function i(t, e) {
                var n, i = r(t, e),
                    a = s[e.sampler],
                    u = e.nSamples || Math.min(o.MAX_ITERATIONS, o.DEFAULT_ITERATIONS || 2 * t.meta.width);
                return n = a(t, e, i, u), t.emit("eval", n, e.index, e.isHelper), n
            }
            var o = t("./globals"),
                s = {
                    interval: t("./samplers/interval"),
                    builtIn: t("./samplers/builtIn")
                };
            e.exports = i
        }, {
            "./globals": 9,
            "./samplers/builtIn": 24,
            "./samplers/interval": 25
        }],
        9: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = {
                    COLORS: ["steelblue", "red", "#05b378", "orange", "#4040e8", "yellow", "brown", "magenta", "cyan"].map(function(t) {
                        console.log(t);
                        return r.hsl(t)
                    }),
                    DEFAULT_WIDTH: 550,
                    DEFAULT_HEIGHT: 350,
                    TIP_X_EPS: 1
                };
            i.DEFAULT_ITERATIONS = null, i.MAX_ITERATIONS = 4 * i.DEFAULT_WIDTH, e.exports = i
        }, {}],
        10: [function(t, e, n) {
            "use strict";
            e.exports = {
                polyline: t("./polyline"),
                interval: t("./interval"),
                scatter: t("./scatter")
            }
        }, {
            "./interval": 11,
            "./polyline": 12,
            "./scatter": 13
        }],
        11: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = t("../evaluate"),
                o = t("../utils");
            e.exports = function(t) {
                function e(t, e, n, r) {
                    if (n > r) {
                        var i = n;
                        n = r, r = i
                    }
                    var o = Math.min(e, r),
                        a = Math.max(t, n);
                    return a > o ? [-s, 0] : [a, o]
                }

                function n(e) {
                    e.each(function(e) {
                        var a = n.el = r.select(this),
                            u = e.index,
                            c = e.closed,
                            h = i(t, e),
                            f = a.selectAll(":scope > path.line").data(h);
                        s = Math.max(h[0].scaledDx, 1), f.enter().append("path").attr("class", "line line-" + u).attr("fill", "none"), f.attr("stroke-width", s).attr("stroke", o.color(e, u)).attr("opacity", c ? .5 : 1).attr("d", function(t) {
                            return l(t, c)
                        }).attr(e.attr), f.exit().remove()
                    })
                }
                var s, a = t.meta.xScale,
                    u = t.meta.yScale,
                    l = function(t, n) {
                        for (var r = "", i = u.range(), o = Math.min.apply(Math, i), l = Math.max.apply(Math, i), c = 0, h = t.length; c < h; c += 1)
                            if (t[c]) {
                                var f = t[c][0],
                                    p = t[c][1],
                                    d = p.lo,
                                    v = p.hi;
                                n && (d = Math.min(d, 0), v = Math.max(v, 0));
                                var y = a(f.lo) + t.scaledDx / 2,
                                    m = e(o, l, isFinite(v) ? u(v) : -(1 / 0), isFinite(d) ? u(d) : 1 / 0),
                                    g = m[0],
                                    x = m[1];
                                r += " M " + y + " " + g, r += " v " + Math.max(x - g, s)
                            }
                        return r
                    };
                return n
            }
        }, {
            "../evaluate": 8,
            "../utils": 27
        }],
        12: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = t("../evaluate"),
                o = t("../utils"),
                s = t("clamp");
            e.exports = function(t) {
                function e(u) {
                    u.each(function(u) {
                        function l(t) {
                            return s(a(t[1]), m, y)
                        }
                        var c = e.el = r.select(this),
                            h = u.index,
                            f = i(t, u),
                            p = o.color(u, h),
                            d = c.selectAll(":scope > path.line").data(f),
                            v = a.range(),
                            y = v[0] + 1,
                            m = v[1] - 1;
                        u.skipBoundsCheck && (y = 1 / 0, m = -(1 / 0));
                        var g = r.line().interpolate("linear").x(function(t) {
                                return n(t[0])
                            }).y(l),
                            x = r.svg.area().x(function(t) {
                                return n(t[0])
                            }).y0(a(0)).y1(l);
                        d.enter().append("path").attr("class", "line line-" + h).attr("stroke-width", 1).attr("stroke-linecap", "round"), d.each(function() {
                            var e, n = r.select(this);
                            u.closed ? (n.attr("fill", p), n.attr("fill-opacity", .3), e = x) : (n.attr("fill", "none"), e = g), n.attr("stroke", p).attr("marker-end", function() {
                                return "vector" === u.fnType ? "url(#" + t.markerId + ")" : null
                            }).attr("d", e)
                        }).attr(u.attr), d.exit().remove()
                    })
                }
                var n = t.meta.xScale,
                    a = t.meta.yScale;
                return e
            }
        }, {
            "../evaluate": 8,
            "../utils": 27,
            clamp: 59
        }],
        13: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = t("../evaluate"),
                o = t("../utils");
            e.exports = function(t) {
                function e(e) {
                    e.each(function(e) {
                        var a, u, l = e.index,
                            c = o.color(e, l),
                            h = i(t, e),
                            f = [];
                        for (a = 0; a < h.length; a += 1)
                            for (u = 0; u < h[a].length; u += 1) f.push(h[a][u]);
                        var p = r.select(this).selectAll(":scope > circle").data(f);
                        p.enter().append("circle"), p.attr("fill", r.hsl(c.toString()).brighter(1.5)).attr("stroke", c).attr("opacity", .7).attr("r", 1).attr("cx", function(t) {
                            return n(t[0])
                        }).attr("cy", function(t) {
                            return s(t[1])
                        }).attr(e.attr), p.exit().remove()
                    })
                }
                var n = t.meta.xScale,
                    s = t.meta.yScale;
                return e
            }
        }, {
            "../evaluate": 8,
            "../utils": 27
        }],
        14: [function(t, e, n) {
            "use strict";
            var r = window.d3;
            e.exports = function(t) {
                var e, n = t.owner.meta.xScale,
                    i = t.owner.meta.yScale,
                    o = r.line().x(function(t) {
                        return t[0]
                    }).y(function(t) {
                        return t[1]
                    });
                return e = function(t) {
                    t.each(function() {
                        var t = r.select(this),
                            e = t.selectAll("g.annotations").data(function(t) {
                                return t.annotations || []
                            });
                        e.enter().append("g").attr("class", "annotations");
                        var s = i.range(),
                            a = n.range(),
                            u = e.selectAll("path").data(function(t) {
                                return t.hasOwnProperty("x") ? [
                                    [
                                        [0, s[0]],
                                        [0, s[1]]
                                    ]
                                ] : [
                                    [
                                        [a[0], 0],
                                        [a[1], 0]
                                    ]
                                ]
                            });
                        u.enter().append("path").attr("stroke", "#eee").attr("d", o), u.exit().remove();
                        var l = e.selectAll("text").data(function(t) {
                            return [{
                                text: t.text || "",
                                hasX: t.hasOwnProperty("x")
                            }]
                        });
                        l.enter().append("text").attr("y", function(t) {
                            return t.hasX ? 3 : 0
                        }).attr("x", function(t) {
                            return t.hasX ? 0 : 3
                        }).attr("dy", function(t) {
                            return t.hasX ? 5 : -5
                        }).attr("text-anchor", function(t) {
                            return t.hasX ? "end" : ""
                        }).attr("transform", function(t) {
                            return t.hasX ? "rotate(-90)" : ""
                        }).text(function(t) {
                            return t.text
                        }), l.exit().remove(), e.attr("transform", function(t) {
                            return t.hasOwnProperty("x") ? "translate(" + n(t.x) + ", 0)" : "translate(0, " + i(t.y) + ")"
                        }), e.exit().remove()
                    })
                }
            }
        }, {}],
        15: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = t("./eval").builtIn,
                o = t("../graph-types/polyline"),
                s = t("../datum-defaults");
            e.exports = function(t) {
                function e(t) {
                    if (!t.derivative) return [];
                    var e = "number" == typeof t.derivative.x0 ? t.derivative.x0 : 1 / 0;
                    return u.index = t.index, u.scope = {
                        m: i(t.derivative, "fn", {
                            x: e
                        }),
                        x0: e,
                        y0: i(t, "fn", {
                            x: e
                        })
                    }, u.fn = "m * (x - x0) + y0", [u]
                }

                function n(e) {
                    var n = this;
                    e.derivative && e.derivative.updateOnMouseMove && !e.derivative.$$mouseListener && (e.derivative.$$mouseListener = function(t) {
                        e.derivative.x0 = t, a(n)
                    }, t.on("tip:update", e.derivative.$$mouseListener))
                }
                var a, u = s({
                    isHelper: !0,
                    skipTip: !0,
                    skipBoundsCheck: !0,
                    nSamples: 2,
                    graphType: "polyline"
                });
                return a = function(i) {
                    i.each(function(s) {
                        var a = r.select(this),
                            u = e.call(i, s);
                        n.call(i, s);
                        var l = a.selectAll("g.derivative").data(u);
                        l.enter().append("g").attr("class", "derivative"), l.call(o(t)), l.selectAll("path").attr("opacity", .5), l.exit().remove()
                    })
                }
            }
        }, {
            "../datum-defaults": 7,
            "../graph-types/polyline": 12,
            "./eval": 16
        }],
        16: [function(t, e, n) {
            "use strict";

            function r(t) {
                function e(e) {
                    if ("string" == typeof e) {
                        var n = i[t];
                        return n(e)
                    }
                    if ("function" == typeof e) return {
                        eval: e
                    };
                    throw Error("expression must be a string or a function")
                }

                function n(n, r) {
                    var i = n[r],
                        o = t + "_Expression_" + r,
                        s = t + "_Compiled_" + r;
                    i !== n[o] && (n[o] = i, n[s] = e(i))
                }

                function r(e, n) {
                    return e[t + "_Compiled_" + n]
                }

                function s(t, e, i) {
                    return n(t, e), r(t, e).eval(o({}, t.scope || {}, i))
                }
                return s
            }
            var i = {
                    interval: t("interval-arithmetic-eval"),
                    builtIn: t("built-in-math-eval")
                },
                o = t("extend");
            window.math && (i.builtIn = window.math.compile), e.exports.builtIn = r("builtIn"), e.exports.interval = r("interval")
        }, {
            "built-in-math-eval": 28,
            extend: 60,
            "interval-arithmetic-eval": 62
        }],
        17: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = t("./derivative"),
                o = t("./secant");
            e.exports = function(t) {
                function e(e) {
                    e.each(function() {
                        var e = r.select(this);
                        e.call(i(t)), e.call(o(t))
                    })
                }
                return e
            }
        }, {
            "./derivative": 15,
            "./secant": 18
        }],
        18: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = t("extend"),
                o = t("./eval").builtIn,
                s = t("../datum-defaults"),
                a = t("../graph-types/polyline");
            e.exports = function(t) {
                function e(t) {
                    t.m = (t.y1 - t.y0) / (t.x1 - t.x0)
                }

                function n(t, n) {
                    if (!n.hasOwnProperty("x0")) throw Error("secant must have the property `x0` defined");
                    n.scope = n.scope || {};
                    var r = n.x0,
                        s = "number" == typeof n.x1 ? n.x1 : 1 / 0;
                    i(n.scope, {
                        x0: r,
                        x1: s,
                        y0: o(t, "fn", {
                            x: r
                        }),
                        y1: o(t, "fn", {
                            x: s
                        })
                    }), e(n.scope)
                }

                function u(t, e) {
                    n(t, e), e.fn = "m * (x - x0) + y0"
                }

                function l(e, r) {
                    var i = this;
                    r.updateOnMouseMove && !r.$$mouseListener && (r.$$mouseListener = function(t) {
                        r.x1 = t, n(e, r), h(i)
                    }, t.on("tip:update", r.$$mouseListener))
                }

                function c(t) {
                    var e = this,
                        n = [];
                    t.secants = t.secants || [];
                    for (var r = 0; r < t.secants.length; r += 1) {
                        var o = t.secants[r] = i({}, f, t.secants[r]);
                        o.index = t.index, o.fn || (u.call(e, t, o), l.call(e, t, o)), n.push(o)
                    }
                    return n
                }
                var h, f = s({
                    isHelper: !0,
                    skipTip: !0,
                    skipBoundsCheck: !0,
                    nSamples: 2,
                    graphType: "polyline"
                });
                return h = function(e) {
                    e.each(function(n) {
                        var i = r.select(this),
                            o = c.call(e, n),
                            s = i.selectAll("g.secant").data(o);
                        s.enter().append("g").attr("class", "secant"), s.call(a(t)), s.selectAll("path").attr("opacity", .5), s.exit().remove()
                    })
                }
            }
        }, {
            "../datum-defaults": 7,
            "../graph-types/polyline": 12,
            "./eval": 16,
            extend: 60
        }],
        19: [function(t, e, n) {
            "use strict";
            t("./polyfills");
            var r, i, o = window.d3,
                s = t("events"),
                a = t("extend"),
                u = t("./tip"),
                l = t("./helpers/"),
                c = t("./helpers/annotations"),
                h = t("./datum-defaults"),
                f = [];
            e.exports = function(t) {
                function e() {
                    var e = Math.random(),
                        n = String.fromCharCode(Math.floor(26 * e) + 97);
                    this.id = t.id = n + e.toString(16).substr(2), this.linkedGraphs = [this], this.options = t, f[this.id] = this, this.setUpEventListeners()
                }
                t = t || {}, t.data = t.data || [];
                var n, p, d, v, y, m, g = o.line().x(function(t) {
                    return y(t[0])
                }).y(function(t) {
                    return m(t[1])
                });
                e.prototype = Object.create(s.prototype), e.prototype.build = function() {
                    return this.internalVars(), this.drawGraphWrapper(), this
                }, e.prototype.initializeAxes = function() {
                    function e(t) {
                        var e = t[1] - t[0];
                        return p * e / n
                    }
                    var r = o.format("s"),
                        i = function(t) {
                            return function(e) {
                                var n = t.tickFormat(10),
                                    i = e === +e && e === (0 | e);
                                return i ? r(e) : n(e)
                            }
                        };
                    t.xAxis = t.xAxis || {}, t.xAxis.type = t.xAxis.type || "linear", t.yAxis = t.yAxis || {}, t.yAxis.type = t.yAxis.type || "linear";
                    var s = this.meta.xDomain = function(t) {
                            if (t.domain) return t.domain;
                            if ("linear" === t.type) {
                                var e = 12;
                                return [-e / 2, e / 2]
                            }
                            if ("log" === t.type) return [1, 10];
                            throw Error("axis type " + t.type + " unsupported")
                        }(t.xAxis),
                        a = this.meta.yDomain = function(t) {
                            if (t.domain) return t.domain;
                            var n = e(s);
                            if ("linear" === t.type) return [-n / 2, n / 2];
                            if ("log" === t.type) return [1, 10];
                            throw Error("axis type " + t.type + " unsupported")
                        }(t.yAxis);
                    if (s[0] >= s[1]) throw Error("the pair defining the x-domain is inverted");
                    if (a[0] >= a[1]) throw Error("the pair defining the y-domain is inverted");
                    y = this.meta.xScale = o.scale[t.xAxis.type]().domain(s).range(t.xAxis.invert ? [n, 0] : [0, n]), m = this.meta.yScale = o.scale[t.yAxis.type]().domain(a).range(t.yAxis.invert ? [0, p] : [p, 0]), this.meta.xAxis = o.svg.axis().scale(y).tickSize(t.grid ? -p : 0).tickFormat(i(y)).orient("bottom"), this.meta.yAxis = o.svg.axis().scale(m).tickSize(t.grid ? -n : 0).tickFormat(i(m)).orient("left")
                }, e.prototype.internalVars = function() {
                    this.meta = {}, d = this.meta.margin = {
                        left: 30,
                        right: 30,
                        top: 20,
                        bottom: 20
                    }, t.title && (this.meta.margin.top = 40), v = this.meta.zoomBehavior = o.zoom(), n = this.meta.width = (t.width || r.DEFAULT_WIDTH) - d.left - d.right, p = this.meta.height = (t.height || r.DEFAULT_HEIGHT) - d.top - d.bottom, this.initializeAxes()
                }, e.prototype.drawGraphWrapper = function() {
                    var e = this.root = o.select(t.target).selectAll("svg").data([t]);
                    this.root.enter = e.enter().append("svg").attr("class", "function-plot").attr("font-size", this.getFontSize()), e.attr("width", n + d.left + d.right).attr("height", p + d.top + d.bottom), this.buildTitle(), this.buildLegend(), this.buildCanvas(), this.buildClip(), this.buildAxis(), this.buildAxisLabel(), this.draw();
                    var r = this.tip = u(a(t.tip, {
                        owner: this
                    }));
                    this.canvas.call(r), this.buildZoomHelper(), this.setUpPlugins()
                }, e.prototype.buildTitle = function() {
                    var e = this.root.selectAll("text.title").data(function(t) {
                        return [t.title].filter(Boolean)
                    });
                    e.enter().append("text").attr("class", "title").attr("y", d.top / 2).attr("x", d.left + n / 2).attr("font-size", 25).attr("text-anchor", "middle").attr("alignment-baseline", "middle").text(t.title), e.exit().remove()
                }, e.prototype.buildLegend = function() {
                    this.root.enter.append("text").attr("class", "top-right-legend").attr("text-anchor", "end"), this.root.select(".top-right-legend").attr("y", d.top / 2).attr("x", n + d.left)
                }, e.prototype.buildCanvas = function() {
                    var t = this;
                    this.meta.zoomBehavior.x(y).y(m).on("zoom", function() {
                        t.emit("all:zoom", o.event.translate, o.event.scale)
                    });
                    var e = this.canvas = this.root.selectAll(".canvas").data(function(t) {
                        return [t]
                    });
                    this.canvas.enter = e.enter().append("g").attr("class", "canvas")
                }, e.prototype.buildClip = function() {
                    var t = this.id,
                        e = this.canvas.enter.append("defs");
                    e.append("clipPath").attr("id", "function-plot-clip-" + t).append("rect").attr("class", "clip static-clip"), this.canvas.selectAll(".clip").attr("width", n).attr("height", p), this.markerId = this.id + "-marker", e.append("clipPath").append("marker").attr("id", this.markerId).attr("viewBox", "0 -5 10 10").attr("refX", 10).attr("markerWidth", 5).attr("markerHeight", 5).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5L0,0").attr("stroke-width", "0px").attr("fill-opacity", 1).attr("fill", "#777")
                }, e.prototype.buildAxis = function() {
                    var t = this.canvas.enter;
                    t.append("g").attr("class", "x axis"), t.append("g").attr("class", "y axis"), this.canvas.select(".x.axis").attr("transform", "translate(0," + p + ")").call(this.meta.xAxis), this.canvas.select(".y.axis").call(this.meta.yAxis)
                }, e.prototype.buildAxisLabel = function() {
                    var t, e, r = this.canvas;
                    t = r.selectAll("text.x.axis-label").data(function(t) {
                        return [t.xAxis.label].filter(Boolean)
                    }), t.enter().append("text").attr("class", "x axis-label").attr("text-anchor", "end"), t.attr("x", n).attr("y", p - 6).text(function(t) {
                        return t
                    }), t.exit().remove(), e = r.selectAll("text.y.axis-label").data(function(t) {
                        return [t.yAxis.label].filter(Boolean)
                    }), e.enter().append("text").attr("class", "y axis-label").attr("y", 6).attr("dy", ".75em").attr("text-anchor", "end").attr("transform", "rotate(-90)"), e.text(function(t) {
                        return t
                    }), e.exit().remove()
                }, e.prototype.buildContent = function() {
                    var e = this,
                        n = this.canvas;
                    n.attr("transform", "translate(" + d.left + "," + d.top + ")").call(v).each(function() {
                        function e(t) {
                            r.forEach(function(e) {
                                t ? n.on(e, n["_" + e]) : n.on(e, null)
                            })
                        }
                        var n = o.select(this),
                            r = ["mousedown", "touchstart", "onwheel" in document ? "wheel" : "ononmousewheel" in document ? "mousewheel" : "MozMousePixelScroll"].map(function(t) {
                                return t + ".zoom"
                            });
                        n._zoomListenersCache || (r.forEach(function(t) {
                            n["_" + t] = n.on(t)
                        }), n._zoomListenersCache = !0), e(!t.disableZoom)
                    });
                    var r = this.content = n.selectAll(":scope > g.content").data(function(t) {
                        return [t]
                    });
                    if (r.enter().append("g").attr("clip-path", "url(#function-plot-clip-" + this.id + ")").attr("class", "content"), "linear" === t.xAxis.type) {
                        var s = r.selectAll(":scope > path.y.origin").data([
                            [
                                [0, m.domain()[0]],
                                [0, m.domain()[1]]
                            ]
                        ]);
                        s.enter().append("path").attr("class", "y origin").attr("stroke", "black").attr("opacity", .2), s.attr("d", g)
                    }
                    if ("linear" === t.yAxis.type) {
                        var a = r.selectAll(":scope > path.x.origin").data([
                            [
                                [y.domain()[0], 0],
                                [y.domain()[1], 0]
                            ]
                        ]);
                        a.enter().append("path").attr("class", "x origin").attr("stroke", "black").attr("opacity", .2), a.attr("d", g)
                    }
                    r.call(c({
                        owner: e
                    }));
                    var u = r.selectAll(":scope > g.graph").data(function(t) {
                        return t.data.map(h)
                    });
                    u.enter().append("g").attr("class", "graph"), u.each(function(t, n) {
                        t.index = n, o.select(this).call(i[t.graphType](e)), o.select(this).call(l(e))
                    })
                }, e.prototype.buildZoomHelper = function() {
                    var t = this;
                    this.draggable = this.canvas.enter.append("rect").attr("class", "zoom-and-drag").style("fill", "none").style("pointer-events", "all"), this.canvas.select(".zoom-and-drag").attr("width", n).attr("height", p).on("mouseover", function() {
                        t.emit("all:mouseover")
                    }).on("mouseout", function() {
                        t.emit("all:mouseout")
                    }).on("mousemove", function() {
                        t.emit("all:mousemove")
                    })
                }, e.prototype.setUpPlugins = function() {
                    var e = t.plugins || [],
                        n = this;
                    e.forEach(function(t) {
                        t(n)
                    })
                }, e.prototype.addLink = function() {
                    for (var t = 0; t < arguments.length; t += 1) this.linkedGraphs.push(arguments[t])
                }, e.prototype.updateAxes = function() {
                    var t = this,
                        e = t.canvas;
                    e.select(".x.axis").call(t.meta.xAxis), e.select(".y.axis").call(t.meta.yAxis), e.selectAll(".axis path, .axis line").attr("fill", "none").attr("stroke", "black").attr("shape-rendering", "crispedges").attr("opacity", .1)
                }, e.prototype.syncOptions = function() {
                    this.options.xAxis.domain = this.meta.xScale.domain(), this.options.yAxis.domain = this.meta.yScale.domain()
                }, e.prototype.programmaticZoom = function(t, e) {
                    var n = this;
                    o.transition().duration(750).tween("zoom", function() {
                        var r = o.interpolate(y.domain(), t),
                            i = o.interpolate(m.domain(), e);
                        return function(t) {
                            v.x(y.domain(r(t))).y(m.domain(i(t))), n.draw()
                        }
                    }).each("end", function() {
                        n.emit("programmatic-zoom")
                    })
                }, e.prototype.getFontSize = function() {
                    return Math.max(Math.max(n, p) / 50, 8)
                }, e.prototype.draw = function() {
                    var t = this;
                    t.emit("before:draw"), t.syncOptions(), t.updateAxes(), t.buildContent(), t.emit("after:draw")
                }, e.prototype.setUpEventListeners = function() {
                    var t = this,
                        e = {
                            mousemove: function(e) {
                                t.tip.move(e)
                            },
                            mouseover: function() {
                                t.tip.show()
                            },
                            mouseout: function() {
                                t.tip.hide()
                            },
                            zoom: function(t, e) {
                                v.translate(t).scale(e)
                            },
                            "tip:update": function(e, n, i) {
                                var o = t.root.datum().data[i],
                                    s = o.title || "",
                                    a = o.renderer || function(t, e) {
                                        return t.toFixed(3) + ", " + e.toFixed(3)
                                    },
                                    u = [];
                                s && u.push(s), u.push(a(e, n)), t.root.select(".top-right-legend").attr("fill", r.COLORS[i]).text(u.join(" "))
                            }
                        },
                        n = {
                            mousemove: function() {
                                var e = o.mouse(t.root.select("rect.zoom-and-drag").node()),
                                    n = {
                                        x: y.invert(e[0]),
                                        y: m.invert(e[1])
                                    };
                                t.linkedGraphs.forEach(function(t) {
                                    t.emit("before:mousemove", n), t.emit("mousemove", n)
                                })
                            },
                            zoom: function(e, n) {
                                t.linkedGraphs.forEach(function(t, r) {
                                    t.emit("zoom", e, n), t.draw()
                                }), t.emit("all:mousemove")
                            }
                        };
                    Object.keys(e).forEach(function(r) {
                        t.on(r, e[r]), !n[r] && t.on("all:" + r, function() {
                            var e = Array.prototype.slice.call(arguments);
                            t.linkedGraphs.forEach(function(t) {
                                var n = e.slice();
                                n.unshift(r), t.emit.apply(t, n)
                            })
                        })
                    }), Object.keys(n).forEach(function(e) {
                        t.on("all:" + e, n[e])
                    })
                };
                var x = f[t.id];
                return x || (x = new e), x.build()
            }, r = e.exports.globals = t("./globals"), i = e.exports.graphTypes = t("./graph-types/"), e.exports.plugins = t("./plugins/"), e.exports.eval = t("./helpers/eval")
        }, {
            "./datum-defaults": 7,
            "./globals": 9,
            "./graph-types/": 10,
            "./helpers/": 17,
            "./helpers/annotations": 14,
            "./helpers/eval": 16,
            "./plugins/": 21,
            "./polyfills": 23,
            "./tip": 26,
            events: 5,
            extend: 60
        }],
        20: [function(t, e, n) {
            var r = window.d3,
                i = t("extend"),
                o = t("key-pressed"),
                s = t("keydown"),
                a = t("integrate-adaptive-simpson");
            e.exports = function(t) {
                function e(t) {
                    return function(e) {
                        var n = window.functionPlot;
                        return n.eval.builtIn(t, "fn", {
                            x: e
                        })
                    }
                }

                function n(t) {
                    var e = l.canvas.selectAll(".definite-integral");
                    e.style("display", t ? null : "none")
                }

                function u(n) {
                    l = n;
                    var i;
                    c.x(n.meta.xScale).on("brushstart", function() {
                        r.event.sourceEvent && (i = !!n.options.disableZoom, n.options.disableZoom = !0, n.emit("draw"))
                    }).on("brushend", function() {
                        if (r.event.sourceEvent) {
                            if (n.options.disableZoom = i, !c.empty()) {
                                var o = c.extent()[0],
                                    s = c.extent()[1];
                                n.options.data.forEach(function(r, i) {
                                    var u = a(e(r), o, s, t.tol, t.maxdepth);
                                    n.emit("definite-integral", r, i, u, o, s)
                                })
                            }
                            n.draw()
                        }
                    });
                    var s = n.canvas.append("g").attr("class", "brush definite-integral");
                    s.call(c).call(c.event), n.canvas.selectAll(".brush .extent").attr("stroke", "#fff").attr("fill-opacity", .125).attr("shape-rendering", "crispEdges"), s.selectAll("rect").attr("height", n.meta.height), n.canvas.on("mousemove.definiteIntegral", function() {
                        t.toggle || u.visible(o(t.key))
                    }), h.on("pressed", function() {
                        u.visible(!t.toggle || !u.visible())
                    }), u.visible(!1)
                }
                t = i({
                    key: "<shift>",
                    toggle: !1
                }, t);
                var l, c = r.svg.brush(),
                    h = s(t.key),
                    f = !1;
                return u.visible = function(t) {
                    return arguments.length ? (f = t, n(t), u) : f
                }, u
            }
        }, {
            extend: 60,
            "integrate-adaptive-simpson": 61,
            "key-pressed": 112,
            keydown: 114
        }],
        21: [function(t, e, n) {
            e.exports = {
                zoomBox: t("./zoom-box"),
                definiteIntegral: t("./definite-integral")
            }
        }, {
            "./definite-integral": 20,
            "./zoom-box": 22
        }],
        22: [function(t, e, n) {
            var r = window.d3,
                i = t("extend"),
                o = t("key-pressed"),
                s = t("keydown");
            e.exports = function(t) {
                function e(t) {
                    var e = a.canvas.selectAll(".zoom-box");
                    e.style("display", t ? null : "none")
                }

                function n(e) {
                    a = e;
                    var i;
                    u.x(e.meta.xScale).y(e.meta.yScale).on("brushstart", function() {
                        r.event.sourceEvent && (i = !!e.options.disableZoom, e.options.disableZoom = !0, e.draw())
                    }).on("brushend", function() {
                        if (r.event.sourceEvent) {
                            if (e.options.disableZoom = i, !u.empty()) {
                                var t = u.extent()[0],
                                    n = u.extent()[1],
                                    o = [t[0], n[0]],
                                    s = [t[1], n[1]];
                                e.programmaticZoom(o, s)
                            }
                            r.select(this).transition().duration(1).call(u.clear()).call(u.event)
                        }
                    });
                    var s = e.canvas.append("g").attr("class", "brush zoom-box");
                    s.call(u).call(u.event), e.canvas.selectAll(".brush .extent").attr("stroke", "#fff").attr("fill-opacity", .125).attr("shape-rendering", "crispEdges"), e.canvas.on("mousemove.zoombox", function() {
                        t.toggle || n.visible(o(t.key))
                    }), l.on("pressed", function() {
                        n.visible(!t.toggle || !n.visible())
                    }), n.visible(!1)
                }
                t = i({
                    key: "<shift>",
                    toggle: !1
                }, t);
                var a, u = r.svg.brush(),
                    l = s(t.key),
                    c = !1;
                return n.visible = function(t) {
                    return arguments.length ? (c = t, e(t), n) : c
                }, n
            }
        }, {
            extend: 60,
            "key-pressed": 112,
            keydown: 114
        }],
        23: [function(t, e, n) {
            ! function(t, e) {
                try {
                    t.querySelector(":scope body")
                } catch (n) {
                    ["querySelector", "querySelectorAll"].forEach(function(n) {
                        var r = e[n];
                        e[n] = function(e) {
                            if (/(^|,)\s*:scope/.test(e)) {
                                var i = this.id;
                                this.id = "ID_" + Date.now(), e = e.replace(/((^|,)\s*):scope/g, "$1#" + this.id);
                                var o = t[n](e);
                                return this.id = i, o
                            }
                            return r.call(this, e)
                        }
                    })
                }
            }(window.document, Element.prototype)
        }, {}],
        24: [function(t, e, n) {
            "use strict";

            function r(t, e, n, i, o) {
                if (!o) return {
                    asymptote: !0,
                    d0: t,
                    d1: e
                };
                var s, a, u, l = 10,
                    c = t[0],
                    d = e[0],
                    v = h(c, d, l);
                for (s = 0; s < l; s += 1) {
                    var y = v[s],
                        m = p(n, "fn", {
                            x: y
                        });
                    if (s) {
                        var g = m - a,
                            x = f.sgn(g);
                        if (x === i) return r([u, a], [y, m], n, i, o - 1)
                    }
                    a = m, u = y
                }
                return {
                    asymptote: !1,
                    d0: t,
                    d1: e
                }
            }

            function i(t, e, n) {
                function i(t) {
                    return t[1] = Math.min(t[1], d), t[1] = Math.max(t[1], p), t
                }
                var o, s, a, u = [],
                    l = [],
                    c = t.meta.yScale.domain(),
                    h = t.meta.zoomBehavior.scale(),
                    p = c[0],
                    d = c[1];
                for (n[0] && (u.push(n[0]), a = n[1][0] - n[0][0], s = f.sgn(n[1][1] - n[0][1])), o = 1; o < n.length;) {
                    var v = n[o - 1][1],
                        y = n[o][1],
                        m = y - v,
                        g = f.sgn(m);
                    if (s !== g && Math.abs(m / a) > 1 / h) {
                        var x = r(n[o - 1], n[o], e, g, 3);
                        x.asymptote && (u.push(i(x.d0)), l.push(u), u = [i(x.d1)])
                    }
                    s = g, u.push(n[o]), ++o
                }
                return u.length && l.push(u), l
            }

            function o(t, e, n, r) {
                var o, s = f.space(t, n, r),
                    a = t.meta.yScale.domain(),
                    u = a[1] - a[0],
                    l = a[0] - 1e5 * u,
                    h = a[1] + 1e5 * u,
                    d = [];
                for (o = 0; o < s.length; o += 1) {
                    var v = s[o],
                        y = p(e, "fn", {
                            x: v
                        });
                    f.isValidNumber(v) && f.isValidNumber(y) && d.push([v, c(y, l, h)])
                }
                return d = i(t, e, d)
            }

            function s(t, e, n, r) {
                for (var i = e.range || [0, 2 * Math.PI], o = f.space(t, i, r), s = [], a = 0; a < o.length; a += 1) {
                    var u = o[a],
                        l = p(e, "x", {
                            t: u
                        }),
                        c = p(e, "y", {
                            t: u
                        });
                    s.push([l, c])
                }
                return [s]
            }

            function a(t, e, n, r) {
                for (var i = e.range || [-Math.PI, Math.PI], o = f.space(t, i, r), s = [], a = 0; a < o.length; a += 1) {
                    var u = o[a],
                        l = p(e, "r", {
                            theta: u
                        }),
                        c = l * Math.cos(u),
                        h = l * Math.sin(u);
                    s.push([c, h])
                }
                return [s]
            }

            function u(t, e, n, r) {
                return [e.points]
            }

            function l(t, e, n, r) {
                return e.offset = e.offset || [0, 0], [
                    [e.offset, [e.vector[0] + e.offset[0], e.vector[1] + e.offset[1]]]
                ]
            }
            var c = t("clamp"),
                h = t("linspace"),
                f = t("../utils"),
                p = t("../helpers/eval").builtIn,
                d = function(t, e, n, r) {
                    var i = {
                        parametric: s,
                        polar: a,
                        points: u,
                        vector: l,
                        linear: o
                    };
                    if (!(e.fnType in i)) throw Error(e.fnType + " is not supported in the `builtIn` sampler");
                    return i[e.fnType].apply(null, arguments)
                };
            e.exports = d
        }, {
            "../helpers/eval": 16,
            "../utils": 27,
            clamp: 59,
            linspace: 116
        }],
        25: [function(t, e, n) {
            "use strict";

            function r(t, e, n, r) {
                var i, o = c.space(t, n, r),
                    s = t.meta.xScale,
                    a = t.meta.yScale,
                    h = a.domain()[0],
                    f = a.domain()[1],
                    p = [];
                for (i = 0; i < o.length - 1; i += 1) {
                    var d = {
                            lo: o[i],
                            hi: o[i + 1]
                        },
                        v = l(e, "fn", {
                            x: d
                        });
                    u.isEmpty(v) || u.isWhole(v) || p.push([d, v]), u.isWhole(v) && p.push(null)
                }
                for (i = 1; i < p.length - 1; i += 1)
                    if (!p[i]) {
                        var y = p[i - 1],
                            m = p[i + 1];
                        y && m && !u.intervalsOverlap(y[1], m[1]) && (y[1].lo > m[1].hi && (y[1].hi = Math.max(f, y[1].hi), m[1].lo = Math.min(h, m[1].lo)), y[1].hi < m[1].lo && (y[1].lo = Math.min(h, y[1].lo), m[1].hi = Math.max(f, m[1].hi)))
                    }
                return p.scaledDx = s(o[1]) - s(o[0]), [p]
            }

            function i(t, e) {
                return u.width(t) < h
            }

            function o(t, e, n) {
                var r = l(n, "fn", {
                        x: t,
                        y: e
                    }),
                    s = u.zeroIn(r);
                if (!s) return this;
                if (i(t, e)) return this.push([t, e]), this;
                var a = t.lo + (t.hi - t.lo) / 2,
                    c = e.lo + (e.hi - e.lo) / 2,
                    h = {
                        lo: a,
                        hi: t.hi
                    },
                    f = {
                        lo: t.lo,
                        hi: a
                    },
                    p = {
                        lo: c,
                        hi: e.hi
                    },
                    d = {
                        lo: e.lo,
                        hi: c
                    };
                o.call(this, h, p, n), o.call(this, h, d, n), o.call(this, f, p, n), o.call(this, f, d, n)
            }

            function s(t, e) {
                var n = t.meta.xScale,
                    r = t.meta.xScale.domain(),
                    i = t.meta.yScale.domain(),
                    s = {
                        lo: r[0],
                        hi: r[1]
                    },
                    a = {
                        lo: i[0],
                        hi: i[1]
                    },
                    u = [];
                return h = n.invert(1) - n.invert(0), o.call(u, s, a, e), u.scaledDx = 1, [u]
            }
            var a = t("interval-arithmetic-eval"),
                u = a.Interval,
                l = t("../helpers/eval").interval,
                c = t("../utils");
            a.policies.disableRounding();
            var h, f = function(t, e, n, i) {
                var o = {
                    implicit: s,
                    linear: r
                };
                if (!o.hasOwnProperty(e.fnType)) throw Error(e.fnType + " is not supported in the `interval` sampler");
                return o[e.fnType].apply(null, arguments)
            };
            e.exports = f
        }, {
            "../helpers/eval": 16,
            "../utils": 27,
            "interval-arithmetic-eval": 62
        }],
        26: [function(t, e, n) {
            "use strict";
            var r = window.d3,
                i = t("extend"),
                o = t("./utils"),
                s = t("clamp"),
                a = t("./globals"),
                u = t("./helpers/eval").builtIn;
            e.exports = function(t) {
                function e(t, e) {
                    return t.append("path").datum(e).attr("stroke", "grey").attr("stroke-dasharray", "5,5").attr("opacity", .5).attr("d", c)
                }

                function n(i) {
                    var o = i.selectAll("g.tip").data(function(t) {
                        return [t]
                    });
                    o.enter().append("g").attr("class", "tip").attr("clip-path", "url(#function-plot-clip-" + t.owner.id + ")"), n.el = o.selectAll("g.inner-tip").data(function(t) {
                        return [t]
                    }), n.el.enter().append("g").attr("class", "inner-tip").style("display", "none").each(function() {
                        var n = r.select(this);
                        e(n, [
                            [0, -t.owner.meta.height - l],
                            [0, t.owner.meta.height + l]
                        ]).attr("class", "tip-x-line").style("display", "none"), e(n, [
                            [-t.owner.meta.width - l, 0],
                            [t.owner.meta.width + l, 0]
                        ]).attr("class", "tip-y-line").style("display", "none"), n.append("circle").attr("r", 3), n.append("text").attr("transform", "translate(5,-5)")
                    }), i.selectAll(".tip-x-line").style("display", t.xLine ? null : "none"), i.selectAll(".tip-y-line").style("display", t.yLine ? null : "none")
                }
                t = i({
                    xLine: !1,
                    yLine: !1,
                    renderer: function(t, e, n) {
                        return "(" + t.toFixed(3) + ", " + e.toFixed(3) + ")"
                    },
                    owner: null
                }, t);
                var l = 20,
                    c = r.line().x(function(t) {
                        return t[0]
                    }).y(function(t) {
                        return t[1]
                    });
                return n.move = function(e) {
                    var r, i, c, h = 1 / 0,
                        f = -1,
                        p = n.el,
                        d = 1e8,
                        v = t.owner.meta,
                        y = p.data()[0].data,
                        m = v.xScale,
                        g = v.yScale,
                        x = v.width,
                        w = v.height,
                        b = e.x,
                        E = e.y;
                    for (r = 0; r < y.length; r += 1)
                        if (!y[r].skipTip && "linear" === y[r].fnType) {
                            var N = y[r].range || [-d, d];
                            if (b > N[0] - a.TIP_X_EPS && b < N[1] + a.TIP_X_EPS) {
                                try {
                                    var A = u(y[r], "fn", {
                                        x: b
                                    })
                                } catch (t) {}
                                if (o.isValidNumber(A)) {
                                    var T = Math.abs(A - E);
                                    T < h && (h = T, f = r)
                                }
                            }
                        }
                    if (f !== -1) {
                        i = b, y[f].range && (i = Math.max(i, y[f].range[0]), i = Math.min(i, y[f].range[1])), c = u(y[f], "fn", {
                            x: i
                        }), n.show(), t.owner.emit("tip:update", i, c, f);
                        var _ = s(i, m.invert(-l), m.invert(x + l)),
                            I = s(c, g.invert(w + l), g.invert(-l)),
                            L = o.color(y[f], f);
                        p.attr("transform", "translate(" + m(_) + "," + g(I) + ")"), p.select("circle").attr("fill", L), p.select("text").attr("fill", L).text(t.renderer(i, c, f))
                    } else n.hide()
                }, n.show = function() {
                    this.el.style("display", null)
                }, n.hide = function() {
                    this.el.style("display", "none")
                }, Object.keys(t).forEach(function(e) {
                    o.getterSetter.call(n, t, e)
                }), n
            }
        }, {
            "./globals": 9,
            "./helpers/eval": 16,
            "./utils": 27,
            clamp: 59,
            extend: 60
        }],
        27: [function(t, e, n) {
            "use strict";
            var r = t("linspace"),
                i = t("logspace"),
                o = t("log10"),
                s = t("./globals");
            e.exports = {
                isValidNumber: function(t) {
                    return "number" == typeof t && !isNaN(t)
                },
                space: function(t, e, n) {
                    var s = e[0],
                        a = e[1];
                    return "log" === t.options.xAxis.type ? i(o(s), o(a), n) : r(s, a, n)
                },
                getterSetter: function(t, e) {
                    var n = this;
                    this[e] = function(r) {
                        return arguments.length ? (t[e] = r, n) : t[e]
                    }
                },
                sgn: function(t) {
                    return t < 0 ? -1 : t > 0 ? 1 : 0
                },
                color: function(t, e) {
                    return t.color || s.COLORS[e]
                }
            }
        }, {
            "./globals": 9,
            linspace: 116,
            log10: 118,
            logspace: 119
        }],
        28: [function(t, e, n) {
            "use strict";
            e.exports = t("./lib/eval")
        }, {
            "./lib/eval": 30
        }],
        29: [function(t, e, n) {
            "use strict";
            e.exports = function() {
                var t = Object.create(Math);
                return t.factory = function(t) {
                    if ("number" != typeof t) throw new TypeError("built-in math factory only accepts numbers");
                    return Number(t)
                }, t.add = function(t, e) {
                    return t + e
                }, t.sub = function(t, e) {
                    return t - e
                }, t.mul = function(t, e) {
                    return t * e
                }, t.div = function(t, e) {
                    return t / e
                }, t.mod = function(t, e) {
                    return t % e
                }, t.factorial = function(t) {
                    for (var e = 1, n = 2; n <= t; n += 1) e *= n;
                    return e
                }, t.nthRoot = function(t, e) {
                    var n = e < 0;
                    if (n && (e = -e), 0 === e) throw new Error("Root must be non-zero");
                    if (t < 0 && Math.abs(e) % 2 !== 1) throw new Error("Root must be odd when a is negative.");
                    if (0 === t) return 0;
                    if (!isFinite(t)) return n ? 0 : t;
                    var r = Math.pow(Math.abs(t), 1 / e);
                    return r = t < 0 ? -r : r, n ? 1 / r : r
                }, t.logicalOR = function(t, e) {
                    return t || e
                }, t.logicalXOR = function(t, e) {
                    return t != e
                }, t.logicalAND = function(t, e) {
                    return t && e
                }, t.bitwiseOR = function(t, e) {
                    return t | e
                }, t.bitwiseXOR = function(t, e) {
                    return t ^ e
                }, t.bitwiseAND = function(t, e) {
                    return t & e
                }, t.lessThan = function(t, e) {
                    return t < e
                }, t.lessEqualThan = function(t, e) {
                    return t <= e
                }, t.greaterThan = function(t, e) {
                    return t > e
                }, t.greaterEqualThan = function(t, e) {
                    return t >= e
                }, t.equal = function(t, e) {
                    return t == e
                }, t.strictlyEqual = function(t, e) {
                    return t === e
                }, t.notEqual = function(t, e) {
                    return t != e
                }, t.strictlyNotEqual = function(t, e) {
                    return t !== e
                }, t.shiftRight = function(t, e) {
                    return t >> e
                }, t.shiftLeft = function(t, e) {
                    return t << e
                }, t.unsignedRightShift = function(t, e) {
                    return t >>> e
                }, t.negative = function(t) {
                    return -t
                }, t.positive = function(t) {
                    return t
                }, t
            }
        }, {}],
        30: [function(t, e, n) {
            "use strict";

            function r(t) {
                Object.keys(t).forEach(function(e) {
                    var n = t[e];
                    t[e] = o.factory(n)
                })
            }
            var i = t("math-codegen"),
                o = t("./adapter")();
            e.exports = function(t) {
                return (new i).setDefs({
                    $$processScope: r
                }).parse(t).compile(o)
            }, e.exports.math = o
        }, {
            "./adapter": 29,
            "math-codegen": 31
        }],
        31: [function(t, e, n) {
            "use strict";
            e.exports = t("./lib/CodeGenerator")
        }, {
            "./lib/CodeGenerator": 32
        }],
        32: [function(t, e, n) {
            "use strict";

            function r(t, e) {
                this.statements = [], this.defs = e || {}, this.interpreter = new o(this, t)
            }
            var i = t("mr-parser").Parser,
                o = t("./Interpreter"),
                s = t("extend");
            r.prototype.setDefs = function(t) {
                return this.defs = s(this.defs, t), this
            }, r.prototype.compile = function(t) {
                if (!t || "object" != typeof t && "function" != typeof t) throw TypeError("namespace must be an object");
                if ("function" != typeof t.factory) throw TypeError("namespace.factory must be a function");
                this.defs.ns = t, this.defs.$$mathCodegen = {
                    getProperty: function(t, e, n) {
                        if (t in e) return e[t];
                        if (t in n) return n[t];
                        throw SyntaxError('symbol "' + t + '" is undefined')
                    },
                    functionProxy: function(t, e) {
                        if ("function" != typeof t) throw SyntaxError('symbol "' + e + '" must be a function');
                        return t
                    }
                }, this.defs.$$processScope = this.defs.$$processScope || function() {};
                var e = Object.keys(this.defs).map(function(t) {
                    return "var " + t + ' = defs["' + t + '"]'
                });
                if (!this.statements.length) throw Error("there are no statements saved in this generator, make sure you parse an expression before compiling it");
                this.statements[this.statements.length - 1] = "return " + this.statements[this.statements.length - 1];
                var n = this.statements.join(";"),
                    r = e.join("\n") + "\n" + ["return {", "  eval: function (scope) {", "    scope = scope || {}", "    $$processScope(scope)", "    " + n, "  },", "  code: '" + n + "'", "}"].join("\n"),
                    i = new Function("defs", r);
                return i(this.defs)
            }, r.prototype.parse = function(t) {
                var e = this,
                    n = (new i).parse(t);
                return this.statements = n.blocks.map(function(t) {
                    return e.interpreter.next(t)
                }), this
            }, e.exports = r
        }, {
            "./Interpreter": 33,
            extend: 60,
            "mr-parser": 44
        }],
        33: [function(t, e, n) {
            "use strict";
            var r = t("extend"),
                i = {
                    ArrayNode: t("./node/ArrayNode"),
                    AssignmentNode: t("./node/AssignmentNode"),
                    ConditionalNode: t("./node/ConditionalNode"),
                    ConstantNode: t("./node/ConstantNode"),
                    FunctionNode: t("./node/FunctionNode"),
                    OperatorNode: t("./node/OperatorNode"),
                    SymbolNode: t("./node/SymbolNode"),
                    UnaryNode: t("./node/UnaryNode")
                },
                o = function(t, e) {
                    this.owner = t, this.options = r({
                        factory: "ns.factory",
                        raw: !1,
                        rawArrayExpressionElements: !0,
                        rawCallExpressionElements: !1
                    }, e)
                };
            r(o.prototype, i), o.prototype.next = function(t) {
                if (!(t.type in this)) throw new TypeError("the node type " + t.type + " is not implemented");
                return this[t.type](t)
            }, o.prototype.rawify = function(t, e) {
                var n = this.options.raw;
                t && (this.options.raw = !0), e(), t && (this.options.raw = n)
            }, e.exports = o
        }, {
            "./node/ArrayNode": 36,
            "./node/AssignmentNode": 37,
            "./node/ConditionalNode": 38,
            "./node/ConstantNode": 39,
            "./node/FunctionNode": 40,
            "./node/OperatorNode": 41,
            "./node/SymbolNode": 42,
            "./node/UnaryNode": 43,
            extend: 60
        }],
        34: [function(t, e, n) {
            "use strict";
            e.exports = {
                "+": "add",
                "-": "sub",
                "*": "mul",
                "/": "div",
                "^": "pow",
                "%": "mod",
                "!": "factorial",
                "|": "bitwiseOR",
                "^|": "bitwiseXOR",
                "&": "bitwiseAND",
                "||": "logicalOR",
                xor: "logicalXOR",
                "&&": "logicalAND",
                "<": "lessThan",
                ">": "greaterThan",
                "<=": "lessEqualThan",
                ">=": "greaterEqualThan",
                "===": "strictlyEqual",
                "==": "equal",
                "!==": "strictlyNotEqual",
                "!=": "notEqual",
                ">>": "shiftRight",
                "<<": "shiftLeft",
                ">>>": "unsignedRightShift"
            }
        }, {}],
        35: [function(t, e, n) {
            "use strict";
            e.exports = {
                "+": "positive",
                "-": "negative",
                "~": "oneComplement"
            }
        }, {}],
        36: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                var e = this,
                    n = [];
                this.rawify(this.options.rawArrayExpressionElements, function() {
                    n = t.nodes.map(function(t) {
                        return e.next(t)
                    })
                });
                var r = "[" + n.join(",") + "]";
                return this.options.raw ? r : this.options.factory + "(" + r + ")"
            }
        }, {}],
        37: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                return 'scope["' + t.name + '"] = ' + this.next(t.expr)
            }
        }, {}],
        38: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                var e = "!!(" + this.next(t.condition) + ")",
                    n = this.next(t.trueExpr),
                    r = this.next(t.falseExpr);
                return "(" + e + " ? (" + n + ") : (" + r + ") )"
            }
        }, {}],
        39: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                return this.options.raw ? t.value : this.options.factory + "(" + t.value + ")"
            }
        }, {}],
        40: [function(t, e, n) {
            "use strict";
            var r = t("mr-parser").nodeTypes.SymbolNode,
                i = function(t) {
                    return "$$mathCodegen.functionProxy(" + this.next(new r(t.name)) + ', "' + t.name + '")'
                };
            e.exports = function(t) {
                var e = this,
                    n = i.call(this, t),
                    r = [];
                return this.rawify(this.options.rawCallExpressionElements, function() {
                    r = t.args.map(function(t) {
                        return e.next(t)
                    })
                }), n + "(" + r.join(", ") + ")"
            }, e.exports.functionProxy = i
        }, {
            "mr-parser": 44
        }],
        41: [function(t, e, n) {
            "use strict";
            var r = t("../misc/Operators");
            e.exports = function(t) {
                if (this.options.raw) return ["(" + this.next(t.args[0]), t.op, this.next(t.args[1]) + ")"].join(" ");
                var e = r[t.op];
                if (!e) throw TypeError("unidentified operator");
                return this.FunctionNode({
                    name: e,
                    args: t.args
                })
            }
        }, {
            "../misc/Operators": 34
        }],
        42: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                var e = t.name;
                return '$$mathCodegen.getProperty("' + e + '", scope, ns)'
            }
        }, {}],
        43: [function(t, e, n) {
            "use strict";
            var r = t("../misc/UnaryOperators");
            e.exports = function(t) {
                if (this.options.raw) return t.op + this.next(t.argument);
                if (!(t.op in r)) throw new SyntaxError(t.op + " not implemented");
                var e = r[t.op];
                return this.FunctionNode({
                    name: e,
                    args: [t.argument]
                })
            }
        }, {
            "../misc/UnaryOperators": 35
        }],
        44: [function(t, e, n) {
            "use strict";
            e.exports.Lexer = t("./lib/Lexer"), e.exports.Parser = t("./lib/Parser"), e.exports.nodeTypes = t("./lib/node/")
        }, {
            "./lib/Lexer": 45,
            "./lib/Parser": 46,
            "./lib/node/": 57
        }],
        45: [function(t, e, n) {
            function r(t) {
                return t >= "0" && t <= "9"
            }

            function i(t) {
                return t >= "a" && t <= "z" || t >= "A" && t <= "Z" || "$" === t || "_" === t
            }

            function o(t) {
                return " " === t || "\r" === t || "\t" === t || "\n" === t || "\v" === t || "Â " === t
            }

            function s(t) {
                return h[t]
            }

            function a(t) {
                return "'" === t || '"' === t
            }

            function u() {}
            var l = t("./token-type"),
                c = {
                    n: "\n",
                    f: "\f",
                    r: "\r",
                    t: "\t",
                    v: "\v",
                    "'": "'",
                    '"': '"'
                },
                h = {
                    ",": !0,
                    "(": !0,
                    ")": !0,
                    "[": !0,
                    "]": !0,
                    ";": !0,
                    "~": !0,
                    "!": !0,
                    "+": !0,
                    "-": !0,
                    "*": !0,
                    "/": !0,
                    "%": !0,
                    "^": !0,
                    "**": !0,
                    "|": !0,
                    "&": !0,
                    "^|": !0,
                    "=": !0,
                    ":": !0,
                    "?": !0,
                    "||": !0,
                    "&&": !0,
                    xor: !0,
                    "==": !0,
                    "!=": !0,
                    "===": !0,
                    "!==": !0,
                    "<": !0,
                    ">": !0,
                    ">=": !0,
                    "<=": !0,
                    ">>>": !0,
                    "<<": !0,
                    ">>": !0
                };
            u.prototype.throwError = function(t, e) {
                e = "undefined" == typeof e ? this.index : e;
                var n = new Error(t + " at index " + e);
                throw n.index = e, n.description = t, n
            }, u.prototype.lex = function(t) {
                for (this.text = t, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                    for (; o(this.peek());) this.consume();
                    var e = this.peek(),
                        n = e + this.peek(1),
                        u = n + this.peek(2);
                    s(u) ? (this.tokens.push({
                        type: l.DELIMITER,
                        value: u
                    }), this.consume(), this.consume(), this.consume()) : s(n) ? (this.tokens.push({
                        type: l.DELIMITER,
                        value: n
                    }), this.consume(), this.consume()) : s(e) ? (this.tokens.push({
                        type: l.DELIMITER,
                        value: e
                    }), this.consume()) : r(e) || "." === e && r(this.peek(1)) ? this.tokens.push({
                        type: l.NUMBER,
                        value: this.readNumber()
                    }) : a(e) ? this.tokens.push({
                        type: l.STRING,
                        value: this.readString()
                    }) : i(e) ? this.tokens.push({
                        type: l.SYMBOL,
                        value: this.readIdentifier()
                    }) : this.throwError("unexpected character " + e)
                }
                return this.tokens.push({
                    type: l.EOF
                }), this.tokens
            }, u.prototype.peek = function(t) {
                if (t = t || 0, !(this.index + t >= this.text.length)) return this.text.charAt(this.index + t)
            }, u.prototype.consume = function() {
                var t = this.peek();
                return this.index += 1, t
            }, u.prototype.readNumber = function() {
                var t = "";
                if ("." === this.peek()) t += this.consume(), r(this.peek()) || this.throwError("number expected");
                else {
                    for (; r(this.peek());) t += this.consume();
                    "." === this.peek() && (t += this.consume())
                }
                for (; r(this.peek());) t += this.consume();
                if ("e" === this.peek() || "E" === this.peek())
                    for (t += this.consume(), r(this.peek()) || "+" === this.peek() || "-" === this.peek() || this.throwError(), "+" !== this.peek() && "-" !== this.peek() || (t += this.consume()), r(this.peek()) || this.throwError("number expected"); r(this.peek());) t += this.consume();
                return t
            }, u.prototype.readIdentifier = function() {
                for (var t = ""; i(this.peek()) || r(this.peek());) t += this.consume();
                return t
            }, u.prototype.readString = function() {
                for (var t, e = this.consume(), n = "";;) {
                    var r = this.consume();
                    if (r || this.throwError("string is not closed"), t) {
                        if ("u" === r) {
                            var i = this.text.substring(this.index + 1, this.index + 5);
                            i.match(/[\da-f]{4}/i) || this.throwError("invalid unicode escape"), this.index += 4, n += String.fromCharCode(parseInt(i, 16))
                        } else {
                            var o = c[r];
                            n += o ? o : r
                        }
                        t = !1
                    } else {
                        if (r === e) break;
                        "\\" === r ? t = !0 : n += r
                    }
                }
                return n
            }, e.exports = u
        }, {
            "./token-type": 58
        }],
        46: [function(t, e, n) {
            function r() {
                this.lexer = new o, this.tokens = null
            }
            var i = t("./token-type"),
                o = t("./Lexer"),
                s = t("./node/ConstantNode"),
                a = t("./node/OperatorNode"),
                u = t("./node/UnaryNode"),
                l = t("./node/SymbolNode"),
                c = t("./node/FunctionNode"),
                h = t("./node/ArrayNode"),
                f = t("./node/ConditionalNode"),
                p = t("./node/AssignmentNode"),
                d = t("./node/BlockNode");
            r.prototype.current = function() {
                return this.tokens[0]
            }, r.prototype.next = function() {
                return this.tokens[1]
            }, r.prototype.peek = function() {
                if (this.tokens.length)
                    for (var t = this.tokens[0], e = 0; e < arguments.length; e += 1)
                        if (t.value === arguments[e]) return !0
            }, r.prototype.consume = function(t) {
                return this.tokens.shift()
            }, r.prototype.expect = function(t) {
                if (!this.peek(t)) throw Error("expected " + t);
                return this.consume()
            }, r.prototype.isEOF = function() {
                return this.current().type === i.EOF
            }, r.prototype.parse = function(t) {
                return this.tokens = this.lexer.lex(t), this.program()
            }, r.prototype.program = function() {
                for (var t = []; !this.isEOF();) t.push(this.assignment()), this.peek(";") && this.consume();
                return this.end(), new d(t)
            }, r.prototype.assignment = function() {
                var t = this.ternary();
                return t instanceof l && this.peek("=") ? (this.consume(), new p(t.name, this.assignment())) : t
            }, r.prototype.ternary = function() {
                var t = this.logicalOR();
                if (this.peek("?")) {
                    this.consume();
                    var e = this.ternary();
                    this.expect(":");
                    var n = this.ternary();
                    return new f(t, e, n)
                }
                return t
            }, r.prototype.logicalOR = function() {
                var t = this.logicalXOR();
                if (this.peek("||")) {
                    var e = this.consume(),
                        n = this.logicalOR();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.logicalXOR = function() {
                var t = this.logicalAND();
                if ("xor" === this.current().value) {
                    var e = this.consume(),
                        n = this.logicalXOR();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.logicalAND = function() {
                var t = this.bitwiseOR();
                if (this.peek("&&")) {
                    var e = this.consume(),
                        n = this.logicalAND();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.bitwiseOR = function() {
                var t = this.bitwiseXOR();
                if (this.peek("|")) {
                    var e = this.consume(),
                        n = this.bitwiseOR();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.bitwiseXOR = function() {
                var t = this.bitwiseAND();
                if (this.peek("^|")) {
                    var e = this.consume(),
                        n = this.bitwiseXOR();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.bitwiseAND = function() {
                var t = this.relational();
                if (this.peek("&")) {
                    var e = this.consume(),
                        n = this.bitwiseAND();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.relational = function() {
                var t = this.shift();
                if (this.peek("==", "===", "!=", "!==", ">=", "<=", ">", "<")) {
                    var e = this.consume(),
                        n = this.shift();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.shift = function() {
                var t = this.additive();
                if (this.peek(">>", "<<", ">>>")) {
                    var e = this.consume(),
                        n = this.shift();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.additive = function() {
                for (var t = this.multiplicative(); this.peek("+", "-");) {
                    var e = this.consume();
                    t = new a(e.value, [t, this.multiplicative()])
                }
                return t
            }, r.prototype.multiplicative = function() {
                for (var t, e, n = this.unary(); this.peek("*", "/", "%");) t = this.consume(), n = new a(t.value, [n, this.unary()]);
                return this.current().type === i.SYMBOL || this.peek("(") || !(n.type instanceof s) && this.current().type === i.NUMBER ? (e = this.multiplicative(), new a("*", [n, e])) : n
            }, r.prototype.unary = function() {
                if (this.peek("-", "+", "~")) {
                    var t = this.consume(),
                        e = this.unary();
                    return new u(t.value, e)
                }
                return this.pow()
            }, r.prototype.pow = function() {
                var t = this.factorial();
                if (this.peek("^", "**")) {
                    var e = this.consume(),
                        n = this.unary();
                    return new a(e.value, [t, n])
                }
                return t
            }, r.prototype.factorial = function() {
                var t = this.symbol();
                if (this.peek("!")) {
                    var e = this.consume();
                    return new a(e.value, [t])
                }
                return t
            }, r.prototype.symbol = function() {
                var t = this.current();
                if (t.type === i.SYMBOL) {
                    var e = this.consume(),
                        n = this.functionCall(e);
                    return n
                }
                return this.string()
            }, r.prototype.functionCall = function(t) {
                var e = t.value;
                if (this.peek("(")) {
                    this.consume();
                    for (var n = []; !this.peek(")") && !this.isEOF();) n.push(this.assignment()), this.peek(",") && this.consume();
                    return this.expect(")"), new c(e, n)
                }
                return new l(e)
            }, r.prototype.string = function() {
                return this.current().type === i.STRING ? new s(this.consume().value, "string") : this.array()
            }, r.prototype.array = function() {
                if (this.peek("[")) {
                    this.consume();
                    for (var t = []; !this.peek("]") && !this.isEOF();) t.push(this.assignment()), this.peek(",") && this.consume();
                    return this.expect("]"), new h(t)
                }
                return this.number()
            }, r.prototype.number = function() {
                var t = this.current();
                return t.type === i.NUMBER ? new s(this.consume().value, "number") : this.parentheses()
            }, r.prototype.parentheses = function() {
                var t = this.current();
                if ("(" === t.value) {
                    this.consume();
                    var e = this.assignment();
                    return this.expect(")"), e
                }
                return this.end()
            }, r.prototype.end = function() {
                var t = this.current();
                if (t.type !== i.EOF) throw Error("unexpected end of expression")
            }, e.exports = r
        }, {
            "./Lexer": 45,
            "./node/ArrayNode": 47,
            "./node/AssignmentNode": 48,
            "./node/BlockNode": 49,
            "./node/ConditionalNode": 50,
            "./node/ConstantNode": 51,
            "./node/FunctionNode": 52,
            "./node/OperatorNode": 54,
            "./node/SymbolNode": 55,
            "./node/UnaryNode": 56,
            "./token-type": 58
        }],
        47: [function(t, e, n) {
            function r(t) {
                this.nodes = t
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "ArrayNode", e.exports = r
        }, {
            "./Node": 53
        }],
        48: [function(t, e, n) {
            function r(t, e) {
                this.name = t, this.expr = e
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "AssignmentNode", e.exports = r
        }, {
            "./Node": 53
        }],
        49: [function(t, e, n) {
            function r(t) {
                this.blocks = t
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "BlockNode", e.exports = r
        }, {
            "./Node": 53
        }],
        50: [function(t, e, n) {
            function r(t, e, n) {
                this.condition = t, this.trueExpr = e, this.falseExpr = n
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "ConditionalNode", e.exports = r
        }, {
            "./Node": 53
        }],
        51: [function(t, e, n) {
            function r(t, e) {
                if (!o[e]) throw Error("unsupported type '" + e + "'");
                this.value = t, this.valueType = e
            }
            var i = t("./Node"),
                o = {
                    number: !0,
                    string: !0,
                    boolean: !0,
                    undefined: !0,
                    null: !0
                };
            r.prototype = Object.create(i.prototype), r.prototype.type = "ConstantNode", e.exports = r
        }, {
            "./Node": 53
        }],
        52: [function(t, e, n) {
            function r(t, e) {
                this.name = t, this.args = e
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "FunctionNode", e.exports = r
        }, {
            "./Node": 53
        }],
        53: [function(t, e, n) {
            function r() {}
            r.prototype.type = "Node", e.exports = r
        }, {}],
        54: [function(t, e, n) {
            function r(t, e) {
                this.op = t, this.args = e || []
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "OperatorNode", e.exports = r
        }, {
            "./Node": 53
        }],
        55: [function(t, e, n) {
            function r(t) {
                this.name = t
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "SymbolNode", e.exports = r
        }, {
            "./Node": 53
        }],
        56: [function(t, e, n) {
            function r(t, e) {
                this.op = t, this.argument = e
            }
            var i = t("./Node");
            r.prototype = Object.create(i.prototype), r.prototype.type = "UnaryNode", e.exports = r
        }, {
            "./Node": 53
        }],
        57: [function(t, e, n) {
            e.exports = {
                ArrayNode: t("./ArrayNode"),
                AssignmentNode: t("./AssignmentNode"),
                BlockNode: t("./BlockNode"),
                ConditionalNode: t("./ConditionalNode"),
                ConstantNode: t("./ConstantNode"),
                FunctionNode: t("./FunctionNode"),
                Node: t("./Node"),
                OperatorNode: t("./OperatorNode"),
                SymbolNode: t("./SymbolNode"),
                UnaryNode: t("./UnaryNode")
            }
        }, {
            "./ArrayNode": 47,
            "./AssignmentNode": 48,
            "./BlockNode": 49,
            "./ConditionalNode": 50,
            "./ConstantNode": 51,
            "./FunctionNode": 52,
            "./Node": 53,
            "./OperatorNode": 54,
            "./SymbolNode": 55,
            "./UnaryNode": 56
        }],
        58: [function(t, e, n) {
            e.exports = {
                EOF: 0,
                DELIMITER: 1,
                NUMBER: 2,
                STRING: 3,
                SYMBOL: 4
            }
        }, {}],
        59: [function(t, e, n) {
            function r(t, e, n) {
                return e < n ? t < e ? e : t > n ? n : t : t < n ? n : t > e ? e : t
            }
            e.exports = r
        }, {}],
        60: [function(t, e, n) {
            "use strict";
            var r = Object.prototype.hasOwnProperty,
                i = Object.prototype.toString,
                o = function(t) {
                    return "function" == typeof Array.isArray ? Array.isArray(t) : "[object Array]" === i.call(t)
                },
                s = function(t) {
                    if (!t || "[object Object]" !== i.call(t)) return !1;
                    var e = r.call(t, "constructor"),
                        n = t.constructor && t.constructor.prototype && r.call(t.constructor.prototype, "isPrototypeOf");
                    if (t.constructor && !e && !n) return !1;
                    var o;
                    for (o in t);
                    return "undefined" == typeof o || r.call(t, o)
                };
            e.exports = function t() {
                var e, n, r, i, a, u, l = arguments[0],
                    c = 1,
                    h = arguments.length,
                    f = !1;
                for ("boolean" == typeof l ? (f = l, l = arguments[1] || {}, c = 2) : ("object" != typeof l && "function" != typeof l || null == l) && (l = {}); c < h; ++c)
                    if (e = arguments[c], null != e)
                        for (n in e) r = l[n], i = e[n], l !== i && (f && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, l[n] = t(f, u, i)) : "undefined" != typeof i && (l[n] = i));
                return l
            }
        }, {}],
        61: [function(t, e, n) {
            "use strict";

            function r(t, e, n, i, o, s, a, u, l, c, h) {
                if (h.nanEncountered) return NaN;
                var f, p, d, v, y, m, g, x, w, b;
                return f = n - e, p = t(e + .25 * f), d = t(n - .25 * f), isNaN(p) ? void(h.nanEncountered = !0) : isNaN(d) ? void(h.nanEncountered = !0) : (v = f * (i + 4 * p + o) / 12, y = f * (o + 4 * d + s) / 12, m = v + y, b = (m - a) / 15, c > l ? (h.maxDepthCount++, m + b) : Math.abs(b) < u ? m + b : (g = e + .5 * f, x = r(t, e, g, i, p, o, v, .5 * u, l, c + 1, h), isNaN(x) ? (h.nanEncountered = !0, NaN) : (w = r(t, g, n, o, d, s, y, .5 * u, l, c + 1, h), isNaN(w) ? (h.nanEncountered = !0, NaN) : x + w)))
            }

            function i(t, e, n, i, o) {
                var s = {
                    maxDepthCount: 0,
                    nanEncountered: !1
                };
                void 0 === i && (i = 1e-8), void 0 === o && (o = 20);
                var a = t(e),
                    u = t(.5 * (e + n)),
                    l = t(n),
                    c = (a + 4 * u + l) * (n - e) / 6,
                    h = r(t, e, n, a, u, l, c, i, o, 1, s);
                return s.maxDepthCount > 0 && console && console.warn && console.warn("integrate-adaptive-simpson: Warning: maximum recursion depth (" + o + ") reached " + s.maxDepthCount + " times"), s.nanEncountered && console && console.warn && console.warn("integrate-adaptive-simpson: Warning: NaN encountered. Halting early."), h
            }
            e.exports = i
        }, {}],
        62: [function(t, e, n) {
            "use strict";
            e.exports = t("./lib/eval")
        }, {
            "./lib/eval": 64
        }],
        63: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                t.mod = t.fmod, t.lessThan = t.lt, t.lessEqualThan = t.leq, t.greaterThan = t.gt, t.greaterEqualThan = t.geq, t.strictlyEqual = t.equal, t.strictlyNotEqual = t.notEqual, t.logicalAND = function(t, e) {
                    return t && e
                }, t.logicalXOR = function(t, e) {
                    return t ^ e
                }, t.logicalOR = function(t, e) {
                    return t || e
                }
            }
        }, {}],
        64: [function(t, e, n) {
            "use strict";

            function r(t) {
                Object.keys(t).forEach(function(e) {
                    var n = t[e];
                    "number" == typeof n || Array.isArray(n) ? t[e] = o.factory(n) : "object" == typeof n && "lo" in n && "hi" in n && (t[e] = o.factory(n.lo, n.hi))
                })
            }
            var i = t("math-codegen"),
                o = t("interval-arithmetic");
            t("./adapter")(o), e.exports = function(t) {
                return (new i).setDefs({
                    $$processScope: r
                }).parse(t).compile(o)
            }, e.exports.policies = t("./policies")(o), e.exports.Interval = o
        }, {
            "./adapter": 63,
            "./policies": 65,
            "interval-arithmetic": 66,
            "math-codegen": 83
        }],
        65: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                return {
                    disableRounding: function() {
                        t.rmath.disable()
                    },
                    enableRounding: function() {
                        t.rmath.enable()
                    }
                }
            }
        }, {}],
        66: [function(t, e, n) {
            "use strict";
            var r = t("xtend/mutable");
            t("./lib/polyfill"), e.exports = t("./lib/interval"), e.exports.rmath = t("./lib/round-math"), e.exports.round = t("./lib/round-math"), r(e.exports, t("./lib/constants"), t("./lib/operations/relational"), t("./lib/operations/arithmetic"), t("./lib/operations/algebra"), t("./lib/operations/trigonometric"), t("./lib/operations/misc"), t("./lib/operations/utils"))
        }, {
            "./lib/constants": 67,
            "./lib/interval": 68,
            "./lib/operations/algebra": 69,
            "./lib/operations/arithmetic": 70,
            "./lib/operations/misc": 72,
            "./lib/operations/relational": 73,
            "./lib/operations/trigonometric": 74,
            "./lib/operations/utils": 75,
            "./lib/polyfill": 76,
            "./lib/round-math": 77,
            "xtend/mutable": 82
        }],
        67: [function(t, e, n) {
            "use strict";

            function r(t, e) {
                Object.defineProperty(u, t, {
                    get: function() {
                        return e()
                    },
                    enumerable: !0
                })
            }
            var i = t("./interval"),
                o = t("xtend/mutable"),
                s = 3.141592653589793,
                a = 3.1415926535897936,
                u = {};
            o(u, {
                PI_LOW: s,
                PI_HIGH: a,
                PI_HALF_LOW: s / 2,
                PI_HALF_HIGH: a / 2,
                PI_TWICE_LOW: 2 * s,
                PI_TWICE_HIGH: 2 * a
            }), r("PI", function() {
                return i(s, a)
            }), r("PI_HALF", function() {
                return i(u.PI_HALF_LOW, u.PI_HALF_HIGH)
            }), r("PI_TWICE", function() {
                return i(u.PI_TWICE_LOW, u.PI_TWICE_HIGH)
            }), r("ZERO", function() {
                return i(0)
            }), r("ONE", function() {
                return i(1)
            }), r("WHOLE", function() {
                return i().setWhole()
            }), r("EMPTY", function() {
                return i().setEmpty()
            }), e.exports = u
        }, {
            "./interval": 68,
            "xtend/mutable": 82
        }],
        68: [function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (!(this instanceof r)) return new r(t, e);
                if ("undefined" != typeof t && "undefined" != typeof e) {
                    if (i.isInterval(t)) {
                        if (!i.isSingleton(t)) throw new TypeError("Interval: interval `lo` must be a singleton");
                        t = t.lo
                    }
                    if (i.isInterval(e)) {
                        if (!i.isSingleton(e)) throw TypeError("Interval: interval `hi` must be a singleton");
                        e = e.hi
                    }
                } else {
                    if ("undefined" != typeof t) return Array.isArray(t) ? r(t[0], t[1]) : r(t, t);
                    t = e = 0
                }
                this.lo = void 0, this.hi = void 0, this.assign(t, e)
            }
            var i = t("./operations/utils"),
                o = t("./round-math");
            e.exports = r, r.factory = r, r.prototype.singleton = function(t) {
                return this.set(t, t)
            }, r.prototype.bounded = function(t, e) {
                return this.set(o.prev(t), o.next(e))
            }, r.prototype.boundedSingleton = function(t) {
                return this.bounded(t, t)
            }, r.prototype.set = function(t, e) {
                return this.lo = t, this.hi = e, this
            }, r.prototype.assign = function(t, e) {
                if ("number" != typeof t || "number" != typeof e) throw TypeError("Interval#assign: arguments must be numbers");
                return isNaN(t) || isNaN(e) || t > e ? this.setEmpty() : this.set(t, e)
            }, r.prototype.setEmpty = function() {
                return this.set(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)
            }, r.prototype.setWhole = function() {
                return this.set(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
            }, r.prototype.open = function(t, e) {
                return this.assign(o.safeNext(t), o.safePrev(e))
            }, r.prototype.halfOpenLeft = function(t, e) {
                return this.assign(o.safeNext(t), e)
            }, r.prototype.halfOpenRight = function(t, e) {
                return this.assign(t, o.safePrev(e))
            }, r.prototype.toArray = function() {
                return [this.lo, this.hi]
            }, r.prototype.clone = function() {
                return r().set(this.lo, this.hi)
            }
        }, {
            "./operations/utils": 75,
            "./round-math": 77
        }],
        69: [function(t, e, n) {
            "use strict";
            var r = t("is-safe-integer"),
                i = t("../interval"),
                o = t("../round-math"),
                s = t("./utils"),
                a = t("./arithmetic"),
                u = t("../constants"),
                l = {};
            l.fmod = function(t, e) {
                if (s.isEmpty(t) || s.isEmpty(e)) return u.EMPTY;
                var n = t.lo < 0 ? e.lo : e.hi,
                    r = o.intLo(o.divLo(t.lo, n));
                return a.sub(t, a.mul(e, i(r)))
            }, l.multiplicativeInverse = function(t) {
                return s.isEmpty(t) ? u.EMPTY : s.zeroIn(t) ? 0 !== t.lo ? 0 !== t.hi ? u.WHOLE : i(Number.NEGATIVE_INFINITY, o.divHi(1, t.lo)) : 0 !== t.hi ? i(o.divLo(1, t.hi), Number.POSITIVE_INFINITY) : u.EMPTY : i(o.divLo(1, t.hi), o.divHi(1, t.lo))
            }, l.pow = function(t, e) {
                if (s.isEmpty(t)) return u.EMPTY;
                if ("object" == typeof e) {
                    if (!s.isSingleton(e)) return u.EMPTY;
                    e = e.lo
                }
                if (0 === e) return 0 === t.lo && 0 === t.hi ? u.EMPTY : u.ONE;
                if (e < 0) return l.multiplicativeInverse(l.pow(t, -e));
                if (r(e)) {
                    if (t.hi < 0) {
                        var n = o.powLo(-t.hi, e),
                            a = o.powHi(-t.lo, e);
                        return 1 & e ? i(-a, -n) : i(n, a)
                    }
                    return t.lo < 0 ? 1 & e ? i(-o.powLo(-t.lo, e), o.powHi(t.hi, e)) : i(0, o.powHi(Math.max(-t.lo, t.hi), e)) : i(o.powLo(t.lo, e), o.powHi(t.hi, e))
                }
                return console.warn("power is not an integer, you should use nth-root instead, returning an empty interval"), u.EMPTY
            }, l.sqrt = function(t) {
                return l.nthRoot(t, 2)
            }, l.nthRoot = function(t, e) {
                if (s.isEmpty(t) || e < 0) return u.EMPTY;
                if ("object" == typeof e) {
                    if (!s.isSingleton(e)) return u.EMPTY;
                    e = e.lo
                }
                var n = 1 / e;
                if (t.hi < 0) {
                    if (r(e) & (1 & e)) {
                        var a = o.powHi(-t.lo, n),
                            l = o.powLo(-t.hi, n);
                        return i(-a, -l)
                    }
                    return i.EMPTY
                }
                if (t.lo < 0) {
                    var c = o.powHi(t.hi, n);
                    if (r(e) & (1 & e)) {
                        var h = -o.powHi(-t.lo, n);
                        return i(h, c)
                    }
                    return i(0, c)
                }
                return i(o.powLo(t.lo, n), o.powHi(t.hi, n))
            }, e.exports = l
        }, {
            "../constants": 67,
            "../interval": 68,
            "../round-math": 77,
            "./arithmetic": 70,
            "./utils": 75,
            "is-safe-integer": 78
        }],
        70: [function(t, e, n) {
            "use strict";
            var r = t("../interval"),
                i = t("../round-math"),
                o = t("./utils"),
                s = t("../constants"),
                a = t("./division"),
                u = {};
            u.add = function(t, e) {
                return r(i.addLo(t.lo, e.lo), i.addHi(t.hi, e.hi))
            }, u.subtract = function(t, e) {
                return r(i.subLo(t.lo, e.hi), i.subHi(t.hi, e.lo))
            }, u.sub = u.subtract, u.multiply = function(t, e) {
                if (o.isEmpty(t) || o.isEmpty(e)) return s.EMPTY;
                var n = t.lo,
                    a = t.hi,
                    u = e.lo,
                    l = e.hi,
                    c = r();
                return n < 0 ? a > 0 ? u < 0 ? l > 0 ? (c.lo = Math.min(i.mulLo(n, l), i.mulLo(a, u)), c.hi = Math.max(i.mulHi(n, u), i.mulHi(a, l))) : (c.lo = i.mulLo(a, u), c.hi = i.mulHi(n, u)) : l > 0 ? (c.lo = i.mulLo(n, l), c.hi = i.mulHi(a, l)) : (c.lo = 0, c.hi = 0) : u < 0 ? l > 0 ? (c.lo = i.mulLo(n, l), c.hi = i.mulHi(n, u)) : (c.lo = i.mulLo(a, l), c.hi = i.mulHi(n, u)) : l > 0 ? (c.lo = i.mulLo(n, l), c.hi = i.mulHi(a, u)) : (c.lo = 0, c.hi = 0) : a > 0 ? u < 0 ? l > 0 ? (c.lo = i.mulLo(a, u), c.hi = i.mulHi(a, l)) : (c.lo = i.mulLo(a, u), c.hi = i.mulHi(n, l)) : l > 0 ? (c.lo = i.mulLo(n, u), c.hi = i.mulHi(a, l)) : (c.lo = 0, c.hi = 0) : (c.lo = 0, c.hi = 0), c
            }, u.mul = u.multiply, u.divide = function(t, e) {
                return o.isEmpty(t) || o.isEmpty(e) ? s.EMPTY : o.zeroIn(e) ? 0 !== e.lo ? 0 !== e.hi ? a.zero(t) : a.negative(t, e.lo) : 0 !== e.hi ? a.positive(t, e.hi) : s.EMPTY : a.nonZero(t, e)
            }, u.div = u.divide, u.positive = function(t) {
                return r(t.lo, t.hi)
            }, u.negative = function(t) {
                return r(-t.hi, -t.lo)
            }, e.exports = u
        }, {
            "../constants": 67,
            "../interval": 68,
            "../round-math": 77,
            "./division": 71,
            "./utils": 75
        }],
        71: [function(t, e, n) {
            "use strict";
            var r = t("../interval"),
                i = t("../round-math"),
                o = t("./utils"),
                s = t("../constants"),
                a = {
                    nonZero: function(t, e) {
                        var n = t.lo,
                            o = t.hi,
                            s = e.lo,
                            a = e.hi,
                            u = r();
                        return o < 0 ? a < 0 ? (u.lo = i.divLo(o, s), u.hi = i.divHi(n, a)) : (u.lo = i.divLo(n, s), u.hi = i.divHi(o, a)) : n < 0 ? a < 0 ? (u.lo = i.divLo(o, a), u.hi = i.divHi(n, a)) : (u.lo = i.divLo(n, s), u.hi = i.divHi(o, s)) : a < 0 ? (u.lo = i.divLo(o, a), u.hi = i.divHi(n, s)) : (u.lo = i.divLo(n, a), u.hi = i.divHi(o, s)), u
                    },
                    positive: function(t, e) {
                        return 0 === t.lo && 0 === t.hi ? t : o.zeroIn(t) ? s.WHOLE : t.hi < 0 ? r(Number.NEGATIVE_INFINITY, i.divHi(t.hi, e)) : r(i.divLo(t.lo, e), Number.POSITIVE_INFINITY)
                    },
                    negative: function(t, e) {
                        return 0 === t.lo && 0 === t.hi ? t : o.zeroIn(t) ? s.WHOLE : t.hi < 0 ? r(i.divLo(t.hi, e), Number.POSITIVE_INFINITY) : r(Number.NEGATIVE_INFINITY, i.divHi(t.lo, e))
                    },
                    zero: function(t) {
                        return 0 === t.lo && 0 === t.hi ? t : s.WHOLE
                    }
                };
            e.exports = a
        }, {
            "../constants": 67,
            "../interval": 68,
            "../round-math": 77,
            "./utils": 75
        }],
        72: [function(t, e, n) {
            "use strict";
            var r = t("../constants"),
                i = t("../interval"),
                o = t("../round-math"),
                s = t("./utils"),
                a = t("./arithmetic"),
                u = {};
            u.exp = function(t) {
                return s.isEmpty(t) ? r.EMPTY : i(o.expLo(t.lo), o.expHi(t.hi))
            }, u.log = function(t) {
                if (s.isEmpty(t)) return r.EMPTY;
                var e = t.lo <= 0 ? Number.NEGATIVE_INFINITY : o.logLo(t.lo);
                return i(e, o.logHi(t.hi))
            }, u.ln = u.log, u.LOG_EXP_10 = u.log(i(10, 10)), u.log10 = function(t) {
                return s.isEmpty(t) ? r.EMPTY : a.div(u.log(t), u.LOG_EXP_10)
            }, u.LOG_EXP_2 = u.log(i(2, 2)), u.log2 = function(t) {
                return s.isEmpty(t) ? r.EMPTY : a.div(u.log(t), u.LOG_EXP_2)
            }, u.hull = function(t, e) {
                var n = s.isEmpty(t),
                    o = s.isEmpty(e);
                return n && o ? r.EMPTY : n ? e.clone() : o ? t.clone() : i(Math.min(t.lo, e.lo), Math.max(t.hi, e.hi))
            }, u.intersection = function(t, e) {
                if (s.isEmpty(t) || s.isEmpty(e)) return r.EMPTY;
                var n = Math.max(t.lo, e.lo),
                    o = Math.min(t.hi, e.hi);
                return n <= o ? i(n, o) : r.EMPTY
            }, u.union = function(t, e) {
                if (!s.intervalsOverlap(t, e)) throw Error("Interval#union: intervals do not overlap");
                return i(Math.min(t.lo, e.lo), Math.max(t.hi, e.hi))
            }, u.difference = function(t, e) {
                if (s.isEmpty(t) || s.isWhole(e)) return r.EMPTY;
                if (s.intervalsOverlap(t, e)) {
                    if (t.lo < e.lo && e.hi < t.hi) throw Error("Interval.difference: difference creates multiple intervals");
                    return e.lo <= t.lo && e.hi === 1 / 0 || e.hi >= t.hi && e.lo === -(1 / 0) ? r.EMPTY : e.lo <= t.lo ? i().halfOpenLeft(e.hi, t.hi) : i().halfOpenRight(t.lo, e.lo)
                }
                return i.clone(t)
            }, u.width = function(t) {
                return s.isEmpty(t) ? 0 : o.subHi(t.hi, t.lo)
            }, u.wid = u.width, u.abs = function(t) {
                return s.isEmpty(t) ? r.EMPTY : t.lo >= 0 ? i.clone(t) : t.hi <= 0 ? a.negative(t) : i(0, Math.max(-t.lo, t.hi))
            }, u.max = function(t, e) {
                var n = s.isEmpty(t),
                    o = s.isEmpty(e);
                return n && o ? r.EMPTY : n ? e.clone() : o ? t.clone() : i(Math.max(t.lo, e.lo), Math.max(t.hi, e.hi))
            }, u.min = function(t, e) {
                var n = s.isEmpty(t),
                    o = s.isEmpty(e);
                return n && o ? r.EMPTY : n ? e.clone() : o ? t.clone() : i(Math.min(t.lo, e.lo), Math.min(t.hi, e.hi))
            }, u.clone = function(t) {
                return i().set(t.lo, t.hi)
            }, e.exports = u
        }, {
            "../constants": 67,
            "../interval": 68,
            "../round-math": 77,
            "./arithmetic": 70,
            "./utils": 75
        }],
        73: [function(t, e, n) {
            "use strict";
            var r = t("./utils"),
                i = {};
            i.equal = function(t, e) {
                return r.isEmpty(t) ? r.isEmpty(e) : !r.isEmpty(e) && t.lo === e.lo && t.hi === e.hi
            }, i.almostEqual = function(t, e) {
                function n(t, e) {
                    if (!t) throw new Error(e || "assertion failed")
                }

                function r(t, e) {
                    n(Math.abs(t - e) < i, "expected " + t + " to be close to " + e)
                }
                var i = 1e-7;
                t = Array.isArray(t) ? t : t.toArray(), e = Array.isArray(e) ? e : e.toArray(), r(t[0], e[0]), r(t[1], e[1]), n(t[0] <= t[1], "interval must not be empty")
            }, i.notEqual = function(t, e) {
                return r.isEmpty(t) ? !r.isEmpty(e) : r.isEmpty(e) || t.hi < e.lo || t.lo > e.hi
            }, i.lessThan = function(t, e) {
                return !r.isEmpty(t) && !r.isEmpty(e) && t.hi < e.lo
            }, i.lt = i.lessThan, i.greaterThan = function(t, e) {
                return !r.isEmpty(t) && !r.isEmpty(e) && t.lo > e.hi
            }, i.gt = i.greaterThan, i.lessEqualThan = function(t, e) {
                return !r.isEmpty(t) && !r.isEmpty(e) && t.hi <= e.lo
            }, i.leq = i.lessEqualThan, i.greaterEqualThan = function(t, e) {
                return !r.isEmpty(t) && !r.isEmpty(e) && t.lo >= e.hi
            }, i.geq = i.greaterEqualThan, e.exports = i
        }, {
            "./utils": 75
        }],
        74: [function(t, e, n) {
            "use strict";

            function r(t) {
                return !isFinite(t.lo) && t.lo === t.hi
            }

            function i(t) {
                if (t.lo < 0)
                    if (t.lo === -(1 / 0)) t.lo = 0, t.hi = 1 / 0;
                    else {
                        var e = Math.ceil(-t.lo / o.PI_TWICE_LOW);
                        t.lo += o.PI_TWICE_LOW * e, t.hi += o.PI_TWICE_LOW * e
                    }
                return t
            }
            var o = t("../constants"),
                s = t("../interval"),
                a = t("../round-math"),
                u = t("./utils"),
                l = t("./misc"),
                c = t("./algebra"),
                h = t("./arithmetic"),
                f = {};
            f.cos = function(t) {
                var e, n;
                if (u.isEmpty(t) || r(t)) return o.EMPTY;
                var p = s();
                p.set(t.lo, t.hi), i(p);
                var d = o.PI_TWICE,
                    v = c.fmod(p, d);
                if (l.width(v) >= d.lo) return s(-1, 1);
                if (v.lo >= o.PI_HIGH) {
                    var y = f.cos(h.sub(v, o.PI));
                    return h.negative(y)
                }
                var m = v.lo,
                    g = v.hi;
                return e = a.cosLo(g), n = a.cosHi(m), g <= o.PI_LOW ? s(e, n) : g <= d.lo ? s(-1, Math.max(e, n)) : s(-1, 1)
            }, f.sin = function(t) {
                return u.isEmpty(t) || r(t) ? o.EMPTY : f.cos(h.sub(t, o.PI_HALF))
            }, f.tan = function(t) {
                if (u.isEmpty(t) || r(t)) return o.EMPTY;
                var e = s();
                e.set(t.lo, t.hi), i(e);
                var n = o.PI,
                    l = c.fmod(e, n);
                return l.lo >= o.PI_HALF_LOW && (l = h.sub(l, n)), l.lo <= -o.PI_HALF_LOW || l.hi >= o.PI_HALF_LOW ? o.WHOLE : s(a.tanLo(l.lo), a.tanHi(l.hi))
            }, f.asin = function(t) {
                if (u.isEmpty(t) || t.hi < -1 || t.lo > 1) return o.EMPTY;
                var e = t.lo <= -1 ? -o.PI_HALF_HIGH : a.asinLo(t.lo),
                    n = t.hi >= 1 ? o.PI_HALF_HIGH : a.asinHi(t.hi);
                return s(e, n)
            }, f.acos = function(t) {
                if (u.isEmpty(t) || t.hi < -1 || t.lo > 1) return o.EMPTY;
                var e = t.hi >= 1 ? 0 : a.acosLo(t.hi),
                    n = t.lo <= -1 ? o.PI_HIGH : a.acosHi(t.lo);
                return s(e, n)
            }, f.atan = function(t) {
                return u.isEmpty(t) ? o.EMPTY : s(a.atanLo(t.lo), a.atanHi(t.hi))
            }, f.sinh = function(t) {
                return u.isEmpty(t) ? o.EMPTY : s(a.sinhLo(t.lo), a.sinhHi(t.hi))
            }, f.cosh = function(t) {
                return u.isEmpty(t) ? o.EMPTY : t.hi < 0 ? s(a.coshLo(t.hi), a.coshHi(t.lo)) : t.lo >= 0 ? s(a.coshLo(t.lo), a.coshHi(t.hi)) : s(1, a.coshHi(-t.lo > t.hi ? t.lo : t.hi))
            }, f.tanh = function(t) {
                return u.isEmpty(t) ? o.EMPTY : s(a.tanhLo(t.lo), a.tanhHi(t.hi))
            }, e.exports = f
        }, {
            "../constants": 67,
            "../interval": 68,
            "../round-math": 77,
            "./algebra": 69,
            "./arithmetic": 70,
            "./misc": 72,
            "./utils": 75
        }],
        75: [function(t, e, n) {
            "use strict";
            var r = {};
            r.isInterval = function(t) {
                return "object" == typeof t && "number" == typeof t.lo && "number" == typeof t.hi
            }, r.isEmpty = function(t) {
                return t.lo > t.hi
            }, r.isWhole = function(t) {
                return t.lo === -(1 / 0) && t.hi === 1 / 0
            }, r.isSingleton = function(t) {
                return t.lo === t.hi
            }, r.zeroIn = function(t) {
                return r.hasValue(t, 0)
            }, r.hasValue = function(t, e) {
                return !r.isEmpty(t) && (t.lo <= e && e <= t.hi)
            }, r.hasInterval = function(t, e) {
                return !!r.isEmpty(t) || !r.isEmpty(e) && e.lo <= t.lo && t.hi <= e.hi
            }, r.intervalsOverlap = function(t, e) {
                return !r.isEmpty(t) && !r.isEmpty(e) && (t.lo <= e.lo && e.lo <= t.hi || e.lo <= t.lo && t.lo <= e.hi)
            }, e.exports = r
        }, {}],
        76: [function(t, e, n) {
            "use strict";
            Math.sinh = Math.sinh || function(t) {
                var e = Math.exp(t);
                return (e - 1 / e) / 2
            }, Math.cosh = Math.cosh || function(t) {
                var e = Math.exp(t);
                return (e + 1 / e) / 2
            }, Math.tanh = Math.tanh || function(t) {
                if (t === Number.POSITIVE_INFINITY) return 1;
                if (t === Number.NEGATIVE_INFINITY) return -1;
                var e = Math.exp(2 * t);
                return (e - 1) / (e + 1)
            }
        }, {}],
        77: [function(t, e, n) {
            "use strict";

            function r(t) {
                return t
            }

            function i(t) {
                return t === 1 / 0 ? t : a(t, -(1 / 0))
            }

            function o(t) {
                return t === -(1 / 0) ? t : a(t, 1 / 0)
            }

            function s(t) {
                return t < 0 ? Math.ceil(t) : Math.floor(t)
            }
            var a = t("nextafter"),
                u = {
                    safePrev: i,
                    safeNext: o,
                    prev: i,
                    next: o
                };
            u.addLo = function(t, e) {
                return this.prev(t + e)
            }, u.addHi = function(t, e) {
                return this.next(t + e)
            }, u.subLo = function(t, e) {
                return this.prev(t - e)
            }, u.subHi = function(t, e) {
                return this.next(t - e)
            }, u.mulLo = function(t, e) {
                return this.prev(t * e)
            }, u.mulHi = function(t, e) {
                return this.next(t * e)
            }, u.divLo = function(t, e) {
                return this.prev(t / e)
            }, u.divHi = function(t, e) {
                return this.next(t / e)
            }, u.intLo = function(t) {
                return s(this.prev(t))
            }, u.intHi = function(t) {
                return s(this.next(t))
            }, u.logLo = function(t) {
                return this.prev(Math.log(t))
            }, u.logHi = function(t) {
                return this.next(Math.log(t))
            }, u.expLo = function(t) {
                return this.prev(Math.exp(t))
            }, u.expHi = function(t) {
                return this.next(Math.exp(t))
            }, u.sinLo = function(t) {
                return this.prev(Math.sin(t))
            }, u.sinHi = function(t) {
                return this.next(Math.sin(t))
            }, u.cosLo = function(t) {
                return this.prev(Math.cos(t))
            }, u.cosHi = function(t) {
                return this.next(Math.cos(t))
            }, u.tanLo = function(t) {
                return this.prev(Math.tan(t))
            }, u.tanHi = function(t) {
                return this.next(Math.tan(t))
            }, u.asinLo = function(t) {
                return this.prev(Math.asin(t))
            }, u.asinHi = function(t) {
                return this.next(Math.asin(t))
            }, u.acosLo = function(t) {
                return this.prev(Math.acos(t))
            }, u.acosHi = function(t) {
                return this.next(Math.acos(t))
            }, u.atanLo = function(t) {
                return this.prev(Math.atan(t))
            }, u.atanHi = function(t) {
                return this.next(Math.atan(t))
            }, u.sinhLo = function(t) {
                return this.prev(Math.sinh(t))
            }, u.sinhHi = function(t) {
                return this.next(Math.sinh(t))
            }, u.coshLo = function(t) {
                return this.prev(Math.cosh(t))
            }, u.coshHi = function(t) {
                return this.next(Math.cosh(t))
            }, u.tanhLo = function(t) {
                return this.prev(Math.tanh(t))
            }, u.tanhHi = function(t) {
                return this.next(Math.tanh(t))
            }, u.powLo = function(t, e) {
                if (e % 1 !== 0) return this.prev(Math.pow(t, e));
                var n = 1 & e ? t : 1;
                for (e >>= 1; e > 0;) t = u.mulLo(t, t), 1 & e && (n = u.mulLo(t, n)), e >>= 1;
                return n
            }, u.powHi = function(t, e) {
                if (e % 1 !== 0) return this.next(Math.pow(t, e));
                var n = 1 & e ? t : 1;
                for (e >>= 1; e > 0;) t = u.mulHi(t, t), 1 & e && (n = u.mulHi(t, n)), e >>= 1;
                return n
            }, u.sqrtLo = function(t) {
                return this.prev(Math.sqrt(t))
            }, u.sqrtHi = function(t) {
                return this.next(Math.sqrt(t))
            }, u.disable = function() {
                this.next = this.prev = r
            }, u.enable = function() {
                this.next = o, this.prev = i
            }, e.exports = u
        }, {
            nextafter: 80
        }],
        78: [function(t, e, n) {
            "use strict";
            var r = t("max-safe-integer");
            e.exports = Number.isSafeInteger || function(t) {
                return "number" == typeof t && t === t && t !== 1 / 0 && t !== -(1 / 0) && parseInt(t, 10) === t && Math.abs(t) <= r
            }
        }, {
            "max-safe-integer": 79
        }],
        79: [function(t, e, n) {
            "use strict";
            e.exports = 9007199254740991
        }, {}],
        80: [function(t, e, n) {
            "use strict";

            function r(t, e) {
                if (isNaN(t) || isNaN(e)) return NaN;
                if (t === e) return t;
                if (0 === t) return e < 0 ? -o : o;
                var n = i.hi(t),
                    r = i.lo(t);
                return e > t == t > 0 ? r === s ? (n += 1, r = 0) : r += 1 : 0 === r ? (r = s, n -= 1) : r -= 1, i.pack(r, n)
            }
            var i = t("double-bits"),
                o = Math.pow(2, -1074),
                s = -1 >>> 0;
            e.exports = r
        }, {
            "double-bits": 81
        }],
        81: [function(t, e, n) {
            (function(t) {
                function n(t, e) {
                    return p[0] = t, p[1] = e, f[0]
                }

                function r(t) {
                    return f[0] = t, p[0]
                }

                function i(t) {
                    return f[0] = t, p[1]
                }

                function o(t, e) {
                    return p[1] = t, p[0] = e, f[0]
                }

                function s(t) {
                    return f[0] = t, p[1]
                }

                function a(t) {
                    return f[0] = t, p[0]
                }

                function u(t, e) {
                    return d.writeUInt32LE(t, 0, !0), d.writeUInt32LE(e, 4, !0), d.readDoubleLE(0, !0)
                }

                function l(t) {
                    return d.writeDoubleLE(t, 0, !0), d.readUInt32LE(0, !0)
                }

                function c(t) {
                    return d.writeDoubleLE(t, 0, !0), d.readUInt32LE(4, !0)
                }
                var h = !1;
                if ("undefined" != typeof Float64Array) {
                    var f = new Float64Array(1),
                        p = new Uint32Array(f.buffer);
                    f[0] = 1, h = !0, 1072693248 === p[1] ? (e.exports = function(t) {
                        return f[0] = t, [p[0], p[1]]
                    }, e.exports.pack = n, e.exports.lo = r, e.exports.hi = i) : 1072693248 === p[0] ? (e.exports = function(t) {
                        return f[0] = t, [p[1], p[0]]
                    }, e.exports.pack = o, e.exports.lo = s, e.exports.hi = a) : h = !1
                }
                if (!h) {
                    var d = new t(8);
                    e.exports = function(t) {
                        return d.writeDoubleLE(t, 0, !0), [d.readUInt32LE(0, !0), d.readUInt32LE(4, !0)]
                    }, e.exports.pack = u, e.exports.lo = l, e.exports.hi = c
                }
                e.exports.sign = function(t) {
                    return e.exports.hi(t) >>> 31
                }, e.exports.exponent = function(t) {
                    var n = e.exports.hi(t);
                    return (n << 1 >>> 21) - 1023
                }, e.exports.fraction = function(t) {
                    var n = e.exports.lo(t),
                        r = e.exports.hi(t),
                        i = 1048575 & r;
                    return 2146435072 & r && (i += 1 << 20), [n, i]
                }, e.exports.denormalized = function(t) {
                    var n = e.exports.hi(t);
                    return !(2146435072 & n)
                }
            }).call(this, t("buffer").Buffer)
        }, {
            buffer: 1
        }],
        82: [function(t, e, n) {
            function r(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) i.call(n, r) && (t[r] = n[r])
                }
                return t
            }
            e.exports = r;
            var i = Object.prototype.hasOwnProperty
        }, {}],
        83: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            "./lib/CodeGenerator": 84,
            dup: 31
        }],
        84: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./Interpreter": 85,
            dup: 32,
            extend: 60,
            "mr-parser": 96
        }],
        85: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./node/ArrayNode": 88,
            "./node/AssignmentNode": 89,
            "./node/ConditionalNode": 90,
            "./node/ConstantNode": 91,
            "./node/FunctionNode": 92,
            "./node/OperatorNode": 93,
            "./node/SymbolNode": 94,
            "./node/UnaryNode": 95,
            dup: 33,
            extend: 60
        }],
        86: [function(t, e, n) {
            arguments[4][34][0].apply(n, arguments)
        }, {
            dup: 34
        }],
        87: [function(t, e, n) {
            arguments[4][35][0].apply(n, arguments)
        }, {
            dup: 35
        }],
        88: [function(t, e, n) {
            arguments[4][36][0].apply(n, arguments)
        }, {
            dup: 36
        }],
        89: [function(t, e, n) {
            arguments[4][37][0].apply(n, arguments)
        }, {
            dup: 37
        }],
        90: [function(t, e, n) {
            arguments[4][38][0].apply(n, arguments)
        }, {
            dup: 38
        }],
        91: [function(t, e, n) {
            arguments[4][39][0].apply(n, arguments)
        }, {
            dup: 39
        }],
        92: [function(t, e, n) {
            arguments[4][40][0].apply(n, arguments)
        }, {
            dup: 40,
            "mr-parser": 96
        }],
        93: [function(t, e, n) {
            arguments[4][41][0].apply(n, arguments)
        }, {
            "../misc/Operators": 86,
            dup: 41
        }],
        94: [function(t, e, n) {
            arguments[4][42][0].apply(n, arguments)
        }, {
            dup: 42
        }],
        95: [function(t, e, n) {
            arguments[4][43][0].apply(n, arguments)
        }, {
            "../misc/UnaryOperators": 87,
            dup: 43
        }],
        96: [function(t, e, n) {
            arguments[4][44][0].apply(n, arguments)
        }, {
            "./lib/Lexer": 97,
            "./lib/Parser": 98,
            "./lib/node/": 109,
            dup: 44
        }],
        97: [function(t, e, n) {
            arguments[4][45][0].apply(n, arguments)
        }, {
            "./token-type": 110,
            dup: 45
        }],
        98: [function(t, e, n) {
            arguments[4][46][0].apply(n, arguments)
        }, {
            "./Lexer": 97,
            "./node/ArrayNode": 99,
            "./node/AssignmentNode": 100,
            "./node/BlockNode": 101,
            "./node/ConditionalNode": 102,
            "./node/ConstantNode": 103,
            "./node/FunctionNode": 104,
            "./node/OperatorNode": 106,
            "./node/SymbolNode": 107,
            "./node/UnaryNode": 108,
            "./token-type": 110,
            dup: 46
        }],
        99: [function(t, e, n) {
            arguments[4][47][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 47
        }],
        100: [function(t, e, n) {
            arguments[4][48][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 48
        }],
        101: [function(t, e, n) {
            arguments[4][49][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 49
        }],
        102: [function(t, e, n) {
            arguments[4][50][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 50
        }],
        103: [function(t, e, n) {
            arguments[4][51][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 51
        }],
        104: [function(t, e, n) {
            arguments[4][52][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 52
        }],
        105: [function(t, e, n) {
            arguments[4][53][0].apply(n, arguments)
        }, {
            dup: 53
        }],
        106: [function(t, e, n) {
            arguments[4][54][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 54
        }],
        107: [function(t, e, n) {
            arguments[4][55][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 55
        }],
        108: [function(t, e, n) {
            arguments[4][56][0].apply(n, arguments)
        }, {
            "./Node": 105,
            dup: 56
        }],
        109: [function(t, e, n) {
            arguments[4][57][0].apply(n, arguments)
        }, {
            "./ArrayNode": 99,
            "./AssignmentNode": 100,
            "./BlockNode": 101,
            "./ConditionalNode": 102,
            "./ConstantNode": 103,
            "./FunctionNode": 104,
            "./Node": 105,
            "./OperatorNode": 106,
            "./SymbolNode": 107,
            "./UnaryNode": 108,
            dup: 57
        }],
        110: [function(t, e, n) {
            arguments[4][58][0].apply(n, arguments)
        }, {
            dup: 58
        }],
        111: [function(t, e, n) {
            "use strict";
            e.exports = function(t) {
                return "object" == typeof t && null !== t
            }
        }, {}],
        112: [function(t, e, n) {
            (function(n) {
                function r(t) {
                    return t ? l[t] : l
                }

                function i() {
                    u.forEach(function(t) {
                        l[a[t]] = !1
                    })
                }

                function o(t) {
                    l[a[t.keyCode]] = !1
                }

                function s(t) {
                    l[a[t.keyCode]] = !0
                }
                var a = t("vkey"),
                    u = Object.keys(a),
                    l = {};
                i(), e.exports = r, n.browser && (window.addEventListener("keydown", s, !1), window.addEventListener("keyup", o, !1), window.addEventListener("blur", i, !1))
            }).call(this, t("_process"))
        }, {
            _process: 6,
            vkey: 113
        }],
        113: [function(t, e, n) {
            var r, i = "undefined" != typeof window ? window.navigator.userAgent : "",
                o = /OS X/.test(i),
                s = /Opera/.test(i),
                a = !/like Gecko/.test(i) && !s,
                u = e.exports = {
                    0: o ? "<menu>" : "<UNK>",
                    1: "<mouse 1>",
                    2: "<mouse 2>",
                    3: "<break>",
                    4: "<mouse 3>",
                    5: "<mouse 4>",
                    6: "<mouse 5>",
                    8: "<backspace>",
                    9: "<tab>",
                    12: "<clear>",
                    13: "<enter>",
                    16: "<shift>",
                    17: "<control>",
                    18: "<alt>",
                    19: "<pause>",
                    20: "<caps-lock>",
                    21: "<ime-hangul>",
                    23: "<ime-junja>",
                    24: "<ime-final>",
                    25: "<ime-kanji>",
                    27: "<escape>",
                    28: "<ime-convert>",
                    29: "<ime-nonconvert>",
                    30: "<ime-accept>",
                    31: "<ime-mode-change>",
                    27: "<escape>",
                    32: "<space>",
                    33: "<page-up>",
                    34: "<page-down>",
                    35: "<end>",
                    36: "<home>",
                    37: "<left>",
                    38: "<up>",
                    39: "<right>",
                    40: "<down>",
                    41: "<select>",
                    42: "<print>",
                    43: "<execute>",
                    44: "<snapshot>",
                    45: "<insert>",
                    46: "<delete>",
                    47: "<help>",
                    91: "<meta>",
                    92: "<meta>",
                    93: o ? "<meta>" : "<menu>",
                    95: "<sleep>",
                    106: "<num-*>",
                    107: "<num-+>",
                    108: "<num-enter>",
                    109: "<num-->",
                    110: "<num-.>",
                    111: "<num-/>",
                    144: "<num-lock>",
                    145: "<scroll-lock>",
                    160: "<shift-left>",
                    161: "<shift-right>",
                    162: "<control-left>",
                    163: "<control-right>",
                    164: "<alt-left>",
                    165: "<alt-right>",
                    166: "<browser-back>",
                    167: "<browser-forward>",
                    168: "<browser-refresh>",
                    169: "<browser-stop>",
                    170: "<browser-search>",
                    171: "<browser-favorites>",
                    172: "<browser-home>",
                    173: o && a ? "-" : "<volume-mute>",
                    174: "<volume-down>",
                    175: "<volume-up>",
                    176: "<next-track>",
                    177: "<prev-track>",
                    178: "<stop>",
                    179: "<play-pause>",
                    180: "<launch-mail>",
                    181: "<launch-media-select>",
                    182: "<launch-app 1>",
                    183: "<launch-app 2>",
                    186: ";",
                    187: "=",
                    188: ",",
                    189: "-",
                    190: ".",
                    191: "/",
                    192: "`",
                    219: "[",
                    220: "\\",
                    221: "]",
                    222: "'",
                    223: "<meta>",
                    224: "<meta>",
                    226: "<alt-gr>",
                    229: "<ime-process>",
                    231: s ? "`" : "<unicode>",
                    246: "<attention>",
                    247: "<crsel>",
                    248: "<exsel>",
                    249: "<erase-eof>",
                    250: "<play>",
                    251: "<zoom>",
                    252: "<no-name>",
                    253: "<pa-1>",
                    254: "<clear>"
                };
            for (r = 58; r < 65; ++r) u[r] = String.fromCharCode(r);
            for (r = 48; r < 58; ++r) u[r] = r - 48 + "";
            for (r = 65; r < 91; ++r) u[r] = String.fromCharCode(r);
            for (r = 96; r < 106; ++r) u[r] = "<num-" + (r - 96) + ">";
            for (r = 112; r < 136; ++r) u[r] = "F" + (r - 111)
        }, {}],
        114: [function(t, e, n) {
            var r = t("events").EventEmitter,
                i = t("vkey");
            e.exports = function(t, e) {
                function n() {
                    o.pressed = {}
                }
                "string" == typeof t && (t = [t]), e || (e = window);
                var o = new r;
                return o.pressed = {}, e.addEventListener("blur", n), e.addEventListener("focus", n), e.addEventListener("keydown", function(e) {
                    var r = i[e.keyCode];
                    o.pressed[r] = !0;
                    var s = !0;
                    t.forEach(function(t) {
                        o.pressed[t] || (s = !1)
                    }), s && (o.emit("pressed", o.pressed), n())
                }), e.addEventListener("keyup", function(t) {
                    delete o.pressed[i[t.keyCode]]
                }), o
            }
        }, {
            events: 5,
            vkey: 115
        }],
        115: [function(t, e, n) {
            arguments[4][113][0].apply(n, arguments)
        }, {
            dup: 113
        }],
        116: [function(t, e, n) {
            var r = t("integers");
            e.exports = function(t, e, n) {
                var i = (e - t) / (n - 1),
                    o = r(t, e, i);
                return o.length == n ? o : o.concat(e)
            }
        }, {
            integers: 117
        }],
        117: [function(t, e, n) {
            e.exports = function() {
                var t = 0,
                    e = 0,
                    n = 1,
                    r = [];
                switch (arguments.length) {
                    case 1:
                        e = arguments[0];
                        break;
                    case 3:
                        n = arguments[2];
                    case 2:
                        t = arguments[0], e = arguments[1]
                }
                for (i = t; i < e; i += n) r.push(i);
                return r
            }
        }, {}],
        118: [function(t, e, n) {
            "use strict";
            e.exports = Math.log10 || function(t) {
                return Math.log(t) * Math.LOG10E
            }
        }, {}],
        119: [function(t, e, n) {
            var r = t("linspace");
            e.exports = function(t, e, n) {
                return r(t, e, n).map(function(t) {
                    return Math.pow(10, t)
                })
            }
        }, {
            linspace: 116
        }]
    }, {}, [19])(19)
});