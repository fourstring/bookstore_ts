import React from "react";
import {Paper} from "@material-ui/core";
import {OrdersAdminTable} from "../../components/datatable/OrdersAdminTable";

export function OrdersAdminView() {
  return (
    <Paper elevation={2}>
      <OrdersAdminTable/>
    </Paper>
  )
}
