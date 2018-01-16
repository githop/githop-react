import { ResumeActions, ResumeActionTypes } from '../actions';
import { IResumeState } from '../models';

const initialResumeState = {
  cards: {},
  accomplishments: {},
  loading: false,
  error: ''
};

export const resumeReducer = (state = initialResumeState, action: ResumeActions): IResumeState => {
  switch (action.type) {
    case ResumeActionTypes.LoadSuccess:
      return {
        cards: action.payload.cards,
        accomplishments: action.payload.accomplishments,
        loading: false,
        error: ''
      };
    case ResumeActionTypes.Load:
    case ResumeActionTypes.UpdateCardRequest:
      return {
        cards: state.cards,
        accomplishments: state.accomplishments,
        loading: true,
        error: ''
      };
    case ResumeActionTypes.UpdateCardSuccess:
      if (state.cards[action.payload.key]) {
        state.cards[action.payload.key] = action.payload;
      }
      return {
        cards: { ...state.cards },
        accomplishments: { ...state.accomplishments },
        loading: false,
        error: ''
      };
    case ResumeActionTypes.UpdateCardFailure:
      return {
        cards: { ...state.cards },
        accomplishments: { ...state.accomplishments },
        loading: false,
        error: action.payload
      };
      default:
        return state;
  }
};