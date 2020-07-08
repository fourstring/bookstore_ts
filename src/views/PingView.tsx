import React, {useContext, useEffect} from "react";
import {CircularProgress, Container, createStyles, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {UserContext, UserContextType} from "../contexts/UserContext";
import {authService} from "../services/AuthService";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: "100%"
  }
}))

export function PingView() {
  const classes = useStyles();
  const {user, setUser} = useContext(UserContext) as UserContextType;
  useEffect(() => {
    authService.ping().then(value => {
      setUser(value.user)
    });
  }, []);
  return (
    <Paper elevation={2}>
      <Container>
        <CircularProgress/>
        <Typography variant={"body1"}>
          请稍候，正在尝试获取您的信息……
        </Typography>
      </Container>
    </Paper>
  )
}
