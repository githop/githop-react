import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AsyncAddAccomplishment,
  AsyncDeleteAccomplishment,
  AsyncUpdateAccomplishment,
  UpdateAccomplishmentActions,
} from '../actions';
import Accomplishments from '../components/Accomplishments';
import { CardAccomplishment } from '../models';
import { IState } from '../reducers';
import { makeGetAccomplishmentsForEditor } from '../selectors';

interface OwnProps {
  accomplishments?: CardAccomplishment[] | undefined;
  parentKey: string;
}

const makeMapStateToProps = () => {
  const getAccomplishments = makeGetAccomplishmentsForEditor();
  const mapStateToProps = (state: IState, props: OwnProps) => ({
    accomplishments: getAccomplishments(state, props.parentKey),
    parentKey: props.parentKey,
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateAccomplishmentActions>) => ({
  updateAccomplishment: (na: CardAccomplishment) =>
    dispatch(AsyncUpdateAccomplishment(na) as any),
  addAccomplishment: (na: CardAccomplishment) =>
    dispatch(AsyncAddAccomplishment(na) as any),
  deleteAccomplishment: (accomplishmentKey: string) =>
    dispatch(AsyncDeleteAccomplishment(accomplishmentKey) as any),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Accomplishments);
