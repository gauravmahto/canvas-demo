import { create, createReportList } from './modules/canvas.js';
import randomSquare, { name, draw, reportArea, reportPerimeter } from './modules/square.js';
import { getGlobal } from './modules/utils.js';
import { initShaderProgram, initBuffers, drawScene } from './modules/webgl/index.js';

let myCanvas = create('myCanvas', document.body, 480, 320, getGlobal().devicePixelRatio);
let reportList = createReportList(myCanvas.id);

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

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;

const fsSource = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;

const shaderProgram = initShaderProgram(myCanvas.ctx, vsSource, fsSource);

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: myCanvas.ctx.getAttribLocation(shaderProgram, 'aVertexPosition'),
  },
  uniformLocations: {
    projectionMatrix: myCanvas.ctx.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: myCanvas.ctx.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
  },
};

const buffers = initBuffers(myCanvas.ctx);

drawScene(myCanvas.ctx, programInfo, buffers);

//--------------------

// let square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
// reportArea(square1.length, reportList);
// reportPerimeter(square1.length, reportList);

// // Use the default
// let square2 = randomSquare(myCanvas.ctx);
// reportArea(square2.length, reportList);
// reportPerimeter(square2.length, reportList);
