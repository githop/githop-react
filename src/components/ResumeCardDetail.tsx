import * as React from 'react';
import { ResumeCard, titleMap, CardTypes, CardContent } from '../models';
import { Link } from 'react-router-dom';
import ResumeCardContent from './ResumeCardContents';

interface IProps {
  card: ResumeCard;
}

const formatTitle = (title: CardTypes) => {
  return titleMap[title];
};

const formatContent = (contents: CardContent[]) => {
  return contents.map((content, i) => {
    return (
        <div key={i}>
          <ResumeCardContent cardContent={content}/>
          <Link to={`/resume/${content.key}/edit`}>Edit</Link>
        </div>
    );
  });
};

export const ResumeCardDetail: React.StatelessComponent<IProps> = ({ card }: IProps) => {
  return (
      <div>
        <h3>{formatTitle(card.type)}</h3>
        <div>
          {formatContent(card.content)}
        </div>
      </div>
  );
};