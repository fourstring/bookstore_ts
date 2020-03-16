import React from "react";
import {IBook} from "../types/IBook";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export function Book(props: React.PropsWithoutRef<{ book: IBook }>) {
  return (
    <Card variant={"outlined"}>
      <CardContent>
        <Typography variant={"h5"}>
          {props.book.title}
        </Typography>
        <Typography variant={"h6"} color={"textSecondary"}>
          {props.book.author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color={"primary"} size={"small"} variant={"outlined"}>
          查看详情
        </Button>
        <Button color={"secondary"} size={"small"} variant={"contained"}>
          <AddShoppingCartIcon/>
          加入购物车
        </Button>
      </CardActions>
    </Card>
  )
}
