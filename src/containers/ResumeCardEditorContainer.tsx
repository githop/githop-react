import * as React from 'react';
import { CardContent } from '../models';
import ResumeCardEditor from '../components/ResumeCardEditor/ResumeCardEditor';
import { IState } from '../reducers';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { makeGetAccomplishmentsForCard } from '../selectors';
import { Dispatch } from 'redux';
import { AsyncResumeLoad, AsyncUpdateCard } from '../actions';

interface Props extends RouteComponentProps<{ id: string }> {
  cardContent: CardContent;
  fetchResume: () => Promise<void>;
  updateContents: (nc: CardContent) => Promise<void>;
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
            updateContents={(nc) => this.props.updateContents(nc)}
        />
    );
  }
}

const makeMapStateToProps = () => {
  const getAccomplishmentsForCard = makeGetAccomplishmentsForCard();
  const mapStateToProps = (state: IState, props: Props) => {
    const { match: { params: { id } } } = props;
    return {
      cardContent: getAccomplishmentsForCard(state, id)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchResume: () => dispatch(AsyncResumeLoad()),
  updateContents: (nc: CardContent) => dispatch(AsyncUpdateCard(nc))
});

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(ResumeCardEditorContainer);