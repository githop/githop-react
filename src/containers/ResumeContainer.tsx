import * as React from 'react';
import { AsyncResumeLoad } from '../actions';
import { IState } from '../reducers';
import { connect } from 'react-redux';
import { ResumeCard } from '../models';
import { Dispatch } from 'redux';
import { makeGetResumeCards } from '../selectors';
import { ResumeCardDetail } from '../components/ResumeCardDetail/ResumeCardDetail';
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
        <div className="page-root container">
          {this.props.cards.map((card, i) => <ResumeCardDetail key={i} card={card}/>)}
        </div>
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