function create(id, parent, width, height, devicePixelRatio) {

  let divWrapper = document.createElement('div');
  let canvasElem = document.createElement('canvas');
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

  let list = document.createElement('ul');
  list.id = wrapperId + '-reporter';

  let canvasWrapper = document.getElementById(wrapperId);
  canvasWrapper.appendChild(list);

  return list.id;

}

export {
  create, createReportList
};
