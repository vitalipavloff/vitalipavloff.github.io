(function(a) {
    var b = {};
    b.window = $(a);
    b.document = $(document);
    b.html = $("html");
    b.body = $("body");
    b.touch = "createTouch" in document;
    b.isiPad = navigator.userAgent.match(/iPad/i) != null;
    b.event = {};
    b.event.DOWN = (b.touch) ? "touchstart" : "mousedown";
    b.event.UP = (b.touch) ? "touchend" : "mouseup";
    b.event.MOVE = (b.touch) ? "touchmove" : "mousemove";
    b.event.TAP = (b.touch) ? "touchend" : "click";
    b.event.ENTER = (b.touch) ? "touchstart" : "mouseenter";
    b.event.LEAVE = (b.touch) ? "touchend" : "mouseleave";
    a.app = b;
    if ($(a).width() <= 480) {
        b.html.addClass("min")
    }
    $(a).resize(function() {
        if ($(a).width() <= 480) {
            b.html.addClass("min")
        } else {
            b.html.removeClass("min")
        }
    });
    var d = $("#loading");
    if (d.length > 0) {
        d.find(".parts").addClass("animate");
        var c = 0;
        setInterval(function() {
            if (c <= 100) {
                d.find("p").text(c);
                c++
            } else {
                d.find(".cont").fadeOut("slow", function() {
                    d.find(".parts.top").addClass("off");
                    d.find(".parts.bottom").addClass("off")
                });
                setTimeout(function() {
                    d.remove()
                }, 1000)
            }
        }, 10)
    }
})(window);;
(function() {
    if (!app.touch) {
        app.html.addClass("onepage");
        var a = {};
        var h = $(".right-section > div > a");
        a.flag_scrollwheel = true;
        var b = function(q) {
            if (q.hasClass("viewMore")) {
                var r = '<div class="loading"><img src="css/assets/loading-plus.png" width="52" height="52" /></div>'
            } else {
                var r = '<div class="loading"><img src="css/assets/loading.png" width="358" height="358" /></div>'
            }
            q.addClass("active");
            q.find(".roll").append(r)
        };
        var o = function(q) {
            q.removeClass("active");
            q.find(".loading").fadeOut("fast", function() {
                $(this).remove()
            })
        };
        var i = function(s, q) {
            var r = s.attr("href");
            a.section_wrapper.load(r + " .contenedor", function(u, t, v) {
                if (t == "success") {
                    setTimeout(function() {
                        a.section_wrapper.animate({
                            opacity: 1,
                            "margin-left": "0px"
                        }, 1200);
                        $.getScript("/js/internas.js")
                    }, 1300);
                    setTimeout(function() {
                        o(s)
                    }, 1000);
                    if (!q) {
                        j(r)
                    }
                }
                if (t == "error") {
                    alert("Error");
                    d(true);
                    o(s)
                }
            })
        };
        var c = function(r, q) {
            b(r);
            a.section_wrapper = $('<div class="section-wrapper"></div>');
            app.body.append(a.section_wrapper);
            i(r, q)
        };
        var d = function(q) {
            if (a.section_wrapper) {
                a.section_wrapper.animate({
                    opacity: 0,
                    "margin-left": "50px"
                }, 1200);
                setTimeout(function() {
                    $(".section-wrapper").remove();
                }, 500);
                if (!q) {
                    j("https://vitalipavloff.com/");
                }
            } else {
                window.location.href = "https://vitalipavloff.com/";
            }
        };
        var k = function(q, r, s) {
            if (s) {
                $.scrollTo(q, r, {
                    easing: "easeOutCirc",
                    axis: "y",
                    onAfter: function() {
                        $(document).trigger("scroll")
                    }
                })
            } else {
                $(".internas .right-section").scrollTo(q, r, {
                    easing: "easeOutCirc",
                    axis: "y",
                    onAfter: function() {
                        $(document).trigger("scroll")
                    }
                })
            }
        };
        var j = function(r) {
            var q;
            if (r == "https://vitalipavloff.com/") {
                q = "home"
            } else {
                q = r
            }
            if (window.history.pushState) {
                window.history.pushState({
                    href: q
                }, r, r)
            }
        };
        var m = function() {
            var r = ("state" in window.history),
                q = window.location.href;
            window.onpopstate = function(u) {
                var s = !r && location.href == q;
                r = true;
                if (s) {
                    return
                }
                var v = u.state;
                if (v) {
                    if (u.state.href == "home") {
                        d(true)
                    } else {
                        var t = $(".right-section > div > a[href='" + u.state.href + "']");
                        c(t, true)
                    }
                }
            }
        };
        var l = function(s) {
            var r = n();
            var q = $("." + r);
            if (q.find(".focused").prev().length > 0) {
                k(q.find(".focused").prev(), 500, s);
                q.find(".focused").removeClass("focused").prev().addClass("focused");
                if (r == "home") {
                    $(".bullets a.active").removeClass("active").prev().addClass("active")
                }
                if (q.find(".focused").prev().length > 0) {
                    q.find(".keyword .bottom").removeClass("inactive")
                } else {
                    q.find(".keyword .top").addClass("inactive")
                }
            }
        };
        var p = function(s) {
            var r = n();
            var q = $("." + r);
            if (q.find(".focused").next().length > 0) {
                k(q.find(".focused").next(), 500, s);
                q.find(".focused").removeClass("focused").next().addClass("focused");
                if (r == "home") {
                    $(".bullets a.active").removeClass("active").next().addClass("active")
                }
                if (q.find(".focused").next().length > 0) {
                    q.find(".keyword .top").removeClass("inactive")
                } else {
                    q.find(".keyword .bottom").addClass("inactive")
                }
            }
        };
        var f = function(q, u) {
            var t = n();
            var s = $("." + t);
            var r = s.find(".right-section > div > a:nth(" + q + ")");
            k(r, 500, u);
            s.find(".focused").removeClass("focused");
            r.addClass("focused");
            if (r.next().length > 0) {
                s.find(".keyword .bottom").removeClass("inactive")
            } else {
                s.find(".keyword .bottom").addClass("inactive")
            }
            if (r.prev().length > 0) {
                s.find(".keyword .top").removeClass("inactive")
            } else {
                s.find(".keyword .top").addClass("inactive")
            }
        };
        var n = function() {
            var q;
            if ($(".detalle").length > 0) {
                q = "detalle"
            } else {
                if ($(".biography").length > 0) {
                    q = "biography"
                } else {
                    q = "home"
                }
            }
            return q
        };
        var e = function(q) {
            var r = "";
            if (q == 37) {
                r = $(".keyword .left")
            }
            if (q == 38) {
                r = $(".keyword .top")
            }
            if (q == 39) {
                r = $(".keyword .right")
            }
            if (q == 40) {
                r = $(".keyword .bottom")
            }
            if (r.length > 0) {
                r.find("span").fadeIn("fast", function() {
                    $(this).fadeOut("fast")
                })
            }
        };
        var g = function(q) {
            var q = q;
            var r = "";
            if (q.length > 0) {
                r += '<div class="bullets">';
                q.each(function(s, t) {
                    var u = (s == 0) ? "active" : "desactive";
                    r += '<a href="javascript:void(0);" class="' + u + '" data-go="' + s + '"><span role="link">' + $(this).data("title") + "</span></a>"
                });
                r += "</div>"
            }
            app.body.find(".home").append(r)
        };
        $(window).on("resize", function() {
            setTimeout(function() {
                var q = n();
                k($("." + q).find(".focused"), 100)
            }, 100)
        });
        g($(".right-section > div > *"));
        m();
        j("https://vitalipavloff.com/");
        $(".bullets a").on("click", function(s) {
            s.preventDefault();
            var r = parseInt($(this).data("go"));
            var q = n();
            var t = (q == "home") ? true : false;
            f(r, t);
            $(".bullets a").removeClass("active");
            $(this).addClass("active")
        });
        h.on("click", function(q) {
            q.preventDefault();
            c($(this))
        });
        $(document).on("click", ".home .viewMore", function(q) {
            q.preventDefault();
            c($(this))
        });
        $(document).on("click", ".go-back", function(q) {
            q.preventDefault();
            q.stopPropagation();
            d()
        });
        $(document).on("keydown", function(q) {
            e(q.keyCode)
        });
        $(document).on("keyup", function(r) {
            if (app.html.hasClass("min")) {
                return
            }
            var q = n();
            var s = (q == "home") ? true : false;
            if (s) {
                if (r.keyCode == 39) {
                    c($(".home .focused"))
                }
            } else {
                if (r.keyCode == 37) {
                    d()
                }
            }
            if (r.keyCode == 38) {
                l(s)
            }
            if (r.keyCode == 40) {
                p(s)
            }
        });
        $(window).on("mousewheel", function(r, t) {
            if (app.html.hasClass("min")) {
                return
            }
            if (a.flag_scrollwheel) {
                a.flag_scrollwheel = false;
                setTimeout(function() {
                    a.flag_scrollwheel = true
                }, 600);
                var q = n();
                var s = (q == "home") ? true : false;
                if (t > 0) {
                    l(s)
                } else {
                    p(s)
                }
            }
        });
        $.scrollTo(0, 0, 0);
        setTimeout(function() {
            app.body.find(".contenedor").css("height", app.document.height())
        }, 500);
        $(window).on("resize", function() {
            setTimeout(function() {
                app.body.find(".contenedor").css("height", app.document.height())
            }, 500)
        });
        $('.home *[data-type="background"]').each(function() {
            var a = $(this);
            $(window).scroll(function() {
                var d = a.data("yposinitial");
                var b = -($(window).scrollTop() / a.data("speed")) + d;
                var c = "0 " + b + "px";
                a.css({
                    backgroundPosition: c
                });
            });
        });
    }
})(window);