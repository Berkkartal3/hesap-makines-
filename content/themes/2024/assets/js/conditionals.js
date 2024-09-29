(function ($) {
	SARE = {
		processing: false,
		init: function () {
			this.init_conditions();
		},
		condition_objects: function () {
			return 'select, input[type="radio"]:checked, input[type="text"],input[type="number"], input[type="hidden"], input.ot-numeric-slider-hidden-input';
		},
		match_conditions: function (condition) {
			var match;
			var regex = /(.+?):(is|not|contains|less_than|less_than_or_equal_to|greater_than|greater_than_or_equal_to)\((.*?)\),?/g;
			var conditions = [];

			while ((match = regex.exec(condition))) {
				var rule = match[2];
				var values = match[3].split(",").map(function (value) {
					return value.trim();
				});

				if (rule === "contains" && values.length > 1) {
					values.forEach(function (val) {
						conditions.push({
							check: match[1],
							rule: rule,
							values: [val], // Each value is pushed separately
						});
					});
				} else {
					conditions.push({
						check: match[1],
						rule: rule,
						values: values,
					});
				}
			}

			return conditions;
		},

		parse_condition: function () {
			$('.formController[id^="setting_"][data-condition]').each(function () {
				var passed;
				var conditionString = $(this).data("condition");
				var conditionsList = conditionString.split(" or ");
				var operator = ($(this).data("operator") || "and").toLowerCase();

				$.each(conditionsList, function (index, condition) {
					var conditions = SARE.match_conditions(condition);

					$.each(conditions, function (index, condition) {
						var target = $("#setting_" + condition.check);
						var targetEl = !!target.length && target.find(SARE.condition_objects()).first();

						if (!target.length || (!targetEl.length && condition.values.length > 0)) {
							return;
						}

						var v1 = targetEl.length ? targetEl.val().toString() : "";
						var result = false;

						switch (condition.rule) {
							case "less_than":
								result = parseInt(v1) < parseInt(condition.values[0]);
								break;
							case "less_than_or_equal_to":
								result = parseInt(v1) <= parseInt(condition.values[0]);
								break;
							case "greater_than":
								result = parseInt(v1) > parseInt(condition.values[0]);
								break;
							case "greater_than_or_equal_to":
								result = parseInt(v1) >= parseInt(condition.values[0]);
								break;
							case "contains":
								result = condition.values.includes(v1);
								break;
							case "is":
								result = condition.values.includes(v1);
								break;
							case "not":
								result = !condition.values.includes(v1);
								break;
						}

						if (result) {
							passed = true;
							return false; // Break out of the inner loop
						} else {
							passed = false;
						}
					});

					if (passed) {
						return false; // Break out of the outer loop
					}
				});

				if (passed) {
					$(this).animate({ opacity: "show", height: "show" }, 200);
				} else {
					$(this).animate({ opacity: "hide", height: "hide" }, 200);
				}
			});
		},
		init_conditions: function () {
			var delay = (function () {
				var timer = 0;
				return function (callback, ms) {
					clearTimeout(timer);
					timer = setTimeout(callback, ms);
				};
			})();

			$('.formController[id^="setting_"]').on("change.conditionals, keyup.conditionals", SARE.condition_objects(), function (e) {
				if (e.type === "keyup") {
					// handle keyup event only once every 500ms
					delay(function () {
						SARE.parse_condition();
					}, 500);
				} else {
					SARE.parse_condition();
				}
			});
			SARE.parse_condition();
		},
	};
	$(document).ready(function () {
		SARE.init();
	});
})(jQuery);
