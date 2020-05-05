import React, {useState} from "react";
import {CircularProgress, createStyles, Grid, Slide, Theme, Typography} from "@material-ui/core";
import {SearchBar} from "../components/SearchBar";
import {useEntities} from "../hooks/useEntities";
import {IBook} from "../types/IBook";
import {bookService} from "../services/BookService";
import {makeStyles} from "@material-ui/core/styles";
import {Book} from "../components/Book";


const useStyles = makeStyles((theme: Theme) => createStyles({
  loadingIndicator: {
    marginTop: 40
  },
  bookCards: {
    marginTop: 20,
    padding: 12
  }
}));

export function BooksView() {
  const classes = useStyles();
  const [searchKeyWord, setKeyWord] = useState<string>("");
  const {entities, loading, error, issueMutate} = useEntities<IBook>(bookService);
  console.log(entities);
  return (
    <>
      <Grid item xs={12}>
        <SearchBar onChange={event => setKeyWord(event.target.value)} searchText={"书籍"}/>
      </Grid>
      <Grid>
        <Typography>
          {searchKeyWord}
        </Typography>
      </Grid>
      {loading && <Grid container justify={"center"} className={classes.loadingIndicator}>
        <CircularProgress/>
      </Grid>}
      <Slide direction={"up"} in={!loading} mountOnEnter unmountOnExit>
        <Grid container className={classes.bookCards} spacing={3}>
          {(() => {
            let result = [];
            for (let book of entities.values()) {
              result.push(<Grid item md={4} sm={6} xs={12} key={book.id}>
                <Book book={book}/>
              </Grid>)
            }
            return result;
          })()}
        </Grid>
      </Slide>
    </>
  )
}
