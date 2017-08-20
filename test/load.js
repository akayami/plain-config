const fs = require('fs-extra');
const async = require('async');
const path = require('path');
let testDir = '/tmp/test/' + process.pid;

const plain = require('../lib/loader.js');


describe('Basic Loading', function() {

	it('Needs to handle legacy files', (done) => {
		let base = path.resolve(testDir, 'base.js');
		let extend = path.resolve(testDir, 'extend1.js');
		if(plain([base, extend]).item !== 'new') {
			done('Failed to detect correct value');
		} else {
			done();
		}
	});
	it('Needs to handle new files', (done) => {
		let base = path.resolve(testDir, 'base.js');
		let extend = path.resolve(testDir, 'extend2.js');
		if(plain([base, extend]).item !== 'new2') {
			done('Failed to detect correct value');
		} else {
			done();
		}
	});

	it('Needs to handle mix of old and new files', (done) => {
		let base = path.resolve(testDir, 'base.js');
		let extend1 = path.resolve(testDir, 'extend1.js');
		let extend2 = path.resolve(testDir, 'extend2.js');
		if(plain([base, extend1, extend2]).item !== 'new2') {
			done('Failed to detect correct value');
		} else {
			done();
		}
	});

	it('Needs to fail on invalid base', (done) => {
		let base = path.resolve(testDir, 'invalid-base.js');
		let extend1 = path.resolve(testDir, 'extend1.js');
		let extend2 = path.resolve(testDir, 'extend2.js');
		try {
			plain([base, extend1, extend2]);
			done('Should have failed');
		} catch(e) {
			if(e instanceof SyntaxError) {
				done();
			} else {
				done("Wrong error thrown");
			}
		}
	});

	before(function(done) {
		let tasks = [];
		tasks.push(function(cb) {
			fs.mkdirp(testDir, cb)
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'base.js'),
				`module.exports = {
					item: "item",
					another: "another"
				}`,
				cb
			)
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'invalid-base.js'),
				`module.exports = {
					item: "item"
					another: "another"
				}`,
				cb
			)
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'extend1.js'),
				`module.exports = function(config) {
					config.item = 'new';
					return config;
				}`,
				cb
			)
		});
		tasks.push(function(cb) {
			fs.writeFile(
				path.resolve(testDir, 'extend2.js'),
				`module.exports = {
					item: 'new2',
				}`,
				cb
			)
		});
		async.series(tasks, function(err, r) {
			done(err)
		});
	});

	after(function(done) {
		let tasks = [];
		tasks.push(function(cb) {
			fs.remove(testDir, cb)
		})
		async.series(tasks, function(err, r) {
			done(err)
		})
	})

	// beforeEach(function() {
	// 	console.info('BeforeEach');
	// });
	//
	// afterEach(function() {
	// 	console.info('AfterEach');
	// });
});
