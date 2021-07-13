import { getGlobal, logger } from './utils.js';

const global = getGlobal();
const name = 'square';

export const draw = ({ ctx, length, xVal, yVal, color }: {
  ctx: CanvasRenderingContext2D,
  length: number,
  xVal: number,
  yVal: number,
  color: string
}): {
  color: string,
  length: number,
  xVal: number,
  yVal: number
} => {

  ctx.fillStyle = color;
  ctx.fillRect(
    xVal,
    yVal,
    length,
    length
  );

  return {
    color,
    length,
    xVal,
    yVal
  };

};

export const random = (min: number, max: number): number => {

  const num = Math.floor(Math.random() * (max - min)) + min;

  return num;

};

export const reportArea = (length: number, listId: string): void => {

  const listItem = global.document.createElement('li');
  listItem.textContent = `${name} area is ${length * length}px squared.`;

  const list = global.document.getElementById(listId);

  if (list === null) {

    logger.error(`No list with id: ${listId}`);

    return;

  }

  list.appendChild(listItem);

};

export const reportPerimeter = (length: number, listId: string): void => {

  const listItem = global.document.createElement('li');
  listItem.textContent = `${name} perimeter is ${length * 4}px.`;

  const list = global.document.getElementById(listId);

  if (list === null) {

    logger.error(`No list with id: ${listId}`);

    return;

  }

  list.appendChild(listItem);

};

export default function randomSquare(ctx: CanvasRenderingContext2D): {
  length: number,
  xVal: number,
  yVal: number,
  color: string
} {

  const color1 = random(
    0,
    255
  );
  const color2 = random(
    0,
    255
  );
  const color3 = random(
    0,
    255
  );
  const color = `rgb(${color1},${color2},${color3})`;
  ctx.fillStyle = color;

  const xVal = random(
    0,
    480
  );
  const yVal = random(
    0,
    320
  );
  const length = random(
    10,
    100
  );
  ctx.fillRect(
    xVal,
    yVal,
    length,
    length
  );

  return {
    color,
    length,
    xVal,
    yVal
  };

}
