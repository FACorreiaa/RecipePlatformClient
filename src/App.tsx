import React from "react";
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from "react-router-dom";
import setAuthToken from "./config/SetAuthToken";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./app/services/auth.service";
import { useDispatch } from "react-redux";
import routesConfig from "./config/routesConfig";
import PrivateRoute from "./config/PrivateRoute";
import { setCurrentUser } from "./app/actions/auth.actions";
import { history} from './config/History'
function App() {
  const dispatch = useDispatch();
  if (localStorage.getItem("JWT_TOKEN")) {
    // Set auth token header auth
    const access_token = localStorage.getItem("JWT_TOKEN");
    setAuthToken(access_token);
    // Decode token and get user info and exp
    const decoded: any = jwt_decode(access_token);
    // Set user and isAuthenticated
    dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/";
    }
  }

  return (
    <Router history={history}>
      <Switch>
        {routesConfig.routes.map(({ component, roles, url }) =>
          roles.length ? (
            <PrivateRoute
              exact
              path={url}
              component={component}
              roles={roles}
            />
          ) : (
            <Route exact path={url} component={component} />
          )
        )}
      </Switch>
    </Router>
  );
}

/*
const RouterPage = (
  props: { children: JSX.Element } & RouteComponentProps
) => props.children*/

export default App;


