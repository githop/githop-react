import * as React from 'react';
import { ResumeCard } from '../../models/Resume';
import { ResumeCardDetail } from './ResumeCardDetail';

interface IProps {
  cards: ResumeCard[];
}

export const ResumeCards: React.StatelessComponent<IProps> = ({ cards }: IProps) => {
  return (
      <div>
        {cards.map((card, i) => <ResumeCardDetail key={i} card={card}/>)}
      </div>
  );
};
