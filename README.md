# windows-1252 [![Build status](https://github.com/mathiasbynens/windows-1252/workflows/run-checks/badge.svg)](https://github.com/mathiasbynens/windows-1252/actions?query=workflow%3Arun-checks) [![windows-1252 on npm](https://img.shields.io/npm/v/windows-1252)](https://www.npmjs.com/package/windows-1252)

_windows-1252_ is a robust JavaScript implementation of [the windows-1252 character encoding as defined by the Encoding Standard](https://encoding.spec.whatwg.org/#windows-1252).

This encoding is known under the following names: ansi_x3.4-1968, ascii, cp1252, cp819, csisolatin1, ibm819, iso-8859-1, iso-ir-100, iso8859-1, iso88591, iso_8859-1, iso_8859-1:1987, l1, latin1, us-ascii, windows-1252, and x-cp1252.

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install windows-1252
```

In a browser or in [Node.js](https://nodejs.org/):

```js
import {encode, decode, labels} from 'windows-1252';
// or…
import * as windows1252 from 'windows-1252';
```

## API

### `windows1252.labels`

An array of strings, each representing a [label](https://encoding.spec.whatwg.org/#label) for this encoding.

### `windows1252.encode(input, options)`

This function takes a plain text string (the `input` parameter) and encodes it according to windows-1252. The return value is an environment-agnostic `Uint16Array` of which each element represents an octet as per windows-1252.

```js
const encodedData = windows1252.encode(text);
```

The optional `options` object and its `mode` property can be used to set the error mode. The two available error modes are `'fatal'` (the default) or `'replacement'`. (Note: This differs from [the spec](https://encoding.spec.whatwg.org/#error-mode), which recognizes `'fatal`' and `'html'` modes for encoders. The reason behind this difference is that the spec algorithm is aimed at producing HTML, whereas this library encodes into an environment-agnostic `Uint16Array` of bytes.)

```js
const encodedData = windows1252.encode(text, {
  mode: 'replacement'
});
// If `text` contains a symbol that cannot be represented in windows-1252,
// instead of throwing an error, it becomes 0xFFFD.
```

### `windows1252.decode(input, options)`

This function decodes `input` according to windows-1252. The `input` parameter can either be a `Uint16Array` of which each element represents an octet as per windows-1252, or a ‘byte string’ (i.e. a string of which each item represents an octet as per windows-1252).

```js
const text = windows1252.decode(encodedData);
```

The optional `options` object and its `mode` property can be used to set the [error mode](https://encoding.spec.whatwg.org/#error-mode). For decoding, the error mode can be `'replacement'` (the default) or `'fatal'`.

```js
const text = windows1252.decode(encodedData, {
  mode: 'fatal'
});
// If `encodedData` contains an invalid byte for the windows-1252 encoding,
// instead of replacing it with U+FFFD in the output, an error is thrown.
```

## Notes

[Similar modules for other single-byte legacy encodings are available.](https://www.npmjs.com/browse/keyword/legacy-encoding)

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_windows-1252_ is available under the [MIT](https://mths.be/mit) license.
