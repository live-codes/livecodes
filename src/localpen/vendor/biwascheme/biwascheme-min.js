/*
 * BiwaScheme 0.7.2 - R6RS/R7RS Scheme in JavaScript
 *
 * Copyright (c) 2007-2021 Yutaka HARA (http://www.biwascheme.org/)
 * Licensed under the MIT license.
 */
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";
  var n = [],
    r = Object.getPrototypeOf,
    i = n.slice,
    o = n.flat
      ? function (e) {
          return n.flat.call(e);
        }
      : function (e) {
          return n.concat.apply([], e);
        },
    u = n.push,
    a = n.indexOf,
    c = {},
    s = c.toString,
    f = c.hasOwnProperty,
    l = f.toString,
    d = l.call(Object),
    h = {},
    p = function (e) {
      return (
        "function" == typeof e &&
        "number" != typeof e.nodeType &&
        "function" != typeof e.item
      );
    },
    m = function (e) {
      return null != e && e === e.window;
    },
    v = e.document,
    g = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function y(e, t, n) {
    var r,
      i,
      o = (n = n || v).createElement("script");
    if (((o.text = e), t))
      for (r in g)
        (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
          o.setAttribute(r, i);
    n.head.appendChild(o).parentNode.removeChild(o);
  }
  function w(e) {
    return null == e
      ? e + ""
      : "object" == typeof e || "function" == typeof e
      ? c[s.call(e)] || "object"
      : typeof e;
  }
  var b = function (e, t) {
    return new b.fn.init(e, t);
  };
  function _(e) {
    var t = !!e && "length" in e && e.length,
      n = w(e);
    return (
      !p(e) &&
      !m(e) &&
      ("array" === n ||
        0 === t ||
        ("number" == typeof t && t > 0 && t - 1 in e))
    );
  }
  (b.fn = b.prototype = {
    jquery: "3.6.0",
    constructor: b,
    length: 0,
    toArray: function () {
      return i.call(this);
    },
    get: function (e) {
      return null == e ? i.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function (e) {
      var t = b.merge(this.constructor(), e);
      return (t.prevObject = this), t;
    },
    each: function (e) {
      return b.each(this, e);
    },
    map: function (e) {
      return this.pushStack(
        b.map(this, function (t, n) {
          return e.call(t, n, t);
        })
      );
    },
    slice: function () {
      return this.pushStack(i.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    even: function () {
      return this.pushStack(
        b.grep(this, function (e, t) {
          return (t + 1) % 2;
        })
      );
    },
    odd: function () {
      return this.pushStack(
        b.grep(this, function (e, t) {
          return t % 2;
        })
      );
    },
    eq: function (e) {
      var t = this.length,
        n = +e + (e < 0 ? t : 0);
      return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: u,
    sort: n.sort,
    splice: n.splice,
  }),
    (b.extend = b.fn.extend = function () {
      var e,
        t,
        n,
        r,
        i,
        o,
        u = arguments[0] || {},
        a = 1,
        c = arguments.length,
        s = !1;
      for (
        "boolean" == typeof u && ((s = u), (u = arguments[a] || {}), a++),
          "object" == typeof u || p(u) || (u = {}),
          a === c && ((u = this), a--);
        a < c;
        a++
      )
        if (null != (e = arguments[a]))
          for (t in e)
            (r = e[t]),
              "__proto__" !== t &&
                u !== r &&
                (s && r && (b.isPlainObject(r) || (i = Array.isArray(r)))
                  ? ((n = u[t]),
                    (o =
                      i && !Array.isArray(n)
                        ? []
                        : i || b.isPlainObject(n)
                        ? n
                        : {}),
                    (i = !1),
                    (u[t] = b.extend(s, o, r)))
                  : void 0 !== r && (u[t] = r));
      return u;
    }),
    b.extend({
      expando: "jQuery" + ("3.6.0" + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isPlainObject: function (e) {
        var t, n;
        return (
          !(!e || "[object Object]" !== s.call(e)) &&
          (!(t = r(e)) ||
            ("function" ==
              typeof (n = f.call(t, "constructor") && t.constructor) &&
              l.call(n) === d))
        );
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function (e, t, n) {
        y(e, { nonce: t && t.nonce }, n);
      },
      each: function (e, t) {
        var n,
          r = 0;
        if (_(e))
          for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
        else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        return e;
      },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (_(Object(e))
              ? b.merge(n, "string" == typeof e ? [e] : e)
              : u.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        return null == t ? -1 : a.call(t, e, n);
      },
      merge: function (e, t) {
        for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
        return (e.length = i), e;
      },
      grep: function (e, t, n) {
        for (var r = [], i = 0, o = e.length, u = !n; i < o; i++)
          !t(e[i], i) !== u && r.push(e[i]);
        return r;
      },
      map: function (e, t, n) {
        var r,
          i,
          u = 0,
          a = [];
        if (_(e))
          for (r = e.length; u < r; u++)
            null != (i = t(e[u], u, n)) && a.push(i);
        else for (u in e) null != (i = t(e[u], u, n)) && a.push(i);
        return o(a);
      },
      guid: 1,
      support: h,
    }),
    "function" == typeof Symbol && (b.fn[Symbol.iterator] = n[Symbol.iterator]),
    b.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (e, t) {
        c["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var x =
    /*!
     * Sizzle CSS Selector Engine v2.3.6
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://js.foundation/
     *
     * Date: 2021-02-16
     */
    (function (e) {
      var t,
        n,
        r,
        i,
        o,
        u,
        a,
        c,
        s,
        f,
        l,
        d,
        h,
        p,
        m,
        v,
        g,
        y,
        w,
        b = "sizzle" + 1 * new Date(),
        _ = e.document,
        x = 0,
        k = 0,
        j = ce(),
        T = ce(),
        S = ce(),
        C = ce(),
        E = function (e, t) {
          return e === t && (l = !0), 0;
        },
        q = {}.hasOwnProperty,
        A = [],
        D = A.pop,
        N = A.push,
        O = A.push,
        M = A.slice,
        L = function (e, t) {
          for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
          return -1;
        },
        R =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        B = "[\\x20\\t\\r\\n\\f]",
        H =
          "(?:\\\\[\\da-fA-F]{1,6}" +
          B +
          "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        I =
          "\\[" +
          B +
          "*(" +
          H +
          ")(?:" +
          B +
          "*([*^$|!~]?=)" +
          B +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          H +
          "))|)" +
          B +
          "*\\]",
        P =
          ":(" +
          H +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          I +
          ")*)|.*)\\)|)",
        z = new RegExp(B + "+", "g"),
        F = new RegExp("^" + B + "+|((?:^|[^\\\\])(?:\\\\.)*)" + B + "+$", "g"),
        $ = new RegExp("^" + B + "*," + B + "*"),
        W = new RegExp("^" + B + "*([>+~]|" + B + ")" + B + "*"),
        U = new RegExp(B + "|>"),
        V = new RegExp(P),
        X = new RegExp("^" + H + "$"),
        Y = {
          ID: new RegExp("^#(" + H + ")"),
          CLASS: new RegExp("^\\.(" + H + ")"),
          TAG: new RegExp("^(" + H + "|[*])"),
          ATTR: new RegExp("^" + I),
          PSEUDO: new RegExp("^" + P),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              B +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              B +
              "*(?:([+-]|)" +
              B +
              "*(\\d+)|))" +
              B +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + R + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              B +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              B +
              "*((?:-\\d)?\\d*)" +
              B +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        G = /HTML$/i,
        J = /^(?:input|select|textarea|button)$/i,
        Q = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ee = /[+~]/,
        te = new RegExp(
          "\\\\[\\da-fA-F]{1,6}" + B + "?|\\\\([^\\r\\n\\f])",
          "g"
        ),
        ne = function (e, t) {
          var n = "0x" + e.slice(1) - 65536;
          return (
            t ||
            (n < 0
              ? String.fromCharCode(n + 65536)
              : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
          );
        },
        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ie = function (e, t) {
          return t
            ? "\0" === e
              ? "�"
              : e.slice(0, -1) +
                "\\" +
                e.charCodeAt(e.length - 1).toString(16) +
                " "
            : "\\" + e;
        },
        oe = function () {
          d();
        },
        ue = be(
          function (e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
          },
          { dir: "parentNode", next: "legend" }
        );
      try {
        O.apply((A = M.call(_.childNodes)), _.childNodes),
          A[_.childNodes.length].nodeType;
      } catch (e) {
        O = {
          apply: A.length
            ? function (e, t) {
                N.apply(e, M.call(t));
              }
            : function (e, t) {
                for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                e.length = n - 1;
              },
        };
      }
      function ae(e, t, r, i) {
        var o,
          a,
          s,
          f,
          l,
          p,
          g,
          y = t && t.ownerDocument,
          _ = t ? t.nodeType : 9;
        if (
          ((r = r || []),
          "string" != typeof e || !e || (1 !== _ && 9 !== _ && 11 !== _))
        )
          return r;
        if (!i && (d(t), (t = t || h), m)) {
          if (11 !== _ && (l = Z.exec(e)))
            if ((o = l[1])) {
              if (9 === _) {
                if (!(s = t.getElementById(o))) return r;
                if (s.id === o) return r.push(s), r;
              } else if (
                y &&
                (s = y.getElementById(o)) &&
                w(t, s) &&
                s.id === o
              )
                return r.push(s), r;
            } else {
              if (l[2]) return O.apply(r, t.getElementsByTagName(e)), r;
              if (
                (o = l[3]) &&
                n.getElementsByClassName &&
                t.getElementsByClassName
              )
                return O.apply(r, t.getElementsByClassName(o)), r;
            }
          if (
            n.qsa &&
            !C[e + " "] &&
            (!v || !v.test(e)) &&
            (1 !== _ || "object" !== t.nodeName.toLowerCase())
          ) {
            if (((g = e), (y = t), 1 === _ && (U.test(e) || W.test(e)))) {
              for (
                ((y = (ee.test(e) && ge(t.parentNode)) || t) === t &&
                  n.scope) ||
                  ((f = t.getAttribute("id"))
                    ? (f = f.replace(re, ie))
                    : t.setAttribute("id", (f = b))),
                  a = (p = u(e)).length;
                a--;

              )
                p[a] = (f ? "#" + f : ":scope") + " " + we(p[a]);
              g = p.join(",");
            }
            try {
              return O.apply(r, y.querySelectorAll(g)), r;
            } catch (t) {
              C(e, !0);
            } finally {
              f === b && t.removeAttribute("id");
            }
          }
        }
        return c(e.replace(F, "$1"), t, r, i);
      }
      function ce() {
        var e = [];
        return function t(n, i) {
          return (
            e.push(n + " ") > r.cacheLength && delete t[e.shift()],
            (t[n + " "] = i)
          );
        };
      }
      function se(e) {
        return (e[b] = !0), e;
      }
      function fe(e) {
        var t = h.createElement("fieldset");
        try {
          return !!e(t);
        } catch (e) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null);
        }
      }
      function le(e, t) {
        for (var n = e.split("|"), i = n.length; i--; ) r.attrHandle[n[i]] = t;
      }
      function de(e, t) {
        var n = t && e,
          r =
            n &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            e.sourceIndex - t.sourceIndex;
        if (r) return r;
        if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
        return e ? 1 : -1;
      }
      function he(e) {
        return function (t) {
          return "input" === t.nodeName.toLowerCase() && t.type === e;
        };
      }
      function pe(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e;
        };
      }
      function me(e) {
        return function (t) {
          return "form" in t
            ? t.parentNode && !1 === t.disabled
              ? "label" in t
                ? "label" in t.parentNode
                  ? t.parentNode.disabled === e
                  : t.disabled === e
                : t.isDisabled === e || (t.isDisabled !== !e && ue(t) === e)
              : t.disabled === e
            : "label" in t && t.disabled === e;
        };
      }
      function ve(e) {
        return se(function (t) {
          return (
            (t = +t),
            se(function (n, r) {
              for (var i, o = e([], n.length, t), u = o.length; u--; )
                n[(i = o[u])] && (n[i] = !(r[i] = n[i]));
            })
          );
        });
      }
      function ge(e) {
        return e && void 0 !== e.getElementsByTagName && e;
      }
      for (t in ((n = ae.support = {}),
      (o = ae.isXML = function (e) {
        var t = e && e.namespaceURI,
          n = e && (e.ownerDocument || e).documentElement;
        return !G.test(t || (n && n.nodeName) || "HTML");
      }),
      (d = ae.setDocument = function (e) {
        var t,
          i,
          u = e ? e.ownerDocument || e : _;
        return u != h && 9 === u.nodeType && u.documentElement
          ? ((p = (h = u).documentElement),
            (m = !o(h)),
            _ != h &&
              (i = h.defaultView) &&
              i.top !== i &&
              (i.addEventListener
                ? i.addEventListener("unload", oe, !1)
                : i.attachEvent && i.attachEvent("onunload", oe)),
            (n.scope = fe(function (e) {
              return (
                p.appendChild(e).appendChild(h.createElement("div")),
                void 0 !== e.querySelectorAll &&
                  !e.querySelectorAll(":scope fieldset div").length
              );
            })),
            (n.attributes = fe(function (e) {
              return (e.className = "i"), !e.getAttribute("className");
            })),
            (n.getElementsByTagName = fe(function (e) {
              return (
                e.appendChild(h.createComment("")),
                !e.getElementsByTagName("*").length
              );
            })),
            (n.getElementsByClassName = K.test(h.getElementsByClassName)),
            (n.getById = fe(function (e) {
              return (
                (p.appendChild(e).id = b),
                !h.getElementsByName || !h.getElementsByName(b).length
              );
            })),
            n.getById
              ? ((r.filter.ID = function (e) {
                  var t = e.replace(te, ne);
                  return function (e) {
                    return e.getAttribute("id") === t;
                  };
                }),
                (r.find.ID = function (e, t) {
                  if (void 0 !== t.getElementById && m) {
                    var n = t.getElementById(e);
                    return n ? [n] : [];
                  }
                }))
              : ((r.filter.ID = function (e) {
                  var t = e.replace(te, ne);
                  return function (e) {
                    var n =
                      void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t;
                  };
                }),
                (r.find.ID = function (e, t) {
                  if (void 0 !== t.getElementById && m) {
                    var n,
                      r,
                      i,
                      o = t.getElementById(e);
                    if (o) {
                      if ((n = o.getAttributeNode("id")) && n.value === e)
                        return [o];
                      for (i = t.getElementsByName(e), r = 0; (o = i[r++]); )
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                          return [o];
                    }
                    return [];
                  }
                })),
            (r.find.TAG = n.getElementsByTagName
              ? function (e, t) {
                  return void 0 !== t.getElementsByTagName
                    ? t.getElementsByTagName(e)
                    : n.qsa
                    ? t.querySelectorAll(e)
                    : void 0;
                }
              : function (e, t) {
                  var n,
                    r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                  if ("*" === e) {
                    for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
                    return r;
                  }
                  return o;
                }),
            (r.find.CLASS =
              n.getElementsByClassName &&
              function (e, t) {
                if (void 0 !== t.getElementsByClassName && m)
                  return t.getElementsByClassName(e);
              }),
            (g = []),
            (v = []),
            (n.qsa = K.test(h.querySelectorAll)) &&
              (fe(function (e) {
                var t;
                (p.appendChild(e).innerHTML =
                  "<a id='" +
                  b +
                  "'></a><select id='" +
                  b +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                  e.querySelectorAll("[msallowcapture^='']").length &&
                    v.push("[*^$]=" + B + "*(?:''|\"\")"),
                  e.querySelectorAll("[selected]").length ||
                    v.push("\\[" + B + "*(?:value|" + R + ")"),
                  e.querySelectorAll("[id~=" + b + "-]").length || v.push("~="),
                  (t = h.createElement("input")).setAttribute("name", ""),
                  e.appendChild(t),
                  e.querySelectorAll("[name='']").length ||
                    v.push("\\[" + B + "*name" + B + "*=" + B + "*(?:''|\"\")"),
                  e.querySelectorAll(":checked").length || v.push(":checked"),
                  e.querySelectorAll("a#" + b + "+*").length ||
                    v.push(".#.+[+~]"),
                  e.querySelectorAll("\\\f"),
                  v.push("[\\r\\n\\f]");
              }),
              fe(function (e) {
                e.innerHTML =
                  "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = h.createElement("input");
                t.setAttribute("type", "hidden"),
                  e.appendChild(t).setAttribute("name", "D"),
                  e.querySelectorAll("[name=d]").length &&
                    v.push("name" + B + "*[*^$|!~]?="),
                  2 !== e.querySelectorAll(":enabled").length &&
                    v.push(":enabled", ":disabled"),
                  (p.appendChild(e).disabled = !0),
                  2 !== e.querySelectorAll(":disabled").length &&
                    v.push(":enabled", ":disabled"),
                  e.querySelectorAll("*,:x"),
                  v.push(",.*:");
              })),
            (n.matchesSelector = K.test(
              (y =
                p.matches ||
                p.webkitMatchesSelector ||
                p.mozMatchesSelector ||
                p.oMatchesSelector ||
                p.msMatchesSelector)
            )) &&
              fe(function (e) {
                (n.disconnectedMatch = y.call(e, "*")),
                  y.call(e, "[s!='']:x"),
                  g.push("!=", P);
              }),
            (v = v.length && new RegExp(v.join("|"))),
            (g = g.length && new RegExp(g.join("|"))),
            (t = K.test(p.compareDocumentPosition)),
            (w =
              t || K.test(p.contains)
                ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                      r = t && t.parentNode;
                    return (
                      e === r ||
                      !(
                        !r ||
                        1 !== r.nodeType ||
                        !(n.contains
                          ? n.contains(r)
                          : e.compareDocumentPosition &&
                            16 & e.compareDocumentPosition(r))
                      )
                    );
                  }
                : function (e, t) {
                    if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                    return !1;
                  }),
            (E = t
              ? function (e, t) {
                  if (e === t) return (l = !0), 0;
                  var r =
                    !e.compareDocumentPosition - !t.compareDocumentPosition;
                  return (
                    r ||
                    (1 &
                      (r =
                        (e.ownerDocument || e) == (t.ownerDocument || t)
                          ? e.compareDocumentPosition(t)
                          : 1) ||
                    (!n.sortDetached && t.compareDocumentPosition(e) === r)
                      ? e == h || (e.ownerDocument == _ && w(_, e))
                        ? -1
                        : t == h || (t.ownerDocument == _ && w(_, t))
                        ? 1
                        : f
                        ? L(f, e) - L(f, t)
                        : 0
                      : 4 & r
                      ? -1
                      : 1)
                  );
                }
              : function (e, t) {
                  if (e === t) return (l = !0), 0;
                  var n,
                    r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    u = [e],
                    a = [t];
                  if (!i || !o)
                    return e == h
                      ? -1
                      : t == h
                      ? 1
                      : i
                      ? -1
                      : o
                      ? 1
                      : f
                      ? L(f, e) - L(f, t)
                      : 0;
                  if (i === o) return de(e, t);
                  for (n = e; (n = n.parentNode); ) u.unshift(n);
                  for (n = t; (n = n.parentNode); ) a.unshift(n);
                  for (; u[r] === a[r]; ) r++;
                  return r
                    ? de(u[r], a[r])
                    : u[r] == _
                    ? -1
                    : a[r] == _
                    ? 1
                    : 0;
                }),
            h)
          : h;
      }),
      (ae.matches = function (e, t) {
        return ae(e, null, null, t);
      }),
      (ae.matchesSelector = function (e, t) {
        if (
          (d(e),
          n.matchesSelector &&
            m &&
            !C[t + " "] &&
            (!g || !g.test(t)) &&
            (!v || !v.test(t)))
        )
          try {
            var r = y.call(e, t);
            if (
              r ||
              n.disconnectedMatch ||
              (e.document && 11 !== e.document.nodeType)
            )
              return r;
          } catch (e) {
            C(t, !0);
          }
        return ae(t, h, null, [e]).length > 0;
      }),
      (ae.contains = function (e, t) {
        return (e.ownerDocument || e) != h && d(e), w(e, t);
      }),
      (ae.attr = function (e, t) {
        (e.ownerDocument || e) != h && d(e);
        var i = r.attrHandle[t.toLowerCase()],
          o = i && q.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !m) : void 0;
        return void 0 !== o
          ? o
          : n.attributes || !m
          ? e.getAttribute(t)
          : (o = e.getAttributeNode(t)) && o.specified
          ? o.value
          : null;
      }),
      (ae.escape = function (e) {
        return (e + "").replace(re, ie);
      }),
      (ae.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e);
      }),
      (ae.uniqueSort = function (e) {
        var t,
          r = [],
          i = 0,
          o = 0;
        if (
          ((l = !n.detectDuplicates),
          (f = !n.sortStable && e.slice(0)),
          e.sort(E),
          l)
        ) {
          for (; (t = e[o++]); ) t === e[o] && (i = r.push(o));
          for (; i--; ) e.splice(r[i], 1);
        }
        return (f = null), e;
      }),
      (i = ae.getText = function (e) {
        var t,
          n = "",
          r = 0,
          o = e.nodeType;
        if (o) {
          if (1 === o || 9 === o || 11 === o) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) n += i(e);
          } else if (3 === o || 4 === o) return e.nodeValue;
        } else for (; (t = e[r++]); ) n += i(t);
        return n;
      }),
      ((r = ae.selectors = {
        cacheLength: 50,
        createPseudo: se,
        match: Y,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (e) {
            return (
              (e[1] = e[1].replace(te, ne)),
              (e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne)),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
              e.slice(0, 4)
            );
          },
          CHILD: function (e) {
            return (
              (e[1] = e[1].toLowerCase()),
              "nth" === e[1].slice(0, 3)
                ? (e[3] || ae.error(e[0]),
                  (e[4] = +(e[4]
                    ? e[5] + (e[6] || 1)
                    : 2 * ("even" === e[3] || "odd" === e[3]))),
                  (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                : e[3] && ae.error(e[0]),
              e
            );
          },
          PSEUDO: function (e) {
            var t,
              n = !e[6] && e[2];
            return Y.CHILD.test(e[0])
              ? null
              : (e[3]
                  ? (e[2] = e[4] || e[5] || "")
                  : n &&
                    V.test(n) &&
                    (t = u(n, !0)) &&
                    (t = n.indexOf(")", n.length - t) - n.length) &&
                    ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                e.slice(0, 3));
          },
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(te, ne).toLowerCase();
            return "*" === e
              ? function () {
                  return !0;
                }
              : function (e) {
                  return e.nodeName && e.nodeName.toLowerCase() === t;
                };
          },
          CLASS: function (e) {
            var t = j[e + " "];
            return (
              t ||
              ((t = new RegExp("(^|" + B + ")" + e + "(" + B + "|$)")) &&
                j(e, function (e) {
                  return t.test(
                    ("string" == typeof e.className && e.className) ||
                      (void 0 !== e.getAttribute && e.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (e, t, n) {
            return function (r) {
              var i = ae.attr(r, e);
              return null == i
                ? "!=" === t
                : !t ||
                    ((i += ""),
                    "=" === t
                      ? i === n
                      : "!=" === t
                      ? i !== n
                      : "^=" === t
                      ? n && 0 === i.indexOf(n)
                      : "*=" === t
                      ? n && i.indexOf(n) > -1
                      : "$=" === t
                      ? n && i.slice(-n.length) === n
                      : "~=" === t
                      ? (" " + i.replace(z, " ") + " ").indexOf(n) > -1
                      : "|=" === t &&
                        (i === n || i.slice(0, n.length + 1) === n + "-"));
            };
          },
          CHILD: function (e, t, n, r, i) {
            var o = "nth" !== e.slice(0, 3),
              u = "last" !== e.slice(-4),
              a = "of-type" === t;
            return 1 === r && 0 === i
              ? function (e) {
                  return !!e.parentNode;
                }
              : function (t, n, c) {
                  var s,
                    f,
                    l,
                    d,
                    h,
                    p,
                    m = o !== u ? "nextSibling" : "previousSibling",
                    v = t.parentNode,
                    g = a && t.nodeName.toLowerCase(),
                    y = !c && !a,
                    w = !1;
                  if (v) {
                    if (o) {
                      for (; m; ) {
                        for (d = t; (d = d[m]); )
                          if (
                            a
                              ? d.nodeName.toLowerCase() === g
                              : 1 === d.nodeType
                          )
                            return !1;
                        p = m = "only" === e && !p && "nextSibling";
                      }
                      return !0;
                    }
                    if (((p = [u ? v.firstChild : v.lastChild]), u && y)) {
                      for (
                        w =
                          (h =
                            (s =
                              (f =
                                (l = (d = v)[b] || (d[b] = {}))[d.uniqueID] ||
                                (l[d.uniqueID] = {}))[e] || [])[0] === x &&
                            s[1]) && s[2],
                          d = h && v.childNodes[h];
                        (d = (++h && d && d[m]) || (w = h = 0) || p.pop());

                      )
                        if (1 === d.nodeType && ++w && d === t) {
                          f[e] = [x, h, w];
                          break;
                        }
                    } else if (
                      (y &&
                        (w = h =
                          (s =
                            (f =
                              (l = (d = t)[b] || (d[b] = {}))[d.uniqueID] ||
                              (l[d.uniqueID] = {}))[e] || [])[0] === x && s[1]),
                      !1 === w)
                    )
                      for (
                        ;
                        (d = (++h && d && d[m]) || (w = h = 0) || p.pop()) &&
                        ((a
                          ? d.nodeName.toLowerCase() !== g
                          : 1 !== d.nodeType) ||
                          !++w ||
                          (y &&
                            ((f =
                              (l = d[b] || (d[b] = {}))[d.uniqueID] ||
                              (l[d.uniqueID] = {}))[e] = [x, w]),
                          d !== t));

                      );
                    return (w -= i) === r || (w % r == 0 && w / r >= 0);
                  }
                };
          },
          PSEUDO: function (e, t) {
            var n,
              i =
                r.pseudos[e] ||
                r.setFilters[e.toLowerCase()] ||
                ae.error("unsupported pseudo: " + e);
            return i[b]
              ? i(t)
              : i.length > 1
              ? ((n = [e, e, "", t]),
                r.setFilters.hasOwnProperty(e.toLowerCase())
                  ? se(function (e, n) {
                      for (var r, o = i(e, t), u = o.length; u--; )
                        e[(r = L(e, o[u]))] = !(n[r] = o[u]);
                    })
                  : function (e) {
                      return i(e, 0, n);
                    })
              : i;
          },
        },
        pseudos: {
          not: se(function (e) {
            var t = [],
              n = [],
              r = a(e.replace(F, "$1"));
            return r[b]
              ? se(function (e, t, n, i) {
                  for (var o, u = r(e, null, i, []), a = e.length; a--; )
                    (o = u[a]) && (e[a] = !(t[a] = o));
                })
              : function (e, i, o) {
                  return (t[0] = e), r(t, null, o, n), (t[0] = null), !n.pop();
                };
          }),
          has: se(function (e) {
            return function (t) {
              return ae(e, t).length > 0;
            };
          }),
          contains: se(function (e) {
            return (
              (e = e.replace(te, ne)),
              function (t) {
                return (t.textContent || i(t)).indexOf(e) > -1;
              }
            );
          }),
          lang: se(function (e) {
            return (
              X.test(e || "") || ae.error("unsupported lang: " + e),
              (e = e.replace(te, ne).toLowerCase()),
              function (t) {
                var n;
                do {
                  if (
                    (n = m
                      ? t.lang
                      : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                  )
                    return (
                      (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                    );
                } while ((t = t.parentNode) && 1 === t.nodeType);
                return !1;
              }
            );
          }),
          target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id;
          },
          root: function (e) {
            return e === p;
          },
          focus: function (e) {
            return (
              e === h.activeElement &&
              (!h.hasFocus || h.hasFocus()) &&
              !!(e.type || e.href || ~e.tabIndex)
            );
          },
          enabled: me(!1),
          disabled: me(!0),
          checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return (
              ("input" === t && !!e.checked) || ("option" === t && !!e.selected)
            );
          },
          selected: function (e) {
            return (
              e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
            );
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6) return !1;
            return !0;
          },
          parent: function (e) {
            return !r.pseudos.empty(e);
          },
          header: function (e) {
            return Q.test(e.nodeName);
          },
          input: function (e) {
            return J.test(e.nodeName);
          },
          button: function (e) {
            var t = e.nodeName.toLowerCase();
            return ("input" === t && "button" === e.type) || "button" === t;
          },
          text: function (e) {
            var t;
            return (
              "input" === e.nodeName.toLowerCase() &&
              "text" === e.type &&
              (null == (t = e.getAttribute("type")) ||
                "text" === t.toLowerCase())
            );
          },
          first: ve(function () {
            return [0];
          }),
          last: ve(function (e, t) {
            return [t - 1];
          }),
          eq: ve(function (e, t, n) {
            return [n < 0 ? n + t : n];
          }),
          even: ve(function (e, t) {
            for (var n = 0; n < t; n += 2) e.push(n);
            return e;
          }),
          odd: ve(function (e, t) {
            for (var n = 1; n < t; n += 2) e.push(n);
            return e;
          }),
          lt: ve(function (e, t, n) {
            for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0; ) e.push(r);
            return e;
          }),
          gt: ve(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
            return e;
          }),
        },
      }).pseudos.nth = r.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        r.pseudos[t] = he(t);
      for (t in { submit: !0, reset: !0 }) r.pseudos[t] = pe(t);
      function ye() {}
      function we(e) {
        for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
        return r;
      }
      function be(e, t, n) {
        var r = t.dir,
          i = t.next,
          o = i || r,
          u = n && "parentNode" === o,
          a = k++;
        return t.first
          ? function (t, n, i) {
              for (; (t = t[r]); ) if (1 === t.nodeType || u) return e(t, n, i);
              return !1;
            }
          : function (t, n, c) {
              var s,
                f,
                l,
                d = [x, a];
              if (c) {
                for (; (t = t[r]); )
                  if ((1 === t.nodeType || u) && e(t, n, c)) return !0;
              } else
                for (; (t = t[r]); )
                  if (1 === t.nodeType || u)
                    if (
                      ((f =
                        (l = t[b] || (t[b] = {}))[t.uniqueID] ||
                        (l[t.uniqueID] = {})),
                      i && i === t.nodeName.toLowerCase())
                    )
                      t = t[r] || t;
                    else {
                      if ((s = f[o]) && s[0] === x && s[1] === a)
                        return (d[2] = s[2]);
                      if (((f[o] = d), (d[2] = e(t, n, c)))) return !0;
                    }
              return !1;
            };
      }
      function _e(e) {
        return e.length > 1
          ? function (t, n, r) {
              for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
              return !0;
            }
          : e[0];
      }
      function xe(e, t, n, r, i) {
        for (var o, u = [], a = 0, c = e.length, s = null != t; a < c; a++)
          (o = e[a]) && ((n && !n(o, r, i)) || (u.push(o), s && t.push(a)));
        return u;
      }
      function ke(e, t, n, r, i, o) {
        return (
          r && !r[b] && (r = ke(r)),
          i && !i[b] && (i = ke(i, o)),
          se(function (o, u, a, c) {
            var s,
              f,
              l,
              d = [],
              h = [],
              p = u.length,
              m =
                o ||
                (function (e, t, n) {
                  for (var r = 0, i = t.length; r < i; r++) ae(e, t[r], n);
                  return n;
                })(t || "*", a.nodeType ? [a] : a, []),
              v = !e || (!o && t) ? m : xe(m, d, e, a, c),
              g = n ? (i || (o ? e : p || r) ? [] : u) : v;
            if ((n && n(v, g, a, c), r))
              for (s = xe(g, h), r(s, [], a, c), f = s.length; f--; )
                (l = s[f]) && (g[h[f]] = !(v[h[f]] = l));
            if (o) {
              if (i || e) {
                if (i) {
                  for (s = [], f = g.length; f--; )
                    (l = g[f]) && s.push((v[f] = l));
                  i(null, (g = []), s, c);
                }
                for (f = g.length; f--; )
                  (l = g[f]) &&
                    (s = i ? L(o, l) : d[f]) > -1 &&
                    (o[s] = !(u[s] = l));
              }
            } else (g = xe(g === u ? g.splice(p, g.length) : g)), i ? i(null, u, g, c) : O.apply(u, g);
          })
        );
      }
      function je(e) {
        for (
          var t,
            n,
            i,
            o = e.length,
            u = r.relative[e[0].type],
            a = u || r.relative[" "],
            c = u ? 1 : 0,
            f = be(
              function (e) {
                return e === t;
              },
              a,
              !0
            ),
            l = be(
              function (e) {
                return L(t, e) > -1;
              },
              a,
              !0
            ),
            d = [
              function (e, n, r) {
                var i =
                  (!u && (r || n !== s)) ||
                  ((t = n).nodeType ? f(e, n, r) : l(e, n, r));
                return (t = null), i;
              },
            ];
          c < o;
          c++
        )
          if ((n = r.relative[e[c].type])) d = [be(_e(d), n)];
          else {
            if ((n = r.filter[e[c].type].apply(null, e[c].matches))[b]) {
              for (i = ++c; i < o && !r.relative[e[i].type]; i++);
              return ke(
                c > 1 && _e(d),
                c > 1 &&
                  we(
                    e
                      .slice(0, c - 1)
                      .concat({ value: " " === e[c - 2].type ? "*" : "" })
                  ).replace(F, "$1"),
                n,
                c < i && je(e.slice(c, i)),
                i < o && je((e = e.slice(i))),
                i < o && we(e)
              );
            }
            d.push(n);
          }
        return _e(d);
      }
      return (
        (ye.prototype = r.filters = r.pseudos),
        (r.setFilters = new ye()),
        (u = ae.tokenize = function (e, t) {
          var n,
            i,
            o,
            u,
            a,
            c,
            s,
            f = T[e + " "];
          if (f) return t ? 0 : f.slice(0);
          for (a = e, c = [], s = r.preFilter; a; ) {
            for (u in ((n && !(i = $.exec(a))) ||
              (i && (a = a.slice(i[0].length) || a), c.push((o = []))),
            (n = !1),
            (i = W.exec(a)) &&
              ((n = i.shift()),
              o.push({ value: n, type: i[0].replace(F, " ") }),
              (a = a.slice(n.length))),
            r.filter))
              !(i = Y[u].exec(a)) ||
                (s[u] && !(i = s[u](i))) ||
                ((n = i.shift()),
                o.push({ value: n, type: u, matches: i }),
                (a = a.slice(n.length)));
            if (!n) break;
          }
          return t ? a.length : a ? ae.error(e) : T(e, c).slice(0);
        }),
        (a = ae.compile = function (e, t) {
          var n,
            i = [],
            o = [],
            a = S[e + " "];
          if (!a) {
            for (t || (t = u(e)), n = t.length; n--; )
              (a = je(t[n]))[b] ? i.push(a) : o.push(a);
            (a = S(
              e,
              (function (e, t) {
                var n = t.length > 0,
                  i = e.length > 0,
                  o = function (o, u, a, c, f) {
                    var l,
                      p,
                      v,
                      g = 0,
                      y = "0",
                      w = o && [],
                      b = [],
                      _ = s,
                      k = o || (i && r.find.TAG("*", f)),
                      j = (x += null == _ ? 1 : Math.random() || 0.1),
                      T = k.length;
                    for (
                      f && (s = u == h || u || f);
                      y !== T && null != (l = k[y]);
                      y++
                    ) {
                      if (i && l) {
                        for (
                          p = 0, u || l.ownerDocument == h || (d(l), (a = !m));
                          (v = e[p++]);

                        )
                          if (v(l, u || h, a)) {
                            c.push(l);
                            break;
                          }
                        f && (x = j);
                      }
                      n && ((l = !v && l) && g--, o && w.push(l));
                    }
                    if (((g += y), n && y !== g)) {
                      for (p = 0; (v = t[p++]); ) v(w, b, u, a);
                      if (o) {
                        if (g > 0)
                          for (; y--; ) w[y] || b[y] || (b[y] = D.call(c));
                        b = xe(b);
                      }
                      O.apply(c, b),
                        f &&
                          !o &&
                          b.length > 0 &&
                          g + t.length > 1 &&
                          ae.uniqueSort(c);
                    }
                    return f && ((x = j), (s = _)), w;
                  };
                return n ? se(o) : o;
              })(o, i)
            )).selector = e;
          }
          return a;
        }),
        (c = ae.select = function (e, t, n, i) {
          var o,
            c,
            s,
            f,
            l,
            d = "function" == typeof e && e,
            h = !i && u((e = d.selector || e));
          if (((n = n || []), 1 === h.length)) {
            if (
              (c = h[0] = h[0].slice(0)).length > 2 &&
              "ID" === (s = c[0]).type &&
              9 === t.nodeType &&
              m &&
              r.relative[c[1].type]
            ) {
              if (!(t = (r.find.ID(s.matches[0].replace(te, ne), t) || [])[0]))
                return n;
              d && (t = t.parentNode), (e = e.slice(c.shift().value.length));
            }
            for (
              o = Y.needsContext.test(e) ? 0 : c.length;
              o-- && ((s = c[o]), !r.relative[(f = s.type)]);

            )
              if (
                (l = r.find[f]) &&
                (i = l(
                  s.matches[0].replace(te, ne),
                  (ee.test(c[0].type) && ge(t.parentNode)) || t
                ))
              ) {
                if ((c.splice(o, 1), !(e = i.length && we(c))))
                  return O.apply(n, i), n;
                break;
              }
          }
          return (
            (d || a(e, h))(
              i,
              t,
              !m,
              n,
              !t || (ee.test(e) && ge(t.parentNode)) || t
            ),
            n
          );
        }),
        (n.sortStable = b.split("").sort(E).join("") === b),
        (n.detectDuplicates = !!l),
        d(),
        (n.sortDetached = fe(function (e) {
          return 1 & e.compareDocumentPosition(h.createElement("fieldset"));
        })),
        fe(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            "#" === e.firstChild.getAttribute("href")
          );
        }) ||
          le("type|href|height|width", function (e, t, n) {
            if (!n)
              return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
          }),
        (n.attributes &&
          fe(function (e) {
            return (
              (e.innerHTML = "<input/>"),
              e.firstChild.setAttribute("value", ""),
              "" === e.firstChild.getAttribute("value")
            );
          })) ||
          le("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
              return e.defaultValue;
          }),
        fe(function (e) {
          return null == e.getAttribute("disabled");
        }) ||
          le(R, function (e, t, n) {
            var r;
            if (!n)
              return !0 === e[t]
                ? t.toLowerCase()
                : (r = e.getAttributeNode(t)) && r.specified
                ? r.value
                : null;
          }),
        ae
      );
    })(e);
  (b.find = x),
    (b.expr = x.selectors),
    (b.expr[":"] = b.expr.pseudos),
    (b.uniqueSort = b.unique = x.uniqueSort),
    (b.text = x.getText),
    (b.isXMLDoc = x.isXML),
    (b.contains = x.contains),
    (b.escapeSelector = x.escape);
  var k = function (e, t, n) {
      for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (i && b(e).is(n)) break;
          r.push(e);
        }
      return r;
    },
    j = function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    T = b.expr.match.needsContext;
  function S(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function E(e, t, n) {
    return p(t)
      ? b.grep(e, function (e, r) {
          return !!t.call(e, r, e) !== n;
        })
      : t.nodeType
      ? b.grep(e, function (e) {
          return (e === t) !== n;
        })
      : "string" != typeof t
      ? b.grep(e, function (e) {
          return a.call(t, e) > -1 !== n;
        })
      : b.filter(t, e, n);
  }
  (b.filter = function (e, t, n) {
    var r = t[0];
    return (
      n && (e = ":not(" + e + ")"),
      1 === t.length && 1 === r.nodeType
        ? b.find.matchesSelector(r, e)
          ? [r]
          : []
        : b.find.matches(
            e,
            b.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    b.fn.extend({
      find: function (e) {
        var t,
          n,
          r = this.length,
          i = this;
        if ("string" != typeof e)
          return this.pushStack(
            b(e).filter(function () {
              for (t = 0; t < r; t++) if (b.contains(i[t], this)) return !0;
            })
          );
        for (n = this.pushStack([]), t = 0; t < r; t++) b.find(e, i[t], n);
        return r > 1 ? b.uniqueSort(n) : n;
      },
      filter: function (e) {
        return this.pushStack(E(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(E(this, e || [], !0));
      },
      is: function (e) {
        return !!E(this, "string" == typeof e && T.test(e) ? b(e) : e || [], !1)
          .length;
      },
    });
  var q,
    A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((b.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;
    if (((n = n || q), "string" == typeof e)) {
      if (
        !(r =
          "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
            ? [null, e, null]
            : A.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (
          ((t = t instanceof b ? t[0] : t),
          b.merge(
            this,
            b.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : v, !0)
          ),
          C.test(r[1]) && b.isPlainObject(t))
        )
          for (r in t) p(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (
        (i = v.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : p(e)
      ? void 0 !== n.ready
        ? n.ready(e)
        : e(b)
      : b.makeArray(e, this);
  }).prototype = b.fn),
    (q = b(v));
  var D = /^(?:parents|prev(?:Until|All))/,
    N = { children: !0, contents: !0, next: !0, prev: !0 };
  function O(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType; );
    return e;
  }
  b.fn.extend({
    has: function (e) {
      var t = b(e, this),
        n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) if (b.contains(this, t[e])) return !0;
      });
    },
    closest: function (e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        u = "string" != typeof e && b(e);
      if (!T.test(e))
        for (; r < i; r++)
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (u
                ? u.index(n) > -1
                : 1 === n.nodeType && b.find.matchesSelector(n, e))
            ) {
              o.push(n);
              break;
            }
      return this.pushStack(o.length > 1 ? b.uniqueSort(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? a.call(b(e), this[0])
          : a.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      return this.pushStack(b.uniqueSort(b.merge(this.get(), b(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    b.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return k(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return k(e, "parentNode", n);
        },
        next: function (e) {
          return O(e, "nextSibling");
        },
        prev: function (e) {
          return O(e, "previousSibling");
        },
        nextAll: function (e) {
          return k(e, "nextSibling");
        },
        prevAll: function (e) {
          return k(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return k(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return k(e, "previousSibling", n);
        },
        siblings: function (e) {
          return j((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return j(e.firstChild);
        },
        contents: function (e) {
          return null != e.contentDocument && r(e.contentDocument)
            ? e.contentDocument
            : (S(e, "template") && (e = e.content || e),
              b.merge([], e.childNodes));
        },
      },
      function (e, t) {
        b.fn[e] = function (n, r) {
          var i = b.map(this, t, n);
          return (
            "Until" !== e.slice(-5) && (r = n),
            r && "string" == typeof r && (i = b.filter(r, i)),
            this.length > 1 &&
              (N[e] || b.uniqueSort(i), D.test(e) && i.reverse()),
            this.pushStack(i)
          );
        };
      }
    );
  var M = /[^\x20\t\r\n\f]+/g;
  function L(e) {
    return e;
  }
  function R(e) {
    throw e;
  }
  function B(e, t, n, r) {
    var i;
    try {
      e && p((i = e.promise))
        ? i.call(e).done(t).fail(n)
        : e && p((i = e.then))
        ? i.call(e, t, n)
        : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }
  (b.Callbacks = function (e) {
    e =
      "string" == typeof e
        ? (function (e) {
            var t = {};
            return (
              b.each(e.match(M) || [], function (e, n) {
                t[n] = !0;
              }),
              t
            );
          })(e)
        : b.extend({}, e);
    var t,
      n,
      r,
      i,
      o = [],
      u = [],
      a = -1,
      c = function () {
        for (i = i || e.once, r = t = !0; u.length; a = -1)
          for (n = u.shift(); ++a < o.length; )
            !1 === o[a].apply(n[0], n[1]) &&
              e.stopOnFalse &&
              ((a = o.length), (n = !1));
        e.memory || (n = !1), (t = !1), i && (o = n ? [] : "");
      },
      s = {
        add: function () {
          return (
            o &&
              (n && !t && ((a = o.length - 1), u.push(n)),
              (function t(n) {
                b.each(n, function (n, r) {
                  p(r)
                    ? (e.unique && s.has(r)) || o.push(r)
                    : r && r.length && "string" !== w(r) && t(r);
                });
              })(arguments),
              n && !t && c()),
            this
          );
        },
        remove: function () {
          return (
            b.each(arguments, function (e, t) {
              for (var n; (n = b.inArray(t, o, n)) > -1; )
                o.splice(n, 1), n <= a && a--;
            }),
            this
          );
        },
        has: function (e) {
          return e ? b.inArray(e, o) > -1 : o.length > 0;
        },
        empty: function () {
          return o && (o = []), this;
        },
        disable: function () {
          return (i = u = []), (o = n = ""), this;
        },
        disabled: function () {
          return !o;
        },
        lock: function () {
          return (i = u = []), n || t || (o = n = ""), this;
        },
        locked: function () {
          return !!i;
        },
        fireWith: function (e, n) {
          return (
            i ||
              ((n = [e, (n = n || []).slice ? n.slice() : n]),
              u.push(n),
              t || c()),
            this
          );
        },
        fire: function () {
          return s.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!r;
        },
      };
    return s;
  }),
    b.extend({
      Deferred: function (t) {
        var n = [
            [
              "notify",
              "progress",
              b.Callbacks("memory"),
              b.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              b.Callbacks("once memory"),
              b.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              b.Callbacks("once memory"),
              b.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          r = "pending",
          i = {
            state: function () {
              return r;
            },
            always: function () {
              return o.done(arguments).fail(arguments), this;
            },
            catch: function (e) {
              return i.then(null, e);
            },
            pipe: function () {
              var e = arguments;
              return b
                .Deferred(function (t) {
                  b.each(n, function (n, r) {
                    var i = p(e[r[4]]) && e[r[4]];
                    o[r[1]](function () {
                      var e = i && i.apply(this, arguments);
                      e && p(e.promise)
                        ? e
                            .promise()
                            .progress(t.notify)
                            .done(t.resolve)
                            .fail(t.reject)
                        : t[r[0] + "With"](this, i ? [e] : arguments);
                    });
                  }),
                    (e = null);
                })
                .promise();
            },
            then: function (t, r, i) {
              var o = 0;
              function u(t, n, r, i) {
                return function () {
                  var a = this,
                    c = arguments,
                    s = function () {
                      var e, s;
                      if (!(t < o)) {
                        if ((e = r.apply(a, c)) === n.promise())
                          throw new TypeError("Thenable self-resolution");
                        (s =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          p(s)
                            ? i
                              ? s.call(e, u(o, n, L, i), u(o, n, R, i))
                              : (o++,
                                s.call(
                                  e,
                                  u(o, n, L, i),
                                  u(o, n, R, i),
                                  u(o, n, L, n.notifyWith)
                                ))
                            : (r !== L && ((a = void 0), (c = [e])),
                              (i || n.resolveWith)(a, c));
                      }
                    },
                    f = i
                      ? s
                      : function () {
                          try {
                            s();
                          } catch (e) {
                            b.Deferred.exceptionHook &&
                              b.Deferred.exceptionHook(e, f.stackTrace),
                              t + 1 >= o &&
                                (r !== R && ((a = void 0), (c = [e])),
                                n.rejectWith(a, c));
                          }
                        };
                  t
                    ? f()
                    : (b.Deferred.getStackHook &&
                        (f.stackTrace = b.Deferred.getStackHook()),
                      e.setTimeout(f));
                };
              }
              return b
                .Deferred(function (e) {
                  n[0][3].add(u(0, e, p(i) ? i : L, e.notifyWith)),
                    n[1][3].add(u(0, e, p(t) ? t : L)),
                    n[2][3].add(u(0, e, p(r) ? r : R));
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? b.extend(e, i) : i;
            },
          },
          o = {};
        return (
          b.each(n, function (e, t) {
            var u = t[2],
              a = t[5];
            (i[t[1]] = u.add),
              a &&
                u.add(
                  function () {
                    r = a;
                  },
                  n[3 - e][2].disable,
                  n[3 - e][3].disable,
                  n[0][2].lock,
                  n[0][3].lock
                ),
              u.add(t[3].fire),
              (o[t[0]] = function () {
                return (
                  o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                );
              }),
              (o[t[0] + "With"] = u.fireWith);
          }),
          i.promise(o),
          t && t.call(o, o),
          o
        );
      },
      when: function (e) {
        var t = arguments.length,
          n = t,
          r = Array(n),
          o = i.call(arguments),
          u = b.Deferred(),
          a = function (e) {
            return function (n) {
              (r[e] = this),
                (o[e] = arguments.length > 1 ? i.call(arguments) : n),
                --t || u.resolveWith(r, o);
            };
          };
        if (
          t <= 1 &&
          (B(e, u.done(a(n)).resolve, u.reject, !t),
          "pending" === u.state() || p(o[n] && o[n].then))
        )
          return u.then();
        for (; n--; ) B(o[n], a(n), u.reject);
        return u.promise();
      },
    });
  var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (b.Deferred.exceptionHook = function (t, n) {
    e.console &&
      e.console.warn &&
      t &&
      H.test(t.name) &&
      e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
  }),
    (b.readyException = function (t) {
      e.setTimeout(function () {
        throw t;
      });
    });
  var I = b.Deferred();
  function P() {
    v.removeEventListener("DOMContentLoaded", P),
      e.removeEventListener("load", P),
      b.ready();
  }
  (b.fn.ready = function (e) {
    return (
      I.then(e).catch(function (e) {
        b.readyException(e);
      }),
      this
    );
  }),
    b.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (!0 === e ? --b.readyWait : b.isReady) ||
          ((b.isReady = !0),
          (!0 !== e && --b.readyWait > 0) || I.resolveWith(v, [b]));
      },
    }),
    (b.ready.then = I.then),
    "complete" === v.readyState ||
    ("loading" !== v.readyState && !v.documentElement.doScroll)
      ? e.setTimeout(b.ready)
      : (v.addEventListener("DOMContentLoaded", P),
        e.addEventListener("load", P));
  var z = function (e, t, n, r, i, o, u) {
      var a = 0,
        c = e.length,
        s = null == n;
      if ("object" === w(n))
        for (a in ((i = !0), n)) z(e, t, a, n[a], !0, o, u);
      else if (
        void 0 !== r &&
        ((i = !0),
        p(r) || (u = !0),
        s &&
          (u
            ? (t.call(e, r), (t = null))
            : ((s = t),
              (t = function (e, t, n) {
                return s.call(b(e), n);
              }))),
        t)
      )
        for (; a < c; a++) t(e[a], n, u ? r : r.call(e[a], a, t(e[a], n)));
      return i ? e : s ? t.call(e) : c ? t(e[0], n) : o;
    },
    F = /^-ms-/,
    $ = /-([a-z])/g;
  function W(e, t) {
    return t.toUpperCase();
  }
  function U(e) {
    return e.replace(F, "ms-").replace($, W);
  }
  var V = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function X() {
    this.expando = b.expando + X.uid++;
  }
  (X.uid = 1),
    (X.prototype = {
      cache: function (e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            V(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function (e, t, n) {
        var r,
          i = this.cache(e);
        if ("string" == typeof t) i[U(t)] = n;
        else for (r in t) i[U(r)] = t[r];
        return i;
      },
      get: function (e, t) {
        return void 0 === t
          ? this.cache(e)
          : e[this.expando] && e[this.expando][U(t)];
      },
      access: function (e, t, n) {
        return void 0 === t || (t && "string" == typeof t && void 0 === n)
          ? this.get(e, t)
          : (this.set(e, t, n), void 0 !== n ? n : t);
      },
      remove: function (e, t) {
        var n,
          r = e[this.expando];
        if (void 0 !== r) {
          if (void 0 !== t) {
            n = (t = Array.isArray(t)
              ? t.map(U)
              : (t = U(t)) in r
              ? [t]
              : t.match(M) || []).length;
            for (; n--; ) delete r[t[n]];
          }
          (void 0 === t || b.isEmptyObject(r)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function (e) {
        var t = e[this.expando];
        return void 0 !== t && !b.isEmptyObject(t);
      },
    });
  var Y = new X(),
    G = new X(),
    J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Q = /[A-Z]/g;
  function K(e, t, n) {
    var r;
    if (void 0 === n && 1 === e.nodeType)
      if (
        ((r = "data-" + t.replace(Q, "-$&").toLowerCase()),
        "string" == typeof (n = e.getAttribute(r)))
      ) {
        try {
          n = (function (e) {
            return (
              "true" === e ||
              ("false" !== e &&
                ("null" === e
                  ? null
                  : e === +e + ""
                  ? +e
                  : J.test(e)
                  ? JSON.parse(e)
                  : e))
            );
          })(n);
        } catch (e) {}
        G.set(e, t, n);
      } else n = void 0;
    return n;
  }
  b.extend({
    hasData: function (e) {
      return G.hasData(e) || Y.hasData(e);
    },
    data: function (e, t, n) {
      return G.access(e, t, n);
    },
    removeData: function (e, t) {
      G.remove(e, t);
    },
    _data: function (e, t, n) {
      return Y.access(e, t, n);
    },
    _removeData: function (e, t) {
      Y.remove(e, t);
    },
  }),
    b.fn.extend({
      data: function (e, t) {
        var n,
          r,
          i,
          o = this[0],
          u = o && o.attributes;
        if (void 0 === e) {
          if (
            this.length &&
            ((i = G.get(o)), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))
          ) {
            for (n = u.length; n--; )
              u[n] &&
                0 === (r = u[n].name).indexOf("data-") &&
                ((r = U(r.slice(5))), K(o, r, i[r]));
            Y.set(o, "hasDataAttrs", !0);
          }
          return i;
        }
        return "object" == typeof e
          ? this.each(function () {
              G.set(this, e);
            })
          : z(
              this,
              function (t) {
                var n;
                if (o && void 0 === t)
                  return void 0 !== (n = G.get(o, e)) ||
                    void 0 !== (n = K(o, e))
                    ? n
                    : void 0;
                this.each(function () {
                  G.set(this, e, t);
                });
              },
              null,
              t,
              arguments.length > 1,
              null,
              !0
            );
      },
      removeData: function (e) {
        return this.each(function () {
          G.remove(this, e);
        });
      },
    }),
    b.extend({
      queue: function (e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (r = Y.get(e, t)),
            n &&
              (!r || Array.isArray(n)
                ? (r = Y.access(e, t, b.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = b.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = b._queueHooks(e, t);
        "inprogress" === i && ((i = n.shift()), r--),
          i &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(
              e,
              function () {
                b.dequeue(e, t);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          Y.get(e, n) ||
          Y.access(e, n, {
            empty: b.Callbacks("once memory").add(function () {
              Y.remove(e, [t + "queue", n]);
            }),
          })
        );
      },
    }),
    b.fn.extend({
      queue: function (e, t) {
        var n = 2;
        return (
          "string" != typeof e && ((t = e), (e = "fx"), n--),
          arguments.length < n
            ? b.queue(this[0], e)
            : void 0 === t
            ? this
            : this.each(function () {
                var n = b.queue(this, e, t);
                b._queueHooks(this, e),
                  "fx" === e && "inprogress" !== n[0] && b.dequeue(this, e);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          b.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var n,
          r = 1,
          i = b.Deferred(),
          o = this,
          u = this.length,
          a = function () {
            --r || i.resolveWith(o, [o]);
          };
        for (
          "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
          u--;

        )
          (n = Y.get(o[u], e + "queueHooks")) &&
            n.empty &&
            (r++, n.empty.add(a));
        return a(), i.promise(t);
      },
    });
  var Z = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ee = new RegExp("^(?:([+-])=|)(" + Z + ")([a-z%]*)$", "i"),
    te = ["Top", "Right", "Bottom", "Left"],
    ne = v.documentElement,
    re = function (e) {
      return b.contains(e.ownerDocument, e);
    },
    ie = { composed: !0 };
  ne.getRootNode &&
    (re = function (e) {
      return (
        b.contains(e.ownerDocument, e) || e.getRootNode(ie) === e.ownerDocument
      );
    });
  var oe = function (e, t) {
    return (
      "none" === (e = t || e).style.display ||
      ("" === e.style.display && re(e) && "none" === b.css(e, "display"))
    );
  };
  function ue(e, t, n, r) {
    var i,
      o,
      u = 20,
      a = r
        ? function () {
            return r.cur();
          }
        : function () {
            return b.css(e, t, "");
          },
      c = a(),
      s = (n && n[3]) || (b.cssNumber[t] ? "" : "px"),
      f =
        e.nodeType &&
        (b.cssNumber[t] || ("px" !== s && +c)) &&
        ee.exec(b.css(e, t));
    if (f && f[3] !== s) {
      for (c /= 2, s = s || f[3], f = +c || 1; u--; )
        b.style(e, t, f + s),
          (1 - o) * (1 - (o = a() / c || 0.5)) <= 0 && (u = 0),
          (f /= o);
      (f *= 2), b.style(e, t, f + s), (n = n || []);
    }
    return (
      n &&
        ((f = +f || +c || 0),
        (i = n[1] ? f + (n[1] + 1) * n[2] : +n[2]),
        r && ((r.unit = s), (r.start = f), (r.end = i))),
      i
    );
  }
  var ae = {};
  function ce(e) {
    var t,
      n = e.ownerDocument,
      r = e.nodeName,
      i = ae[r];
    return (
      i ||
      ((t = n.body.appendChild(n.createElement(r))),
      (i = b.css(t, "display")),
      t.parentNode.removeChild(t),
      "none" === i && (i = "block"),
      (ae[r] = i),
      i)
    );
  }
  function se(e, t) {
    for (var n, r, i = [], o = 0, u = e.length; o < u; o++)
      (r = e[o]).style &&
        ((n = r.style.display),
        t
          ? ("none" === n &&
              ((i[o] = Y.get(r, "display") || null),
              i[o] || (r.style.display = "")),
            "" === r.style.display && oe(r) && (i[o] = ce(r)))
          : "none" !== n && ((i[o] = "none"), Y.set(r, "display", n)));
    for (o = 0; o < u; o++) null != i[o] && (e[o].style.display = i[o]);
    return e;
  }
  b.fn.extend({
    show: function () {
      return se(this, !0);
    },
    hide: function () {
      return se(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            oe(this) ? b(this).show() : b(this).hide();
          });
    },
  });
  var fe,
    le,
    de = /^(?:checkbox|radio)$/i,
    he = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    pe = /^$|^module$|\/(?:java|ecma)script/i;
  (fe = v.createDocumentFragment().appendChild(v.createElement("div"))),
    (le = v.createElement("input")).setAttribute("type", "radio"),
    le.setAttribute("checked", "checked"),
    le.setAttribute("name", "t"),
    fe.appendChild(le),
    (h.checkClone = fe.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (fe.innerHTML = "<textarea>x</textarea>"),
    (h.noCloneChecked = !!fe.cloneNode(!0).lastChild.defaultValue),
    (fe.innerHTML = "<option></option>"),
    (h.option = !!fe.lastChild);
  var me = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""],
  };
  function ve(e, t) {
    var n;
    return (
      (n =
        void 0 !== e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : void 0 !== e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : []),
      void 0 === t || (t && S(e, t)) ? b.merge([e], n) : n
    );
  }
  function ge(e, t) {
    for (var n = 0, r = e.length; n < r; n++)
      Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
  }
  (me.tbody = me.tfoot = me.colgroup = me.caption = me.thead),
    (me.th = me.td),
    h.option ||
      (me.optgroup = me.option = [
        1,
        "<select multiple='multiple'>",
        "</select>",
      ]);
  var ye = /<|&#?\w+;/;
  function we(e, t, n, r, i) {
    for (
      var o,
        u,
        a,
        c,
        s,
        f,
        l = t.createDocumentFragment(),
        d = [],
        h = 0,
        p = e.length;
      h < p;
      h++
    )
      if ((o = e[h]) || 0 === o)
        if ("object" === w(o)) b.merge(d, o.nodeType ? [o] : o);
        else if (ye.test(o)) {
          for (
            u = u || l.appendChild(t.createElement("div")),
              a = (he.exec(o) || ["", ""])[1].toLowerCase(),
              c = me[a] || me._default,
              u.innerHTML = c[1] + b.htmlPrefilter(o) + c[2],
              f = c[0];
            f--;

          )
            u = u.lastChild;
          b.merge(d, u.childNodes), ((u = l.firstChild).textContent = "");
        } else d.push(t.createTextNode(o));
    for (l.textContent = "", h = 0; (o = d[h++]); )
      if (r && b.inArray(o, r) > -1) i && i.push(o);
      else if (
        ((s = re(o)), (u = ve(l.appendChild(o), "script")), s && ge(u), n)
      )
        for (f = 0; (o = u[f++]); ) pe.test(o.type || "") && n.push(o);
    return l;
  }
  var be = /^([^.]*)(?:\.(.+)|)/;
  function _e() {
    return !0;
  }
  function xe() {
    return !1;
  }
  function ke(e, t) {
    return (
      (e ===
        (function () {
          try {
            return v.activeElement;
          } catch (e) {}
        })()) ==
      ("focus" === t)
    );
  }
  function je(e, t, n, r, i, o) {
    var u, a;
    if ("object" == typeof t) {
      for (a in ("string" != typeof n && ((r = r || n), (n = void 0)), t))
        je(e, a, n, r, t[a], o);
      return e;
    }
    if (
      (null == r && null == i
        ? ((i = n), (r = n = void 0))
        : null == i &&
          ("string" == typeof n
            ? ((i = r), (r = void 0))
            : ((i = r), (r = n), (n = void 0))),
      !1 === i)
    )
      i = xe;
    else if (!i) return e;
    return (
      1 === o &&
        ((u = i),
        ((i = function (e) {
          return b().off(e), u.apply(this, arguments);
        }).guid = u.guid || (u.guid = b.guid++))),
      e.each(function () {
        b.event.add(this, t, i, r, n);
      })
    );
  }
  function Te(e, t, n) {
    n
      ? (Y.set(e, t, !1),
        b.event.add(e, t, {
          namespace: !1,
          handler: function (e) {
            var r,
              o,
              u = Y.get(this, t);
            if (1 & e.isTrigger && this[t]) {
              if (u.length)
                (b.event.special[t] || {}).delegateType && e.stopPropagation();
              else if (
                ((u = i.call(arguments)),
                Y.set(this, t, u),
                (r = n(this, t)),
                this[t](),
                u !== (o = Y.get(this, t)) || r ? Y.set(this, t, !1) : (o = {}),
                u !== o)
              )
                return (
                  e.stopImmediatePropagation(), e.preventDefault(), o && o.value
                );
            } else
              u.length &&
                (Y.set(this, t, {
                  value: b.event.trigger(
                    b.extend(u[0], b.Event.prototype),
                    u.slice(1),
                    this
                  ),
                }),
                e.stopImmediatePropagation());
          },
        }))
      : void 0 === Y.get(e, t) && b.event.add(e, t, _e);
  }
  (b.event = {
    global: {},
    add: function (e, t, n, r, i) {
      var o,
        u,
        a,
        c,
        s,
        f,
        l,
        d,
        h,
        p,
        m,
        v = Y.get(e);
      if (V(e))
        for (
          n.handler && ((n = (o = n).handler), (i = o.selector)),
            i && b.find.matchesSelector(ne, i),
            n.guid || (n.guid = b.guid++),
            (c = v.events) || (c = v.events = Object.create(null)),
            (u = v.handle) ||
              (u = v.handle = function (t) {
                return void 0 !== b && b.event.triggered !== t.type
                  ? b.event.dispatch.apply(e, arguments)
                  : void 0;
              }),
            s = (t = (t || "").match(M) || [""]).length;
          s--;

        )
          (h = m = (a = be.exec(t[s]) || [])[1]),
            (p = (a[2] || "").split(".").sort()),
            h &&
              ((l = b.event.special[h] || {}),
              (h = (i ? l.delegateType : l.bindType) || h),
              (l = b.event.special[h] || {}),
              (f = b.extend(
                {
                  type: h,
                  origType: m,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: i,
                  needsContext: i && b.expr.match.needsContext.test(i),
                  namespace: p.join("."),
                },
                o
              )),
              (d = c[h]) ||
                (((d = c[h] = []).delegateCount = 0),
                (l.setup && !1 !== l.setup.call(e, r, p, u)) ||
                  (e.addEventListener && e.addEventListener(h, u))),
              l.add &&
                (l.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)),
              i ? d.splice(d.delegateCount++, 0, f) : d.push(f),
              (b.event.global[h] = !0));
    },
    remove: function (e, t, n, r, i) {
      var o,
        u,
        a,
        c,
        s,
        f,
        l,
        d,
        h,
        p,
        m,
        v = Y.hasData(e) && Y.get(e);
      if (v && (c = v.events)) {
        for (s = (t = (t || "").match(M) || [""]).length; s--; )
          if (
            ((h = m = (a = be.exec(t[s]) || [])[1]),
            (p = (a[2] || "").split(".").sort()),
            h)
          ) {
            for (
              l = b.event.special[h] || {},
                d = c[(h = (r ? l.delegateType : l.bindType) || h)] || [],
                a =
                  a[2] &&
                  new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                u = o = d.length;
              o--;

            )
              (f = d[o]),
                (!i && m !== f.origType) ||
                  (n && n.guid !== f.guid) ||
                  (a && !a.test(f.namespace)) ||
                  (r && r !== f.selector && ("**" !== r || !f.selector)) ||
                  (d.splice(o, 1),
                  f.selector && d.delegateCount--,
                  l.remove && l.remove.call(e, f));
            u &&
              !d.length &&
              ((l.teardown && !1 !== l.teardown.call(e, p, v.handle)) ||
                b.removeEvent(e, h, v.handle),
              delete c[h]);
          } else for (h in c) b.event.remove(e, h + t[s], n, r, !0);
        b.isEmptyObject(c) && Y.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        n,
        r,
        i,
        o,
        u,
        a = new Array(arguments.length),
        c = b.event.fix(e),
        s = (Y.get(this, "events") || Object.create(null))[c.type] || [],
        f = b.event.special[c.type] || {};
      for (a[0] = c, t = 1; t < arguments.length; t++) a[t] = arguments[t];
      if (
        ((c.delegateTarget = this),
        !f.preDispatch || !1 !== f.preDispatch.call(this, c))
      ) {
        for (
          u = b.event.handlers.call(this, c, s), t = 0;
          (i = u[t++]) && !c.isPropagationStopped();

        )
          for (
            c.currentTarget = i.elem, n = 0;
            (o = i.handlers[n++]) && !c.isImmediatePropagationStopped();

          )
            (c.rnamespace &&
              !1 !== o.namespace &&
              !c.rnamespace.test(o.namespace)) ||
              ((c.handleObj = o),
              (c.data = o.data),
              void 0 !==
                (r = (
                  (b.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, a)) &&
                !1 === (c.result = r) &&
                (c.preventDefault(), c.stopPropagation()));
        return f.postDispatch && f.postDispatch.call(this, c), c.result;
      }
    },
    handlers: function (e, t) {
      var n,
        r,
        i,
        o,
        u,
        a = [],
        c = t.delegateCount,
        s = e.target;
      if (c && s.nodeType && !("click" === e.type && e.button >= 1))
        for (; s !== this; s = s.parentNode || this)
          if (1 === s.nodeType && ("click" !== e.type || !0 !== s.disabled)) {
            for (o = [], u = {}, n = 0; n < c; n++)
              void 0 === u[(i = (r = t[n]).selector + " ")] &&
                (u[i] = r.needsContext
                  ? b(i, this).index(s) > -1
                  : b.find(i, this, null, [s]).length),
                u[i] && o.push(r);
            o.length && a.push({ elem: s, handlers: o });
          }
      return (
        (s = this), c < t.length && a.push({ elem: s, handlers: t.slice(c) }), a
      );
    },
    addProp: function (e, t) {
      Object.defineProperty(b.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: p(t)
          ? function () {
              if (this.originalEvent) return t(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[e];
            },
        set: function (t) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t,
          });
        },
      });
    },
    fix: function (e) {
      return e[b.expando] ? e : new b.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (e) {
          var t = this || e;
          return (
            de.test(t.type) && t.click && S(t, "input") && Te(t, "click", _e),
            !1
          );
        },
        trigger: function (e) {
          var t = this || e;
          return (
            de.test(t.type) && t.click && S(t, "input") && Te(t, "click"), !0
          );
        },
        _default: function (e) {
          var t = e.target;
          return (
            (de.test(t.type) &&
              t.click &&
              S(t, "input") &&
              Y.get(t, "click")) ||
            S(t, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (b.removeEvent = function (e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n);
    }),
    (b.Event = function (e, t) {
      if (!(this instanceof b.Event)) return new b.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (void 0 === e.defaultPrevented && !1 === e.returnValue)
              ? _e
              : xe),
          (this.target =
            e.target && 3 === e.target.nodeType
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && b.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[b.expando] = !0);
    }),
    (b.Event.prototype = {
      constructor: b.Event,
      isDefaultPrevented: xe,
      isPropagationStopped: xe,
      isImmediatePropagationStopped: xe,
      isSimulated: !1,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = _e),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = _e),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = _e),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    b.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0,
      },
      b.event.addProp
    ),
    b.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
      b.event.special[e] = {
        setup: function () {
          return Te(this, e, ke), !1;
        },
        trigger: function () {
          return Te(this, e), !0;
        },
        _default: function () {
          return !0;
        },
        delegateType: t,
      };
    }),
    b.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, t) {
        b.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (e) {
            var n,
              r = this,
              i = e.relatedTarget,
              o = e.handleObj;
            return (
              (i && (i === r || b.contains(r, i))) ||
                ((e.type = o.origType),
                (n = o.handler.apply(this, arguments)),
                (e.type = t)),
              n
            );
          },
        };
      }
    ),
    b.fn.extend({
      on: function (e, t, n, r) {
        return je(this, e, t, n, r);
      },
      one: function (e, t, n, r) {
        return je(this, e, t, n, r, 1);
      },
      off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            b(e.delegateTarget).off(
              r.namespace ? r.origType + "." + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (i in e) this.off(i, t, e[i]);
          return this;
        }
        return (
          (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
          !1 === n && (n = xe),
          this.each(function () {
            b.event.remove(this, e, n, t);
          })
        );
      },
    });
  var Se = /<script|<style|<link/i,
    Ce = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Ee = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function qe(e, t) {
    return (
      (S(e, "table") &&
        S(11 !== t.nodeType ? t : t.firstChild, "tr") &&
        b(e).children("tbody")[0]) ||
      e
    );
  }
  function Ae(e) {
    return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
  }
  function De(e) {
    return (
      "true/" === (e.type || "").slice(0, 5)
        ? (e.type = e.type.slice(5))
        : e.removeAttribute("type"),
      e
    );
  }
  function Ne(e, t) {
    var n, r, i, o, u, a;
    if (1 === t.nodeType) {
      if (Y.hasData(e) && (a = Y.get(e).events))
        for (i in (Y.remove(t, "handle events"), a))
          for (n = 0, r = a[i].length; n < r; n++) b.event.add(t, i, a[i][n]);
      G.hasData(e) && ((o = G.access(e)), (u = b.extend({}, o)), G.set(t, u));
    }
  }
  function Oe(e, t) {
    var n = t.nodeName.toLowerCase();
    "input" === n && de.test(e.type)
      ? (t.checked = e.checked)
      : ("input" !== n && "textarea" !== n) ||
        (t.defaultValue = e.defaultValue);
  }
  function Me(e, t, n, r) {
    t = o(t);
    var i,
      u,
      a,
      c,
      s,
      f,
      l = 0,
      d = e.length,
      m = d - 1,
      v = t[0],
      g = p(v);
    if (g || (d > 1 && "string" == typeof v && !h.checkClone && Ce.test(v)))
      return e.each(function (i) {
        var o = e.eq(i);
        g && (t[0] = v.call(this, i, o.html())), Me(o, t, n, r);
      });
    if (
      d &&
      ((u = (i = we(t, e[0].ownerDocument, !1, e, r)).firstChild),
      1 === i.childNodes.length && (i = u),
      u || r)
    ) {
      for (c = (a = b.map(ve(i, "script"), Ae)).length; l < d; l++)
        (s = i),
          l !== m &&
            ((s = b.clone(s, !0, !0)), c && b.merge(a, ve(s, "script"))),
          n.call(e[l], s, l);
      if (c)
        for (f = a[a.length - 1].ownerDocument, b.map(a, De), l = 0; l < c; l++)
          (s = a[l]),
            pe.test(s.type || "") &&
              !Y.access(s, "globalEval") &&
              b.contains(f, s) &&
              (s.src && "module" !== (s.type || "").toLowerCase()
                ? b._evalUrl &&
                  !s.noModule &&
                  b._evalUrl(
                    s.src,
                    { nonce: s.nonce || s.getAttribute("nonce") },
                    f
                  )
                : y(s.textContent.replace(Ee, ""), s, f));
    }
    return e;
  }
  function Le(e, t, n) {
    for (var r, i = t ? b.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || b.cleanData(ve(r)),
        r.parentNode &&
          (n && re(r) && ge(ve(r, "script")), r.parentNode.removeChild(r));
    return e;
  }
  b.extend({
    htmlPrefilter: function (e) {
      return e;
    },
    clone: function (e, t, n) {
      var r,
        i,
        o,
        u,
        a = e.cloneNode(!0),
        c = re(e);
      if (
        !(
          h.noCloneChecked ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          b.isXMLDoc(e)
        )
      )
        for (u = ve(a), r = 0, i = (o = ve(e)).length; r < i; r++)
          Oe(o[r], u[r]);
      if (t)
        if (n)
          for (o = o || ve(e), u = u || ve(a), r = 0, i = o.length; r < i; r++)
            Ne(o[r], u[r]);
        else Ne(e, a);
      return (
        (u = ve(a, "script")).length > 0 && ge(u, !c && ve(e, "script")), a
      );
    },
    cleanData: function (e) {
      for (var t, n, r, i = b.event.special, o = 0; void 0 !== (n = e[o]); o++)
        if (V(n)) {
          if ((t = n[Y.expando])) {
            if (t.events)
              for (r in t.events)
                i[r] ? b.event.remove(n, r) : b.removeEvent(n, r, t.handle);
            n[Y.expando] = void 0;
          }
          n[G.expando] && (n[G.expando] = void 0);
        }
    },
  }),
    b.fn.extend({
      detach: function (e) {
        return Le(this, e, !0);
      },
      remove: function (e) {
        return Le(this, e);
      },
      text: function (e) {
        return z(
          this,
          function (e) {
            return void 0 === e
              ? b.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return Me(this, arguments, function (e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            qe(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return Me(this, arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = qe(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return Me(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return Me(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (b.cleanData(ve(e, !1)), (e.textContent = ""));
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return b.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return z(
          this,
          function (e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              "string" == typeof e &&
              !Se.test(e) &&
              !me[(he.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = b.htmlPrefilter(e);
              try {
                for (; n < r; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (b.cleanData(ve(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var e = [];
        return Me(
          this,
          arguments,
          function (t) {
            var n = this.parentNode;
            b.inArray(this, e) < 0 &&
              (b.cleanData(ve(this)), n && n.replaceChild(t, this));
          },
          e
        );
      },
    }),
    b.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, t) {
        b.fn[e] = function (e) {
          for (var n, r = [], i = b(e), o = i.length - 1, a = 0; a <= o; a++)
            (n = a === o ? this : this.clone(!0)),
              b(i[a])[t](n),
              u.apply(r, n.get());
          return this.pushStack(r);
        };
      }
    );
  var Re = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"),
    Be = function (t) {
      var n = t.ownerDocument.defaultView;
      return (n && n.opener) || (n = e), n.getComputedStyle(t);
    },
    He = function (e, t, n) {
      var r,
        i,
        o = {};
      for (i in t) (o[i] = e.style[i]), (e.style[i] = t[i]);
      for (i in ((r = n.call(e)), t)) e.style[i] = o[i];
      return r;
    },
    Ie = new RegExp(te.join("|"), "i");
  function Pe(e, t, n) {
    var r,
      i,
      o,
      u,
      a = e.style;
    return (
      (n = n || Be(e)) &&
        ("" !== (u = n.getPropertyValue(t) || n[t]) ||
          re(e) ||
          (u = b.style(e, t)),
        !h.pixelBoxStyles() &&
          Re.test(u) &&
          Ie.test(t) &&
          ((r = a.width),
          (i = a.minWidth),
          (o = a.maxWidth),
          (a.minWidth = a.maxWidth = a.width = u),
          (u = n.width),
          (a.width = r),
          (a.minWidth = i),
          (a.maxWidth = o))),
      void 0 !== u ? u + "" : u
    );
  }
  function ze(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function t() {
      if (f) {
        (s.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (f.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          ne.appendChild(s).appendChild(f);
        var t = e.getComputedStyle(f);
        (r = "1%" !== t.top),
          (c = 12 === n(t.marginLeft)),
          (f.style.right = "60%"),
          (u = 36 === n(t.right)),
          (i = 36 === n(t.width)),
          (f.style.position = "absolute"),
          (o = 12 === n(f.offsetWidth / 3)),
          ne.removeChild(s),
          (f = null);
      }
    }
    function n(e) {
      return Math.round(parseFloat(e));
    }
    var r,
      i,
      o,
      u,
      a,
      c,
      s = v.createElement("div"),
      f = v.createElement("div");
    f.style &&
      ((f.style.backgroundClip = "content-box"),
      (f.cloneNode(!0).style.backgroundClip = ""),
      (h.clearCloneStyle = "content-box" === f.style.backgroundClip),
      b.extend(h, {
        boxSizingReliable: function () {
          return t(), i;
        },
        pixelBoxStyles: function () {
          return t(), u;
        },
        pixelPosition: function () {
          return t(), r;
        },
        reliableMarginLeft: function () {
          return t(), c;
        },
        scrollboxSize: function () {
          return t(), o;
        },
        reliableTrDimensions: function () {
          var t, n, r, i;
          return (
            null == a &&
              ((t = v.createElement("table")),
              (n = v.createElement("tr")),
              (r = v.createElement("div")),
              (t.style.cssText =
                "position:absolute;left:-11111px;border-collapse:separate"),
              (n.style.cssText = "border:1px solid"),
              (n.style.height = "1px"),
              (r.style.height = "9px"),
              (r.style.display = "block"),
              ne.appendChild(t).appendChild(n).appendChild(r),
              (i = e.getComputedStyle(n)),
              (a =
                parseInt(i.height, 10) +
                  parseInt(i.borderTopWidth, 10) +
                  parseInt(i.borderBottomWidth, 10) ===
                n.offsetHeight),
              ne.removeChild(t)),
            a
          );
        },
      }));
  })();
  var Fe = ["Webkit", "Moz", "ms"],
    $e = v.createElement("div").style,
    We = {};
  function Ue(e) {
    var t = b.cssProps[e] || We[e];
    return (
      t ||
      (e in $e
        ? e
        : (We[e] =
            (function (e) {
              for (
                var t = e[0].toUpperCase() + e.slice(1), n = Fe.length;
                n--;

              )
                if ((e = Fe[n] + t) in $e) return e;
            })(e) || e))
    );
  }
  var Ve = /^(none|table(?!-c[ea]).+)/,
    Xe = /^--/,
    Ye = { position: "absolute", visibility: "hidden", display: "block" },
    Ge = { letterSpacing: "0", fontWeight: "400" };
  function Je(e, t, n) {
    var r = ee.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }
  function Qe(e, t, n, r, i, o) {
    var u = "width" === t ? 1 : 0,
      a = 0,
      c = 0;
    if (n === (r ? "border" : "content")) return 0;
    for (; u < 4; u += 2)
      "margin" === n && (c += b.css(e, n + te[u], !0, i)),
        r
          ? ("content" === n && (c -= b.css(e, "padding" + te[u], !0, i)),
            "margin" !== n &&
              (c -= b.css(e, "border" + te[u] + "Width", !0, i)))
          : ((c += b.css(e, "padding" + te[u], !0, i)),
            "padding" !== n
              ? (c += b.css(e, "border" + te[u] + "Width", !0, i))
              : (a += b.css(e, "border" + te[u] + "Width", !0, i)));
    return (
      !r &&
        o >= 0 &&
        (c +=
          Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - o - c - a - 0.5
            )
          ) || 0),
      c
    );
  }
  function Ke(e, t, n) {
    var r = Be(e),
      i =
        (!h.boxSizingReliable() || n) &&
        "border-box" === b.css(e, "boxSizing", !1, r),
      o = i,
      u = Pe(e, t, r),
      a = "offset" + t[0].toUpperCase() + t.slice(1);
    if (Re.test(u)) {
      if (!n) return u;
      u = "auto";
    }
    return (
      ((!h.boxSizingReliable() && i) ||
        (!h.reliableTrDimensions() && S(e, "tr")) ||
        "auto" === u ||
        (!parseFloat(u) && "inline" === b.css(e, "display", !1, r))) &&
        e.getClientRects().length &&
        ((i = "border-box" === b.css(e, "boxSizing", !1, r)),
        (o = a in e) && (u = e[a])),
      (u = parseFloat(u) || 0) +
        Qe(e, t, n || (i ? "border" : "content"), o, r, u) +
        "px"
    );
  }
  function Ze(e, t, n, r, i) {
    return new Ze.prototype.init(e, t, n, r, i);
  }
  b.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = Pe(e, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
          o,
          u,
          a = U(t),
          c = Xe.test(t),
          s = e.style;
        if (
          (c || (t = Ue(a)), (u = b.cssHooks[t] || b.cssHooks[a]), void 0 === n)
        )
          return u && "get" in u && void 0 !== (i = u.get(e, !1, r)) ? i : s[t];
        "string" === (o = typeof n) &&
          (i = ee.exec(n)) &&
          i[1] &&
          ((n = ue(e, t, i)), (o = "number")),
          null != n &&
            n == n &&
            ("number" !== o ||
              c ||
              (n += (i && i[3]) || (b.cssNumber[a] ? "" : "px")),
            h.clearCloneStyle ||
              "" !== n ||
              0 !== t.indexOf("background") ||
              (s[t] = "inherit"),
            (u && "set" in u && void 0 === (n = u.set(e, n, r))) ||
              (c ? s.setProperty(t, n) : (s[t] = n)));
      }
    },
    css: function (e, t, n, r) {
      var i,
        o,
        u,
        a = U(t);
      return (
        Xe.test(t) || (t = Ue(a)),
        (u = b.cssHooks[t] || b.cssHooks[a]) &&
          "get" in u &&
          (i = u.get(e, !0, n)),
        void 0 === i && (i = Pe(e, t, r)),
        "normal" === i && t in Ge && (i = Ge[t]),
        "" === n || n
          ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
          : i
      );
    },
  }),
    b.each(["height", "width"], function (e, t) {
      b.cssHooks[t] = {
        get: function (e, n, r) {
          if (n)
            return !Ve.test(b.css(e, "display")) ||
              (e.getClientRects().length && e.getBoundingClientRect().width)
              ? Ke(e, t, r)
              : He(e, Ye, function () {
                  return Ke(e, t, r);
                });
        },
        set: function (e, n, r) {
          var i,
            o = Be(e),
            u = !h.scrollboxSize() && "absolute" === o.position,
            a = (u || r) && "border-box" === b.css(e, "boxSizing", !1, o),
            c = r ? Qe(e, t, r, a, o) : 0;
          return (
            a &&
              u &&
              (c -= Math.ceil(
                e["offset" + t[0].toUpperCase() + t.slice(1)] -
                  parseFloat(o[t]) -
                  Qe(e, t, "border", !1, o) -
                  0.5
              )),
            c &&
              (i = ee.exec(n)) &&
              "px" !== (i[3] || "px") &&
              ((e.style[t] = n), (n = b.css(e, t))),
            Je(0, n, c)
          );
        },
      };
    }),
    (b.cssHooks.marginLeft = ze(h.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(Pe(e, "marginLeft")) ||
            e.getBoundingClientRect().left -
              He(e, { marginLeft: 0 }, function () {
                return e.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    b.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      (b.cssHooks[e + t] = {
        expand: function (n) {
          for (
            var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n];
            r < 4;
            r++
          )
            i[e + te[r] + t] = o[r] || o[r - 2] || o[0];
          return i;
        },
      }),
        "margin" !== e && (b.cssHooks[e + t].set = Je);
    }),
    b.fn.extend({
      css: function (e, t) {
        return z(
          this,
          function (e, t, n) {
            var r,
              i,
              o = {},
              u = 0;
            if (Array.isArray(t)) {
              for (r = Be(e), i = t.length; u < i; u++)
                o[t[u]] = b.css(e, t[u], !1, r);
              return o;
            }
            return void 0 !== n ? b.style(e, t, n) : b.css(e, t);
          },
          e,
          t,
          arguments.length > 1
        );
      },
    }),
    (b.Tween = Ze),
    (Ze.prototype = {
      constructor: Ze,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || b.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (b.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = Ze.propHooks[this.prop];
        return e && e.get ? e.get(this) : Ze.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = Ze.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t = b.easing[this.easing](
                e,
                this.options.duration * e,
                0,
                1,
                this.options.duration
              ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : Ze.propHooks._default.set(this),
          this
        );
      },
    }),
    (Ze.prototype.init.prototype = Ze.prototype),
    (Ze.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return 1 !== e.elem.nodeType ||
            (null != e.elem[e.prop] && null == e.elem.style[e.prop])
            ? e.elem[e.prop]
            : (t = b.css(e.elem, e.prop, "")) && "auto" !== t
            ? t
            : 0;
        },
        set: function (e) {
          b.fx.step[e.prop]
            ? b.fx.step[e.prop](e)
            : 1 !== e.elem.nodeType ||
              (!b.cssHooks[e.prop] && null == e.elem.style[Ue(e.prop)])
            ? (e.elem[e.prop] = e.now)
            : b.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }),
    (Ze.propHooks.scrollTop = Ze.propHooks.scrollLeft = {
      set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
      },
    }),
    (b.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (b.fx = Ze.prototype.init),
    (b.fx.step = {});
  var et,
    tt,
    nt = /^(?:toggle|show|hide)$/,
    rt = /queueHooks$/;
  function it() {
    tt &&
      (!1 === v.hidden && e.requestAnimationFrame
        ? e.requestAnimationFrame(it)
        : e.setTimeout(it, b.fx.interval),
      b.fx.tick());
  }
  function ot() {
    return (
      e.setTimeout(function () {
        et = void 0;
      }),
      (et = Date.now())
    );
  }
  function ut(e, t) {
    var n,
      r = 0,
      i = { height: e };
    for (t = t ? 1 : 0; r < 4; r += 2 - t)
      i["margin" + (n = te[r])] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function at(e, t, n) {
    for (
      var r,
        i = (ct.tweeners[t] || []).concat(ct.tweeners["*"]),
        o = 0,
        u = i.length;
      o < u;
      o++
    )
      if ((r = i[o].call(n, t, e))) return r;
  }
  function ct(e, t, n) {
    var r,
      i,
      o = 0,
      u = ct.prefilters.length,
      a = b.Deferred().always(function () {
        delete c.elem;
      }),
      c = function () {
        if (i) return !1;
        for (
          var t = et || ot(),
            n = Math.max(0, s.startTime + s.duration - t),
            r = 1 - (n / s.duration || 0),
            o = 0,
            u = s.tweens.length;
          o < u;
          o++
        )
          s.tweens[o].run(r);
        return (
          a.notifyWith(e, [s, r, n]),
          r < 1 && u
            ? n
            : (u || a.notifyWith(e, [s, 1, 0]), a.resolveWith(e, [s]), !1)
        );
      },
      s = a.promise({
        elem: e,
        props: b.extend({}, t),
        opts: b.extend(!0, { specialEasing: {}, easing: b.easing._default }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: et || ot(),
        duration: n.duration,
        tweens: [],
        createTween: function (t, n) {
          var r = b.Tween(
            e,
            s.opts,
            t,
            n,
            s.opts.specialEasing[t] || s.opts.easing
          );
          return s.tweens.push(r), r;
        },
        stop: function (t) {
          var n = 0,
            r = t ? s.tweens.length : 0;
          if (i) return this;
          for (i = !0; n < r; n++) s.tweens[n].run(1);
          return (
            t
              ? (a.notifyWith(e, [s, 1, 0]), a.resolveWith(e, [s, t]))
              : a.rejectWith(e, [s, t]),
            this
          );
        },
      }),
      f = s.props;
    for (
      !(function (e, t) {
        var n, r, i, o, u;
        for (n in e)
          if (
            ((i = t[(r = U(n))]),
            (o = e[n]),
            Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
            n !== r && ((e[r] = o), delete e[n]),
            (u = b.cssHooks[r]) && ("expand" in u))
          )
            for (n in ((o = u.expand(o)), delete e[r], o))
              (n in e) || ((e[n] = o[n]), (t[n] = i));
          else t[r] = i;
      })(f, s.opts.specialEasing);
      o < u;
      o++
    )
      if ((r = ct.prefilters[o].call(s, e, f, s.opts)))
        return (
          p(r.stop) &&
            (b._queueHooks(s.elem, s.opts.queue).stop = r.stop.bind(r)),
          r
        );
    return (
      b.map(f, at, s),
      p(s.opts.start) && s.opts.start.call(e, s),
      s
        .progress(s.opts.progress)
        .done(s.opts.done, s.opts.complete)
        .fail(s.opts.fail)
        .always(s.opts.always),
      b.fx.timer(b.extend(c, { elem: e, anim: s, queue: s.opts.queue })),
      s
    );
  }
  (b.Animation = b.extend(ct, {
    tweeners: {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t);
          return ue(n.elem, e, ee.exec(t), n), n;
        },
      ],
    },
    tweener: function (e, t) {
      p(e) ? ((t = e), (e = ["*"])) : (e = e.match(M));
      for (var n, r = 0, i = e.length; r < i; r++)
        (n = e[r]),
          (ct.tweeners[n] = ct.tweeners[n] || []),
          ct.tweeners[n].unshift(t);
    },
    prefilters: [
      function (e, t, n) {
        var r,
          i,
          o,
          u,
          a,
          c,
          s,
          f,
          l = "width" in t || "height" in t,
          d = this,
          h = {},
          p = e.style,
          m = e.nodeType && oe(e),
          v = Y.get(e, "fxshow");
        for (r in (n.queue ||
          (null == (u = b._queueHooks(e, "fx")).unqueued &&
            ((u.unqueued = 0),
            (a = u.empty.fire),
            (u.empty.fire = function () {
              u.unqueued || a();
            })),
          u.unqueued++,
          d.always(function () {
            d.always(function () {
              u.unqueued--, b.queue(e, "fx").length || u.empty.fire();
            });
          })),
        t))
          if (((i = t[r]), nt.test(i))) {
            if (
              (delete t[r],
              (o = o || "toggle" === i),
              i === (m ? "hide" : "show"))
            ) {
              if ("show" !== i || !v || void 0 === v[r]) continue;
              m = !0;
            }
            h[r] = (v && v[r]) || b.style(e, r);
          }
        if ((c = !b.isEmptyObject(t)) || !b.isEmptyObject(h))
          for (r in (l &&
            1 === e.nodeType &&
            ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
            null == (s = v && v.display) && (s = Y.get(e, "display")),
            "none" === (f = b.css(e, "display")) &&
              (s
                ? (f = s)
                : (se([e], !0),
                  (s = e.style.display || s),
                  (f = b.css(e, "display")),
                  se([e]))),
            ("inline" === f || ("inline-block" === f && null != s)) &&
              "none" === b.css(e, "float") &&
              (c ||
                (d.done(function () {
                  p.display = s;
                }),
                null == s && ((f = p.display), (s = "none" === f ? "" : f))),
              (p.display = "inline-block"))),
          n.overflow &&
            ((p.overflow = "hidden"),
            d.always(function () {
              (p.overflow = n.overflow[0]),
                (p.overflowX = n.overflow[1]),
                (p.overflowY = n.overflow[2]);
            })),
          (c = !1),
          h))
            c ||
              (v
                ? "hidden" in v && (m = v.hidden)
                : (v = Y.access(e, "fxshow", { display: s })),
              o && (v.hidden = !m),
              m && se([e], !0),
              d.done(function () {
                for (r in (m || se([e]), Y.remove(e, "fxshow"), h))
                  b.style(e, r, h[r]);
              })),
              (c = at(m ? v[r] : 0, r, d)),
              r in v ||
                ((v[r] = c.start), m && ((c.end = c.start), (c.start = 0)));
      },
    ],
    prefilter: function (e, t) {
      t ? ct.prefilters.unshift(e) : ct.prefilters.push(e);
    },
  })),
    (b.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? b.extend({}, e)
          : {
              complete: n || (!n && t) || (p(e) && e),
              duration: e,
              easing: (n && t) || (t && !p(t) && t),
            };
      return (
        b.fx.off
          ? (r.duration = 0)
          : "number" != typeof r.duration &&
            (r.duration in b.fx.speeds
              ? (r.duration = b.fx.speeds[r.duration])
              : (r.duration = b.fx.speeds._default)),
        (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          p(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue);
        }),
        r
      );
    }),
    b.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(oe)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (e, t, n, r) {
        var i = b.isEmptyObject(e),
          o = b.speed(t, n, r),
          u = function () {
            var t = ct(this, b.extend({}, e), o);
            (i || Y.get(this, "finish")) && t.stop(!0);
          };
        return (
          (u.finish = u),
          i || !1 === o.queue ? this.each(u) : this.queue(o.queue, u)
        );
      },
      stop: function (e, t, n) {
        var r = function (e) {
          var t = e.stop;
          delete e.stop, t(n);
        };
        return (
          "string" != typeof e && ((n = t), (t = e), (e = void 0)),
          t && this.queue(e || "fx", []),
          this.each(function () {
            var t = !0,
              i = null != e && e + "queueHooks",
              o = b.timers,
              u = Y.get(this);
            if (i) u[i] && u[i].stop && r(u[i]);
            else for (i in u) u[i] && u[i].stop && rt.test(i) && r(u[i]);
            for (i = o.length; i--; )
              o[i].elem !== this ||
                (null != e && o[i].queue !== e) ||
                (o[i].anim.stop(n), (t = !1), o.splice(i, 1));
            (!t && n) || b.dequeue(this, e);
          })
        );
      },
      finish: function (e) {
        return (
          !1 !== e && (e = e || "fx"),
          this.each(function () {
            var t,
              n = Y.get(this),
              r = n[e + "queue"],
              i = n[e + "queueHooks"],
              o = b.timers,
              u = r ? r.length : 0;
            for (
              n.finish = !0,
                b.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = o.length;
              t--;

            )
              o[t].elem === this &&
                o[t].queue === e &&
                (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; t < u; t++)
              r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish;
          })
        );
      },
    }),
    b.each(["toggle", "show", "hide"], function (e, t) {
      var n = b.fn[t];
      b.fn[t] = function (e, r, i) {
        return null == e || "boolean" == typeof e
          ? n.apply(this, arguments)
          : this.animate(ut(t, !0), e, r, i);
      };
    }),
    b.each(
      {
        slideDown: ut("show"),
        slideUp: ut("hide"),
        slideToggle: ut("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, t) {
        b.fn[e] = function (e, n, r) {
          return this.animate(t, e, n, r);
        };
      }
    ),
    (b.timers = []),
    (b.fx.tick = function () {
      var e,
        t = 0,
        n = b.timers;
      for (et = Date.now(); t < n.length; t++)
        (e = n[t])() || n[t] !== e || n.splice(t--, 1);
      n.length || b.fx.stop(), (et = void 0);
    }),
    (b.fx.timer = function (e) {
      b.timers.push(e), b.fx.start();
    }),
    (b.fx.interval = 13),
    (b.fx.start = function () {
      tt || ((tt = !0), it());
    }),
    (b.fx.stop = function () {
      tt = null;
    }),
    (b.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (b.fn.delay = function (t, n) {
      return (
        (t = (b.fx && b.fx.speeds[t]) || t),
        (n = n || "fx"),
        this.queue(n, function (n, r) {
          var i = e.setTimeout(n, t);
          r.stop = function () {
            e.clearTimeout(i);
          };
        })
      );
    }),
    (function () {
      var e = v.createElement("input"),
        t = v.createElement("select").appendChild(v.createElement("option"));
      (e.type = "checkbox"),
        (h.checkOn = "" !== e.value),
        (h.optSelected = t.selected),
        ((e = v.createElement("input")).value = "t"),
        (e.type = "radio"),
        (h.radioValue = "t" === e.value);
    })();
  var st,
    ft = b.expr.attrHandle;
  b.fn.extend({
    attr: function (e, t) {
      return z(this, b.attr, e, t, arguments.length > 1);
    },
    removeAttr: function (e) {
      return this.each(function () {
        b.removeAttr(this, e);
      });
    },
  }),
    b.extend({
      attr: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return void 0 === e.getAttribute
            ? b.prop(e, t, n)
            : ((1 === o && b.isXMLDoc(e)) ||
                (i =
                  b.attrHooks[t.toLowerCase()] ||
                  (b.expr.match.bool.test(t) ? st : void 0)),
              void 0 !== n
                ? null === n
                  ? void b.removeAttr(e, t)
                  : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e.setAttribute(t, n + ""), n)
                : i && "get" in i && null !== (r = i.get(e, t))
                ? r
                : null == (r = b.find.attr(e, t))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!h.radioValue && "radio" === t && S(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var n,
          r = 0,
          i = t && t.match(M);
        if (i && 1 === e.nodeType) for (; (n = i[r++]); ) e.removeAttribute(n);
      },
    }),
    (st = {
      set: function (e, t, n) {
        return !1 === t ? b.removeAttr(e, n) : e.setAttribute(n, n), n;
      },
    }),
    b.each(b.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var n = ft[t] || b.find.attr;
      ft[t] = function (e, t, r) {
        var i,
          o,
          u = t.toLowerCase();
        return (
          r ||
            ((o = ft[u]),
            (ft[u] = i),
            (i = null != n(e, t, r) ? u : null),
            (ft[u] = o)),
          i
        );
      };
    });
  var lt = /^(?:input|select|textarea|button)$/i,
    dt = /^(?:a|area)$/i;
  function ht(e) {
    return (e.match(M) || []).join(" ");
  }
  function pt(e) {
    return (e.getAttribute && e.getAttribute("class")) || "";
  }
  function mt(e) {
    return Array.isArray(e) ? e : ("string" == typeof e && e.match(M)) || [];
  }
  b.fn.extend({
    prop: function (e, t) {
      return z(this, b.prop, e, t, arguments.length > 1);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[b.propFix[e] || e];
      });
    },
  }),
    b.extend({
      prop: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && b.isXMLDoc(e)) ||
              ((t = b.propFix[t] || t), (i = b.propHooks[t])),
            void 0 !== n
              ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                ? r
                : (e[t] = n)
              : i && "get" in i && null !== (r = i.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = b.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : lt.test(e.nodeName) || (dt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    h.optSelected ||
      (b.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    b.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        b.propFix[this.toLowerCase()] = this;
      }
    ),
    b.fn.extend({
      addClass: function (e) {
        var t,
          n,
          r,
          i,
          o,
          u,
          a,
          c = 0;
        if (p(e))
          return this.each(function (t) {
            b(this).addClass(e.call(this, t, pt(this)));
          });
        if ((t = mt(e)).length)
          for (; (n = this[c++]); )
            if (((i = pt(n)), (r = 1 === n.nodeType && " " + ht(i) + " "))) {
              for (u = 0; (o = t[u++]); )
                r.indexOf(" " + o + " ") < 0 && (r += o + " ");
              i !== (a = ht(r)) && n.setAttribute("class", a);
            }
        return this;
      },
      removeClass: function (e) {
        var t,
          n,
          r,
          i,
          o,
          u,
          a,
          c = 0;
        if (p(e))
          return this.each(function (t) {
            b(this).removeClass(e.call(this, t, pt(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ((t = mt(e)).length)
          for (; (n = this[c++]); )
            if (((i = pt(n)), (r = 1 === n.nodeType && " " + ht(i) + " "))) {
              for (u = 0; (o = t[u++]); )
                for (; r.indexOf(" " + o + " ") > -1; )
                  r = r.replace(" " + o + " ", " ");
              i !== (a = ht(r)) && n.setAttribute("class", a);
            }
        return this;
      },
      toggleClass: function (e, t) {
        var n = typeof e,
          r = "string" === n || Array.isArray(e);
        return "boolean" == typeof t && r
          ? t
            ? this.addClass(e)
            : this.removeClass(e)
          : p(e)
          ? this.each(function (n) {
              b(this).toggleClass(e.call(this, n, pt(this), t), t);
            })
          : this.each(function () {
              var t, i, o, u;
              if (r)
                for (i = 0, o = b(this), u = mt(e); (t = u[i++]); )
                  o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
              else
                (void 0 !== e && "boolean" !== n) ||
                  ((t = pt(this)) && Y.set(this, "__className__", t),
                  this.setAttribute &&
                    this.setAttribute(
                      "class",
                      t || !1 === e ? "" : Y.get(this, "__className__") || ""
                    ));
            });
      },
      hasClass: function (e) {
        var t,
          n,
          r = 0;
        for (t = " " + e + " "; (n = this[r++]); )
          if (1 === n.nodeType && (" " + ht(pt(n)) + " ").indexOf(t) > -1)
            return !0;
        return !1;
      },
    });
  var vt = /\r/g;
  b.fn.extend({
    val: function (e) {
      var t,
        n,
        r,
        i = this[0];
      return arguments.length
        ? ((r = p(e)),
          this.each(function (n) {
            var i;
            1 === this.nodeType &&
              (null == (i = r ? e.call(this, n, b(this).val()) : e)
                ? (i = "")
                : "number" == typeof i
                ? (i += "")
                : Array.isArray(i) &&
                  (i = b.map(i, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((t =
                b.valHooks[this.type] ||
                b.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in t &&
                void 0 !== t.set(this, i, "value")) ||
                (this.value = i));
          }))
        : i
        ? (t = b.valHooks[i.type] || b.valHooks[i.nodeName.toLowerCase()]) &&
          "get" in t &&
          void 0 !== (n = t.get(i, "value"))
          ? n
          : "string" == typeof (n = i.value)
          ? n.replace(vt, "")
          : null == n
          ? ""
          : n
        : void 0;
    },
  }),
    b.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = b.find.attr(e, "value");
            return null != t ? t : ht(b.text(e));
          },
        },
        select: {
          get: function (e) {
            var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              u = "select-one" === e.type,
              a = u ? null : [],
              c = u ? o + 1 : i.length;
            for (r = o < 0 ? c : u ? o : 0; r < c; r++)
              if (
                ((n = i[r]).selected || r === o) &&
                !n.disabled &&
                (!n.parentNode.disabled || !S(n.parentNode, "optgroup"))
              ) {
                if (((t = b(n).val()), u)) return t;
                a.push(t);
              }
            return a;
          },
          set: function (e, t) {
            for (
              var n, r, i = e.options, o = b.makeArray(t), u = i.length;
              u--;

            )
              ((r = i[u]).selected =
                b.inArray(b.valHooks.option.get(r), o) > -1) && (n = !0);
            return n || (e.selectedIndex = -1), o;
          },
        },
      },
    }),
    b.each(["radio", "checkbox"], function () {
      (b.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t))
            return (e.checked = b.inArray(b(e).val(), t) > -1);
        },
      }),
        h.checkOn ||
          (b.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    }),
    (h.focusin = "onfocusin" in e);
  var gt = /^(?:focusinfocus|focusoutblur)$/,
    yt = function (e) {
      e.stopPropagation();
    };
  b.extend(b.event, {
    trigger: function (t, n, r, i) {
      var o,
        u,
        a,
        c,
        s,
        l,
        d,
        h,
        g = [r || v],
        y = f.call(t, "type") ? t.type : t,
        w = f.call(t, "namespace") ? t.namespace.split(".") : [];
      if (
        ((u = h = a = r = r || v),
        3 !== r.nodeType &&
          8 !== r.nodeType &&
          !gt.test(y + b.event.triggered) &&
          (y.indexOf(".") > -1 &&
            ((w = y.split(".")), (y = w.shift()), w.sort()),
          (s = y.indexOf(":") < 0 && "on" + y),
          ((t = t[b.expando]
            ? t
            : new b.Event(y, "object" == typeof t && t)).isTrigger = i ? 2 : 3),
          (t.namespace = w.join(".")),
          (t.rnamespace = t.namespace
            ? new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (t.result = void 0),
          t.target || (t.target = r),
          (n = null == n ? [t] : b.makeArray(n, [t])),
          (d = b.event.special[y] || {}),
          i || !d.trigger || !1 !== d.trigger.apply(r, n)))
      ) {
        if (!i && !d.noBubble && !m(r)) {
          for (
            c = d.delegateType || y, gt.test(c + y) || (u = u.parentNode);
            u;
            u = u.parentNode
          )
            g.push(u), (a = u);
          a === (r.ownerDocument || v) &&
            g.push(a.defaultView || a.parentWindow || e);
        }
        for (o = 0; (u = g[o++]) && !t.isPropagationStopped(); )
          (h = u),
            (t.type = o > 1 ? c : d.bindType || y),
            (l =
              (Y.get(u, "events") || Object.create(null))[t.type] &&
              Y.get(u, "handle")) && l.apply(u, n),
            (l = s && u[s]) &&
              l.apply &&
              V(u) &&
              ((t.result = l.apply(u, n)),
              !1 === t.result && t.preventDefault());
        return (
          (t.type = y),
          i ||
            t.isDefaultPrevented() ||
            (d._default && !1 !== d._default.apply(g.pop(), n)) ||
            !V(r) ||
            (s &&
              p(r[y]) &&
              !m(r) &&
              ((a = r[s]) && (r[s] = null),
              (b.event.triggered = y),
              t.isPropagationStopped() && h.addEventListener(y, yt),
              r[y](),
              t.isPropagationStopped() && h.removeEventListener(y, yt),
              (b.event.triggered = void 0),
              a && (r[s] = a))),
          t.result
        );
      }
    },
    simulate: function (e, t, n) {
      var r = b.extend(new b.Event(), n, { type: e, isSimulated: !0 });
      b.event.trigger(r, null, t);
    },
  }),
    b.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          b.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        if (n) return b.event.trigger(e, t, n, !0);
      },
    }),
    h.focusin ||
      b.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var n = function (e) {
          b.event.simulate(t, e.target, b.event.fix(e));
        };
        b.event.special[t] = {
          setup: function () {
            var r = this.ownerDocument || this.document || this,
              i = Y.access(r, t);
            i || r.addEventListener(e, n, !0), Y.access(r, t, (i || 0) + 1);
          },
          teardown: function () {
            var r = this.ownerDocument || this.document || this,
              i = Y.access(r, t) - 1;
            i
              ? Y.access(r, t, i)
              : (r.removeEventListener(e, n, !0), Y.remove(r, t));
          },
        };
      });
  var wt = e.location,
    bt = { guid: Date.now() },
    _t = /\?/;
  b.parseXML = function (t) {
    var n, r;
    if (!t || "string" != typeof t) return null;
    try {
      n = new e.DOMParser().parseFromString(t, "text/xml");
    } catch (e) {}
    return (
      (r = n && n.getElementsByTagName("parsererror")[0]),
      (n && !r) ||
        b.error(
          "Invalid XML: " +
            (r
              ? b
                  .map(r.childNodes, function (e) {
                    return e.textContent;
                  })
                  .join("\n")
              : t)
        ),
      n
    );
  };
  var xt = /\[\]$/,
    kt = /\r?\n/g,
    jt = /^(?:submit|button|image|reset|file)$/i,
    Tt = /^(?:input|select|textarea|keygen)/i;
  function St(e, t, n, r) {
    var i;
    if (Array.isArray(t))
      b.each(t, function (t, i) {
        n || xt.test(e)
          ? r(e, i)
          : St(
              e + "[" + ("object" == typeof i && null != i ? t : "") + "]",
              i,
              n,
              r
            );
      });
    else if (n || "object" !== w(t)) r(e, t);
    else for (i in t) St(e + "[" + i + "]", t[i], n, r);
  }
  (b.param = function (e, t) {
    var n,
      r = [],
      i = function (e, t) {
        var n = p(t) ? t() : t;
        r[r.length] =
          encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
      };
    if (null == e) return "";
    if (Array.isArray(e) || (e.jquery && !b.isPlainObject(e)))
      b.each(e, function () {
        i(this.name, this.value);
      });
    else for (n in e) St(n, e[n], t, i);
    return r.join("&");
  }),
    b.fn.extend({
      serialize: function () {
        return b.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = b.prop(this, "elements");
          return e ? b.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !b(this).is(":disabled") &&
              Tt.test(this.nodeName) &&
              !jt.test(e) &&
              (this.checked || !de.test(e))
            );
          })
          .map(function (e, t) {
            var n = b(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? b.map(n, function (e) {
                  return { name: t.name, value: e.replace(kt, "\r\n") };
                })
              : { name: t.name, value: n.replace(kt, "\r\n") };
          })
          .get();
      },
    });
  var Ct = /%20/g,
    Et = /#.*$/,
    qt = /([?&])_=[^&]*/,
    At = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Dt = /^(?:GET|HEAD)$/,
    Nt = /^\/\//,
    Ot = {},
    Mt = {},
    Lt = "*/".concat("*"),
    Rt = v.createElement("a");
  function Bt(e) {
    return function (t, n) {
      "string" != typeof t && ((n = t), (t = "*"));
      var r,
        i = 0,
        o = t.toLowerCase().match(M) || [];
      if (p(n))
        for (; (r = o[i++]); )
          "+" === r[0]
            ? ((r = r.slice(1) || "*"), (e[r] = e[r] || []).unshift(n))
            : (e[r] = e[r] || []).push(n);
    };
  }
  function Ht(e, t, n, r) {
    var i = {},
      o = e === Mt;
    function u(a) {
      var c;
      return (
        (i[a] = !0),
        b.each(e[a] || [], function (e, a) {
          var s = a(t, n, r);
          return "string" != typeof s || o || i[s]
            ? o
              ? !(c = s)
              : void 0
            : (t.dataTypes.unshift(s), u(s), !1);
        }),
        c
      );
    }
    return u(t.dataTypes[0]) || (!i["*"] && u("*"));
  }
  function It(e, t) {
    var n,
      r,
      i = b.ajaxSettings.flatOptions || {};
    for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && b.extend(!0, e, r), e;
  }
  (Rt.href = wt.href),
    b.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: wt.href,
        type: "GET",
        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
          wt.protocol
        ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Lt,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": b.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? It(It(e, b.ajaxSettings), t) : It(b.ajaxSettings, e);
      },
      ajaxPrefilter: Bt(Ot),
      ajaxTransport: Bt(Mt),
      ajax: function (t, n) {
        "object" == typeof t && ((n = t), (t = void 0)), (n = n || {});
        var r,
          i,
          o,
          u,
          a,
          c,
          s,
          f,
          l,
          d,
          h = b.ajaxSetup({}, n),
          p = h.context || h,
          m = h.context && (p.nodeType || p.jquery) ? b(p) : b.event,
          g = b.Deferred(),
          y = b.Callbacks("once memory"),
          w = h.statusCode || {},
          _ = {},
          x = {},
          k = "canceled",
          j = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (s) {
                if (!u)
                  for (u = {}; (t = At.exec(o)); )
                    u[t[1].toLowerCase() + " "] = (
                      u[t[1].toLowerCase() + " "] || []
                    ).concat(t[2]);
                t = u[e.toLowerCase() + " "];
              }
              return null == t ? null : t.join(", ");
            },
            getAllResponseHeaders: function () {
              return s ? o : null;
            },
            setRequestHeader: function (e, t) {
              return (
                null == s &&
                  ((e = x[e.toLowerCase()] = x[e.toLowerCase()] || e),
                  (_[e] = t)),
                this
              );
            },
            overrideMimeType: function (e) {
              return null == s && (h.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (s) j.always(e[j.status]);
                else for (t in e) w[t] = [w[t], e[t]];
              return this;
            },
            abort: function (e) {
              var t = e || k;
              return r && r.abort(t), T(0, t), this;
            },
          };
        if (
          (g.promise(j),
          (h.url = ((t || h.url || wt.href) + "").replace(
            Nt,
            wt.protocol + "//"
          )),
          (h.type = n.method || n.type || h.method || h.type),
          (h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""]),
          null == h.crossDomain)
        ) {
          c = v.createElement("a");
          try {
            (c.href = h.url),
              (c.href = c.href),
              (h.crossDomain =
                Rt.protocol + "//" + Rt.host != c.protocol + "//" + c.host);
          } catch (e) {
            h.crossDomain = !0;
          }
        }
        if (
          (h.data &&
            h.processData &&
            "string" != typeof h.data &&
            (h.data = b.param(h.data, h.traditional)),
          Ht(Ot, h, n, j),
          s)
        )
          return j;
        for (l in ((f = b.event && h.global) &&
          0 == b.active++ &&
          b.event.trigger("ajaxStart"),
        (h.type = h.type.toUpperCase()),
        (h.hasContent = !Dt.test(h.type)),
        (i = h.url.replace(Et, "")),
        h.hasContent
          ? h.data &&
            h.processData &&
            0 ===
              (h.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            (h.data = h.data.replace(Ct, "+"))
          : ((d = h.url.slice(i.length)),
            h.data &&
              (h.processData || "string" == typeof h.data) &&
              ((i += (_t.test(i) ? "&" : "?") + h.data), delete h.data),
            !1 === h.cache &&
              ((i = i.replace(qt, "$1")),
              (d = (_t.test(i) ? "&" : "?") + "_=" + bt.guid++ + d)),
            (h.url = i + d)),
        h.ifModified &&
          (b.lastModified[i] &&
            j.setRequestHeader("If-Modified-Since", b.lastModified[i]),
          b.etag[i] && j.setRequestHeader("If-None-Match", b.etag[i])),
        ((h.data && h.hasContent && !1 !== h.contentType) || n.contentType) &&
          j.setRequestHeader("Content-Type", h.contentType),
        j.setRequestHeader(
          "Accept",
          h.dataTypes[0] && h.accepts[h.dataTypes[0]]
            ? h.accepts[h.dataTypes[0]] +
                ("*" !== h.dataTypes[0] ? ", " + Lt + "; q=0.01" : "")
            : h.accepts["*"]
        ),
        h.headers))
          j.setRequestHeader(l, h.headers[l]);
        if (h.beforeSend && (!1 === h.beforeSend.call(p, j, h) || s))
          return j.abort();
        if (
          ((k = "abort"),
          y.add(h.complete),
          j.done(h.success),
          j.fail(h.error),
          (r = Ht(Mt, h, n, j)))
        ) {
          if (((j.readyState = 1), f && m.trigger("ajaxSend", [j, h]), s))
            return j;
          h.async &&
            h.timeout > 0 &&
            (a = e.setTimeout(function () {
              j.abort("timeout");
            }, h.timeout));
          try {
            (s = !1), r.send(_, T);
          } catch (e) {
            if (s) throw e;
            T(-1, e);
          }
        } else T(-1, "No Transport");
        function T(t, n, u, c) {
          var l,
            d,
            v,
            _,
            x,
            k = n;
          s ||
            ((s = !0),
            a && e.clearTimeout(a),
            (r = void 0),
            (o = c || ""),
            (j.readyState = t > 0 ? 4 : 0),
            (l = (t >= 200 && t < 300) || 304 === t),
            u &&
              (_ = (function (e, t, n) {
                for (
                  var r, i, o, u, a = e.contents, c = e.dataTypes;
                  "*" === c[0];

                )
                  c.shift(),
                    void 0 === r &&
                      (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                  for (i in a)
                    if (a[i] && a[i].test(r)) {
                      c.unshift(i);
                      break;
                    }
                if (c[0] in n) o = c[0];
                else {
                  for (i in n) {
                    if (!c[0] || e.converters[i + " " + c[0]]) {
                      o = i;
                      break;
                    }
                    u || (u = i);
                  }
                  o = o || u;
                }
                if (o) return o !== c[0] && c.unshift(o), n[o];
              })(h, j, u)),
            !l &&
              b.inArray("script", h.dataTypes) > -1 &&
              b.inArray("json", h.dataTypes) < 0 &&
              (h.converters["text script"] = function () {}),
            (_ = (function (e, t, n, r) {
              var i,
                o,
                u,
                a,
                c,
                s = {},
                f = e.dataTypes.slice();
              if (f[1])
                for (u in e.converters) s[u.toLowerCase()] = e.converters[u];
              for (o = f.shift(); o; )
                if (
                  (e.responseFields[o] && (n[e.responseFields[o]] = t),
                  !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                  (c = o),
                  (o = f.shift()))
                )
                  if ("*" === o) o = c;
                  else if ("*" !== c && c !== o) {
                    if (!(u = s[c + " " + o] || s["* " + o]))
                      for (i in s)
                        if (
                          (a = i.split(" "))[1] === o &&
                          (u = s[c + " " + a[0]] || s["* " + a[0]])
                        ) {
                          !0 === u
                            ? (u = s[i])
                            : !0 !== s[i] && ((o = a[0]), f.unshift(a[1]));
                          break;
                        }
                    if (!0 !== u)
                      if (u && e.throws) t = u(t);
                      else
                        try {
                          t = u(t);
                        } catch (e) {
                          return {
                            state: "parsererror",
                            error: u
                              ? e
                              : "No conversion from " + c + " to " + o,
                          };
                        }
                  }
              return { state: "success", data: t };
            })(h, _, j, l)),
            l
              ? (h.ifModified &&
                  ((x = j.getResponseHeader("Last-Modified")) &&
                    (b.lastModified[i] = x),
                  (x = j.getResponseHeader("etag")) && (b.etag[i] = x)),
                204 === t || "HEAD" === h.type
                  ? (k = "nocontent")
                  : 304 === t
                  ? (k = "notmodified")
                  : ((k = _.state), (d = _.data), (l = !(v = _.error))))
              : ((v = k), (!t && k) || ((k = "error"), t < 0 && (t = 0))),
            (j.status = t),
            (j.statusText = (n || k) + ""),
            l ? g.resolveWith(p, [d, k, j]) : g.rejectWith(p, [j, k, v]),
            j.statusCode(w),
            (w = void 0),
            f && m.trigger(l ? "ajaxSuccess" : "ajaxError", [j, h, l ? d : v]),
            y.fireWith(p, [j, k]),
            f &&
              (m.trigger("ajaxComplete", [j, h]),
              --b.active || b.event.trigger("ajaxStop")));
        }
        return j;
      },
      getJSON: function (e, t, n) {
        return b.get(e, t, n, "json");
      },
      getScript: function (e, t) {
        return b.get(e, void 0, t, "script");
      },
    }),
    b.each(["get", "post"], function (e, t) {
      b[t] = function (e, n, r, i) {
        return (
          p(n) && ((i = i || r), (r = n), (n = void 0)),
          b.ajax(
            b.extend(
              { url: e, type: t, dataType: i, data: n, success: r },
              b.isPlainObject(e) && e
            )
          )
        );
      };
    }),
    b.ajaxPrefilter(function (e) {
      var t;
      for (t in e.headers)
        "content-type" === t.toLowerCase() &&
          (e.contentType = e.headers[t] || "");
    }),
    (b._evalUrl = function (e, t, n) {
      return b.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (e) {
          b.globalEval(e, t, n);
        },
      });
    }),
    b.fn.extend({
      wrapAll: function (e) {
        var t;
        return (
          this[0] &&
            (p(e) && (e = e.call(this[0])),
            (t = b(e, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                for (var e = this; e.firstElementChild; )
                  e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (e) {
        return p(e)
          ? this.each(function (t) {
              b(this).wrapInner(e.call(this, t));
            })
          : this.each(function () {
              var t = b(this),
                n = t.contents();
              n.length ? n.wrapAll(e) : t.append(e);
            });
      },
      wrap: function (e) {
        var t = p(e);
        return this.each(function (n) {
          b(this).wrapAll(t ? e.call(this, n) : e);
        });
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not("body")
            .each(function () {
              b(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (b.expr.pseudos.hidden = function (e) {
      return !b.expr.pseudos.visible(e);
    }),
    (b.expr.pseudos.visible = function (e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (b.ajaxSettings.xhr = function () {
      try {
        return new e.XMLHttpRequest();
      } catch (e) {}
    });
  var Pt = { 0: 200, 1223: 204 },
    zt = b.ajaxSettings.xhr();
  (h.cors = !!zt && "withCredentials" in zt),
    (h.ajax = zt = !!zt),
    b.ajaxTransport(function (t) {
      var n, r;
      if (h.cors || (zt && !t.crossDomain))
        return {
          send: function (i, o) {
            var u,
              a = t.xhr();
            if (
              (a.open(t.type, t.url, t.async, t.username, t.password),
              t.xhrFields)
            )
              for (u in t.xhrFields) a[u] = t.xhrFields[u];
            for (u in (t.mimeType &&
              a.overrideMimeType &&
              a.overrideMimeType(t.mimeType),
            t.crossDomain ||
              i["X-Requested-With"] ||
              (i["X-Requested-With"] = "XMLHttpRequest"),
            i))
              a.setRequestHeader(u, i[u]);
            (n = function (e) {
              return function () {
                n &&
                  ((n = r = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null),
                  "abort" === e
                    ? a.abort()
                    : "error" === e
                    ? "number" != typeof a.status
                      ? o(0, "error")
                      : o(a.status, a.statusText)
                    : o(
                        Pt[a.status] || a.status,
                        a.statusText,
                        "text" !== (a.responseType || "text") ||
                          "string" != typeof a.responseText
                          ? { binary: a.response }
                          : { text: a.responseText },
                        a.getAllResponseHeaders()
                      ));
              };
            }),
              (a.onload = n()),
              (r = a.onerror = a.ontimeout = n("error")),
              void 0 !== a.onabort
                ? (a.onabort = r)
                : (a.onreadystatechange = function () {
                    4 === a.readyState &&
                      e.setTimeout(function () {
                        n && r();
                      });
                  }),
              (n = n("abort"));
            try {
              a.send((t.hasContent && t.data) || null);
            } catch (e) {
              if (n) throw e;
            }
          },
          abort: function () {
            n && n();
          },
        };
    }),
    b.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1);
    }),
    b.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return b.globalEval(e), e;
        },
      },
    }),
    b.ajaxPrefilter("script", function (e) {
      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }),
    b.ajaxTransport("script", function (e) {
      var t, n;
      if (e.crossDomain || e.scriptAttrs)
        return {
          send: function (r, i) {
            (t = b("<script>")
              .attr(e.scriptAttrs || {})
              .prop({ charset: e.scriptCharset, src: e.url })
              .on(
                "load error",
                (n = function (e) {
                  t.remove(),
                    (n = null),
                    e && i("error" === e.type ? 404 : 200, e.type);
                })
              )),
              v.head.appendChild(t[0]);
          },
          abort: function () {
            n && n();
          },
        };
    });
  var Ft,
    $t = [],
    Wt = /(=)\?(?=&|$)|\?\?/;
  b.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = $t.pop() || b.expando + "_" + bt.guid++;
      return (this[e] = !0), e;
    },
  }),
    b.ajaxPrefilter("json jsonp", function (t, n, r) {
      var i,
        o,
        u,
        a =
          !1 !== t.jsonp &&
          (Wt.test(t.url)
            ? "url"
            : "string" == typeof t.data &&
              0 ===
                (t.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              Wt.test(t.data) &&
              "data");
      if (a || "jsonp" === t.dataTypes[0])
        return (
          (i = t.jsonpCallback = p(t.jsonpCallback)
            ? t.jsonpCallback()
            : t.jsonpCallback),
          a
            ? (t[a] = t[a].replace(Wt, "$1" + i))
            : !1 !== t.jsonp &&
              (t.url += (_t.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
          (t.converters["script json"] = function () {
            return u || b.error(i + " was not called"), u[0];
          }),
          (t.dataTypes[0] = "json"),
          (o = e[i]),
          (e[i] = function () {
            u = arguments;
          }),
          r.always(function () {
            void 0 === o ? b(e).removeProp(i) : (e[i] = o),
              t[i] && ((t.jsonpCallback = n.jsonpCallback), $t.push(i)),
              u && p(o) && o(u[0]),
              (u = o = void 0);
          }),
          "script"
        );
    }),
    (h.createHTMLDocument =
      (((Ft = v.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      2 === Ft.childNodes.length)),
    (b.parseHTML = function (e, t, n) {
      return "string" != typeof e
        ? []
        : ("boolean" == typeof t && ((n = t), (t = !1)),
          t ||
            (h.createHTMLDocument
              ? (((r = (t = v.implementation.createHTMLDocument(
                  ""
                )).createElement("base")).href = v.location.href),
                t.head.appendChild(r))
              : (t = v)),
          (o = !n && []),
          (i = C.exec(e))
            ? [t.createElement(i[1])]
            : ((i = we([e], t, o)),
              o && o.length && b(o).remove(),
              b.merge([], i.childNodes)));
      var r, i, o;
    }),
    (b.fn.load = function (e, t, n) {
      var r,
        i,
        o,
        u = this,
        a = e.indexOf(" ");
      return (
        a > -1 && ((r = ht(e.slice(a))), (e = e.slice(0, a))),
        p(t)
          ? ((n = t), (t = void 0))
          : t && "object" == typeof t && (i = "POST"),
        u.length > 0 &&
          b
            .ajax({ url: e, type: i || "GET", dataType: "html", data: t })
            .done(function (e) {
              (o = arguments),
                u.html(r ? b("<div>").append(b.parseHTML(e)).find(r) : e);
            })
            .always(
              n &&
                function (e, t) {
                  u.each(function () {
                    n.apply(this, o || [e.responseText, t, e]);
                  });
                }
            ),
        this
      );
    }),
    (b.expr.pseudos.animated = function (e) {
      return b.grep(b.timers, function (t) {
        return e === t.elem;
      }).length;
    }),
    (b.offset = {
      setOffset: function (e, t, n) {
        var r,
          i,
          o,
          u,
          a,
          c,
          s = b.css(e, "position"),
          f = b(e),
          l = {};
        "static" === s && (e.style.position = "relative"),
          (a = f.offset()),
          (o = b.css(e, "top")),
          (c = b.css(e, "left")),
          ("absolute" === s || "fixed" === s) && (o + c).indexOf("auto") > -1
            ? ((u = (r = f.position()).top), (i = r.left))
            : ((u = parseFloat(o) || 0), (i = parseFloat(c) || 0)),
          p(t) && (t = t.call(e, n, b.extend({}, a))),
          null != t.top && (l.top = t.top - a.top + u),
          null != t.left && (l.left = t.left - a.left + i),
          "using" in t ? t.using.call(e, l) : f.css(l);
      },
    }),
    b.fn.extend({
      offset: function (e) {
        if (arguments.length)
          return void 0 === e
            ? this
            : this.each(function (t) {
                b.offset.setOffset(this, e, t);
              });
        var t,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? ((t = r.getBoundingClientRect()),
              (n = r.ownerDocument.defaultView),
              { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            n,
            r = this[0],
            i = { top: 0, left: 0 };
          if ("fixed" === b.css(r, "position")) t = r.getBoundingClientRect();
          else {
            for (
              t = this.offset(),
                n = r.ownerDocument,
                e = r.offsetParent || n.documentElement;
              e &&
              (e === n.body || e === n.documentElement) &&
              "static" === b.css(e, "position");

            )
              e = e.parentNode;
            e &&
              e !== r &&
              1 === e.nodeType &&
              (((i = b(e).offset()).top += b.css(e, "borderTopWidth", !0)),
              (i.left += b.css(e, "borderLeftWidth", !0)));
          }
          return {
            top: t.top - i.top - b.css(r, "marginTop", !0),
            left: t.left - i.left - b.css(r, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent;
            e && "static" === b.css(e, "position");

          )
            e = e.offsetParent;
          return e || ne;
        });
      },
    }),
    b.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (
      e,
      t
    ) {
      var n = "pageYOffset" === t;
      b.fn[e] = function (r) {
        return z(
          this,
          function (e, r, i) {
            var o;
            if (
              (m(e) ? (o = e) : 9 === e.nodeType && (o = e.defaultView),
              void 0 === i)
            )
              return o ? o[t] : e[r];
            o
              ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset)
              : (e[r] = i);
          },
          e,
          r,
          arguments.length
        );
      };
    }),
    b.each(["top", "left"], function (e, t) {
      b.cssHooks[t] = ze(h.pixelPosition, function (e, n) {
        if (n)
          return (n = Pe(e, t)), Re.test(n) ? b(e).position()[t] + "px" : n;
      });
    }),
    b.each({ Height: "height", Width: "width" }, function (e, t) {
      b.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (
        n,
        r
      ) {
        b.fn[r] = function (i, o) {
          var u = arguments.length && (n || "boolean" != typeof i),
            a = n || (!0 === i || !0 === o ? "margin" : "border");
          return z(
            this,
            function (t, n, i) {
              var o;
              return m(t)
                ? 0 === r.indexOf("outer")
                  ? t["inner" + e]
                  : t.document.documentElement["client" + e]
                : 9 === t.nodeType
                ? ((o = t.documentElement),
                  Math.max(
                    t.body["scroll" + e],
                    o["scroll" + e],
                    t.body["offset" + e],
                    o["offset" + e],
                    o["client" + e]
                  ))
                : void 0 === i
                ? b.css(t, n, a)
                : b.style(t, n, i, a);
            },
            t,
            u ? i : void 0,
            u
          );
        };
      });
    }),
    b.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        b.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    b.fn.extend({
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
    }),
    b.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (e, t) {
        b.fn[t] = function (e, n) {
          return arguments.length > 0
            ? this.on(t, null, e, n)
            : this.trigger(t);
        };
      }
    );
  var Ut = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  (b.proxy = function (e, t) {
    var n, r, o;
    if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), p(e)))
      return (
        (r = i.call(arguments, 2)),
        ((o = function () {
          return e.apply(t || this, r.concat(i.call(arguments)));
        }).guid = e.guid = e.guid || b.guid++),
        o
      );
  }),
    (b.holdReady = function (e) {
      e ? b.readyWait++ : b.ready(!0);
    }),
    (b.isArray = Array.isArray),
    (b.parseJSON = JSON.parse),
    (b.nodeName = S),
    (b.isFunction = p),
    (b.isWindow = m),
    (b.camelCase = U),
    (b.type = w),
    (b.now = Date.now),
    (b.isNumeric = function (e) {
      var t = b.type(e);
      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }),
    (b.trim = function (e) {
      return null == e ? "" : (e + "").replace(Ut, "");
    }),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return b;
      });
  var Vt = e.jQuery,
    Xt = e.$;
  return (
    (b.noConflict = function (t) {
      return e.$ === b && (e.$ = Xt), t && e.jQuery === b && (e.jQuery = Vt), b;
    }),
    void 0 === t && (e.jQuery = e.$ = b),
    b
  );
});
var BiwaScheme = (function () {
  const e = {},
    t = {},
    n = {
      toString: function () {
        return "nil";
      },
      to_write: function () {
        return "()";
      },
      to_array: function () {
        return [];
      },
      length: function () {
        return 0;
      },
    },
    r = new Object();
  r.toString = function () {
    return "#<undef>";
  };
  var o =
      ("object" == typeof self && self.self === self && self) ||
      ("object" == typeof global && global.global === global && global) ||
      Function("return this")() ||
      {},
    u = Array.prototype,
    a = Object.prototype,
    c = u.slice,
    s = a.toString,
    f = a.hasOwnProperty,
    l = Array.isArray,
    d = Object.keys,
    h = Object.create,
    p = o.isNaN,
    m = (o.isFinite, function () {});
  function v(e) {
    return e instanceof v
      ? e
      : this instanceof v
      ? void (this._wrapped = e)
      : new v(e);
  }
  v.VERSION = "1.10.2";
  function g(e, t, n) {
    if (void 0 === t) return e;
    switch (null == n ? 3 : n) {
      case 1:
        return function (n) {
          return e.call(t, n);
        };
      case 3:
        return function (n, r, i) {
          return e.call(t, n, r, i);
        };
      case 4:
        return function (n, r, i, o) {
          return e.call(t, n, r, i, o);
        };
    }
    return function () {
      return e.apply(t, arguments);
    };
  }
  function y(e, t, n) {
    return null == e
      ? ye
      : le(e)
      ? g(e, t, n)
      : se(e) && !ce(e)
      ? ((r = re({}, (r = e))),
        function (e) {
          return (function (e, t) {
            var n = K(t),
              r = n.length;
            if (null == e) return !r;
            for (var i = Object(e), o = 0; o < r; o++) {
              var u = n[o];
              if (t[u] !== i[u] || !(u in i)) return !1;
            }
            return !0;
          })(e, r);
        })
      : we(e);
    var r;
  }
  function w(e, t) {
    return y(e, t, 1 / 0);
  }
  function b(e, t, n) {
    return v.iteratee !== w ? v.iteratee(e, t) : y(e, t, n);
  }
  function _(e, t) {
    return (
      (t = null == t ? e.length - 1 : +t),
      function () {
        for (
          var n = Math.max(arguments.length - t, 0), r = Array(n), i = 0;
          i < n;
          i++
        )
          r[i] = arguments[i + t];
        switch (t) {
          case 0:
            return e.call(this, r);
          case 1:
            return e.call(this, arguments[0], r);
          case 2:
            return e.call(this, arguments[0], arguments[1], r);
        }
        var o = Array(t + 1);
        for (i = 0; i < t; i++) o[i] = arguments[i];
        return (o[t] = r), e.apply(this, o);
      }
    );
  }
  function x(e) {
    return function (t) {
      return null == t ? void 0 : t[e];
    };
  }
  function k(e, t) {
    return null != e && f.call(e, t);
  }
  function j(e, t) {
    for (var n = t.length, r = 0; r < n; r++) {
      if (null == e) return;
      e = e[t[r]];
    }
    return n ? e : void 0;
  }
  v.iteratee = w;
  var T = Math.pow(2, 53) - 1,
    S = x("length");
  function C(e) {
    var t = S(e);
    return "number" == typeof t && t >= 0 && t <= T;
  }
  function E(e, t, n) {
    var r, i;
    if (((t = g(t, n)), C(e)))
      for (r = 0, i = e.length; r < i; r++) t(e[r], r, e);
    else {
      var o = K(e);
      for (r = 0, i = o.length; r < i; r++) t(e[o[r]], o[r], e);
    }
    return e;
  }
  function q(e, t, n) {
    t = b(t, n);
    for (
      var r = !C(e) && K(e), i = (r || e).length, o = Array(i), u = 0;
      u < i;
      u++
    ) {
      var a = r ? r[u] : u;
      o[u] = t(e[a], a, e);
    }
    return o;
  }
  var A,
    D,
    N =
      ((A = 1),
      (D = function (e, t, n, r) {
        var i = !C(e) && K(e),
          o = (i || e).length,
          u = A > 0 ? 0 : o - 1;
        for (r || ((n = e[i ? i[u] : u]), (u += A)); u >= 0 && u < o; u += A) {
          var a = i ? i[u] : u;
          n = t(n, e[a], a, e);
        }
        return n;
      }),
      function (e, t, n, r) {
        var i = arguments.length >= 3;
        return D(e, g(t, r, 4), n, i);
      });
  function O(e, t, n) {
    var r = [];
    return (
      (t = b(t, n)),
      E(e, function (e, n, i) {
        t(e, n, i) && r.push(e);
      }),
      r
    );
  }
  function M(e, t, n, r) {
    return (
      C(e) || (e = ee(e)),
      ("number" != typeof n || r) && (n = 0),
      W(e, t, n) >= 0
    );
  }
  _(function (e, t, n) {
    var r, i;
    return (
      le(t) ? (i = t) : ce(t) && ((r = t.slice(0, -1)), (t = t[t.length - 1])),
      q(e, function (e) {
        var o = i;
        if (!o) {
          if ((r && r.length && (e = j(e, r)), null == e)) return;
          o = e[t];
        }
        return null == o ? o : o.apply(e, n);
      })
    );
  });
  function L(e, t) {
    return q(e, we(t));
  }
  var R = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  function B(e) {
    return e
      ? ce(e)
        ? c.call(e)
        : de(e)
        ? e.match(R)
        : C(e)
        ? q(e, ye)
        : ee(e)
      : [];
  }
  function H(e, t, n) {
    return null == e || e.length < 1
      ? null == t
        ? void 0
        : []
      : null == t || n
      ? e[e.length - 1]
      : I(e, Math.max(0, e.length - t));
  }
  function I(e, t, n) {
    return c.call(e, null == t || n ? 1 : t);
  }
  function P(e, t, n, r) {
    for (var i = (r = r || []).length, o = 0, u = S(e); o < u; o++) {
      var a = e[o];
      if (C(a) && (ce(a) || fe(a)))
        if (t) for (var c = 0, s = a.length; c < s; ) r[i++] = a[c++];
        else P(a, t, n, r), (i = r.length);
      else n || (r[i++] = a);
    }
    return r;
  }
  _(function (e, t) {
    return F(e, t);
  });
  function z(e, t, n, r) {
    ve(t) || ((r = n), (n = t), (t = !1)), null != n && (n = b(n, r));
    for (var i = [], o = [], u = 0, a = S(e); u < a; u++) {
      var c = e[u],
        s = n ? n(c, u, e) : c;
      t && !n
        ? ((u && o === s) || i.push(c), (o = s))
        : n
        ? M(o, s) || (o.push(s), i.push(c))
        : M(i, c) || i.push(c);
    }
    return i;
  }
  _(function (e) {
    return z(P(e, !0, !0));
  });
  var F = _(function (e, t) {
    return (
      (t = P(t, !0, !0)),
      O(e, function (e) {
        return !M(t, e);
      })
    );
  });
  _(function (e) {
    for (
      var t =
          (e &&
            (function (e, t, n) {
              var r,
                i,
                o = -1 / 0,
                u = -1 / 0;
              if (
                null == t ||
                ("number" == typeof t && "object" != typeof e[0] && null != e)
              )
                for (var a = 0, c = (e = C(e) ? e : ee(e)).length; a < c; a++)
                  null != (r = e[a]) && r > o && (o = r);
              else
                (t = b(t, n)),
                  E(e, function (e, n, r) {
                    ((i = t(e, n, r)) > u || (i === -1 / 0 && o === -1 / 0)) &&
                      ((o = e), (u = i));
                  });
              return o;
            })(e, S).length) ||
          0,
        n = Array(t),
        r = 0;
      r < t;
      r++
    )
      n[r] = L(e, r);
    return n;
  });
  var W = (function (e, t, n) {
    return function (r, i, o) {
      var u = 0,
        a = S(r);
      if ("number" == typeof o)
        e > 0
          ? (u = o >= 0 ? o : Math.max(o + a, u))
          : (a = o >= 0 ? Math.min(o + 1, a) : o + a + 1);
      else if (n && o && a) return r[(o = n(r, i))] === i ? o : -1;
      if (i != i) return (o = t(c.call(r, u, a), me)) >= 0 ? o + u : -1;
      for (o = e > 0 ? u : a - 1; o >= 0 && o < a; o += e)
        if (r[o] === i) return o;
      return -1;
    };
  })(
    1,
    (function (e) {
      return function (t, n, r) {
        n = b(n, r);
        for (var i = S(t), o = e > 0 ? 0 : i - 1; o >= 0 && o < i; o += e)
          if (n(t[o], o, t)) return o;
        return -1;
      };
    })(1),
    function (e, t, n, r) {
      for (var i = (n = b(n, r, 1))(t), o = 0, u = S(e); o < u; ) {
        var a = Math.floor((o + u) / 2);
        n(e[a]) < i ? (o = a + 1) : (u = a);
      }
      return o;
    }
  );
  function U(e, t, n, r, i) {
    if (!(r instanceof t)) return e.apply(n, i);
    var o = (function (e) {
        if (!se(e)) return {};
        if (h) return h(e);
        m.prototype = e;
        var t = new m();
        return (m.prototype = null), t;
      })(e.prototype),
      u = e.apply(o, i);
    return se(u) ? u : o;
  }
  var V = _(function (e, t, n) {
      if (!le(e)) throw new TypeError("Bind must be called on a function");
      var r = _(function (i) {
        return U(e, r, t, this, n.concat(i));
      });
      return r;
    }),
    X = _(function (e, t) {
      var n = X.placeholder,
        r = function () {
          for (var i = 0, o = t.length, u = Array(o), a = 0; a < o; a++)
            u[a] = t[a] === n ? arguments[i++] : t[a];
          for (; i < arguments.length; ) u.push(arguments[i++]);
          return U(e, r, this, this, u);
        };
      return r;
    });
  X.placeholder = v;
  _(function (e, t) {
    var n = (t = P(t, !1, !1)).length;
    if (n < 1) throw new Error("bindAll must be passed function names");
    for (; n--; ) {
      var r = t[n];
      e[r] = V(e[r], e);
    }
  });
  var Y = _(function (e, t, n) {
    return setTimeout(function () {
      return e.apply(null, n);
    }, t);
  });
  X(Y, v, 1);
  X(function (e, t) {
    var n;
    return function () {
      return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n;
    };
  }, 2);
  var G = !{ toString: null }.propertyIsEnumerable("toString"),
    J = [
      "valueOf",
      "isPrototypeOf",
      "toString",
      "propertyIsEnumerable",
      "hasOwnProperty",
      "toLocaleString",
    ];
  function Q(e, t) {
    var n = J.length,
      r = e.constructor,
      i = (le(r) && r.prototype) || a,
      o = "constructor";
    for (k(e, o) && !M(t, o) && t.push(o); n--; )
      (o = J[n]) in e && e[o] !== i[o] && !M(t, o) && t.push(o);
  }
  function K(e) {
    if (!se(e)) return [];
    if (d) return d(e);
    var t = [];
    for (var n in e) k(e, n) && t.push(n);
    return G && Q(e, t), t;
  }
  function Z(e) {
    if (!se(e)) return [];
    var t = [];
    for (var n in e) t.push(n);
    return G && Q(e, t), t;
  }
  function ee(e) {
    for (var t = K(e), n = t.length, r = Array(n), i = 0; i < n; i++)
      r[i] = e[t[i]];
    return r;
  }
  function te(e, t) {
    return function (n) {
      var r = arguments.length;
      if ((t && (n = Object(n)), r < 2 || null == n)) return n;
      for (var i = 1; i < r; i++)
        for (var o = arguments[i], u = e(o), a = u.length, c = 0; c < a; c++) {
          var s = u[c];
          (t && void 0 !== n[s]) || (n[s] = o[s]);
        }
      return n;
    };
  }
  var ne = te(Z),
    re = te(K);
  function ie(e, t, n) {
    return t in n;
  }
  var oe = _(function (e, t) {
    var n = {},
      r = t[0];
    if (null == e) return n;
    le(r)
      ? (t.length > 1 && (r = g(r, t[1])), (t = Z(e)))
      : ((r = ie), (t = P(t, !1, !1)), (e = Object(e)));
    for (var i = 0, o = t.length; i < o; i++) {
      var u = t[i],
        a = e[u];
      r(a, u, e) && (n[u] = a);
    }
    return n;
  });
  _(function (e, t) {
    var n,
      r,
      i = t[0];
    return (
      le(i)
        ? ((r = i),
          (i = function () {
            return !r.apply(this, arguments);
          }),
          t.length > 1 && (n = t[1]))
        : ((t = q(P(t, !1, !1), String)),
          (i = function (e, n) {
            return !M(t, n);
          })),
      oe(e, i, n)
    );
  });
  function ue(e) {
    return se(e) ? (ce(e) ? e.slice() : ne({}, e)) : e;
  }
  function ae(e) {
    return function (t) {
      return s.call(t) === "[object " + e + "]";
    };
  }
  var ce = l || ae("Array");
  function se(e) {
    var t = typeof e;
    return "function" === t || ("object" === t && !!e);
  }
  var fe = ae("Arguments"),
    le = ae("Function"),
    de = ae("String"),
    he = ae("Number");
  !(function () {
    fe(arguments) ||
      (fe = function (e) {
        return k(e, "callee");
      });
  })();
  var pe = o.document && o.document.childNodes;
  function me(e) {
    return he(e) && p(e);
  }
  function ve(e) {
    return !0 === e || !1 === e || "[object Boolean]" === s.call(e);
  }
  function ge(e) {
    return void 0 === e;
  }
  function ye(e) {
    return e;
  }
  function we(e) {
    return ce(e)
      ? function (t) {
          return j(t, e);
        }
      : x(e);
  }
  function be(e, t, n) {
    var r = Array(Math.max(0, e));
    t = g(t, n, 1);
    for (var i = 0; i < e; i++) r[i] = t(i);
    return r;
  }
  "function" != typeof /./ &&
    "object" != typeof Int8Array &&
    "function" != typeof pe &&
    (le = function (e) {
      return "function" == typeof e || !1;
    });
  var _e = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
    },
    xe = (function (e) {
      for (var t = {}, n = K(e), r = 0, i = n.length; r < i; r++)
        t[e[n[r]]] = n[r];
      return t;
    })(_e);
  function ke(e) {
    var t = function (t) {
        return e[t];
      },
      n = "(?:" + K(e).join("|") + ")",
      r = RegExp(n),
      i = RegExp(n, "g");
    return function (e) {
      return (e = null == e ? "" : "" + e), r.test(e) ? e.replace(i, t) : e;
    };
  }
  var je = ke(_e),
    Te = (ke(xe), 0);
  function Se(e) {
    var t = ++Te + "";
    return e ? e + t : t;
  }
  v.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g,
  };
  function Ce(e, t) {
    return e._chain ? v(t).chain() : t;
  }
  E(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (
    e
  ) {
    var t = u[e];
    v.prototype[e] = function () {
      var n = this._wrapped;
      return (
        t.apply(n, arguments),
        ("shift" !== e && "splice" !== e) || 0 !== n.length || delete n[0],
        Ce(this, n)
      );
    };
  }),
    E(["concat", "join", "slice"], function (e) {
      var t = u[e];
      v.prototype[e] = function () {
        return Ce(this, t.apply(this._wrapped, arguments));
      };
    }),
    (v.prototype.value = function () {
      return this._wrapped;
    }),
    (v.prototype.valueOf = v.prototype.toJSON = v.prototype.value),
    (v.prototype.toString = function () {
      return String(this._wrapped);
    });
  const Ee = {
      create: function (e) {
        var t = function () {
          this.initialize.apply(this, arguments);
        };
        return ne(t.prototype, e), t;
      },
      extend: function (e, t) {
        var n = function () {
          this.initialize.apply(this, arguments);
        };
        return ne((n.prototype = e), t), n;
      },
      memoize: function (e, t) {
        var n = e.prototype;
        E(ce(t) ? t : [t], function (e) {
          (n["compute_" + e] = n[e]),
            (n[e] = function () {
              return (
                this.hasOwnProperty("cached_" + e) ||
                  (this["cached_" + e] = this["compute_" + e].apply(
                    this,
                    B(arguments)
                  )),
                this["cached_" + e]
              );
            });
        });
      },
    },
    qe = {},
    Ae = Ee.create({
      initialize: function (e) {
        (this.name = e), (qe[e] = this);
      },
      inspect: function () {
        return "'" + this.name;
      },
      toString: function () {
        return "'" + this.name;
      },
      to_write: function () {
        return this.name;
      },
    }),
    De = function (e, t) {
      return void 0 === qe[e]
        ? new Ae(e)
        : qe[e] instanceof Ae
        ? qe[e]
        : new Ae(e);
    },
    Ne = function () {
      return De(Se("__gensym"));
    },
    Oe = function (e, t) {
      return e.length > t ? e.slice(0, t) + "..." : e;
    },
    Me = function (e) {
      if (void 0 === e) return "undefined";
      if (null === e) return "null";
      if (le(e))
        return (
          "#<Function " +
          (e.fname ? e.fname : e.toSource ? Oe(e.toSource(), 40) : "") +
          ">"
        );
      if (de(e))
        return (
          '"' +
          e
            .replace(/\\|\"/g, function (e) {
              return "\\" + e;
            })
            .replace(/\x07/g, "\\a")
            .replace(/\x08/g, "\\b")
            .replace(/\t/g, "\\t")
            .replace(/\n/g, "\\n")
            .replace(/\v/g, "\\v")
            .replace(/\f/g, "\\f")
            .replace(/\r/g, "\\r") +
          '"'
        );
      if (Ze(e)) return "#<Closure>";
      if (ce(e))
        return (
          "#(" +
          q(e, function (e) {
            return Me(e);
          }).join(" ") +
          ")"
        );
      if ("function" == typeof e.to_write) return e.to_write();
      if (isNaN(e) && "number" == typeof e) return "+nan.0";
      switch (e) {
        case !0:
          return "#t";
        case !1:
          return "#f";
        case 1 / 0:
          return "+inf.0";
        case -1 / 0:
          return "-inf.0";
      }
      return Re(e);
    },
    Le = function (e) {
      return e.to_display
        ? e.to_display(Le)
        : ge(e)
        ? "undefined"
        : (function (e) {
            return null === e;
          })(e)
        ? "null"
        : "string" == typeof e.valueOf()
        ? e
        : e instanceof Ae
        ? e.name
        : e instanceof Array
        ? "#(" + q(e, Le).join(" ") + ")"
        : Me(e);
    },
    Re = function (e, t) {
      try {
        return ge(e)
          ? "undefined"
          : null === e
          ? "null"
          : !0 === e
          ? "#t"
          : !1 === e
          ? "#f"
          : e.inspect
          ? e.inspect()
          : de(e)
          ? '"' + e.replace(/"/g, '\\"') + '"'
          : ce(e)
          ? "[" + q(e, Re).join(", ") + "]"
          : t && t.fallback
          ? t.fallback
          : e.toString();
      } catch (e) {
        if (e instanceof RangeError) return "...";
        throw e;
      }
    },
    Be = Ee.create({
      initialize: function (e, t = null) {
        const n = null === t ? "" : ": " + Me(t);
        (this.message = `Error: ${e}${n}`), (this.form = t);
      },
      toString: function () {
        return this.message;
      },
    }),
    He = Ee.extend(new Be(), {
      initialize: function (e) {
        this.message = "[BUG] " + e;
      },
    }),
    Ie = Ee.extend(new Be(), {
      initialize: function (e) {
        this.message = e;
      },
    }),
    Pe = {},
    ze = Ee.create({
      initialize: function (e) {
        Pe[(this.value = e)] = this;
      },
      to_write: function () {
        switch (this.value) {
          case "\n":
            return "#\\newline";
          case " ":
            return "#\\space";
          case "\t":
            return "#\\tab";
          default:
            return "#\\" + this.value;
        }
      },
      to_display: function () {
        return this.value;
      },
      inspect: function () {
        return this.to_write();
      },
    });
  ze.get = function (e) {
    if ("string" != typeof e)
      throw new He("Char.get: " + Re(e) + " is not a string");
    return void 0 === Pe[e] ? new ze(e) : Pe[e];
  };
  var Fe = Ee.create({
    initialize: function (e) {
      this.on_pause = e;
    },
    set_state: function (e, t, n, r, i) {
      (this.interpreter = e),
        (this.x = t),
        (this.f = n),
        (this.c = r),
        (this.s = i);
    },
    ready: function () {
      this.on_pause(this);
    },
    resume: function (e) {
      return this.interpreter.resume(!0, e, this.x, this.f, this.c, this.s);
    },
  });
  const $e = new Object(),
    We = Ee.create({
      initialize: function (e, t) {
        (this.is_open = !0),
          (this.is_binary = !1),
          (this.is_input = e),
          (this.is_output = t);
      },
      close: function () {
        this.is_open = !1;
      },
      inspect: function () {
        return "#<Port>";
      },
      to_write: function () {
        return "#<Port>";
      },
    });
  (We.StringOutput = Ee.extend(new We(!1, !0), {
    initialize: function () {
      this.buffer = [];
    },
    put_string: function (e) {
      this.buffer.push(e);
    },
    output_string: function (e) {
      return this.buffer.join("");
    },
  })),
    (We.StringInput = Ee.extend(new We(!0, !1), {
      initialize: function (e) {
        this.str = e;
      },
      get_string: function (e) {
        return e(this.str);
      },
    })),
    (We.NullInput = Ee.extend(new We(!0, !1), {
      initialize: function () {},
      get_string: function (e) {
        return e("");
      },
    })),
    (We.NullOutput = Ee.extend(new We(!1, !0), {
      initialize: function (e) {
        this.output_function = e;
      },
      put_string: function (e) {},
    })),
    (We.CustomOutput = Ee.extend(new We(!1, !0), {
      initialize: function (e) {
        this.output_function = e;
      },
      put_string: function (e) {
        this.output_function(e);
      },
    })),
    (We.CustomInput = Ee.extend(new We(!0, !1), {
      initialize: function (e) {
        this.input_function = e;
      },
      get_string: function (e) {
        var t = this.input_function;
        return new Fe(function (n) {
          t(function (t) {
            n.resume(e(t));
          });
        });
      },
    })),
    (We.current_input = new We.NullInput()),
    (We.current_output = new We.NullOutput()),
    (We.current_error = new We.NullOutput());
  const Ue = function (e) {
      return e === n;
    },
    Ve = ve,
    Xe = de,
    Ye = le,
    Ge = function (e) {
      return e instanceof ze;
    },
    Je = function (e) {
      return e instanceof Ae;
    },
    Qe = function (e) {
      return e instanceof We;
    },
    Ke = function (e) {
      return e instanceof Array && !0 !== e.closure_p;
    },
    Ze = function (e) {
      return e instanceof Array && !0 === e.closure_p;
    },
    et = function (e) {
      return (e.closure_p = !0), e;
    },
    tt = function (e) {
      return Ze(e) || le(e);
    },
    nt = function (e, t) {
      return e === t;
    },
    rt = function (e, t) {
      return e == t && typeof e == typeof t;
    },
    it = function (e, t) {
      return Me(e) == Me(t);
    },
    ot = function (e, t) {
      return typeof e != typeof t ? compareFn(typeof e, typeof t) : e < t;
    },
    ut = Ee.create({
      initialize: function () {
        var e;
        for (this.arr = [], e = 0; e < arguments.length; e++)
          this.arr[e] = arguments[e];
      },
      equals: function (e) {
        if (this.arr.length != e.arr.length) return !1;
        var t = ue(this.arr),
          n = ue(e.arr);
        t.sort(), n.sort();
        for (var r = 0; r < this.arr.length; r++) if (t[r] != n[r]) return !1;
        return !0;
      },
      set_cons: function (e) {
        var t = new ut(e);
        return (t.arr = ue(this.arr)), t.arr.push(e), t;
      },
      set_union: function () {
        var e = new ut();
        e.arr = ue(this.arr);
        for (var t = 0; t < arguments.length; t++) {
          var n = arguments[t];
          if (!(n instanceof ut))
            throw new Be("set_union: arguments must be a set");
          for (var r = 0; r < n.arr.length; r++) e.add(n.arr[r]);
        }
        return e;
      },
      set_intersect: function (e) {
        if (!(e instanceof ut))
          throw new Be("set_intersect: arguments must be a set");
        for (var t = new ut(), n = 0; n < this.arr.length; n++)
          e.member(this.arr[n]) && t.add(this.arr[n]);
        return t;
      },
      set_minus: function (e) {
        if (!(e instanceof ut))
          throw new Be("set_minus: arguments must be a set");
        for (var t = new ut(), n = 0; n < this.arr.length; n++)
          e.member(this.arr[n]) || t.add(this.arr[n]);
        return t;
      },
      add: function (e) {
        this.member(e) || this.arr.push(e);
      },
      member: function (e) {
        for (var t = 0; t < this.arr.length; t++)
          if (this.arr[t] == e) return !0;
        return !1;
      },
      rindex: function (e) {
        for (var t = this.arr.length - 1; t >= 0; t--)
          if (this.arr[t] == e) return this.arr.length - 1 - t;
        return null;
      },
      index: function (e) {
        for (var t = 0; t < this.arr.length; t++)
          if (this.arr[t] == e) return t;
        return null;
      },
      inspect: function () {
        return "Set(" + this.arr.join(", ") + ")";
      },
      toString: function () {
        return this.inspect();
      },
      size: function () {
        return this.arr.length;
      },
    }),
    at = Ee.create({
      initialize: function (e, t) {
        (this.car = e), (this.cdr = t);
      },
      caar: function () {
        return this.car.car;
      },
      cadr: function () {
        return this.cdr.car;
      },
      cdar: function () {
        return this.cdr.car;
      },
      cddr: function () {
        return this.cdr.cdr;
      },
      first: function () {
        return this.car;
      },
      second: function () {
        return this.cdr.car;
      },
      third: function () {
        return this.cdr.cdr.car;
      },
      fourth: function () {
        return this.cdr.cdr.cdr.car;
      },
      fifth: function () {
        return this.cdr.cdr.cdr.cdr.car;
      },
      to_array: function () {
        for (var e = [], t = this; t instanceof at; t = t.cdr) e.push(t.car);
        return e;
      },
      to_set: function () {
        for (var e = new ut(), t = this; t instanceof at; t = t.cdr)
          e.add(t.car);
        return e;
      },
      length: function () {
        for (var e = 0, t = this; t instanceof at; t = t.cdr) e++;
        return e;
      },
      last_cdr: function () {
        var e;
        for (e = this; e instanceof at; e = e.cdr);
        return e;
      },
      forEach: function (e) {
        for (var t = this; t instanceof at; t = t.cdr) e(t.car);
        return t;
      },
      foreach: function (e) {
        for (var t = this; t instanceof at; t = t.cdr) e(t.car);
        return t;
      },
      map: function (e) {
        for (var t = [], n = this; ct(n); n = n.cdr) t.push(e(n.car));
        return t;
      },
      mapList: function (e) {
        return dt(this.map(e));
      },
      concat: function (e) {
        for (var t = this; t instanceof at && t.cdr != n; ) t = t.cdr;
        return (t.cdr = e), this;
      },
      inspect: function (e) {
        e || (e = Re);
        var t = [],
          r = this.foreach(function (n) {
            t.push(e(n));
          });
        return r != n && (t.push("."), t.push(e(r))), "(" + t.join(" ") + ")";
      },
      toString: function () {
        return this.inspect();
      },
      to_display: function (e) {
        return this.inspect(e);
      },
      to_write: function () {
        return this.inspect(Me);
      },
    }),
    ct = function (e) {
      return e instanceof at;
    },
    st = function (e) {
      if (e === n) return !0;
      if (!(e instanceof at)) return !1;
      for (var t = e, r = e.cdr; ; ) {
        if (r === n) return !0;
        if (r === t) return !1;
        if (!(r instanceof at)) return !1;
        if (r.cdr === n) return !0;
        if (!(r.cdr instanceof at)) return !1;
        (r = r.cdr.cdr), (t = t.cdr);
      }
    },
    ft = function (e, t) {
      for (var r = n, i = e.length - 1; i >= 0; i--) {
        var o = e[i];
        t && ce(o) && !o.is_vector && (o = ft(o, t)), (r = new at(o, r));
      }
      return r;
    },
    lt = function () {
      var e = B(arguments);
      return ft(e, !1);
    },
    dt = function (e) {
      return ft(e, !1);
    },
    ht = function (e) {
      return ft(e, !0);
    },
    pt = function (e, t) {
      return new at(e, t);
    },
    mt = function (e) {
      if (void 0 === e) return n;
      var t = [];
      return (
        E(e, function (e, n) {
          t.push(new at(n, e));
        }),
        dt(t)
      );
    },
    vt = function (e) {
      if (e === n) return {};
      var t = {};
      return (
        e.foreach(function (e) {
          t[e.car] = e.cdr;
        }),
        t
      );
    },
    gt = function (e, t) {
      var n = [e],
        r = [!1];
      _t(e, n, r);
      for (
        var i = bt(n, r), o = new Array(i.length), u = i.length - 1;
        u >= 0;
        u--
      )
        o[u] = !1;
      return wt(e, i, o, t);
    },
    yt = gt,
    wt = function (e, t, r, i) {
      var o = "",
        u = t.indexOf(e);
      if (u >= 0) {
        if (r[u]) return "#" + u + "#";
        (r[u] = !0), (o = "#" + u + "=");
      }
      if (e instanceof at) {
        (c = []).push(wt(e.car, t, r, i));
        for (var a = e.cdr; a != n; a = a.cdr) {
          if (!(a instanceof at) || t.indexOf(a) >= 0) {
            c.push("."), c.push(wt(a, t, r, i));
            break;
          }
          c.push(wt(a.car, t, r, i));
        }
        o += "(" + c.join(" ") + ")";
      } else if (e instanceof Array) {
        var c = q(e, function (e) {
          return wt(e, t, r, i);
        });
        o += i ? "[" + c.join(", ") + "]" : "#(" + c.join(" ") + ")";
      } else o += Me(e);
      return o;
    },
    bt = function (e, t) {
      for (var n = 0, r = 0; r < t.length; r++) t[r] && ((e[n] = e[r]), n++);
      return e.slice(0, n);
    },
    _t = function (e, t, i) {
      var o = e instanceof at ? [e.car, e.cdr] : e instanceof Array ? e : null;
      o &&
        E(o, function (e) {
          if (
            !(
              "number" == typeof e ||
              "string" == typeof e ||
              e === r ||
              !0 === e ||
              !1 === e ||
              e === n ||
              e instanceof Ae
            )
          ) {
            var o = t.indexOf(e);
            o >= 0 ? (i[o] = !0) : (t.push(e), i.push(!1), _t(e, t, i));
          }
        });
    },
    xt = Ee.create({
      initialize: function (e, t, n) {
        (this.proc = e),
          (this.args = t),
          (this.after =
            n ||
            function (e) {
              return e[0];
            });
      },
      inspect: function () {
        return "#<Call args=" + this.args.inspect() + ">";
      },
      toString: function () {
        return "#<Call>";
      },
      to_write: function () {
        return "#<Call>";
      },
    }),
    kt = {
      ForArray: Ee.create({
        initialize: function (e) {
          (this.arr = e), (this.i = 0);
        },
        has_next: function () {
          return this.i < this.arr.length;
        },
        next: function () {
          return this.arr[this.i++];
        },
      }),
      ForString: Ee.create({
        initialize: function (e) {
          (this.str = e), (this.i = 0);
        },
        has_next: function () {
          return this.i < this.str.length;
        },
        next: function () {
          return ze.get(this.str.charAt(this.i++));
        },
      }),
      ForList: Ee.create({
        initialize: function (e) {
          this.ls = e;
        },
        has_next: function () {
          return this.ls instanceof at && this.ls != n;
        },
        next: function () {
          var e = this.ls;
          return (this.ls = this.ls.cdr), e;
        },
      }),
      ForMulti: Ee.create({
        initialize: function (e) {
          (this.objs = e),
            (this.size = e.length),
            (this.iterators = q(e, function (e) {
              return kt.of(e);
            }));
        },
        has_next: function () {
          for (var e = 0; e < this.size; e++)
            if (!this.iterators[e].has_next()) return !1;
          return !0;
        },
        next: function () {
          return q(this.iterators, function (e) {
            return e.next();
          });
        },
      }),
      of: function (e) {
        switch (!0) {
          case e instanceof Array:
            return new this.ForArray(e);
          case "string" == typeof e:
            return new this.ForString(e);
          case e instanceof at:
          case e === n:
            return new this.ForList(e);
          default:
            throw new He("Iterator.of: unknown class: " + Re(e));
        }
      },
    };
  (xt.default_callbacks = {
    call: function (e) {
      return new xt(this.proc, [e]);
    },
    result: function () {},
    finish: function () {},
  }),
    (xt.foreach = function (e, t, n) {
      n || (n = !1),
        E(["call", "result", "finish"], function (e) {
          t[e] || (t[e] = xt.default_callbacks[e]);
        });
      var r = null,
        i = null,
        o = function (u) {
          if (r) {
            var a = t.result(u[0], i);
            if (void 0 !== a) return a;
          } else r = n ? new kt.ForMulti(e) : kt.of(e);
          if (r.has_next()) {
            i = r.next();
            var c = t.call(i);
            return (c.after = o), c;
          }
          return t.finish();
        };
      return o(null);
    }),
    (xt.multi_foreach = function (e, t) {
      return xt.foreach(e, t, !0);
    });
  const jt = Ee.create({
    initialize: function (e, t) {
      (this.sname = e), (this.func = t);
    },
    transform: function (e) {
      if (!this.func)
        throw new He("sorry, syntax " + this.sname + " is a pseudo syntax now");
      return this.func(e);
    },
    inspect: function () {
      return "#<Syntax " + this.sname + ">";
    },
  });
  (t.define = new jt("define")),
    (t.begin = new jt("begin")),
    (t.quote = new jt("quote")),
    (t.lambda = new jt("lambda")),
    (t.if = new jt("if")),
    (t["set!"] = new jt("set!"));
  const Tt = Ee.create({
    initialize: function () {},
    is_tail: function (e) {
      return "return" == e[0];
    },
    collect_free: function (e, t, n) {
      for (var r = n, i = e.arr, o = 0; o < i.length; o++)
        r = this.compile_refer(i[o], t, ["argument", r]);
      return r;
    },
    compile_refer: function (e, t, n) {
      return this.compile_lookup(
        e,
        t,
        function (e) {
          return ["refer-local", e, n];
        },
        function (e) {
          return ["refer-free", e, n];
        },
        function (e) {
          return ["refer-global", e, n];
        }
      );
    },
    compile_lookup: function (e, t, n, r, i) {
      var o,
        u = t[0],
        a = t[1];
      return null != (o = u.index(e))
        ? n(o)
        : null != (o = a.index(e))
        ? r(o)
        : i(e.name);
    },
    make_boxes: function (e, t, n) {
      t = t;
      for (var r = 0, i = []; t instanceof at; )
        e.member(t.car) && i.push(r), r++, (t = t.cdr);
      for (var o = n, u = i.length - 1; u >= 0; u--) o = ["box", i[u], o];
      return o;
    },
    find_sets: function (e, t) {
      var n = null;
      if (e instanceof Ae) n = new ut();
      else if (e instanceof at)
        switch (e.first()) {
          case De("define"):
            var r = e.third();
            n = this.find_sets(r, t);
          case De("begin"):
            n = this.find_sets(e.cdr, t);
            break;
          case De("quote"):
            n = new ut();
            break;
          case De("lambda"):
            var i = e.second(),
              o = e.cdr.cdr;
            n =
              i instanceof at
                ? this.find_sets(o, t.set_minus(i.to_set()))
                : this.find_sets(o, t.set_minus(new ut(i)));
            break;
          case De("if"):
            var u = e.second(),
              a = e.third(),
              c = e.fourth();
            n = this.find_sets(u, t).set_union(
              this.find_sets(a, t),
              this.find_sets(c, t)
            );
            break;
          case De("set!"):
            var s = e.second(),
              f = e.third();
            n = t.member(s)
              ? this.find_sets(f, t).set_cons(s)
              : this.find_sets(f, t);
            break;
          case De("call/cc"):
            r = e.second();
            n = this.find_sets(r, t);
            break;
          default:
            for (var l = new ut(), d = e; d instanceof at; d = d.cdr)
              l = l.set_union(this.find_sets(d.car, t));
            n = l;
        }
      else n = new ut();
      if (null == n) throw new He("find_sets() exited in unusual way");
      return n;
    },
    find_free: function (e, t, n) {
      var r = null;
      if (e instanceof Ae) r = n.member(e) ? new ut(e) : new ut();
      else if (e instanceof at)
        switch (e.first()) {
          case De("define"):
            var i = e.third();
            r = this.find_free(i, t, n);
            break;
          case De("begin"):
            r = this.find_free(e.cdr, t, n);
            break;
          case De("quote"):
            r = new ut();
            break;
          case De("lambda"):
            var o = e.second(),
              u = e.cdr.cdr;
            r =
              o instanceof at
                ? this.find_free(u, t.set_union(o.to_set()), n)
                : this.find_free(u, t.set_cons(o), n);
            break;
          case De("if"):
            var a = e.second(),
              c = e.third(),
              s = e.fourth();
            r = this.find_free(a, t, n).set_union(
              this.find_free(c, t, n),
              this.find_free(s, t, n)
            );
            break;
          case De("set!"):
            var f = e.second();
            i = e.third();
            r = n.member(f)
              ? this.find_free(i, t, n).set_cons(f)
              : this.find_free(i, t, n);
            break;
          case De("call/cc"):
            i = e.second();
            r = this.find_free(i, t, n);
            break;
          default:
            for (var l = new ut(), d = e; d instanceof at; d = d.cdr)
              l = l.set_union(this.find_free(d.car, t, n));
            r = l;
        }
      else r = new ut();
      if (null == r) throw new He("find_free() exited in unusual way");
      return r;
    },
    find_dot_pos: function (e) {
      for (var t = 0; e instanceof at; e = e.cdr, ++t);
      return e != n ? t : -1;
    },
    last_pair: function (e) {
      if (e instanceof at) for (; e.cdr instanceof at; e = e.cdr);
      return e;
    },
    dotted2proper: function (e) {
      if (e === n) return n;
      if (e instanceof at) {
        var t = this.last_pair(e);
        if (t instanceof at && t.cdr === n) return e;
        var r = (function (e) {
          for (var t = n; e instanceof at; e = e.cdr) t = new at(e.car, t);
          return (function (e) {
            for (var t = n; e instanceof at; ) {
              var r = e.cdr;
              (e.cdr = t), (t = e), (e = r);
            }
            return t;
          })(t);
        })(e);
        return (this.last_pair(r).cdr = new at(t.cdr, n)), r;
      }
      return new at(e, n);
    },
    compile: function (e, t, n, r, i) {
      for (var o = null; ; ) {
        if (e instanceof Ae)
          return this.compile_refer(e, t, n.member(e) ? ["indirect", i] : i);
        if (!(e instanceof at)) return ["constant", e, i];
        switch (e.first()) {
          case De("define"):
            (e = (o = this._compile_define(e, i))[0]), (i = o[1]);
            break;
          case De("begin"):
            for (var u = [], a = e.cdr; a instanceof at; a = a.cdr)
              u.push(a.car);
            for (var c = i, s = u.length - 1; s >= 0; s--)
              c = this.compile(u[s], t, n, r, c);
            return c;
          case De("quote"):
            if (e.length() < 2) throw new Be("Invalid quote: " + e.to_write());
            return ["constant", e.second(), i];
          case De("lambda"):
            return this._compile_lambda(e, t, n, r, i);
          case De("if"):
            if (e.length() < 3 || e.length() > 4)
              throw new Be("Invalid if: " + e.to_write());
            var f = e.second(),
              l = e.third(),
              d = e.fourth();
            (l = this.compile(l, t, n, r, i)),
              (d = this.compile(d, t, n, r, i));
            (e = f), (i = ["test", l, d]);
            break;
          case De("set!"):
            if (3 != e.length()) throw new Be("Invalid set!: " + e.to_write());
            var h = e.second(),
              p =
                ((e = e.third()),
                this.compile_lookup(
                  h,
                  t,
                  function (e) {
                    return ["assign-local", e, i];
                  },
                  function (e) {
                    return ["assign-free", e, i];
                  },
                  function (e) {
                    return ["assign-global", e, i];
                  }
                ));
            i = p;
            break;
          case De("call/cc"):
            (e = e.second()),
              (c = [
                "conti",
                this.is_tail(i) ? t[0].size() + 1 : 0,
                [
                  "argument",
                  [
                    "constant",
                    1,
                    [
                      "argument",
                      this.compile(
                        e,
                        t,
                        n,
                        r,
                        this.is_tail(i)
                          ? ["shift", 1, ["tco_hinted_apply"]]
                          : ["apply"]
                      ),
                    ],
                  ],
                ],
              ]);
            return this.is_tail(i) ? c : ["frame", c, i];
          default:
            var m = e.car,
              v = e.cdr;
            c = this.compile(
              m,
              t,
              n,
              r,
              this.is_tail(i)
                ? ["shift", v.length(), ["tco_hinted_apply"]]
                : ["apply"]
            );
            c = this.compile(v.length(), t, n, r, ["argument", c]);
            for (a = v; a instanceof at; a = a.cdr)
              c = this.compile(a.car, t, n, r, ["argument", c]);
            return this.is_tail(i) ? c : ["frame", c, i];
        }
      }
    },
    _compile_define: function (t, i) {
      if (1 == t.length()) throw new Be("Invalid `define': " + t.to_write());
      var o = t.cdr.car,
        u = t.cdr.cdr;
      if (o instanceof Ae) {
        if (u === n) t = r;
        else {
          if (u.cdr !== n) throw new Be("Invalid `define': " + t.to_write());
          t = u.car;
        }
        e.hasOwnProperty(o.name) || (e[o.name] = r),
          (i = ["assign-global", o.name, i]);
      } else {
        if (!(o instanceof at))
          throw new Be("define: symbol or pair expected but got " + o);
        var a = o.car,
          c = o.cdr;
        (t = new at(De("lambda"), new at(c, u))),
          e.hasOwnProperty(o.name) || (e[a.name] = r),
          (i = ["assign-global", a.name, i]);
      }
      return [t, i];
    },
    _compile_lambda: function (e, t, n, r, i) {
      if (e.length() < 3) throw new Be("Invalid lambda: " + e.to_write());
      var o = e.cdr.car,
        u = e.cdr.cdr,
        a = Tt.transform_internal_define(u);
      if (ct(a) && Je(a.car) && "letrec*" == a.car.name) var c = Tt.expand(a);
      else c = new at(De("begin"), e.cdr.cdr);
      var s = this.find_dot_pos(o),
        f = this.dotted2proper(o),
        l = this.find_free(c, f.to_set(), r),
        d = this.find_sets(c, f.to_set()),
        h = this.compile(
          c,
          [f.to_set(), l],
          d.set_union(n.set_intersect(l)),
          r.set_union(f.to_set()),
          ["return"]
        ),
        p = [
          "close",
          o instanceof at ? o.length() : 0,
          l.size(),
          this.make_boxes(d, f, h),
          i,
          s,
        ];
      return this.collect_free(l, t, p);
    },
    run: function (e) {
      return this.compile(e, [new ut(), new ut()], new ut(), new ut(), [
        "halt",
      ]);
    },
  });
  (Tt.compile = function (e, t) {
    return (e = Tt.expand(e)), new Tt().run(e, t);
  }),
    (Tt.expand = function (r, i) {
      var o = Tt.expand;
      i || (i = {});
      var u = null;
      if (r instanceof at)
        switch (r.car) {
          case De("define"):
            var a = r.cdr.car,
              c = r.cdr.cdr;
            u = new at(De("define"), new at(a, o(c, i)));
            break;
          case De("begin"):
            u = new at(De("begin"), o(r.cdr, i));
            break;
          case De("quote"):
            u = r;
            break;
          case De("lambda"):
            var s = r.cdr.car,
              f = r.cdr.cdr;
            u = new at(De("lambda"), new at(s, o(f, i)));
            break;
          case De("if"):
            var l = r.second(),
              d = r.third(),
              h = r.fourth();
            u = lt(De("if"), o(l, i), o(d, i), o(h, i));
            break;
          case De("set!"):
            var p = r.second();
            r = r.third();
            u = lt(De("set!"), p, o(r, i));
            break;
          case De("call-with-current-continuation"):
          case De("call/cc"):
            r = r.second();
            u = lt(De("call/cc"), o(r, i));
            break;
          default:
            var m = null;
            if (
              (Je(r.car) &&
                (e[r.car.name] instanceof jt
                  ? (m = e[r.car.name])
                  : t[r.car.name] instanceof jt && (m = t[r.car.name])),
              m)
            ) {
              var v;
              for (
                i.modified = !0, u = m.transform(r);
                (u = o(u, (v = {}))), v.modified;

              );
            } else {
              var g,
                y = o(r.car, i);
              if (!(r.cdr instanceof at) && r.cdr !== n)
                throw new Be(
                  "proper list required for function application or macro use: " +
                    to_write(r)
                );
              (g = dt(
                r.cdr.to_array().map(function (e) {
                  return o(e, i);
                })
              )),
                (u = new at(y, g));
            }
        }
      else u = r;
      return u;
    });
  var St = function (e) {
      return ct(e) && De("define") === e.car;
    },
    Ct = function (e) {
      var t = e.cdr.car,
        n = e.cdr.cdr;
      if (Je(t)) return new at((r = t), n);
      var r = t.car,
        i = new at(De("lambda"), new at(t.cdr, n));
      return lt(r, i);
    };
  Tt.transform_internal_define = function (e) {
    for (var t = [], n = e; St(n.car); ) t.push(n.car), (n = n.cdr);
    var r = n;
    if (0 == t.length) return e;
    var i = lt.apply(null, q(t, Ct));
    return new at(De("letrec*"), new at(i, r));
  };
  const Et = function (e) {
      return function () {
        const t = "";
        e.apply(this, [t].concat(B(arguments)));
      };
    },
    qt = function (e, t, n) {
      return Et(function (n, r, i) {
        const o = i ? "(" + i + "): " : "";
        if (!t(r)) throw new Be(o + e + " required, but got " + Me(r));
      });
    },
    At = Ee.create({
      initialize: function (e, t, n) {
        (this.mutable = void 0 === n || !!n),
          (this.hash_proc = e),
          (this.equiv_proc = t),
          (this.pairs_of = {});
      },
      clear: function () {
        this.pairs_of = {};
      },
      candidate_pairs: function (e) {
        return this.pairs_of[e];
      },
      add_pair: function (e, t, n) {
        var r = this.pairs_of[e];
        r ? r.push([t, n]) : (this.pairs_of[e] = [[t, n]]);
      },
      remove_pair: function (e, t) {
        var n = this.pairs_of[e],
          r = n.indexOf(t);
        if (-1 == r) throw new He("Hashtable#remove_pair: pair not found!");
        n.splice(r, 1);
      },
      create_copy: function (e) {
        var t = new At(this.hash_proc, this.equiv_proc, e);
        return (
          E(
            K(this.pairs_of),
            V(function (e) {
              var n = q(this.pairs_of[e], function (e) {
                return ue(e);
              });
              t.pairs_of[e] = n;
            }, this)
          ),
          t
        );
      },
      size: function () {
        var e = 0;
        return (
          this._apply_pair(function (t) {
            e++;
          }),
          e
        );
      },
      keys: function () {
        return this._apply_pair(function (e) {
          return e[0];
        });
      },
      values: function () {
        return this._apply_pair(function (e) {
          return e[1];
        });
      },
      _apply_pair: function (e) {
        var t = [];
        return (
          E(ee(this.pairs_of), function (n) {
            E(n, function (n) {
              t.push(e(n));
            });
          }),
          t
        );
      },
      to_write: function () {
        return "#<Hashtable size=" + this.size() + ">";
      },
    }),
    Dt = function (e) {
      return e instanceof At;
    };
  (At.equal_hash = function (e) {
    return Me(e[0]);
  }),
    (At.eq_hash = At.equal_hash),
    (At.eqv_hash = At.equal_hash),
    (At.string_hash = function (e) {
      return e[0];
    }),
    (At.string_ci_hash = function (e) {
      return de(e[0]) ? e[0].toLowerCase() : e[0];
    }),
    (At.symbol_hash = function (e) {
      return e[0] instanceof Ae ? e[0].name : e[0];
    }),
    (At.eq_equiv = function (e) {
      return nt(e[0], e[1]);
    }),
    (At.eqv_equiv = function (e) {
      return rt(e[0], e[1]);
    });
  const Nt = Ee.create({
    initialize: function (e) {
      (this.tokens = this.tokenize(e)), (this.i = 0);
    },
    inspect: function () {
      return [
        "#<Parser:",
        this.i,
        "/",
        this.tokens.length,
        " ",
        Re(this.tokens),
        ">",
      ].join("");
    },
    tokenize: function (e) {
      for (var t = new Array(), n = null, r = 0; "" != e && n != e; )
        (n = e),
          (e = e.replace(
            /^\s*(;[^\r\n]*(\r|\n|$)|#;|#\||#\\[^\w]|#?(\(|\[|{)|\)|\]|}|\'|`|,@|,|\+inf\.0|-inf\.0|\+nan\.0|\"(\\(.|$)|[^\"\\])*(\"|$)|[^\s()\[\]{}]+)/,
            function (e, n) {
              var i = n;
              if ("#|" == i) return r++, "";
              if (r > 0) {
                if (/(.*\|#)/.test(i)) {
                  if (--r < 0)
                    throw new Be("Found an extra comment terminator: `|#'");
                  return i.substring(RegExp.$1.length, i.length);
                }
                return "";
              }
              return ";" != i.charAt(0) && (t[t.length] = i), "";
            }
          ));
      return t;
    },
    sexpCommentMarker: new Object(),
    getObject: function () {
      var e = this.getObject0();
      if (e != this.sexpCommentMarker) return e;
      if ((e = this.getObject()) == Nt.EOS)
        throw new Be("Readable object not found after S exression comment");
      return (e = this.getObject());
    },
    getList: function (e) {
      for (var t = n, r = t; this.i < this.tokens.length; ) {
        if (
          (this.eatObjectsInSexpComment(
            "Input stream terminated unexpectedly(in list)"
          ),
          ")" == this.tokens[this.i] ||
            "]" == this.tokens[this.i] ||
            "}" == this.tokens[this.i])
        ) {
          this.i++;
          break;
        }
        if ("." == this.tokens[this.i]) {
          this.i++;
          var i = this.getObject();
          i != Nt.EOS && t != n && (r.cdr = i);
        } else {
          var o = new at(this.getObject(), n);
          t == n ? (t = o) : (r.cdr = o), (r = o);
        }
      }
      return t;
    },
    getVector: function (e) {
      for (var t = new Array(); this.i < this.tokens.length; ) {
        if (
          (this.eatObjectsInSexpComment(
            "Input stream terminated unexpectedly(in vector)"
          ),
          ")" == this.tokens[this.i] ||
            "]" == this.tokens[this.i] ||
            "}" == this.tokens[this.i])
        ) {
          this.i++;
          break;
        }
        t[t.length] = this.getObject();
      }
      return t;
    },
    eatObjectsInSexpComment: function (e) {
      for (; "#;" == this.tokens[this.i]; )
        if (
          (this.i++, this.getObject() == Nt.EOS || this.i >= this.tokens.length)
        )
          throw new Be(e);
    },
    getObject0: function () {
      if (this.i >= this.tokens.length) return Nt.EOS;
      var e = this.tokens[this.i++];
      if ("#;" == e) return this.sexpCommentMarker;
      var t,
        r =
          "'" == e
            ? "quote"
            : "`" == e
            ? "quasiquote"
            : "," == e
            ? "unquote"
            : ",@" == e && "unquote-splicing";
      if (
        r ||
        "(" == e ||
        "#(" == e ||
        "[" == e ||
        "#[" == e ||
        "{" == e ||
        "#{" == e
      )
        return r
          ? new at(De(r), new at(this.getObject(), n))
          : "(" == e || "[" == e || "{" == e
          ? this.getList(e)
          : this.getVector(e);
      switch (e) {
        case "+inf.0":
          return 1 / 0;
        case "-inf.0":
          return -1 / 0;
        case "+nan.0":
          return NaN;
      }
      if (
        ((t = /^#x[0-9a-z]+$/i.test(e)
          ? new Number("0x" + e.substring(2, e.length))
          : /^#d[0-9\.]+$/i.test(e)
          ? new Number(e.substring(2, e.length))
          : new Number(e)),
        isNaN(t))
      ) {
        if ("#f" == e || "#F" == e) return !1;
        if ("#t" == e || "#T" == e) return !0;
        if ("#\\newline" == e.toLowerCase()) return ze.get("\n");
        if ("#\\space" == e.toLowerCase()) return ze.get(" ");
        if ("#\\tab" == e.toLowerCase()) return ze.get("\t");
        if (/^#\\.$/.test(e)) return ze.get(e.charAt(2));
        if (/^#\\x[a-zA-Z0-9]+$/.test(e)) {
          var i = parseInt(e.slice(3), 16);
          if (i >= 55296 && i <= 57343)
            throw new Be("Character in Unicode excluded range.");
          if (i > 65535) throw new Be("Character literal out of range.");
          return ze.get(String.fromCharCode(i));
        }
        return /^\"(\\(.|$)|[^\"\\])*\"?$/.test(e)
          ? e
              .replace(/(\r?\n|\\n)/g, "\n")
              .replace(/^\"|\\(.|$)|\"$/g, function (e, t) {
                return t || "";
              })
          : De(e);
      }
      return t.valueOf();
    },
  });
  (Nt.EOS = new Object()),
    (Nt.parse = (e) => {
      const t = new Nt(e),
        n = [];
      for (;;) {
        var r = t.getObject();
        if (r === Nt.EOS) break;
        n.push(r);
      }
      return n;
    });
  const Ot = Ee.create({
    initialize: function () {
      var e = null,
        t = null;
      2 == arguments.length
        ? ((e = arguments[0]), (t = arguments[1]))
        : 1 == arguments.length && arguments[0] instanceof Ot
        ? (e = arguments[0])
        : 1 == arguments.length &&
          "function" == typeof arguments[0] &&
          (t = arguments[0]),
        (this.stack = []),
        (this.on_error = t || (e ? e.on_error : function (e) {})),
        (this.after_evaluate = function () {}),
        (this.last_refer = e ? e.last_refer : null),
        (this.call_stack = e ? ue(e.call_stack) : []),
        (this.tco_counter = []),
        (this.max_trace_size = e ? e.max_trace_size : 40),
        (this.current_dynamic_winder = Ot.DynamicWind.ROOT);
    },
    inspect: function () {
      return [
        "#<Interpreter: stack size=>",
        this.stack.length,
        " ",
        "after_evaluate=",
        Re(this.after_evaluate),
        ">",
      ].join("");
    },
    push: function (e, t) {
      return (this.stack[t] = e), t + 1;
    },
    save_stack: function (e) {
      for (var t = [], n = 0; n < e; n++) t[n] = this.stack[n];
      return {
        stack: t,
        last_refer: this.last_refer,
        call_stack: ue(this.call_stack),
        tco_counter: ue(this.tco_counter),
      };
    },
    restore_stack: function (e) {
      const t = e.stack,
        n = t.length;
      for (var r = 0; r < n; r++) this.stack[r] = t[r];
      return (
        (this.last_refer = e.last_refer),
        (this.call_stack = ue(e.call_stack)),
        (this.tco_counter = ue(e.tco_counter)),
        n
      );
    },
    capture_continuation: function (e, t) {
      var n = this.push(t, e);
      return this.closure(
        ["nuate1", this.save_stack(n), this.current_dynamic_winder],
        1,
        0,
        null,
        -1
      );
    },
    shift_args: function (e, t, n) {
      for (var r = e; r >= 0; r--)
        this.index_set(n, r + t + 1, this.index(n, r));
      return n - t - 1;
    },
    index: function (e, t) {
      return this.stack[e - 1 - t];
    },
    index_set: function (e, t, n) {
      this.stack[e - 1 - t] = n;
    },
    closure: function (e, t, n, r, i) {
      var o = [];
      o[0] = e;
      for (var u = 0; u < n; u++) o[u + 1] = this.index(r, u);
      return (o[n + 1] = i), -1 == i && (o.expected_args = t), et(o), o;
    },
    run_dump_hook: function (e, t, n, r, i) {
      var o, u;
      if (this.dumper) o = this.dumper;
      else {
        if (!Ot.dumper) return;
        o = Ot.dumper;
      }
      o &&
        ((u = { a: e, f: n, c: r, s: i, x: t, stack: this.stack }), o.dump(u));
    },
    _execute: function (i, o, u, a, c) {
      for (var s = null; ; )
        switch ((this.run_dump_hook(i, o, u, a, c), o[0])) {
          case "halt":
            return i;
          case "refer-local":
            var f = o[1];
            o = o[2];
            (i = this.index(u, f + 1)), (this.last_refer = "(anon)");
            break;
          case "refer-free":
            (f = o[1]), (o = o[2]);
            (i = a[f + 1]), (this.last_refer = "(anon)");
            break;
          case "refer-global":
            var l = o[1];
            o = o[2];
            if (e.hasOwnProperty(l)) var d = e[l];
            else {
              if (!t.hasOwnProperty(l))
                throw new Be("execute: unbound symbol: " + Re(l));
              d = t[l];
            }
            (i = d), (this.last_refer = l || "(anon)");
            break;
          case "indirect":
            o = o[1];
            i = i[0];
            break;
          case "constant":
            var h = o[1];
            o = o[2];
            (i = h), (this.last_refer = "(anon)");
            break;
          case "close":
            var p = o,
              m = p[1],
              v = ((f = p[2]), p[3]),
              g = ((o = p[4]), p[5]);
            (i = this.closure(v, m, f, c, g)), (c -= f);
            break;
          case "box":
            (f = o[1]), (o = o[2]);
            this.index_set(c, f + 1, [this.index(c, f + 1)]);
            break;
          case "test":
            var y = o[1],
              w = o[2];
            o = !1 !== i ? y : w;
            break;
          case "assign-global":
            var b = o[1];
            o = o[2];
            if (!e.hasOwnProperty(b) && !t.hasOwnProperty(b))
              throw new Be("global variable '" + b + "' is not defined");
            (e[b] = i), (i = r);
            break;
          case "assign-local":
            (f = o[1]), (o = o[2]);
            (this.index(u, f + 1)[0] = i), (i = r);
            break;
          case "assign-free":
            (f = o[1]), (o = o[2]);
            (a[f + 1][0] = i), (i = r);
            break;
          case "conti":
            (f = o[1]), (o = o[2]);
            i = this.capture_continuation(c, f);
            break;
          case "nuate1":
            var _ = o[1],
              x = o[2],
              k = this.current_dynamic_winder,
              j = Ot.DynamicWind.listWinders(k, x);
            o = Ot.DynamicWind.joinWinders(j, [
              "refer-local",
              0,
              ["nuate2", _],
            ]);
            break;
          case "nuate2":
            (_ = o[1]), (o = ["return"]);
            c = this.restore_stack(_);
            break;
          case "frame":
            s = o[2];
            (o = o[1]),
              (c = this.push(s, this.push(u, this.push(a, c)))),
              (this.tco_counter[this.tco_counter.length] = 0);
            break;
          case "argument":
            o = o[1];
            c = this.push(i, c);
            break;
          case "shift":
            (f = o[1]), (o = o[2]);
            var T = this.index(c, f + 1);
            c = this.shift_args(f, T, c);
            break;
          case "tco_hinted_apply":
            this.tco_counter[this.tco_counter.length - 1]++,
              (o = ["apply"].concat(I(o)));
            break;
          case "apply":
            var S = i;
            this.call_stack.push(this.last_refer),
              this.call_stack.length > this.max_trace_size &&
                this.call_stack.shift();
            T = this.index(c, 0);
            if (Ze(S)) {
              if (((i = S), (o = S[0]), (g = S[S.length - 1]) >= 0)) {
                for (var C = n, E = T; --E >= g; )
                  C = new at(this.index(c, E + 1), C);
                if (g >= T) {
                  for (E = 0; E < T + 1; E++)
                    this.index_set(c, E - 1, this.index(c, E));
                  c++, this.index_set(c, 0, this.index(c, 0) + 1);
                }
                this.index_set(c, g + 1, C);
              } else if (S.expected_args && T != S.expected_args) {
                var q =
                  "Function call error: got " +
                  T +
                  " but wanted " +
                  S.expected_args;
                throw new Be(q);
              }
              (u = c), (a = i);
            } else {
              if (!(S instanceof Function))
                throw new Be(Re(S) + " is not a function");
              var A = [];
              for (E = 0; E < T; E++) A.push(this.index(c, E + 1));
              var D = S(A, this);
              if (D instanceof Fe) {
                var O = D;
                return O.set_state(this, ["return"], u, a, c), O.ready(), O;
              }
              if (D instanceof xt) {
                var M = [
                    "frame",
                    [
                      "argument",
                      [
                        "constant",
                        1,
                        ["argument", ["constant", D.after, ["apply"]]],
                      ],
                    ],
                    ["return"],
                  ],
                  L = [
                    "constant",
                    D.args.length,
                    [
                      "argument",
                      ["constant", D.proc, ["apply", D.args.length]],
                    ],
                  ];
                o = [
                  "frame",
                  N(
                    D.args,
                    function (e, t) {
                      return ["constant", t, ["argument", e]];
                    },
                    L
                  ),
                  M,
                ];
              } else (i = D), (o = ["return"]);
            }
            break;
          case "return":
            var R = c - (f = this.index(c, 0));
            (o = this.index(R, 1)),
              (u = this.index(R, 2)),
              (a = this.index(R, 3)),
              (c = R - 3 - 1);
            var B = 1 + this.tco_counter[this.tco_counter.length - 1];
            this.call_stack.splice(-B), this.tco_counter.pop();
            break;
          default:
            throw new He("unknown opecode type: " + o[0]);
        }
      return i;
    },
    evaluate: function (e, t) {
      (this.call_stack = []),
        (this.parser = new Nt(e)),
        (this.compiler = new Tt()),
        t && (this.after_evaluate = t),
        (this.is_top = !0),
        (this.file_stack = []);
      try {
        return this.resume(!1);
      } catch (e) {
        return (
          (e.message = e.message + " [" + this.call_stack.join(", ") + "]"),
          this.on_error(e)
        );
      }
    },
    resume: function (e, t, n, i, o, u) {
      for (var a = r; ; ) {
        if (e) (a = this._execute(t, n, i, o, u)), (e = !1);
        else {
          if (!this.parser) break;
          var c = this.parser.getObject();
          if (c === Nt.EOS) break;
          c = Tt.expand(c);
          var s = this.compiler.run(c);
          a = this._execute(c, s, 0, [], 0);
        }
        if (a instanceof Fe) return a;
      }
      return this.after_evaluate(a), a;
    },
    invoke_closure: function (e, t) {
      t || (t = []);
      for (
        var n = t.length,
          r = ["constant", n, ["argument", ["constant", e, ["apply"]]]],
          i = 0;
        i < n;
        i++
      )
        r = ["constant", t[i], ["argument", r]];
      return this._execute(e, ["frame", r, ["halt"]], 0, e, 0);
    },
    compile: function (e) {
      var t = Ot.read(e);
      return Tt.compile(t);
    },
    push_dynamic_winder: function (e, t) {
      this.current_dynamic_winder = new Ot.DynamicWind(
        this.current_dynamic_winder,
        e,
        t
      );
    },
    pop_dynamic_winder: function (e, t) {
      this.current_dynamic_winder = this.current_dynamic_winder.parent;
    },
  });
  (Ot.read = function (e) {
    var t = new Nt(e).getObject();
    return t == Nt.EOS ? $e : t;
  }),
    (Ot.expand = function () {
      throw "Interpreter.expand is moved to Compiler.expand";
    }),
    (Ot.DynamicWind = Ee.create({
      initialize: function (e, t, n) {
        (this.parent = e), (this.before = t), (this.after = n);
      },
    })),
    (Ot.DynamicWind.ROOT = { _: "this is ROOT." }),
    (Ot.DynamicWind.listWinders = function (e, t) {
      for (var n = [e]; e !== Ot.DynamicWind.ROOT; ) (e = e.parent), n.push(e);
      for (var r, i = []; ; ) {
        var o = n.find(function (e) {
          return e === t;
        });
        if (o) {
          r = o;
          break;
        }
        i.push(t), (t = t.parent);
      }
      for (var u = [], a = 0; a < n.length && n[a] !== r; a++)
        u.push(n[a].after);
      return (
        i.reverse(),
        i.forEach(function (e) {
          u.push(e.before);
        }),
        u
      );
    }),
    (Ot.DynamicWind.joinWinders = function (e, t) {
      return e.reduceRight(function (e, t) {
        return [
          "frame",
          ["constant", 0, ["argument", ["constant", t, ["apply"]]]],
          e,
        ];
      }, t);
    });
  const Mt = Ee.create({
    initialize: function (e, t) {
      (this.real = e), (this.imag = t);
    },
    magnitude: function () {
      return Math.sqrt(this.real * this.real + this.imag * this.imag);
    },
    angle: function () {
      return Math.atan2(this.imag, this.real);
    },
    isReal: function () {
      return 0 == this.imag;
    },
    isRational: function () {
      return 0 == this.imag && It(this.real);
    },
    isInteger: function () {
      return 0 == this.imag && Pt(this.real);
    },
    toString: function (e) {
      if (0 === this.real && 0 === this.imag) return "0";
      var t = "";
      if (0 !== this.imag) {
        switch ((this.imag > 0 && 0 !== this.real && (t += "+"), this.imag)) {
          case 1:
            break;
          case -1:
            t += "-";
            break;
          default:
            t += this.imag.toString(e);
        }
        t += "i";
      }
      var n = "";
      return 0 !== this.real && (n += this.real.toString(e)), n + t;
    },
  });
  (Mt.from_polar = function (e, t) {
    var n = e * Math.cos(t),
      r = e * Math.sin(t);
    return new Mt(n, r);
  }),
    (Mt.assure = function (e) {
      return e instanceof Mt ? e : new Mt(e, 0);
    });
  const Lt = Ee.create({
      initialize: function (e, t) {
        (this.numerator = e), (this.denominator = t);
      },
      isInteger: function () {},
    }),
    Rt = function (e) {
      return e instanceof Mt || e instanceof Lt || "number" == typeof e;
    },
    Bt = Rt,
    Ht = function (e) {
      return e instanceof Mt || e instanceof Lt
        ? e.isReal()
        : "number" == typeof e;
    },
    It = function (e) {
      return e instanceof Mt
        ? e.isRational()
        : e instanceof Lt || "number" == typeof e;
    },
    Pt = function (e) {
      return e instanceof Mt || e instanceof Lt
        ? e.isInteger()
        : "number" == typeof e && e % 1 == 0;
    },
    zt = Ee.create({
      initialize: function (e, t) {
        this.box = [e, t];
      },
      is_done: function () {
        return this.box[0];
      },
      value: function () {
        if (!this.is_done()) throw new He("this promise is not calculated yet");
        return this.box[1];
      },
      thunk: function () {
        if (this.is_done())
          throw new He("this promise does not know the thunk");
        return this.box[1];
      },
      update_with: function (e) {
        (this.box[0] = e.box[0]), (this.box[1] = e.box[1]), (e.box = this.box);
      },
    }),
    Ft = function (e) {
      return e instanceof zt;
    };
  (zt.fresh = function (e) {
    return new zt(!1, e);
  }),
    (zt.done = function (e) {
      return new zt(!0, e);
    });
  const $t = function (e, n, r, i) {
      var o = function (t, o) {
        return (
          (function (e, t, n, r) {
            if (t < n)
              throw new Be(
                r && r == n
                  ? e +
                    ": wrong number of arguments (expected: " +
                    n +
                    " got: " +
                    t +
                    ")"
                  : e +
                    ": too few arguments (at least: " +
                    n +
                    " got: " +
                    t +
                    ")"
              );
            if (r && r < t)
              throw new Be(
                e + ": too many arguments (at most: " + r + " got: " + t + ")"
              );
          })(e, t.length, n, r),
          i(t, o)
        );
      };
      (i.fname = e),
        (o.inspect = function () {
          return this.fname;
        }),
        (t[e] = o);
    },
    Wt = function (e, n) {
      t[e]
        ? ce(n)
          ? q(n, function (t) {
              Wt(e, t);
            })
          : de(n)
          ? (t[n] = t[e])
          : console.error(
              "[BUG] bad alias for library function `" +
                e +
                "': " +
                n.toString()
            )
        : console.error(
            "[BUG] library function `" +
              e +
              "' does not exist, so can't alias it."
          );
    },
    Ut = function (e, n) {
      var r = new jt(e, n);
      t[e] = r;
    },
    Vt = qt("number", function (e) {
      return "number" == typeof e || e instanceof Mt;
    }),
    Xt = qt("integer", function (e) {
      return "number" == typeof e && e % 1 == 0;
    }),
    Yt = qt("real number", function (e) {
      return "number" == typeof e;
    }),
    Gt = Et(function (e, t, n, r) {
      if ("number" != typeof t || t != Math.round(t))
        throw new Be(e + ": number required, but got " + Me(t));
      if (t < n || r < t)
        throw new Be(
          e +
            ": number must be between " +
            n +
            " and " +
            r +
            ", but got " +
            Me(t)
        );
    }),
    Jt = qt("string", Xe),
    Qt = qt("character", Ge),
    Kt = qt("symbol", Je),
    Zt = qt("port", Qe),
    en = qt("pair", ct),
    tn = qt("list", st),
    nn = qt("vector", Ke),
    rn = qt("hashtable", Dt),
    on = qt("promise", Ft),
    un = qt("JavaScript function", Ye),
    an = qt("scheme function", Ze),
    cn = qt("scheme/js function", function (e) {
      return Ze(e) || Ye(e);
    }),
    sn = qt("date", function (e) {
      return e instanceof Date;
    }),
    fn = Et(function (e, t, n, r) {
      if (!t) throw new Be((r || e) + ": " + n);
    }),
    ln = function (e, t, n) {
      var r =
        e +
        " is deprecated and will be removed in BiwaScheme " +
        t +
        ". Please use " +
        n +
        " instead";
      console.warn(r);
    },
    dn = function (e) {
      Jt(e);
      var t = e.split("/");
      if (2 !== t.length) return !1;
      var n = t[0],
        r = t[1],
        i = pn(n, 10),
        o = pn(r, 10);
      return !1 !== i && !1 !== o && !(o <= 0) && i / o;
    },
    hn = function (e, t) {
      if ((Jt(e), Xt(t), t < 2 || t > 36)) return !1;
      var n = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, t);
      return new RegExp("^[+-]?[" + n + "]+$", "ig").test(e);
    },
    pn = function (e, t) {
      if ((Jt(e), Xt(t), t < 2 || t > 36)) return !1;
      if (!hn(e, t)) return !1;
      var n = parseInt(e, t);
      return !Number.isNaN(n) && n;
    },
    mn = function (e) {
      Jt(e);
      return (
        !(
          !/^[+-]?[0-9]+[.]?[0-9]*e[+-]?[0-9]+$/i.test(e) &&
          !/(^[+-]?[0-9]*[.][0-9]+$)|(^[+-]?[0-9]+[.][0-9]*$)/.test(e)
        ) || hn(e, 10)
      );
    },
    vn = function (e) {
      if ((Jt(e), !mn(e))) return !1;
      var t = new Number(e).valueOf();
      return !Number.isNaN(t) && !!Number.isFinite(t) && t;
    },
    gn = {};
  (gn.EnumType = Ee.create({
    initialize: function (e) {
      this.members = z(e);
    },
    universe: function () {
      return new gn.EnumSet(this, this.members);
    },
    indexer: function () {
      return V(function (e) {
        Kt(e[0], "(enum-set indexer)");
        var t = W(this.members, e[0]);
        return -1 !== t && t;
      }, this);
    },
    constructor: function () {
      return V(function (e) {
        tn(e[0], "(enum-set constructor)");
        var t = e[0].to_array();
        return (
          E(t, function (e) {
            Kt(e, "(enum-set constructor)");
          }),
          new gn.EnumSet(this, t)
        );
      }, this);
    },
  })),
    Ee.memoize(gn.EnumType, ["universe", "indexer", "constructor"]),
    (gn.EnumSet = Ee.create({
      initialize: function (e, t) {
        (this.enum_type = e),
          (this.symbols = O(e.members, function (e) {
            return M(t, e);
          }));
      },
      symbol_list: function () {
        return dt(this.symbols);
      },
      is_member: function (e) {
        return M(this.symbols, e);
      },
      is_subset: function (e) {
        return (
          !(function (e, t, n) {
            t = b(t, n);
            for (
              var r = !C(e) && K(e), i = (r || e).length, o = 0;
              o < i;
              o++
            ) {
              var u = r ? r[o] : o;
              if (t(e[u], u, e)) return !0;
            }
            return !1;
          })(this.symbols, function (t) {
            return !M(e.symbols, t);
          }) &&
          (this.enum_type === e.enum_type ||
            (function (e, t, n) {
              t = b(t, n);
              for (
                var r = !C(e) && K(e), i = (r || e).length, o = 0;
                o < i;
                o++
              ) {
                var u = r ? r[o] : o;
                if (!t(e[u], u, e)) return !1;
              }
              return !0;
            })(this.enum_type.members, function (t) {
              return M(e.enum_type.members, t);
            }))
        );
      },
      equal_to: function (e) {
        return this.is_subset(e) && e.is_subset(this);
      },
      union: function (e) {
        var t = O(
          this.enum_type.members,
          V(function (t) {
            return M(this.symbols, t) || M(e.symbols, t);
          }, this)
        );
        return new gn.EnumSet(this.enum_type, t);
      },
      intersection: function (e) {
        var t = O(this.symbols, function (t) {
          return M(e.symbols, t);
        });
        return new gn.EnumSet(this.enum_type, t);
      },
      difference: function (e) {
        var t = O(this.symbols, function (t) {
          return !M(e.symbols, t);
        });
        return new gn.EnumSet(this.enum_type, t);
      },
      complement: function () {
        var e = O(
          this.enum_type.members,
          V(function (e) {
            return !M(this.symbols, e);
          }, this)
        );
        return new gn.EnumSet(this.enum_type, e);
      },
      projection: function (e) {
        var t = O(this.symbols, function (t) {
          return M(e.enum_type.members, t);
        });
        return new gn.EnumSet(e.enum_type, t);
      },
      toString: function () {
        return "#<EnumSet " + Re(this.symbols) + ">";
      },
    })),
    Ee.memoize(gn.EnumSet, "symbol_list");
  const yn = function (e) {
      return e instanceof gn.EnumSet;
    },
    wn = qt("enum_set", yn),
    bn = Ee.create({
      initialize: function (e, t) {
        Tn(e, "new Record"), (this.rtd = e), (this.fields = t);
      },
      get: function (e) {
        return this.fields[e];
      },
      set: function (e, t) {
        this.fields[e] = t;
      },
      toString: function () {
        var e = Me(this.fields);
        return "#<Record " + this.rtd.name + " " + e + ">";
      },
    }),
    _n = function (e) {
      return e instanceof bn;
    };
  (bn._DefinedTypes = {}),
    (bn.define_type = function (e, t, n) {
      return (bn._DefinedTypes[e] = { rtd: t, cd: n });
    }),
    (bn.get_type = function (e) {
      return bn._DefinedTypes[e];
    }),
    (bn.RTD = Ee.create({
      initialize: function (e, t, n, r, i, o) {
        (this.name = e),
          (this.parent_rtd = t),
          (this.is_base_type = !t),
          n
            ? ((this.uid = n), (this.generative = !1))
            : ((this.uid = this._generate_new_uid()), (this.generative = !0)),
          (this.sealed = !!r),
          (this.opaque = t.opaque || !!i),
          (this.fields = q(o, function (e) {
            return { name: e[0], mutable: !!e[1] };
          }));
      },
      field_name: function (e) {
        for (
          var t = this._field_names(), n = this.parent_rtd;
          n;
          n = n.parent_rtd
        )
          t = n._field_names() + t;
        return t[e];
      },
      _field_names: function () {
        return q(this.fields, function (e) {
          return e.name;
        });
      },
      _generate_new_uid: function () {
        return De(Se("__record_td_uid"));
      },
      toString: function () {
        return "#<RecordTD " + name + ">";
      },
    })),
    (bn.RTD.NongenerativeRecords = {});
  const xn = function (e) {
    return e instanceof bn.RTD;
  };
  bn.CD = Ee.create({
    initialize: function (e, t, n) {
      this._check(e, t, n),
        (this.rtd = e),
        (this.parent_cd = t),
        n
          ? ((this.has_custom_protocol = !0), (this.protocol = n))
          : ((this.has_custom_protocol = !1),
            e.parent_rtd
              ? (this.protocol = this._default_protocol_for_derived_types())
              : (this.protocol = this._default_protocol_for_base_types()));
    },
    _check: function (e, t, n) {
      if (e.is_base_type && t)
        throw new Error(
          "Record.CD.new: cannot specify parent cd of a base type"
        );
      if (t && e.parent_rtd && t.rtd != e.parent_rtd)
        throw new Error(
          "Record.CD.new: mismatched parents between rtd and parent_cd"
        );
      if (e.parent_rtd && !t && n)
        throw new Error(
          "Record.CD.new: protocol must be #f when parent_cd is not given"
        );
      if (t && t.has_custom_protocol && !n)
        throw new Error(
          "Record.CD.new: protocol must be specified when parent_cd has a custom protocol"
        );
    },
    _default_protocol_for_base_types: function () {
      return function (e) {
        var t = e[0];
        return cn(t, "_default_protocol/base"), t;
      };
    },
    _default_protocol_for_derived_types: function () {
      var e = this.rtd;
      return function (t) {
        var n = t[0];
        cn(n, "_default_protocol/n");
        return function (t) {
          var r = e.fields.length,
            i = t.length - r,
            o = t.slice(0, i),
            u = t.slice(i);
          return new xt(n, o, function (e) {
            var t = e[0];
            return (
              cn(t, "_default_protocol/p"),
              new xt(t, u, function (e) {
                var t = e[0];
                return jn(t, "_default_protocol/result"), t;
              })
            );
          });
        };
      };
    },
    toString: function () {
      return "#<RecordCD " + this.rtd.name + ">";
    },
    record_constructor: function () {
      var e = this.parent_cd ? this._make_n([], this.rtd) : this._make_p();
      return (
        (e = V(e, this)),
        new xt(this.protocol, [e], function (e) {
          var t = e[0];
          return cn(t, "record_constructor"), t;
        })
      );
    },
    _make_p: function () {
      return function (e) {
        return new bn(this.rtd, e);
      };
    },
    _make_n: function (e, t) {
      var n = this.parent_cd;
      return n
        ? function (r) {
            return function (i) {
              var o = [].concat(i[0]).concat(e),
                u = n._make_n(o, t);
              return new xt(n.protocol, [u], function (e) {
                var t = e[0];
                return (
                  cn(t, "_make_n"),
                  new xt(t, r, function (e) {
                    var t = e[0];
                    return jn(t), t;
                  })
                );
              });
            };
          }
        : function (n) {
            var r = n.concat(e);
            return new bn(t, r);
          };
    },
  });
  const kn = function (e) {
      return e instanceof bn.CD;
    },
    jn = qt("record", _n),
    Tn = qt("record type descriptor", xn),
    Sn = qt("record constructor descriptor", kn),
    Cn = Ee.create({
      initialize: function (e) {
        this.content = e;
      },
      to_write: function () {
        return "#<Values " + q(this.content, Me).join(" ") + ">";
      },
    }),
    En = {};
  $t("html-escape", 1, 1, function (e) {
    return Jt(e[0]), je(e[0]);
  });
  const qn = function (e) {
    return q(e, Re).join(", ");
  };
  $t("inspect", 1, null, function (e) {
    return qn(e);
  }),
    $t("inspect!", 1, null, function (e) {
      return En.puts(qn(e)), r;
    });
  const An = function (e) {
    switch (!0) {
      case he(e) || de(e) || !0 === e || !1 === e:
        return e;
      case ce(e):
        return dt(q(e, An));
      case "object" == typeof e:
        var t = n;
        for (key in e) t = new at(new at(key, An(e[key])), t);
        return t;
      default:
        throw new Error(
          "json->sexp: detected invalid value for json: " + Re(e)
        );
    }
  };
  $t("json->sexp", 1, 1, function (e) {
    return An(e[0]);
  }),
    $t("vector-push!", 2, null, function (e) {
      nn(e[0]);
      for (var t = 1; t < e.length; t++) e[0].push(e[t]);
      return e[0];
    }),
    $t("identity", 1, 1, function (e) {
      return e[0];
    }),
    Ut("inc!", function (e) {
      var t = e.cdr.car;
      return lt(De("begin"), lt(De("set!"), t, lt(De("+"), t, 1)), t);
    }),
    Ut("dec!", function (e) {
      var t = e.cdr.car;
      return lt(De("begin"), lt(De("set!"), t, lt(De("-"), t, 1)), t);
    }),
    $t("string-concat", 1, 1, function (e) {
      return tn(e[0]), e[0].to_array().join("");
    }),
    $t("string-split", 2, 2, function (e) {
      return Jt(e[0]), Jt(e[1]), dt(e[0].split(e[1]));
    }),
    $t("string-join", 1, 2, function (e) {
      tn(e[0]);
      var t = "";
      return e[1] && (Jt(e[1]), (t = e[1])), e[0].to_array().join(t);
    }),
    $t("intersperse", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      tn(n);
      var r = [];
      return (
        E(n.to_array().reverse(), function (e) {
          r.push(e), r.push(t);
        }),
        r.pop(),
        dt(r)
      );
    }),
    $t("map-with-index", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      E(n, tn);
      var r = [],
        i = 0;
      return xt.multi_foreach(n, {
        call: function (e) {
          var n = q(e, function (e) {
            return e.car;
          });
          return n.unshift(i), i++, new xt(t, n);
        },
        result: function (e) {
          r.push(e);
        },
        finish: function () {
          return dt(r);
        },
      });
    }),
    Ut("dotimes", function (e) {
      var t = e.cdr.car,
        n = e.cdr.cdr,
        r = t.car,
        i = t.cdr.car,
        o = t.cdr.cdr.car,
        u = Ne(),
        a = ht([
          [u, i],
          [r, 0, [De("+"), r, 1]],
        ]),
        c = ht([[De(">="), r, u], o]);
      return new at(De("do"), new at(a, new at(c, n)));
    });
  var Dn = function (e, t, n) {
    return e.sort(function (e, r) {
      return new Ot(n).invoke_closure(t, [e, r]);
    });
  };
  $t("list-sort/comp", 1, 2, function (e, t) {
    return cn(e[0]), tn(e[1]), dt(Dn(e[1].to_array(), e[0], t));
  }),
    $t("vector-sort/comp", 1, 2, function (e, t) {
      return cn(e[0]), nn(e[1]), Dn(ue(e[1]), e[0], t);
    }),
    $t("vector-sort/comp!", 1, 2, function (e, t) {
      return cn(e[0]), nn(e[1]), Dn(e[1], e[0], t), r;
    });
  Ut("define-macro", function (t) {
    var n,
      i = t.cdr.car;
    if (i instanceof at) {
      var o = i.car;
      n = i.cdr;
      var u = t.cdr.cdr,
        a = new at(De("lambda"), new at(n, u));
    } else {
      (o = i), (a = t.cdr.cdr.car);
      n = a.cdr.car;
    }
    var c = Tt.compile(a);
    if (0 != c[2])
      throw new Bug(
        "you cannot use free variables in macro expander (or define-macro must be on toplevel)"
      );
    var s = et([c[3]]);
    return (
      (e[o.name] = new jt(o.name, function (e) {
        var t = e.to_array();
        t.shift();
        var r = new Ot(),
          i = (function (e, t) {
            var n = [],
              r = new Tt().find_dot_pos(e);
            if (-1 == r) n = t;
            else {
              for (var i = 0; i < r; i++) n[i] = t[i];
              n[i] = dt(t.slice(i));
            }
            return n;
          })(n, t);
        return r.invoke_closure(s, i);
      })),
      r
    );
  });
  var Nn = function (t) {
    if (t instanceof at) {
      if (!(t.car instanceof Ae && e[t.car.name] instanceof jt))
        throw new Error("macroexpand-1: `" + yt(t) + "' is not a macro");
      t = e[t.car.name].transform(t);
    }
    return t;
  };
  Ut("%macroexpand", function (e) {
    var t = Tt.expand(e.cdr.car);
    return lt(De("quote"), t);
  }),
    Ut("%macroexpand-1", function (e) {
      var t = Nn(e.cdr.car);
      return lt(De("quote"), t);
    }),
    $t("macroexpand", 1, 1, function (e) {
      return Tt.expand(e[0]);
    }),
    $t("macroexpand-1", 1, 1, function (e) {
      return Nn(e[0]);
    }),
    $t("gensym", 0, 0, function (e) {
      return Ne();
    }),
    $t("print", 1, null, function (e) {
      return (
        q(e, function (e) {
          En.puts(Le(e), !0);
        }),
        En.puts(""),
        r
      );
    }),
    $t("write-to-string", 1, 1, function (e) {
      return Me(e[0]);
    }),
    $t("read-from-string", 1, 1, function (e) {
      return Jt(e[0]), Ot.read(e[0]);
    }),
    $t("port-closed?", 1, 1, function (e) {
      return Zt(e[0]), !e[0].is_open;
    }),
    $t("with-output-to-port", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      Zt(t), cn(n);
      var r = We.current_output;
      return (
        (We.current_output = t),
        new xt(n, [t], function (e) {
          return t.close(), (We.current_output = r), e[0];
        })
      );
    }),
    Ut("let1", function (e) {
      var t = e.cdr.car,
        r = e.cdr.cdr.car,
        i = e.cdr.cdr.cdr;
      return new at(
        new at(De("lambda"), new at(new at(t, n), i)),
        new at(r, n)
      );
    });
  var On = function (e, t) {
    if (!(e instanceof RegExp))
      throw new Error(t + ": regexp required, but got " + Me(e));
  };
  $t("string->regexp", 1, 1, function (e) {
    return Jt(e[0], "string->regexp"), new RegExp(e[0]);
  }),
    $t("regexp?", 1, 1, function (e) {
      return e[0] instanceof RegExp;
    }),
    $t("regexp->string", 1, 1, function (e) {
      return On(e[0], "regexp->string"), e[0].toString().slice(1, -1);
    }),
    $t("regexp-exec", 2, 2, function (e) {
      var t = e[0];
      de(e[0]) && (t = new RegExp(e[0])),
        On(t, "regexp-exec"),
        Jt(e[1], "regexp-exec");
      var n = t.exec(e[1]);
      return null !== n && dt(n);
    }),
    $t("regexp-replace-all", 3, 3, function (e) {
      var t = e[0];
      if (de(t)) var n = new RegExp(t, "g");
      else {
        On(t);
        n = new RegExp(t.source, "g");
      }
      return Jt(e[1]), Jt(e[2]), e[1].replace(n, e[2]);
    });
  let Mn = eval;
  $t("js-eval", 1, 1, function (e) {
    return Mn(e[0]);
  }),
    $t("js-ref", 2, 2, function (e) {
      return de(e[1]) ? e[0][e[1]] : (Kt(e[1]), e[0][e[1].name]);
    }),
    $t("js-set!", 3, 3, function (e) {
      return Jt(e[1]), (e[0][e[1]] = e[2]), r;
    }),
    $t("js-call", 1, null, function (e) {
      var t = e.shift();
      un(t);
      return t.apply(null, e);
    }),
    $t("js-invoke", 2, null, function (e) {
      var t = e.shift(),
        n = e.shift();
      if ((de(n) || (Kt(n), (n = n.name)), t[n])) return t[n].apply(t, e);
      throw new Error("js-invoke: function " + n + " is not defined");
    }),
    $t("js-invocation", 2, null, function (e, t) {
      var n = e.shift();
      Je(n) && (n = Mn(n.name));
      var r = n;
      return (
        E(e, function (e) {
          if (Je(e)) r = r[e.name];
          else {
            if (!st(e))
              throw new Be(
                "js-invocation: expected list or symbol for callspec but got " +
                  Re(e)
              );
            var n = e.to_array();
            Kt(n[0]);
            var i = n.shift().name;
            if (
              ((n = q(n, function (e) {
                if (Ze(e)) return Ln(e, t);
                if (st(e)) {
                  var n = {};
                  return (
                    e.foreach(function (e) {
                      Kt(e.car), (n[e.car.name] = e.cdr);
                    }),
                    n
                  );
                }
                return e;
              })),
              !le(r[i]))
            )
              throw new Be("js-invocation: the method `" + i + "' not found");
            r = r[i].apply(r, n);
          }
        }),
        r
      );
    }),
    Ut("..", function (e) {
      if (e.cdr == n) throw new Error("malformed ..");
      return new at(De("js-invocation"), e.cdr);
    }),
    $t("js-new", 1, null, function (e, t) {
      var n = function (e) {
          if (e.length % 2 != 0)
            throw new Error("js-new: odd number of key-value pair");
          for (var n = {}, r = 0; r < e.length; r += 2) {
            var i = e[r],
              o = e[r + 1];
            Kt(i), Ze(o) && (o = Ln(o, t)), (n[i.name] = o);
          }
          return n;
        },
        r = e.shift();
      if ((de(r) && (r = Mn(r)), 0 == e.length)) return new r();
      for (var i = [], o = 0; o < e.length; o++) {
        if (e[o] instanceof Ae) {
          i.push(n(e.slice(o)));
          break;
        }
        i.push(e[o]);
      }
      return new (Function.prototype.bind.apply(r, [null].concat(i)))();
    }),
    $t("js-obj", 0, null, function (e) {
      if (e.length % 2 != 0)
        throw new Error("js-obj: number of arguments must be even");
      var t = {};
      for (i = 0; i < e.length / 2; i++)
        Jt(e[2 * i]), (t[e[2 * i]] = e[2 * i + 1]);
      return t;
    });
  const Ln = function (e, t) {
    var n = new Ot(t);
    return function () {
      return n.invoke_closure(e, B(arguments));
    };
  };
  $t("js-closure", 1, 1, function (e, t) {
    return an(e[0]), Ln(e[0], t);
  }),
    $t("js-null?", 1, 1, function (e) {
      return null === e[0];
    }),
    $t("js-undefined?", 1, 1, function (e) {
      return void 0 === e[0];
    }),
    $t("js-function?", 1, 1, function (e) {
      return le(e[0]);
    }),
    $t("js-array-to-list", 1, 1, function (e) {
      return ln("js-array-to-list", "1.0", "js-array->list"), dt(e[0]);
    }),
    $t("js-array->list", 1, 1, function (e) {
      return dt(e[0]);
    }),
    $t("list-to-js-array", 1, 1, function (e) {
      return ln("list-to-js-array", "1.0", "list->js-array"), e[0].to_array();
    }),
    $t("list->js-array", 1, 1, function (e) {
      return e[0].to_array();
    }),
    $t("alist-to-js-obj", 1, 1, function (e) {
      return ln("alist-to-js-obj", "1.0", "alist->js-obj"), vt(e[0]);
    }),
    $t("alist->js-obj", 1, 1, function (e) {
      return tn(e[0]), vt(e[0]);
    }),
    $t("js-obj-to-alist", 1, 1, function (e) {
      return ln("js-obj-to-alist", "1.0", "js-obj->alist"), mt(e[0]);
    }),
    $t("js-obj->alist", 1, 1, function (e) {
      return mt(e[0]);
    }),
    $t("timer", 2, 2, function (e, t) {
      var n = e[0],
        i = e[1];
      an(n), Yt(i);
      var o = new Ot(t);
      return (
        setTimeout(function () {
          o.invoke_closure(n);
        }, 1e3 * i),
        r
      );
    }),
    $t("set-timer!", 2, 2, function (e, t) {
      var n = e[0],
        r = e[1];
      an(n), Yt(r);
      var i = new Ot(t);
      return setInterval(function () {
        i.invoke_closure(n);
      }, 1e3 * r);
    }),
    $t("clear-timer!", 1, 1, function (e) {
      var t = e[0];
      return clearInterval(t), r;
    }),
    $t("sleep", 1, 1, function (e) {
      var t = e[0];
      return (
        Yt(t),
        new Fe(function (e) {
          setTimeout(function () {
            e.resume(n);
          }, 1e3 * t);
        })
      );
    });
  var Rn = function (e) {
    $t("console-" + e, 1, null, function (t) {
      var n = window.console;
      if (n) {
        var r = q(t, function (e) {
          return Re(e, { fallback: e });
        });
        n[e].apply(n, r);
      }
      return t[0];
    });
  };
  Rn("debug"),
    Rn("log"),
    Rn("info"),
    Rn("warn"),
    Rn("error"),
    Ut("cond", function (e) {
      var t = e.cdr;
      if (!(t instanceof at) || t === n)
        throw new Be("malformed cond: cond needs list but got " + yt(t));
      var r = null;
      return (
        E(t.to_array().reverse(), function (e) {
          if (!(e instanceof at)) throw new Be("bad clause in cond: " + yt(e));
          if (e.car === De("else")) {
            if (null !== r)
              throw new Be(
                "'else' clause of cond followed by more clauses: " + yt(t)
              );
            r =
              e.cdr !== n &&
              (e.cdr.cdr === n ? e.cdr.car : new at(De("begin"), e.cdr));
          } else {
            var i = e.car;
            if (e.cdr === n) r = lt(De("or"), i, r);
            else if (e.cdr.cdr === n) r = lt(De("if"), i, e.cdr.car, r);
            else if (e.cdr.car === De("=>")) {
              i = e.car;
              var o = e.cdr.cdr.car,
                u = Ne();
              r = lt(De("let"), lt(lt(u, i)), lt(De("if"), i, lt(o, u), r));
            } else r = lt(De("if"), i, new at(De("begin"), e.cdr), r);
          }
        }),
        r
      );
    }),
    Ut("case", function (e) {
      var t = Ne();
      if (e.cdr === n) throw new Be("case: at least one clause is required");
      if (e.cdr instanceof at) {
        var r = e.cdr.car,
          i = e.cdr.cdr,
          o = void 0;
        return (
          E(i.to_array().reverse(), function (e) {
            if (e.car === De("else")) {
              if (void 0 !== o)
                throw new Be(
                  "case: 'else' clause followed by more clauses: " + yt(i)
                );
              o = new at(De("begin"), e.cdr);
            } else
              o = lt(
                De("if"),
                new at(
                  De("or"),
                  dt(
                    q(e.car.to_array(), function (e) {
                      return lt(De("eqv?"), t, lt(De("quote"), e));
                    })
                  )
                ),
                new at(De("begin"), e.cdr),
                o
              );
          }),
          new at(De("let1"), new at(t, new at(r, new at(o, n))))
        );
      }
      throw new Be("case: proper list is required");
    }),
    Ut("and", function (e) {
      if (e.cdr == n) return !0;
      var t = e.cdr.to_array(),
        r = t.length - 1,
        i = t[r];
      for (r -= 1; r >= 0; r--) i = lt(De("if"), t[r], i, !1);
      return i;
    }),
    Ut("or", function (e) {
      for (var t = e.cdr.to_array(), n = !1, r = t.length - 1; r >= 0; r--)
        n = lt(De("if"), t[r], t[r], n);
      return n;
    }),
    Ut("let", function (e) {
      var t = null;
      e.cdr.car instanceof Ae && ((t = e.cdr.car), (e = e.cdr));
      var r = e.cdr.car,
        i = e.cdr.cdr;
      if (!(r instanceof at) && r != n)
        throw new Be("let: need a pair for bindings: got " + Me(r));
      for (var o = n, u = n, a = r; a instanceof at; a = a.cdr) {
        if (!(a.car instanceof at))
          throw new Be("let: need a pair for bindings: got " + Me(a.car));
        (o = new at(a.car.car, o)), (u = new at(a.car.cdr.car, u));
      }
      var c = null;
      if (t) {
        (o = dt(o.to_array().reverse())), (u = dt(u.to_array().reverse()));
        var s = new at(De("lambda"), new at(o, i)),
          f = new at(t, u);
        c = lt(De("letrec"), new at(lt(t, s), n), f);
      } else c = new at(new at(De("lambda"), new at(o, i)), u);
      return c;
    }),
    Ut("let*", function (e) {
      var t = e.cdr.car,
        r = e.cdr.cdr;
      if (t === n) return new at(De("let"), new at(n, r));
      if (!(t instanceof at))
        throw new Be("let*: need a pair for bindings: got " + Me(t));
      var i = null;
      return (
        E(t.to_array().reverse(), function (e) {
          i = new at(
            De("let"),
            new at(new at(e, n), null == i ? r : new at(i, n))
          );
        }),
        i
      );
    });
  var Bn = function (e) {
    var t = e.cdr.car,
      i = e.cdr.cdr;
    if (!(t instanceof at))
      throw new Be("letrec*: need a pair for bindings: got " + Me(t));
    var o = i;
    E(t.to_array().reverse(), function (e) {
      o = new at(new at(De("set!"), e), o);
    });
    var u = n;
    return (
      E(t.to_array().reverse(), function (e) {
        u = new at(new at(e.car, new at(r, n)), u);
      }),
      new at(De("let"), new at(u, o))
    );
  };
  Ut("letrec", Bn),
    Ut("letrec*", Bn),
    Ut("let-values", function (e) {
      var t = e.cdr.car,
        r = e.cdr.cdr,
        i = n,
        o = n;
      E(t.to_array().reverse(), function (e) {
        var t = e.cdr.car,
          r = Ne(),
          u = new at(
            r,
            new at(new at(De("lambda"), new at(n, new at(t, n))), n)
          );
        i = new at(u, i);
        var a = e.car;
        o = new at(new at(a, new at(new at(r, n), n)), o);
      });
      var u = new at(De("let*-values"), new at(o, r));
      return new at(De("let"), new at(i, new at(u, n)));
    }),
    Ut("let*-values", function (e) {
      var t = e.cdr.car,
        r = e.cdr.cdr,
        i = null;
      return (
        E(t.to_array().reverse(), function (e) {
          var t = e.car,
            o = e.cdr.car;
          i = new at(
            De("call-with-values"),
            new at(
              new at(De("lambda"), new at(n, new at(o, n))),
              new at(
                new at(De("lambda"), new at(t, null == i ? r : new at(i, n))),
                n
              )
            )
          );
        }),
        i
      );
    }),
    $t("eqv?", 2, 2, function (e) {
      return rt(e[0], e[1]);
    }),
    $t("eq?", 2, 2, function (e) {
      return nt(e[0], e[1]);
    }),
    $t("equal?", 2, 2, function (e) {
      return it(e[0], e[1]);
    }),
    $t("procedure?", 1, 1, function (e) {
      return tt(e[0]);
    }),
    $t("number?", 1, 1, function (e) {
      return Rt(e[0]);
    }),
    $t("complex?", 1, 1, function (e) {
      return Bt(e[0]);
    }),
    $t("real?", 1, 1, function (e) {
      return Ht(e[0]);
    }),
    $t("rational?", 1, 1, function (e) {
      return It(e[0]);
    }),
    $t("integer?", 1, 1, function (e) {
      return Pt(e[0]);
    }),
    $t("=", 2, null, function (e) {
      var t = e[0];
      Vt(e[0]);
      for (var n = 1; n < e.length; n++) {
        if ((Vt(e[n]), Xn(e[n]) != Xn(t))) return !1;
        if (Yn(e[n]) != Yn(t)) return !1;
      }
      return !0;
    }),
    $t("<", 2, null, function (e) {
      Vt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Vt(e[t]), !(e[t - 1] < e[t]))) return !1;
      return !0;
    }),
    $t(">", 2, null, function (e) {
      Vt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Vt(e[t]), !(e[t - 1] > e[t]))) return !1;
      return !0;
    }),
    $t("<=", 2, null, function (e) {
      Vt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Vt(e[t]), !(e[t - 1] <= e[t]))) return !1;
      return !0;
    }),
    $t(">=", 2, null, function (e) {
      Vt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Vt(e[t]), !(e[t - 1] >= e[t]))) return !1;
      return !0;
    }),
    $t("zero?", 1, 1, function (e) {
      return Vt(e[0]), 0 === e[0];
    }),
    $t("positive?", 1, 1, function (e) {
      return Vt(e[0]), e[0] > 0;
    }),
    $t("negative?", 1, 1, function (e) {
      return Vt(e[0]), e[0] < 0;
    }),
    $t("odd?", 1, 1, function (e) {
      return Vt(e[0]), e[0] % 2 == 1 || e[0] % 2 == -1;
    }),
    $t("even?", 1, 1, function (e) {
      return Vt(e[0]), e[0] % 2 == 0;
    }),
    $t("finite?", 1, 1, function (e) {
      return Vt(e[0]), e[0] != 1 / 0 && e[0] != -1 / 0 && !isNaN(e[0]);
    }),
    $t("infinite?", 1, 1, function (e) {
      return Vt(e[0]), e[0] == 1 / 0 || e[0] == -1 / 0;
    }),
    $t("nan?", 1, 1, function (e) {
      return Vt(e[0]), isNaN(e[0]);
    }),
    $t("max", 2, null, function (e) {
      for (var t = 0; t < e.length; t++) Vt(e[t]);
      return Math.max.apply(null, e);
    }),
    $t("min", 2, null, function (e) {
      for (var t = 0; t < e.length; t++) Vt(e[t]);
      return Math.min.apply(null, e);
    });
  var Hn = function (e, t) {
      return 0 === t ? e : new Mt(e, t);
    },
    In = function (e, t) {
      return 0 === t ? e : Mt.from_polar(e, t);
    };
  $t("+", 0, null, function (e) {
    for (var t = 0, n = 0, r = 0; r < e.length; r++)
      Vt(e[r]), (t += Xn(e[r])), (n += Yn(e[r]));
    return Hn(t, n);
  });
  var Pn = function (e) {
      return e instanceof Mt ? e.magnitude() : e;
    },
    zn = function (e) {
      return e instanceof Mt ? e.angle() : 0;
    };
  $t("*", 0, null, function (e) {
    for (var t = 1, n = 0, r = 0; r < e.length; r++)
      Vt(e[r]), (t *= Pn(e[r])), (n += zn(e[r]));
    return In(t, n);
  }),
    $t("-", 1, null, function (e) {
      var t = e.length;
      if ((Vt(e[0]), 1 == t))
        return e[0] instanceof Mt ? new Mt(-Xn(e[0]), -Yn(e[0])) : -e[0];
      for (var n = Xn(e[0]), r = Yn(e[0]), i = 1; i < t; i++)
        Vt(e[i]), (n -= Xn(e[i])), (r -= Yn(e[i]));
      return Hn(n, r);
    }),
    $t("/", 1, null, function (e) {
      var t = e.length;
      if ((Vt(e[0]), 1 == t))
        return e[0] instanceof Mt
          ? Mt.from_polar(1 / Pn(e[0]), -zn(e[0]))
          : 1 / e[0];
      for (var n = Pn(e[0]), r = zn(e[0]), i = 1; i < t; i++)
        Vt(e[i]), (n /= Pn(e[i])), (r -= zn(e[i]));
      return In(n, r);
    }),
    $t("abs", 1, 1, function (e) {
      return Vt(e[0]), Math.abs(e[0]);
    });
  var Fn = function (e, t) {
      return Math.floor(e / t);
    },
    $n = function (e, t) {
      return e - Math.floor(e / t) * t;
    },
    Wn = function (e, t) {
      return e > 0 ? Math.floor(e / t) : Math.ceil(e / t);
    },
    Un = function (e, t) {
      return e > 0 ? e - Math.floor(e / t) * t : e - Math.ceil(e / t) * t;
    };
  $t("div0-and-mod0", 2, 2, function (e) {
    return Vt(e[0]), Vt(e[1]), new Cn([Fn(e[0], e[1]), $n(e[0], e[1])]);
  }),
    $t("div", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), Fn(e[0], e[1]);
    }),
    $t("mod", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), $n(e[0], e[1]);
    }),
    $t("div0-and-mod0", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), new Cn([Wn(e[0], e[1]), Un(e[0], e[1])]);
    }),
    $t("div0", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), Wn(e[0], e[1]);
    }),
    $t("mod0", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), Un(e[0], e[1]);
    }),
    $t("numerator", 1, 1, function (e) {
      if ((Vt(e[0]), e[0] instanceof Lt)) return e[0].numerator;
      throw new He("todo");
    }),
    $t("denominator", 1, 1, function (e) {
      if ((Vt(e[0]), e[0] instanceof Lt)) return e[0].denominator;
      throw new He("todo");
    }),
    $t("floor", 1, 1, function (e) {
      return Vt(e[0]), Math.floor(e[0]);
    }),
    $t("ceiling", 1, 1, function (e) {
      return Vt(e[0]), Math.ceil(e[0]);
    }),
    $t("truncate", 1, 1, function (e) {
      return Vt(e[0]), e[0] < 0 ? Math.ceil(e[0]) : Math.floor(e[0]);
    }),
    $t("round", 1, 1, function (e) {
      return Vt(e[0]), Math.round(e[0]);
    }),
    $t("exp", 1, 1, function (e) {
      return Vt(e[0]), Math.exp(e[0]);
    }),
    $t("log", 1, 2, function (e) {
      var t = e[0],
        n = e[1];
      return Vt(t), n ? (Vt(n), Math.log(t) / Math.log(n)) : Math.log(t);
    }),
    $t("sin", 1, 1, function (e) {
      return Vt(e[0]), Math.sin(e[0]);
    }),
    $t("cos", 1, 1, function (e) {
      return Vt(e[0]), Math.cos(e[0]);
    }),
    $t("tan", 1, 1, function (e) {
      return Vt(e[0]), Math.tan(e[0]);
    }),
    $t("asin", 1, 1, function (e) {
      return Vt(e[0]), Math.asin(e[0]);
    }),
    $t("acos", 1, 1, function (e) {
      return Vt(e[0]), Math.acos(e[0]);
    }),
    $t("atan", 1, 2, function (e) {
      return (
        Vt(e[0]),
        2 == e.length ? (Vt(e[1]), Math.atan2(e[0], e[1])) : Math.atan(e[0])
      );
    }),
    $t("sqrt", 1, 1, function (e) {
      return Vt(e[0]), Math.sqrt(e[0]);
    }),
    $t("exact-integer-sqrt", 1, 1, function (e) {
      Vt(e[0]);
      var t = Math.sqrt(e[0]),
        n = t - (t % 1),
        r = e[0] - n * n;
      return new Cn([n, r]);
    }),
    $t("expt", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), Math.pow(e[0], e[1]);
    }),
    $t("make-rectangular", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), new Mt(e[0], e[1]);
    }),
    $t("make-polar", 2, 2, function (e) {
      return Vt(e[0]), Vt(e[1]), Mt.from_polar(e[0], e[1]);
    });
  var Vn,
    Xn = function (e) {
      return Mt.assure(e).real;
    },
    Yn = function (e) {
      return Mt.assure(e).imag;
    };
  $t("real-part", 1, 1, function (e) {
    return Vt(e[0]), Xn(e[0]);
  }),
    $t("imag-part", 1, 1, function (e) {
      return Vt(e[0]), Mt.assure(e[0]).imag;
    }),
    $t("magnitude", 1, 1, function (e) {
      return Vt(e[0]), Mt.assure(e[0]).magnitude();
    }),
    $t("angle", 1, 1, function (e) {
      return Vt(e[0]), Mt.assure(e[0]).angle();
    }),
    $t("number->string", 1, 3, function (e) {
      var t = e[0],
        n = e[1];
      if (e[2])
        throw new He("number->string: precision is not yet implemented");
      return (n = n || 10), t.toString(n);
    }),
    $t("string->number", 1, 3, function (e) {
      var t = e[0];
      if ("+inf.0" === t) return 1 / 0;
      if ("-inf.0" === t) return -1 / 0;
      if ("+nan.0" === t) return NaN;
      var n = e[1],
        r = pn(t, 0 === n ? 0 : n || 10);
      if (!1 !== r) return r;
      if (void 0 !== n && 10 !== n) return !1;
      var i = vn(t);
      if (!1 !== i) return i;
      var o = dn(t);
      return !1 !== o && o;
    }),
    $t("not", 1, 1, function (e) {
      return !1 === e[0];
    }),
    $t("boolean?", 1, 1, function (e) {
      return !1 === e[0] || !0 === e[0];
    }),
    $t("boolean=?", 2, null, function (e) {
      for (var t = e.length, n = 1; n < t; n++) if (e[n] != e[0]) return !1;
      return !0;
    }),
    $t("pair?", 1, 1, function (e) {
      return e[0] instanceof at;
    }),
    $t("cons", 2, 2, function (e) {
      return new at(e[0], e[1]);
    }),
    $t("car", 1, 1, function (e) {
      if (!(e[0] instanceof at))
        throw new Be("Attempt to apply car on " + e[0]);
      return e[0].car;
    }),
    $t("cdr", 1, 1, function (e) {
      if (!(e[0] instanceof at))
        throw new Be("Attempt to apply cdr on " + e[0]);
      return e[0].cdr;
    }),
    $t("set-car!", 2, 2, function (e) {
      if (!(e[0] instanceof at))
        throw new Be("Attempt to apply set-car! on " + e[0]);
      return (e[0].car = e[1]), r;
    }),
    $t("set-cdr!", 2, 2, function (e) {
      if (!(e[0] instanceof at))
        throw new Be("Attempt to apply set-cdr! on " + e[0]);
      return (e[0].cdr = e[1]), r;
    }),
    (Vn = function (e, t, n) {
      var r = n;
      return (
        E(t, function (t) {
          if (!(r instanceof at))
            throw new Be(
              e + ": attempt to get " + (t ? "cdr" : "car") + " of " + r
            );
          r = t ? r.cdr : r.car;
        }),
        r
      );
    }),
    $t("caar", 1, 1, function (e) {
      return Vn("caar", [0, 0], e[0]);
    }),
    $t("cadr", 1, 1, function (e) {
      return Vn("cadr", [1, 0], e[0]);
    }),
    $t("cdar", 1, 1, function (e) {
      return Vn("cadr", [0, 1], e[0]);
    }),
    $t("cddr", 1, 1, function (e) {
      return Vn("cadr", [1, 1], e[0]);
    }),
    $t("caaar", 1, 1, function (e) {
      return Vn("caaar", [0, 0, 0], e[0]);
    }),
    $t("caadr", 1, 1, function (e) {
      return Vn("caadr", [1, 0, 0], e[0]);
    }),
    $t("cadar", 1, 1, function (e) {
      return Vn("cadar", [0, 1, 0], e[0]);
    }),
    $t("caddr", 1, 1, function (e) {
      return Vn("caddr", [1, 1, 0], e[0]);
    }),
    $t("cdaar", 1, 1, function (e) {
      return Vn("cdaar", [0, 0, 1], e[0]);
    }),
    $t("cdadr", 1, 1, function (e) {
      return Vn("cdadr", [1, 0, 1], e[0]);
    }),
    $t("cddar", 1, 1, function (e) {
      return Vn("cddar", [0, 1, 1], e[0]);
    }),
    $t("cdddr", 1, 1, function (e) {
      return Vn("cdddr", [1, 1, 1], e[0]);
    }),
    $t("caaaar", 1, 1, function (e) {
      return Vn("caaaar", [0, 0, 0, 0], e[0]);
    }),
    $t("caaadr", 1, 1, function (e) {
      return Vn("caaadr", [1, 0, 0, 0], e[0]);
    }),
    $t("caadar", 1, 1, function (e) {
      return Vn("caadar", [0, 1, 0, 0], e[0]);
    }),
    $t("caaddr", 1, 1, function (e) {
      return Vn("caaddr", [1, 1, 0, 0], e[0]);
    }),
    $t("cadaar", 1, 1, function (e) {
      return Vn("cadaar", [0, 0, 1, 0], e[0]);
    }),
    $t("cadadr", 1, 1, function (e) {
      return Vn("cadadr", [1, 0, 1, 0], e[0]);
    }),
    $t("caddar", 1, 1, function (e) {
      return Vn("caddar", [0, 1, 1, 0], e[0]);
    }),
    $t("cadddr", 1, 1, function (e) {
      return Vn("cadddr", [1, 1, 1, 0], e[0]);
    }),
    $t("cdaaar", 1, 1, function (e) {
      return Vn("cdaaar", [0, 0, 0, 1], e[0]);
    }),
    $t("cdaadr", 1, 1, function (e) {
      return Vn("cdaadr", [1, 0, 0, 1], e[0]);
    }),
    $t("cdadar", 1, 1, function (e) {
      return Vn("cdadar", [0, 1, 0, 1], e[0]);
    }),
    $t("cdaddr", 1, 1, function (e) {
      return Vn("cdaddr", [1, 1, 0, 1], e[0]);
    }),
    $t("cddaar", 1, 1, function (e) {
      return Vn("cddaar", [0, 0, 1, 1], e[0]);
    }),
    $t("cddadr", 1, 1, function (e) {
      return Vn("cddadr", [1, 0, 1, 1], e[0]);
    }),
    $t("cdddar", 1, 1, function (e) {
      return Vn("cdddar", [0, 1, 1, 1], e[0]);
    }),
    $t("cddddr", 1, 1, function (e) {
      return Vn("cddddr", [1, 1, 1, 1], e[0]);
    }),
    $t("null?", 1, 1, function (e) {
      return e[0] === n;
    }),
    $t("list?", 1, 1, function (e) {
      return st(e[0]);
    }),
    $t("list", 0, null, function (e) {
      for (var t = n, r = e.length - 1; r >= 0; r--) t = new at(e[r], t);
      return t;
    }),
    $t("length", 1, 1, function (e) {
      tn(e[0]);
      for (var t = 0, r = e[0]; r != n; r = r.cdr) t++;
      return t;
    }),
    $t("append", 1, null, function (e) {
      for (var t = e.length, n = e[--t]; t--; )
        E(e[t].to_array().reverse(), function (e) {
          n = new at(e, n);
        });
      return n;
    }),
    $t("reverse", 1, 1, function (e) {
      if (e[0] == n) return n;
      en(e[0]);
      for (var t = n, r = e[0]; r != n; r = r.cdr) t = new at(r.car, t);
      return t;
    }),
    $t("list-tail", 2, 2, function (e) {
      if ((en(e[0]), Xt(e[1]), e[1] < 0))
        throw new Be("list-tail: index out of range (" + e[1] + ")");
      for (var t = e[0], n = 0; n < e[1]; n++) {
        if (!(t instanceof at))
          throw new Be("list-tail: the list is shorter than " + e[1]);
        t = t.cdr;
      }
      return t;
    }),
    $t("list-ref", 2, 2, function (e) {
      if ((en(e[0]), Xt(e[1]), e[1] < 0))
        throw new Be("list-tail: index out of range (" + e[1] + ")");
      for (var t = e[0], n = 0; n < e[1]; n++) {
        if (!(t instanceof at))
          throw new Be("list-ref: the list is shorter than " + e[1]);
        t = t.cdr;
      }
      return t.car;
    }),
    $t("map", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      E(n, tn);
      var r = [];
      return xt.multi_foreach(n, {
        call: function (e) {
          return new xt(
            t,
            q(e, function (e) {
              return e.car;
            })
          );
        },
        result: function (e) {
          r.push(e);
        },
        finish: function () {
          return dt(r);
        },
      });
    }),
    $t("for-each", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      return (
        E(n, tn),
        xt.multi_foreach(n, {
          call: function (e) {
            return new xt(
              t,
              q(e, function (e) {
                return e.car;
              })
            );
          },
          finish: function () {
            return r;
          },
        })
      );
    }),
    $t("symbol?", 1, 1, function (e) {
      return e[0] instanceof Ae;
    }),
    $t("symbol->string", 1, 1, function (e) {
      return Kt(e[0]), e[0].name;
    }),
    $t("symbol=?", 2, null, function (e) {
      Kt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Kt(e[t]), e[t] != e[0])) return !1;
      return !0;
    }),
    $t("string->symbol", 1, 1, function (e) {
      return Jt(e[0]), De(e[0]);
    }),
    $t("char?", 1, 1, function (e) {
      return e[0] instanceof ze;
    }),
    $t("char->integer", 1, 1, function (e) {
      return Qt(e[0]), e[0].value.charCodeAt(0);
    }),
    $t("integer->char", 1, 1, function (e) {
      return Xt(e[0]), ze.get(String.fromCharCode(e[0]));
    });
  var Gn = function (e) {
    return function (t) {
      Qt(t[0]);
      for (var n = 1; n < t.length; n++)
        if ((Qt(t[n]), !e(t[n - 1].value, t[n].value))) return !1;
      return !0;
    };
  };
  $t(
    "char=?",
    2,
    null,
    Gn(function (e, t) {
      return e == t;
    })
  ),
    $t(
      "char<?",
      2,
      null,
      Gn(function (e, t) {
        return e < t;
      })
    ),
    $t(
      "char>?",
      2,
      null,
      Gn(function (e, t) {
        return e > t;
      })
    ),
    $t(
      "char<=?",
      2,
      null,
      Gn(function (e, t) {
        return e <= t;
      })
    ),
    $t(
      "char>=?",
      2,
      null,
      Gn(function (e, t) {
        return e >= t;
      })
    ),
    $t("string?", 1, 1, function (e) {
      return "string" == typeof e[0];
    }),
    $t("make-string", 1, 2, function (e) {
      Xt(e[0]);
      var t = " ";
      e[1] && (Qt(e[1]), (t = e[1].value));
      var n = "";
      return (
        be(e[0], function () {
          n += t;
        }),
        n
      );
    }),
    $t("string", 0, null, function (e) {
      if (0 == e.length) return "";
      for (var t = 0; t < e.length; t++) Qt(e[t]);
      return q(e, function (e) {
        return e.value;
      }).join("");
    }),
    $t("string-length", 1, 1, function (e) {
      return Jt(e[0]), e[0].length;
    }),
    $t("string-ref", 2, 2, function (e) {
      return (
        Jt(e[0]), Gt(e[1], 0, e[0].length - 1), ze.get(e[0].charAt([e[1]]))
      );
    }),
    $t("string=?", 2, null, function (e) {
      Jt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Jt(e[t]), e[0] != e[t])) return !1;
      return !0;
    }),
    $t("string<?", 2, null, function (e) {
      Jt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Jt(e[t]), !(e[t - 1] < e[t]))) return !1;
      return !0;
    }),
    $t("string>?", 2, null, function (e) {
      Jt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Jt(e[t]), !(e[t - 1] > e[t]))) return !1;
      return !0;
    }),
    $t("string<=?", 2, null, function (e) {
      Jt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Jt(e[t]), !(e[t - 1] <= e[t]))) return !1;
      return !0;
    }),
    $t("string>=?", 2, null, function (e) {
      Jt(e[0]);
      for (var t = 1; t < e.length; t++)
        if ((Jt(e[t]), !(e[t - 1] >= e[t]))) return !1;
      return !0;
    }),
    $t("substring", 3, 3, function (e) {
      if ((Jt(e[0]), Xt(e[1]), Xt(e[2]), e[1] < 0))
        throw new Be("substring: start too small: " + e[1]);
      if (e[2] < 0) throw new Be("substring: end too small: " + e[2]);
      if (e[0].length + 1 <= e[1])
        throw new Be("substring: start too big: " + e[1]);
      if (e[0].length + 1 <= e[2])
        throw new Be("substring: end too big: " + e[2]);
      if (!(e[1] <= e[2]))
        throw new Be("substring: not start <= end: " + e[1] + ", " + e[2]);
      return e[0].substring(e[1], e[2]);
    }),
    $t("string-append", 0, null, function (e) {
      for (var t = 0; t < e.length; t++) Jt(e[t]);
      return e.join("");
    }),
    $t("string->list", 1, 1, function (e) {
      return (
        Jt(e[0]),
        dt(
          q(e[0].split(""), function (e) {
            return ze.get(e[0]);
          })
        )
      );
    }),
    $t("list->string", 1, 1, function (e) {
      return (
        tn(e[0]),
        q(e[0].to_array(), function (e) {
          return e.value;
        }).join("")
      );
    }),
    $t("string-for-each", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      return (
        E(n, Jt),
        xt.multi_foreach(n, {
          call: function (e) {
            return new xt(t, e);
          },
          finish: function () {
            return r;
          },
        })
      );
    }),
    $t("string-copy", 1, 1, function (e) {
      return Jt(e[0]), e[0];
    }),
    $t("vector?", 1, 1, function (e) {
      return Ke(e[0]);
    }),
    $t("make-vector", 1, 2, function (e) {
      Xt(e[0]);
      var t = new Array(e[0]);
      if (2 == e.length) for (var n = 0; n < e[0]; n++) t[n] = e[1];
      return t;
    }),
    $t("vector", 0, null, function (e) {
      return e;
    }),
    $t("vector-length", 1, 1, function (e) {
      return nn(e[0]), e[0].length;
    }),
    $t("vector-ref", 2, 2, function (e) {
      return nn(e[0]), Xt(e[1]), Gt(e[1], 0, e[0].length - 1), e[0][e[1]];
    }),
    $t("vector-set!", 3, 3, function (e) {
      return nn(e[0]), Xt(e[1]), (e[0][e[1]] = e[2]), r;
    }),
    $t("vector->list", 1, 1, function (e) {
      return nn(e[0]), dt(e[0]);
    }),
    $t("list->vector", 1, 1, function (e) {
      return tn(e[0]), e[0].to_array();
    }),
    $t("vector-fill!", 2, 2, function (e) {
      nn(e[0]);
      for (var t = e[0], n = e[1], r = 0; r < t.length; r++) t[r] = n;
      return t;
    }),
    $t("vector-map", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      E(n, nn);
      var r = [];
      return xt.multi_foreach(n, {
        call: function (e) {
          return new xt(t, e);
        },
        result: function (e) {
          r.push(e);
        },
        finish: function () {
          return r;
        },
      });
    }),
    $t("vector-for-each", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      return (
        E(n, nn),
        xt.multi_foreach(n, {
          call: function (e) {
            return new xt(t, e);
          },
          finish: function () {
            return r;
          },
        })
      );
    }),
    $t("apply", 2, null, function (e) {
      var t = e.shift(),
        n = e.pop(),
        r = e;
      return (r = r.concat(n.to_array())), new xt(t, r);
    }),
    Ut("call-with-current-continuation", function (e) {
      return new at(De("call/cc"), e.cdr);
    }),
    $t("values", 0, null, function (e) {
      return 1 == e.length ? e[0] : new Cn(e);
    }),
    $t("call-with-values", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      return (
        cn(t),
        cn(n),
        new xt(t, [], function (e) {
          var t = e[0];
          return new xt(n, t instanceof Cn ? t.content : [t]);
        })
      );
    }),
    $t("dynamic-wind", 3, 3, function (e, t) {
      var n = e[0],
        r = e[1],
        i = e[2];
      return new xt(n, [], function () {
        return (
          t.push_dynamic_winder(n, i),
          new xt(r, [], function (e) {
            var n = e[0];
            return (
              t.pop_dynamic_winder(),
              new xt(i, [], function () {
                return n;
              })
            );
          })
        );
      });
    });
  var Jn = function (e, t) {
    if (e instanceof Ae || e === n) return lt(De("quote"), e);
    if (e instanceof at) {
      var r = e.car;
      return r instanceof at && r.car === De("unquote-splicing")
        ? 1 == t
          ? lt(De("append"), e.car.cdr.car, Jn(e.cdr, t))
          : lt(
              De("cons"),
              lt(
                De("list"),
                lt(De("quote"), De("unquote-splicing")),
                Jn(e.car.cdr.car, t - 1)
              ),
              Jn(e.cdr, t)
            )
        : r === De("unquote")
        ? 1 == t
          ? e.cdr.car
          : lt(De("list"), lt(De("quote"), De("unquote")), Jn(e.cdr.car, t - 1))
        : r === De("quasiquote")
        ? lt(
            De("list"),
            lt(De("quote"), De("quasiquote")),
            Jn(e.cdr.car, t + 1)
          )
        : lt(De("cons"), Jn(e.car, t), Jn(e.cdr, t));
    }
    if (e instanceof Array) {
      for (var i = [[]], o = 0; o < e.length; o++)
        if (e[o] instanceof at && e[o].car === De("unquote-splicing"))
          if (1 == t) {
            ((u = lt(De("list->vector"), e[o].cdr.car)).splicing = !0),
              i.push(u),
              i.push([]);
          } else {
            var u = lt(
              De("cons"),
              lt(
                De("list"),
                lt(De("quote"), De("unquote-splicing")),
                Jn(e[o].car.cdr.car, t - 1)
              ),
              Jn(e[o].cdr, t)
            );
            H(i).push(u);
          }
        else H(i).push(Jn(e[o], t));
      var a = i.map(function (e) {
        return e.splicing ? e : pt(De("vector"), dt(e));
      });
      return 1 == a.length
        ? pt(De("vector"), dt(i[0]))
        : pt(De("vector-append"), dt(a));
    }
    return e;
  };
  Ut("quasiquote", function (e) {
    return Jn(e.cdr.car, 1);
  }),
    Ut("unquote", function (e) {
      throw new Be("unquote(,) must be inside quasiquote(`)");
    }),
    Ut("unquote-splicing", function (e) {
      throw new Be("unquote-splicing(,@) must be inside quasiquote(`)");
    }),
    $t("string-upcase", 1, 1, function (e) {
      return Jt(e[0]), e[0].toUpperCase();
    }),
    $t("string-downcase", 1, 1, function (e) {
      return Jt(e[0]), e[0].toLowerCase();
    });
  const Qn = function (e) {
    return function (t) {
      Jt(t[0]);
      for (var n = t[0].toUpperCase(), r = 1; r < t.length; r++)
        if ((Jt(t[r]), !e(n, t[r].toUpperCase()))) return !1;
      return !0;
    };
  };
  $t(
    "string-ci=?",
    2,
    null,
    Qn(function (e, t) {
      return e == t;
    })
  ),
    $t(
      "string-ci<?",
      2,
      null,
      Qn(function (e, t) {
        return e < t;
      })
    ),
    $t(
      "string-ci>?",
      2,
      null,
      Qn(function (e, t) {
        return e > t;
      })
    ),
    $t(
      "string-ci<=?",
      2,
      null,
      Qn(function (e, t) {
        return e <= t;
      })
    ),
    $t(
      "string-ci>=?",
      2,
      null,
      Qn(function (e, t) {
        return e >= t;
      })
    ),
    $t("find", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      return (
        tn(n),
        xt.foreach(n, {
          call: function (e) {
            return new xt(t, [e.car]);
          },
          result: function (e, t) {
            if (e) return t.car;
          },
          finish: function () {
            return !1;
          },
        })
      );
    }),
    $t("for-all", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      E(n, tn);
      var r = !0;
      return xt.multi_foreach(n, {
        call: function (e) {
          return new xt(
            t,
            q(e, function (e) {
              return e.car;
            })
          );
        },
        result: function (e, t) {
          if (!1 === e) return !1;
          r = e;
        },
        finish: function () {
          return r;
        },
      });
    }),
    $t("exists", 2, null, function (e) {
      var t = e.shift(),
        n = e;
      return (
        E(n, tn),
        xt.multi_foreach(n, {
          call: function (e) {
            return new xt(
              t,
              q(e, function (e) {
                return e.car;
              })
            );
          },
          result: function (e, t) {
            if (!1 !== e) return e;
          },
          finish: function () {
            return !1;
          },
        })
      );
    }),
    $t("filter", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      tn(n);
      var r = [];
      return xt.foreach(n, {
        call: function (e) {
          return new xt(t, [e.car]);
        },
        result: function (e, t) {
          e && r.push(t.car);
        },
        finish: function () {
          return dt(r);
        },
      });
    }),
    $t("partition", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      tn(n);
      var r = [],
        i = [];
      return xt.foreach(n, {
        call: function (e) {
          return new xt(t, [e.car]);
        },
        result: function (e, t) {
          e ? r.push(t.car) : i.push(t.car);
        },
        finish: function () {
          return new Cn([dt(r), dt(i)]);
        },
      });
    }),
    $t("fold-left", 3, null, function (e) {
      var t = e.shift(),
        n = e.shift(),
        r = e;
      return (
        E(r, tn),
        xt.multi_foreach(r, {
          call: function (e) {
            var r = q(e, function (e) {
              return e.car;
            });
            return r.unshift(n), new xt(t, r);
          },
          result: function (e, t) {
            n = e;
          },
          finish: function () {
            return n;
          },
        })
      );
    }),
    $t("fold-right", 3, null, function (e) {
      var t = e.shift(),
        n = e.shift(),
        r = q(e, function (e) {
          return tn(e), dt(e.to_array().reverse());
        });
      return xt.multi_foreach(r, {
        call: function (e) {
          var r = q(e, function (e) {
            return e.car;
          });
          return r.push(n), new xt(t, r);
        },
        result: function (e, t) {
          n = e;
        },
        finish: function () {
          return n;
        },
      });
    }),
    $t("remp", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      tn(n);
      var r = [];
      return xt.foreach(n, {
        call: function (e) {
          return new xt(t, [e.car]);
        },
        result: function (e, t) {
          e || r.push(t.car);
        },
        finish: function () {
          return dt(r);
        },
      });
    });
  var Kn = function (n) {
    return function (r) {
      var i = r[0],
        o = r[1];
      tn(o);
      var u = [];
      return xt.foreach(o, {
        call: function (r) {
          return new xt(e[n] || t[n], [i, r.car]);
        },
        result: function (e, t) {
          e || u.push(t.car);
        },
        finish: function () {
          return dt(u);
        },
      });
    };
  };
  $t("remove", 2, 2, Kn("equal?")),
    $t("remv", 2, 2, Kn("eqv?")),
    $t("remq", 2, 2, Kn("eq?")),
    $t("memp", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      return (
        tn(n),
        xt.foreach(n, {
          call: function (e) {
            return new xt(t, [e.car]);
          },
          result: function (e, t) {
            if (e) return t;
          },
          finish: function () {
            return !1;
          },
        })
      );
    });
  var Zn = function (n) {
    return function (r) {
      var i = r[0],
        o = r[1];
      return (
        tn(o),
        xt.foreach(o, {
          call: function (r) {
            return new xt(e[n] || t[n], [i, r.car]);
          },
          result: function (e, t) {
            if (e) return t;
          },
          finish: function () {
            return !1;
          },
        })
      );
    };
  };
  $t("member", 2, 2, Zn("equal?")),
    $t("memv", 2, 2, Zn("eqv?")),
    $t("memq", 2, 2, Zn("eq?")),
    $t("assp", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      return (
        tn(n),
        xt.foreach(n, {
          call: function (e) {
            if (e.car.car) return new xt(t, [e.car.car]);
            throw new Be("ass*: pair required but got " + Me(e.car));
          },
          result: function (e, t) {
            if (e) return t.car;
          },
          finish: function () {
            return !1;
          },
        })
      );
    });
  var er = function (n, r) {
    return function (i) {
      var o = i[0],
        u = i[1];
      return (
        tn(u),
        xt.foreach(u, {
          call: function (i) {
            if (!ct(i.car))
              throw new Be(n + ": pair required but got " + Me(i.car));
            var u = e[r] || t[r];
            return new xt(u, [o, i.car.car]);
          },
          result: function (e, t) {
            if (e) return t.car;
          },
          finish: function () {
            return !1;
          },
        })
      );
    };
  };
  $t("assoc", 2, 2, er("assoc", "equal?")),
    $t("assv", 2, 2, er("assv", "eqv?")),
    $t("assq", 2, 2, er("assq", "eq?")),
    $t("cons*", 1, null, function (e) {
      if (1 == e.length) return e[0];
      var t = null;
      return (
        E(e.reverse(), function (e) {
          t = t ? new at(e, t) : e;
        }),
        t
      );
    }),
    (function () {
      var e = function (e, n, r) {
          return e.length <= 1 ? r(e) : t(e, n, r, [[0, e.length, !1]], !1);
        },
        t = function (e, r, i, o, u) {
          for (;;) {
            var a = o[o.length - 1][0],
              c = o[o.length - 1][1],
              s = o[o.length - 1][2],
              f = c - a;
            if (f >= 2 && !u) o.push([a, a + (f >> 1), !0]);
            else {
              if (!s) {
                o.pop();
                var l = o[o.length - 1][0],
                  d = e.slice(l, a),
                  h = e.slice(a, c);
                return n(d, h, r, [], 0, 0, function (n) {
                  for (var u = 0; u < n.length; u++) e[l + u] = n[u];
                  return 1 == o.length ? i(e) : t(e, r, i, o, !0);
                });
              }
              o.pop();
              var p = o[o.length - 1][1];
              o.push([c, p, !1]), (u = !1);
            }
          }
        },
        n = function (e, t, r, i, o, u, a) {
          var c = e.length,
            s = t.length;
          if (o < c && u < s)
            return new xt(r, [t[u], e[o]], function (c) {
              return (
                c[0] ? (i.push(t[u]), (u += 1)) : (i.push(e[o]), (o += 1)),
                n(e, t, r, i, o, u, a)
              );
            });
          for (; o < c; ) i.push(e[o]), (o += 1);
          for (; u < s; ) i.push(t[u]), (u += 1);
          return a(i);
        },
        i = function (e, t) {
          return ot(e, t) ? -1 : ot(t, e) ? 1 : 0;
        };
      $t("list-sort", 1, 2, function (t) {
        return t[1]
          ? (cn(t[0]),
            tn(t[1]),
            e(t[1].to_array(), t[0], function (e) {
              return dt(e);
            }))
          : (tn(t[0]), dt(t[0].to_array().sort(i)));
      }),
        $t("vector-sort", 1, 2, function (t) {
          return t[1]
            ? (cn(t[0]),
              nn(t[1]),
              e(ue(t[1]), t[0], function (e) {
                return e;
              }))
            : (nn(t[0]), ue(t[0]).sort(i));
        }),
        $t("vector-sort!", 1, 2, function (t) {
          return t[1]
            ? (cn(t[0]),
              nn(t[1]),
              e(t[1], t[0], function (e) {
                return r;
              }))
            : (nn(t[0]), t[0].sort(i), r);
        });
    })(),
    Ut("when", function (e) {
      var t = e.cdr.car,
        i = e.cdr.cdr;
      return new at(
        De("if"),
        new at(t, new at(new at(De("begin"), i), new at(r, n)))
      );
    }),
    Ut("unless", function (e) {
      var t = e.cdr.car,
        i = e.cdr.cdr;
      return new at(
        De("if"),
        new at(
          new at(De("not"), new at(t, n)),
          new at(new at(De("begin"), i), new at(r, n))
        )
      );
    }),
    Ut("do", function (e) {
      if (!ct(e.cdr)) throw new Be("do: no variables of do");
      var t = e.cdr.car;
      if (!ct(t)) throw new Be("do: variables must be given as a list");
      if (!ct(e.cdr.cdr)) throw new Be("do: no resulting form of do");
      var n = e.cdr.cdr.car,
        r = e.cdr.cdr.cdr,
        i = Ne(),
        o = dt(
          t.map(function (e) {
            var t = e.to_array();
            return lt(t[0], t[1]);
          })
        ),
        u = n.car,
        a = new at(De("begin"), n.cdr),
        c = new at(
          i,
          dt(
            t.map(function (e) {
              var t = e.to_array();
              return t[2] || t[0];
            })
          )
        ),
        s = new at(De("begin"), r).concat(lt(c));
      return lt(De("let"), i, o, lt(De("if"), u, a, s));
    }),
    Ut("case-lambda", function (e) {
      if (!ct(e.cdr)) throw new Be("case-lambda: at least 1 clause required");
      var t = e.cdr.to_array(),
        r = Ne(),
        i = lt(De("raise"), "case-lambda: no matching clause found");
      return (
        t.reverse().forEach(function (e) {
          if (!ct(e))
            throw new Be("case-lambda: clause must be a pair: " + Me(e));
          var t = e.car,
            o = e.cdr;
          if (t === n)
            i = lt(De("if"), lt(De("null?"), r), new at(De("begin"), o), i);
          else if (ct(t)) {
            var u = t.length(),
              a = t.last_cdr(),
              c = De(a === n ? "=" : ">="),
              s = new at(De("lambda"), new at(t, o));
            i = lt(
              De("if"),
              lt(c, lt(De("length"), r), u),
              lt(De("apply"), s, r),
              i
            );
          } else {
            if (!Je(t)) throw new Be("case-lambda: invalid formals: " + Me(t));
            i = new at(De("let1"), new at(t, new at(r, o)));
          }
        }),
        lt(De("lambda"), r, i)
      );
    }),
    Ut("define-record-type", function (e) {
      var t = e.cdr.car,
        n = e.cdr.cdr;
      if (Je(t))
        var r = t,
          i = De("make-" + t.name),
          o = De(t.name + "?");
      else {
        tn(t);
        (r = t.car), (i = t.cdr.car), (o = t.cdr.cdr.car);
        Kt(r), Kt(i), Kt(o);
      }
      var u,
        a = !1,
        c = !1,
        s = !1,
        f = !1,
        l = !1,
        d = !1,
        h = [];
      E(n.to_array(), function (e) {
        switch (e.car) {
          case De("fields"):
            h = q(e.cdr.to_array(), function (e, t) {
              if (Je(e))
                return {
                  name: e,
                  idx: t,
                  mutable: !1,
                  accessor_name: null,
                  mutator_name: null,
                };
              switch ((tn(e), Kt(e.car), e.car)) {
                case De("immutable"):
                  var n = e.cdr.car;
                  return (
                    Kt(n),
                    Ue(e.cdr.cdr)
                      ? { name: n, idx: t, mutable: !1 }
                      : {
                          name: n,
                          idx: t,
                          mutable: !1,
                          accessor_name: e.cdr.cdr.car,
                        }
                  );
                case De("mutable"):
                  n = e.cdr.car;
                  return (
                    Kt(n),
                    Ue(e.cdr.cdr)
                      ? { name: n, idx: t, mutable: !0 }
                      : {
                          name: n,
                          idx: t,
                          mutable: !0,
                          accessor_name: e.cdr.cdr.car,
                          mutator_name: e.cdr.cdr.cdr.car,
                        }
                  );
                default:
                  throw new Be(
                    "define-record-type: field definition must start with `immutable' or `mutable' but got " +
                      Re(e.car)
                  );
              }
            });
            break;
          case De("parent"):
            (u = e.cdr.car), Kt(u);
            break;
          case De("protocol"):
            d = e.cdr.car;
            break;
          case De("sealed"):
            a = !!e.cdr.car;
            break;
          case De("opaque"):
            c = !!e.cdr.car;
            break;
          case De("nongenerative"):
            s = e.cdr.car;
            break;
          case De("parent-rtd"):
            (f = e.cdr.car), (l = e.cdr.cdr.car);
            break;
          default:
            throw new Be(
              "define-record-type: unknown clause `" + Me(e.car) + "'"
            );
        }
      }),
        u &&
          ((f = [De("record-type-descriptor"), u]),
          (l = [De("record-constructor-descriptor"), u]));
      var p = [De("record-type-descriptor"), r],
        m = [De("record-constructor-descriptor"), r],
        v = q(h, function (e) {
          return lt(De(e.mutable ? "mutable" : "immutable"), e.name);
        });
      v.is_vector = !0;
      var g = [
          De("make-record-type-descriptor"),
          [De("quote"), r],
          f,
          s,
          a,
          c,
          v,
        ],
        y = [De("make-record-constructor-descriptor"), De("__rtd"), l, d],
        w = [
          De("let*"),
          [
            [De("__rtd"), g],
            [De("__cd"), y],
          ],
          [
            De("_define-record-type"),
            [De("quote"), r],
            De("__rtd"),
            De("__cd"),
          ],
        ],
        b = q(h, function (e) {
          var t = e.accessor_name || De(r.name + "-" + e.name.name);
          return [De("define"), t, [De("record-accessor"), p, e.idx]];
        }),
        _ = O(h, function (e) {
          return e.mutable;
        });
      return (
        (_ = q(_, function (e) {
          var t = e.mutator_name || De(r.name + "-" + e.name.name + "-set!");
          return [De("define"), t, [De("record-mutator"), p, e.idx]];
        })),
        ht(
          [
            De("begin"),
            w,
            [De("define"), i, [De("record-constructor"), m]],
            [De("define"), o, [De("record-predicate"), p]],
          ]
            .concat(b)
            .concat(_)
        )
      );
    }),
    $t("_define-record-type", 3, 3, function (e) {
      return (
        Kt(e[0]), Tn(e[1]), Sn(e[2]), bn.define_type(e[0].name, e[1], e[2]), r
      );
    }),
    Ut("record-type-descriptor", function (e) {
      return ht([De("_record-type-descriptor"), [De("quote"), e.cdr.car]]);
    }),
    $t("_record-type-descriptor", 1, 1, function (e) {
      Kt(e[0]);
      var t = bn.get_type(e[0].name);
      if (t) return t.rtd;
      throw new Be("record-type-descriptor: unknown record type " + e[0].name);
    }),
    Ut("record-constructor-descriptor", function (e) {
      return ht([
        De("_record-constructor-descriptor"),
        [De("quote"), e.cdr.car],
      ]);
    }),
    $t("_record-constructor-descriptor", 1, 1, function (e) {
      Kt(e[0]);
      var t = bn.get_type(e[0].name);
      if (t) return t.cd;
      throw new Be(
        "record-constructor-descriptor: unknown record type " + e[0].name
      );
    }),
    $t("make-record-type-descriptor", 6, 6, function (e) {
      var t = e[0],
        n = e[1],
        r = e[2],
        i = e[3],
        o = e[4],
        u = e[5];
      if ((Kt(t), n && Tn(n), r)) {
        Kt(r);
        var a = bn.RTD.NongenerativeRecords[r.name];
        if (a) return a;
      }
      (i = !!i), (o = !!o), nn(u);
      for (var c = 0; c < u.length; c++) {
        var s = u[c];
        Kt(s.car, "mutability"),
          Kt(s.cdr.car, "field name"),
          (u[c] = [s.cdr.car.name, s.car == De("mutable")]);
      }
      var f = new bn.RTD(t, n, r, i, o, u);
      return r && (bn.RTD.NongenerativeRecords[r.name] = f), f;
    }),
    $t("record-type-descriptor?", 1, 1, function (e) {
      return e[0] instanceof bn.RTD;
    }),
    $t("make-record-constructor-descriptor", 3, 3, function (e) {
      var t = e[0],
        n = e[1],
        r = e[2];
      return Tn(t), n && Sn(n), r && cn(r), new bn.CD(t, n, r);
    }),
    $t("record-constructor", 1, 1, function (e) {
      var t = e[0];
      return Sn(t), t.record_constructor();
    }),
    $t("record-predicate", 1, 1, function (e) {
      var t = e[0];
      return (
        Tn(t),
        function (e) {
          var n = e[0];
          return n instanceof bn && n.rtd === t;
        }
      );
    }),
    $t("record-accessor", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      Tn(t), Xt(n);
      for (var r = t.parent_rtd; r; r = r.parent_rtd) n += r.fields.length;
      return function (e) {
        var r = e[0],
          i =
            t.name.name +
            "-" +
            t.field_name(n) +
            ": " +
            Me(r) +
            " is not a " +
            t.name.name;
        fn(_n(r), i);
        for (var o = !1, u = r.rtd; u; u = u.parent_rtd) u == t && (o = !0);
        return fn(o, i), r.get(n);
      };
    }),
    $t("record-mutator", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      Tn(t), Xt(n);
      for (var r = t.parent_rtd; r; r = r.parent_rtd) n += r.fields.length;
      return function (e) {
        var r = e[0],
          i = e[1],
          o = t.field_name(n);
        jn(r),
          fn(r.rtd === t, o + ": " + Me(r) + " is not a " + t.name.name),
          fn(
            !r.rtd.sealed,
            o + ": " + t.name.name + " is sealed (can't mutate)"
          ),
          r.set(n, i);
      };
    }),
    $t("record?", 1, 1, function (e) {
      var t = e[0];
      return !!_n(t) && !t.rtd.opaque;
    }),
    $t("record-rtd", 1, 1, function (e) {
      return jn(e[0]), e[0].rtd;
    }),
    $t("record-type-name", 1, 1, function (e) {
      return Tn(e[0]), e[0].name;
    }),
    $t("record-type-parent", 1, 1, function (e) {
      return Tn(e[0]), e[0].parent_rtd;
    }),
    $t("record-type-uid", 1, 1, function (e) {
      return Tn(e[0]), e[0].uid;
    }),
    $t("record-type-generative?", 1, 1, function (e) {
      return Tn(e[0]), e[0].generative;
    }),
    $t("record-type-sealed?", 1, 1, function (e) {
      return Tn(e[0]), e[0].sealed;
    }),
    $t("record-type-opaque?", 1, 1, function (e) {
      return Tn(e[0]), e[0].opaque;
    }),
    $t("record-type-field-names", 1, 1, function (e) {
      return (
        Tn(e[0]),
        q(e[0].fields, function (e) {
          return e.name;
        })
      );
    }),
    $t("record-field-mutable?", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      Tn(e[0]), Xt(n);
      for (var r = t.parent_rtd; r; r = r.parent_rtd) n += r.fields.length;
      return e[0].fields[n].mutable;
    }),
    $t("raise", 1, 1, function (e) {
      throw new Ie(Me(e[0]));
    }),
    $t("port?", 1, 1, function (e) {
      return e[0] instanceof We;
    }),
    $t("textual-port?", 1, 1, function (e) {
      return Zt(e[0]), !e[0].is_binary;
    }),
    $t("binary-port?", 1, 1, function (e) {
      return Zt(e[0]), e[0].is_binary;
    }),
    $t("close-port", 1, 1, function (e) {
      return Zt(e[0]), e[0].close(), r;
    }),
    $t("call-with-port", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      return (
        Zt(t),
        an(n),
        new xt(n, [t], function (e) {
          return t.close(), e[0];
        })
      );
    }),
    $t("call-with-string-output-port", 1, 1, function (e) {
      var t = e[0];
      cn(t);
      var n = new We.StringOutput();
      return new xt(t, [n], function (e) {
        return n.close(), n.output_string();
      });
    }),
    $t("put-char", 2, 2, function (e) {
      return Zt(e[0]), Qt(e[1]), e[0].put_string(e[1].value), r;
    }),
    $t("put-string", 2, 2, function (e) {
      return Zt(e[0]), Jt(e[1]), e[0].put_string(e[1]), r;
    }),
    $t("put-datum", 2, 2, function (e) {
      return Zt(e[0]), e[0].put_string(Me(e[1])), r;
    }),
    $t("eof-object", 0, 0, function (e) {
      return $e;
    }),
    $t("eof-object?", 1, 1, function (e) {
      return e[0] === $e;
    }),
    $t("input-port?", 1, 1, function (e) {
      return Zt(e[0]), e[0].is_input;
    }),
    $t("output-port?", 1, 1, function (e) {
      return Zt(e[0]), e[0].is_output;
    }),
    $t("current-input-port", 0, 0, function (e) {
      return We.current_input;
    }),
    $t("current-output-port", 0, 0, function (e) {
      return We.current_output;
    }),
    $t("current-error-port", 0, 0, function (e) {
      return We.current_error;
    }),
    $t("close-input-port", 1, 1, function (e) {
      if ((Zt(e[0]), !e[0].is_input))
        throw new Be("close-input-port: port is not input port");
      return e[0].close(), r;
    }),
    $t("close-output-port", 1, 1, function (e) {
      if ((Zt(e[0]), !e[0].is_output))
        throw new Be("close-output-port: port is not output port");
      return e[0].close(), r;
    }),
    $t("read", 0, 1, function (e) {
      var t = e[0] || We.current_input;
      return (
        Zt(t),
        t.get_string(function (e) {
          return Ot.read(e);
        })
      );
    }),
    $t("write-char", 1, 2, function (e) {
      var t = e[1] || We.current_output;
      return Qt(e[0]), t.put_string(e[0].value), r;
    }),
    $t("newline", 0, 1, function (e) {
      return (e[0] || We.current_output).put_string("\n"), r;
    }),
    $t("display", 1, 2, function (e) {
      return (e[1] || We.current_output).put_string(Le(e[0])), r;
    }),
    $t("write", 1, 2, function (e) {
      var t = e[1] || We.current_output;
      return Zt(t), t.put_string(Me(e[0])), r;
    }),
    $t("bitwise-not", 1, 1, function (e) {
      return ~e[0];
    }),
    $t("bitwise-and", 1, null, function (e) {
      return N(e, function (e, t) {
        return e & t;
      });
    }),
    $t("bitwise-ior", 1, null, function (e) {
      return N(e, function (e, t) {
        return e | t;
      });
    }),
    $t("bitwise-xor", 1, null, function (e) {
      return N(e, function (e, t) {
        return e ^ t;
      });
    }),
    $t("bitwise-if", 3, 3, function (e) {
      return (e[0] & e[1]) | (~e[0] & e[2]);
    }),
    $t("bitwise-bit-count", 1, 1, function (e) {
      for (var t = Math.abs(e[0]), n = 0; 0 != t; t >>= 1) 1 & t && n++;
      return n;
    }),
    $t("bitwise-length", 1, 1, function (e) {
      for (var t = Math.abs(e[0]), n = 0; 0 != t; t >>= 1) n++;
      return n;
    }),
    $t("bitwise-first-bit-set", 1, 1, function (e) {
      var t = Math.abs(e[0]),
        n = 0;
      if (0 == t) return -1;
      for (; 0 != t; t >>= 1) {
        if (1 & t) return n;
        n++;
      }
    }),
    $t("bitwise-bit-set?", 2, 2, function (e) {
      return !!(e[0] & (1 << e[1]));
    }),
    $t("bitwise-copy-bit", 3, 3, function (e) {
      var t = 1 << e[1];
      return (t & (e[2] << e[1])) | (~t & e[0]);
    }),
    $t("bitwise-bit-field", 3, 3, function (e) {
      return (~(-1 << e[2]) & e[0]) >> e[1];
    }),
    $t("bitwise-copy-bit-field", 4, 4, function (e) {
      var t = e[0],
        n = e[1],
        r = ~(-1 << e[2]) & (-1 << n);
      return (r & (e[3] << n)) | (~r & t);
    }),
    $t("bitwise-arithmetic-shift", 2, 2, function (e) {
      return e[1] >= 0 ? e[0] << e[1] : e[0] >> -e[1];
    }),
    $t("bitwise-arithmetic-shift-left", 2, 2, function (e) {
      return e[0] << e[1];
    }),
    $t("bitwise-arithmetic-shift-right", 2, 2, function (e) {
      return e[0] >> e[1];
    }),
    $t("bitwise-rotate-bit-field", 4, 4, function (e) {
      var t = e[0],
        n = e[1],
        r = e[2],
        i = e[3],
        o = r - n;
      if (o <= 0) return t;
      var u = (~(-1 << r) & t) >> n,
        a = ~(-1 << r) & (-1 << n);
      return (a & (((u << (i %= o)) | (u >> (o - i))) << n)) | (~a & t);
    }),
    $t("bitwise-reverse-bit-field", 3, 3, function (e) {
      for (
        var t = e[0],
          n = e[0],
          r = e[1],
          i = e[2],
          o = (~(-1 << i) & n) >> r,
          u = 0;
        u < i - r;
        u++, o >>= 1
      ) {
        var a = i - 1 - u,
          c = 1 << a;
        t = (c & ((1 & o) << a)) | (~c & t);
      }
      return t;
    }),
    $t("make-eq-hashtable", 0, 1, function (e) {
      return new At(At.eq_hash, At.eq_equiv);
    }),
    $t("make-eqv-hashtable", 0, 1, function (e) {
      return new At(At.eqv_hash, At.eqv_equiv);
    }),
    $t("make-hashtable", 2, 3, function (e) {
      return cn(e[0]), cn(e[1]), new At(e[0], e[1]);
    }),
    $t("hashtable?", 1, 1, function (e) {
      return e[0] instanceof At;
    }),
    $t("hashtable-size", 1, 1, function (e) {
      return rn(e[0]), e[0].keys().length;
    });
  const tr = function (e, t, n) {
    return new xt(e.hash_proc, [t], function (r) {
      var i = r[0],
        o = e.candidate_pairs(i);
      return o
        ? xt.foreach(o, {
            call: function (n) {
              return new xt(e.equiv_proc, [t, n[0]]);
            },
            result: function (e, t) {
              if (e) return n.on_found(t, i);
            },
            finish: function () {
              return n.on_not_found(i);
            },
          })
        : n.on_not_found(i);
    });
  };
  $t("hashtable-ref", 3, 3, function (e) {
    var t = e[0],
      n = e[1],
      r = e[2];
    return (
      rn(t),
      tr(t, n, {
        on_found: function (e) {
          return e[1];
        },
        on_not_found: function (e) {
          return r;
        },
      })
    );
  }),
    $t("hashtable-set!", 3, 3, function (e) {
      var t = e[0],
        n = e[1],
        i = e[2];
      return (
        rn(t),
        fn(t.mutable, "hashtable is not mutable"),
        tr(t, n, {
          on_found: function (e) {
            return (e[1] = i), r;
          },
          on_not_found: function (e) {
            return t.add_pair(e, n, i), r;
          },
        })
      );
    }),
    $t("hashtable-delete!", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      return (
        rn(t),
        fn(t.mutable, "hashtable is not mutable"),
        tr(t, n, {
          on_found: function (e, n) {
            return t.remove_pair(n, e), r;
          },
          on_not_found: function (e) {
            return r;
          },
        })
      );
    }),
    $t("hashtable-contains?", 2, 2, function (e) {
      var t = e[0],
        n = e[1];
      return (
        rn(t),
        tr(t, n, {
          on_found: function (e) {
            return !0;
          },
          on_not_found: function (e) {
            return !1;
          },
        })
      );
    }),
    $t("hashtable-update!", 4, 4, function (e) {
      var t = e[0],
        n = e[1],
        i = e[2],
        o = e[3];
      return (
        rn(t),
        fn(t.mutable, "hashtable is not mutable"),
        cn(i),
        tr(t, n, {
          on_found: function (e, t) {
            return new xt(i, [e[1]], function (t) {
              return (e[1] = t[0]), r;
            });
          },
          on_not_found: function (e) {
            return new xt(i, [o], function (i) {
              return t.add_pair(e, n, i[0]), r;
            });
          },
        })
      );
    }),
    $t("hashtable-copy", 1, 2, function (e) {
      var t = void 0 !== e[1] && !!e[1];
      return rn(e[0]), e[0].create_copy(t);
    }),
    $t("hashtable-clear!", 0, 1, function (e) {
      return (
        rn(e[0]), fn(e[0].mutable, "hashtable is not mutable"), e[0].clear(), r
      );
    }),
    $t("hashtable-keys", 1, 1, function (e) {
      return rn(e[0]), e[0].keys();
    }),
    $t("hashtable-entries", 1, 1, function (e) {
      return rn(e[0]), new Cn([e[0].keys(), e[0].values()]);
    }),
    $t("hashtable-equivalence-function", 1, 1, function (e) {
      return rn(e[0]), e[0].equiv_proc;
    }),
    $t("hashtable-hash-function", 1, 1, function (e) {
      return rn(e[0]), e[0].hash_proc;
    }),
    $t("hashtable-mutable?", 1, 1, function (e) {
      return rn(e[0]), e[0].mutable;
    }),
    $t("equal-hash", 0, 0, function (e) {
      return At.equal_hash;
    }),
    $t("string-hash", 0, 0, function (e) {
      return At.string_hash;
    }),
    $t("string-ci-hash", 0, 0, function (e) {
      return At.string_ci_hash;
    }),
    $t("symbol-hash", 0, 0, function (e) {
      return At.symbol_hash;
    }),
    $t("make-enumeration", 1, 1, function (e) {
      tn(e[0]);
      var t = e[0].to_array();
      return new gn.EnumType(t).universe();
    }),
    $t("enum-set-universe", 1, 1, function (e) {
      return wn(e[0]), e[0].enum_type.universe();
    }),
    $t("enum-set-indexer", 1, 1, function (e) {
      return wn(e[0]), e[0].enum_type.indexer();
    }),
    $t("enum-set-constructor", 1, 1, function (e) {
      return wn(e[0]), e[0].enum_type.constructor();
    }),
    $t("enum-set->list", 1, 1, function (e) {
      return wn(e[0]), e[0].symbol_list();
    }),
    $t("enum-set-member?", 2, 2, function (e) {
      return Kt(e[0]), wn(e[1]), e[1].is_member(e[0]);
    }),
    $t("enum-set-subset?", 2, 2, function (e) {
      return wn(e[0]), wn(e[1]), e[0].is_subset(e[1]);
    }),
    $t("enum-set=?", 2, 2, function (e) {
      return wn(e[0]), wn(e[1]), e[0].equal_to(e[1]);
    }),
    $t("enum-set-union", 2, 2, function (e) {
      return (
        wn(e[0]),
        wn(e[1]),
        fn(
          e[0].enum_type === e[1].enum_type,
          "two enum-sets must be the same enum-type",
          "enum-set-union"
        ),
        e[0].union(e[1])
      );
    }),
    $t("enum-set-intersection", 2, 2, function (e) {
      return wn(e[0]), wn(e[1]), e[0].intersection(e[1]);
    }),
    $t("enum-set-difference", 2, 2, function (e) {
      return wn(e[0]), wn(e[1]), e[0].difference(e[1]);
    }),
    $t("enum-set-complement", 1, 1, function (e) {
      return wn(e[0]), e[0].complement();
    }),
    $t("enum-set-projection", 2, 2, function (e) {
      return wn(e[0]), wn(e[1]), e[0].projection(e[1]);
    }),
    Ut("define-enumeration", function (e) {
      var t = e.cdr.car;
      fn(Je(t), "expected symbol for type_name", "define-enumeration"),
        (t = t.name);
      var n = e.cdr.cdr.car;
      fn(st(n), "expected list of symbol for members", "define-enumeration"),
        (n = n.to_array());
      var r = e.cdr.cdr.cdr.car;
      fn(Je(r), "expected symbol for constructor_name", "define-enumeration"),
        (r = r.name);
      var i = new gn.EnumType(n);
      Ut(t, function (e) {
        fn(!Ue(e.cdr), "an argument is needed", t);
        var n = e.cdr.car;
        return (
          Kt(n, t),
          fn(
            M(i.members, n),
            n.name + " is not included in the universe: " + Me(i.members),
            t
          ),
          lt(De("quote"), n)
        );
      }),
        Ut(r, function (e) {
          tn(e.cdr, r);
          var t = e.cdr.to_array();
          return (
            E(t, function (e) {
              Kt(e, r),
                fn(
                  M(i.members, e),
                  e.name + " is not included in the universe: " + Me(i.members),
                  r
                );
            }),
            new gn.EnumSet(i, t)
          );
        });
    }),
    $t("eval", 1, 1, function (e, t) {
      var n = e[0];
      return new Ot(t).evaluate(Me(n));
    }),
    Ut("delay", function (e) {
      if (e.cdr === n) throw new Be("malformed delay: no argument");
      if (e.cdr.cdr !== n)
        throw new Be("malformed delay: too many arguments: " + yt(e));
      var t = e.cdr.car;
      return new at(
        De(" procedure->promise"),
        new at(
          new at(
            De("lambda"),
            new at(n, new at(new at(De("make-promise"), new at(t, n)), n))
          )
        )
      );
    }),
    Ut("delay-force", function (e) {
      if (e.cdr === n) throw new Be("malformed delay-force: no argument");
      if (e.cdr.cdr !== n)
        throw new Be("malformed delay-force: too many arguments: " + yt(e));
      var t = e.cdr.car;
      return new at(
        De(" procedure->promise"),
        new at(new at(De("lambda"), new at(n, new at(t, n))), n)
      );
    });
  var nr = function (e) {
    return e.is_done()
      ? e.value()
      : new xt(e.thunk(), [], function (t) {
          on(t[0]);
          var n = t[0];
          return e.is_done() ? e.value() : (e.update_with(n), nr(n));
        });
  };
  $t("force", 1, 1, function (e, t) {
    return on(e[0]), nr(e[0]);
  }),
    $t("promise?", 1, 1, function (e, t) {
      return e[0] instanceof zt;
    }),
    $t("make-promise", 1, 1, function (e, t) {
      var n = e[0];
      return n instanceof zt ? n : zt.done(n);
    }),
    $t(" procedure->promise", 1, 1, function (e, t) {
      return cn(e[0]), zt.fresh(e[0]);
    }),
    $t("make-parameter", 1, 2, function (e, t) {
      let n;
      const r = e[1],
        i = function (e) {
          if (0 == e.length) return n;
          {
            const t = n;
            return r
              ? new xt(r, [e[0]], (e) => ((n = e[0]), t))
              : ((n = e[0]), t);
          }
        };
      if (r) return new xt(r, [e[0]], (e) => ((n = e), i));
      {
        const t = e[0];
        return (n = t), i;
      }
    }),
    Ut("parameterize", function (e) {
      const t = e.cdr.car.to_array(),
        r = e.cdr.cdr,
        i = t.map(() => Ne()),
        o = lt(...t.map((e, t) => lt(i[t], e.cdr.car))),
        u = pt(
          De("begin"),
          lt(...t.map((e, t) => lt(De("set!"), i[t], lt(e.car, i[t]))))
        ),
        a = lt(De("lambda"), n, u),
        c = pt(De("lambda"), pt(n, r)),
        s = lt(De("lambda"), n, u);
      return lt(De("let"), o, lt(De("dynamic-wind"), a, c, s));
    }),
    $t("iota", 1, 3, function (e) {
      var t = e[0],
        n = e[1] || 0,
        r = void 0 === e[2] ? 1 : e[2];
      Xt(t), Vt(n), Vt(r);
      for (var i = [], o = n, u = 0; u < t; u++) i.push(o), (o += r);
      return dt(i);
    });
  var rr = function (e) {
    var t = ct(e.car) ? rr(e.car) : e.car,
      n = ct(e.cdr) ? rr(e.cdr) : e.cdr;
    return new at(t, n);
  };
  $t("list-copy", 1, 1, function (e) {
    return ct(e[0]) ? rr(e[0]) : n;
  }),
    $t("open-input-string", 1, 1, function (e) {
      return Jt(e[0]), new We.StringInput(e[0]);
    }),
    $t("open-output-string", 0, 0, function (e) {
      return new We.StringOutput();
    }),
    $t("get-output-string", 1, 1, function (e) {
      if ((Zt(e[0]), !(e[0] instanceof We.StringOutput)))
        throw new Error(
          "get-output-string: port must be made by 'open-output-string'"
        );
      return e[0].output_string();
    }),
    Ut("receive", function (e) {
      fn(ct(e.cdr), "missing formals", "receive");
      var t = e.cdr.car;
      fn(ct(e.cdr.cdr), "missing expression", "receive");
      var r = e.cdr.cdr.car,
        i = e.cdr.cdr.cdr;
      return ht([
        De("call-with-values"),
        [De("lambda"), n, r],
        new at(De("lambda"), new at(t, i)),
      ]);
    }),
    $t("current-date", 0, 1, function (e) {
      return new Date();
    }),
    $t("date?", 1, 1, function (e) {
      return e[0] instanceof Date;
    }),
    $t("date-nanosecond", 1, 1, function (e) {
      return sn(e[0]), 1e6 * e[0].getMilliseconds();
    }),
    $t("date-millisecond", 1, 1, function (e) {
      return sn(e[0]), e[0].getMilliseconds();
    }),
    $t("date-second", 1, 1, function (e) {
      return sn(e[0]), e[0].getSeconds();
    }),
    $t("date-minute", 1, 1, function (e) {
      return sn(e[0]), e[0].getMinutes();
    }),
    $t("date-hour", 1, 1, function (e) {
      return sn(e[0]), e[0].getHours();
    }),
    $t("date-day", 1, 1, function (e) {
      return sn(e[0]), e[0].getDate();
    }),
    $t("date-month", 1, 1, function (e) {
      return sn(e[0]), e[0].getMonth() + 1;
    }),
    $t("date-year", 1, 1, function (e) {
      return sn(e[0]), e[0].getFullYear();
    }),
    $t("date-week-day", 1, 1, function (e) {
      return sn(e[0]), e[0].getDay();
    });
  const ir = {
      weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      full_weekday: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      full_month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octorber",
        "November",
        "December",
      ],
    },
    or = function (e, t) {
      var n = function (e) {
          return e < 10 ? "0" + e : "" + e;
        },
        r = function (e) {
          return e < 10 ? " " + e : "" + e;
        },
        i = {
          a: function (e) {
            return ir.weekday[e.getDay()];
          },
          A: function (e) {
            return ir.full_weekday[e.getDay()];
          },
          b: function (e) {
            return ir.month[e.getMonth()];
          },
          B: function (e) {
            return ir.full_month[e.getMonth()];
          },
          c: function (e) {
            return e.toString();
          },
          d: function (e) {
            return n(e.getDate());
          },
          D: function (e) {
            return i.d(e) + i.m(e) + i.y(e);
          },
          e: function (e) {
            return r(e.getDate());
          },
          f: function (e) {
            return e.getSeconds() + e.getMilliseconds() / 1e3;
          },
          h: function (e) {
            return ir.month[e.getMonth()];
          },
          H: function (e) {
            return n(e.getHours());
          },
          I: function (e) {
            var t = e.getHours();
            return n(t < 13 ? t : t - 12);
          },
          j: function (e) {
            throw new Bug("not implemented: day of year");
          },
          k: function (e) {
            return r(e.getHours());
          },
          l: function (e) {
            var t = e.getHours();
            return r(t < 13 ? t : t - 12);
          },
          m: function (e) {
            return n(e.getMonth() + 1);
          },
          M: function (e) {
            return n(e.getMinutes());
          },
          n: function (e) {
            return "\n";
          },
          N: function (e) {
            throw new Bug("not implemented: nanoseconds");
          },
          p: function (e) {
            return e.getHours() < 13 ? "AM" : "PM";
          },
          r: function (e) {
            return i.I(e) + ":" + i.M(e) + ":" + i.S(e) + " " + i.p(e);
          },
          s: function (e) {
            return Math.floor(e.getTime() / 1e3);
          },
          S: function (e) {
            return n(e.getSeconds());
          },
          t: function (e) {
            return "\t";
          },
          T: function (e) {
            return i.H(e) + ":" + i.M(e) + ":" + i.S(e);
          },
          U: function (e) {
            throw new Bug("not implemented: weeknum(0~, Sun)");
          },
          V: function (e) {
            return (function (e) {
              var t = new Date(e.getFullYear(), 0, 4),
                n = new Date(e.getFullYear(), 0, 4);
              return (
                t.getDay() >= ir.weekday.indexOf("Thu")
                  ? n.setDate(t.getDate() - (t.getDay() + 1))
                  : n.setDate(t.getDate() + (7 - t.getDay() + 1)),
                Math.ceil((e - n) / 864e5 / 7)
              );
            })(e);
          },
          w: function (e) {
            return e.getDay();
          },
          W: function (e) {
            throw new Bug("not implemented: weeknum(0~, Mon)");
          },
          x: function (e) {
            throw new Bug("not implemented: weeknum(1~, Mon)");
          },
          X: function (e) {
            return i.Y(e) + "/" + i.m(e) + "/" + i.d(e);
          },
          y: function (e) {
            return e.getFullYear() % 100;
          },
          Y: function (e) {
            return e.getFullYear();
          },
          z: function (e) {
            throw new Bug("not implemented: time-zone");
          },
          Z: function (e) {
            throw new Bug("not implemented: symbol time zone");
          },
          1: function (e) {
            throw new Bug("not implemented: ISO-8601 year-month-day format");
          },
          2: function (e) {
            throw new Bug(
              "not implemented: ISO-8601 hour-minute-second-timezone format"
            );
          },
          3: function (e) {
            throw new Bug(
              "not implemented: ISO-8601 hour-minute-second format"
            );
          },
          4: function (e) {
            throw new Bug(
              "not implemented: ISO-8601 year-month-day-hour-minute-second-timezone format"
            );
          },
          5: function (e) {
            throw new Bug(
              "not implemented: ISO-8601 year-month-day-hour-minute-second format"
            );
          },
        };
      return t.replace(/~([\w1-5~])/g, function (t, n) {
        var r = i[n];
        return r ? r(e) : "~" == n ? "~" : n;
      });
    };
  $t("date->string", 1, 2, function (e) {
    return sn(e[0]), e[1] ? (Jt(e[1]), or(e[0], e[1])) : e[0].toString();
  }),
    $t("parse-date", 1, 1, function (e) {
      return Jt(e[0]), new Date(Date.parse(e[0]));
    }),
    $t("random-integer", 1, 1, function (e) {
      var t = e[0];
      if ((Xt(t), t < 0))
        throw new Error("random-integer: the argument must be >= 0");
      return Math.floor(Math.random() * e[0]);
    }),
    $t("random-real", 0, 0, function (e) {
      return Math.random();
    }),
    $t("format", 1, null, function (e) {
      if (de(e[0]))
        var t = null,
          n = e.shift();
      else if (!1 === e[0]) {
        e.shift();
        (t = null), (n = e.shift());
      } else if (!0 === e[0]) {
        e.shift();
        (t = We.current_output), (n = e.shift());
      } else {
        (t = e.shift()), (n = e.shift());
        Zt(t);
      }
      var i = n
        .replace(/~[as]/g, function (t) {
          return (
            fn(e.length > 0, "insufficient number of arguments", "format"),
            "~a" == t ? Le(e.shift()) : Me(e.shift())
          );
        })
        .replace(/~%/, "\n")
        .replace(/~~/, "~");
      return t ? (t.put_string(i), r) : i;
    });
  const ur = function (e) {
    return En.puts(gt(e[0]), !0), r;
  };
  $t("write/ss", 1, 2, ur),
    $t("write-with-shared-structure", 1, 2, ur),
    $t("write*", 1, 2, ur),
    $t("vector-append", 2, null, function (e) {
      var t = [];
      return t.concat.apply(t, e);
    }),
    $t("vector-copy", 1, 1, function (e) {
      return nn(e[0]), ue(e[0]);
    }),
    (n.to_set = function () {
      return new ut();
    });
  var ar = {
    TopEnv: e,
    CoreEnv: t,
    nil: n,
    undef: r,
    max_trace_size: 40,
    suppress_deprecation_warning: !1,
    Version: "0.7.2",
    VERSION: "0.7.2",
    GitCommit: "b2dcab982f1b3954ad1f8b4b94595a803d83663c",
    isNil: Ue,
    isUndef: function (e) {
      return e === r;
    },
    isBoolean: Ve,
    isString: Xe,
    isChar: Ge,
    isSymbol: Je,
    isPort: Qe,
    isPair: ct,
    isList: st,
    isVector: Ke,
    isHashtable: Dt,
    isMutableHashtable: function (e) {
      return e instanceof At && e.mutable;
    },
    isClosure: Ze,
    makeClosure: et,
    isProcedure: tt,
    isSelfEvaluating: function (e) {
      return Ve(e) || isNumber(e) || Xe(e) || Ge(e);
    },
    eq: nt,
    eqv: rt,
    equal: it,
    lt: ot,
    to_write: Me,
    to_display: Le,
    inspect: Re,
    write_ss: gt,
    to_write_ss: yt,
    Call: xt,
    Char: ze,
    Compiler: Tt,
    Enumeration: gn,
    isEnumSet: yn,
    Error: Be,
    Bug: He,
    UserError: Ie,
    Hashtable: At,
    Interpreter: Ot,
    Complex: Mt,
    Rational: Lt,
    isNumber: Rt,
    isComplex: Bt,
    isReal: Ht,
    isRational: It,
    isInteger: Pt,
    Pair: at,
    List: lt,
    array_to_list: dt,
    deep_array_to_list: ht,
    Cons: pt,
    Parser: Nt,
    Pause: Fe,
    Port: We,
    eof: $e,
    Promise: zt,
    isPromise: Ft,
    Record: bn,
    isRecord: _n,
    isRecordTD: xn,
    isRecordCD: kn,
    Set: ut,
    Symbol: Ae,
    Sym: De,
    gensym: Ne,
    Syntax: jt,
    Values: Cn,
    reduce_cyclic_info: bt,
    find_cyclic: _t,
    define_libfunc: $t,
    define_scmfunc: function (e, t, n, r) {
      new Ot().evaluate("(define " + e + " " + r + "\n)");
    },
    parse_fraction: dn,
    is_valid_integer_notation: hn,
    parse_integer: pn,
    is_valid_float_notation: mn,
    parse_float: vn,
  };
  (En.puts = function (e, t) {
    We.current_output.put_string(e + (t ? "" : "\n"));
  }),
    (En.p = function () {
      We.current_output.put_string("p> " + q(B(arguments), Re).join(" "));
    });
  const cr = new We.CustomInput(function (e) {
      const t = document.querySelector("#bs-console"),
        n = document.createElement("form");
      (n.innerHTML =
        "<input id='webscheme-read-line' type='text'><input type='submit' value='ok'>"),
        t.appendChild(n),
        n.addEventListener("submit", function () {
          const t = document.querySelector("#webscheme-read-line").value;
          return n.remove(), e(t), !1;
        });
    }),
    sr = new We.CustomOutput(function (e) {
      const t = document.querySelector("#bs-console");
      if (!t) return;
      const n = document.createElement("span");
      (n.innerHTML = je(e).replace(/\n/g, "<br>").replace(/ /g, "&nbsp;")),
        t.appendChild(n);
    }),
    fr = sr,
    lr = window.jQuery;
  $t("read-line", 0, 1, function (e) {
    var t = e[0] || We.current_input;
    return Zt(t), t.get_string((e) => e);
  }),
    $t("element-empty!", 1, 1, function (e) {
      return lr(e[0]).prop("value") ? lr(e[0]).val("") : lr(e[0]).empty();
    }),
    Wt("element-empty!", "element-clear!"),
    $t("element-visible?", 1, 1, function (e) {
      return lr(e[0]).is(":visible");
    }),
    $t("element-toggle!", 1, 1, function (e) {
      return lr(e[0]).toggle();
    }),
    $t("element-hide!", 1, 1, function (e) {
      return lr(e[0]).hide();
    }),
    $t("element-show!", 1, 1, function (e) {
      return lr(e[0]).show();
    }),
    $t("element-remove!", 1, 1, function (e) {
      return lr(e[0]).remove();
    }),
    $t("element-update!", 2, 2, function (e) {
      return lr(e[0]).html(e[1]);
    }),
    $t("element-replace!", 2, 2, function (e) {
      return lr(e[0]).replaceWith(e[1]);
    }),
    $t("element-insert!", 2, 2, function (e) {
      return lr(e[0]).append(e[1]);
    }),
    $t("element-wrap!", 3, 3, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-ancestors", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-descendants", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-first-descendant", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-immediate-descendants", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-previous-sibling", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-next-sibling", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-siblings", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-match?", 2, 2, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-up", 3, 3, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-down", 3, 3, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-previous", 3, 3, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-next", 3, 3, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-select", 1, 1, function (e) {
      lr(e[0]).select();
    }),
    $t("element-adjacent", 0, 0, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-identify", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-read-attribute", 2, 2, function (e) {
      return Jt(e[1]), lr(e[0]).prop(e[1]);
    });
  var dr = function (e) {
    return Jt(e[1]), lr(e[0]).prop(e[1], e[2]);
  };
  $t("element-write-attribute", 3, 3, function (e) {
    return (
      ln("element-write-attribute", "1.0", "element-write-attribute!"), dr(e)
    );
  }),
    $t("element-write-attribute!", 3, 3, dr),
    $t("element-height", 1, 1, function (e) {
      return lr(e[0]).height();
    }),
    $t("element-width", 1, 1, function (e) {
      return lr(e[0]).width();
    }),
    $t("element-class-names", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-has-class-name?", 2, 2, function (e) {
      return Jt(e[1]), lr(e[0]).hasClass(e[1]);
    });
  var hr = function (e) {
    return Jt(e[1]), lr(e[0]).addClass(e[1]);
  };
  $t("element-add-class-name", 2, 2, function (e) {
    return (
      ln("element-add-class-name", "1.0", "element-add-class-name!"), hr(e)
    );
  }),
    $t("element-add-class-name!", 2, 2, hr);
  var pr = function (e) {
    return Jt(e[1]), lr(e[0]).removeClass(e[1]);
  };
  $t("element-remove-class-name", 2, 2, function (e) {
    return (
      ln("element-remove-class-name", "1.0", "element-remove-class-name!"),
      pr(e)
    );
  }),
    $t("element-remove-class-name!", 2, 2, pr);
  var mr = function (e) {
    return Jt(e[1]), lr(e[0]).toggleClass(e[1]);
  };
  $t("element-toggle-class-name", 2, 2, function (e) {
    return (
      ln("element-toggle-class-name", "1.0", "element-toggle-class-name!"),
      mr(e)
    );
  }),
    $t("element-toggle-class-name!", 2, 2, mr),
    $t("element-clean-whitespace!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-empty?", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-descendant-of!", 2, 2, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("scroll-to-element!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-style", 2, 2, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-opacity", 2, 2, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-style-set!", 2, 2, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-opacity-set!", 2, 2, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-dimensions", 1, 1, function (e) {
      return new Values(lr(e[0]).width(), lr(e[0]).height());
    }),
    $t("element-make-positioned!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-undo-positioned!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-make-clipping!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-undo-clipping!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-cumulative-offset", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-positioned-offset", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-absolutize!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-relativize!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-cumulative-scroll-offset", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-offset-parent", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-viewport-offset", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-clone-position!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-absolutize!", 1, 1, function (e) {
      throw new Bug("not yet implemented");
    }),
    $t("element-focus!", 1, 1, function (e) {
      return lr(e[0]).focus();
    });
  const vr = function (e) {
      var t = (e = e.to_array()).shift();
      t instanceof Ae && (t = t.name);
      var n = t.match(/(.*)\.(.*)/);
      n && ((t = n[1]), e.unshift(De("class"), n[2])),
        (n = t.match(/(.*)\#(.*)/)) && ((t = n[1]), e.unshift(De("id"), n[2]));
      for (var r = [], i = ["<" + t], o = 0; o < e.length; o++)
        e[o] instanceof Ae
          ? (i.push(" " + e[o].name + '="' + e[o + 1] + '"'), o++)
          : e[o] instanceof at
          ? r.push(vr(e[o]))
          : r.push(e[o]);
      return (
        i.push(">"), i.push(r.join("")), i.push("</" + t + ">"), i.join("")
      );
    },
    gr = function (e, t) {
      return e === nil || (!1 !== t(e.car) && gr(e.cdr, t));
    };
  $t("element-new", 1, 1, function (e) {
    return gr(e[0], function (e) {
      return de(e) || e instanceof Ae || e instanceof at;
    })
      ? lr(vr(e[0]))[0]
      : nil;
  });
  const yr = function (e) {
    return lr(e).prop("value") ? lr(e).val() : je(lr(e).html());
  };
  $t("element-content", 1, 1, function (e) {
    return yr(e[0]);
  }),
    $t("load", 1, 1, function (e, t) {
      var n = e[0];
      Jt(n);
      var i = new Ot(t);
      return new Fe(function (e) {
        lr.ajax(n, {
          dataType: "text",
          mimeType: "text/plain; charset=UTF-8",
          success: function (t) {
            i.evaluate(t, function () {
              return e.resume(r);
            });
          },
          error: function () {
            throw new Error("load: network error: failed to load " + n);
          },
        });
      });
    });
  $t("js-load", 2, 2, function (e) {
    var t = e[0],
      n = e[1];
    return (
      Jt(t),
      Jt(n),
      new Fe(function (e) {
        !(function (e, t, n) {
          var r = lr("<script/>", { src: e });
          lr("body").append(r);
          var i = new Function("return !!(" + t + ")");
          i()
            ? n()
            : setTimeout(function () {
                i() ? n() : setTimeout(arguments.callee, 10);
              }, 10);
        })(t, "window." + n, function () {
          e.resume(r);
        });
      })
    );
  });
  const wr = function (e) {
    e.length > 1 && !1 === e[1] && (e[1] = []);
    var t = lr.apply(this, e);
    return t.length > 0 && t;
  };
  $t("$", 1, 2, wr),
    $t("getelem", 1, 2, wr),
    $t("dom-element", 1, 1, function (e) {
      return lr(e[0])[0];
    }),
    $t("set-style!", 3, 3, function (e) {
      return Jt(e[1]), lr(e[0]).css(e[1], e[2]), r;
    }),
    $t("get-style", 2, 2, function (e) {
      return Jt(e[1]), lr(e[0]).css(e[1]);
    }),
    $t("set-content!", 2, 2, function (e) {
      Jt(e[1]);
      var t = e[1].replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;");
      return lr(e[0]).html(t), r;
    }),
    $t("get-content", 1, 1, function (e) {
      return yr(e[0]);
    }),
    $t("set-handler!", 3, 3, function (e, t) {
      throw new Error(
        "set-handler! is obsolete, please use add-handler! instead"
      );
    }),
    $t("add-handler!", 3, 3, function (e, t) {
      var n = e[0],
        r = e[1],
        i = e[2],
        o = new Ot(t),
        u = function (e) {
          return ue(o).invoke_closure(i, [e]);
        };
      return lr(n).on(r, u), u;
    }),
    $t("remove-handler!", 3, 3, function (e, t) {
      var n = e[0],
        i = e[1],
        o = e[2];
      return lr(n).off(i, o), r;
    }),
    $t("wait-for", 2, 2, function (e) {
      var t = e[0],
        n = e[1],
        r = lr(t);
      r.biwascheme_wait_for = r.biwascheme_wait_for || {};
      var i = r.biwascheme_wait_for[n];
      return (
        i && r.off(n, i),
        new Fe(function (e) {
          var t = function (i) {
            return (
              (r.biwascheme_wait_for[n] = void 0), r.off(n, t), e.resume(i)
            );
          };
          (r.biwascheme_wait_for[n] = t), r.on(n, t);
        })
      );
    }),
    $t("domelem", 1, null, function (e) {
      throw new Error("obsolete");
    }),
    $t("dom-remove-children!", 1, 1, function (e) {
      return (
        En.puts(
          "warning: dom-remove-children! is obsolete. use element-empty! instead"
        ),
        lr(e[0]).empty(),
        r
      );
    }),
    $t("dom-create-element", 1, 1, function (e) {
      throw new Error("obsolete");
    }),
    $t("element-append-child!", 2, 2, function (e) {
      return lr(e[0]).append(e[1]);
    }),
    $t("dom-remove-child!", 2, 2, function (e) {
      throw new Error("obsolete");
    }),
    $t("http-request", 1, 1, function (e) {
      var t = e[0];
      return (
        Jt(t),
        new Fe(function (e) {
          lr.get(
            t,
            function (t) {
              e.resume(t);
            },
            "text"
          );
        })
      );
    }),
    $t("http-post", 2, 2, function (e) {
      var t = e[0];
      Jt(t);
      var n = e[1];
      tn(n);
      var r = vt(n);
      return new Fe(function (e) {
        lr.post(
          t,
          r,
          function (t) {
            e.resume(t);
          },
          "text"
        );
      });
    });
  const br = [];
  $t("receive-jsonp", 1, 1, function (e) {
    var t = e[0];
    Jt(t);
    for (var n = br, r = 0; r < n.length && null !== n[r]; r++);
    var i = r;
    return (
      (t += "?callback=BiwaScheme.jsonp_receiver[" + i + "]"),
      new Fe(function (e) {
        n[i] = function (t) {
          e.resume(t), (n[i] = null);
        };
        var r = lr("<script/>", { src: t });
        lr("body").append(r);
      })
    );
  }),
    $t("alert", 1, 1, function (e) {
      return alert(e[0]), r;
    }),
    $t("confirm", 1, 1, function (e) {
      return confirm(e[0]);
    });
  const _r = Ee.create({
    initialize: function (e) {
      (this.dumparea = e || $("#dumparea")[0] || null), this.reset();
    },
    reset: function () {
      this.dumparea && $(this.dumparea).empty(),
        (this.n_folds = 0),
        (this.closures = []),
        (this.n_dumps = 0),
        (this.cur = -1),
        (this.is_folded = !0);
    },
    is_opc: function (e) {
      return e instanceof Array && "string" == typeof e[0];
    },
    dump_pad: "&nbsp;&nbsp;&nbsp;",
    dump_opc: function (e, t, n) {
      var r = "",
        i = "",
        o = "";
      n = n || !1;
      be(
        (t = t || 0),
        V(function () {
          i += this.dump_pad;
        }, this)
      ),
        be(
          t + 1,
          V(function () {
            o += this.dump_pad;
          }, this)
        ),
        (r += i + '[<span class="dump_opecode">' + e[0] + "</span>");
      for (var u = 1; !(e[u] instanceof Array) && u < e.length; )
        "constant" == e[0]
          ? (r +=
              "&nbsp;<span class='dump_constant'>" +
              this.dump_obj(e[u]) +
              "</span>")
          : (r += "&nbsp;" + this.dump_obj(e[u])),
          u++;
      for (u < e.length && (r += "<br>\n"); u < e.length; u++)
        this.is_opc(e[u])
          ? (r += this.dump_opc(e[u], u == e.length - 1 ? t : t + 1, !0))
          : ((r += u == e.length - 1 ? i : o), (r += this.dump_obj(e[u]))),
          u != e.length - 1 && (r += "<br>\n");
      return (r += "]"), n ? r : this.add_fold(r);
    },
    fold_limit: 20,
    add_fold: function (e) {
      var t = e.split(/<br>/gim);
      if (t.length > this.fold_limit) {
        var n =
            " <span style='text-decoration:underline; color:blue; cursor:pointer;'onclick='BiwaScheme.Dumper.toggle_fold(" +
            this.n_folds +
            ")'>more</span>",
          r = "<div style='display:none' class='fold" + this.n_folds + "'>";
        return (
          this.n_folds++,
          [
            t.slice(0, this.fold_limit).join("<br>"),
            n,
            r,
            t.slice(this.fold_limit).join("<br>"),
            "</div>",
          ].join("")
        );
      }
      return e;
    },
    stack_max_len: 80,
    dump_stack: function (e, t) {
      if (null == e) return Re(e);
      var n = "<table>";
      if (0 == e.length)
        n += "<tr><td class='dump_dead'>(stack is empty)</td></tr>";
      else if (t < e.length) {
        var r = e.length - 1;
        n +=
          "<tr><td class='dump_dead'>[" +
          r +
          "]</td><td class='dump_dead'>" +
          Oe(this.dump_obj(e[r]), this.stack_max_len) +
          "</td></tr>";
      }
      for (var i = t - 1; i >= 0; i--)
        n +=
          "<tr><td class='dump_stknum'>[" +
          i +
          "]</td><td>" +
          Oe(this.dump_obj(e[i]), this.stack_max_len) +
          "</td></tr>";
      return n + "</table>";
    },
    dump_object: function (e) {
      var t = [];
      for (var n in e) t.push(n.toString());
      return "#<Object{" + t.join(",") + "}>";
    },
    dump_closure: function (e) {
      if (!e) return "**BROKEN**";
      if (0 == e.length) return "[]";
      for (var t = null, n = 0; n < this.closures.length; n++)
        this.closures[n] == e && (t = n);
      null == t && ((t = this.closures.length), this.closures.push(e));
      var r = ue(e),
        i = r.shift && r.shift();
      return [
        "c",
        t,
        " <span class='dump_closure'>free vars :</span> ",
        this.dump_obj(r),
        " <span class='dump_closure'>body :</span> ",
        Oe(this.dump_obj(i), 100),
      ].join("");
    },
    dump_obj: function (e) {
      if (e && "function" == typeof e.to_html) return e.to_html();
      var t = gt(e, !0);
      return "[object Object]" == t && (t = this.dump_object(e)), je(t);
    },
    dump: function (e) {
      var t = "";
      e instanceof Object
        ? ((t += "<table>"),
          (t +=
            "<tr><td colspan='4'><a href='#' class='header'>#" +
            this.n_dumps +
            "</a></td></tr>"),
          E(
            K(e),
            V(function (n) {
              var r = e[n];
              "x" != n &&
                "stack" != n &&
                ((r = "c" == n ? this.dump_closure(r) : this.dump_obj(r)),
                (t +=
                  "<tr><td>" +
                  n +
                  ": </td><td colspan='3'>" +
                  r +
                  "</td></tr>"));
            }, this)
          ),
          (t +=
            "<tr><td>x:</td><td>" +
            (this.is_opc(e.x) ? this.dump_opc(e.x) : this.dump_obj(e.x)) +
            "</td>"),
          (t +=
            "<td style='border-left: 1px solid black'>stack:</td><td>" +
            this.dump_stack(e.stack, e.s) +
            "</td></tr>"),
          (t += "</table>"))
        : (t = je(Re(e)) + "<br>\n");
      var n = $("<div/>", { class: "dump" + this.n_dumps });
      n.html(t),
        $(this.dumparea).append(n),
        V(function (e) {
          $(".header", this.dump_el(this.n_dumps)).click(
            V(function () {
              this.dump_move_to(e), this.dump_fold();
            }, this)
          );
        }, this)(this.n_dumps),
        n.hide(),
        this.n_dumps++;
    },
    dump_el: function (e) {
      return $(".dump" + e, this.dumparea);
    },
    dump_move_to: function (e) {
      e < 0 && (e = this.n_dumps + e),
        0 <= e &&
          e <= this.n_dumps &&
          (this.dump_el(this.cur).hide(),
          (this.cur = e),
          this.dump_el(this.cur).show());
    },
    dump_move: function (e) {
      0 <= this.cur && this.cur < this.n_dumps && this.dump_el(this.cur).hide(),
        0 <= this.cur + e && this.cur + e < this.n_dumps && (this.cur += e),
        this.dump_el(this.cur).show();
    },
    dump_fold: function () {
      for (var e = 0; e < this.n_dumps; e++)
        e != this.cur && this.dump_el(e).hide();
      this.is_folded = !0;
    },
    dump_unfold: function () {
      for (var e = 0; e < this.n_dumps; e++) this.dump_el(e).show();
      this.is_folded = !1;
    },
    dump_toggle_fold: function () {
      this.is_folded ? this.dump_unfold() : this.dump_fold();
    },
  });
  _r.toggle_fold = function (e) {
    $(".fold" + e, this.dumparea).toggle();
  };
  return (
    (ar.on_node = !1),
    (ar.Console = En),
    (ar.Port.current_input = cr),
    (ar.Port.current_output = sr),
    (ar.Port.current_error = fr),
    (ar.jsonp_receiver = br),
    (ar.Dumper = _r),
    (window.BiwaScheme = window.BiwaScheme || {}),
    Object.assign(window.BiwaScheme, ar),
    (function () {
      const e = null,
        t = document.querySelector("#biwascheme-debugger");
      t && (e = new _r(t));
      const n = function (t, n) {
          if ((BiwaScheme.Port.current_error.put_string(t.message + "\n"), e))
            e.dump(n), e.dump_move(1);
          else {
            if ("undefined" == typeof console || !console.error) throw t;
            console.error(t.message);
          }
        },
        r = function (e) {
          const t = new BiwaScheme.Interpreter(n);
          try {
            t.evaluate(e, function () {});
          } catch (e) {
            n(e);
          }
        };
      let i = "";
      for (const e of document.querySelectorAll("script[src$='biwascheme.js']"))
        i += e.innerHTML;
      for (const e of document.querySelectorAll(
        "script[src$='biwascheme-min.js']"
      ))
        i += e.innerHTML;
      i.length > 0 && r(i),
        window.addEventListener("DOMContentLoaded", function () {
          for (const e of document.querySelectorAll(
            "script[type='text/biwascheme']"
          ))
            r(e.innerHTML);
        });
    })(),
    ar
  );
})();
