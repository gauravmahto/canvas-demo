import { logger } from '../utils.js';

/*
 * creates a shader of the given type, uploads the source and
 * compiles it.
 */
const loadShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {

  const shader = gl.createShader(type);

  if (shader === null) {

    logger.error('gl.createShader() failed.');

    return null;

  }

  // Send the source to the shader object

  gl.shaderSource(
    shader,
    source
  );

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(
    shader,
    gl.COMPILE_STATUS
  )) {

    logger.log(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);

    return null;

  }

  return shader;

};

/*
 *
 * Initialize a shader program, so WebGL knows how to draw our data
 *
 */
export const initShaderProgram = (
  gl: WebGLRenderingContext, vsSource: string,
  fsSource: string
): WebGLShader | null => {

  const vertexShader = loadShader(
    gl,
    gl.VERTEX_SHADER,
    vsSource
  );
  const fragmentShader = loadShader(
    gl,
    gl.FRAGMENT_SHADER,
    fsSource
  );

  if (vertexShader === null || fragmentShader === null) {

    logger.log('Failed to create shaders.');

    return null;

  }

  // Create the shader program

  const shaderProgram = gl.createProgram();

  if (shaderProgram === null) {

    logger.log('Failed to create shader program');

    return null;

  }

  gl.attachShader(
    shaderProgram,
    vertexShader
  );
  gl.attachShader(
    shaderProgram,
    fragmentShader
  );
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(
    shaderProgram,
    gl.LINK_STATUS
  )) {

    logger.log(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);

    return null;

  }

  return shaderProgram;

};
