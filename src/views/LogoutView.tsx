import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {UserContext, UserContextType} from "../contexts/UserContext";
import {authService} from "../services/AuthService";
import {CircularProgress} from "@material-ui/core";

export function LogoutView() {
  const history = useHistory();
  const {user, setUser} = useContext(UserContext) as UserContextType;
  useEffect(() => {
    authService.logout().then(() => {
      setUser(null);
      history.replace('/');
    })
  }, []);
  return (
    <CircularProgress/>
  )
}
