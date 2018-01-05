import axios from 'axios';
import { CardAccomplishment, CardContent, IResumeState } from '../models/Resume';

const BASE_URL = 'https://githop-backend.firebaseio.com';

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
}