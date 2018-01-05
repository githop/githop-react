import * as React from 'react';
import { ResumeCard } from '../../models/Resume';

interface IProps {
  card: ResumeCard;
}

export const ResumeCardDetail: React.StatelessComponent<IProps> = ({ card }: IProps) => {
  return (
      <div>
        <h3>{card.type}</h3>
        <div>
          <pre>{JSON.stringify(card.content, null, 2)}</pre>
        </div>
      </div>
  );
};