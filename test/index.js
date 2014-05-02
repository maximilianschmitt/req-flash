/* global describe, it, before, after */
'use strict';

var superagent = require('superagent');
var expect     = require('chai').expect;

var app        = require('../examples/app');
var port       = 8888;
var url        = 'http://localhost:' + port;

describe('req-flash', function() {
	var agent = superagent.agent();
	var server;

	before(function() {
		server = app.listen(port);
	});

	after(function(done) {
		server.close(done);
	});

	it('should add a single flash message', function(done) {
		agent.get(url)
		.redirects(1)
		.end(function(err, res) {
			var data = JSON.parse(res.text);

			expect(res.statusCode).to.equal(200);
			expect(data.message).to.equal('index');

			done();
		});
	});

	it('should add multiple flash messages', function(done) {
		agent.get(url + '/multiple')
		.redirects(1)
		.end(function(err, res) {
			var data = JSON.parse(res.text);

			expect(res.statusCode).to.equal(200);
			expect(data.successMessage).to.equal('a message about success');
			expect(data.errorMessage).to.equal('a message about failure');

			done();
		});
	});

	it('should not stack multiple messages of the same type into an array', function(done) {
		agent.get(url + '/stack')
		.redirects(1)
		.end(function(err, res) {
			var data = JSON.parse(res.text);

			expect(res.statusCode).to.equal(200);
			expect(data.successMessage).to.equal('a second message');

			done();
		});
	});

	it('should clear flash messages', function(done) {
		agent.get(url + '/stack')
		.redirects(1)
		.end(function() {
			agent.get(url + '/flash')
			.redirects(0)
			.end(function(err, res) {
				expect(res.text).to.equal('{}');

				done();
			});
		});
	});

	it('should pass flash messages to the view automatically', function(done) {
		agent.get(url + '/view')
		.redirects(1)
		.end(function(err, res) {
			expect(res.text).to.contain('You are viewing a flash message inside a view.');

			done();
		});
	});
});