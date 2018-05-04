export * from './api-client';
export * from './user-service';

export const omit = (obj: object, ...keys: string[]) => {
  return Object.keys(obj).reduce((result: object, prop: string) => {
    if (keys.indexOf(prop) === -1) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});
};
