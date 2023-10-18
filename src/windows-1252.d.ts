declare module 'windows-1252' {
  type EncodeOptions = {
    mode: 'fatal' | 'replacement';
  };
  type DecodeOptions = {
    mode: 'fatal' | 'replacement';
  };

  export declare function encode(
    text: string,
    options?: EncodeOptions
  ): Uint16Array;
  export declare function decode(
    buffer: Uint16Array | Uint8Array | Buffer | string,
    options?: DecodeOptions
  ): string;
  export const labels: string[];
}
