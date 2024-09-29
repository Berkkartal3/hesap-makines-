$(document).ready(function () {
	var isDesktop = window.matchMedia("(min-width: 992px)").matches;

	if (isDesktop) {
		$(".hesaplama_araclari_list ul li").hover(function () {
			$(this).children("ul").toggle();
			$(this).siblings().children("ul").hide(); // Diğer alt menüleri kapat
		});

		$(document).click(function (event) {
			if (!$(event.target).closest(".hesaplama_araclari_list").length) {
				$(".hesaplama_araclari_list ul ul").hide();
			}
		});
	}
});

$(document).ready(function () {
	$(".mobil_menu_icon i").click(function () {
		$("#mobil_menu").toggle();
	});

	$(".mobile_menu_taslak a").click(function () {
		$(this).parent("li").children("ul").slideToggle("fast");
		if ($(this).next("ul").css("display") == "none") {
			$(this).next("ul").slideToggle("fast");
		}
	});

	$(".tumu").click(function () {
		$("#tamami").toggle();
	});

	_percent();
	_usKok();
	_kesir();
	_cetvel();
	_altinHesaplama();
	_doviz();
	_chronometer();
	_kpss();
	_lgsTables();
	_yks();

	$("#fromCurrency, #toCurrency, #amount").change(function () {
		_altinHesaplama();
	});
});

function cookie(a, b) {
	if (b === undefined) {
		var aE = a + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") c = c.substring(1, c.length);
			if (c.indexOf(aE) == 0) return c.substring(aE.length, c.length);
		}
		return "";
	} else {
		document.cookie = a + "=" + b + "; path=/";
	}
}

function _percent() {
	$("#sayi_a").on("input", function () {
		hesapla();
	});
	$("#sayi_b").on("input", function () {
		hesapla();
	});
	$("#islem").change(function () {
		$("#aciklamalar > div").hide();
		$("#aciklama_" + $("#islem").val()).show();
		if ($("#islem").val() == "2" || $("#islem").val() == "5") {
			$("#ikinciyuzde").hide();
		} else {
			$("#ikinciyuzde").show();
		}
		hesapla();
	});
	$("#temizle").click(function () {
		$("#sayi_a").val("");
		$("#sayi_b").val("");
		$("#sonuc").html("").hide();
	});

	function hesapla() {
		var b = parseFloat($("#sayi_a").val().replace(",", ".")) || 0;
		var d = parseFloat($("#sayi_b").val().replace(",", ".")) || 0;
		var a = 0;
		var c = 10;
		switch ($("#islem").val()) {
			case "1":
				a = (b * d) / 100;
				break;
			case "2":
				a = 100 * (b / d);
				break;
			case "3":
				a = b * (1 + d / 100);
				break;
			case "4":
				a = b * (1 - d / 100);
				break;
			case "5":
				a = 100 * ((d - b) / Math.abs(b));
				c = 2;
				break;
		}
		try {
			a = a.toPrecision(c);
		} catch (e) {
			a = Math.round(a * Math.pow(10, c)) / Math.pow(10, c);
		}
		if ($("#islem").val() == "2" || $("#islem").val() == "5") {
			a = (a < 0 ? "-%" : "%") + Math.abs(a);
		}
		$("#sonuc").html(a).show();
	}
}

function _usKok() {
	$(".biginput").keypress(function (event) {
		var inputChar = String.fromCharCode(event.which);
		if (inputChar === ",") {
			$(this).val($(this).val() + ".");
		}
		if (event.keyCode !== 39 && event.keyCode !== 37 && event.keyCode !== 8 && "0123456789.-".indexOf(inputChar) === -1) {
			return false;
		}
	});

	$("#karekok_al").keyup(karekok);
	$(".genelkok_al").keyup(genelkok);
	$(".us_al").keyup(usal);
	$(".kus_al").keyup(kusal);

	function kusal() {
		var a = parseFloat($("#kusal_sayi").val()),
			b = parseFloat($("#kusal_us1").val()),
			c = parseFloat($("#kusal_us2").val()),
			result = Math.pow(a, b / c);
		$(".kus_sonuc").css("display", "none");
		if (isNaN(result) || !isFinite(result)) {
			$("#kus_sonuc").html("Hata");
		} else {
			$("#kus_sonuc").html(result);
		}
		$(".kus_sonuc").css("display", "inline-block");
	}

	function usal() {
		var a = parseFloat($("#usal_sayi").val()),
			b = parseFloat($("#usal_us").val()),
			result = Math.pow(a, b);
		$(".us_sonuc").css("display", "none");
		if (isNaN(result) || !isFinite(result)) {
			$("#us_sonuc").html("Hata");
		} else {
			$("#us_sonuc").html(result);
		}
		$(".us_sonuc").css("display", "inline-block");
	}

	function genelkok() {
		var a = parseFloat($("#genelkok_derece").val()),
			b = parseFloat($("#genelkok").val()),
			result = Math.pow(parseFloat(b), 1 / parseFloat(a));
		$(".gk_sonuc").css("display", "none");
		$("#genelkok_derece").val(a);
		$("#genelkok").val(b);
		if (isNaN(result) || !isFinite(result)) {
			$("#genelkok_sonuc").html("Hata");
		} else {
			$("#genelkok_sonuc").html(result);
		}
		$(".gk_sonuc").css("display", "inline-block");
	}

	function karekok() {
		var inputVal = parseFloat($("#karekok_al").val());
		$(".sonucGrup1").css("display", "none");
		$(".sonucGrup2").css("display", "none");
		$("#karekok_al").val(inputVal);
		$(".sonucGrup1").css("display", "inline-block");
		var sqrtVal = Math.sqrt(inputVal);
		if (isNaN(sqrtVal)) {
			$("#karekok_sonuc1").html("Hata");
		} else {
			$("#karekok_sonuc1").html(sqrtVal);
		}

		var factors = [],
			originalInput = inputVal,
			index = -1;

		for (var i = 2; i <= Math.sqrt(originalInput); i++) {
			if (originalInput % i === 0) {
				index++;
				factors[index] = [];
				factors[index][0] = i;
				factors[index][1] = 0;
			}
			while (originalInput % i === 0) {
				factors[index][1]++;
				originalInput /= i;
			}
		}

		if (originalInput !== 1) {
			index++;
			factors[index] = [];
			factors[index][0] = originalInput;
			factors[index][1] = 1;
		}

		var firstProduct = 1;
		for (var i = 0; i < factors.length; i++) {
			while (factors[i][1] >= 2) {
				firstProduct *= factors[i][0];
				factors[i][1] -= 2;
			}
		}

		$("#karekok_sonuc21").html(firstProduct);

		var secondProduct = 1;
		for (var i = 0; i < factors.length; i++) {
			secondProduct *= Math.pow(factors[i][0], factors[i][1]);
		}

		$("#karekok_sonuc22").html(secondProduct);

		if (firstProduct === 1 || secondProduct === 1) {
			return true;
		}

		$(".sonucGrup2").css("display", "inline-block");
	}
}

