import * as React from 'react';
import { IResumeState } from '../../models/Resume';
import { ResumeCardList } from '../../containers/ResumeCardList';

interface IResumeProps {
  resume: IResumeState;
  fetchResume(): void;
}

export default class Resume extends React.Component<IResumeProps, {}> {

  componentDidMount() {
    this.props.fetchResume();
  }

  render() {
    return (
      <div>
        <h1>Resume works!</h1>
        <ResumeCardList/>
      </div>
    );
  }
}
