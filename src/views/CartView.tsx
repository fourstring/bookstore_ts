import React, {useContext, useState} from "react";
import {UserContext, UserContextType} from "../contexts/UserContext";
import {EntitiesStateActionType, useEntities} from "../hooks/useEntities";
import {ICartItem, ICartItemInput, ICartItemResource} from "../types/ICart";
import {cartItemService} from "../services/CartItemService";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useCheckboxes} from "../hooks/useCheckboxes";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Fab,
  Grid,
  Paper,
  Slide,
  Snackbar,
  Toolbar,
  Typography
} from "@material-ui/core";
import {CartItem} from "../components/CartItem";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {MutateMethods} from "../hooks/useEntity";
import {debounce} from "../utils/debounce";
import {Alert} from "../components/Alert";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    marginTop: 10,
    marginBottom: 10,
  },
  paper: {
    width: "100%",
    padding: 10
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1
  },
  toolBar: {
    paddingLeft: 10,
    paddingRight: 10
  },
  orderButton: {
    marginLeft: 10
  },
  deleteButton: {
    margin: 5
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export function CartView() {
  const {user} = useContext(UserContext) as UserContextType;
  const {entities, loading, mutating, error, issueMutate} = useEntities<ICartItem, ICartItemInput, ICartItemResource>(cartItemService, {
    paged: false,
    projection: "inlined_item",
    search: {
      by: "cartId",
      value: user?.cart?.id as number
    }
  });
  const {selected, checkboxes, select, clear} = useCheckboxes([...entities.values()]);
  const [checkout, setCheckout] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  console.log(selected);

  function renderItems() {
    let items: JSX.Element[] = [];
    for (const [key, value] of entities.entries()) {
      items.push(<Grid item xs={12} key={key} className={classes.item}>
        <Paper elevation={2} className={classes.paper}>
          <Grid container alignItems={"center"}>
            <Grid item xs={1}>
              {value.count <= value.product.stock && checkboxes.get(key)}
            </Grid>
            <Grid item xs={11}>
              <CartItem item={value}
                        onChange={debounce(handleCountChange, 300)}/>
            </Grid>
          </Grid>
        </Paper>
      </Grid>);
    }
    return items;
  }

  function handleDelete() {
    issueMutate({method: MutateMethods.DELETE, ids: selected});
    clear();
  }

  function handleCheckout() {
    issueMutate({
      mutator: async (dispatch) => {
        const newItems = await cartItemService.checkout({
          items: selected
        });
        clear();
        dispatch({type: EntitiesStateActionType.REPLACE_ENTITIES, data: newItems});
        setCheckout(true);
      }
    });
  }

  function handleCountChange(id: number, count: number) {
    issueMutate({
      method: MutateMethods.PATCH,
      ids: [id],
      data: [{
        count
      }]
    })
  }

  function handleToOrders() {
    history.push('/orders');
  }

  return (
    <>
      <Snackbar open={checkout} autoHideDuration={3000} onClose={() => setCheckout(false)}>
        <Alert severity={"success"} action={<Button onClick={handleToOrders}>查看订单</Button>}>
          下单成功！
        </Alert>
      </Snackbar>
      <Backdrop open={mutating} className={classes.backdrop}>
        <CircularProgress color={"inherit"}/>
      </Backdrop>
      {loading && <CircularProgress/>}
      {!loading && <>
        <Slide direction={"up"} in={!loading} mountOnEnter unmountOnExit>
          <Grid container>
            {renderItems()}
            <AppBar className={classes.appBar} position={"sticky"}>
              <Toolbar className={classes.toolBar}>
                {selected.length > 0 &&
                <Fab aria-label="delete" color={"secondary"} size={"small"} className={classes.deleteButton}
                     onClick={debounce(handleDelete, 300)}
                >
                  <DeleteForeverIcon/>
                </Fab>}
                <div className={classes.grow}/>
                <Typography variant={"h6"}>
                  总金额：￥{selected.reduce((previousValue, currentValue) => {
                  const item = entities.get(currentValue) as ICartItem;
                  const product = item.product;
                  return previousValue + item.count * product.price;
                }, 0)}
                </Typography>
                <Button color={"secondary"} size={"small"} variant={"contained"} className={classes.orderButton}
                        disabled={selected.length <= 0} onClick={handleCheckout}>
                  下单购买
                </Button>
              </Toolbar>
            </AppBar>
          </Grid>
        </Slide>
      </>
      }
    </>
  )
}
