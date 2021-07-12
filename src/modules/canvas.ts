import { getGlobal } from './utils.js';

const global = getGlobal();

export const create = ({ id, parent, width, height, devicePixelRatio }:
  { id: string, parent: any, width: number, height: number, devicePixelRatio: number }): any => {

  const divWrapper = global.document.createElement('div');
  const canvasElem = global.document.createElement('canvas');
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);

  divWrapper.id = id;
  canvasElem.width = width * devicePixelRatio;
  canvasElem.height = height * devicePixelRatio;

  canvasElem.style.width = `${width}px`;
  canvasElem.style.height = `${height}px`;

  const ctx = canvasElem.getContext('webgl');
  ctx.viewport(
    0,
    0,
    canvasElem.width,
    canvasElem.height
  );

  return {
    ctx,
    element: canvasElem,
    id
  };

};

export const createReportList = (wrapperId: string): string => {

  const list = global.document.createElement('ul');
  list.id = `${wrapperId}-reporter`;

  const canvasWrapper = global.document.getElementById(wrapperId);
  canvasWrapper.appendChild(list);

  return list.id;

};
