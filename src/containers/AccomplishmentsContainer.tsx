import { CardAccomplishment } from '../models';
import { IState } from '../reducers';
import { connect } from 'react-redux';
import Accomplishments from '../components/Accomplishments';
import { Dispatch } from 'redux';
import { AsyncAddAccomplishment, AsyncUpdateAccomplishment, UpdateAccomplishmentActions } from '../actions';
import { makeGetAccomplishmentsForEditor } from '../selectors';

interface OwnProps {
  accomplishments?: CardAccomplishment[] | undefined;
  parentKey: string;
}

const makeMapStateToProps = () => {
  const getAccomplishments = makeGetAccomplishmentsForEditor();
  const mapStateToProps = (state: IState, props: OwnProps) => ({
    accomplishments: getAccomplishments(state, props.parentKey),
    parentKey: props.parentKey
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch: Dispatch<UpdateAccomplishmentActions>) => ({
  updateAccomplishment: (na: CardAccomplishment) => dispatch(AsyncUpdateAccomplishment(na)),
  addAccomplishment: (na: CardAccomplishment) => dispatch(AsyncAddAccomplishment(na))
});

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(Accomplishments);
