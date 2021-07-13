import './js/gl-matrix-min.js';

import { copyVideo, setupVideo } from './modules/video.js';
import { drawScene, initBuffers, initShaderProgram, initTexture, updateTexture } from './modules/webgl/index.js';
import { getGlobal, logger } from './modules/utils.js';
import { create } from './modules/canvas.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import myVideo from './videos/happy-baby.mp4';

const global = getGlobal();

const myCanvas = create({
  devicePixelRatio: global.devicePixelRatio,
  height: 320,
  id: 'myCanvas',
  parent: global.document.body,
  width: 480
});

if (myCanvas !== null) {

  // let reportList = createReportList(myCanvas.id);

  myCanvas.element.addEventListener(
    'mouseup',
    (event: MouseEvent) => {

      logger.log(
        event.offsetX,
        event.offsetY
      );

    }
  );

  // Set clear color to black, fully opaque
  myCanvas.ctx.clearColor(
    0.0,
    0.0,
    0.0,
    1.0
  );
  // Clear the color buffer with specified clear color
  myCanvas.ctx.clear(myCanvas.ctx.COLOR_BUFFER_BIT);

  // Vertex shader program

  const vsSource = `
attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
`;

  const fsSource = `
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;

  uniform sampler2D uSampler;

  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

    gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
  }
`;

  const shaderProgram = initShaderProgram(
    myCanvas.ctx,
    vsSource,
    fsSource
  );

  let programInfo = {};

  if (shaderProgram !== null) {

    programInfo = {
      attribLocations: {
        textureCoord: myCanvas.ctx.getAttribLocation(
          shaderProgram,
          'aTextureCoord'
        ),
        vertexNormal: myCanvas.ctx.getAttribLocation(
          shaderProgram,
          'aVertexNormal'
        ),
        vertexPosition: myCanvas.ctx.getAttribLocation(
          shaderProgram,
          'aVertexPosition'
        )
      },
      program: shaderProgram,
      uniformLocations: {
        modelViewMatrix: myCanvas.ctx.getUniformLocation(
          shaderProgram,
          'uModelViewMatrix'
        ),
        normalMatrix: myCanvas.ctx.getUniformLocation(
          shaderProgram,
          'uNormalMatrix'
        ),
        projectionMatrix: myCanvas.ctx.getUniformLocation(
          shaderProgram,
          'uProjectionMatrix'
        ),
        uSampler: myCanvas.ctx.getUniformLocation(
          shaderProgram,
          'uSampler'
        )
      }
    };

  }

  const buffers = initBuffers(myCanvas.ctx);

  // Load texture
  const texture = initTexture(myCanvas.ctx);

  if (buffers !== null &&
    texture !== null) {

    const video = setupVideo(myVideo);

    let then = 0;

    // Draw the scene repeatedly
    const render = (now: number): void => {

      // convert to seconds
      const nowVal = now * 0.001;
      const deltaTime = nowVal - then;
      then = nowVal;

      if (copyVideo) {

        updateTexture(
          myCanvas.ctx,
          texture,
          video
        );

      }

      drawScene(
        myCanvas.ctx,
        programInfo,
        buffers,
        texture,
        deltaTime
      );

      // Re-render the updated frame.
      requestAnimationFrame(render);

    };

    // Render the first frame.
    requestAnimationFrame(render);

  }

  // --------------------

  /*
   * let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
   * reportArea(square1.length, reportList);
   * reportPerimeter(square1.length, reportList);
   */

  /*
   * let square2 = randomSquare(myCanvas.ctx);
   * reportArea(square2.length, reportList);
   * reportPerimeter(square2.length, reportList);
   */

}
