import * as React from 'react';
import { CardContent, CardTypes, emojiMap, ResumeCard, titleMap } from '../../models';
import ResumeCardContents from '../ResumeCardContents/ResumeCardContents';
import './resumeCardDetail.css';

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
        <ResumeCardContents cardContent={content} />
        {!(contents.length - 1 === i) && <hr className="--gth-hr" />}
      </div>
    );
  });
};

export const ResumeCardDetail: React.StatelessComponent<IProps> = ({ card }: IProps) => {
  return (
    <div>
      <div className="card-type">
        <span className="--gth-emoji">{emojiMap[card.type]}</span>
        <h1>
          <span className="--gth-underline">{formatTitle(card.type)}</span>
        </h1>
      </div>
      <div className="gth-resume-card --gth-border --gth-border-radius">
        {formatContent(card.content)}
      </div>
    </div>
  );
};
