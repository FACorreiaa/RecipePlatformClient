import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import User from "../app/interfaces/user.interface";

interface IPrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType;
  roles: string[];
}

const PrivateRoute = ({
  component: Component,
  roles = [],
  ...rest
}: IPrivateRouteProps) => {
  console.log("aqui");
  const auth = useSelector((state: any) => state.auth);
  console.log("1", auth);

  const userRoles: any = auth.user.user.role ?? [];
  console.log("2", userRoles);

  // check the route's roles to see if any match a role the user has
  const hasRole = roles.some((role) => userRoles.includes(role));
  console.log("3", hasRole);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true && hasRole ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
