import React, {useContext} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {UserContext, UserContextType} from "../contexts/UserContext";

export function AuthRoute({children, ...rest}: RouteProps) {
  const {user} = useContext(UserContext) as UserContextType;
  return (
    <Route
      {...rest}
      render={({location}) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )
      }
    />
  )
}
