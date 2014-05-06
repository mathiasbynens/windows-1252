var fs = require('fs');
var jsesc = require('jsesc');
require('string.fromcodepoint');

function format(object) {
	return jsesc(object, {
		'json': true,
		'compact': false
	});
}

function parse(source) {
	var indexByCodePoint = {};
	var indexByPointer = {};
	var decoded = '';
	var encoded = '';
	var lines = source.split('\n');
	lines.forEach(function(line) {
		var data = line.trim().split('\t');
		if (data.length != 3) {
			return;
		}
		var pointer = Number(data[0]);
		var codePoint = Number(data[1]);
		var symbol = String.fromCodePoint(codePoint);
		decoded += symbol;
		encoded += String.fromCodePoint(pointer + 0x80);
		indexByCodePoint[codePoint] = pointer;
		indexByPointer[pointer] = symbol;
	});
	return {
		'decoded': decoded,
		'encoded': encoded,
		'indexByCodePoint': indexByCodePoint,
		'indexByPointer': indexByPointer
	};
}

var source = fs.readFileSync('./data/index.txt', 'utf-8');
var result = parse(source);
fs.writeFileSync(
	'./data/index-by-code-point.json',
	format(result.indexByCodePoint)
);
fs.writeFileSync(
	'./data/index-by-pointer.json',
	format(result.indexByPointer)
);
fs.writeFileSync(
	'./data/decoded.json',
	format(result.decoded)
);
fs.writeFileSync(
	'./data/encoded.json',
	format(result.encoded)
);
