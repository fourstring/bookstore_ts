import React from "react";
import {IBook} from "../types/IBook";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Divider, Grid, Paper, Typography} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Image} from "./Image";

const useStyles = makeStyles((theme: Theme) => createStyles({
  top: {
    width: "100%",
    padding: 10
  },
  root: {
    paddingTop: 10
  },
  coverPic: {
    maxWidth: 300,
    height: 300,
    [theme.breakpoints.up("md")]: {
      position: "sticky",
      top: 60,
      marginRight: 10
    }
  },
  details: {},
  actions: {
    paddingTop: 10,
    paddingBottom: 10
  },
  addCartButton: {
    marginRight: 10
  }
}));

export function BookDetail(props: React.PropsWithoutRef<{ book: IBook }>) {
  const classes = useStyles();
  return (
    <Paper className={classes.top}>
      <Grid className={classes.root} container justify={"center"}>
        <Grid item xs={12} md={4} className={classes.coverPic}>
          <Image src={props.book.cover_pic} alt={props.book.title}/>
        </Grid>
        <Grid item xs={12} md={8} container direction={"column"} className={classes.details}>
          <Typography variant={"h5"}>
            {props.book.title}
          </Typography>
          <Typography variant={"h6"} color={"textSecondary"}>
            {props.book.author}
          </Typography>
          <Grid item container className={classes.actions}>
            <Button color={"secondary"} size={"small"} variant={"contained"} className={classes.addCartButton}>
              <AddShoppingCartIcon/>
              加入购物车
            </Button>
            <Typography variant={"h6"}>
              库存{props.book.stock}件
            </Typography>
          </Grid>
          <Divider/>
          <Typography variant={"h5"}>
            简介
          </Typography>
          <Typography variant={"body1"}>
            {props.book.description}
          </Typography><Typography variant={"body1"}>
          {props.book.description}
        </Typography><Typography variant={"body1"}>
          {props.book.description}
        </Typography><Typography variant={"body1"}>
          {props.book.description}
        </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
