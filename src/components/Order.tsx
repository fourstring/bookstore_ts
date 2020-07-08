import React from "react";
import {IOrder} from "../types/IOrder";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Image} from "./Image";
import moment from "moment";
import {bookService} from "../services/BookService";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: "100%",
    padding: 10
  },
  grid: {
    width: "100%"
  }
}))

export function Order(props: React.PropsWithoutRef<{ order: IOrder }>) {
  const classes = useStyles();
  const {order} = props;
  const title = order.items[0].product.title;
  const coverPic = bookService.getCoverPicUrl(order.items[0].product.id);
  const totalCount = order.items.reduce(((previousValue, currentValue) => {
    return previousValue + currentValue.count
  }), 0);
  const totalPrice = order.items.reduce(((previousValue, currentValue) => {
    return previousValue + currentValue.count * currentValue.product.price
  }), 0);
  const createAt = moment(order.createAt);

  return (
    <Paper elevation={2} className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={2}>
          <Image src={coverPic} alt={title} width={150}/>
        </Grid>
        <Grid item xs={10} container direction={"column"} justify={"space-between"}>
          <Grid item>
            <Typography variant={"h5"}>
              《{title}》等{totalCount}件商品
            </Typography>
            <Typography variant={"h6"}>
              {createAt.format("YYYY年M月D日HH:mm:ss")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body1"}>
              ￥{totalPrice}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
