import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import {BooksView} from "./views/BooksView";
import {createStyles, CssBaseline, Grid, Theme} from "@material-ui/core";
import {TopBar} from "./components/TopBar";
import {makeStyles} from "@material-ui/core/styles";
import {BookDetailView} from "./views/BookDetailView";
import {LoginView} from "./views/LoginView";
import {AuthRoute} from "./utils/AuthRoute";
import {CartView} from "./views/CartView";
import {AdminRouter} from "./views/admin/AdminRouter";
import {OrdersView} from "./views/OrdersView";
import {LogoutView} from "./views/LogoutView";

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
        <Grid container>
          <Grid item xs={undefined} md={2}/>
          <Grid item xs={12} md={8} container justify={"center"} className={classes.topContainer}>
            <Switch>
              <Route path={"/books/:bookId"}>
                <BookDetailView/>
              </Route>
              <Route path={"/books"}>
                <BooksView/>
              </Route>
              <Route path={"/login"}>
                <LoginView/>
              </Route>
              <AuthRoute path={"/cart"}>
                <CartView/>
              </AuthRoute>
              <AuthRoute path={"/orders"}>
                <OrdersView/>
              </AuthRoute>
              <AuthRoute path={"/logout"}>
                <LogoutView/>
              </AuthRoute>
              <Route path={"/admin"}>
                <AdminRouter/>
              </Route>
              <Route path={"/"}>
                <BooksView/>
              </Route>
            </Switch>
          </Grid>
          <Grid item xs={undefined} md={2}/>
        </Grid>
      </div>
    </BrowserRouter>
  );
}
