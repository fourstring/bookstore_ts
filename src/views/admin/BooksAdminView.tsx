import React from "react";
import {Paper} from "@material-ui/core";
import {BooksAdminTable} from "../../components/datatable/BooksAdminTable";

export function BooksAdminView() {
  return (
    <Paper elevation={2}>
      <BooksAdminTable/>
    </Paper>
  )
}
