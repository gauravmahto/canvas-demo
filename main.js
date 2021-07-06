import './js/gl-matrix-min.js';

import { create, createReportList } from './modules/canvas.js';
// import randomSquare, { name, draw, reportArea, reportPerimeter } from './modules/square.js';
import { getGlobal } from './modules/utils.js';
import { initShaderProgram, initBuffers, drawScene, loadTexture } from './modules/webgl/index.js';

let myCanvas = create('myCanvas', document.body, 480, 320, getGlobal().devicePixelRatio);
// let reportList = createReportList(myCanvas.id);

myCanvas.element.addEventListener('mouseup', (event) => {

  console.log(event.offsetX, event.offsetY);

});

// Set clear color to black, fully opaque
myCanvas.ctx.clearColor(0.0, 0.0, 0.0, 1.0);
// Clear the color buffer with specified clear color
myCanvas.ctx.clear(myCanvas.ctx.COLOR_BUFFER_BIT);

// -----------------
// Vertex shader program

const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying highp vec2 vTextureCoord;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
  }
`;

const fsSource = `
  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
`;

const shaderProgram = initShaderProgram(myCanvas.ctx, vsSource, fsSource);

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: myCanvas.ctx.getAttribLocation(shaderProgram, 'aVertexPosition'),
    textureCoord: myCanvas.ctx.getAttribLocation(shaderProgram, 'aTextureCoord')
  },
  uniformLocations: {
    projectionMatrix: myCanvas.ctx.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: myCanvas.ctx.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    uSampler: myCanvas.ctx.getUniformLocation(shaderProgram, 'uSampler')
  },
};

const buffers = initBuffers(myCanvas.ctx);

// Load texture
const texture = loadTexture(myCanvas.ctx, 'images/tux.png');

var then = 0;

// Draw the scene repeatedly
function render(now) {

  now *= 0.001;  // convert to seconds
  const deltaTime = (now - then);
  then = now;

  drawScene(myCanvas.ctx, programInfo, buffers, texture, deltaTime);

  // Re-render the updated frame.
  requestAnimationFrame(render);

}

// Render the first frame.
requestAnimationFrame(render);

//--------------------

// let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
// reportArea(square1.length, reportList);
// reportPerimeter(square1.length, reportList);

// // Use the default
// let square2 = randomSquare(myCanvas.ctx);
// reportArea(square2.length, reportList);
// reportPerimeter(square2.length, reportList);
