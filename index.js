const resolver = require('./lib/resolver');
const loader = require('./lib/loader');

module.exports = function(param = null, options = null) {

	if(options == null) {
		options = {
			debug: false,
			strict: false
		};
	}
	return loader(resolver(param, options), options);
};
