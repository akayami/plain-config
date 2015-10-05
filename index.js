var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var appPath = process.env.PWD +path.sep;

var config = {};

if (argv.base) {
	try {
		config = require(argv.base);
	} catch (e) {
		console.error('Failed to load specified config: ' + argv.base);
		console.error(e.message);
	}
} else {
	try {
		var config = require(appPath + './conf/config');
	} catch(e) {
		console.error('Failed to find default config: ' + appPath + './conf/config');
		console.error(e.message);
	}
}


if (argv.conf) {
	try {
		config = require(argv.conf)(config);
	} catch(e) {
		console.error('Failed to load specified extending config config: ' + argv.conf);
		console.error(e.message);
	}
} else {
	try {
		config = require(appPath + './conf/config-local.js')(config);
	} catch(e) {
		console.warn('Failed to load default extending config config: ' + appPath + './conf/config-local.js');
		console.warn(e.message);
		console.info('You can use --conf to extend base config and/or --base to pass the base config.');
	}
}

module.exports = config;
