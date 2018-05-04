import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserService } from '../lib';

const AuthenticatedRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      UserService.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default AuthenticatedRoute;
