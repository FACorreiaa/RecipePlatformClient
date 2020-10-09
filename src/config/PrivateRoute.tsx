import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

interface IPrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
  roles: string[];
  userRoles: string[];

}

const PrivateRoute = ({
  component: Component,
  roles = [],
  userRoles = [],
  ...rest
}: IPrivateRouteProps) => {
  console.log("aqui");
  const auth = useSelector((state: any) => state.auth);
  const hasRole = roles.some(role => roles.includes(role));

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true && hasRole ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
