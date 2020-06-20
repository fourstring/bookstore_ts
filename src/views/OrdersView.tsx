import React, {useContext} from "react";
import {PagedView} from "../utils/PagedView";
import {orderService} from "../services/OrderService";
import {UserContext, UserContextType} from "../contexts/UserContext";
import {IOrder} from "../types/IOrder";
import {Order} from "../components/Order";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDateFilter} from "../hooks/datatable/useDateFilter";

const useStyles = makeStyles((theme: Theme) => createStyles({
  order: {
    marginTop: 10,
    marginBottom: 10
  }
}))

export function OrdersView() {
  const classes = useStyles();
  const {user} = useContext(UserContext) as UserContextType;
  const [start, startFilter] = useDateFilter({
    name: 'start',
    placeholder: '起始日期'
  });
  const [end, endFilter] = useDateFilter({
    name: 'end',
    placeholder: '终止日期'
  });
  const empty = !(start.value && end.value);
  return (
    <PagedView<IOrder> dataSource={orderService} filter={{
      sort: "createAt,desc",
      size: 10,
      search: {
        by: empty ? "userId" : "userIdAndStartAndEnd",
      },
      filters: empty ? [
        {
          name: 'userId',
          value: `${user?.id}`
        }
      ] : [
        {
          name: 'userId',
          value: `${user?.id}`
        },
        start,
        end
      ]
    }}>
      {(data, paginator) => {
        let orders: JSX.Element[] = [];
        data.forEach((value, key) => orders.push(<Grid item xs={12} key={key} className={classes.order}>
          <Order order={value}/>
        </Grid>));
        return (
          <>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Paper elevation={2} style={{
                  padding: 10
                }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant={'h6'}>
                        按日期筛选您的订单。
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} style={{marginRight: 10}}>
                      {startFilter}
                    </Grid>
                    <Grid xs={12} md={4} style={{marginLeft: 10}}>
                      {endFilter}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {orders}
              <Grid item xs={12} container direction={"row-reverse"}>
                {paginator}
              </Grid>
            </Grid>
          </>
        )
      }}
    </PagedView>
  )
}
