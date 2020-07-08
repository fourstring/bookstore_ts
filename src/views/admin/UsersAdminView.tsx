import React from "react";
import {Paper} from "@material-ui/core";
import {UsersAdminTable} from "../../components/datatable/UsersAdminTable";

export function UsersAdminView() {
  return (
    <Paper elevation={2}>
      <UsersAdminTable/>
    </Paper>
  )
}
