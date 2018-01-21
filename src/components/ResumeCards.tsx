import * as React from 'react';
import { ResumeCard } from '../models';
import { ResumeCardDetail } from './ResumeCardDetail/ResumeCardDetail';

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
