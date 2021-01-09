export * from './api-client';
export * from './user-service';
import { mockUser } from '../models';

const NODE_ENV = process.env.NODE_ENV;

export const omit = (obj: object, ...keys: string[]) => {
  return Object.keys(obj).reduce((result: object, prop: string) => {
    if (keys.indexOf(prop) === -1) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});
};

const getApiUrl = (NODE_ENV: string | undefined) => {
  let baseUrl = 'githop-backend.firebaseio.com';
  const proto = 'https://';
  if (NODE_ENV === 'development') {
    baseUrl = 'dev-' + baseUrl;
  }
  return proto + baseUrl;
};

export const BASE_URL = getApiUrl(NODE_ENV);

const getLocalStorageKey = (NODE_ENV: string | undefined) => {
  let key = 'user';
  if (NODE_ENV === 'development') {
    key = 'dev-' + key;
  }
  return key;
};

export const LOCAL_STORAGE_USER_KEY = getLocalStorageKey(NODE_ENV);

const LOGIN_FUNCTION_URL = 'https://us-central1-githop-backend.cloudfunctions.net/login';

function loginRequestFactory(
  NODE_ENV: string | undefined
): (payload: any) => Promise<any> {
  return (payload: any) => {
    if (NODE_ENV === 'development') {
      return Promise.resolve(mockUser);
    }
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const config = {
      headers,
      method: 'POST',
    };

    // add payload, headers
    Object.assign(config, {
      body: JSON.stringify(payload),
    });

    return fetch(LOGIN_FUNCTION_URL, config)
      .then((response: any) => {
        if (response.status !== 200) {
          return response.json().then((e: any) => Promise.reject(e));
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => data);
  };
}

export const loginRequest = loginRequestFactory(NODE_ENV);
