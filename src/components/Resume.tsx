import * as React from 'react';
import { ResumeCard } from '../models/Resume';
import { ResumeCards } from './ResumeCards';

interface IResumeProps {
  cards: ResumeCard[];
}

export const Resume: React.StatelessComponent<IResumeProps> = (props: IResumeProps) => {
  return (
      <div>
        <h3>Resume</h3>
        <ResumeCards cards={props.cards}/>
      </div>
  );
};
