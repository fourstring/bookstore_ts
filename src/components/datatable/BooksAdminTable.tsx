import React from "react";
import {useSearchFilter} from "../../hooks/datatable/useSearchFilter";
import {useMultiFilter} from "../../hooks/datatable/useMultiFilter";
import {bookService} from "../../services/BookService";
import {IDataTableFilterOption} from "../../types/IDataTable";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {BaseDataTable} from "./BaseDataTable";
import {IBook} from "../../types/IBook";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';

const useStyle = makeStyles((theme: Theme) => createStyles({
  root: {
    width: "100%"
  },
  filter: {
    margin: 10,
  },
  table: {
    width: "100%",
    margin: 20
  }
}));

export function BooksAdminTable() {
  const classes = useStyle();
  const [title, TitleFilter] = useSearchFilter({name: "title", placeholder: "标题"});
  const [author, AuthorFilter] = useMultiFilter({
    name: "author",
    placeholder: "作者",
    optionFetcher: async () => {
      let pagedData = await bookService.getAll();
      let result = pagedData.data;
      return result.map<IDataTableFilterOption>(book => ({label: book.author, value: book.author}))
    }
  });
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.filter}>
        {TitleFilter}
      </Grid>
      <Grid item xs={12} className={classes.filter}>
        {AuthorFilter}
      </Grid>
      <Grid item xs={12} className={classes.table}>
        <BaseDataTable<IBook>
          title={"书籍管理"}
          filterInputs={[title, author]}
          dataSource={bookService}
          columns={[
            {
              title: "标题",
              field: "title"
            },
            {
              title: "作者",
              field: "author"
            },
            {
              title: "ISBN",
              field: "isbn"
            },
            {
              title: "价格",
              field: "stock"
            }
          ]}
          options={
            {
              selection: true,
              actionsColumnIndex: -1
            }
          }
          actions={[
            {
              icon: () => <EditIcon/>,
              tooltip: '编辑书籍',
              onClick: (event, data) => {
              },
              position: "row"
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}
