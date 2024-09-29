(function () {
	function f(a, b) {
		return -1 == a.toString().indexOf(b) ? _f : _t;
	}

	function d(a) {
		return -1 == a.toString().indexOf(hmi[hmi.length - 1]) ? _f : _t;
	}

	function u(a) {
		for (var b = 0, c = a.length - 1; 0 <= c; c--) b += a.charCodeAt(c);
		return b;
	}

	function n(a, b) {
		b = b == _ud ? 1 : b;
		b = 1 == a.length ? 0 : a.length - b;
		return a[b];
	}

	function p(a, b, c) {
		a = c == _ud ? RegExp("^[" + a + "]$") : RegExp(a);
		return a.test(b);
	}

	function q() {
		return hmi.replace(/[^(]/gi, "").length - hmi.replace(/[^)]/gi, "").length;
	}

	function m(a) {
		hmi = hmi.substring(0, hmi.length - a);
	}

	function j(a) {
		$("#hmt_" + a).addClass("_active");
		f(_tstmp, a) || _tstmp.push(a);
		1046 == a && l();
		1008 == a && ((hmi = String(hmi)), 2 > hmi.length ? l() : ("\u221a" == n(hmi, 2) ? m(2) : m(1), (_drm = 1), g(hmi)));
		if (f(_n, _ts[a]) && !(48 == a && p("[^\\d\\.]0$", hmi, 1))) {
			d(")%@") && (hmi += "\u00d7");
			if ("0" == hmi || 2 == _drm) l(), (hmi = "");
			_drm = 1;
			g(hmi + _ts[a]);
		}
		44 == a && ("." == hmi[hmi.length - 1] || p("[0-9]+\\.[0-9]+$", hmi, 1) || (0 == _drm ? (hmi = "0") : d(_i + "(") ? (hmi += "0") : d(_n) || (hmi += "\u00d70"), g(hmi + _ts[44])));
		if ("." != hmi[hmi.length - 1]) {
			if (f(_i, _ts[a]) && !(p("\\^-$|\u00d7-$|\u00f7-$|\\(-$", hmi, 1) || "-" == hmi) && !(d("(") && 45 != a)) ((d("\u00d7\u00f7") && 45 != a) || d("-+")) && m(1), 45 == a && 0 == _drm ? (g(_ts[a]), (_drm = 1)) : ((_drm = 1), g(hmi + _ts[a]));
			if (40 == a || 41 == a) 40 == a ? ("0" == hmi || 2 == _drm ? (l(), (hmi = "")) : d(_n + "%@)") && (hmi += "\u00d7"), (_drm = 1), g(hmi + "(")) : 0 < q() && d(_n + "%@)") && g(hmi + ")");
			37 == a && d(_n + ")@") && ((_drm = 1), g(hmi + "%"));
			83 == a && ("0" == hmi || 2 == _drm ? (l(), (hmi = "")) : d(_n + ")@%") && (hmi += "\u00d7"), (_drm = 1), g(hmi + "\u221a("));
			if (88 == a)
				a: {
					if (f(_n, n(hmi, 2)) && d(_i)) m(1);
					else if (!d(_n + ")")) break a;
					_drm = 1;
					g(hmi + "@");
				}
			if (13 == a) {
				var b = hmi.replace(RegExp("\u00d7", "g"), "*"),
					b = b.replace(RegExp("\u00f7", "g"), "/");
				a = "";
				var c = q();
				if (0 < c) {
					for (; 0 < c; c--) a += ")";
					b += a;
				}
				for (; f(b, "("); ) var c = b.lastIndexOf("("), e = b.indexOf(")", c), k = b.substring(c + 1, e), b = "\u221a" == b[c - 1] ? b.substring(0, c) + "{" + r(k) + "}" + b.substring(e + 1) : b.substring(0, c) + r(k) + b.substring(e + 1);
				b = r(b);
				try {
					b = f(b, "e+") ? b.substr(0, b.toString().indexOf("e+") - 5) + "" + b.substr(b.toString().indexOf("e+")) : f(b, "e-") ? b.substr(0, b.toString().indexOf("e-") - 5) + "" + b.substr(b.toString().indexOf("e-")) : Math.round(b * Math.pow(10, 11)) / Math.pow(10, 11);
				} catch (j) {
					b = Math.round(b * Math.pow(10, 11)) / Math.pow(10, 11);
				}
				if (b != hmi) {
					hmi += a;
					!isNaN(b) && "Infinity" != b && (_snc = b);
					"Infinity" == b ? (b = "vô cực") : isNaN(b) && (b = "Error");
					$("#hm_islem").html(s(hmi) + " =");
					a = s(hmi) + " =";
					c = b;
					b: {
						e = document.cookie.split(";");
						for (k = 0; k < e.length; k++) {
							for (var h = e[k]; " " == h.charAt(0); ) h = h.substring(1, h.length);
							if (0 == h.indexOf("ilog=")) {
								e = h.substring(5, h.length);
								break b;
							}
						}
						e = "";
					}
					//document.cookie = "ilog=" + e + a.replace(RegExp(" ", "g"), "") + c + "|; path=/";
					$("#hmlog").prepend("<li>" + a + " " + c + "</li>");
					0 < $("#hmlog li").length && !$("#islemgecmisi em").is(":visible") && $("#islemgecmisi em").show();
					g(b);
					_drm = 2;
				}
			}
		}
	}

	function v() {
		$("#hmt_" + _tstmp.shift()).removeClass("_active");
	}

	function g(a) {
		hmi = String(a);
		hmi_ek = "";
		a = q();
		if (0 < a) {
			for (; 0 < a; a--) hmi_ek += ")";
			d("-+\u00d7\u00f7") && (hmi_ek = " " + hmi_ek);
		}
		hmig = s(hmi);
		"" != hmi_ek && (hmig += "<span>" + hmi_ek + "</span>");
		$("#hm_ekran").html(hmig);
	}

	function s(a) {
		a = String(a);
		a = a.replace(/@/g, "<sup>2</sup>");
		a = a.replace(/\^(-?[0-9]+)/g, "<sup>$1</sup>");
		"^" == n(a) && (a = a.replace("^", '<sup style="color:#ccc">\u25a1</sup>'));
		a = a.replace(/(\d)([-\\+\u00d7\u00f7])/g, "$1 $2 ");
		a = a.replace(/([\)%])([-\\+\u00d7\u00f7])/g, "$1 $2 ");
		return (a = a.replace(/>([-\\+\u00d7\u00f7])/g, "> $1 "));
	}

	function l() {
		2 == _drm && $("#hm_islem").text("Sonuç = " + _snc); //result
		_drm = hmi = 0;
		g("0", 0);
	}

	function r(a) {
		f(a, "\u221a") && (a = w(a));
		f(a, "@") && (a = x(a));
		f(a, "%") && (a = y(a));
		f(a, "--") && (a = a.replace(RegExp("--", "g"), "+"));
		return eval(a);
	}

	function w(a) {
		var b = a.lastIndexOf("{"),
			c = a.indexOf("}", b),
			e = a.substring(b + 1, c);
		return (a = a.substring(0, b - 1) + Math.sqrt(e) + a.substring(c + 1));
	}

	function x(a) {
		for (; f(a, "@"); ) (ks = a.toString().indexOf("@")), (kb = 1 == ks ? 0 : t(a, ks) + 1), (ki = a.substring(kb, ks)), (a = a.substring(0, kb) + ki * ki + a.substring(ks + 1));
		return a;
	}

	function y(a) {
		a = a.split("");
		for (var b = 0; b < a.length; ++b)
			if ("%" == a[b]) {
				var c = t(a, b);
				t(a, c);
				if (a[c] && ("+" == a[c] || "-" == a[c])) {
					var e = a.slice(0, c).concat(["*(1"]),
						d = a.slice(c + 1, b).concat(["/100"]),
						d = eval(d.join(""));
					a = e
						.concat(a[c])
						.concat([d])
						.concat([")"])
						.concat(a.slice(b + 1));
				} else (e = a.slice(0, c + 1)), (d = a.slice(c + 1, b).concat(["/100"])), (d = eval(d.join(""))), (a = e.concat([d]).concat(a.slice(b + 1)));
			}
		return a.join("");
	}

	function t(a, b) {
		for (var c = /^[^0-9.]$/, d = b - 1; 0 < d; --d) if (c.test(a[d])) return d;
		return -1;
	}
	hmi = 0;
	_ud = void 0;
	_f = !1;
	_t = !0;
	_drm = 0;
	_ests = {
		115: 83,
		46: 44,
		120: 88,
	};

	_ts = {
		13: "=",
		37: "%",
		40: "(",
		41: ")",
		42: "\u00d7",
		43: "+",
		44: ".",
		45: "-",
		47: "\u00f7",
		48: "0",
		49: "1",
		50: "2",
		51: "3",
		52: "4",
		53: "5",
		54: "6",
		55: "7",
		56: "8",
		57: "9",
		83: "kok",
		88: "kare",
	};
	_tstmp = [];
	_n = "0123456789";
	_i = "\u00f7\u00d7-+";
	_snc = 0;

	$("#islemgecmisi em").click(function () {
		$("#hmlog").html("");
		$("#islemgecmisi em").hide();
	});

	$("#hm_tuslar > div > div").mousedown(function () {
		j($(this).attr("id").replace("hmt_", ""));
	});

	$(document).mouseup(function () {
		v();
	});

	$(document).keypress(function (a) {
		a = a.which;

		void 0 != _ests[a] ? j(_ests[a]) : void 0 != _ts[a] ? j(a) : 34 == a && $("#ig_button").click();
		return !1;
	});

	$(document).keydown(function (a) {
		8 == a.which && a.preventDefault();
		46 == a.which && j(1046);
		8 == a.which && j(1008);
	});
	$(document).keyup(function () {
		v();
	});
	$("#ig_button").click(function () {
		if (2 == window.ig_div) return _f;
		1 != window.ig_div
			? ((window.ig_div = 2),
			  $("#islemgecmisi").animate(
					{
						left: "+=300px",
					},
					"slow",
					function () {
						$("#ig_button").css("background-position", "0 -67px");
						window.ig_div = 1;
					}
			  ))
			: ((window.ig_div = 2),
			  $("#islemgecmisi").animate(
					{
						left: "-=300px",
					},
					"slow",
					function () {
						$("#ig_button").css("background-position", "0 0");
						window.ig_div = 0;
					}
			  ));
	});
	document.cookie = "ilog=|; path=/";
})();
