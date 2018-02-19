import { createInstance } from './index';

export class ToolTipModel {
  text: string;
  dismissed: boolean = false;
  id: string;
}

export const createTooltip = (text: string) => {
  const id = generateId(20);
  return createInstance(
      ToolTipModel,
      Object.assign({}, {id}, {text})
  );
};

function dec2hex(dec: number) {
  return ('0' + dec.toString(16)).substr(-2);
}

function generateId(len: number) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}