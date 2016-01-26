# plain-config
A very simple config loader module. 

Reads configs stored in standard javascript files. It expects a base (default) config and optional extending configs.

By default, the base config is read from `conf/config.js` and extending config is optionally loaded from `conf/config-local.js`

##Example

Provided the following config file is located in conf/config.js
```javascript
var config = {};
config.container = {
  key: 'value'
}
module.exports = config;
```

Example: somefile.js
```javascript
var config = require('plain-config')();
console.log(config.container.key);
```
Output:
```javascript
value
```

You can direct plain-config to load configs from specific locations using `--base` and `--conf` parameters as follows:
```
node somefile.js --base=conf/config.js --conf=conf/config-local.js --conf=conf/config-local2.js
```

`--base` config is your default config definition and every `--conf` will be applied in provided order. 

A sample local config may look something like this: (`conf/config-local.js`)
```
module.exports = function(config) {
	config.container.key = 'value2';
	return config;
}
```
The purpose of the local config is to overwrite default parameters of you base configs to match specific configuration of whatever local enviroment might be.
