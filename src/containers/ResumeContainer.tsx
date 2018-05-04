import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AsyncResumeLoad } from '../actions';
import Resume from '../components/Resume/Resume';
import { ResumeCard } from '../models';
import { IState } from '../reducers';
import { makeGetResumeCards } from '../selectors';
interface Props {
  cards: ResumeCard[];
  fetchResume: () => Promise<void>;
  loading: boolean;
  error: string;
}

class ResumeContainer extends React.Component<Props> {
  componentDidMount() {
    if (this.props.cards.length === 0) {
      this.props.fetchResume();
    }
  }

  render() {
    return (
      <Resume
        cards={this.props.cards}
        loading={this.props.loading}
        error={this.props.error}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getResumeCards = makeGetResumeCards();
  const mapStateToProps = (state: IState) => ({
    cards: getResumeCards(state),
    loading: state.resume.loading,
    error: state.resume.error,
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchResume: () => dispatch(AsyncResumeLoad()),
});

export default connect(makeMapStateToProps, mapDispatchToProps as any)(ResumeContainer);
