const merge = require('merge');
const fs = require('fs');

module.exports = function(files, options) {

	let output;

	for (let x = 0; x < files.length; x++) {
		try {
			var p = require(files[x]);
		} catch (e) {
			if (e instanceof SyntaxError) {
				throw e;
			}
			if (options.strict) {
				throw e;
			}
			if (options.debug) {
				console.warn(e);
			}
		}
		if (typeof p == 'object') {
			output = merge(output, p);
		} else if (typeof p == 'function') {
			output = p(output);
		} else if (p != undefined) {
			throw new Error('Unexpected Type: ' + typeof p);
		}
	}
	return output;
}
