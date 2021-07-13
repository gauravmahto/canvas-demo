export const nullOrUndefined = (identifier: unknown): boolean => typeof identifier === 'undefined' ||
  identifier === null;

export const getGlobal = (): Window | typeof globalThis => {

  let localGlobal = globalThis;

  if (nullOrUndefined(localGlobal) &&
    typeof globalThis !== 'undefined') {

    localGlobal = globalThis;

  }

  if (nullOrUndefined(localGlobal) &&
    typeof global !== 'undefined') {

    localGlobal = global;

  }

  if (nullOrUndefined(localGlobal) &&
    typeof window !== 'undefined') {

    localGlobal = window;

  }

  if (nullOrUndefined(localGlobal) &&
    typeof self !== 'undefined') {

    localGlobal = self;

  }

  return localGlobal;

};

// eslint-disable-next-line no-bitwise
export const isPowerOf2 = (value: number): boolean => typeof value !== 'undefined' && (value & value - 1) === 0;

export const logger = console;
