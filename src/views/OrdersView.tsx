import React, {useContext} from "react";
import {PagedView} from "../utils/PagedView";
import {orderService} from "../services/OrderService";
import {UserContext, UserContextType} from "../contexts/UserContext";
import {IOrder} from "../types/IOrder";
import {Order} from "../components/Order";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
  order: {
    marginTop: 10,
    marginBottom: 10
  }
}))

export function OrdersView() {
  const classes = useStyles();
  const {user} = useContext(UserContext) as UserContextType;
  return (
    <PagedView<IOrder> dataSource={orderService} filter={{
      sort: "createAt,desc",
      size: 10,
      search: {
        by: "userId",
        value: user?.id
      }
    }}>
      {(data, paginator) => {
        let orders: JSX.Element[] = [];
        data.forEach((value, key) => orders.push(<Grid item xs={12} key={key} className={classes.order}>
          <Order order={value}/>
        </Grid>));
        return (
          <>
            {orders}
            <Grid item xs={12} container direction={"row-reverse"}>
              {paginator}
            </Grid>
          </>
        )
      }}
    </PagedView>
  )
}
