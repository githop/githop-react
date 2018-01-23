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
    case ResumeActionTypes.UpdateAccomplishmentRequest:
    case ResumeActionTypes.AddAccomplishmentRequest:
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
    case ResumeActionTypes.UpdateAccomplishmentFailure:
    case ResumeActionTypes.AddAccomplishmentFailure:
      return {
        cards: state.cards,
        accomplishments: state.accomplishments,
        loading: false,
        error: action.payload
      };
    case ResumeActionTypes.UpdateAccomplishmentSuccess:
      const newAccomp = action.payload;
      if (state.accomplishments[newAccomp.key]) {
        state.accomplishments[newAccomp.key] = newAccomp;
      }
      return {
        cards: state.cards,
        accomplishments: { ...state.accomplishments },
        loading: false,
        error: state.error
      };
    case ResumeActionTypes.AddAccomplishmentSuccess:
      const newAccmp = { [action.payload.key]: action.payload };
      return {
        cards: state.cards,
        accomplishments: { ...state.accomplishments, ...newAccmp },
        loading: false,
        error: state.error,
      };
      default:
        return state;
  }
};