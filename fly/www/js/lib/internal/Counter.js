/*global define */
define(function () {

	function Counter(trueCount, length) {

		this.attr = {
			count: 0,
			trueCount: trueCount,
			length: length
		};

	}

	Counter.prototype.getValue = function () {

		var counter = this,
			attr = counter.attr,
			value = attr.count < attr.trueCount;

		attr.count += 1;

		if (attr.count >= attr.length) {
			attr.count = 0;
		}

		return value;

	};

	return Counter;

});
