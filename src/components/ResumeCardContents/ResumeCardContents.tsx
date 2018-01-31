import * as React from 'react';
import './resumeCardContents.css';
import { CardAccomplishment, CardContent } from '../../models';
import AdminLinkContainer from '../../containers/AdminLinkContainer';

interface Props {
  cardContent: CardContent;
}

const formatContentLinkTitle = (content: CardContent) => (
    <a className="--gth-underline" href={content.link}>{content.title}</a>
);
const formatContentTitle = (content: CardContent) => <span className="--gth-underline">{content.title}</span>;

const unsafeRenderDescription = (description: string) => {
  const markup = {__html: description};
  return <p dangerouslySetInnerHTML={markup}/>;
};

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

const ResumeCardContents: React.StatelessComponent<Props> = (props: Props) => {
  const content = props.cardContent;
  const formattedTitle =
      content.link ? formatContentLinkTitle(content) : formatContentTitle(content);
  return (
      <div className="gth-card-contents">
        <AdminLinkContainer to={`/resume/${content.key}/edit`}>
          Edit
        </AdminLinkContainer>
        <div className="gth-card-header">
          <h3>{formattedTitle}</h3>
          <p><code>{content.date}</code></p>
        </div>
        <h4>{content.position}</h4>
        {unsafeRenderDescription(content.description)}
        {formatAccomplishments(content.accomplishments)}
      </div>
  );
};

export default ResumeCardContents;