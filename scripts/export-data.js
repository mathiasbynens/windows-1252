var fs = require('fs');
var jsesc = require('jsesc');

function readJSON(path) {
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

module.exports = {
	'encoded': jsesc(readJSON('data/encoded.json'), { 'wrap': true }),
	'decoded': jsesc(readJSON('data/decoded.json'), { 'wrap': true }),
	'indexByCodePoint': jsesc(readJSON('data/index-by-code-point.json')),
	'indexByPointer': jsesc(readJSON('data/index-by-pointer.json')),
	'version': readJSON('package.json').version
};
