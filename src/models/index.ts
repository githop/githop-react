export * from './Resume';
export * from './User';
export * from './Tooltip';

export const createInstance = <T>(Klass: new () => T, data: any): T => {
  return Object.assign(new Klass(), data);
};
