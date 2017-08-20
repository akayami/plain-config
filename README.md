# plain-config
A very simple config loader module.

### Installation

`npm install plain-config`

### Usage
The simplest form of usage is the following:

```javascript
'use strict'
const config = Object.freeze(require('plain-config')());
```

The system will automatically attempt to load these files is top down order

```
conf/config.js
conf/config-local.js
```

By default, the base config is read from `conf/config.js` and extending config is optionally loaded from `conf/config-local.js`

If either file is not found, it will fail silently

##### Config file format

```javascript
var config = {};
config.container = {
  key: 'value'
}
module.exports = config;
```

##### Local config file format

A sample local config may look something like this: (`conf/config-local.js`)

```javascript
module.exports = {
	config: {
		container: {
			key = 'value2';
		}
	}
}
```
or

```javascript
module.exports = function(config) {
	config.container.key = 'value2';
	return config;
}
```

### Advanced usage

```javascript
'use strict'
const config = Object.freeze(require('plain-config')('/base/path'));
```

In this example, a `cwd` directory will be overwritten. Modifies path compilation.

### CLI parameters

You can direct plain-config to load configs from specific locations using `--base` and `--conf` parameters as follows:
```
node somefile.js --base=conf/config.js --conf=conf/config-local.js --conf=conf/config-local2.js
```

`--base` config is your default config definition and every `--conf` will be applied in provided order.
