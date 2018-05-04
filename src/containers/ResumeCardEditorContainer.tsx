import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { AsyncDeleteCard, AsyncResumeLoad, AsyncUpdateCard } from '../actions';
import ResumeCardEditor from '../components/ResumeCardEditor/ResumeCardEditor';
import { CardContent } from '../models';
import { IState } from '../reducers';
import { makeGetAccomplishmentsForCard } from '../selectors';

interface Props extends RouteComponentProps<{ id: string }> {
  cardContent: CardContent;
  fetchResume: () => Promise<void>;
  updateContents: (nc: CardContent) => Promise<void>;
  deleteCard: (rmCard: CardContent) => Promise<void>;
}

class ResumeCardEditorContainer extends React.Component<Props, {}> {
  componentDidMount() {
    if (Object.keys(this.props.cardContent).length === 1) {
      this.props.fetchResume();
    }
  }
  render() {
    if (Object.keys(this.props.cardContent).length === 1) {
      return null;
    }
    return (
      <ResumeCardEditor
        cardContent={this.props.cardContent}
        updateContents={nc => this.props.updateContents(nc)}
        deleteCard={rmCard => this.props.deleteCard(rmCard)}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getAccomplishmentsForCard = makeGetAccomplishmentsForCard();
  const mapStateToProps = (state: IState, props: Props) => {
    const {
      match: {
        params: { id },
      },
    } = props;
    return {
      cardContent: getAccomplishmentsForCard(state, id),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchResume: () => dispatch(AsyncResumeLoad()),
  updateContents: (nc: CardContent) => dispatch(AsyncUpdateCard(nc)),
  deleteCard: (rmCard: CardContent) => dispatch(AsyncDeleteCard(rmCard)),
});

export default connect(makeMapStateToProps, mapDispatchToProps as any)(
  ResumeCardEditorContainer
);
