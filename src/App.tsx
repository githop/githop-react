import * as React from 'react';
import './css/normalize.css';
import './css/skeleton.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink as Link,
  Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const Home = Loadable({
  loader: () => import('./components/home/Home'),
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

const AddResumeCard = Loadable({
  loader: () => import('./containers/AddResumeCardContainer'),
  loading() {
    return <div>Loading...</div>;
  }
});

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="gth-root">
              <div className="gth-content">
                <div className="gth-nav-buffer">
                  <nav className="gth-nav">
                    <Link to="/">
                      <span className="--gth-emoji">🏠</span>
                      <br/>
                      <span className="link-text">Home</span>
                    </Link>
                    <Link to="/resume">
                      <span className="--gth-emoji">💼</span>
                      <br/>
                      <span className="link-text">Resume</span>
                    </Link>
                    {/*<Link to="/login">Admin login</Link>*/}
                  </nav>
                </div>

                <Switch>
                  <Route exact={true} path="/" component={Home}/>
                  <Route exact={true} path="/resume" component={Resume}/>
                  <Route exact={true} path="/login" component={Login}/>
                  <AuthenticatedRoute exact={true} path="/resume/add" component={AddResumeCard}/>
                  <AuthenticatedRoute path="/resume/:id/edit" component={ResumeEditor}/>
                </Switch>
              </div>
              <footer className="gth-footer">
                Built with love by&nbsp;
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/githop/githop-react">githop</a>
              </footer>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