function _kesir() {
	$("#kesir_islemler span").click(function () {
		$("#kesir_islemler span").removeClass("active");
		$(this).addClass("active");
		hesapla();
	});
	$(".biginput").keypress(function (a) {
		var b = String.fromCharCode(a.which);
		"," == b && $(this).val($(this).val() + ".");
		if (39 != a.keyCode && 37 != a.keyCode && 8 != a.keyCode && -1 == "0123456789.-".indexOf(b)) return !1;
	});
	$(".kesir_isle").keyup(function () {
		hesapla();
	});
	$(".kesir_sade").keyup(function () {
		sadelestir();
	});
	$(".kesir_c1").keyup(function () {
		onlukgoster();
	});
	$(".kesir_c2").keyup(function () {
		kesirligoster();
	});
	$(".kesir_kk").keyup(function () {
		karsilastir();
	});

	function gcd(a, b) {
		var c;
		if (0 == a || 0 == b) return 1;
		0 > b && (b = -b);
		0 > a && (a = -a);
		a < b && ((c = a), (a = b), (b = c));
		for (;;) {
			a %= b;
			if (0 == a) return b;
			b %= a;
			if (0 == b) return a;
		}
	}

	function hesapla() {
		var a = $("#sayi_1").val(),
			b = parseFloat($("#sayi_2").val()),
			c = parseFloat($("#sayi_3").val()),
			d = $("#sayi_4").val(),
			f = parseFloat($("#sayi_5").val()),
			e = parseFloat($("#sayi_6").val()),
			j = $("#kesir_islemler span.active").attr("title");
		"-" == a ? ((a = 0), (b = 0 - b)) : (a = isNaN(parseFloat(a)) ? 0 : parseFloat(a));
		"-" == d ? ((d = 0), (f = 0 - f)) : (d = isNaN(parseFloat(d)) ? 0 : parseFloat(d));
		$(".sonucGrup1").css("display", "none");
		$(".sonucGrup2").css("display", "none");
		$(".sonucGrup3").html("");
		if (isNaN(b) || isNaN(c) || isNaN(f) || isNaN(e)) return !1;
		var g = 0,
			h = 0;
		"+" == j && ((g = parseFloat(e) * [parseFloat(a) * parseFloat(c) + parseFloat(b)] + parseFloat(c) * [parseFloat(d) * parseFloat(e) + parseFloat(f)]), (h = parseFloat(e) * parseFloat(c)));
		"-" == j && ((g = parseFloat(e) * [parseFloat(a) * parseFloat(c) + parseFloat(b)] - parseFloat(c) * [parseFloat(d) * parseFloat(e) + parseFloat(f)]), (h = parseFloat(e) * parseFloat(c)));
		"*" == j && ((g = [parseFloat(a) * parseFloat(c) + parseFloat(b)] * [parseFloat(d) * parseFloat(e) + parseFloat(f)]), (h = parseFloat(e) * parseFloat(c)));
		"/" == j && ((g = [parseFloat(a) * parseFloat(c) + parseFloat(b)] * parseFloat(e)), (h = parseFloat(c) * [parseFloat(d) * parseFloat(e) + parseFloat(f)]));
		a = gcd(Math.abs(g), Math.abs(h));
		0 > g / a ? $("#sonuc_4").html("-") : $("#sonuc_4").html("");
		$("#sonuc_5").html(Math.abs(g / a));
		$("#sonuc_6").html(h / a);
		$("#sonuc_1").html(Math.floor(g / h));
		$("#sonuc_2").html((g - Math.floor(g / h) * h) / a);
		$("#sonuc_3").html(h / a);
		if ("NaN" == $("#sonuc_1").html() || "NaN" == $("#sonuc_2").html()) return $(".sonucGrup3").html("Hata"), !1;
		"0" != $("#sonuc_2").html() && "0" != $("#sonuc_1").html() && $(".sonucGrup1").css("display", "inline-block");
		$(".sonucGrup2").css("display", "inline-block");
	}

	function sadelestir() {
		var a = $("#s_sayi_1").val(),
			b = parseFloat($("#s_sayi_2").val()),
			c = parseFloat($("#s_sayi_3").val());
		"-" == a ? ((a = 0), (b = 0 - b)) : isNaN(parseFloat(a)) ? ((a = 0), $("#s_sayi_1").val("")) : (a = parseFloat(a));
		$("#s_sonuc_1").html("");
		$("#s_sonuc_2").html("");
		$("#s_sonuc_3").html("");
		$(".sonucgrup4").css("display", "none");
		if (isNaN(b) || isNaN(c)) return !1;
		0 != a && (b = parseFloat(a) * parseFloat(c) + parseFloat(b));
		$(".sonucgrup4").css("display", "inline-block");
		a = gcd(b, c);
		0 > Math.floor(b) / a && $("#s_sonuc_1").html("-");
		$("#s_sonuc_2").html(Math.abs(Math.floor(b) / a));
		$("#s_sonuc_3").html(Math.floor(c) / a);
	}

	function onlukgoster() {
		var a = $("#c_sayi_1").val(),
			b = parseFloat($("#c_sayi_2").val()),
			c = parseFloat($("#c_sayi_3").val());
		"-" == a ? ((a = 0), (b = 0 - b)) : isNaN(parseFloat(a)) ? ((a = 0), $("#c_sayi_1").val("")) : (a = parseFloat(a));
		$(".sonucgrup5").css("display", "none");
		if (isNaN(b) || isNaN(c)) return !1;
		$(".sonucgrup5").css("display", "inline-block");
		a = [parseFloat(a) * parseFloat(c) + parseFloat(b)] / parseFloat(c);
		$("#c_sonuc").html(a);
	}

	function kesirligoster() {
		var a = parseFloat($("#c_sayi_8").val());
		$(".sonucGrup6").css("display", "none");
		$(".sonucGrup7").css("display", "none");
		if (isNaN(a)) return !1;
		if (0 == parseFloat(a)) $(".sonucGrup7").css("display", "inline-block"), $("#c_sonuc_1").html("0"), $("#c_sonuc_2").html("0"), $("#c_sonuc_3").html("1"), $("#c_sonuc_4").html(""), $("#c_sonuc_5").html("0"), $("#c_sonuc_6").html("1");
		else {
			var b = String(a).split(".");
			if (2 == b.length) {
				var a = parseFloat(b[0] + b[1]),
					b = Math.pow(10, b[1].length),
					c = gcd(Math.abs(a), Math.abs(b));
				$(".sonucGrup7").css("display", "inline-block");
				0 > a / c ? $("#c_sonuc_4").html("-") : $("#c_sonuc_4").html("");
				$("#c_sonuc_5").html(Math.abs(a / c));
				$("#c_sonuc_6").html(b / c);
				0 != Math.floor(a / b) && $(".sonucGrup6").css("display", "inline-block");
				$("#c_sonuc_1").html(Math.floor(a / b));
				$("#c_sonuc_2").html((a - Math.floor(a / b) * b) / c);
				$("#c_sonuc_3").html(b / c);
			} else $(".sonucGrup6").css("display", "inline-block"), $(".sonucGrup7").css("display", "inline-block"), $("#c_sonuc_1").html(a), $("#c_sonuc_2").html("0"), $("#c_sonuc_3").html("1"), 0 > a ? $("#c_sonuc_4").html("-") : $("#c_sonuc_4").html(""), $("#c_sonuc_5").html(Math.abs(a)), $("#c_sonuc_6").html("1");
		}
	}

	function karsilastir() {
		var a = $("#k_sayi_1").val(),
			b = parseFloat($("#k_sayi_2").val()),
			c = parseFloat($("#k_sayi_3").val()),
			d = $("#kk_sayi_1").val(),
			f = parseFloat($("#kk_sayi_2").val()),
			e = parseFloat($("#kk_sayi_3").val());
		"-" == a ? ((a = 0), (b = 0 - b)) : isNaN(parseFloat(a)) ? ((a = 0), $("#k_sayi_1").val("")) : (a = parseFloat(a));
		"-" == d ? ((d = 0), (f = 0 - f)) : isNaN(parseFloat(d)) ? ((d = 0), $("#kk_sayi_1").val("")) : (d = parseFloat(d));
		$("#k_karsilastir").html("?");
		if (isNaN(b) || isNaN(c) || isNaN(f) || isNaN(e)) return !1;
		a = [parseFloat(a) * parseFloat(c) + parseFloat(b)] / parseFloat(c);
		d = [parseFloat(d) * parseFloat(e) + parseFloat(f)] / parseFloat(e);
		a > d ? $("#k_karsilastir").html(">") : a < d ? $("#k_karsilastir").html("<") : a == d ? $("#k_karsilastir").html("=") : $("#k_karsilastir").html("?");
	}
}

