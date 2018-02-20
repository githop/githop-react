import { IState } from '../reducers';
import { connect } from 'react-redux';
import Tooltips from '../components/Tooltips/Tooltips';
import { Dispatch } from 'redux';
import { TooltipActions, dismissAction, showAction } from '../actions';
import { ToolTipModel } from '../models';
import { getTooltips } from '../selectors';

const mapStateToProps = (state: IState) => ({
  tooltips: getTooltips(state)
});

const mapDispatchToProps = (dispatch: Dispatch<TooltipActions>) => ({
  dismiss: (tip: ToolTipModel) => dispatch(dismissAction(tip)),
  manual: (tip: ToolTipModel) => dispatch(showAction(tip))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tooltips);