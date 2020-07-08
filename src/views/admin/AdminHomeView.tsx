import React from "react";
import {Button, Card, CardActions, CardHeader, createStyles, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CustomLink} from "../../components/CustomLink";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  card: {
    height: 200,
    position: 'relative'
  },
  actionBottom: {
    position: 'absolute',
    bottom: 10,
    width: '100%'
  }
}))

export function AdminHomeView() {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography variant={"h5"}>
              书籍管理
            </Typography>}
            subheader={<Typography variant={"body1"}>
              添加、修改、删除系统中的书籍。
            </Typography>}
          />
          <CardActions className={classes.actionBottom}>
            <Grid container direction={"row-reverse"}>
              <CustomLink to={"/admin/books"}>
                <Button variant={"contained"} color={"primary"}>
                  书籍管理
                </Button>
              </CustomLink>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography variant={"h5"}>
              用户管理
            </Typography>}
            subheader={<Typography variant={"body1"}>
              查看、禁用与启用系统中的用户。
            </Typography>}
          />
          <CardActions className={classes.actionBottom}>
            <Grid container direction={"row-reverse"}>
              <CustomLink to={"/admin/users"}>
                <Button variant={"contained"} color={"primary"}>
                  用户管理
                </Button>
              </CustomLink>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardHeader
            title={<Typography variant={"h5"}>
              订单管理
            </Typography>}
            subheader={<Typography variant={"body1"}>
              查看系统中的订单。
            </Typography>}
          />
          <CardActions className={classes.actionBottom}>
            <Grid container direction={"row-reverse"}>
              <CustomLink to={"/admin/orders"}>
                <Button variant={"contained"} color={"primary"}>
                  订单管理
                </Button>
              </CustomLink>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
