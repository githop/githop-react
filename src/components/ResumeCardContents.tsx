import * as React from 'react';
import { CardAccomplishment, CardContent } from '../models';
import AdminLinkContainer from '../containers/AdminLinkContainer';
interface Props {
  cardContent: CardContent;
}
const formatContentLinkTitle = (content: CardContent) => <a href={content.link}>{content.title}</a>;
const formatContentTitle = (content: CardContent) => <span>{content.title}</span>;

const unsafeRenderDescription = (description: string) => {
  const markup = { __html: description };
  return <p dangerouslySetInnerHTML={markup} />;
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

const ResumeCardContent: React.StatelessComponent<Props> = (props: Props) => {
  const content = props.cardContent;
  return (
      <div>
        <h3>{content.link ? formatContentLinkTitle(content) : formatContentTitle(content)}</h3>
        <AdminLinkContainer to={`/resume/${content.key}/edit`}>
          Edit
        </AdminLinkContainer>
        <p>{content.date}</p>

        <h4>{content.position}</h4>
        {unsafeRenderDescription(content.description)}
        {formatAccomplishments(content.accomplishments)}
      </div>
  );
};

export default ResumeCardContent;