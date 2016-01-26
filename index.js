var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var config = {};

module.exports  = function(appRoot) {

	var appPath = process.env.PWD  + path.sep;
	if(appRoot) {
		appPath = appRoot;
		console.info('Overwriting default application lookup with: ' + appPath);
	}

	if (argv.base) {
		try {
			config = require(argv.base);
		} catch (e) {
			console.error('Failed to load specified base config: ' + argv.base);
			console.error(e.message);
		}
	} else {
		try {
			var config = require(appPath + 'conf/config.js');
		} catch(e) {
			console.error('Failed to find default base config: ' + appPath + 'conf/config.js');
			console.error(e.message);
		}
	}

	if (argv.conf) {
		var customConf = [];
		if (argv.conf instanceof Array) {
			customConf = argv.conf;
		} else {
			customConf.push(argv.conf);
		}
		for (var i in customConf) {
			confFile = customConf[i];
			try {
				config = require(confFile)(config);
			} catch(e) {
				console.error('Failed to load specified extending config: ' + confFile);
				console.error(e.message);
			}
		}
	} else {
		try {
			config = require(appPath + 'conf/config-local.js')(config);
		} catch(e) {
			console.warn('Failed to load default extending config: ' + appPath + 'conf/config-local.js');
			console.warn(e.message);
			console.info('You can use --conf to extend base config and/or --base to pass the base config and/or --test to pass the test config.');
		}
	}

	return config;
}
