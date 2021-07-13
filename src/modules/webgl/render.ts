/* eslint-disable array-element-newline */
/* eslint-disable array-bracket-spacing */
/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-params */
/* eslint-disable max-statements */

let cubeRotation = 0.0;

export const drawScene = (
  gl: WebGLRenderingContext, programInfo: Record<string, any>, buffers: Record<string, any>,
  texture: WebGLTexture, deltaTime: number
): void => {

  // Clear to black, fully opaque
  gl.clearColor(
    0.0,
    0.0,
    0.0,
    1.0
  );
  // Clear everything
  gl.clearDepth(1.0);
  // Enable depth testing
  gl.enable(gl.DEPTH_TEST);
  // Near things obscure far things
  gl.depthFunc(gl.LEQUAL);

  // Clear the canvas before we start drawing on it.

  // eslint-disable-next-line no-bitwise
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /*
   * Create a perspective matrix, a special matrix that is
   * used to simulate the distortion of perspective in a camera.
   * Our field of view is 45 degrees, with a width/height
   * ratio that matches the display size of the canvas
   * and we only want to see objects between 0.1 units
   * and 100 units away from the camera.
   */

  // in radians
  const fieldOfView = 45 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = glMatrix.mat4.create();

  /*
   * note: glmatrix.js always has the first argument
   * as the destination to receive the result.
   * @ts-ignore
   */
  glMatrix.mat4.perspective(
    projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar
  );

  /*
   * Set the drawing position to the "identity" point, which is
   * the center of the scene.
   * @ts-ignore
   */
  const modelViewMatrix = glMatrix.mat4.create();

  /*
   * Now move the drawing position a bit to where we want to
   * start drawing the square.
   */

  glMatrix.mat4.translate(
    // destination matrix
    modelViewMatrix,
    // matrix to translate
    modelViewMatrix,
    // amount to translate
    [ -0.0, 0.0, -6.0 ]
  );

  glMatrix.mat4.rotate(
    // destination matrix
    modelViewMatrix,
    // matrix to rotate
    modelViewMatrix,
    // amount to rotate in radians
    cubeRotation,
    // axis to rotate around
    [ 0, 0, 1 ]
  );

  glMatrix.mat4.rotate(
    // destination matrix
    modelViewMatrix,
    // matrix to rotate
    modelViewMatrix,
    // amount to rotate in radians
    cubeRotation,
    // axis to rotate around
    [ 0, 1, 0 ]
  );

  glMatrix.mat4.rotate(
    // destination matrix
    modelViewMatrix,
    // matrix to rotate
    modelViewMatrix,
    // amount to rotate in radians
    cubeRotation,
    // axis to rotate around
    [ 1, 0, 0 ]
  );

  /*
   * Tell WebGL how to pull out the positions from the position
   * buffer into the vertexPosition attribute.
   */
  {

    // pull out 3 values per iteration
    const numComponents = 3;
    // the data in the buffer is 32bit floats
    const type = gl.FLOAT;
    // don't normalize
    const normalize = false;

    /*
     * how many bytes to get from one set of values to the next
     * 0 = use type and numComponents above
     */
    const stride = 0;
    // how many bytes inside the buffer to start from
    const offset = 0;
    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffers.position
    );
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  }

  // tell webgl how to pull out the texture coordinates from buffer
  {

    // every coordinate composed of 2 values
    const num = 2;
    // the data in the buffer is 32 bit float
    const type = gl.FLOAT;
    // don't normalize
    const normalize = false;
    // how many bytes to get from one set to the next
    const stride = 0;
    // how many bytes inside the buffer to start from
    const offset = 0;
    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffers.textureCoord
    );
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      num,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

  }

  /*
   * Tell WebGL how to pull out the normals from
   * the normal buffer into the vertexNormal attribute.
   */
  {

    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffers.normal
    );
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);

  }

  const normalMatrix = glMatrix.mat4.create();
  glMatrix.mat4.invert(
    normalMatrix,
    modelViewMatrix
  );
  glMatrix.mat4.transpose(
    normalMatrix,
    normalMatrix
  );

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(
    gl.ELEMENT_ARRAY_BUFFER,
    buffers.indices
  );

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(
    gl.TEXTURE_2D,
    texture
  );

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(
    programInfo.uniformLocations.uSampler,
    0
  );

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.normalMatrix,
    false,
    normalMatrix
  );

  {

    const offset = 0;
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    gl.drawElements(
      gl.TRIANGLES,
      vertexCount,
      type,
      offset
    );

  }

  cubeRotation += deltaTime;

};
