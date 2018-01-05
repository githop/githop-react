import * as React from 'react';
import { ResumeCard, titleMap, CardTypes, CardContent, CardAccomplishment } from '../models/Resume';

interface IProps {
  card: ResumeCard;
}

const formatTitle = (title: CardTypes) => {
  return titleMap[title];
};

const formatContentLinkTitle = (content: CardContent) => <a href={content.link}>{content.title}</a>;
const formatContentTitle = (content: CardContent) => <span>{content.title}</span>;

const formatAccomplishments = (accomplishments: CardAccomplishment[] | undefined) => {
  if (accomplishments == null) {
    return '';
  }
  return (
      <ul>
        {accomplishments.map((a, i) => <li key={i}>{a.text}</li>)}
      </ul>
  );
};

const unsafeRenderDescription = (description: string) => {
  const markup = { __html: description };
  return <p dangerouslySetInnerHTML={markup} />;
};

const formatContent = (contents: CardContent[]) => {
  return contents.map((content, i) => {
    return (
        <div key={i}>
          <h3>{content.link ? formatContentLinkTitle(content) : formatContentTitle(content)}</h3>
          <p>{content.date}</p>

          <h4>{content.position}</h4>
          {unsafeRenderDescription(content.description)}

          {formatAccomplishments(content.accomplishments)}

          {i + 1 === contents.length && <hr/>}
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