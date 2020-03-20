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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

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
          image={props.book.cover_pic}
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
        <Link to={`/books/${props.book.id}`}>
          <Button color={"primary"} size={"small"} variant={"outlined"}>
            查看详情
          </Button>
        </Link>
        <Button color={"secondary"} size={"small"} variant={"contained"}>
          <AddShoppingCartIcon/>
          加入购物车
        </Button>
      </CardActions>
    </Card>
  )
}