function _cetvel() {
	var Aekran = 0,
		screenWidth = screen.width,
		screenHeight = screen.height;
	$("#screenWidth").val(screenWidth);
	$("#screenHeight").val(screenHeight);
	$("#ekranCozunurlugu").html(screen.width + "x" + screen.height + " piksel");
	$("#ekranBoyutuMenu .okButton").click(function () {
		var a = parseFloat($("#ozelEkranBoyutu").val());
		isNaN(a) ? alert("Ekran boyutu ge\u00e7ersiz") : ayarla(a);
	});
	$("#ekranCozunurluguAyar .okButton").click(function () {
		var a = parseFloat($("#screenWidth").val()),
			b = parseFloat($("#screenHeight").val());
		isNaN(a) || isNaN(b) ? alert("Ekran \u00e7\u00f6z\u00fcn\u00fcrl\u00fc\u011f\u00fc ge\u00e7ersiz") : ($("#screenWidth").val(a), $("#screenHeight").val(b), (screenWidth = a), (screenHeight = b), $("#ekranCozunurlugu").html(a + "x" + b + " piksel"), ayarla(Aekran), $("#ekranCozunurluguAyar").hide());
	});
	$("#ekranBoyutuMenu > div").click(function () {
		var a = parseFloat($(this).text().replace("'", ""));
		isNaN(a) ? alert("Ekran boyutu ge\u00e7ersiz") : ayarla(a);
	});
	$("#cetvelSifirla").click(function () {
		$("#cetvel").css("width", "700px").css("left", "");
		$.cookie("cetvel", "");
		$("#ekranBoyutu").html("Se\u00e7iniz");
		$("#ozelEkranBoyutu").val("");
	});
	function ayarla(a) {
		Aekran = a;
		var b = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight),
			b = Math.round(12.3 * (b / a));
		cookie("cetvel", a);
		$("#ekranBoyutuMenu").hide();
		$("#ozelEkranBoyutu").val(a);
		$("#ekranBoyutu").html(a + "''");
		a = $(window).width() > b + 15 ? ($(window).width() - b) / 2 : 0;
		$("#cetvel")
			.css("left", a + "px")
			.css("width", b + "px");
	}
	"" != cookie("cetvel") ? ayarla(cookie("cetvel")) : $("#ekranBoyutuMenu").slideDown("slow");
}

