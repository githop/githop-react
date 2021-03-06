import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AsyncPopover, showAction } from './actions';
import App from './App';
import './index.css';
import { createTooltip } from './models';
import registerServiceWorker, {
  SW_CACHED,
  SW_NEEDS_UPDATE,
} from './registerServiceWorker';
import { store } from './store';
const handleServiceWorker = (swDispatch: SW_CACHED | SW_NEEDS_UPDATE) => {
  if (swDispatch === SW_CACHED) {
    const toolTip = createTooltip(null, {
      text: 'Website cached for use offline!',
    });
    store.dispatch(AsyncPopover(toolTip) as any);
  }

  if (swDispatch === SW_NEEDS_UPDATE) {
    const tooltip = createTooltip(null, {
      text: `Looks like Tom's been busy! Reload to get updates.`,
      manual: true,
      buttonText: 'reload',
      action: () => window.location.reload(),
    });
    store.dispatch(showAction(tooltip));
  }
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker(handleServiceWorker);
