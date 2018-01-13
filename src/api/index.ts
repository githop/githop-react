import axios from 'axios';
import { CardAccomplishment, CardContent, IResumeState } from '../models/Resume';
import { User } from '../models/User';

const BASE_URL = 'https://githop-backend.firebaseio.com';
const LOGIN_FUNCTION_URL = 'https://us-central1-githop-backend.cloudfunctions.net/login';

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

const mapStateToModels = ({ accomplishments, contents }: IResumeResponse): IResumeState => {
  Object.keys(accomplishments)
      .forEach(prop => {
        accomplishments[prop] = Object.assign(new CardAccomplishment(), accomplishments[prop]);
      });

  Object.keys(contents)
      .forEach(prop => {
        contents[prop] = Object.assign(new CardContent(), contents[prop]);
      });

  return { accomplishments, cards: contents };
};

export default class GithopBackend {
  static getResume(): Promise<IResumeState> {
    return axios.get(BASE_URL + '/resume.json')
        .then(resp => mapStateToModels(resp.data))
        // .then(data => (console.log(data), data))
        .catch(e => e);
  }

  static login(email: string, password: string): Promise<User> {
    return loginRequest({email, password});
  }
}