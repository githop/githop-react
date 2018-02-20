import { createInstance } from './index';

export class ToolTipModel {
  id: string;
  text?: string;
  dismissed: boolean;
  manual: boolean;
  buttonText?: string;
  action?: (a?: any) => any;
}

export const createTooltip = (text: string | null, config?: {}) => {
  const id = generateId(20);
  const defaultProps = {
    id,
    text: text || 'Hello world!',
    dismissed: false,
    manual: false,
    buttonText: 'dismiss',
    action: null
  };

  if (config != null) {
    Object.assign(defaultProps, config);
  }

  return createInstance(
      ToolTipModel,
      Object.assign({}, defaultProps, config)
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