function _altinHesaplama() {
	$('input[name="processType"]').change(function () {
		var selectedValue = $(this).val();

		if (selectedValue === "1") {
			$(".goldTypeInput").insertBefore($(".amountInput"));
			$(".amountInput").show();
			$(".tutarLabel").text("Miktar");
			$(".altinTuruLabel").text("Altın Türü");
		} else if (selectedValue === "2") {
			$(".goldTypeInput").insertAfter($(".amountInput"));
			$(".amountInput").show();
			$(".tutarLabel").text("Tutar");
			$(".altinTuruLabel").text("Altın Türü");
		}
	});
}

function _doviz() {
	var baseCurrency = "TRY";
	var baseValue = 100;

	function updateExchangeRates(currency) {
		var apiURL = "https://coinyep.com/api/v1/?list=" + currency + "&currency=" + baseCurrency;

		$.getJSON(apiURL, function (data) {
			var rate = parseFloat(data[0].price);
			$(".currencyInput[name=" + currency + "]").val((baseValue / rate).toFixed(2));
		});
	}

	$(".currencyInput").on("input", function () {
		var inputVal = $(this).val();
		var numericVal = parseFloat(inputVal);
		if (isNaN(numericVal) || inputVal.trim() === "") {
			$(this).val("");
			return;
		}
		baseValue = numericVal;
		baseCurrency = $(this).attr("name");
		$(".currencyInput")
			.not(this)
			.each(function () {
				var currency = $(this).attr("name");
				updateExchangeRates(currency);
			});
	});

	$(".currencyInput").on("input", function () {
		$(".currencyInput")
			.not(this)
			.each(function () {
				var currency = $(this).attr("name");
				updateExchangeRates(currency);
			});
	});

	$(".currencyInput").on("keypress", function (event) {
		var keyCode = event.which;
		if (keyCode !== 8 && keyCode !== 0 && (keyCode < 48 || keyCode > 57) && keyCode !== 46) {
			event.preventDefault();
		}
		var inputVal = $(this).val();
		if (keyCode === 46 && inputVal.indexOf(".") !== -1) {
			event.preventDefault();
		}
	});

	$(".currencyInput").each(function () {
		var inputVal = $(this).val();
		var numericVal = parseFloat(inputVal);
		if (isNaN(numericVal) || inputVal.trim() === "") {
			$(this).val("");
			return;
		}
		baseValue = numericVal;
		baseCurrency = $(this).attr("name");
		$(".currencyInput")
			.not(this)
			.each(function () {
				var currency = $(this).attr("name");
				updateExchangeRates(currency);
			});
	});
}

