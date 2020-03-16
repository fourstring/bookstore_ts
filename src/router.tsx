import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import {BooksView} from "./views/BooksView";
import {Container, createStyles, CssBaseline, Theme} from "@material-ui/core";
import {TopBar} from "./components/TopBar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: "100vh",
  },
  topContainer: {
    paddingTop: 40
  }
}));

export function Router() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <CssBaseline/>
      <TopBar/>
      <div className={classes.root}>
        <Container className={classes.topContainer}>
          <Switch>
            <Route path={"/"}>
              <BooksView/>
            </Route>
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}
