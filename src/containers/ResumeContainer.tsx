import * as React from 'react';
import { AsyncResumeLoad } from '../actions/Resume';
import { Resume } from '../components/Resume';
import { IState } from '../reducers';
import { connect } from 'react-redux';
import { ResumeCard } from '../models/Resume';
import { getResumeCards } from '../selectors/Resume';
import { Dispatch } from 'redux';

interface Props {
  cards: ResumeCard[];
  fetchResume: () => Promise<void>;
}

class ResumeContainer extends React.Component<Props> {

  componentDidMount() {
    this.props.fetchResume();
  }

  render() {
    return (
        <Resume cards={this.props.cards}/>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  cards: getResumeCards(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchResume: () => dispatch(AsyncResumeLoad())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeContainer);