const fs = require('fs');
const jsesc = require('jsesc');
const template = require('lodash.template');

function format(object) {
	return jsesc(object, {
		json: true,
		compact: false,
	}) + '\n';
}

function parse(source) {
	const indexByCodePoint = {};
	const indexByPointer = {};
	let decoded = '';
	const encoded = [];
	var lines = source.split('\n');
	for (const line of lines) {
		const data = line.trim().split('\t');
		if (data.length != 3) {
			continue;
		}
		const pointer = Number(data[0]);
		const codePoint = Number(data[1]);
		const symbol = String.fromCodePoint(codePoint);
		decoded += symbol;
		encoded.push(pointer + 0x80);
		indexByCodePoint[codePoint] = pointer;
		indexByPointer[pointer] = symbol;
	}
	return {
		decoded: decoded,
		encoded: encoded,
		indexByCodePoint: indexByCodePoint,
		indexByPointer: indexByPointer
	};
}

const source = fs.readFileSync('./data/index.txt', 'utf-8');
const result = parse(source);
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

// tests/tests.src.js → tests/tests.js
const TEST_TEMPLATE = fs.readFileSync('./tests/tests.src.mjs', 'utf8');
const createTest = template(TEST_TEMPLATE, {
	interpolate: /<\%=([\s\S]+?)%\>/g,
});
const testCode = createTest(require('./export-data.js'));
fs.writeFileSync('./tests/tests.mjs', testCode);

// src/windows-1252.src.mjs -> windows-1252.mjs
const LIB_TEMPLATE = fs.readFileSync('./src/windows-1252.src.mjs', 'utf8');
const createLib = template(LIB_TEMPLATE, {
	interpolate: /<\%=([\s\S]+?)%\>/g,
});
const libCode = createLib(require('./export-data.js'));
fs.writeFileSync('./windows-1252.mjs', libCode);