function _chronometer() {
	var timer;
	var timer2;
	var startTime;
	var lapStartTime;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	var milliseconds = 0;
	var lapHours = 0;
	var lapMinutes = 0;
	var lapSeconds = 0;
	var lapMilliseconds = 0;
	var lapCount = 1; // Lap counter

	var laps = []; // Array to store laps

	var savedLaps = JSON.parse(getCookie("laps"));
	if (savedLaps) {
		laps = savedLaps;
		refreshLapTable(); // Update lap table
		$(".lapHistory").show(); // Show lap history
	}

	function updateTimer() {
		var currentTime = new Date().getTime();
		var elapsedTime = currentTime - startTime;

		hours = Math.floor(elapsedTime / (1000 * 60 * 60));
		elapsedTime %= 1000 * 60 * 60;
		minutes = Math.floor(elapsedTime / (1000 * 60));
		elapsedTime %= 1000 * 60;
		seconds = Math.floor(elapsedTime / 1000);
		milliseconds = Math.floor((elapsedTime % 1000) / 100); // Get only the first digit of milliseconds

		var timerText = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + "<span class='millisecond'>" + milliseconds + "</span>";

		$(".timer").html(timerText);
	}

	function updateLapTimer() {
		var currentTime = new Date().getTime();
		var elapsedTime = currentTime - lapStartTime;

		lapHours = Math.floor(elapsedTime / (1000 * 60 * 60));
		elapsedTime %= 1000 * 60 * 60;
		lapMinutes = Math.floor(elapsedTime / (1000 * 60));
		elapsedTime %= 1000 * 60;
		lapSeconds = Math.floor(elapsedTime / 1000);
		lapMilliseconds = Math.floor((elapsedTime % 1000) / 100);

		var timerText = (lapHours < 10 ? "0" + lapHours : lapHours) + ":" + (lapMinutes < 10 ? "0" + lapMinutes : lapMinutes) + ":" + (lapSeconds < 10 ? "0" + lapSeconds : lapSeconds) + "<span class='millisecond'>" + lapMilliseconds + "</span>";

		$(".timer2").html(timerText);
	}

	$(".start").click(function () {
		startTime = new Date().getTime();
		lapStartTime = startTime;
		timer = setInterval(updateTimer, 10); // 10 ms interval for milliseconds
		timer2 = setInterval(updateLapTimer, 10); // 10 ms interval for lap timer
		$(".start").hide();
		$(".reset").hide();
		$(".stop").show();
		$(".skipLap").show();
		$(".timer2").show();
	});

	$(".stop").click(function () {
		clearInterval(timer);
		clearInterval(timer2);
		pausedTime = new Date().getTime();
		pausedTime2 = new Date().getTime();
		$(".stop").hide();
		$(".start").hide();
		$(".skipLap").hide();
		$(".reset").show();
		$(".resume").show();
	});

	$(".resume").click(function () {
		var currentTime = new Date().getTime();
		var elapsedTime = currentTime - pausedTime;
		startTime += elapsedTime;
		timer = setInterval(updateTimer, 10);
		pausedTime2 += elapsedTime;
		timer2 = setInterval(updateLapTimer, 10);
		$(".stop").show();
		$(".skipLap").show();
		$(".resume").hide();
		$(".start").hide();
		$(".reset").hide();
	});

	$(".reset").click(function () {
		$(".lapHistory").hide();
		$(".resume").hide();
		$(".start").show();
		$(".reset").hide();
		clearInterval(timer);
		clearInterval(timer2);
		hours = 0;
		minutes = 0;
		seconds = 0;
		milliseconds = 0;
		lapHours = 0;
		lapMinutes = 0;
		lapSeconds = 0;
		lapMilliseconds = 0;
		pausedTime2 = 0;
		$(".timer").html("00:00:00<span class='millisecond'>0</span>");
		$(".timer2").html("00:00:00<span class='millisecond'>0</span>");
		document.title = "Chronometer"; // Reset page title to default value
		laps = []; // Reset lap data
		refreshLapTable(); // Update lap table
		saveLapsToCookie(); // Save laps array to cookie in JSON format
	});

	$(".skipLap").click(function () {
		var lapTime = $(".timer2").text(); // Get lap time from timer2
		var lap = {
			lapNo: lapCount++,
			lapTime: lapTime,
			elapsedTime: $(".timer").text(),
			time: formatDate(new Date()),
		};
		laps.push(lap); // Push new lap to array
		refreshLapTable(); // Update lap table
		saveLapsToCookie(); // Save lap data to cookie
		clearInterval(timer2);
		lapStartTime = new Date().getTime();
		timer2 = setInterval(updateLapTimer, 10);
		$(".lapHistory").show();
	});

	function refreshLapTable() {
		var tableBody = $(".lapTable tbody");
		tableBody.empty();

		laps.forEach(function (lap) {
			var row = "<tr><td>" + lap.lapNo + "</td><td>" + lap.lapTime + "</td><td>" + lap.elapsedTime + "</td><td>" + lap.time + "</td></tr>";
			tableBody.append(row);
		});
	}

	$(".download").click(function () {
		var csvContent = "data:text/csv;charset=utf-8,";
		csvContent += "Lap No,Lap Time,Elapsed Time,Time\n";
		laps.forEach(function (lap) {
			csvContent += lap.lapNo + "," + lap.lapTime + "," + lap.elapsedTime + "," + lap.time + "\n";
		});

		// Download CSV file
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "laps.csv");
		document.body.appendChild(link);
		link.click();
	});

	function formatDate(date) {
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var hours = date.getHours();
		var minutes = date.getMinutes();

		return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year + " - " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
	}

	function saveLapsToCookie() {
		setCookie("laps", JSON.stringify(laps), 30);
	}

	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	function setCookie(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	}
}

$(document).ready(function () {
	hideFields();
	checkSelected();
	setRequired();

	$("#hesaplama_turu").change(function () {
		hideFields();
		checkSelected();
		setRequired();

		$("#normal_fiyat").val("");
		$("#indirimli_fiyat").val("");
		$("#indirim_orani").val("");
	});

	function hideFields() {
		$("#normal_fiyat").closest("tr").hide();
		$("#indirimli_fiyat").closest("tr").hide();
		$("#indirim_orani").closest("tr").hide();
	}

	function checkSelected() {
		var selectedValue = $("#hesaplama_turu").val();
		if (selectedValue == "1") {
			$("#indirimli_fiyat").closest("tr").show();
			$("#indirim_orani").closest("tr").show();
		} else if (selectedValue == "2") {
			$("#normal_fiyat").closest("tr").show();
			$("#indirim_orani").closest("tr").show();
		} else if (selectedValue == "3") {
			$("#normal_fiyat").closest("tr").show();
			$("#indirimli_fiyat").closest("tr").show();
		}
	}

	function setRequired() {
		var selectedValue = $("#hesaplama_turu").val();
		if (selectedValue == "1") {
			$("#indirimli_fiyat").attr("required", "required");
			$("#indirim_orani").attr("required", "required");
		} else if (selectedValue == "2") {
			$("#normal_fiyat").attr("required", "required");
			$("#indirim_orani").attr("required", "required");
		} else if (selectedValue == "3") {
			$("#normal_fiyat").attr("required", "required");
			$("#indirimli_fiyat").attr("required", "required");
		}
	}

	$('input[name="asgari_bir"]').change(function () {
		if ($(this).val() === "diger") {
			$("#txtPassportNumber1").prop("disabled", false).prop("required", true);
		} else {
			$("#txtPassportNumber1").prop("disabled", true).prop("required", false);
		}
	});

	// 2.AY BRÜT MAAŞ kontrolü
	$('input[name="asgari_iki"]').change(function () {
		if ($(this).val() === "diger") {
			$("#txtPassportNumber2").prop("disabled", false).prop("required", true);
		} else {
			$("#txtPassportNumber2").prop("disabled", true).prop("required", false);
		}
	});

	$('input[name="asgari_uc"]').change(function () {
		if ($(this).val() === "diger") {
			$("#txtPassportNumber3").prop("disabled", false).prop("required", true);
		} else {
			$("#txtPassportNumber3").prop("disabled", true).prop("required", false);
		}
	});

	$('input[name="asgari_dort"]').change(function () {
		if ($(this).val() === "diger") {
			$("#txtPassportNumber4").prop("disabled", false).prop("required", true);
		} else {
			$("#txtPassportNumber4").prop("disabled", true).prop("required", false);
		}
	});
});

