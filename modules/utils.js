// export function addEventListener(element, handler) {

//   element.addEventListener('mouseup', handler);

// }

export function nullOrUndefined(identifier) {

  return (typeof identifier === 'undefined' ||
    null === identifier);

}

export function getGlobal() {

  let localGlobal;

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

}

export function isPowerOf2(value) {

  return ((typeof value !== 'undefined') && (value & (value - 1)) === 0);

}
