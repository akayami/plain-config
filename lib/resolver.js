const path = require('path');
const minimist = require('minimist');
const argv = require('minimist')(process.argv.slice(2));

module.exports = function(param = null, options = {}) {

	if(typeof param == 'string') {
		console.warn('Using deprecated method of passing cwd. Please use options.cwd instead')
		if(options.cwd) {
			console.error('Both options.cwd is set and cwd is passed as string')
		}
		options.cwd = param;
	}

	if(!options.cwd) {
		options.cwd = process.cwd();
	}

	let argv = minimist(process.argv);

	let base = [];
	let overwrites = [];

	if(argv.base || argv.conf)  {
		param = [];
		if(argv.base) {
			param.push(argv.base)
		}
		if(argv.conf) {
			param.push(argv.conf);
		}
	}

	if(Array.isArray(param)) {
		param = param.map((item) => {
			return path.resolve(options.cwd, item);
		});
		//	console.log(argument);
		base = param;
	} else {
		base.push(path.resolve(options.cwd, 'conf/config.js'));
		overwrites.push(path.resolve(options.cwd, 'conf/config-local.js'));
	}
	return base.concat(overwrites);
}
