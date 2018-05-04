import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AsyncAddCard } from '../actions';
import ResumeCardEditor from '../components/ResumeCardEditor/ResumeCardEditor';
import { CardContent, createInstance } from '../models';
import { IState } from '../reducers';

const stubCard = createInstance(CardContent, {
  key: null,
  type: 'experience',
  title: '',
  link: '',
  date: '',
  description: '',
});

const mapStateToProps = (state: IState) => ({
  cardContent: stubCard,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateContents: (nc: CardContent) => dispatch(AsyncAddCard(nc)),
});

export default connect(mapStateToProps, mapDispatchToProps as any)(ResumeCardEditor);