function _kpss() {
	$(".puanType").change(function () {
		var selectedValue = $(this).val();
		doControl(selectedValue);
	});

	$(".oabtalan").change(function () {
		var selectedValue = $(this).val();
		doControlOabtalan(selectedValue);
	});

	function doControl(selectedValue) {
		if (selectedValue === "1") {
			$(".result").fadeOut();
			$(".result1").fadeIn();
			$(".onlyEgitim").fadeOut();
			$(".onlyDin").fadeOut();
			$(".insertTable").find(".lisans").fadeIn();
			$(".insertTable").find(".egitim").fadeOut();
			$(".insertTable").find(".egitim2").fadeOut();
			$(".insertTable").find(".din").fadeOut();
		} else if (selectedValue === "2") {
			$(".result").fadeOut();
			$(".result2").fadeIn();
			$(".onlyEgitim").fadeIn();
			$(".onlyDin").fadeOut();
			$(".insertTable").find(".egitim").fadeIn();
			$(".insertTable").find(".lisans").fadeOut();
			$(".insertTable").find(".din").fadeOut();
		} else if (selectedValue === "3") {
			$(".result").fadeOut();
			$(".result3").fadeIn();
			$(".onlyEgitim").fadeOut();
			$(".onlyDin").fadeIn();
			$(".insertTable").find(".din").fadeIn();
			$(".insertTable").find(".egitim").fadeOut();
			$(".insertTable").find(".egitim2").fadeOut();
			$(".insertTable").find(".lisans").fadeOut();
		}
	}

	function doControlOabtalan(selectedValue) {
		if (selectedValue !== "0") {
			$(".insertTable").find(".egitim2").fadeIn();
		} else {
			$(".insertTable").find(".egitim2").fadeOut();
		}
	}

	doControl($(".puanType").val());
	doControlOabtalan($(".oabtalan").val());

	var maxTotals = {
		YDS: 100,
		"Genel Yetenek": 60,
		"Genel Kültür": 60,
		"DHBT-1": 20,
		"DHBT-2": 20,
		"Eğitim Bilimleri": 80,
		"ÖABT (Alan Bilgisi)": 75,
		Hukuk: 40,
		İktisat: 40,
		İşletme: 40,
		Maliye: 40,
		Muhasebe: 40,
		"Çalışma Ekonomisi": 40,
		İstatistik: 40,
		"Kamu Yönetimi": 40,
		"Uluslararası İlişkiler": 40,
	};

	var maxTotals = {
		YDS: 100,
		"Genel Yetenek": 60,
		"Genel Kültür": 60,
		"DHBT-1": 20,
		"DHBT-2": 20,
		"Eğitim Bilimleri": 80,
		"ÖABT (Alan Bilgisi)": 75,
		Hukuk: 40,
		İktisat: 40,
		İşletme: 40,
		Maliye: 40,
		Muhasebe: 40,
		"Çalışma Ekonomisi": 40,
		İstatistik: 40,
		"Kamu Yönetimi": 40,
		"Uluslararası İlişkiler": 40,
	};

	$('.insertTable input[type="number"]').on("input", function () {
		var totalCorrect = 0;
		var totalIncorrect = 0;
		var selectedLesson = $(this).closest("tr").find("td:first").text();

		$(this)
			.closest("tr")
			.find('input[name$="dogru"]')
			.each(function () {
				totalCorrect += parseInt($(this).val()) || 0;
			});

		$(this)
			.closest("tr")
			.find('input[name$="yanlis"]')
			.each(function () {
				totalIncorrect += parseInt($(this).val()) || 0;
			});

		var total = totalCorrect + totalIncorrect;
		var maxTotal = maxTotals[selectedLesson];

		if (total > maxTotal) {
			alert(selectedLesson + " Toplam Soru Sayısı " + maxTotal + " Olmalıdır.");
			$(this).closest("tr").find('input[type="number"]').val("0");
		}
	});
}

function _lgsTables() {
	// Input field click event handler
	$("input").click(function () {
		this.select();
	});

	// % Calculate
	function calculatePercentageScore(lgs_score, totalStudent) {
		var percentage_score = (lgs_score / 500) * 100;
		var a = (totalStudent * percentage_score) / 100;
		var b = totalStudent - (a + 1);
		var c = (b * 100) / totalStudent;

		return c.toFixed(4);
	}

	// Function to calculate LGS score
	function calculateLGS() {
		// Retrieve input values
		var td = Number($('input[name="td"]').val()); // Türkçe doğru sayısı
		var ty = Number($('input[name="ty"]').val()); // Türkçe yanlış sayısı
		var id = Number($('input[name="id"]').val()); // T.C. İnkılap Tarihi doğru sayısı
		var iy = Number($('input[name="iy"]').val()); // T.C. İnkılap Tarihi yanlış sayısı
		var dd = Number($('input[name="dd"]').val()); // Din Kültürü A.B. doğru sayısı
		var dy = Number($('input[name="dy"]').val()); // Din Kültürü A.B. yanlış sayısı
		var yd = Number($('input[name="yd"]').val()); // Yabancı Dil doğru sayısı
		var yy = Number($('input[name="yy"]').val()); // Yabancı Dil yanlış sayısı
		var md = Number($('input[name="md"]').val()); // Matematik doğru sayısı
		var my = Number($('input[name="my"]').val()); // Matematik yanlış sayısı
		var fd = Number($('input[name="fd"]').val()); // Fen Bilimleri doğru sayısı
		var fy = Number($('input[name="fy"]').val()); // Fen Bilimleri yanlış sayısı

		// Calculate net scores for each subject
		var tn = td - ty / 3;
		var in_ = id - iy / 3;
		var dn = dd - dy / 3;
		var yn = yd - yy / 3;
		var mn = md - my / 3;
		var fn = fd - fy / 3;

		// Calculate total correct and incorrect answers
		var tod = td + id + dd + yd + md + fd; // Total correct answers
		var toy = ty + iy + dy + yy + my + fy; // Total incorrect answers

		// Update input fields with total correct and incorrect answers
		$('input[name="tod"]').val(tod);
		$('input[name="toy"]').val(toy);

		// Calculate LGS score
		var lgs_score = tn * 4.348684 + in_ * 1.666508 + dn * 1.899422 + yn * 1.507575 + mn * 4.253881 + fn * 4.123078 + 194.7522;

		// Update input field with LGS score
		$('input[name="sp"]').val(lgs_score.toFixed(4));
	}

	// Attach keyup and click event handlers to input fields
	$("input").keyup(calculateLGS);
	$("input").click(calculateLGS);

	function inputLoop() {
		var tn = Number(($('input[name="td"]').val() - $('input[name="ty"]').val() / 3).toFixed(2)); // Türkçe net
		var in_ = Number(($('input[name="id"]').val() - $('input[name="iy"]').val() / 3).toFixed(2)); // T.C. İnkılap Tarihi net
		var dn = Number(($('input[name="dd"]').val() - $('input[name="dy"]').val() / 3).toFixed(2)); // Din Kültürü net
		var yn = Number(($('input[name="yd"]').val() - $('input[name="yy"]').val() / 3).toFixed(2)); // Yabancı Dil net
		var mn = Number(($('input[name="md"]').val() - $('input[name="my"]').val() / 3).toFixed(2)); // Matematik net
		var fn = Number(($('input[name="fd"]').val() - $('input[name="fy"]').val() / 3).toFixed(2)); // Fen Bilimleri net

		var ton = tn + in_ + dn + yn + mn + fn;

		$('input[name="tn"]').val(tn);
		$('input[name="in"]').val(in_);
		$('input[name="dn"]').val(dn);
		$('input[name="yn"]').val(yn);
		$('input[name="mn"]').val(mn);
		$('input[name="fn"]').val(fn);
		$('input[name="ton"]').val(ton);

		maxQ("td", "ty", 20, "tn");
		maxQ("id", "iy", 10, "in");
		maxQ("dd", "dy", 10, "dn");
		maxQ("yd", "yy", 10, "yn");
		maxQ("md", "my", 20, "mn");
		maxQ("fd", "fy", 20, "fn");
		maxQ("tod", "toy", 90, "ton");
	}

	$("input").keyup(inputLoop);
	$("input").click(inputLoop);

	function maxQ(d, y, soruSayisi, n) {
		if (!(0 <= Number($('input[name="' + d + '"]').val()))) {
			$('input[name="' + d + '"]').val(0);
		}

		if (!(0 <= Number($('input[name="' + y + '"]').val()))) {
			$('input[name="' + y + '"]').val(0);
		}

		if (Number($('input[name="' + d + '"]').val()) + Number($('input[name="' + y + '"]').val()) > Number(soruSayisi)) {
			$('input[name="' + d + '"]').val(soruSayisi);
			$('input[name="' + y + '"]').val(0);
		}

		$('input[name="' + d + '"]').val(Number($('input[name="' + d + '"]').val()));
		$('input[name="' + y + '"]').val(Number($('input[name="' + y + '"]').val()));
	}
}

function _yks() {
	$(".dogru").change(function () {
		let dogruvalue = parseFloat($(this).val());
		let yanlisvalue = parseFloat($(this).closest("tr").find(".yanlis").val() || 0);
		let netvalue = dogruvalue - yanlisvalue / 4;
		$(this).closest("tr").find(".net").val(netvalue);
	});

	$(".yanlis").change(function () {
		let yanlisvalue = parseFloat($(this).val());
		let dogruvalue = parseFloat($(this).closest("tr").find(".dogru").val() || 0);
		let netvalue = dogruvalue - yanlisvalue / 4;
		$(this).closest("tr").find(".net").val(netvalue);
	});
}

function createCountdownTimer(targetDate, listDateVariable) {
	setInterval(function () {
		var currentDate = new Date();
		var difference = targetDate - currentDate;

		var days = Math.floor(difference / (1000 * 60 * 60 * 24));
		var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((difference % (1000 * 60)) / 1000);

		$(".countdown-item.day .countdown-value").text(days);
		$(".countdown-item.hour .countdown-value").text(hours);
		$(".countdown-item.minute .countdown-value").text(minutes);
		$(".countdown-item.second .countdown-value").text(seconds);

		$(".listDate").text(listDateVariable);
	}, 1000);
}

