import React from "react";
import {useParams} from "react-router-dom"
import {useEntity} from "../hooks/useEntity";
import {IBook} from "../types/IBook";
import {bookService} from "../services/BookService";
import {CircularProgress, Grid, Slide} from "@material-ui/core";
import {BookDetail} from "../components/BookDetail";

export function BookDetailView() {
  const {bookId} = useParams();
  const {data, loading, error} = useEntity<IBook>(parseInt(bookId as string), bookService);
  console.log(data, loading);
  return (
    <Grid item xs={12}>
      {loading && <CircularProgress/>}
      <Slide direction={"up"} in={!loading} mountOnEnter unmountOnExit>
        <Grid container>
          <BookDetail book={data as IBook}/>
        </Grid>
      </Slide>
    </Grid>
  )
}
