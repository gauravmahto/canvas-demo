import { getGlobal, logger } from './utils.js';

const global = getGlobal();

export const create = ({ id, parent, width, height, devicePixelRatio }:
  { id: string, parent: HTMLElement, width: number, height: number, devicePixelRatio: number }): {
    ctx: WebGLRenderingContext,
    element: HTMLCanvasElement,
    id: string
  } | null => {

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

  if (ctx === null) {

    logger.error('Could not initialize WebGL. Your browser may not support it.');

    return null;

  }

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

export const createReportList = (wrapperId: string): string | null => {

  const list = global.document.createElement('ul');
  list.id = `${wrapperId}-reporter`;

  const canvasWrapper = global.document.getElementById(wrapperId);

  if (canvasWrapper === null) {

    logger.error(`Could not find canvas wrapper with id: ${wrapperId}`);

    return null;

  }

  canvasWrapper.appendChild(list);

  return list.id;

};
