import * as React from 'react';
import { ResumeCard, titleMap, CardTypes, CardContent } from '../models';
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
        </div>
    );
  });
};

export const ResumeCardDetail: React.StatelessComponent<IProps> = ({ card }: IProps) => {
  return (
      <div>
        <h1>{formatTitle(card.type)}</h1>
        <div>
          {formatContent(card.content)}
        </div>
      </div>
  );
};