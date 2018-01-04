import { ResumeActions, ResumeActionTypes } from '../actions/Resume';
import { IResumeState } from '../models/Resume';

const initialResumeState = {
  cards: {},
  accomplishments: {}
};


export const resumeReducer = (state = initialResumeState, action: ResumeActions): IResumeState => {
  switch (action.type) {
    case ResumeActionTypes.LoadSuccess:
      return action.payload;
  }
  return state;
};