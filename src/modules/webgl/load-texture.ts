import { isPowerOf2, logger } from '../utils.js';

/*
 * Initialize a texture and load an image.
 * When the image finished loading copy it into the texture.
 */
// eslint-disable-next-line max-lines-per-function
export const loadTexture = (gl: WebGLRenderingContext, url: string): WebGLTexture | null => {

  const texture = gl.createTexture();

  if (texture === null) {

    logger.error('gl.createTexture() failed');

    return null;

  }

  gl.bindTexture(
    gl.TEXTURE_2D,
    texture
  );

  /*
   * Because images have to be downloaded over the internet
   * they might take a moment until they are ready.
   * Until then put a single pixel in the texture so we can
   * use it immediately. When the image has finished downloading
   * we'll update the texture with the contents of the image.
   */
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  // opaque blue
  const pixel = new Uint8Array([
    0,
    0,
    255,
    255
  ]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  const image = new Image();
  image.onload = function onload() {

    gl.bindTexture(
      gl.TEXTURE_2D,
      texture
    );
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image
    );

    /*
     * WebGL1 has different requirements for power of 2 images
     * vs non power of 2 images so check if the image is a
     * power of 2 in both dimensions.
     */
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {

      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);

    } else {

      /*
       * No, it's not a power of 2. Turn off mips and set
       * wrapping to clamp to edge
       */
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR
      );

    }

  };
  image.src = url;

  return texture;

};

// eslint-disable-next-line max-lines-per-function
export const initTexture = (gl: WebGLRenderingContext): WebGLTexture | null => {

  const texture = gl.createTexture();

  if (texture === null) {

    logger.error('gl.createTexture() failed');

    return null;

  }

  gl.bindTexture(
    gl.TEXTURE_2D,
    texture
  );

  /*
   * Because video has to be download over the internet
   * they might take a moment until it's ready so
   * put a single pixel in the texture so we can
   * use it immediately.
   */
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  // opaque blue
  const pixel = new Uint8Array([
    0,
    0,
    255,
    255
  ]);

  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  /*
   * Turn off mips and set  wrapping to clamp to edge so it
   * will work regardless of the dimensions of the video.
   */
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR
  );

  return texture;

};

export const updateTexture = (gl: WebGLRenderingContext, texture: WebGLTexture, video: TexImageSource): void => {

  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;

  gl.bindTexture(
    gl.TEXTURE_2D,
    texture
  );
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    video
  );

};
