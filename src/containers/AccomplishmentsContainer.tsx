import { CardAccomplishment } from '../models';
import { IState } from '../reducers';
import { connect } from 'react-redux';
import Accomplishments from '../components/Accomplishments';
import { Dispatch } from 'redux';
import { AsyncUpdateAccomplishment, UpdateAccomplishmentActions } from '../actions';

interface Props {
  accomplishments: CardAccomplishment[] | undefined;
  parentKey: string;
}

const mapStateToProps = (state: IState, props: Props) => ({
  accomplishments: props.accomplishments,
  parentKey: props.parentKey
});

const mapDispatchToProps = (dispatch: Dispatch<UpdateAccomplishmentActions>) => ({
  updateAccomplishment: (na: CardAccomplishment) => dispatch(AsyncUpdateAccomplishment(na))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accomplishments);
