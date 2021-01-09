import {
  CardAccomplishment,
  CardContent,
  createInstance,
  IResumeState,
  User,
} from '../models';
import { BASE_URL, loginRequest, omit } from './index';
import { getLocalUser } from './user-service';

type methods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
const request = <T>(
  path: string,
  method: methods = 'GET',
  payload?: any,
  token?: string
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const config = {
    method,
    headers,
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    // add payload, headers
    Object.assign(
      config,
      {
        body: JSON.stringify(payload),
      },
      {
        headers: {
          ...headers,
          Accept: 'application/json',
        },
      }
    );
  }

  const finalPath = path + (token ? '.json?auth=' + token : '.json').trim();
  return fetch(BASE_URL + finalPath, config)
    .then((response: any) => {
      if (response.status !== 200) {
        return response.json().then((e: any) => Promise.reject(e));
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => data);
};

interface IResumeResponse {
  accomplishments: { [fbKey: string]: CardAccomplishment };
  contents: { [fbKey: string]: CardContent };
}

const mapStateToModels = ({
  accomplishments,
  contents,
}: IResumeResponse): Partial<IResumeState> => {
  Object.keys(accomplishments).forEach((prop) => {
    accomplishments[prop] = createInstance(
      CardAccomplishment,
      Object.assign(accomplishments[prop], { key: prop })
    );
  });

  Object.keys(contents).forEach((prop) => {
    contents[prop] = createInstance(
      CardContent,
      Object.assign(contents[prop], { key: prop })
    );
  });

  return { accomplishments, cards: contents };
};

const getToken = () => {
  const localUser = getLocalUser();
  let tok: string | undefined;
  if (localUser && localUser.stsTokenManager.accessToken) {
    tok = localUser.stsTokenManager.accessToken;
  }
  return tok;
};

export default class GithopBackend {
  static getResume(): Promise<IResumeState> {
    return (
      request('/resume')
        .then((resp: any) => mapStateToModels(resp))
        // .then(data => (console.log(data), data))
        .catch((e) => e)
    );
  }

  static login(email: string, password: string): Promise<User> {
    return loginRequest({ email, password });
  }

  static updateCardContent(key: string, val: CardContent): Promise<CardContent> {
    // strip out client side accomplishments array to keep data normalized
    return GithopBackend.updateField(
      key,
      'contents',
      omit(val, 'key', 'accomplishments')
    ).then((resp) => {
      // @ts-ignore
      return createInstance(CardContent, { ...resp, ...{ key } });
    });
  }

  static addResumeCard(resumeCard: CardContent): Promise<CardContent> {
    return request('/resume/contents', 'POST', resumeCard, getToken()).then(
      (resp: any) => {
        return createInstance(CardContent, Object.assign(resumeCard, { key: resp.name }));
      }
    );
  }

  static updateAccomplishment(
    key: string,
    val: CardAccomplishment
  ): Promise<CardAccomplishment> {
    return GithopBackend.updateField(key, 'accomplishments', omit(val, 'key')).then(
      (resp: any) => {
        return createInstance(CardAccomplishment, { ...resp, ...{ key } });
      }
    );
  }

  static updateField(field: string, type: 'accomplishments' | 'contents', val: any) {
    const path = `/resume/${type}/${field}`;
    return request(path, 'PATCH', val, getToken());
  }

  static createAccomplishment(na: CardAccomplishment) {
    return request('/resume/accomplishments', 'POST', na, getToken()).then(
      (resp: any) => {
        return createInstance(CardAccomplishment, Object.assign(na, { key: resp.name }));
      }
    );
  }

  static deleteAccomplishment(accomplishmentKey: string): Promise<void> {
    return request(
      `/resume/accomplishments/${accomplishmentKey}`,
      'DELETE',
      null,
      getToken()
    );
  }

  static deleteCard(cardKey: string): Promise<void> {
    return request(`/resume/contents/${cardKey}`, 'DELETE', null, getToken());
  }
}
