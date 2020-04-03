import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom"
import {BooksAdminView} from "./BooksAdminView";
import {AdminHomeView} from "./AdminHomeView";

export function AdminRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/books`}>
        <BooksAdminView/>
      </Route>
      <Route path={`${match.path}`}>
        <AdminHomeView/>
      </Route>
    </Switch>
  )
}
