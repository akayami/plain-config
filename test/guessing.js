let r = require('../lib/resolver');
const path = require('path');

describe('Default Behavoir', function() {

	it('Needs to support no args', function(done) {
		var o = r();
		if (
			o[0] == path.resolve(process.cwd(), 'conf/config.js') &&
			o[1] == path.resolve(process.cwd(), 'conf/config-local.js')
		) {
			done();
		} else {
			done('Paths did not match');
		}
	});

	it('Needs to support basepath overwrite (legacy)', function(done) {
		let overwrite = '/some/dir';
		var o = r(overwrite);
		if (
			o[0] == path.resolve(overwrite, 'conf/config.js') &&
			o[1] == path.resolve(overwrite, 'conf/config-local.js')
		) {
			done();
		} else {
			done('Paths did not match');
		}
	});

	it('Needs to support explicityly specified list of paths', function(done) {
		var o = r([
			'path/config1.js',
			'path/config2.js'
		]);

		if (
			o[0] == path.resolve(process.cwd(), 'path/config1.js') &&
			o[1] == path.resolve(process.cwd(), 'path/config2.js')
		) {
			done();
		} else {
			done('Paths did not match');
		}
	});

	it('Needs to handle CLI args', function(done) {
		process.argv
		 = ['--base', 'cli/config.js', '--conf', 'cli/extend.js'];
		var o = r();
		if (
			o[0] == path.resolve(process.cwd(), 'cli/config.js') &&
			o[1] == path.resolve(process.cwd(), 'cli/extend.js')
		) {
			done();
		} else {
			done('Paths did not match');
		}
	});

});
