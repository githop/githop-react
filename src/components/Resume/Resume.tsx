import './resume.css';
import * as React from 'react';
import { ResumeCard } from '../../models';
import { ResumeCardDetail } from '../ResumeCardDetail/ResumeCardDetail';
import Loading from '../Loading/Loading';
import AdminLinkContainer from '../../containers/AdminLinkContainer';

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
              <Loading/>
            </div>
          </div>
      );
    }
    return cards.map((card, i) => <ResumeCardDetail key={i} card={card}/>);
  };

  return (
      <div className="page-root container">
        <AdminLinkContainer to="/resume/add">Add Card</AdminLinkContainer>
        {renderPage()}
      </div>
  );
};

export default Resume;