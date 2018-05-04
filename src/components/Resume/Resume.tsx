import * as React from 'react';
import AdminLinkContainer from '../../containers/AdminLinkContainer';
import { ResumeCard } from '../../models';
import Loading from '../Loading/Loading';
import { ResumeCardDetail } from '../ResumeCardDetail/ResumeCardDetail';
import './resume.css';

interface Props {
  cards: ResumeCard[];
  loading: boolean;
  error: string;
}

const Resume: React.StatelessComponent<Props> = (props: Props) => {
  const { cards, loading } = props;

  const renderPage = () => {
    if (loading) {
      return (
        <div className="resume-loading">
          <div>
            <Loading />
          </div>
        </div>
      );
    }
    return cards.map((card, i) => <ResumeCardDetail key={i} card={card} />);
  };

  return (
    <div className="page-root container">
      <AdminLinkContainer to="/resume/add">Add Card</AdminLinkContainer>
      {renderPage()}
    </div>
  );
};

export default Resume;
