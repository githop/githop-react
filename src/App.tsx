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
import AuthenticatedRoute from './components/AuthenticatedRoute';

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

const ResumeEditor = Loadable({
  loader: () => import('./containers/ResumeCardEditorContainer'),
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
                <Route exact={true} path="/resume" component={Resume}/>
                <Route exact={true} path="/login" component={Login}/>
                <AuthenticatedRoute path="/resume/:id/edit" component={ResumeEditor}/>
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
