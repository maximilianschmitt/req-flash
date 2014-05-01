'use strict';

var _flash = function(container, key, message) {
	if (typeof key === 'undefined' && typeof message === 'undefined') {
		return container;
	} else if (typeof message === 'undefined') {
		return container[key];
	} else {
		container[key] = message;
	}
};

var _clear = function(hijack, req, res) {
	req.session._flash = {};

	hijack.apply(res, Array.prototype.slice.call(arguments).slice(3));
};

var flash = function(req, res, next) {
	if (!req.session) throw new Error('Sessions are required.');

	if (typeof req.session._flash === 'undefined') req.session._flash = {};

	req.flash = _flash.bind(null, req.session._flash);
	res.render = _clear.bind(null, res.render, req, res);
	res.send = _clear.bind(null, res.send, req, res);

	next();
};

module.exports = function() {
	return flash;
};