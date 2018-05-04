import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { dismissAction, showAction, TooltipActions } from '../actions';
import Tooltips from '../components/Tooltips/Tooltips';
import { ToolTipModel } from '../models';
import { IState } from '../reducers';
import { getTooltips } from '../selectors';

const mapStateToProps = (state: IState) => ({
  tooltips: getTooltips(state),
});

const mapDispatchToProps = (dispatch: Dispatch<TooltipActions>) => ({
  dismiss: (tip: ToolTipModel) => dispatch(dismissAction(tip) as any),
  manual: (tip: ToolTipModel) => dispatch(showAction(tip) as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tooltips);
