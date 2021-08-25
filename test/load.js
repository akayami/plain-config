const fs = require('fs-extra');
const async = require('async');
const path = require('path');
const testDir = '/tmp/test/' + process.pid;

const plain = require('../lib/loader.js');


describe('Basic Loading', function() {

	it('Needs to handle legacy files', (done) => {
		const base = path.resolve(testDir, 'base.js');
		const extend = path.resolve(testDir, 'extend1.js');
		if(plain([base, extend]).item !== 'new') {
			done('Failed to detect correct value');
		} else {
			done();
		}
	});
	it('Needs to handle new files', (done) => {
		const base = path.resolve(testDir, 'base.js');
		const extend = path.resolve(testDir, 'extend2.js');
		if(plain([base, extend]).item !== 'new2') {
			done('Failed to detect correct value');
		} else {
			done();
		}
	});

	it('Needs to handle mix of old and new files', (done) => {
		const base = path.resolve(testDir, 'base.js');
		const extend1 = path.resolve(testDir, 'extend1.js');
		const extend2 = path.resolve(testDir, 'extend2.js');
		if(plain([base, extend1, extend2]).item !== 'new2') {
			done('Failed to detect correct value');
		} else {
			done();
		}
	});

	it('Needs to fail on invalid base', (done) => {
		const base = path.resolve(testDir, 'invalid-base.js');
		const extend1 = path.resolve(testDir, 'extend1.js');
		const extend2 = path.resolve(testDir, 'extend2.js');
		try {
			plain([base, extend1, extend2]);
			done('Should have failed');
		} catch(e) {
			if(e instanceof SyntaxError) {
				done();
			} else {
				done('Wrong error thrown');
			}
		}
	});

	it('Needs to merge configs "deeply"', (done) => {
		const base = path.resolve(testDir, 'base.js');
		const extend = path.resolve(testDir, 'extend2.js');
		const result = plain([base, extend]);
		if(result.deep.name == 'hello' && result.deep.items[0] == 4) {
			done();
		} else {
			done('Failed to detect correct value');
		}
	});

	it('Needs to merge configs "deeply"', (done) => {
		const base = path.resolve(testDir, 'base.js');
		const extend = path.resolve(testDir, 'extend2.js');
		const result = plain([base, extend]);
		if(result.deep.name == 'hello' && result.deep.items[0] == 4) {
			done();
		} else {
			done('Failed to detect correct value');
		}
	});

	before(function(done) {
		const tasks = [];
		tasks.push(function(cb) {
			fs.mkdirp(testDir, cb);
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'base.js'),
				`module.exports = {
					item: "item",
					another: "another",
					deep: {
						name: "hello",
						items: [1,2,3],
						c: process.stdout
					}
				}`,
				cb
			);
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'invalid-base.js'),
				`module.exports = {
					item: "item"
					another: "another"
				}`,
				cb
			);
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'extend1.js'),
				`module.exports = function(config) {
					config.item = 'new';
					return config;
				}`,
				cb
			);
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'extend2.js'),
				`module.exports = {
					item: 'new2',
					deep: {
						items: [4,5,6],
						c: process.stdout
					}
				}`,
				cb
			);
		});
		async.series(tasks, function(err) {
			done(err);
		});
	});

	after(function(done) {
		const tasks = [];
		tasks.push(function(cb) {
			fs.remove(testDir, cb);
		});
		async.series(tasks, function(err) {
			done(err);
		});
	});
});
