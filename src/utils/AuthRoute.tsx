import React, {useContext} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {UserContext, UserContextType} from "../contexts/UserContext";

export function AuthRoute({children, ...rest}: RouteProps) {
  const {user, setUser} = useContext(UserContext) as UserContextType;
  return (
    <Route
      {...rest}
      render={({location}) => {
        if (user) {
          return children;
        } else {
          return (<Redirect
            to={{
              pathname: "/login",
              state: {from: location}
            }}
          />);
        }
      }
      }
    />
  )
}
