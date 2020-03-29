!function (t) {
    if ("function" == typeof define && define.amd && define("uikit", function () {
            var i = window.UIkit || t(window, window.jQuery, window.document);
            return i.load = function (t, e, n, o) {
                var s, a = t.split(","), r = [], l = (o.config && o.config.uikit && o.config.uikit.base ? o.config.uikit.base : "").replace(/\/+$/g, "");
                if (!l)throw new Error("Please define base path to UIkit in the requirejs config.");
                for (s = 0; s < a.length; s += 1) {
                    var c = a[s].replace(/\./g, "/");
                    r.push(l + "/components/" + c)
                }
                e(r, function () {
                    n(i)
                })
            }, i
        }), !window.jQuery)throw new Error("UIkit requires jQuery");
    window && window.jQuery && t(window, window.jQuery, window.document)
}(function (t, i, e) {
    "use strict";
    var n = {}, o = t.UIkit ? Object.create(t.UIkit) : void 0;
    if (n.version = "2.27.2", n.noConflict = function () {
            return o && (t.UIkit = o, i.UIkit = o, i.fn.uk = o.fn), n
        }, n.prefix = function (t) {
            return t
        }, n.$ = i, n.$doc = n.$(document), n.$win = n.$(window), n.$html = n.$("html"), n.support = {}, n.support.transition = function () {
            var t = function () {
                var t, i = e.body || e.documentElement, n = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (t in n)if (void 0 !== i.style[t])return n[t]
            }();
            return t && {end: t}
        }(), n.support.animation = function () {
            var t = function () {
                var t, i = e.body || e.documentElement, n = {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd oanimationend",
                    animation: "animationend"
                };
                for (t in n)if (void 0 !== i.style[t])return n[t]
            }();
            return t && {end: t}
        }(), function () {
            Date.now = Date.now || function () {
                    return (new Date).getTime()
                };
            for (var t = ["webkit", "moz"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) {
                var e = t[i];
                window.requestAnimationFrame = window[e + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var n = 0;
                window.requestAnimationFrame = function (t) {
                    var i = Date.now(), e = Math.max(n + 16, i);
                    return setTimeout(function () {
                        t(n = e)
                    }, e - i)
                }, window.cancelAnimationFrame = clearTimeout
            }
        }(), n.support.touch = "ontouchstart" in document || t.DocumentTouch && document instanceof t.DocumentTouch || t.navigator.msPointerEnabled && t.navigator.msMaxTouchPoints > 0 || t.navigator.pointerEnabled && t.navigator.maxTouchPoints > 0 || !1, n.support.mutationobserver = t.MutationObserver || t.WebKitMutationObserver || null, n.Utils = {}, n.Utils.isFullscreen = function () {
            return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || !1
        }, n.Utils.str2json = function (t, i) {
            try {
                return i ? JSON.parse(t.replace(/([\$\w]+)\s*:/g, function (t, i) {
                    return '"' + i + '":'
                }).replace(/'([^']+)'/g, function (t, i) {
                    return '"' + i + '"'
                })) : new Function("", "var json = " + t + "; return JSON.parse(JSON.stringify(json));")()
            } catch (e) {
                return !1
            }
        }, n.Utils.debounce = function (t, i, e) {
            var n;
            return function () {
                var o = this, s = arguments, a = function () {
                    n = null, e || t.apply(o, s)
                }, r = e && !n;
                clearTimeout(n), n = setTimeout(a, i), r && t.apply(o, s)
            }
        }, n.Utils.throttle = function (t, i) {
            var e = !1;
            return function () {
                e || (t.call(), e = !0, setTimeout(function () {
                    e = !1
                }, i))
            }
        }, n.Utils.removeCssRules = function (t) {
            var i, e, n, o, s, a, r, l, c, d;
            t && setTimeout(function () {
                try {
                    for (d = document.styleSheets, o = 0, r = d.length; o < r; o++) {
                        for (n = d[o], e = [], n.cssRules = n.cssRules, i = s = 0, l = n.cssRules.length; s < l; i = ++s)n.cssRules[i].type === CSSRule.STYLE_RULE && t.test(n.cssRules[i].selectorText) && e.unshift(i);
                        for (a = 0, c = e.length; a < c; a++)n.deleteRule(e[a])
                    }
                } catch (u) {
                }
            }, 0)
        }, n.Utils.isInView = function (t, e) {
            var o = i(t);
            if (!o.is(":visible"))return !1;
            var s = n.$win.scrollLeft(), a = n.$win.scrollTop(), r = o.offset(), l = r.left, c = r.top;
            return e = i.extend({
                topoffset: 0,
                leftoffset: 0
            }, e), c + o.height() >= a && c - e.topoffset <= a + n.$win.height() && l + o.width() >= s && l - e.leftoffset <= s + n.$win.width()
        }, n.Utils.checkDisplay = function (t, e) {
            var o = n.$("[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]", t || document);
            return t && !o.length && (o = i(t)), o.trigger("display.uk.check"), e && ("string" != typeof e && (e = '[class*="uk-animation-"]'), o.find(e).each(function () {
                var t = n.$(this), i = t.attr("class"), e = i.match(/uk-animation-(.+)/);
                t.removeClass(e[0]).width(), t.addClass(e[0])
            })), o
        }, n.Utils.options = function (t) {
            if ("string" != i.type(t))return t;
            t.indexOf(":") != -1 && "}" != t.trim().substr(-1) && (t = "{" + t + "}");
            var e = t ? t.indexOf("{") : -1, o = {};
            if (e != -1)try {
                o = n.Utils.str2json(t.substr(e))
            } catch (s) {
            }
            return o
        }, n.Utils.animate = function (t, e) {
            var o = i.Deferred();
            return t = n.$(t), t.css("display", "none").addClass(e).one(n.support.animation.end, function () {
                t.removeClass(e), o.resolve()
            }), t.css("display", ""), o.promise()
        }, n.Utils.uid = function (t) {
            return (t || "id") + (new Date).getTime() + "RAND" + Math.ceil(1e5 * Math.random())
        }, n.Utils.template = function (t, i) {
            for (var e, n, o, s, a = t.replace(/\n/g, "\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g), r = 0, l = [], c = 0; r < a.length;) {
                if (e = a[r], e.match(/\{\{\s*(.+?)\s*\}\}/))switch (r += 1, e = a[r], n = e[0], o = e.substring(e.match(/^(\^|\#|\!|\~|\:)/) ? 1 : 0), n) {
                    case"~":
                        l.push("for(var $i=0;$i<" + o + ".length;$i++) { var $item = " + o + "[$i];"), c++;
                        break;
                    case":":
                        l.push("for(var $key in " + o + ") { var $val = " + o + "[$key];"), c++;
                        break;
                    case"#":
                        l.push("if(" + o + ") {"), c++;
                        break;
                    case"^":
                        l.push("if(!" + o + ") {"), c++;
                        break;
                    case"/":
                        l.push("}"), c--;
                        break;
                    case"!":
                        l.push("__ret.push(" + o + ");");
                        break;
                    default:
                        l.push("__ret.push(escape(" + o + "));")
                } else l.push("__ret.push('" + e.replace(/\'/g, "\\'") + "');");
                r += 1
            }
            return s = new Function("$data", ["var __ret = [];", "try {", "with($data){", c ? '__ret = ["Not all blocks are closed correctly."]' : l.join(""), "};", "}catch(e){__ret = [e.message];}", 'return __ret.join("").replace(/\\n\\n/g, "\\n");', "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n")), i ? s(i) : s
        }, n.Utils.focus = function (t, e) {
            if (t = i(t), !t.length)return t;
            var n, o = t.find("[autofocus]:first");
            return o.length ? o.focus() : (o = t.find(":input" + (e && "," + e || "")).first(), o.length ? o.focus() : (t.attr("tabindex") || (n = 1e3, t.attr("tabindex", n)), t[0].focus(), n && t.attr("tabindex", ""), t))
        }, n.Utils.events = {}, n.Utils.events.click = n.support.touch ? "tap" : "click", t.UIkit = n, n.fn = function (t, e) {
            var o = arguments, s = t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i), a = s[1], r = s[2];
            return n[a] ? this.each(function () {
                var t = i(this), s = t.data(a);
                s || t.data(a, s = n[a](this, r ? void 0 : e)), r && s[r].apply(s, Array.prototype.slice.call(o, 1))
            }) : (i.error("UIkit component [" + a + "] does not exist."), this)
        }, i.UIkit = n, i.fn.uk = n.fn, n.langdirection = "rtl" == n.$html.attr("dir") ? "right" : "left", n.components = {}, n.component = function (t, e) {
            var o = function (e, s) {
                var a = this;
                return this.UIkit = n, this.element = e ? n.$(e) : null, this.options = i.extend(!0, {}, this.defaults, s), this.plugins = {}, this.element && this.element.data(t, this), this.init(), (this.options.plugins.length ? this.options.plugins : Object.keys(o.plugins)).forEach(function (t) {
                    o.plugins[t].init && (o.plugins[t].init(a), a.plugins[t] = !0)
                }), this.trigger("init.uk.component", [t, this]), this
            };
            return o.plugins = {}, i.extend(!0, o.prototype, {
                defaults: {plugins: []}, boot: function () {
                }, init: function () {
                }, on: function (t, i, e) {
                    return n.$(this.element || this).on(t, i, e)
                }, one: function (t, i, e) {
                    return n.$(this.element || this).one(t, i, e)
                }, off: function (t) {
                    return n.$(this.element || this).off(t)
                }, trigger: function (t, i) {
                    return n.$(this.element || this).trigger(t, i)
                }, find: function (t) {
                    return n.$(this.element ? this.element : []).find(t)
                }, proxy: function (t, i) {
                    var e = this;
                    i.split(" ").forEach(function (i) {
                        e[i] || (e[i] = function () {
                            return t[i].apply(t, arguments)
                        })
                    })
                }, mixin: function (t, i) {
                    var e = this;
                    i.split(" ").forEach(function (i) {
                        e[i] || (e[i] = t[i].bind(e))
                    })
                }, option: function () {
                    return 1 == arguments.length ? this.options[arguments[0]] || void 0 : void(2 == arguments.length && (this.options[arguments[0]] = arguments[1]))
                }
            }, e), this.components[t] = o, this[t] = function () {
                var e, o;
                if (arguments.length)switch (arguments.length) {
                    case 1:
                        "string" == typeof arguments[0] || arguments[0].nodeType || arguments[0] instanceof jQuery ? e = i(arguments[0]) : o = arguments[0];
                        break;
                    case 2:
                        e = i(arguments[0]), o = arguments[1]
                }
                return e && e.data(t) ? e.data(t) : new n.components[t](e, o)
            }, n.domready && n.component.boot(t), o
        }, n.plugin = function (t, i, e) {
            this.components[t].plugins[i] = e
        }, n.component.boot = function (t) {
            n.components[t].prototype && n.components[t].prototype.boot && !n.components[t].booted && (n.components[t].prototype.boot.apply(n, []), n.components[t].booted = !0)
        }, n.component.bootComponents = function () {
            for (var t in n.components)n.component.boot(t)
        }, n.domObservers = [], n.domready = !1, n.ready = function (t) {
            n.domObservers.push(t), n.domready && t(document)
        }, n.on = function (t, i, e) {
            return t && t.indexOf("ready.uk.dom") > -1 && n.domready && i.apply(n.$doc), n.$doc.on(t, i, e)
        }, n.one = function (t, i, e) {
            return t && t.indexOf("ready.uk.dom") > -1 && n.domready ? (i.apply(n.$doc), n.$doc) : n.$doc.one(t, i, e)
        }, n.trigger = function (t, i) {
            return n.$doc.trigger(t, i)
        }, n.domObserve = function (t, i) {
            n.support.mutationobserver && (i = i || function () {
                }, n.$(t).each(function () {
                var t = this, e = n.$(t);
                if (!e.data("observer"))try {
                    var o = new n.support.mutationobserver(n.Utils.debounce(function (n) {
                        i.apply(t, [e]), e.trigger("changed.uk.dom")
                    }, 50), {childList: !0, subtree: !0});
                    o.observe(t, {childList: !0, subtree: !0}), e.data("observer", o)
                } catch (s) {
                }
            }))
        }, n.init = function (t) {
            t = t || document, n.domObservers.forEach(function (i) {
                i(t)
            })
        }, n.on("domready.uk.dom", function () {
            n.init(), n.domready && n.Utils.checkDisplay()
        }), document.addEventListener("DOMContentLoaded", function () {
            var t = function () {
                n.$body = n.$("body"), n.trigger("beforeready.uk.dom"), n.component.bootComponents();
                var t = requestAnimationFrame(function () {
                    var i = {dir: {x: 0, y: 0}, x: window.pageXOffset, y: window.pageYOffset}, e = function () {
                        var o = window.pageXOffset, s = window.pageYOffset;
                        i.x == o && i.y == s || (o != i.x ? i.dir.x = o > i.x ? 1 : -1 : i.dir.x = 0, s != i.y ? i.dir.y = s > i.y ? 1 : -1 : i.dir.y = 0, i.x = o, i.y = s, n.$doc.trigger("scrolling.uk.document", [{
                            dir: {
                                x: i.dir.x,
                                y: i.dir.y
                            }, x: o, y: s
                        }])), cancelAnimationFrame(t), t = requestAnimationFrame(e)
                    };
                    return n.support.touch && n.$html.on("touchmove touchend MSPointerMove MSPointerUp pointermove pointerup", e), (i.x || i.y) && e(), e
                }());
                if (n.trigger("domready.uk.dom"), n.support.touch && navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && n.$win.on("load orientationchange resize", n.Utils.debounce(function () {
                        var t = function () {
                            return i(".uk-height-viewport").css("height", window.innerHeight), t
                        };
                        return t()
                    }(), 100)), n.trigger("afterready.uk.dom"), n.domready = !0, n.support.mutationobserver) {
                    var e = n.Utils.debounce(function () {
                        requestAnimationFrame(function () {
                            n.init(document.body)
                        })
                    }, 10);
                    new n.support.mutationobserver(function (t) {
                        var i = !1;
                        t.every(function (t) {
                            if ("childList" != t.type)return !0;
                            for (var e, n = 0; n < t.addedNodes.length; ++n)if (e = t.addedNodes[n], e.outerHTML && e.outerHTML.indexOf("data-uk-") !== -1)return (i = !0) && !1;
                            return !0
                        }), i && e()
                    }).observe(document.body, {childList: !0, subtree: !0})
                }
            };
            return "complete" != document.readyState && "interactive" != document.readyState || setTimeout(t), t
        }()), n.$html.addClass(n.support.touch ? "uk-touch" : "uk-notouch"), n.support.touch) {
        var s, a = !1, r = "uk-hover", l = ".uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover";
        n.$html.on("mouseenter touchstart MSPointerDown pointerdown", l, function () {
            a && i("." + r).removeClass(r), a = i(this).addClass(r)
        }).on("mouseleave touchend MSPointerUp pointerup", function (t) {
            s = i(t.target).parents(l), a && a.not(s).removeClass(r)
        })
    }
    return n
}), function (t) {
    function i(t, i, e, n) {
        return Math.abs(t - i) >= Math.abs(e - n) ? t - i > 0 ? "Left" : "Right" : e - n > 0 ? "Up" : "Down"
    }

    function e() {
        c = null, u.last && (void 0 !== u.el && u.el.trigger("longTap"), u = {})
    }

    function n() {
        c && clearTimeout(c), c = null
    }

    function o() {
        a && clearTimeout(a), r && clearTimeout(r), l && clearTimeout(l), c && clearTimeout(c), a = r = l = c = null, u = {}
    }

    function s(t) {
        return t.pointerType == t.MSPOINTER_TYPE_TOUCH && t.isPrimary
    }

    if (!t.fn.swipeLeft) {
        var a, r, l, c, d, u = {}, h = 750;
        t(function () {
            var p, f, m, g = 0, v = 0;
            "MSGesture" in window && (d = new MSGesture, d.target = document.body), t(document).on("MSGestureEnd gestureend", function (t) {
                var i = t.originalEvent.velocityX > 1 ? "Right" : t.originalEvent.velocityX < -1 ? "Left" : t.originalEvent.velocityY > 1 ? "Down" : t.originalEvent.velocityY < -1 ? "Up" : null;
                i && void 0 !== u.el && (u.el.trigger("swipe"), u.el.trigger("swipe" + i))
            }).on("touchstart MSPointerDown pointerdown", function (i) {
                ("MSPointerDown" != i.type || s(i.originalEvent)) && (m = "MSPointerDown" == i.type || "pointerdown" == i.type ? i : i.originalEvent.touches[0], p = Date.now(), f = p - (u.last || p), u.el = t("tagName" in m.target ? m.target : m.target.parentNode), a && clearTimeout(a), u.x1 = m.pageX, u.y1 = m.pageY, f > 0 && f <= 250 && (u.isDoubleTap = !0), u.last = p, c = setTimeout(e, h), i.originalEvent && i.originalEvent.pointerId && d && ("MSPointerDown" == i.type || "pointerdown" == i.type || "touchstart" == i.type) && d.addPointer(i.originalEvent.pointerId))
            }).on("touchmove MSPointerMove pointermove", function (t) {
                ("MSPointerMove" != t.type || s(t.originalEvent)) && (m = "MSPointerMove" == t.type || "pointermove" == t.type ? t : t.originalEvent.touches[0], n(), u.x2 = m.pageX, u.y2 = m.pageY, g += Math.abs(u.x1 - u.x2), v += Math.abs(u.y1 - u.y2))
            }).on("touchend MSPointerUp pointerup", function (e) {
                ("MSPointerUp" != e.type || s(e.originalEvent)) && (n(), u.x2 && Math.abs(u.x1 - u.x2) > 30 || u.y2 && Math.abs(u.y1 - u.y2) > 30 ? l = setTimeout(function () {
                    void 0 !== u.el && (u.el.trigger("swipe"), u.el.trigger("swipe" + i(u.x1, u.x2, u.y1, u.y2))), u = {}
                }, 0) : "last" in u && (isNaN(g) || g < 30 && v < 30 ? r = setTimeout(function () {
                    var i = t.Event("tap");
                    i.cancelTouch = o, void 0 !== u.el && u.el.trigger(i), u.isDoubleTap ? (void 0 !== u.el && u.el.trigger("doubleTap"), u = {}) : a = setTimeout(function () {
                        a = null, void 0 !== u.el && u.el.trigger("singleTap"), u = {}
                    }, 250)
                }, 0) : u = {}, g = v = 0))
            }).on("touchcancel MSPointerCancel pointercancel", o), t(window).on("scroll", o)
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (i) {
            t.fn[i] = function (e) {
                return t(this).on(i, e)
            }
        })
    }
}(jQuery), function (t) {
    "use strict";
    var i = [];
    t.component("stackMargin", {
        defaults: {cls: "uk-margin-small-top", rowfirst: !1, observe: !1}, boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-margin]", i).each(function () {
                    var i = t.$(this);
                    i.data("stackMargin") || t.stackMargin(i, t.Utils.options(i.attr("data-uk-margin")))
                })
            })
        }, init: function () {
            var e = this;
            t.$win.on("resize orientationchange", function () {
                var i = function () {
                    e.process()
                };
                return t.$(function () {
                    i(), t.$win.on("load", i)
                }), t.Utils.debounce(i, 20)
            }()), this.on("display.uk.check", function (t) {
                this.element.is(":visible") && this.process()
            }.bind(this)), this.options.observe && t.domObserve(this.element, function (t) {
                e.element.is(":visible") && e.process()
            }), i.push(this)
        }, process: function () {
            var i = this.element.children();
            if (t.Utils.stackMargin(i, this.options), !this.options.rowfirst || !i.length)return this;
            var e = {}, n = !1;
            return i.removeClass(this.options.rowfirst).each(function (i, o) {
                o = t.$(this), "none" != this.style.display && (i = o.offset().left, ((e[i] = e[i] || []) && e[i]).push(this), n = n === !1 ? i : Math.min(n, i))
            }), t.$(e[n]).addClass(this.options.rowfirst), this
        }
    }), function () {
        var i = [], e = function (t) {
            if (t.is(":visible")) {
                var i = t.parent().width(), e = t.data("width"), n = i / e, o = Math.floor(n * t.data("height"));
                t.css({height: i < e ? o : t.data("height")})
            }
        };
        t.component("responsiveElement", {
            defaults: {}, boot: function () {
                t.ready(function (i) {
                    t.$("iframe.uk-responsive-width, [data-uk-responsive]", i).each(function () {
                        var i, e = t.$(this);
                        e.data("responsiveElement") || (i = t.responsiveElement(e, {}))
                    })
                })
            }, init: function () {
                var t = this.element;
                t.attr("width") && t.attr("height") && (t.data({
                    width: t.attr("width"),
                    height: t.attr("height")
                }).on("display.uk.check", function () {
                    e(t)
                }), e(t), i.push(t))
            }
        }), t.$win.on("resize load", t.Utils.debounce(function () {
            i.forEach(function (t) {
                e(t)
            })
        }, 15))
    }(), t.Utils.stackMargin = function (i, e) {
        e = t.$.extend({cls: "uk-margin-small-top"}, e), i = t.$(i).removeClass(e.cls);
        var n = !1;
        i.each(function (i, e, o, s) {
            s = t.$(this), "none" != s.css("display") && (i = s.offset(), e = s.outerHeight(), o = i.top + e, s.data({
                ukMarginPos: o,
                ukMarginTop: i.top
            }), (n === !1 || i.top < n.top) && (n = {top: i.top, left: i.left, pos: o}))
        }).each(function (i) {
            i = t.$(this), "none" != i.css("display") && i.data("ukMarginTop") > n.top && i.data("ukMarginPos") > n.pos && i.addClass(e.cls)
        })
    }, t.Utils.matchHeights = function (i, e) {
        i = t.$(i).css("min-height", ""), e = t.$.extend({row: !0}, e);
        var n = function (i) {
            if (!(i.length < 2)) {
                var e = 0;
                i.each(function () {
                    e = Math.max(e, t.$(this).outerHeight())
                }).each(function () {
                    var i = t.$(this), n = e - ("border-box" == i.css("box-sizing") ? 0 : i.outerHeight() - i.height());
                    i.css("min-height", n + "px")
                })
            }
        };
        e.row ? (i.first().width(), setTimeout(function () {
            var e = !1, o = [];
            i.each(function () {
                var i = t.$(this), s = i.offset().top;
                s != e && o.length && (n(t.$(o)), o = [], s = i.offset().top), o.push(i), e = s
            }), o.length && n(t.$(o))
        }, 0)) : n(i)
    }, function (i) {
        t.Utils.inlineSvg = function (e, n) {
            t.$(e || 'img[src$=".svg"]', n || document).each(function () {
                var e = t.$(this), n = e.attr("src");
                if (!i[n]) {
                    var o = t.$.Deferred();
                    t.$.get(n, {nc: Math.random()}, function (i) {
                        o.resolve(t.$(i).find("svg"))
                    }), i[n] = o.promise()
                }
                i[n].then(function (i) {
                    var n = t.$(i).clone();
                    e.attr("id") && n.attr("id", e.attr("id")), e.attr("class") && n.attr("class", e.attr("class")), e.attr("style") && n.attr("style", e.attr("style")), e.attr("width") && (n.attr("width", e.attr("width")), e.attr("height") || n.removeAttr("height")), e.attr("height") && (n.attr("height", e.attr("height")), e.attr("width") || n.removeAttr("width")), e.replaceWith(n)
                })
            })
        }, t.ready(function (i) {
            t.Utils.inlineSvg("[data-uk-svg]", i)
        })
    }({}), t.Utils.getCssVar = function (t) {
        var i, e = document.documentElement, n = e.appendChild(document.createElement("div"));
        n.classList.add("var-" + t);
        try {
            i = JSON.parse(i = getComputedStyle(n, ":before").content.replace(/^["'](.*)["']$/, "$1"))
        } catch (o) {
            i = void 0
        }
        return e.removeChild(n), i
    }
}(UIkit), function (t) {
    "use strict";
    function i(i, e) {
        e = t.$.extend({
            duration: 1e3, transition: "easeOutExpo", offset: 0, complete: function () {
            }
        }, e);
        var n = i.offset().top - e.offset, o = t.$doc.height(), s = window.innerHeight;
        n + s > o && (n = o - s), t.$("html,body").stop().animate({scrollTop: n}, e.duration, e.transition).promise().done(e.complete)
    }

    t.component("smoothScroll", {
        boot: function () {
            t.$html.on("click.smooth-scroll.uikit", "[data-uk-smooth-scroll]", function (i) {
                var e = t.$(this);
                if (!e.data("smoothScroll")) {
                    t.smoothScroll(e, t.Utils.options(e.attr("data-uk-smooth-scroll")));
                    e.trigger("click")
                }
                return !1
            })
        }, init: function () {
            var e = this;
            this.on("click", function (n) {
                n.preventDefault(), i(t.$(this.hash).length ? t.$(this.hash) : t.$("body"), e.options)
            })
        }
    }), t.Utils.scrollToElement = i, t.$.easing.easeOutExpo || (t.$.easing.easeOutExpo = function (t, i, e, n, o) {
        return i == o ? e + n : n * (-Math.pow(2, -10 * i / o) + 1) + e
    })
}(UIkit), function (t) {
    "use strict";
    var i = t.$win, e = t.$doc, n = [], o = function () {
        for (var t = 0; t < n.length; t++)window.requestAnimationFrame.apply(window, [n[t].check])
    };
    t.component("scrollspy", {
        defaults: {
            target: !1,
            cls: "uk-scrollspy-inview",
            initcls: "uk-scrollspy-init-inview",
            topoffset: 0,
            leftoffset: 0,
            repeat: !1,
            delay: 0
        }, boot: function () {
            e.on("scrolling.uk.document", o), i.on("load resize orientationchange", t.Utils.debounce(o, 50)), t.ready(function (i) {
                t.$("[data-uk-scrollspy]", i).each(function () {
                    var i = t.$(this);
                    if (!i.data("scrollspy")) {
                        t.scrollspy(i, t.Utils.options(i.attr("data-uk-scrollspy")))
                    }
                })
            })
        }, init: function () {
            var i, e = this, o = this.options.cls.split(/,/), s = function () {
                var n = e.options.target ? e.element.find(e.options.target) : e.element, s = 1 === n.length ? 1 : 0, a = 0;
                n.each(function (n) {
                    var r = t.$(this), l = r.data("inviewstate"), c = t.Utils.isInView(r, e.options), d = r.data("ukScrollspyCls") || o[a].trim();
                    !c || l || r.data("scrollspy-idle") || (i || (r.addClass(e.options.initcls), e.offset = r.offset(), i = !0, r.trigger("init.uk.scrollspy")), r.data("scrollspy-idle", setTimeout(function () {
                        r.addClass("uk-scrollspy-inview").toggleClass(d).width(), r.trigger("inview.uk.scrollspy"), r.data("scrollspy-idle", !1), r.data("inviewstate", !0)
                    }, e.options.delay * s)), s++), !c && l && e.options.repeat && (r.data("scrollspy-idle") && (clearTimeout(r.data("scrollspy-idle")), r.data("scrollspy-idle", !1)), r.removeClass("uk-scrollspy-inview").toggleClass(d), r.data("inviewstate", !1), r.trigger("outview.uk.scrollspy")), a = o[a + 1] ? a + 1 : 0
                })
            };
            s(), this.check = s, n.push(this)
        }
    });
    var s = [], a = function () {
        for (var t = 0; t < s.length; t++)window.requestAnimationFrame.apply(window, [s[t].check])
    };
    t.component("scrollspynav", {
        defaults: {
            cls: "uk-active",
            closest: !1,
            topoffset: 0,
            leftoffset: 0,
            smoothscroll: !1
        }, boot: function () {
            e.on("scrolling.uk.document", a), i.on("resize orientationchange", t.Utils.debounce(a, 50)), t.ready(function (i) {
                t.$("[data-uk-scrollspy-nav]", i).each(function () {
                    var i = t.$(this);
                    if (!i.data("scrollspynav")) {
                        t.scrollspynav(i, t.Utils.options(i.attr("data-uk-scrollspy-nav")))
                    }
                })
            })
        }, init: function () {
            var e, n = [], o = this.find("a[href^='#']").each(function () {
                "#" !== this.getAttribute("href").trim() && n.push(this.getAttribute("href"))
            }), a = t.$(n.join(",")), r = this.options.cls, l = this.options.closest || this.options.closest, c = this, d = function () {
                e = [];
                for (var n = 0; n < a.length; n++)t.Utils.isInView(a.eq(n), c.options) && e.push(a.eq(n));
                if (e.length) {
                    var s, d = i.scrollTop(), u = function () {
                        for (var t = 0; t < e.length; t++)if (e[t].offset().top - c.options.topoffset >= d)return e[t]
                    }();
                    if (!u)return;
                    c.options.closest ? (o.blur().closest(l).removeClass(r), s = o.filter("a[href='#" + u.attr("id") + "']").closest(l).addClass(r)) : s = o.removeClass(r).filter("a[href='#" + u.attr("id") + "']").addClass(r), c.element.trigger("inview.uk.scrollspynav", [u, s])
                }
            };
            this.options.smoothscroll && t.smoothScroll && o.each(function () {
                t.smoothScroll(this, c.options.smoothscroll)
            }), d(), this.element.data("scrollspynav", this), this.check = d, s.push(this)
        }
    })
}(UIkit), function (t) {
    "use strict";
    var i = [];
    t.component("toggle", {
        defaults: {target: !1, cls: "uk-hidden", animation: !1, duration: 200}, boot: function () {
            t.ready(function (e) {
                t.$("[data-uk-toggle]", e).each(function () {
                    var i = t.$(this);
                    if (!i.data("toggle")) {
                        t.toggle(i, t.Utils.options(i.attr("data-uk-toggle")))
                    }
                }), setTimeout(function () {
                    i.forEach(function (t) {
                        t.getToggles()
                    })
                }, 0)
            })
        }, init: function () {
            var t = this;
            this.aria = this.options.cls.indexOf("uk-hidden") !== -1, this.on("click", function (i) {
                t.element.is('a[href="#"]') && i.preventDefault(), t.toggle()
            }), i.push(this)
        }, toggle: function () {
            if (this.getToggles(), this.totoggle.length) {
                if (this.options.animation && t.support.animation) {
                    var i = this, e = this.options.animation.split(",");
                    1 == e.length && (e[1] = e[0]), e[0] = e[0].trim(), e[1] = e[1].trim(), this.totoggle.css("animation-duration", this.options.duration + "ms"), this.totoggle.each(function () {
                        var n = t.$(this);
                        n.hasClass(i.options.cls) ? (n.toggleClass(i.options.cls), t.Utils.animate(n, e[0]).then(function () {
                            n.css("animation-duration", ""), t.Utils.checkDisplay(n)
                        })) : t.Utils.animate(this, e[1] + " uk-animation-reverse").then(function () {
                            n.toggleClass(i.options.cls).css("animation-duration", ""), t.Utils.checkDisplay(n)
                        })
                    })
                } else this.totoggle.toggleClass(this.options.cls), t.Utils.checkDisplay(this.totoggle);
                this.updateAria()
            }
        }, getToggles: function () {
            this.totoggle = this.options.target ? t.$(this.options.target) : [], this.updateAria()
        }, updateAria: function () {
            this.aria && this.totoggle.length && this.totoggle.not("[aria-hidden]").each(function () {
                t.$(this).attr("aria-hidden", t.$(this).hasClass("uk-hidden"))
            })
        }
    })
}(UIkit), function (t) {
    "use strict";
    t.component("alert", {
        defaults: {fade: !0, duration: 200, trigger: ".uk-alert-close"}, boot: function () {
            t.$html.on("click.alert.uikit", "[data-uk-alert]", function (i) {
                var e = t.$(this);
                if (!e.data("alert")) {
                    var n = t.alert(e, t.Utils.options(e.attr("data-uk-alert")));
                    t.$(i.target).is(n.options.trigger) && (i.preventDefault(), n.close())
                }
            })
        }, init: function () {
            var t = this;
            this.on("click", this.options.trigger, function (i) {
                i.preventDefault(), t.close()
            })
        }, close: function () {
            var t = this.trigger("close.uk.alert"), i = function () {
                this.trigger("closed.uk.alert").remove()
            }.bind(this);
            this.options.fade ? t.css("overflow", "hidden").css("max-height", t.height()).animate({
                height: 0,
                opacity: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
            }, this.options.duration, i) : i()
        }
    })
}(UIkit), function (t) {
    "use strict";
    t.component("buttonRadio", {
        defaults: {activeClass: "uk-active", target: ".uk-button"}, boot: function () {
            t.$html.on("click.buttonradio.uikit", "[data-uk-button-radio]", function (i) {
                var e = t.$(this);
                if (!e.data("buttonRadio")) {
                    var n = t.buttonRadio(e, t.Utils.options(e.attr("data-uk-button-radio"))), o = t.$(i.target);
                    o.is(n.options.target) && o.trigger("click")
                }
            })
        }, init: function () {
            var i = this;
            this.find(i.options.target).attr("aria-checked", "false").filter("." + i.options.activeClass).attr("aria-checked", "true"), this.on("click", this.options.target, function (e) {
                var n = t.$(this);
                n.is('a[href="#"]') && e.preventDefault(), i.find(i.options.target).not(n).removeClass(i.options.activeClass).blur(), n.addClass(i.options.activeClass), i.find(i.options.target).not(n).attr("aria-checked", "false"), n.attr("aria-checked", "true"), i.trigger("change.uk.button", [n])
            })
        }, getSelected: function () {
            return this.find("." + this.options.activeClass)
        }
    }), t.component("buttonCheckbox", {
        defaults: {activeClass: "uk-active", target: ".uk-button"}, boot: function () {
            t.$html.on("click.buttoncheckbox.uikit", "[data-uk-button-checkbox]", function (i) {
                var e = t.$(this);
                if (!e.data("buttonCheckbox")) {
                    var n = t.buttonCheckbox(e, t.Utils.options(e.attr("data-uk-button-checkbox"))), o = t.$(i.target);
                    o.is(n.options.target) && o.trigger("click")
                }
            })
        }, init: function () {
            var i = this;
            this.find(i.options.target).attr("aria-checked", "false").filter("." + i.options.activeClass).attr("aria-checked", "true"), this.on("click", this.options.target, function (e) {
                var n = t.$(this);
                n.is('a[href="#"]') && e.preventDefault(), n.toggleClass(i.options.activeClass).blur(), n.attr("aria-checked", n.hasClass(i.options.activeClass)), i.trigger("change.uk.button", [n])
            })
        }, getSelected: function () {
            return this.find("." + this.options.activeClass)
        }
    }), t.component("button", {
        defaults: {}, boot: function () {
            t.$html.on("click.button.uikit", "[data-uk-button]", function (i) {
                var e = t.$(this);
                if (!e.data("button")) {
                    t.button(e, t.Utils.options(e.attr("data-uk-button")));
                    e.trigger("click")
                }
            })
        }, init: function () {
            var t = this;
            this.element.attr("aria-pressed", this.element.hasClass("uk-active")), this.on("click", function (i) {
                t.element.is('a[href="#"]') && i.preventDefault(), t.toggle(), t.trigger("change.uk.button", [t.element.blur().hasClass("uk-active")])
            })
        }, toggle: function () {
            this.element.toggleClass("uk-active"), this.element.attr("aria-pressed", this.element.hasClass("uk-active"))
        }
    })
}(UIkit), function (t) {
    "use strict";
    function i(i, e, n, o) {
        if (i = t.$(i), e = t.$(e), n = n || window.innerWidth, o = o || i.offset(), e.length) {
            var s = e.outerWidth();
            if (i.css("min-width", s), "right" == t.langdirection) {
                var a = n - (e.offset().left + s), r = n - (i.offset().left + i.outerWidth());
                i.css("margin-right", a - r)
            } else i.css("margin-left", e.offset().left - o.left)
        }
    }

    var e, n = !1, o = {
        x: {
            "bottom-left": "bottom-right",
            "bottom-right": "bottom-left",
            "bottom-center": "bottom-center",
            "top-left": "top-right",
            "top-right": "top-left",
            "top-center": "top-center",
            "left-top": "right-top",
            "left-bottom": "right-bottom",
            "left-center": "right-center",
            "right-top": "left-top",
            "right-bottom": "left-bottom",
            "right-center": "left-center"
        },
        y: {
            "bottom-left": "top-left",
            "bottom-right": "top-right",
            "bottom-center": "top-center",
            "top-left": "bottom-left",
            "top-right": "bottom-right",
            "top-center": "bottom-center",
            "left-top": "left-bottom",
            "left-bottom": "left-top",
            "left-center": "left-center",
            "right-top": "right-bottom",
            "right-bottom": "right-top",
            "right-center": "right-center"
        },
        xy: {
            "bottom-left": "top-right",
            "bottom-right": "top-left",
            "bottom-center": "top-center",
            "top-left": "bottom-right",
            "top-right": "bottom-left",
            "top-center": "bottom-center",
            "left-top": "right-bottom",
            "left-bottom": "right-top",
            "left-center": "right-center",
            "right-top": "left-bottom",
            "right-bottom": "left-top",
            "right-center": "left-center"
        }
    };
    t.component("dropdown", {
        defaults: {
            mode: "hover",
            pos: "bottom-left",
            offset: 0,
            remaintime: 800,
            justify: !1,
            boundary: t.$win,
            delay: 0,
            dropdownSelector: ".uk-dropdown,.uk-dropdown-blank",
            hoverDelayIdle: 250,
            preventflip: !1
        }, remainIdle: !1, boot: function () {
            var i = t.support.touch ? "click" : "mouseenter";
            t.$html.on(i + ".dropdown.uikit focus pointerdown", "[data-uk-dropdown]", function (e) {
                var n = t.$(this);
                if (!n.data("dropdown")) {
                    var o = t.dropdown(n, t.Utils.options(n.attr("data-uk-dropdown")));
                    ("click" == e.type || "mouseenter" == e.type && "hover" == o.options.mode) && o.element.trigger(i), o.dropdown.length && e.preventDefault()
                }
            })
        }, init: function () {
            var i = this;
            this.dropdown = this.find(this.options.dropdownSelector), this.offsetParent = this.dropdown.parents().filter(function () {
                return t.$.inArray(t.$(this).css("position"), ["relative", "fixed", "absolute"]) !== -1
            }).slice(0, 1), this.offsetParent.length || (this.offsetParent = this.element), this.centered = this.dropdown.hasClass("uk-dropdown-center"), this.justified = !!this.options.justify && t.$(this.options.justify), this.boundary = t.$(this.options.boundary), this.boundary.length || (this.boundary = t.$win), this.dropdown.hasClass("uk-dropdown-up") && (this.options.pos = "top-left"), this.dropdown.hasClass("uk-dropdown-flip") && (this.options.pos = this.options.pos.replace("left", "right")), this.dropdown.hasClass("uk-dropdown-center") && (this.options.pos = this.options.pos.replace(/(left|right)/, "center")), this.element.attr("aria-haspopup", "true"), this.element.attr("aria-expanded", this.element.hasClass("uk-open")), this.dropdown.attr("aria-hidden", "true"), "click" == this.options.mode || t.support.touch ? this.on("click.uk.dropdown", function (e) {
                var n = t.$(e.target);
                n.parents(i.options.dropdownSelector).length || ((n.is("a[href='#']") || n.parent().is("a[href='#']") || i.dropdown.length && !i.dropdown.is(":visible")) && e.preventDefault(), n.blur()), i.element.hasClass("uk-open") ? (!i.dropdown.find(e.target).length || n.is(".uk-dropdown-close") || n.parents(".uk-dropdown-close").length) && i.hide() : i.show()
            }) : this.on("mouseenter", function (t) {
                i.trigger("pointerenter.uk.dropdown", [i]), i.remainIdle && clearTimeout(i.remainIdle), e && clearTimeout(e), n && n == i || (e = n && n != i ? setTimeout(function () {
                    e = setTimeout(i.show.bind(i), i.options.delay)
                }, i.options.hoverDelayIdle) : setTimeout(i.show.bind(i), i.options.delay))
            }).on("mouseleave", function () {
                e && clearTimeout(e), i.remainIdle = setTimeout(function () {
                    n && n == i && i.hide()
                }, i.options.remaintime), i.trigger("pointerleave.uk.dropdown", [i])
            }).on("click", function (e) {
                var o = t.$(e.target);
                return i.remainIdle && clearTimeout(i.remainIdle), n && n == i ? void((!i.dropdown.find(e.target).length || o.is(".uk-dropdown-close") || o.parents(".uk-dropdown-close").length) && i.hide()) : ((o.is("a[href='#']") || o.parent().is("a[href='#']")) && e.preventDefault(), void i.show())
            })
        }, show: function () {
            t.$html.off("click.outer.dropdown"), n && n != this && n.hide(!0), e && clearTimeout(e), this.trigger("beforeshow.uk.dropdown", [this]), this.checkDimensions(), this.element.addClass("uk-open"), this.element.attr("aria-expanded", "true"), this.dropdown.attr("aria-hidden", "false"), this.trigger("show.uk.dropdown", [this]), t.Utils.checkDisplay(this.dropdown, !0), t.Utils.focus(this.dropdown), n = this, this.registerOuterClick()
        }, hide: function (t) {
            this.trigger("beforehide.uk.dropdown", [this, t]), this.element.removeClass("uk-open"), this.remainIdle && clearTimeout(this.remainIdle), this.remainIdle = !1, this.element.attr("aria-expanded", "false"), this.dropdown.attr("aria-hidden", "true"), this.trigger("hide.uk.dropdown", [this, t]), n == this && (n = !1)
        }, registerOuterClick: function () {
            var i = this;
            t.$html.off("click.outer.dropdown"), setTimeout(function () {
                t.$html.on("click.outer.dropdown", function (o) {
                    e && clearTimeout(e);
                    t.$(o.target);
                    n != i || i.element.find(o.target).length || (i.hide(!0), t.$html.off("click.outer.dropdown"))
                })
            }, 10)
        }, checkDimensions: function () {
            if (this.dropdown.length) {
                this.dropdown.removeClass("uk-dropdown-top uk-dropdown-bottom uk-dropdown-left uk-dropdown-right uk-dropdown-stack uk-dropdown-autoflip").css({
                    topLeft: "",
                    left: "",
                    marginLeft: "",
                    marginRight: ""
                }), this.justified && this.justified.length && this.dropdown.css("min-width", "");
                var e, n = t.$.extend({}, this.offsetParent.offset(), {
                    width: this.offsetParent[0].offsetWidth,
                    height: this.offsetParent[0].offsetHeight
                }), s = this.options.offset, a = this.dropdown, r = (a.show().offset() || {
                    left: 0,
                    top: 0
                }, a.outerWidth()), l = a.outerHeight(), c = this.boundary.width(), d = (this.boundary[0] !== window && this.boundary.offset() ? this.boundary.offset() : {
                    top: 0,
                    left: 0
                }, this.options.pos), u = {
                    "bottom-left": {top: 0 + n.height + s, left: 0},
                    "bottom-right": {top: 0 + n.height + s, left: 0 + n.width - r},
                    "bottom-center": {top: 0 + n.height + s, left: 0 + n.width / 2 - r / 2},
                    "top-left": {top: 0 - l - s, left: 0},
                    "top-right": {top: 0 - l - s, left: 0 + n.width - r},
                    "top-center": {top: 0 - l - s, left: 0 + n.width / 2 - r / 2},
                    "left-top": {top: 0, left: 0 - r - s},
                    "left-bottom": {top: 0 + n.height - l, left: 0 - r - s},
                    "left-center": {top: 0 + n.height / 2 - l / 2, left: 0 - r - s},
                    "right-top": {top: 0, left: 0 + n.width + s},
                    "right-bottom": {top: 0 + n.height - l, left: 0 + n.width + s},
                    "right-center": {top: 0 + n.height / 2 - l / 2, left: 0 + n.width + s}
                }, h = {};
                if (e = d.split("-"), h = u[d] ? u[d] : u["bottom-left"], this.justified && this.justified.length)i(a.css({left: 0}), this.justified, c); else if (this.options.preventflip !== !0) {
                    var p;
                    switch (this.checkBoundary(n.left + h.left, n.top + h.top, r, l, c)) {
                        case"x":
                            "x" !== this.options.preventflip && (p = o.x[d] || "right-top");
                            break;
                        case"y":
                            "y" !== this.options.preventflip && (p = o.y[d] || "top-left");
                            break;
                        case"xy":
                            this.options.preventflip || (p = o.xy[d] || "right-bottom")
                    }
                    p && (e = p.split("-"), h = u[p] ? u[p] : u["bottom-left"], a.addClass("uk-dropdown-autoflip"), this.checkBoundary(n.left + h.left, n.top + h.top, r, l, c) && (e = d.split("-"), h = u[d] ? u[d] : u["bottom-left"]))
                }
                r > c && (a.addClass("uk-dropdown-stack"), this.trigger("stack.uk.dropdown", [this])), a.css(h).css("display", "").addClass("uk-dropdown-" + e[0])
            }
        }, checkBoundary: function (i, e, n, o, s) {
            var a = "";
            return (i < 0 || i - t.$win.scrollLeft() + n > s) && (a += "x"), (e - t.$win.scrollTop() < 0 || e - t.$win.scrollTop() + o > window.innerHeight) && (a += "y"), a
        }
    }), t.component("dropdownOverlay", {
        defaults: {justify: !1, cls: "", duration: 200}, boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-dropdown-overlay]", i).each(function () {
                    var i = t.$(this);
                    i.data("dropdownOverlay") || t.dropdownOverlay(i, t.Utils.options(i.attr("data-uk-dropdown-overlay")))
                })
            })
        }, init: function () {
            var e = this;
            this.justified = !!this.options.justify && t.$(this.options.justify), this.overlay = this.element.find("uk-dropdown-overlay"), this.overlay.length || (this.overlay = t.$('<div class="uk-dropdown-overlay"></div>').appendTo(this.element)), this.overlay.addClass(this.options.cls), this.on({
                "beforeshow.uk.dropdown": function (t, n) {
                    e.dropdown = n, e.justified && e.justified.length && i(e.overlay.css({
                        display: "block",
                        marginLeft: "",
                        marginRight: ""
                    }), e.justified, e.justified.outerWidth())
                }, "show.uk.dropdown": function (i, n) {
                    var o = e.dropdown.dropdown.outerHeight(!0);
                    e.dropdown.element.removeClass("uk-open"), e.overlay.stop().css("display", "block").animate({height: o}, e.options.duration, function () {
                        e.dropdown.dropdown.css("visibility", ""), e.dropdown.element.addClass("uk-open"), t.Utils.checkDisplay(e.dropdown.dropdown, !0)
                    }), e.pointerleave = !1
                }, "hide.uk.dropdown": function () {
                    e.overlay.stop().animate({height: 0}, e.options.duration)
                }, "pointerenter.uk.dropdown": function (t, i) {
                    clearTimeout(e.remainIdle)
                }, "pointerleave.uk.dropdown": function (t, i) {
                    e.pointerleave = !0
                }
            }), this.overlay.on({
                mouseenter: function () {
                    e.remainIdle && (clearTimeout(e.dropdown.remainIdle), clearTimeout(e.remainIdle))
                }, mouseleave: function () {
                    e.pointerleave && n && (e.remainIdle = setTimeout(function () {
                        n && n.hide()
                    }, n.options.remaintime))
                }
            })
        }
    })
}(UIkit), function (t) {
    "use strict";
    var i = [];
    t.component("gridMatchHeight", {
        defaults: {target: !1, row: !0, ignorestacked: !1, observe: !1}, boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-grid-match]", i).each(function () {
                    var i, e = t.$(this);
                    e.data("gridMatchHeight") || (i = t.gridMatchHeight(e, t.Utils.options(e.attr("data-uk-grid-match"))))
                })
            })
        }, init: function () {
            var e = this;
            this.columns = this.element.children(), this.elements = this.options.target ? this.find(this.options.target) : this.columns, this.columns.length && (t.$win.on("load resize orientationchange", function () {
                var i = function () {
                    e.element.is(":visible") && e.match()
                };
                return t.$(function () {
                    i()
                }), t.Utils.debounce(i, 50)
            }()), this.options.observe && t.domObserve(this.element, function (t) {
                e.element.is(":visible") && e.match()
            }), this.on("display.uk.check", function (t) {
                this.element.is(":visible") && this.match()
            }.bind(this)), i.push(this))
        }, match: function () {
            var i = this.columns.filter(":visible:first");
            if (i.length) {
                var e = Math.ceil(100 * parseFloat(i.css("width")) / parseFloat(i.parent().css("width"))) >= 100;
                return e && !this.options.ignorestacked ? this.revert() : t.Utils.matchHeights(this.elements, this.options), this
            }
        }, revert: function () {
            return this.elements.css("min-height", ""), this
        }
    }), t.component("gridMargin", {
        defaults: {cls: "uk-grid-margin", rowfirst: "uk-row-first"}, boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-grid-margin]", i).each(function () {
                    var i, e = t.$(this);
                    e.data("gridMargin") || (i = t.gridMargin(e, t.Utils.options(e.attr("data-uk-grid-margin"))))
                })
            })
        }, init: function () {
            t.stackMargin(this.element, this.options)
        }
    })
}(UIkit), function (t) {
    "use strict";
    function i(i, e) {
        if (e)return "object" == typeof i ? (i = i instanceof jQuery ? i : t.$(i), i.parent().length && (e.persist = i, e.persist.data("modalPersistParent", i.parent()))) : i = "string" == typeof i || "number" == typeof i ? t.$("<div></div>").html(i) : t.$("<div></div>").html("UIkit.modal Error: Unsupported data type: " + typeof i), i.appendTo(e.element.find(".uk-modal-dialog")), e
    }

    var e, n = !1, o = 0, s = t.$html;
    t.$win.on("resize orientationchange", t.Utils.debounce(function () {
        t.$(".uk-modal.uk-open").each(function () {
            return t.$(this).data("modal") && t.$(this).data("modal").resize()
        })
    }, 150)), t.component("modal", {
        defaults: {keyboard: !0, bgclose: !0, minScrollHeight: 150, center: !1, modal: !0},
        scrollable: !1,
        transition: !1,
        hasTransitioned: !0,
        init: function () {
            if (e || (e = t.$("body")), this.element.length) {
                var i = this;
                this.paddingdir = "padding-" + ("left" == t.langdirection ? "right" : "left"), this.dialog = this.find(".uk-modal-dialog"), this.active = !1, this.element.attr("aria-hidden", this.element.hasClass("uk-open")), this.on("click", ".uk-modal-close", function (t) {
                    t.preventDefault(), i.hide()
                }).on("click", function (e) {
                    var n = t.$(e.target);
                    n[0] == i.element[0] && i.options.bgclose && i.hide()
                }), t.domObserve(this.element, function (t) {
                    i.resize()
                })
            }
        },
        toggle: function () {
            return this[this.isActive() ? "hide" : "show"]()
        },
        show: function () {
            if (this.element.length) {
                var i = this;
                if (!this.isActive())return this.options.modal && n && n.hide(!0), this.element.removeClass("uk-open").show(), this.resize(!0), this.options.modal && (n = this), this.active = !0, o++, t.support.transition ? (this.hasTransitioned = !1, this.element.one(t.support.transition.end, function () {
                    i.hasTransitioned = !0, t.Utils.focus(i.dialog, "a[href]")
                }).addClass("uk-open")) : (this.element.addClass("uk-open"), t.Utils.focus(this.dialog, "a[href]")), s.addClass("uk-modal-page").height(), this.element.attr("aria-hidden", "false"), this.element.trigger("show.uk.modal"), t.Utils.checkDisplay(this.dialog, !0), this
            }
        },
        hide: function (i) {
            if (!i && t.support.transition && this.hasTransitioned) {
                var e = this;
                this.one(t.support.transition.end, function () {
                    e._hide()
                }).removeClass("uk-open")
            } else this._hide();
            return this
        },
        resize: function (t) {
            if (this.isActive() || t) {
                var i = e.width();
                if (this.scrollbarwidth = window.innerWidth - i, e.css(this.paddingdir, this.scrollbarwidth), this.element.css("overflow-y", this.scrollbarwidth ? "scroll" : "auto"), !this.updateScrollable() && this.options.center) {
                    var n = this.dialog.outerHeight(), o = parseInt(this.dialog.css("margin-top"), 10) + parseInt(this.dialog.css("margin-bottom"), 10);
                    n + o < window.innerHeight ? this.dialog.css({top: window.innerHeight / 2 - n / 2 - o}) : this.dialog.css({top: ""})
                }
            }
        },
        updateScrollable: function () {
            var t = this.dialog.find(".uk-overflow-container:visible:first");
            if (t.length) {
                t.css("height", 0);
                var i = Math.abs(parseInt(this.dialog.css("margin-top"), 10)), e = this.dialog.outerHeight(), n = window.innerHeight, o = n - 2 * (i < 20 ? 20 : i) - e;
                return t.css({maxHeight: o < this.options.minScrollHeight ? "" : o, height: ""}), !0
            }
            return !1
        },
        _hide: function () {
            this.active = !1, o > 0 ? o-- : o = 0, this.element.hide().removeClass("uk-open"), this.element.attr("aria-hidden", "true"), o || (s.removeClass("uk-modal-page"), e.css(this.paddingdir, "")), n === this && (n = !1), this.trigger("hide.uk.modal")
        },
        isActive: function () {
            return this.element.hasClass("uk-open")
        }
    }), t.component("modalTrigger", {
        boot: function () {
            t.$html.on("click.modal.uikit", "[data-uk-modal]", function (i) {
                var e = t.$(this);
                if (e.is("a") && i.preventDefault(), !e.data("modalTrigger")) {
                    var n = t.modalTrigger(e, t.Utils.options(e.attr("data-uk-modal")));
                    n.show()
                }
            }), t.$html.on("keydown.modal.uikit", function (t) {
                n && 27 === t.keyCode && n.options.keyboard && (t.preventDefault(), n.hide())
            })
        }, init: function () {
            var i = this;
            this.options = t.$.extend({target: !!i.element.is("a") && i.element.attr("href")}, this.options), this.modal = t.modal(this.options.target, this.options), this.on("click", function (t) {
                t.preventDefault(), i.show()
            }), this.proxy(this.modal, "show hide isActive")
        }
    }), t.modal.dialog = function (e, n) {
        var o = t.modal(t.$(t.modal.dialog.template).appendTo("body"), n);
        return o.on("hide.uk.modal", function () {
            o.persist && (o.persist.appendTo(o.persist.data("modalPersistParent")), o.persist = !1), o.element.remove()
        }), i(e, o), o
    }, t.modal.dialog.template = '<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>', t.modal.alert = function (i, e) {
        e = t.$.extend(!0, {bgclose: !1, keyboard: !1, modal: !1, labels: t.modal.labels}, e);
        var n = t.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(i) + "</div>", '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">' + e.labels.Ok + "</button></div>"].join(""), e);
        return n.on("show.uk.modal", function () {
            setTimeout(function () {
                n.element.find("button:first").focus()
            }, 50)
        }), n.show()
    }, t.modal.confirm = function (i, e, n) {
        var o = arguments.length > 1 && arguments[arguments.length - 1] ? arguments[arguments.length - 1] : {};
        e = t.$.isFunction(e) ? e : function () {
        }, n = t.$.isFunction(n) ? n : function () {
        }, o = t.$.extend(!0, {
            bgclose: !1,
            keyboard: !1,
            modal: !1,
            labels: t.modal.labels
        }, t.$.isFunction(o) ? {} : o);
        var s = t.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(i) + "</div>", '<div class="uk-modal-footer uk-text-right"><button class="uk-button js-modal-confirm-cancel">' + o.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-confirm">' + o.labels.Ok + "</button></div>"].join(""), o);
        return s.element.find(".js-modal-confirm, .js-modal-confirm-cancel").on("click", function () {
            t.$(this).is(".js-modal-confirm") ? e() : n(), s.hide()
        }), s.on("show.uk.modal", function () {
            setTimeout(function () {
                s.element.find(".js-modal-confirm").focus()
            }, 50)
        }), s.show()
    }, t.modal.prompt = function (i, e, n, o) {
        n = t.$.isFunction(n) ? n : function (t) {
        }, o = t.$.extend(!0, {bgclose: !1, keyboard: !1, modal: !1, labels: t.modal.labels}, o);
        var s = t.modal.dialog([i ? '<div class="uk-modal-content uk-form">' + String(i) + "</div>" : "", '<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>', '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-modal-close">' + o.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-ok">' + o.labels.Ok + "</button></div>"].join(""), o), a = s.element.find("input[type='text']").val(e || "").on("keyup", function (t) {
            13 == t.keyCode && s.element.find(".js-modal-ok").trigger("click")
        });
        return s.element.find(".js-modal-ok").on("click", function () {
            n(a.val()) !== !1 && s.hide()
        }), s.show()
    }, t.modal.blockUI = function (i, e) {
        var n = t.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(i || '<div class="uk-text-center">...</div>') + "</div>"].join(""), t.$.extend({
            bgclose: !1,
            keyboard: !1,
            modal: !1
        }, e));
        return n.content = n.element.find(".uk-modal-content:first"), n.show()
    }, t.modal.labels = {Ok: "Ok", Cancel: "Cancel"}
}(UIkit), function (t) {
    "use strict";
    function i(i) {
        var e = t.$(i), n = "auto";
        if (e.is(":visible"))n = e.outerHeight(); else {
            var o = {position: e.css("position"), visibility: e.css("visibility"), display: e.css("display")};
            n = e.css({position: "absolute", visibility: "hidden", display: "block"}).outerHeight(), e.css(o)
        }
        return n
    }

    t.component("nav", {
        defaults: {toggle: '>li.uk-parent > a[href="#"]', lists: ">li.uk-parent > ul", multiple: !1},
        boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-nav]", i).each(function () {
                    var i = t.$(this);
                    if (!i.data("nav")) {
                        t.nav(i, t.Utils.options(i.attr("data-uk-nav")))
                    }
                })
            })
        },
        init: function () {
            var i = this;
            this.on("click.uk.nav", this.options.toggle, function (e) {
                e.preventDefault();
                var n = t.$(this);
                i.open(n.parent()[0] == i.element[0] ? n : n.parent("li"))
            }), this.update(), t.domObserve(this.element, function (t) {
                i.element.find(i.options.lists).not("[role]").length && i.update()
            })
        },
        update: function () {
            var i = this;
            this.find(this.options.lists).each(function () {
                var e = t.$(this).attr("role", "menu"), n = e.closest("li"), o = n.hasClass("uk-active");
                n.data("list-container") || (e.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'), n.data("list-container", e.parent()[o ? "removeClass" : "addClass"]("uk-hidden"))), n.attr("aria-expanded", n.hasClass("uk-open")), o && i.open(n, !0)
            })
        },
        open: function (e, n) {
            var o = this, s = this.element, a = t.$(e), r = a.data("list-container");
            this.options.multiple || s.children(".uk-open").not(e).each(function () {
                var i = t.$(this);
                i.data("list-container") && i.data("list-container").stop().animate({height: 0}, function () {
                    t.$(this).parent().removeClass("uk-open").end().addClass("uk-hidden")
                })
            }), a.toggleClass("uk-open"), a.attr("aria-expanded", a.hasClass("uk-open")), r && (a.hasClass("uk-open") && r.removeClass("uk-hidden"), n ? (r.stop().height(a.hasClass("uk-open") ? "auto" : 0), a.hasClass("uk-open") || r.addClass("uk-hidden"), this.trigger("display.uk.check")) : r.stop().animate({height: a.hasClass("uk-open") ? i(r.find("ul:first")) : 0}, function () {
                a.hasClass("uk-open") ? r.css("height", "") : r.addClass("uk-hidden"), o.trigger("display.uk.check")
            }))
        }
    })
}(UIkit), function (t) {
    "use strict";
    var i = {x: window.scrollX, y: window.scrollY}, e = (t.$win, t.$doc, t.$html), n = {
        show: function (n, o) {
            if (n = t.$(n), n.length) {
                o = t.$.extend({mode: "push"}, o);
                var s = t.$("body"), a = n.find(".uk-offcanvas-bar:first"), r = "right" == t.langdirection, l = a.hasClass("uk-offcanvas-bar-flip") ? -1 : 1, c = l * (r ? -1 : 1), d = window.innerWidth - s.width();
                i = {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                }, a.attr("mode", o.mode), n.addClass("uk-active"), s.css({
                    width: window.innerWidth - d,
                    height: window.innerHeight
                }).addClass("uk-offcanvas-page"), "push" != o.mode && "reveal" != o.mode || s.css(r ? "margin-right" : "margin-left", (r ? -1 : 1) * (a.outerWidth() * c)), "reveal" == o.mode && a.css("clip", "rect(0, " + a.outerWidth() + "px, 100vh, 0)"), e.css("margin-top", i.y * -1).width(), a.addClass("uk-offcanvas-bar-show"), this._initElement(n), a.trigger("show.uk.offcanvas", [n, a]), n.attr("aria-hidden", "false")
            }
        }, hide: function (n) {
            var o = t.$("body"), s = t.$(".uk-offcanvas.uk-active"), a = "right" == t.langdirection, r = s.find(".uk-offcanvas-bar:first"), l = function () {
                o.removeClass("uk-offcanvas-page").css({
                    width: "",
                    height: "",
                    marginLeft: "",
                    marginRight: ""
                }), s.removeClass("uk-active"), r.removeClass("uk-offcanvas-bar-show"), e.css("margin-top", ""), window.scrollTo(i.x, i.y), r.trigger("hide.uk.offcanvas", [s, r]), s.attr("aria-hidden", "true")
            };
            s.length && ("none" == r.attr("mode") && (n = !0), t.support.transition && !n ? (o.one(t.support.transition.end, function () {
                l()
            }).css(a ? "margin-right" : "margin-left", ""), "reveal" == r.attr("mode") && r.css("clip", ""), setTimeout(function () {
                r.removeClass("uk-offcanvas-bar-show")
            }, 0)) : l())
        }, _initElement: function (i) {
            i.data("OffcanvasInit") || (i.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas", function (i) {
                var e = t.$(i.target);
                if (!i.type.match(/swipe/) && !e.hasClass("uk-offcanvas-close")) {
                    if (e.hasClass("uk-offcanvas-bar"))return;
                    if (e.parents(".uk-offcanvas-bar:first").length)return
                }
                i.stopImmediatePropagation(), n.hide()
            }), i.on("click", 'a[href*="#"]', function (i) {
                var e = t.$(this), o = e.attr("href");
                "#" != o && (t.$doc.one("hide.uk.offcanvas", function () {
                    var i;
                    try {
                        i = t.$(e[0].hash)
                    } catch (n) {
                        i = ""
                    }
                    i.length || (i = t.$('[name="' + e[0].hash.replace("#", "") + '"]')), i.length && t.Utils.scrollToElement ? t.Utils.scrollToElement(i, t.Utils.options(e.attr("data-uk-smooth-scroll") || "{}")) : window.location.href = o
                }), n.hide())
            }), i.data("OffcanvasInit", !0))
        }
    };
    t.component("offcanvasTrigger", {
        boot: function () {
            e.on("click.offcanvas.uikit", "[data-uk-offcanvas]", function (i) {
                i.preventDefault();
                var e = t.$(this);
                if (!e.data("offcanvasTrigger")) {
                    t.offcanvasTrigger(e, t.Utils.options(e.attr("data-uk-offcanvas")));
                    e.trigger("click")
                }
            }), e.on("keydown.uk.offcanvas", function (t) {
                27 === t.keyCode && n.hide()
            })
        }, init: function () {
            var i = this;
            this.options = t.$.extend({
                target: !!i.element.is("a") && i.element.attr("href"),
                mode: "push"
            }, this.options), this.on("click", function (t) {
                t.preventDefault(), n.show(i.options.target, i.options)
            })
        }
    }), t.offcanvas = n
}(UIkit), function (t) {
    "use strict";
    function i(i, e, n) {
        var o, s = t.$.Deferred(), a = i, r = i;
        return n[0] === e[0] ? (s.resolve(), s.promise()) : ("object" == typeof i && (a = i[0], r = i[1] || i[0]), t.$body.css("overflow-x", "hidden"), o = function () {
            e && e.hide().removeClass("uk-active " + r + " uk-animation-reverse"), n.addClass(a).one(t.support.animation.end, function () {
                setTimeout(function () {
                    n.removeClass("" + a).css({opacity: "", display: ""})
                }, 0), s.resolve(), t.$body.css("overflow-x", ""), e && e.css({opacity: "", display: ""})
            }.bind(this)).show()
        }, n.css("animation-duration", this.options.duration + "ms"), e && e.length ? (e.css("animation-duration", this.options.duration + "ms"), e.css("display", "none").addClass(r + " uk-animation-reverse").one(t.support.animation.end, function () {
            o()
        }.bind(this)).css("display", "")) : (n.addClass("uk-active"), o()), s.promise())
    }

    var e;
    t.component("switcher", {
        defaults: {
            connect: !1,
            toggle: ">*",
            active: 0,
            animation: !1,
            duration: 200,
            swiping: !0
        }, animating: !1, boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-switcher]", i).each(function () {
                    var i = t.$(this);
                    if (!i.data("switcher")) {
                        t.switcher(i, t.Utils.options(i.attr("data-uk-switcher")))
                    }
                })
            })
        }, init: function () {
            var i = this;
            this.on("click.uk.switcher", this.options.toggle, function (t) {
                t.preventDefault(), i.show(this)
            }), this.options.connect && (this.connect = t.$(this.options.connect), this.connect.length && (this.connect.on("click.uk.switcher", "[data-uk-switcher-item]", function (e) {
                e.preventDefault();
                var n = t.$(this).attr("data-uk-switcher-item");
                if (i.index != n)switch (n) {
                    case"next":
                    case"previous":
                        i.show(i.index + ("next" == n ? 1 : -1));
                        break;
                    default:
                        i.show(parseInt(n, 10))
                }
            }), this.options.swiping && this.connect.on("swipeRight swipeLeft", function (t) {
                t.preventDefault(), window.getSelection().toString() || i.show(i.index + ("swipeLeft" == t.type ? 1 : -1))
            }), this.update()))
        }, update: function () {
            this.connect.children().removeClass("uk-active").attr("aria-hidden", "true");
            var t = this.find(this.options.toggle), i = t.filter(".uk-active");
            if (i.length)this.show(i, !1); else {
                if (this.options.active === !1)return;
                i = t.eq(this.options.active), this.show(i.length ? i : t.eq(0), !1)
            }
            t.not(i).attr("aria-expanded", "false"), i.attr("aria-expanded", "true")
        }, show: function (n, o) {
            if (!this.animating) {
                var s = this.find(this.options.toggle);
                isNaN(n) ? n = t.$(n) : (n = n < 0 ? s.length - 1 : n, n = s.eq(s[n] ? n : 0));
                var a = this, r = t.$(n), l = e[this.options.animation] || function (t, n) {
                        if (!a.options.animation)return e.none.apply(a);
                        var o = a.options.animation.split(",");
                        return 1 == o.length && (o[1] = o[0]), o[0] = o[0].trim(), o[1] = o[1].trim(), i.apply(a, [o, t, n])
                    };
                o !== !1 && t.support.animation || (l = e.none), r.hasClass("uk-disabled") || (s.attr("aria-expanded", "false"), r.attr("aria-expanded", "true"), s.filter(".uk-active").removeClass("uk-active"), r.addClass("uk-active"), this.options.connect && this.connect.length && (this.index = this.find(this.options.toggle).index(r), this.index == -1 && (this.index = 0), this.connect.each(function () {
                    var i = t.$(this), e = t.$(i.children()), n = t.$(e.filter(".uk-active")), o = t.$(e.eq(a.index));
                    a.animating = !0, l.apply(a, [n, o]).then(function () {
                        n.removeClass("uk-active"), o.addClass("uk-active"), n.attr("aria-hidden", "true"), o.attr("aria-hidden", "false"), t.Utils.checkDisplay(o, !0), a.animating = !1
                    })
                })), this.trigger("show.uk.switcher", [r]))
            }
        }
    }), e = {
        none: function () {
            var i = t.$.Deferred();
            return i.resolve(), i.promise()
        }, fade: function (t, e) {
            return i.apply(this, ["uk-animation-fade", t, e])
        }, "slide-bottom": function (t, e) {
            return i.apply(this, ["uk-animation-slide-bottom", t, e])
        }, "slide-top": function (t, e) {
            return i.apply(this, ["uk-animation-slide-top", t, e])
        }, "slide-vertical": function (t, e, n) {
            var o = ["uk-animation-slide-top", "uk-animation-slide-bottom"];
            return t && t.index() > e.index() && o.reverse(), i.apply(this, [o, t, e])
        }, "slide-left": function (t, e) {
            return i.apply(this, ["uk-animation-slide-left", t, e])
        }, "slide-right": function (t, e) {
            return i.apply(this, ["uk-animation-slide-right", t, e])
        }, "slide-horizontal": function (t, e, n) {
            var o = ["uk-animation-slide-right", "uk-animation-slide-left"];
            return t && t.index() > e.index() && o.reverse(), i.apply(this, [o, t, e])
        }, scale: function (t, e) {
            return i.apply(this, ["uk-animation-scale-up", t, e])
        }
    }, t.switcher.animations = e
}(UIkit), function (t) {
    "use strict";
    t.component("tab", {
        defaults: {
            target: ">li:not(.uk-tab-responsive, .uk-disabled)",
            connect: !1,
            active: 0,
            animation: !1,
            duration: 200,
            swiping: !0
        }, boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-tab]", i).each(function () {
                    var i = t.$(this);
                    if (!i.data("tab")) {
                        t.tab(i, t.Utils.options(i.attr("data-uk-tab")))
                    }
                })
            })
        }, init: function () {
            var i = this;
            this.current = !1, this.on("click.uk.tab", this.options.target, function (e) {
                if (e.preventDefault(), !i.switcher || !i.switcher.animating) {
                    var n = i.find(i.options.target).not(this);
                    n.removeClass("uk-active").blur(), i.trigger("change.uk.tab", [t.$(this).addClass("uk-active"), i.current]), i.current = t.$(this), i.options.connect || (n.attr("aria-expanded", "false"), t.$(this).attr("aria-expanded", "true"))
                }
            }), this.options.connect && (this.connect = t.$(this.options.connect)), this.responsivetab = t.$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>'), this.responsivetab.dropdown = this.responsivetab.find(".uk-dropdown"), this.responsivetab.lst = this.responsivetab.dropdown.find("ul"), this.responsivetab.caption = this.responsivetab.find("a:first"), this.element.hasClass("uk-tab-bottom") && this.responsivetab.dropdown.addClass("uk-dropdown-up"), this.responsivetab.lst.on("click.uk.tab", "a", function (e) {
                e.preventDefault(), e.stopPropagation();
                var n = t.$(this);
                i.element.children("li:not(.uk-tab-responsive)").eq(n.data("index")).trigger("click")
            }), this.on("show.uk.switcher change.uk.tab", function (t, e) {
                i.responsivetab.caption.html(e.text())
            }), this.element.append(this.responsivetab), this.options.connect && (this.switcher = t.switcher(this.element, {
                toggle: ">li:not(.uk-tab-responsive)",
                connect: this.options.connect,
                active: this.options.active,
                animation: this.options.animation,
                duration: this.options.duration,
                swiping: this.options.swiping
            })), t.dropdown(this.responsivetab, {
                mode: "click",
                preventflip: "y"
            }), i.trigger("change.uk.tab", [this.element.find(this.options.target).not(".uk-tab-responsive").filter(".uk-active")]), this.check(), t.$win.on("resize orientationchange", t.Utils.debounce(function () {
                i.element.is(":visible") && i.check()
            }, 100)), this.on("display.uk.check", function () {
                i.element.is(":visible") && i.check()
            })
        }, check: function () {
            var i = this.element.children("li:not(.uk-tab-responsive)").removeClass("uk-hidden");
            if (!i.length)return void this.responsivetab.addClass("uk-hidden");
            var e, n, o, s = i.eq(0).offset().top + Math.ceil(i.eq(0).height() / 2), a = !1;
            if (this.responsivetab.lst.empty(), i.each(function () {
                    t.$(this).offset().top > s && (a = !0)
                }), a)for (var r = 0; r < i.length; r++)e = t.$(i.eq(r)), n = e.find("a"), "none" == e.css("float") || e.attr("uk-dropdown") || (e.hasClass("uk-disabled") || (o = t.$(e[0].outerHTML), o.find("a").data("index", r), this.responsivetab.lst.append(o)), e.addClass("uk-hidden"));
            this.responsivetab[this.responsivetab.lst.children("li").length ? "removeClass" : "addClass"]("uk-hidden")
        }
    })
}(UIkit), function (t) {
    "use strict";
    t.component("cover", {
        defaults: {automute: !0}, boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-cover]", i).each(function () {
                    var i = t.$(this);
                    if (!i.data("cover")) {
                        t.cover(i, t.Utils.options(i.attr("data-uk-cover")))
                    }
                })
            })
        }, init: function () {
            if (this.parent = this.element.parent(), t.$win.on("load resize orientationchange", t.Utils.debounce(function () {
                    this.check()
                }.bind(this), 100)), this.on("display.uk.check", function (t) {
                    this.element.is(":visible") && this.check()
                }.bind(this)), this.check(), this.element.is("iframe") && this.options.automute) {
                var i = this.element.attr("src");
                this.element.attr("src", "").on("load", function () {
                    this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', "*")
                }).attr("src", [i, i.indexOf("?") > -1 ? "&" : "?", "enablejsapi=1&api=1"].join(""))
            }
        }, check: function () {
            this.element.css({width: "", height: ""}), this.dimension = {
                w: this.element.width(),
                h: this.element.height()
            }, this.element.attr("width") && !isNaN(this.element.attr("width")) && (this.dimension.w = this.element.attr("width")), this.element.attr("height") && !isNaN(this.element.attr("height")) && (this.dimension.h = this.element.attr("height")), this.ratio = this.dimension.w / this.dimension.h;
            var t, i, e = this.parent.width(), n = this.parent.height();
            e / this.ratio < n ? (t = Math.ceil(n * this.ratio), i = n) : (t = e, i = Math.ceil(e / this.ratio)), this.element.css({
                width: t,
                height: i
            })
        }
    })
}(UIkit);
!function (t) {
    var e;
    window.UIkit && (e = t(UIkit)), "function" == typeof define && define.amd && define("uikit-autocomplete", ["uikit"], function () {
        return e || t(UIkit)
    })
}(function (t) {
    "use strict";
    var e;
    return t.component("autocomplete", {
        defaults: {
            minLength: 3,
            param: "search",
            method: "post",
            delay: 300,
            loadingClass: "uk-loading",
            flipDropdown: !1,
            skipClass: "uk-skip",
            hoverClass: "uk-active",
            source: null,
            renderer: null,
            template: '<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">{{~items}}<li data-value="{{$item.value}}"><a>{{$item.value}}</a></li>{{/items}}</ul>'
        }, visible: !1, value: null, selected: null, boot: function () {
            t.$html.on("focus.autocomplete.uikit", "[data-uk-autocomplete]", function (e) {
                var i = t.$(this);
                i.data("autocomplete") || t.autocomplete(i, t.Utils.options(i.attr("data-uk-autocomplete")))
            }), t.$html.on("click.autocomplete.uikit", function (t) {
                e && t.target != e.input[0] && e.hide()
            })
        }, init: function () {
            var e = this, i = !1, s = t.Utils.debounce(function (t) {
                return i ? i = !1 : void e.handle()
            }, this.options.delay);
            this.dropdown = this.find(".uk-dropdown"), this.template = this.find('script[type="text/autocomplete"]').html(), this.template = t.Utils.template(this.template || this.options.template), this.input = this.find("input:first").attr("autocomplete", "off"), this.dropdown.length || (this.dropdown = t.$('<div class="uk-dropdown"></div>').appendTo(this.element)), this.options.flipDropdown && this.dropdown.addClass("uk-dropdown-flip"), this.dropdown.attr("aria-expanded", "false"), this.input.on({
                keydown: function (t) {
                    if (t && t.which && !t.shiftKey && e.visible)switch (t.which) {
                        case 13:
                            i = !0, e.selected && (t.preventDefault(), e.select());
                            break;
                        case 38:
                            t.preventDefault(), e.pick("prev", !0);
                            break;
                        case 40:
                            t.preventDefault(), e.pick("next", !0);
                            break;
                        case 27:
                        case 9:
                            e.hide()
                    }
                }, keyup: s
            }), this.dropdown.on("click", ".uk-autocomplete-results > *", function () {
                e.select()
            }), this.dropdown.on("mouseover", ".uk-autocomplete-results > *", function () {
                e.pick(t.$(this))
            }), this.triggercomplete = s
        }, handle: function () {
            var t = this, e = this.value;
            return this.value = this.input.val(), this.value.length < this.options.minLength ? this.hide() : (this.value != e && t.request(), this)
        }, pick: function (e, i) {
            var s = this, o = t.$(this.dropdown.find(".uk-autocomplete-results").children(":not(." + this.options.skipClass + ")")), n = !1;
            if ("string" == typeof e || e.hasClass(this.options.skipClass)) {
                if ("next" == e || "prev" == e) {
                    if (this.selected) {
                        var a = o.index(this.selected);
                        n = "next" == e ? o.eq(a + 1 < o.length ? a + 1 : 0) : o.eq(a - 1 < 0 ? o.length - 1 : a - 1)
                    } else n = o["next" == e ? "first" : "last"]();
                    n = t.$(n)
                }
            } else n = e;
            if (n && n.length && (this.selected = n, o.removeClass(this.options.hoverClass), this.selected.addClass(this.options.hoverClass), i)) {
                var l = n.position().top, h = s.dropdown.scrollTop(), r = s.dropdown.height();
                (l > r || l < 0) && s.dropdown.scrollTop(h + l)
            }
        }, select: function () {
            if (this.selected) {
                var t = this.selected.data();
                this.trigger("selectitem.uk.autocomplete", [t, this]), t.value && this.input.val(t.value).trigger("change"), this.hide()
            }
        }, show: function () {
            if (!this.visible)return this.visible = !0, this.element.addClass("uk-open"), e && e !== this && e.hide(), e = this, this.dropdown.attr("aria-expanded", "true"), this
        }, hide: function () {
            if (this.visible)return this.visible = !1, this.element.removeClass("uk-open"), e === this && (e = !1), this.dropdown.attr("aria-expanded", "false"), this
        }, request: function () {
            var e = this, i = function (t) {
                t && e.render(t), e.element.removeClass(e.options.loadingClass)
            };
            if (this.element.addClass(this.options.loadingClass), this.options.source) {
                var s = this.options.source;
                switch (typeof this.options.source) {
                    case"function":
                        this.options.source.apply(this, [i]);
                        break;
                    case"object":
                        if (s.length) {
                            var o = [];
                            s.forEach(function (t) {
                                t.value && t.value.toLowerCase().indexOf(e.value.toLowerCase()) != -1 && o.push(t)
                            }), i(o)
                        }
                        break;
                    case"string":
                        var n = {};
                        n[this.options.param] = this.value, t.$.ajax({
                            url: this.options.source,
                            data: n,
                            type: this.options.method,
                            dataType: "json"
                        }).done(function (t) {
                            i(t || [])
                        });
                        break;
                    default:
                        i(null)
                }
            } else this.element.removeClass(e.options.loadingClass)
        }, render: function (t) {
            return this.dropdown.empty(), this.selected = !1, this.options.renderer ? this.options.renderer.apply(this, [t]) : t && t.length && (this.dropdown.append(this.template({items: t})), this.show(), this.trigger("show.uk.autocomplete")), this
        }
    }), t.autocomplete
});
!function (e) {
    var s;
    window.UIkit && (s = e(UIkit)), "function" == typeof define && define.amd && define("uikit-search", ["uikit"], function () {
        return s || e(UIkit)
    })
}(function (e) {
    "use strict";
    e.component("search", {
        defaults: {
            msgResultsHeader: "Search Results",
            msgMoreResults: "More Results",
            msgNoResults: "No results found",
            template: '<ul class="uk-nav uk-nav-search uk-autocomplete-results">                                      {{#msgResultsHeader}}<li class="uk-nav-header uk-skip">{{msgResultsHeader}}</li>{{/msgResultsHeader}}                                      {{#items && items.length}}                                          {{~items}}                                          <li data-url="{{!$item.url}}">                                              <a href="{{!$item.url}}">                                                  {{{$item.title}}}                                                  {{#$item.text}}<div>{{{$item.text}}}</div>{{/$item.text}}                                              </a>                                          </li>                                          {{/items}}                                          {{#msgMoreResults}}                                              <li class="uk-nav-divider uk-skip"></li>                                              <li class="uk-search-moreresults" data-moreresults="true"><a href="#" onclick="jQuery(this).closest(\'form\').submit();">{{msgMoreResults}}</a></li>                                          {{/msgMoreResults}}                                      {{/end}}                                      {{^items.length}}                                        {{#msgNoResults}}<li class="uk-skip"><a>{{msgNoResults}}</a></li>{{/msgNoResults}}                                      {{/end}}                                  </ul>',
            renderer: function (e) {
                var s = this.options;
                this.dropdown.append(this.template({
                    items: e.results || [],
                    msgResultsHeader: s.msgResultsHeader,
                    msgMoreResults: s.msgMoreResults,
                    msgNoResults: s.msgNoResults
                })), this.show()
            }
        }, boot: function () {
            e.$html.on("focus.search.uikit", "[data-uk-search]", function (s) {
                var t = e.$(this);
                t.data("search") || e.search(t, e.Utils.options(t.attr("data-uk-search")))
            })
        }, init: function () {
            var s = this;
            this.autocomplete = e.autocomplete(this.element, this.options), this.autocomplete.dropdown.addClass("uk-dropdown-search"), this.autocomplete.input.on("keyup", function () {
                s.element[s.autocomplete.input.val() ? "addClass" : "removeClass"]("uk-active")
            }).closest("form").on("reset", function () {
                s.value = "", s.element.removeClass("uk-active")
            }), this.on("selectitem.uk.autocomplete", function (e, t) {
                t.url ? location.href = t.url : t.moreresults && s.autocomplete.input.closest("form").submit()
            }), this.element.data("search", this)
        }
    })
});
!function (t) {
    var i;
    window.UIkit && (i = t(UIkit)), "function" == typeof define && define.amd && define("uikit-tooltip", ["uikit"], function () {
        return i || t(UIkit)
    })
}(function (t) {
    "use strict";
    var i, o, e;
    return t.component("tooltip", {
        defaults: {
            offset: 5,
            pos: "top",
            animation: !1,
            delay: 0,
            cls: "",
            activeClass: "uk-active",
            src: function (t) {
                var i = t.attr("title");
                return void 0 !== i && t.data("cached-title", i).removeAttr("title"), t.data("cached-title")
            }
        }, tip: "", boot: function () {
            t.$html.on("mouseenter.tooltip.uikit focus.tooltip.uikit", "[data-uk-tooltip]", function (i) {
                var o = t.$(this);
                o.data("tooltip") || (t.tooltip(o, t.Utils.options(o.attr("data-uk-tooltip"))), o.trigger("mouseenter"))
            })
        }, init: function () {
            var o = this;
            i || (i = t.$('<div class="uk-tooltip"></div>').appendTo("body")), this.on({
                focus: function (t) {
                    o.show()
                }, blur: function (t) {
                    o.hide()
                }, mouseenter: function (t) {
                    o.show()
                }, mouseleave: function (t) {
                    o.hide()
                }
            })
        }, show: function () {
            if (this.tip = "function" == typeof this.options.src ? this.options.src(this.element) : this.options.src, o && clearTimeout(o), e && clearInterval(e), "string" == typeof this.tip && this.tip.length) {
                i.stop().css({
                    top: -2e3,
                    visibility: "hidden"
                }).removeClass(this.options.activeClass).show(), i.html('<div class="uk-tooltip-inner">' + this.tip + "</div>");
                var s = this, n = t.$.extend({}, this.element.offset(), {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }), l = i[0].offsetWidth, f = i[0].offsetHeight, a = "function" == typeof this.options.offset ? this.options.offset.call(this.element) : this.options.offset, p = "function" == typeof this.options.pos ? this.options.pos.call(this.element) : this.options.pos, h = p.split("-"), c = {
                    display: "none",
                    visibility: "visible",
                    top: n.top + n.height + f,
                    left: n.left
                };
                if ("fixed" == t.$html.css("position") || "fixed" == t.$body.css("position")) {
                    var r = t.$("body").offset(), d = t.$("html").offset(), u = {
                        top: d.top + r.top,
                        left: d.left + r.left
                    };
                    n.left -= u.left, n.top -= u.top
                }
                "left" != h[0] && "right" != h[0] || "right" != t.langdirection || (h[0] = "left" == h[0] ? "right" : "left");
                var m = {
                    bottom: {top: n.top + n.height + a, left: n.left + n.width / 2 - l / 2},
                    top: {top: n.top - f - a, left: n.left + n.width / 2 - l / 2},
                    left: {top: n.top + n.height / 2 - f / 2, left: n.left - l - a},
                    right: {top: n.top + n.height / 2 - f / 2, left: n.left + n.width + a}
                };
                t.$.extend(c, m[h[0]]), 2 == h.length && (c.left = "left" == h[1] ? n.left : n.left + n.width - l);
                var v = this.checkBoundary(c.left, c.top, l, f);
                if (v) {
                    switch (v) {
                        case"x":
                            p = 2 == h.length ? h[0] + "-" + (c.left < 0 ? "left" : "right") : c.left < 0 ? "right" : "left";
                            break;
                        case"y":
                            p = 2 == h.length ? (c.top < 0 ? "bottom" : "top") + "-" + h[1] : c.top < 0 ? "bottom" : "top";
                            break;
                        case"xy":
                            p = 2 == h.length ? (c.top < 0 ? "bottom" : "top") + "-" + (c.left < 0 ? "left" : "right") : c.left < 0 ? "right" : "left"
                    }
                    h = p.split("-"), t.$.extend(c, m[h[0]]), 2 == h.length && (c.left = "left" == h[1] ? n.left : n.left + n.width - l)
                }
                c.left -= t.$body.position().left, o = setTimeout(function () {
                    i.css(c).attr("class", ["uk-tooltip", "uk-tooltip-" + p, s.options.cls].join(" ")), s.options.animation ? i.css({
                        opacity: 0,
                        display: "block"
                    }).addClass(s.options.activeClass).animate({opacity: 1}, parseInt(s.options.animation, 10) || 400) : i.show().addClass(s.options.activeClass), o = !1, e = setInterval(function () {
                        s.element.is(":visible") || s.hide()
                    }, 150)
                }, parseInt(this.options.delay, 10) || 0)
            }
        }, hide: function () {
            if (!this.element.is("input") || this.element[0] !== document.activeElement)if (o && clearTimeout(o), e && clearInterval(e), i.stop(), this.options.animation) {
                var t = this;
                i.fadeOut(parseInt(this.options.animation, 10) || 400, function () {
                    i.removeClass(t.options.activeClass)
                })
            } else i.hide().removeClass(this.options.activeClass)
        }, content: function () {
            return this.tip
        }, checkBoundary: function (i, o, e, s) {
            var n = "";
            return (i < 0 || i - t.$win.scrollLeft() + e > window.innerWidth) && (n += "x"), (o < 0 || o - t.$win.scrollTop() + s > window.innerHeight) && (n += "y"), n
        }
    }), t.tooltip
});
!function (i) {
    var t;
    window.UIkit && (t = i(UIkit)), "function" == typeof define && define.amd && define("uikit-slideshow", ["uikit"], function () {
        return t || i(UIkit)
    })
}(function (i) {
    "use strict";
    var t, s = 0;
    i.component("slideshow", {
        defaults: {
            animation: "fade",
            duration: 500,
            height: "auto",
            start: 0,
            autoplay: !1,
            autoplayInterval: 7e3,
            videoautoplay: !0,
            videomute: !0,
            slices: 15,
            pauseOnHover: !0,
            kenburns: !1,
            kenburnsanimations: ["uk-animation-middle-left", "uk-animation-top-right", "uk-animation-bottom-left", "uk-animation-top-center", "", "uk-animation-bottom-right"]
        }, current: !1, interval: null, hovering: !1, boot: function () {
            i.ready(function (t) {
                i.$("[data-uk-slideshow]", t).each(function () {
                    var t = i.$(this);
                    t.data("slideshow") || i.slideshow(t, i.Utils.options(t.attr("data-uk-slideshow")))
                })
            })
        }, init: function () {
            var t = this;
            this.container = this.element.hasClass("uk-slideshow") ? this.element : i.$(this.find(".uk-slideshow:first")), this.current = this.options.start, this.animating = !1, this.fixFullscreen = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && this.container.hasClass("uk-slideshow-fullscreen"), this.options.kenburns && (this.kbanimduration = this.options.kenburns === !0 ? "15s" : this.options.kenburns, String(this.kbanimduration).match(/(ms|s)$/) || (this.kbanimduration += "ms"), "string" == typeof this.options.kenburnsanimations && (this.options.kenburnsanimations = this.options.kenburnsanimations.split(","))), this.update(), this.on("click.uk.slideshow", "[data-uk-slideshow-item]", function (s) {
                s.preventDefault();
                var e = i.$(this).attr("data-uk-slideshow-item");
                if (t.current != e) {
                    switch (e) {
                        case"next":
                        case"previous":
                            t["next" == e ? "next" : "previous"]();
                            break;
                        default:
                            t.show(parseInt(e, 10))
                    }
                    t.stop()
                }
            }), i.$win.on("resize load", i.Utils.debounce(function () {
                t.resize(), t.fixFullscreen && (t.container.css("height", window.innerHeight), t.slides.css("height", window.innerHeight))
            }, 100)), setTimeout(function () {
                t.resize()
            }, 80), this.options.autoplay && this.start(), this.options.videoautoplay && this.slides.eq(this.current).data("media") && this.playmedia(this.slides.eq(this.current).data("media")), this.options.kenburns && this.applyKenBurns(this.slides.eq(this.current)), this.container.on({
                mouseenter: function () {
                    t.options.pauseOnHover && (t.hovering = !0)
                }, mouseleave: function () {
                    t.hovering = !1
                }
            }), this.on("swipeRight swipeLeft", function (i) {
                t["swipeLeft" == i.type ? "next" : "previous"]()
            }), this.on("display.uk.check", function () {
                t.element.is(":visible") && (t.resize(), t.fixFullscreen && (t.container.css("height", window.innerHeight), t.slides.css("height", window.innerHeight)))
            }), i.domObserve(this.element, function (i) {
                t.container.children(":not([data-slideshow-slide])").not(".uk-slideshow-ghost").length && t.update(!0)
            })
        }, update: function (t) {
            var e, a = this, n = 0;
            this.slides = this.container.children(), this.slidesCount = this.slides.length, this.slides.eq(this.current).length || (this.current = 0), this.slides.each(function (t) {
                var o = i.$(this);
                if (!o.data("processed")) {
                    var r = o.children("img,video,iframe").eq(0), d = "html";
                    if (o.data("media", r), o.data("sizer", r), r.length) {
                        var u;
                        switch (d = r[0].nodeName.toLowerCase(), r[0].nodeName) {
                            case"IMG":
                                var h = i.$('<div class="uk-cover-background uk-position-cover"></div>').css({"background-image": "url(" + r.attr("src") + ")"});
                                r.attr("width") && r.attr("height") && (u = i.$("<canvas></canvas>").attr({
                                    width: r.attr("width"),
                                    height: r.attr("height")
                                }), r.replaceWith(u), r = u, u = void 0), r.css({
                                    width: "100%",
                                    height: "auto",
                                    opacity: 0
                                }), o.prepend(h).data("cover", h);
                                break;
                            case"IFRAME":
                                var c = r[0].src, l = "sw-" + ++s;
                                r.attr("src", "").on("load", function () {
                                    if ((t !== a.current || t == a.current && !a.options.videoautoplay) && a.pausemedia(r), a.options.videomute) {
                                        a.mutemedia(r);
                                        var i = setInterval(function (t) {
                                            return function () {
                                                a.mutemedia(r), ++t >= 4 && clearInterval(i)
                                            }
                                        }(0), 250)
                                    }
                                }).data("slideshow", a).attr("data-player-id", l).attr("src", [c, c.indexOf("?") > -1 ? "&" : "?", "enablejsapi=1&api=1&player_id=" + l].join("")).addClass("uk-position-absolute"), i.support.touch || r.css("pointer-events", "none"), u = !0, i.cover && (i.cover(r), r.attr("data-uk-cover", "{}"));
                                break;
                            case"VIDEO":
                                r.addClass("uk-cover-object uk-position-absolute"), u = !0, a.options.videomute && a.mutemedia(r)
                        }
                        if (u) {
                            e = i.$("<canvas></canvas>").attr({width: r[0].width, height: r[0].height});
                            var p = i.$('<img style="width:100%;height:auto;">').attr("src", e[0].toDataURL());
                            o.prepend(p), o.data("sizer", p)
                        }
                    } else o.data("sizer", o);
                    a.hasKenBurns(o) && o.data("cover").css({
                        "-webkit-animation-duration": a.kbanimduration,
                        "animation-duration": a.kbanimduration
                    }), o.data("processed", ++n), o.attr("data-slideshow-slide", d)
                }
            }), n && (this.triggers = this.find("[data-uk-slideshow-item]"), this.slides.attr("aria-hidden", "true").removeClass("uk-active").eq(this.current).addClass("uk-active").attr("aria-hidden", "false"), this.triggers.filter('[data-uk-slideshow-item="' + this.current + '"]').addClass("uk-active")), t && n && this.resize()
        }, resize: function () {
            if (!this.container.hasClass("uk-slideshow-fullscreen")) {
                var t = this.options.height;
                "auto" === this.options.height && (t = 0, this.slides.css("height", "").each(function () {
                    t = Math.max(t, i.$(this).height())
                })), this.container.css("height", t), this.slides.css("height", t)
            }
        }, show: function (s, e) {
            if (!this.animating && this.current != s) {
                this.animating = !0;
                var a = this, n = this.slides.eq(this.current), o = this.slides.eq(s), r = e ? e : this.current < s ? 1 : -1, d = n.data("media"), u = t[this.options.animation] ? this.options.animation : "fade", h = o.data("media"), c = function () {
                    a.animating && (d && d.is("video,iframe") && a.pausemedia(d), h && h.is("video,iframe") && a.playmedia(h), o.addClass("uk-active").attr("aria-hidden", "false"), n.removeClass("uk-active").attr("aria-hidden", "true"), a.animating = !1, a.current = s, i.Utils.checkDisplay(o, '[class*="uk-animation-"]:not(.uk-cover-background.uk-position-cover)'), a.trigger("show.uk.slideshow", [o, n, a]))
                };
                a.applyKenBurns(o), i.support.animation || (u = "none"), n = i.$(n), o = i.$(o), a.trigger("beforeshow.uk.slideshow", [o, n, a]), t[u].apply(this, [n, o, r]).then(c), a.triggers.removeClass("uk-active"), a.triggers.filter('[data-uk-slideshow-item="' + s + '"]').addClass("uk-active")
            }
        }, applyKenBurns: function (i) {
            if (this.hasKenBurns(i)) {
                var t = this.options.kenburnsanimations, s = this.kbindex || 0;
                i.data("cover").attr("class", "uk-cover-background uk-position-cover").width(), i.data("cover").addClass(["uk-animation-scale", "uk-animation-reverse", t[s].trim()].join(" ")), this.kbindex = t[s + 1] ? s + 1 : 0
            }
        }, hasKenBurns: function (i) {
            return this.options.kenburns && i.data("cover")
        }, next: function () {
            this.show(this.slides[this.current + 1] ? this.current + 1 : 0, 1)
        }, previous: function () {
            this.show(this.slides[this.current - 1] ? this.current - 1 : this.slides.length - 1, -1)
        }, start: function () {
            this.stop();
            var i = this;
            this.interval = setInterval(function () {
                i.hovering || i.next()
            }, this.options.autoplayInterval)
        }, stop: function () {
            this.interval && clearInterval(this.interval)
        }, playmedia: function (i) {
            if (i && i[0])switch (i[0].nodeName) {
                case"VIDEO":
                    this.options.videomute || (i[0].muted = !1), i[0].play();
                    break;
                case"IFRAME":
                    this.options.videomute || i[0].contentWindow.postMessage('{ "event": "command", "func": "unmute", "method":"setVolume", "value":1}', "*"), i[0].contentWindow.postMessage('{ "event": "command", "func": "playVideo", "method":"play"}', "*")
            }
        }, pausemedia: function (i) {
            switch (i[0].nodeName) {
                case"VIDEO":
                    i[0].pause();
                    break;
                case"IFRAME":
                    i[0].contentWindow.postMessage('{ "event": "command", "func": "pauseVideo", "method":"pause"}', "*")
            }
        }, mutemedia: function (i) {
            switch (i[0].nodeName) {
                case"VIDEO":
                    i[0].muted = !0;
                    break;
                case"IFRAME":
                    i[0].contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', "*")
            }
        }
    }), t = {
        none: function () {
            var t = i.$.Deferred();
            return t.resolve(), t.promise()
        }, scroll: function (t, s, e) {
            var a = i.$.Deferred();
            return t.css("animation-duration", this.options.duration + "ms"), s.css("animation-duration", this.options.duration + "ms"), s.css("opacity", 1).one(i.support.animation.end, function () {
                t.css("opacity", 0).removeClass(e == -1 ? "uk-slideshow-scroll-backward-out" : "uk-slideshow-scroll-forward-out"), s.removeClass(e == -1 ? "uk-slideshow-scroll-backward-in" : "uk-slideshow-scroll-forward-in"), a.resolve()
            }.bind(this)), t.addClass(e == -1 ? "uk-slideshow-scroll-backward-out" : "uk-slideshow-scroll-forward-out"), s.addClass(e == -1 ? "uk-slideshow-scroll-backward-in" : "uk-slideshow-scroll-forward-in"), s.width(), a.promise()
        }, swipe: function (t, s, e) {
            var a = i.$.Deferred();
            return t.css("animation-duration", this.options.duration + "ms"), s.css("animation-duration", this.options.duration + "ms"), s.css("opacity", 1).one(i.support.animation.end, function () {
                t.css("opacity", 0).removeClass(e === -1 ? "uk-slideshow-swipe-backward-out" : "uk-slideshow-swipe-forward-out"), s.removeClass(e === -1 ? "uk-slideshow-swipe-backward-in" : "uk-slideshow-swipe-forward-in"), a.resolve()
            }.bind(this)), t.addClass(e == -1 ? "uk-slideshow-swipe-backward-out" : "uk-slideshow-swipe-forward-out"), s.addClass(e == -1 ? "uk-slideshow-swipe-backward-in" : "uk-slideshow-swipe-forward-in"), s.width(), a.promise()
        }, scale: function (t, s, e) {
            var a = i.$.Deferred();
            return t.css("animation-duration", this.options.duration + "ms"), s.css("animation-duration", this.options.duration + "ms"), s.css("opacity", 1), t.one(i.support.animation.end, function () {
                t.css("opacity", 0).removeClass("uk-slideshow-scale-out"), a.resolve()
            }.bind(this)), t.addClass("uk-slideshow-scale-out"), t.width(), a.promise()
        }, fade: function (t, s, e) {
            var a = i.$.Deferred();
            return t.css("animation-duration", this.options.duration + "ms"), s.css("animation-duration", this.options.duration + "ms"), s.css("opacity", 1), s.data("cover") || s.data("placeholder") || s.css("opacity", 1).one(i.support.animation.end, function () {
                s.removeClass("uk-slideshow-fade-in")
            }).addClass("uk-slideshow-fade-in"), t.one(i.support.animation.end, function () {
                t.css("opacity", 0).removeClass("uk-slideshow-fade-out"), a.resolve()
            }.bind(this)), t.addClass("uk-slideshow-fade-out"), t.width(), a.promise()
        }
    }, i.slideshow.animations = t, window.addEventListener("message", function (t) {
        var s, e = t.data;
        if ("string" == typeof e)try {
            e = JSON.parse(e)
        } catch (a) {
            e = {}
        }
        t.origin && t.origin.indexOf("vimeo") > -1 && "ready" == e.event && e.player_id && (s = i.$('[data-player-id="' + e.player_id + '"]'), s.length && s.data("slideshow").mutemedia(s))
    }, !1)
});
!function (t) {
    var i;
    window.UIkit && (i = t(UIkit)), "function" == typeof define && define.amd && define("uikit-sticky", ["uikit"], function () {
        return i || t(UIkit)
    })
}(function (t) {
    "use strict";
    function i(i) {
        var o = arguments.length ? arguments : n;
        if (o.length && !(e.scrollTop() < 0))for (var a, r, h, p, c = e.scrollTop(), l = s.height(), m = e.height(), d = l - m, u = c > d ? d - c : 0, f = 0; f < o.length; f++)if (p = o[f], p.element.is(":visible") && !p.animate) {
            if (p.check()) {
                if (p.top < 0 ? a = 0 : (h = p.element.outerHeight(), a = l - h - p.top - p.options.bottom - c - u, a = a < 0 ? a + p.top : p.top), p.boundary && p.boundary.length) {
                    var g = p.boundary.offset().top;
                    r = p.boundtoparent ? l - (g + p.boundary.outerHeight()) + parseInt(p.boundary.css("padding-bottom")) : l - g, a = c + h > l - r - (p.top < 0 ? 0 : p.top) ? l - r - (c + h) : a
                }
                if (p.currentTop != a) {
                    if (p.element.css({
                            position: "fixed",
                            top: a,
                            width: p.getWidthFrom.length ? p.getWidthFrom.width() : p.element.width()
                        }), !p.init && (p.element.addClass(p.options.clsinit), location.hash && c > 0 && p.options.target)) {
                        var w = t.$(location.hash);
                        w.length && setTimeout(function (t, i) {
                            return function () {
                                i.element.width();
                                var e = t.offset(), s = e.top + t.outerHeight(), n = i.element.offset(), o = i.element.outerHeight(), a = n.top + o;
                                n.top < s && e.top < a && (c = e.top - o - i.options.target, window.scrollTo(0, c))
                            }
                        }(w, p), 0)
                    }
                    p.element.addClass(p.options.clsactive).removeClass(p.options.clsinactive), p.element.trigger("active.uk.sticky"), p.element.css("margin", ""), p.options.animation && p.init && !t.Utils.isInView(p.wrapper) && p.element.addClass(p.options.animation), p.currentTop = a
                }
            } else null !== p.currentTop && p.reset();
            p.init = !0
        }
    }

    var e = t.$win, s = t.$doc, n = [], o = 1;
    return t.component("sticky", {
        defaults: {
            top: 0,
            bottom: 0,
            animation: "",
            clsinit: "uk-sticky-init",
            clsactive: "uk-active",
            clsinactive: "",
            getWidthFrom: "",
            showup: !1,
            boundary: !1,
            media: !1,
            target: !1,
            disabled: !1
        }, boot: function () {
            t.$doc.on("scrolling.uk.document", function (t, e) {
                e && e.dir && (o = e.dir.y, i())
            }), t.$win.on("resize orientationchange", t.Utils.debounce(function () {
                if (n.length) {
                    for (var t = 0; t < n.length; t++)n[t].reset(!0), n[t].self.computeWrapper();
                    i()
                }
            }, 100)), t.ready(function (e) {
                setTimeout(function () {
                    t.$("[data-uk-sticky]", e).each(function () {
                        var i = t.$(this);
                        i.data("sticky") || t.sticky(i, t.Utils.options(i.attr("data-uk-sticky")))
                    }), i()
                }, 0)
            })
        }, init: function () {
            var i, a = this.options.boundary;
            this.wrapper = this.element.wrap('<div class="uk-sticky-placeholder"></div>').parent(), this.computeWrapper(), this.wrapper.css({
                "margin-top": this.element.css("margin-top"),
                "margin-bottom": this.element.css("margin-bottom"),
                "margin-left": this.element.css("margin-left"),
                "margin-right": this.element.css("margin-right")
            }), this.element.css("margin", 0), a && (a === !0 || "!" === a[0] ? (a = a === !0 ? this.wrapper.parent() : this.wrapper.closest(a.substr(1)), i = !0) : "string" == typeof a && (a = t.$(a))), this.sticky = {
                self: this,
                options: this.options,
                element: this.element,
                currentTop: null,
                wrapper: this.wrapper,
                init: !1,
                getWidthFrom: t.$(this.options.getWidthFrom || this.wrapper),
                boundary: a,
                boundtoparent: i,
                top: 0,
                calcTop: function () {
                    var i = this.options.top;
                    if (this.options.top && "string" == typeof this.options.top)if (this.options.top.match(/^(-|)(\d+)vh$/))i = window.innerHeight * parseInt(this.options.top, 10) / 100; else {
                        var e = t.$(this.options.top).first();
                        e.length && e.is(":visible") && (i = -1 * (e.offset().top + e.outerHeight() - this.wrapper.offset().top))
                    }
                    this.top = i
                },
                reset: function (i) {
                    this.calcTop();
                    var e = function () {
                        this.element.css({
                            position: "",
                            top: "",
                            width: "",
                            left: "",
                            margin: "0"
                        }), this.element.removeClass([this.options.animation, "uk-animation-reverse", this.options.clsactive].join(" ")), this.element.addClass(this.options.clsinactive), this.element.trigger("inactive.uk.sticky"), this.currentTop = null, this.animate = !1
                    }.bind(this);
                    !i && this.options.animation && t.support.animation && !t.Utils.isInView(this.wrapper) ? (this.animate = !0, this.element.removeClass(this.options.animation).one(t.support.animation.end, function () {
                        e()
                    }).width(), this.element.addClass(this.options.animation + " uk-animation-reverse")) : e()
                },
                check: function () {
                    if (this.options.disabled)return !1;
                    if (this.options.media)switch (typeof this.options.media) {
                        case"number":
                            if (window.innerWidth < this.options.media)return !1;
                            break;
                        case"string":
                            if (window.matchMedia && !window.matchMedia(this.options.media).matches)return !1
                    }
                    var i = e.scrollTop(), n = s.height(), a = n - window.innerHeight, r = i > a ? a - i : 0, h = this.wrapper.offset().top, p = h - this.top - r, c = i >= p;
                    return c && this.options.showup && (1 == o && (c = !1), o == -1 && !this.element.hasClass(this.options.clsactive) && t.Utils.isInView(this.wrapper) && (c = !1)), c
                }
            }, this.sticky.calcTop(), n.push(this.sticky)
        }, update: function () {
            i(this.sticky)
        }, enable: function () {
            this.options.disabled = !1, this.update()
        }, disable: function (t) {
            this.options.disabled = !0, this.sticky.reset(t)
        }, computeWrapper: function () {
            this.wrapper.css({
                height: ["absolute", "fixed"].indexOf(this.element.css("position")) == -1 ? this.element.outerHeight() : "",
                "float": "none" != this.element.css("float") ? this.element.css("float") : ""
            }), "fixed" == this.element.css("position") && this.element.css({width: this.sticky.getWidthFrom.length ? this.sticky.getWidthFrom.width() : this.element.width()})
        }
    }), t.sticky
});
!function (t) {
    var i;
    window.UIkit && (i = t(UIkit)), "function" == typeof define && define.amd && define("uikit-slideset", ["uikit"], function () {
        return i || t(UIkit)
    })
}(function (t) {
    "use strict";
    function i(i, e, n, s) {
        var a, o, r, l, h = t.$.Deferred(), u = this.options.delay === !1 ? Math.floor(this.options.duration / 2) : this.options.delay, d = this;
        if (s = s || 1, this.element.css("min-height", this.element.height()), n[0] === e[0])return h.resolve(), h.promise();
        if ("object" == typeof i ? (a = i[0], o = i[1] || i[0]) : (a = i, o = a), t.$body.css("overflow-x", "hidden"), r = function () {
                if (e && e.length && e.hide().removeClass(o + " uk-animation-reverse").css({
                        opacity: "",
                        "animation-delay": "",
                        animation: ""
                    }), !n.length)return void h.resolve();
                for (l = 0; l < n.length; l++)n.eq(1 == s ? l : n.length - l - 1).css("animation-delay", l * u + "ms");
                var i = function () {
                    n.removeClass("" + a).css({
                        opacity: "",
                        display: "",
                        "animation-delay": "",
                        animation: ""
                    }), h.resolve(), t.$body.css("overflow-x", ""), d.element.css("min-height", ""), i = !1
                };
                n.addClass(a)[1 == s ? "last" : "first"]().one(t.support.animation.end, function () {
                    i && i()
                }).end().css("display", ""), setTimeout(function () {
                    i && i()
                }, n.length * u * 2)
            }, n.length && n.css("animation-duration", this.options.duration + "ms"), e && e.length)for (e.css("animation-duration", this.options.duration + "ms")[1 == s ? "last" : "first"]().one(t.support.animation.end, function () {
            r()
        }), l = 0; l < e.length; l++)!function (i, e) {
            setTimeout(function () {
                e.css("display", "none").css("display", "").css("opacity", 0).on(t.support.animation.end, function () {
                    e.removeClass(o)
                }).addClass(o + " uk-animation-reverse")
            }.bind(this), l * u)
        }(l, e.eq(1 == s ? l : e.length - l - 1)); else r();
        return h.promise()
    }

    function e(t, i) {
        var e, n = 0, s = -1, a = t.length || 0, o = [];
        if (i < 1)return null;
        for (; n < a;)e = n % i, e ? o[s][e] = t[n] : o[++s] = [t[n]], n++;
        for (n = 0, a = o.length; n < a;)o[n] = jQuery(o[n]), n++;
        return o
    }

    var n;
    t.component("slideset", {
        defaults: {
            "default": 1,
            animation: "fade",
            duration: 200,
            filter: "",
            delay: !1,
            controls: !1,
            autoplay: !1,
            autoplayInterval: 7e3,
            pauseOnHover: !0
        }, sets: [], boot: function () {
            t.ready(function (i) {
                t.$("[data-uk-slideset]", i).each(function () {
                    var i = t.$(this);
                    i.data("slideset") || t.slideset(i, t.Utils.options(i.attr("data-uk-slideset")))
                })
            })
        }, init: function () {
            var i = this;
            this.activeSet = !1, this.list = this.element.find(".uk-slideset"), this.nav = this.element.find(".uk-slideset-nav"), this.controls = this.options.controls ? t.$(this.options.controls) : this.element, t.$win.on("resize load", t.Utils.debounce(function () {
                i.update()
            }, 100)), i.list.addClass("uk-grid-width-1-" + i.options["default"]), ["xlarge", "large", "medium", "small"].forEach(function (t) {
                i.options[t] && i.list.addClass("uk-grid-width-" + t + "-1-" + i.options[t])
            }), this.on("click.uk.slideset", "[data-uk-slideset-item]", function (e) {
                if (e.preventDefault(), !i.animating) {
                    var n = t.$(this).attr("data-uk-slideset-item");
                    if (i.activeSet !== n)switch (n) {
                        case"next":
                        case"previous":
                            i["next" == n ? "next" : "previous"]();
                            break;
                        default:
                            i.show(parseInt(n, 10))
                    }
                }
            }), this.controls.on("click.uk.slideset", "[data-uk-filter]", function (e) {
                var n = t.$(this);
                n.parent().hasClass("uk-slideset") || (e.preventDefault(), i.animating || i.currentFilter == n.attr("data-uk-filter") || (i.updateFilter(n.attr("data-uk-filter")), i._hide().then(function () {
                    i.update(!0, !0)
                })))
            }), this.on("swipeRight swipeLeft", function (t) {
                i["swipeLeft" == t.type ? "next" : "previous"]()
            }), this.updateFilter(this.options.filter), this.update(), this.element.on({
                mouseenter: function () {
                    i.options.pauseOnHover && (i.hovering = !0)
                }, mouseleave: function () {
                    i.hovering = !1
                }
            }), this.options.autoplay && this.start(), t.domObserve(this.list, function (t) {
                i.list.children(":visible:not(.uk-active)").length && i.update(!1, !0)
            })
        }, update: function (t, i) {
            var n, s = this.visible;
            if (this.visible = this.getVisibleOnCurrenBreakpoint(), s != this.visible || i) {
                for (this.children = this.list.children().hide(), this.items = this.getItems(), this.sets = e(this.items, this.visible), n = 0; n < this.sets.length; n++)this.sets[n].css({display: "none"});
                if (this.nav.length && this.nav.empty()) {
                    for (n = 0; n < this.sets.length; n++)this.nav.append('<li data-uk-slideset-item="' + n + '"><a></a></li>');
                    this.nav[1 == this.nav.children().length ? "addClass" : "removeClass"]("uk-invisible")
                }
                this.activeSet = !1, this.show(0, !t)
            }
        }, updateFilter: function (i) {
            var e, n = this;
            this.currentFilter = i, this.controls.find("[data-uk-filter]").each(function () {
                e = t.$(this), e.parent().hasClass("uk-slideset") || (e.attr("data-uk-filter") == n.currentFilter ? e.addClass("uk-active") : e.removeClass("uk-active"))
            })
        }, getVisibleOnCurrenBreakpoint: function () {
            var i = null, e = t.$('<div style="position:absolute;height:1px;top:-1000px;width:100px"><div></div></div>').appendTo("body"), n = e.children().eq(0), s = this.options;
            return ["xlarge", "large", "medium", "small"].forEach(function (t) {
                s[t] && !i && (e.attr("class", "uk-grid-width-" + t + "-1-2").width(), 50 == n.width() && (i = t))
            }), e.remove(), this.options[i] || this.options["default"]
        }, getItems: function () {
            var i, e = [];
            return this.currentFilter ? (i = this.currentFilter || [], "string" == typeof i && (i = i.split(/,/).map(function (t) {
                return t.trim()
            })), this.children.each(function (n) {
                var s = t.$(this), a = s.attr("data-uk-filter"), o = !i.length;
                a && (a = a.split(/,/).map(function (t) {
                    return t.trim()
                }), i.forEach(function (t) {
                    a.indexOf(t) > -1 && (o = !0)
                })), o && e.push(s[0])
            }), e = t.$(e)) : e = this.list.children(), e
        }, show: function (i, e, s) {
            var a = this;
            if (this.activeSet !== i && !this.animating) {
                s = s || (i < this.activeSet ? -1 : 1);
                var o = this.sets[this.activeSet] || [], r = this.sets[i], l = this._getAnimation();
                !e && t.support.animation || (l = n.none), this.animating = !0, this.nav.length && this.nav.children().removeClass("uk-active").eq(i).addClass("uk-active"), l.apply(a, [o, r, s]).then(function () {
                    t.Utils.checkDisplay(r, !0), a.children.hide().removeClass("uk-active"), r.addClass("uk-active").css({
                        display: "",
                        opacity: ""
                    }), a.animating = !1, a.activeSet = i, t.Utils.checkDisplay(r, !0), a.trigger("show.uk.slideset", [r])
                })
            }
        }, _getAnimation: function () {
            var i = n[this.options.animation] || n.none;
            return t.support.animation || (i = n.none), i
        }, _hide: function () {
            var t = this, i = this.sets[this.activeSet] || [], e = this._getAnimation();
            return this.animating = !0, e.apply(t, [i, [], 1]).then(function () {
                t.animating = !1
            })
        }, next: function () {
            this.show(this.sets[this.activeSet + 1] ? this.activeSet + 1 : 0, !1, 1)
        }, previous: function () {
            this.show(this.sets[this.activeSet - 1] ? this.activeSet - 1 : this.sets.length - 1, !1, -1)
        }, start: function () {
            this.stop();
            var t = this;
            this.interval = setInterval(function () {
                t.hovering || t.animating || t.next()
            }, this.options.autoplayInterval)
        }, stop: function () {
            this.interval && clearInterval(this.interval)
        }
    }), n = {
        none: function () {
            var i = t.$.Deferred();
            return i.resolve(), i.promise()
        }, fade: function (t, e) {
            return i.apply(this, ["uk-animation-fade", t, e])
        }, "slide-bottom": function (t, e) {
            return i.apply(this, ["uk-animation-slide-bottom", t, e])
        }, "slide-top": function (t, e) {
            return i.apply(this, ["uk-animation-slide-top", t, e])
        }, "slide-vertical": function (t, e, n) {
            var s = ["uk-animation-slide-top", "uk-animation-slide-bottom"];
            return n == -1 && s.reverse(), i.apply(this, [s, t, e])
        }, "slide-horizontal": function (t, e, n) {
            var s = ["uk-animation-slide-right", "uk-animation-slide-left"];
            return n == -1 && s.reverse(), i.apply(this, [s, t, e, n])
        }, scale: function (t, e) {
            return i.apply(this, ["uk-animation-scale-up", t, e])
        }
    }, t.slideset.animations = n
});
!function (t) {
    var i;
    window.UIkit && (i = t(UIkit)), "function" == typeof define && define.amd && define("uikit-accordion", ["uikit"], function () {
        return i || t(UIkit)
    })
}(function (t) {
    "use strict";
    function i(i) {
        var e = t.$(i), o = "auto";
        if (e.is(":visible"))o = e.outerHeight(); else {
            var a = {position: e.css("position"), visibility: e.css("visibility"), display: e.css("display")};
            o = e.css({position: "absolute", visibility: "hidden", display: "block"}).outerHeight(), e.css(a)
        }
        return o
    }

    return t.component("accordion", {
        defaults: {
            showfirst: !0,
            collapse: !0,
            animate: !0,
            easing: "swing",
            duration: 300,
            toggle: ".uk-accordion-title",
            containers: ".uk-accordion-content",
            clsactive: "uk-active"
        }, boot: function () {
            t.ready(function (i) {
                setTimeout(function () {
                    t.$("[data-uk-accordion]", i).each(function () {
                        var i = t.$(this);
                        i.data("accordion") || t.accordion(i, t.Utils.options(i.attr("data-uk-accordion")))
                    })
                }, 0)
            })
        }, init: function () {
            var i = this;
            this.element.on("click.uk.accordion", this.options.toggle, function (e) {
                e.preventDefault(), i.toggleItem(t.$(this).data("wrapper"), i.options.animate, i.options.collapse)
            }), this.update(!0), t.domObserve(this.element, function (t) {
                i.element.children(i.options.containers).length && i.update()
            })
        }, toggleItem: function (e, o, a) {
            var n = this;
            e.data("toggle").toggleClass(this.options.clsactive), e.data("content").toggleClass(this.options.clsactive);
            var s = e.data("toggle").hasClass(this.options.clsactive);
            a && (this.toggle.not(e.data("toggle")).removeClass(this.options.clsactive), this.content.not(e.data("content")).removeClass(this.options.clsactive).parent().stop().css("overflow", "hidden").animate({height: 0}, {
                easing: this.options.easing,
                duration: o ? this.options.duration : 0
            }).attr("aria-expanded", "false")), e.stop().css("overflow", "hidden"), o ? e.animate({height: s ? i(e.data("content")) : 0}, {
                easing: this.options.easing,
                duration: this.options.duration,
                complete: function () {
                    s && (e.css({
                        overflow: "",
                        height: "auto"
                    }), t.Utils.checkDisplay(e.data("content"))), n.trigger("display.uk.check")
                }
            }) : (e.height(s ? "auto" : 0), s && (e.css({overflow: ""}), t.Utils.checkDisplay(e.data("content"))), this.trigger("display.uk.check")), e.attr("aria-expanded", s), this.element.trigger("toggle.uk.accordion", [s, e.data("toggle"), e.data("content")])
        }, update: function (i) {
            var e, o, a, n = this;
            this.toggle = this.find(this.options.toggle), this.content = this.find(this.options.containers), this.content.each(function (i) {
                e = t.$(this), e.parent().data("wrapper") ? o = e.parent() : (o = t.$(this).wrap('<div data-wrapper="true" style="overflow:hidden;height:0;position:relative;"></div>').parent(), o.attr("aria-expanded", "false")), a = n.toggle.eq(i), o.data("toggle", a), o.data("content", e), a.data("wrapper", o), e.data("wrapper", o)
            }), this.element.trigger("update.uk.accordion", [this]), i && this.options.showfirst && this.toggleItem(this.toggle.eq(0).data("wrapper"), !1, !1)
        }
    }), t.accordion
});
!function (t) {
    var i;
    window.UIkit && (i = t(UIkit)), "function" == typeof define && define.amd && define("uikit-tooltip", ["uikit"], function () {
        return i || t(UIkit)
    })
}(function (t) {
    "use strict";
    var i, o, e;
    return t.component("tooltip", {
        defaults: {
            offset: 5,
            pos: "top",
            animation: !1,
            delay: 0,
            cls: "",
            activeClass: "uk-active",
            src: function (t) {
                var i = t.attr("title");
                return void 0 !== i && t.data("cached-title", i).removeAttr("title"), t.data("cached-title")
            }
        }, tip: "", boot: function () {
            t.$html.on("mouseenter.tooltip.uikit focus.tooltip.uikit", "[data-uk-tooltip]", function (i) {
                var o = t.$(this);
                o.data("tooltip") || (t.tooltip(o, t.Utils.options(o.attr("data-uk-tooltip"))), o.trigger("mouseenter"))
            })
        }, init: function () {
            var o = this;
            i || (i = t.$('<div class="uk-tooltip"></div>').appendTo("body")), this.on({
                focus: function (t) {
                    o.show()
                }, blur: function (t) {
                    o.hide()
                }, mouseenter: function (t) {
                    o.show()
                }, mouseleave: function (t) {
                    o.hide()
                }
            })
        }, show: function () {
            if (this.tip = "function" == typeof this.options.src ? this.options.src(this.element) : this.options.src, o && clearTimeout(o), e && clearInterval(e), "string" == typeof this.tip && this.tip.length) {
                i.stop().css({
                    top: -2e3,
                    visibility: "hidden"
                }).removeClass(this.options.activeClass).show(), i.html('<div class="uk-tooltip-inner">' + this.tip + "</div>");
                var s = this, n = t.$.extend({}, this.element.offset(), {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }), l = i[0].offsetWidth, f = i[0].offsetHeight, a = "function" == typeof this.options.offset ? this.options.offset.call(this.element) : this.options.offset, p = "function" == typeof this.options.pos ? this.options.pos.call(this.element) : this.options.pos, h = p.split("-"), c = {
                    display: "none",
                    visibility: "visible",
                    top: n.top + n.height + f,
                    left: n.left
                };
                if ("fixed" == t.$html.css("position") || "fixed" == t.$body.css("position")) {
                    var r = t.$("body").offset(), d = t.$("html").offset(), u = {
                        top: d.top + r.top,
                        left: d.left + r.left
                    };
                    n.left -= u.left, n.top -= u.top
                }
                "left" != h[0] && "right" != h[0] || "right" != t.langdirection || (h[0] = "left" == h[0] ? "right" : "left");
                var m = {
                    bottom: {top: n.top + n.height + a, left: n.left + n.width / 2 - l / 2},
                    top: {top: n.top - f - a, left: n.left + n.width / 2 - l / 2},
                    left: {top: n.top + n.height / 2 - f / 2, left: n.left - l - a},
                    right: {top: n.top + n.height / 2 - f / 2, left: n.left + n.width + a}
                };
                t.$.extend(c, m[h[0]]), 2 == h.length && (c.left = "left" == h[1] ? n.left : n.left + n.width - l);
                var v = this.checkBoundary(c.left, c.top, l, f);
                if (v) {
                    switch (v) {
                        case"x":
                            p = 2 == h.length ? h[0] + "-" + (c.left < 0 ? "left" : "right") : c.left < 0 ? "right" : "left";
                            break;
                        case"y":
                            p = 2 == h.length ? (c.top < 0 ? "bottom" : "top") + "-" + h[1] : c.top < 0 ? "bottom" : "top";
                            break;
                        case"xy":
                            p = 2 == h.length ? (c.top < 0 ? "bottom" : "top") + "-" + (c.left < 0 ? "left" : "right") : c.left < 0 ? "right" : "left"
                    }
                    h = p.split("-"), t.$.extend(c, m[h[0]]), 2 == h.length && (c.left = "left" == h[1] ? n.left : n.left + n.width - l)
                }
                c.left -= t.$body.position().left, o = setTimeout(function () {
                    i.css(c).attr("class", ["uk-tooltip", "uk-tooltip-" + p, s.options.cls].join(" ")), s.options.animation ? i.css({
                        opacity: 0,
                        display: "block"
                    }).addClass(s.options.activeClass).animate({opacity: 1}, parseInt(s.options.animation, 10) || 400) : i.show().addClass(s.options.activeClass), o = !1, e = setInterval(function () {
                        s.element.is(":visible") || s.hide()
                    }, 150)
                }, parseInt(this.options.delay, 10) || 0)
            }
        }, hide: function () {
            if (!this.element.is("input") || this.element[0] !== document.activeElement)if (o && clearTimeout(o), e && clearInterval(e), i.stop(), this.options.animation) {
                var t = this;
                i.fadeOut(parseInt(this.options.animation, 10) || 400, function () {
                    i.removeClass(t.options.activeClass)
                })
            } else i.hide().removeClass(this.options.activeClass)
        }, content: function () {
            return this.tip
        }, checkBoundary: function (i, o, e, s) {
            var n = "";
            return (i < 0 || i - t.$win.scrollLeft() + e > window.innerWidth) && (n += "x"), (o < 0 || o - t.$win.scrollTop() + s > window.innerHeight) && (n += "y"), n
        }
    }), t.tooltip
});
!function (t) {
    var e;
    window.UIkit && (e = t(UIkit)), "function" == typeof define && define.amd && define("uikit-notify", ["uikit"], function () {
        return e || t(UIkit)
    })
}(function (t) {
    "use strict";
    var e = {}, i = {}, s = function (e) {
        return "string" == t.$.type(e) && (e = {message: e}), arguments[1] && (e = t.$.extend(e, "string" == t.$.type(arguments[1]) ? {status: arguments[1]} : arguments[1])), new n(e).show()
    }, o = function (t, e) {
        var s;
        if (t)for (s in i)t === i[s].group && i[s].close(e); else for (s in i)i[s].close(e)
    }, n = function (s) {
        this.options = t.$.extend({}, n.defaults, s), this.uuid = t.Utils.uid("notifymsg"), this.element = t.$(['<div class="uk-notify-message">', '<a class="uk-close"></a>', "<div></div>", "</div>"].join("")).data("notifyMessage", this), this.content(this.options.message), this.options.status && (this.element.addClass("uk-notify-message-" + this.options.status), this.currentstatus = this.options.status), this.group = this.options.group, i[this.uuid] = this, e[this.options.pos] || (e[this.options.pos] = t.$('<div class="uk-notify uk-notify-' + this.options.pos + '"></div>').appendTo("body").on("click", ".uk-notify-message", function () {
            var e = t.$(this).data("notifyMessage");
            e.element.trigger("manualclose.uk.notify", [e]), e.close()
        }))
    };
    return t.$.extend(n.prototype, {
        uuid: !1, element: !1, timout: !1, currentstatus: "", group: !1, show: function () {
            if (!this.element.is(":visible")) {
                var t = this;
                e[this.options.pos].show().prepend(this.element);
                var i = parseInt(this.element.css("margin-bottom"), 10);
                return this.element.css({
                    opacity: 0,
                    marginTop: -1 * this.element.outerHeight(),
                    marginBottom: 0
                }).animate({opacity: 1, marginTop: 0, marginBottom: i}, function () {
                    if (t.options.timeout) {
                        var e = function () {
                            t.close()
                        };
                        t.timeout = setTimeout(e, t.options.timeout), t.element.hover(function () {
                            clearTimeout(t.timeout)
                        }, function () {
                            t.timeout = setTimeout(e, t.options.timeout)
                        })
                    }
                }), this
            }
        }, close: function (t) {
            var s = this, o = function () {
                s.element.remove(), e[s.options.pos].children().length || e[s.options.pos].hide(), s.options.onClose.apply(s, []), s.element.trigger("close.uk.notify", [s]), delete i[s.uuid]
            };
            this.timeout && clearTimeout(this.timeout), t ? o() : this.element.animate({
                opacity: 0,
                marginTop: -1 * this.element.outerHeight(),
                marginBottom: 0
            }, function () {
                o()
            })
        }, content: function (t) {
            var e = this.element.find(">div");
            return t ? (e.html(t), this) : e.html()
        }, status: function (t) {
            return t ? (this.element.removeClass("uk-notify-message-" + this.currentstatus).addClass("uk-notify-message-" + t), this.currentstatus = t, this) : this.currentstatus
        }
    }), n.defaults = {
        message: "", status: "", timeout: 5e3, group: null, pos: "top-center", onClose: function () {
        }
    }, t.notify = s, t.notify.message = n, t.notify.closeAll = o, s
});
!function (t) {
    var e = {};
    t.fn.socialButtons = function (a) {
        return a = t.extend({wrapper: '<div class="tm-socialbuttons uk-clearfix">'}, a), a.twitter || a.plusone || a.facebook ? (a.twitter && !e.twitter && (e.twitter = t.getScript("//platform.twitter.com/widgets.js")), a.plusone && !e.plusone && (e.plusone = t.getScript("//apis.google.com/js/plusone.js")), window.FB || !a.facebook || e.facebook || (t("body").append('<div id="fb-root"></div>'), function (t, e, a) {
            var o, i = t.getElementsByTagName(e)[0];
            t.getElementById(a) || (o = t.createElement(e), o.id = a, o.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0", i.parentNode.insertBefore(o, i))
        }(document, "script", "facebook-jssdk"), e.facebook = !0), this.each(function () {
            var e = t(this).data("permalink"), o = t(a.wrapper).appendTo(this);
            a.twitter && o.append('<div><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + e + '" data-count="none">Tweet</a></div>'), a.plusone && o.append('<div><div class="g-plusone" data-size="medium" data-annotation="none" data-href="' + e + '"></div></div>'), a.facebook && o.append('<div><div class="fb-like" data-href="' + e + '" data-layout="button_count" data-action="like" data-width="100" data-show-faces="false" data-share="false"></div></div>')
        })) : this
    }, t(function () {
        if (window.MooTools && Element.prototype.hide) {
            var e = Element.prototype.hide;
            Element.prototype.hide = function () {
                return t(this).is('[class*="uk-"]') ? this : e.apply(this, [])
            }
        }
    })
}(jQuery);
jQuery(function ($) {
    var config = $('html').data('config') || {};
    $('article[data-permalink]').socialButtons(config);
    $("input[type=tel]").mask("+7(999)999-99-99");
    $(".sendmail").submit(function () {
        var th = $(this);
        $.ajax({type: "POST", url: "../mail.php", data: th.serialize()}).done(function () {
            UIkit.notify({
                message: 'Спасибо! Ваше сообщение отправлено.',
                status: 'info',
                timeout: 5000,
                pos: 'top-center'
            });
            setTimeout(function () {
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });
    $(".lead").submit(function () {
        var th = $(this);
        var ref = $(this).find("[required]");
        var result = "0";
        $(ref).each(function () {
            if ($(this).val() == '') {
                UIkit.notify({
                    message: 'Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова. Проверьте поля Размер и Цвет.',
                    status: 'danger',
                    timeout: 5000,
                    pos: 'top-center'
                });
                result = "1";
                return false;
            }
        });
        if (result == 1)return false;
        $.ajax({
            method: "POST",
            url: "/order.php",
            data: th.serialize(),
            success: function (data) {
                $('body').html(data);
            }
        }).done(function () {
            UIkit.notify({
                message: 'Пожалуйста заполните необходимые данные!',
                status: 'info',
                timeout: 5000,
                pos: 'top-center'
            });
            setTimeout(function () {
                th.trigger("reset");
            }, 1000);
            $("input[type=tel]").mask("+7(999)999-99-99");
            $(".order").submit(function () {
                var th = $(this);
                var ref = $(this).find("[required]");
                var result = "0";
                $(ref).each(function () {
                    if ($(this).val() == '') {
                        UIkit.notify({
                            message: 'Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова. Проверьте поля Размер и Цвет.',
                            status: 'danger',
                            timeout: 5000,
                            pos: 'top-center'
                        });
                        result = "1";
                        return false;
                    }
                });
                if (result == 1)return false;
                $.ajax({
                    method: "POST",
                    url: "/rest.php",
                    data: th.serialize(),
                    // success: function (data) {
                    //     alert(data);
                    // }
                }).done(function () {
                    UIkit.notify({
                        message: 'Спасибо! Ваша заявка принята! В ближайшее время с Вами свяжется наш специалист!',
                        status: 'info',
                        timeout: 5000,
                        pos: 'top-center'
                    });
                }).done(function () {
                    setTimeout(function () {
                        $.ajax({
                            method: "get",
                            url: "/",
                            data: th.serialize(),
                            success: function (data) {
                                $('body').html(data)
                            }
                        })
                    }, 4000);
                    }

                );
                return false;
            });
        });
        return false;
    });

    $("#openChat").click(function () {
        $('[data-b24-crm-button-widget="crmform"]').click();
    });
    $("#calculateUserContact").click(function () {
        $(".uk-modal-footer").removeClass('uk-hidden');
        var months = new Array(13);
        months[1] = "январь";
        months[2] = "февраль";
        months[3] = "март";
        months[4] = "апрель";
        months[5] = "май";
        months[6] = "июнь";
        months[7] = "июль";
        months[8] = "август";
        months[9] = "сентябрь";
        months[10] = "октябрь";
        months[11] = "ноябрь";
        months[12] = "декабрь";
        var creditAmount = parseFloat($("#sum").val());
        var creditAmountTmp = creditAmount;
        var interestRate = parseFloat($("#percent").val());
        var creditTerm = parseFloat($("#period").val());
        var period_type = $("#period_type").val();
        var monthlyPayment = 0;
        var monthlyPaymentMain = 0;
        var monthlyInterestH = 0
        var monthlyInterestL = 0;
        var monthlyInterestTmp = 0;
        var monthlyInterestAll = 0;
        var overpayment = 0;
        var paymentForEntireTerm = 0;
        var endsPayments = 0;
        var period = 0;
        if (period_type == "м.") {
            period = $("#period").val();
        } else {
            period = $("#period").val() * 12;
        }
        monthlyPaymentMain = parseFloat(creditAmount) / parseFloat(period);
        if ($("#annuity").prop("checked")) {
            var interestRate_period = parseFloat(interestRate) / (period * 100);
            monthlyInterestH = parseFloat(creditAmount) * (interestRate_period + interestRate_period / (Math.pow(1 + interestRate_period, period) - 1));
            while (creditAmountTmp > -1) {
                monthlyInterestTmp = parseFloat(creditAmountTmp) * interestRate_period;
                monthlyInterestAll = parseFloat(monthlyInterestAll) + parseFloat(monthlyInterestTmp);
                creditAmountTmp = parseFloat(creditAmountTmp) - (parseFloat(monthlyInterestH) - parseFloat(monthlyInterestTmp));
            }
            monthlyInterestL = parseFloat(monthlyInterestTmp);
            monthlyInterestL = monthlyInterestH;
            monthlyPayment = (parseFloat(monthlyInterestH)).toFixed(2);
        } else if ($("#different").prop("checked")) {
            monthlyInterestH = parseFloat(creditAmount) * parseFloat(interestRate) / (period * 100);
            while (creditAmountTmp > -1) {
                monthlyInterestTmp = parseFloat(creditAmountTmp) * parseFloat(interestRate) / (period * 100);
                monthlyInterestAll = parseFloat(monthlyInterestAll) + parseFloat(monthlyInterestTmp);
                creditAmountTmp = parseFloat(creditAmountTmp) - parseFloat(monthlyPaymentMain);
            }
            monthlyInterestL = parseFloat(monthlyInterestTmp);
            monthlyPayment = ((parseFloat(monthlyInterestH) + parseFloat(monthlyPaymentMain)).toFixed(2) + " ... " + (parseFloat(monthlyInterestL) + parseFloat(monthlyPaymentMain)).toFixed(2));
        } else {
            alert("Необходимо выбрать вид платежа");
        }
        paymentForEntireTerm = parseFloat(monthlyInterestAll) + parseFloat(monthlyPaymentMain);
        endsPayments = new Date(1);
        endsPayments.setMonth(($("#month").val() - 1) + period % 12);
        $("#monthlyPayment").html(monthlyPayment + " руб.");
        $("#overpayment").html(monthlyInterestAll.toFixed(2) + " руб.");
        $("#paymentForEntireTerm").html((parseFloat(creditAmount) + parseFloat(monthlyInterestAll)).toFixed(2) + " руб.");
        $("#endsPayments").html(months[1 + endsPayments.getMonth()] + " " + (parseInt($("#year").val()) + (period - period % 12) / 12));
    });
    function disabledEnabledButton() {
        if ($("#sum").val() == "" || $("#percent").val() == "" || $("#period").val() == "" || $("#sum").val() <= 0 || $("#percent").val() <= 0 || $("#period").val() <= 0) {
            $("#calculateUserContact").attr('disabled', true);
        } else {
            $("#calculateUserContact").attr('disabled', false);
        }
    }

    disabledEnabledButton();
    $("#sum,#percent,#period").keyup(function () {
        disabledEnabledButton();
    });
    $("#sum,#percent,#period").change(function () {
        disabledEnabledButton();
    });
});
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function (a) {
    var b, c = navigator.userAgent, d = /iphone/i.test(c), e = /chrome/i.test(c), f = /android/i.test(c);
    a.mask = {
        definitions: {9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"},
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, a.fn.extend({
        caret: function (a, b) {
            var c;
            if (0 !== this.length && !this.is(":hidden"))return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
                begin: a,
                end: b
            })
        }, unmask: function () {
            return this.trigger("unmask")
        }, mask: function (c, g) {
            var h, i, j, k, l, m, n, o;
            if (!c && this.length > 0) {
                h = a(this[0]);
                var p = h.data(a.mask.dataName);
                return p ? p() : void 0
            }
            return g = a.extend({
                autoclear: a.mask.autoclear,
                placeholder: a.mask.placeholder,
                completed: null
            }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
                "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null)
            }), this.trigger("unmask").each(function () {
                function h() {
                    if (g.completed) {
                        for (var a = l; m >= a; a++)if (j[a] && C[a] === p(a))return;
                        g.completed.call(B)
                    }
                }

                function p(a) {
                    return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
                }

                function q(a) {
                    for (; ++a < n && !j[a];);
                    return a
                }

                function r(a) {
                    for (; --a >= 0 && !j[a];);
                    return a
                }

                function s(a, b) {
                    var c, d;
                    if (!(0 > a)) {
                        for (c = a, d = q(b); n > c; c++)if (j[c]) {
                            if (!(n > d && j[c].test(C[d])))break;
                            C[c] = C[d], C[d] = p(d), d = q(d)
                        }
                        z(), B.caret(Math.max(l, a))
                    }
                }

                function t(a) {
                    var b, c, d, e;
                    for (b = a, c = p(a); n > b; b++)if (j[b]) {
                        if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e)))break;
                        c = e
                    }
                }

                function u() {
                    var a = B.val(), b = B.caret();
                    if (o && o.length && o.length > a.length) {
                        for (A(!0); b.begin > 0 && !j[b.begin - 1];)b.begin--;
                        if (0 === b.begin)for (; b.begin < l && !j[b.begin];)b.begin++;
                        B.caret(b.begin, b.begin)
                    } else {
                        for (A(!0); b.begin < n && !j[b.begin];)b.begin++;
                        B.caret(b.begin, b.begin)
                    }
                    h()
                }

                function v() {
                    A(), B.val() != E && B.change()
                }

                function w(a) {
                    if (!B.prop("readonly")) {
                        var b, c, e, f = a.which || a.keyCode;
                        o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault())
                    }
                }

                function x(b) {
                    if (!B.prop("readonly")) {
                        var c, d, e, g = b.which || b.keyCode, i = B.caret();
                        if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                            if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                                if (t(c), C[c] = d, z(), e = q(c), f) {
                                    var k = function () {
                                        a.proxy(a.fn.caret, B, e)()
                                    };
                                    setTimeout(k, 0)
                                } else B.caret(e);
                                i.begin <= m && h()
                            }
                            b.preventDefault()
                        }
                    }
                }

                function y(a, b) {
                    var c;
                    for (c = a; b > c && n > c; c++)j[c] && (C[c] = p(c))
                }

                function z() {
                    B.val(C.join(""))
                }

                function A(a) {
                    var b, c, d, e = B.val(), f = -1;
                    for (b = 0, d = 0; n > b; b++)if (j[b]) {
                        for (C[b] = p(b); d++ < e.length;)if (c = e.charAt(d - 1), j[b].test(c)) {
                            C[b] = c, f = b;
                            break
                        }
                        if (d > e.length) {
                            y(b + 1, n);
                            break
                        }
                    } else C[b] === e.charAt(d) && d++, k > b && (f = b);
                    return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l
                }

                var B = a(this), C = a.map(c.split(""), function (a, b) {
                    return "?" != a ? i[a] ? p(b) : a : void 0
                }), D = C.join(""), E = B.val();
                B.data(a.mask.dataName, function () {
                    return a.map(C, function (a, b) {
                        return j[b] && a != p(b) ? a : null
                    }).join("")
                }), B.one("unmask", function () {
                    B.off(".mask").removeData(a.mask.dataName)
                }).on("focus.mask", function () {
                    if (!B.prop("readonly")) {
                        clearTimeout(b);
                        var a;
                        E = B.val(), a = A(), b = setTimeout(function () {
                            B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a))
                        }, 10)
                    }
                }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
                    B.prop("readonly") || setTimeout(function () {
                        var a = A(!0);
                        B.caret(a), h()
                    }, 0)
                }), e && f && B.off("input.mask").on("input.mask", u), A()
            })
        }
    })
});