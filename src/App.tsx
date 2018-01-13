import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { store } from './store';

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading() {
    return <div>Loading...</div>;
}
});

const Resume = Loadable({
  loader: () => import('./containers/ResumeContainer'),
  loading() {
    return <div>Loading...</div>;
  }
});

const Login = Loadable({
  loader: () => import('./containers/LoginContainer'),
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
                  <li><Link to="/login">Admin login</Link></li>
                </ul>
              </nav>

              <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/resume" component={Resume}/>
                <Route path="/login" component={Login}/>
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
