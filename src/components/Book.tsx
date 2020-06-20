import React from "react";
import {IBook} from "../types/IBook";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  Theme,
  Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CustomLink} from "./CustomLink";
import {AddCartButton} from "./AddCartButton";
import {bookService} from "../services/BookService";

const useStyles = makeStyles((theme: Theme) => createStyles({
  media: {
    height: 300,
  }
}));

export function Book(props: React.PropsWithoutRef<{ book: IBook }>) {
  const classes = useStyles();
  return (
    <Card variant={"outlined"}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={bookService.getCoverPicUrl(props.book.id)}
          title={props.book.title}
        />
        <CardContent>
          <Typography variant={"h5"}>
            {props.book.title}
          </Typography>
          <Typography variant={"h6"} color={"textSecondary"}>
            {props.book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CustomLink to={`/books/${props.book.id}`}>
          <Button color={"primary"} size={"small"} variant={"outlined"}>
            查看详情
          </Button>
        </CustomLink>
        <AddCartButton book={props.book}/>
      </CardActions>
    </Card>
  )
}
