import * as React from 'react';
import './css/normalize.css';
import './css/skeleton.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch
} from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from './components/home/Home';
import Loading from './components/Loading/Loading';
import TooltipContainer from './containers/TooltipContainer';
const Resume = Loadable({
  loader: () => import('./containers/ResumeContainer'),
  loading: () => <Loading/>
});

const Login = Loadable({
  loader: () => import('./containers/LoginContainer'),
  loading: () => <Loading/>
});

const ResumeEditor = Loadable({
  loader: () => import('./containers/ResumeCardEditorContainer'),
  loading: () => <Loading/>
});

const AddResumeCard = Loadable({
  loader: () => import('./containers/AddResumeCardContainer'),
  loading: () => <Loading/>
});

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="gth-root">
              <TooltipContainer/>
              <div className="gth-content">
                <div className="gth-nav-buffer">
                  <nav className="gth-nav">
                    <NavLink className="gth-nav-link" to="/">
                      <span className="--gth-emoji">🏠</span>
                      <br/>
                      <span className="link-text">Home</span>
                    </NavLink>
                    <NavLink to="/resume">
                      <span className="--gth-emoji">💼</span>
                      <br/>
                      <span className="link-text">Resume</span>
                    </NavLink>
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
                <span><Link to="/login">Admin</Link></span>
              </footer>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
