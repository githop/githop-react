import { IState } from '../reducers';
import { CardContent, createInstance } from '../models';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ResumeCardEditor from '../components/ResumeCardEditor/ResumeCardEditor';
import { AsyncAddCard } from '../actions';

const stubCard = createInstance(CardContent, {
  key: null,
  type: 'experience',
  title: '',
  link: '',
  date: '',
  description: '',
});

const mapStateToProps = (state: IState) => ({
  cardContent: stubCard
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateContents: (nc: CardContent) => dispatch(AsyncAddCard(nc))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeCardEditor);