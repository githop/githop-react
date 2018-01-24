import * as React from 'react';
import { AsyncResumeLoad } from '../actions';
import { Resume } from '../components/Resume';
import { IState } from '../reducers';
import { connect } from 'react-redux';
import { ResumeCard } from '../models';
import { Dispatch } from 'redux';
import { makeGetResumeCards } from '../selectors';

interface Props {
  cards: ResumeCard[];
  fetchResume: () => Promise<void>;
}

class ResumeContainer extends React.Component<Props> {

  componentDidMount() {
    if (this.props.cards.length === 0) {
      this.props.fetchResume();
    }
  }

  render() {
    return (
        <Resume cards={this.props.cards}/>
    );
  }
}

const makeMapStateToProps = () => {
  const getResumeCards = makeGetResumeCards();
  const mapStateToProps = (state: IState) => ({
    cards: getResumeCards(state)
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchResume: () => dispatch(AsyncResumeLoad())
});

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(ResumeContainer);