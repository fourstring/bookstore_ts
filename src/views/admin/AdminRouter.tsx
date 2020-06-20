import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom"
import {BooksAdminView} from "./BooksAdminView";
import {AdminHomeView} from "./AdminHomeView";
import {OrdersAdminView} from "./OrdersAdminView";
import {UsersAdminView} from "./UsersAdminView";

export function AdminRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/books`}>
        <BooksAdminView/>
      </Route>
      <Route path={`${match.path}/users`}>
        <UsersAdminView/>
      </Route>
      <Route path={`${match.path}/orders`}>
        <OrdersAdminView/>
      </Route>
      <Route path={`${match.path}`}>
        <AdminHomeView/>
      </Route>
    </Switch>
  )
}
