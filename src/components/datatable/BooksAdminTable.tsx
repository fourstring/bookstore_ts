import React, {useState} from "react";
import {useSearchFilter} from "../../hooks/datatable/useSearchFilter";
import {bookService} from "../../services/BookService";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {BaseDataTable} from "./BaseDataTable";
import {IBook} from "../../types/IBook";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {BookDetailAdminDialog} from "../dialogs/BookDetailAdminDialog";
import {AddBookDialog} from "../dialogs/AddBookDialog";
import AddIcon from '@material-ui/icons/Add';

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
  // const [author, AuthorFilter] = useMultiFilter({
  //   name: "author",
  //   placeholder: "作者",
  //   optionFetcher: async () => {
  //     let pagedData = await bookService.getAll();
  //     let result = pagedData.data;
  //     return result.map<IDataTableFilterOption>(book => ({label: book.author, value: book.author}))
  //   }
  // });
  const [detailDialogState, setDetailDialog] = useState({
    bookId: 0,
    open: false
  });
  const [newBookDialog, setNewBookDialog] = useState(false);
  const tableRef = React.useRef(null);

  function handleDetailDialogClose() {
    setDetailDialog({
      bookId: 0,
      open: false
    });
    if (tableRef.current) {
      //@ts-ignore
      tableRef.current.onQueryChange();
    }
  }

  function handleNewBookDialogClose() {
    setNewBookDialog(false);
    if (tableRef.current) {
      //@ts-ignore
      tableRef.current.onQueryChange();
    }
  }

  return (
    <>
      <BookDetailAdminDialog bookId={detailDialogState.bookId} open={detailDialogState.open}
                             onClose={handleDetailDialogClose}/>
      <AddBookDialog open={newBookDialog} onClose={handleNewBookDialogClose}/>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.filter}>
          {TitleFilter}
        </Grid>
        {/*<Grid item xs={12} className={classes.filter}>*/}
        {/*  {AuthorFilter}*/}
        {/*</Grid>*/}
        <Grid item xs={12} className={classes.table}>
          <BaseDataTable<IBook>
            title={"书籍管理"}
            tableRef={tableRef}
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
                field: "price"
              },
              {
                title: '库存',
                field: 'stock'
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
                  if ('id' in data) {
                    setDetailDialog({
                      bookId: data.id,
                      open: true
                    });
                  }
                },
                position: "row"
              },
              {
                icon: () => <AddIcon/>,
                tooltip: '新增书籍',
                isFreeAction: true,
                onClick: (event, data) => setNewBookDialog(true)
              }
            ]}
            filterOptions={title.value ? {
              search: {
                by: 'title',
                value: title.value as string
              }
            } : {}}
          />
        </Grid>
      </Grid>
    </>
  )
}
