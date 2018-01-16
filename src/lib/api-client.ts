import { CardAccomplishment, CardContent, createInstance, IResumeState, User } from '../models';
import { getLocalUser } from './user-service';

const BASE_URL = 'https://githop-backend.firebaseio.com';
const LOGIN_FUNCTION_URL = 'https://us-central1-githop-backend.cloudfunctions.net/login';

type methods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
const request = <T>(path: string, method: methods = 'GET', payload?: any, token?: string): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json'
  };
  const config = {
    method,
    headers
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    // add payload, headers
    Object.assign(
        config,
        {
          body: JSON.stringify(payload)
        },
        {
          headers: {
            ...headers,
            'Accept': 'application/json',
          }
        }
    );
  }

  let finalPath = path + (token ? '?auth=' + token : '').trim();
  return fetch(BASE_URL + finalPath, config)
      .then((response: any) => {
        if (response.status !== 200) {
          return response.json().then((e: any) => Promise.reject(e));
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => data);
};

const loginRequest = <T>(payload: any): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  const config = {
    headers,
    method: 'POST'
  };

  // add payload, headers
  Object.assign(
      config,
      {
        body: JSON.stringify(payload)
      }
  );

  return fetch(LOGIN_FUNCTION_URL, config)
      .then((response: any) => {
        if (response.status !== 200) {
          return response.json().then((e: any) => Promise.reject(e));
        }
        return response;
      })
      .then(response => response.json())
      .then((data) => data);
};

interface IResumeResponse {
  accomplishments: { [fbKey: string]: CardAccomplishment };
  contents: { [fbKey: string]: CardContent };
}

const mapStateToModels = ({ accomplishments, contents }: IResumeResponse): Partial<IResumeState> => {
  Object.keys(accomplishments)
      .forEach(prop => {
        accomplishments[prop] = createInstance(
            CardAccomplishment,
            Object.assign(accomplishments[prop], { key: prop })
        );
      });

  Object.keys(contents)
      .forEach(prop => {
        contents[prop] = createInstance(
            CardContent,
            Object.assign(contents[prop], { key: prop })
        );
      });

  return { accomplishments, cards: contents };
};

const localUser = getLocalUser();
let tok: string | undefined;
if (localUser && localUser.stsTokenManager.accessToken) {
  tok = localUser.stsTokenManager.accessToken;

}

export default class GithopBackend {
  static getResume(): Promise<IResumeState> {
    return request('/resume.json')
        .then((resp: any) => mapStateToModels(resp))
        // .then(data => (console.log(data), data))
        .catch(e => e);

  }

  static login(email: string, password: string): Promise<User> {
    return loginRequest({email, password});
  }

  static updateCardContent(key: string, val: any): Promise<CardContent> {
    return GithopBackend.updateField(key, 'contents', val)
        .then(resp => {
          return createInstance(CardContent, {...resp, ...{key}});
        });
  }

  static updateField(field: string, type: 'accomplisments' | 'contents', val: any) {
    const path = `/resume/${type}/${field}/.json`;
    return request(path, 'PATCH', val, tok);
  }
}