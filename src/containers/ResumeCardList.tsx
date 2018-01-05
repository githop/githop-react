import { IState } from '../reducers';
import { connect } from 'react-redux';
import { ResumeCards } from '../components/ResumeCards';
import { getResumeCards } from '../selectors/Resume';

const mapStateToProps = (state: IState) => ({
  cards: getResumeCards(state),
});

export const ResumeCardList = connect(
    mapStateToProps,
)(ResumeCards);
