import * as React from 'react';
import { ResumeCard } from '../models';
import { ResumeCards } from './ResumeCards';

interface IResumeProps {
  cards: ResumeCard[];
}

export const Resume: React.StatelessComponent<IResumeProps> = (props: IResumeProps) => {
  return (
      <div className="page-root container">
        <ResumeCards cards={props.cards}/>
      </div>
  );
};
