const fs = require('fs');
const jsesc = require('jsesc');

function readJSON(path) {
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

module.exports = {
	labels: jsesc(readJSON('data/labels.json'), {
		compact: false,
		indentLevel: 2,
	}),
	encoded: jsesc(readJSON('data/encoded.json'), { wrap: true }),
	decoded: jsesc(readJSON('data/decoded.json'), { wrap: true }),
	indexByCodePoint: jsesc(readJSON('data/index-by-code-point.json')),
	indexByPointer: jsesc(readJSON('data/index-by-pointer.json')),
	version: readJSON('package.json').version
};
