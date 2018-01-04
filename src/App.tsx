import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Home from './components/Home/Home';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { store } from './store';

const Resume = Loadable({
  loader: () => import('./containers/ResumePage'),
  loading() {
    return <div>Loading...</div>;
  }
});

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="App">
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/resume">Resume</Link></li>
                </ul>
              </nav>

              <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/resume" component={Resume}/>
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
