import React, {useState} from "react";
import {IUser} from "../types/IUser";
import {Avatar, Button, createStyles, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {PlacementMenu} from "./PlacementMenu";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import PaymentIcon from '@material-ui/icons/Payment';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: 10
    },
  }),
);

export function UserIndicator(props: React.PropsWithoutRef<{ user: IUser | null }>) {
  const classes = useStyles();
  const [accountMenuOpen, setOpen] = useState(false);
  const indicatorRef = React.useRef<any>();
  return (
    <>
      {props.user &&
      <>
        <Button onClick={() => setOpen(!accountMenuOpen)} ref={indicatorRef}>
          <Avatar className={classes.avatar}>
            {props.user?.username[0].toUpperCase()}
          </Avatar>
          <Typography variant={"body1"}>
            欢迎，{props.user?.username}!
          </Typography>
        </Button>
        <PlacementMenu open={accountMenuOpen} anchorRef={indicatorRef} onClose={() => setOpen(false)}
                       placement={"bottom"} items={[
          {
            icon: <PersonIcon/>,
            text: "我的信息",
            linkTo: "/my"
          },
          {
            icon: <ShoppingCartIcon/>,
            text: "购物车",
            linkTo: "/cart"
          },
          {
            icon: <PaymentIcon/>,
            text: "我的订单",
            linkTo: "/orders"
          },
          (props.user?.admin ? {
            icon: <AssessmentIcon/>,
            text: "管理面板",
            linkTo: "/admin"
          } : null)
        ]}/>
      </>
      }
    </>
  )
}
