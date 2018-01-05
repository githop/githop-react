import { AsyncResumeLoad } from '../actions/Resume';
import Resume from '../components/Resume';
import { IState } from '../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: IState) => ({
  resume: state.resume
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchResume: () => dispatch(AsyncResumeLoad())
});

export const ResumeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Resume);