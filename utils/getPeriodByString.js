const periodRules = {
	ms: 1000,
	get s() { return this.ms * 60 },
	get m() { return this.s * 60 },
	get h() { return this.m * 60 },
	get d() { return this.h * 24 },
}

/**
 * Convert period to microseconds.
 * @function getPeriodByString2
 * @param {string} period - Period. For example: 10s | 15m | 25h | 3d
 * @returns {number|string} - Period in microseconds
 */
module.exports = function getPeriodByString(period) {
	const num = +period.match(/\d+/)[0];
	const timeType = period.match(/[A-Za-z]+/)[0];

	return (periodRules[timeType] && num) ? num * periodRules[timeType] : period;
}
