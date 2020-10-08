import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./config/SetAuthToken";
import jwt_decode from "jwt-decode";
import { logoutUser, setCurrentUser } from "./app/services/auth.service";
import { Provider, useDispatch } from "react-redux";
import routesConfig from "./config/routesConfig";
import PrivateRoute from "./config/PrivateRoute";
import { store } from "./app/store";

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
      window.location.href = "./searchVehicles";
    }
  }

  return (
    <Router>
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

export default App;