function initializeCountdown(countdownDate, containerID) {
	var countdown = {
		countdown_to: countdownDate,
		rings: {
			GÜN: {
				s: 86400000,
				max: 365,
			},
			SAAT: {
				s: 3600000,
				max: 24,
			},
			DAKİKA: {
				s: 60000,
				max: 60,
			},
			SANİYE: {
				s: 1000,
				max: 60,
			},
		},
		r_count: 4,
		r_spacing: 10,
		r_size: 150,
		r_thickness: 7,
		update_interval: 11,

		init: function () {
			var $r = this;
			$r.cvs = $('<canvas id="countdownCanvas"></canvas>');
			$r.size = {
				w: ($r.r_size + $r.r_thickness) * $r.r_count + $r.r_spacing * ($r.r_count - 1),
				h: $r.r_size + $r.r_thickness,
			};
			$r.cvs.attr("width", $r.size.w);
			$r.cvs.attr("height", $r.size.h);
			$r.ctx = $r.cvs[0].getContext("2d");
			$(containerID).append($r.cvs);
			$r.cvs.css({ width: $r.size.w + "px", height: $r.size.h + "px" });
			$r.ctx.textAlign = "center";
			$r.actual_size = $r.r_size + $r.r_thickness;
			$r.countdown_to_time = new Date($r.countdown_to).getTime();
			$r.go();
		},
		ctx: null,
		go: function () {
			var $r = this;
			var idx = 0;
			$r.time = new Date().getTime() - $r.countdown_to_time;
			for (var r_key in $r.rings) $r.unit(idx++, r_key, $r.rings[r_key]);
			setTimeout(function () {
				$r.go();
			}, $r.update_interval);
		},
		unit: function (idx, label, ring) {
			var $r = this;
			var x,
				y,
				value,
				ring_secs = ring.s;
			value = parseFloat($r.time / ring_secs);
			$r.time -= Math.round(parseInt(value)) * ring_secs;
			value = Math.abs(value);
			x = $r.r_size * 0.5 + $r.r_thickness * 0.5;
			x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
			y = $r.r_size * 0.5;
			y += $r.r_thickness * 0.5;
			var degrees = 360 - (value / ring.max) * 360.0;
			var endAngle = degrees * (Math.PI / 180);
			$r.ctx.save();
			$r.ctx.translate(x, y);
			$r.ctx.clearRect($r.actual_size * -0.5, $r.actual_size * -0.5, $r.actual_size, $r.actual_size);
			$r.ctx.strokeStyle = "rgba(128,128,128,0.2)";
			$r.ctx.beginPath();
			$r.ctx.arc(0, 0, $r.r_size / 2, 0, 2 * Math.PI, 2);
			$r.ctx.lineWidth = $r.r_thickness;
			$r.ctx.stroke();
			$r.ctx.strokeStyle = "rgba(253, 128, 1, 0.9)";
			$r.ctx.beginPath();
			$r.ctx.arc(0, 0, $r.r_size / 2, 0, endAngle, 1);
			$r.ctx.lineWidth = $r.r_thickness;
			$r.ctx.stroke();
			$r.ctx.fillStyle = "#000";
			$r.ctx.font = "12px Helvetica";
			$r.ctx.fillText(label, 0, 23);
			$r.ctx.fillText(label, 0, 23);
			$r.ctx.font = "bold 40px Helvetica";
			$r.ctx.fillText(Math.floor(value), 0, 10);
			$r.ctx.restore();
		},
	};

	countdown.init();
}

$(document).ready(function () {
	function toggleFields() {
		if ($("#dogum_izin_bitis").is(":checked") || $("#dogum_izin_ucret").is(":checked")) {
			$(".izin_tarih").show();
		} else {
			$(".izin_tarih").hide();
		}

		if ($("#dogum_izin_ucret").is(":checked")) {
			$(".izin_ucret").show();
		} else {
			$(".izin_ucret").hide();
		}
	}

	$("#dogum_izin_bitis, #dogum_izin_ucret").change(function () {
		toggleFields();
	});

	toggleFields();
});

$(document).ready(function () {
	$("#calisma_suresi").change(function () {
		if ($(this).is(":checked")) {
			$(".calisma_saati").show();
		} else {
			$(".calisma_saati").hide();
		}
	});

	// Sayfa yüklendiğinde checkbox işaretliyse göster
	if ($("#calisma_suresi").is(":checked")) {
		$(".calisma_saati").show();
	} else {
		$(".calisma_saati").hide();
	}
});

$(document).ready(function () {
	$("#dosya_turu").change(function () {
		var dosyaTuru = $(this).val();
		if (dosyaTuru === "İlamsız dosya") {
			$(".ilamsiz_input").show();
		} else {
			$(".ilamsiz_input").hide();
		}
	});

	var initialDosyaTuru = $("#dosya_turu").val();
	if (initialDosyaTuru === "İlamsız dosya") {
		$(".ilamsiz_input").show();
	} else {
		$(".ilamsiz_input").hide();
	}
});

$(document).ready(function () {
	function kontrolEt() {
		var islem = $('input[name="islem"]:checked').val();
		$(".tutar_input, .mesafe_input, .ortalama_tuketim_input").hide();

		if (islem === "odenen_tutar_mesafe") {
			$(".tutar_input").show();
			$(".mesafe_input").show();
		} else if (islem === "odenen_tutar_ortalama_tuketim") {
			$(".tutar_input").show();
			$(".ortalama_tuketim_input").show();
		} else if (islem === "gidilecek_mesafe_ortalama_tuketim") {
			$(".mesafe_input").show();
			$(".ortalama_tuketim_input").show();
		}

		// Yakıt litre fiyatı kontrolü
		if ($("#yakit_litre_fiyati").is(":checked")) {
			$(".litre_fiyati_input").show();
		} else {
			$(".litre_fiyati_input").hide();
		}
	}

	// Sayfa yüklenirken mevcut durumu kontrol et
	kontrolEt();

	// İşlem seçimi değiştiğinde kontrol et
	$('input[name="islem"]').change(function () {
		kontrolEt();
	});

	// Yakıt litre fiyatı seçimi değiştiğinde kontrol et
	$("#yakit_litre_fiyati").change(function () {
		kontrolEt();
	});
});
