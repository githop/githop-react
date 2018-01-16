export * from './Resume';
export * from './User';

export const createInstance = <T>(Klass: new () => T, data: any): T => {
  return Object.assign(new Klass(), data);
};