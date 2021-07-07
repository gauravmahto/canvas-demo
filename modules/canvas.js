import { getGlobal } from './utils.js';

const global = getGlobal();

function create(id, parent, width, height, devicePixelRatio) {

  let divWrapper = global.document.createElement('div');
  let canvasElem = global.document.createElement('canvas');
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);

  divWrapper.id = id;
  canvasElem.width = (width * devicePixelRatio);
  canvasElem.height = (height * devicePixelRatio);

  canvasElem.style.width = (width + 'px');
  canvasElem.style.height = (height + 'px');

  let ctx = canvasElem.getContext('webgl');
  ctx.viewport(0, 0, canvasElem.width, canvasElem.height);

  return {
    ctx: ctx,
    id: id,
    element: canvasElem
  };

}

function createReportList(wrapperId) {

  let list = global.document.createElement('ul');
  list.id = wrapperId + '-reporter';

  let canvasWrapper = global.document.getElementById(wrapperId);
  canvasWrapper.appendChild(list);

  return list.id;

}

export {
  create, createReportList
};
