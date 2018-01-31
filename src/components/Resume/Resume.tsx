import './resume.css';
import * as React from 'react';
import { ResumeCard } from '../../models';
import { ResumeCardDetail } from '../ResumeCardDetail/ResumeCardDetail';
import Loading from '../Loading/Loading';

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
        {renderPage()}
      </div>
  );
};

export default Resume;