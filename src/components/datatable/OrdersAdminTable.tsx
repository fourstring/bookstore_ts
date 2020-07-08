import React from "react";
import {useDateFilter} from "../../hooks/datatable/useDateFilter";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {BaseDataTable} from "./BaseDataTable";
import {IListedOrder} from "../../types/IOrder";
import {orderListService} from "../../services/OrderListService";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles(
  {
    root: {
      padding: 20
    },
    field: {
      marginLeft: 10,
      marginRight: 10
    }
  }
))

export function OrdersAdminTable() {
  const classes = useStyles();
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
    <Grid container direction={'row'} className={classes.root}>
      <Grid container item xs={12} direction={'row'}>
        <Grid xs={12} md={4} style={{
          marginRight: 10
        }}>
          {startFilter}
        </Grid>
        <Grid xs={12} md={4} style={{
          marginLeft: 10
        }}>
          {endFilter}
        </Grid>
      </Grid>
      <Grid item xs={12} style={{
        marginTop: 10
      }}>
        <BaseDataTable<IListedOrder>
          title={'订单管理'}
          filterOptions={
            empty ? {} : {
              search: {
                by: 'startAndEnd'
              },
              filters: [start, end]
            }
          }
          dataSource={orderListService}
          columns={[
            {
              title: '下单用户名',
              field: 'createdUsername',
              sorting: false
            },
            {
              title: '摘要',
              field: 'itemsDigest',
              sorting: false
            },
            {
              title: '总金额',
              field: 'totalPrice',
              sorting: false
            },
            {
              title: '下单时间',
              field: 'createAt'
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}
