import React, {useContext, useState} from "react";
import {IBook} from "../types/IBook";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import {cartItemService} from "../services/CartItemService";
import {bookService} from "../services/BookService";
import {UserContext, UserContextType} from "../contexts/UserContext";
import {cartService} from "../services/CartService";
import {useHistory} from "react-router-dom";
import {Alert} from "./Alert";

export function AddCartDialog(props: React.PropsWithoutRef<{ book: IBook, open: boolean, onClose: () => void }>) {
  const {user, setUser} = useContext(UserContext) as UserContextType;
  const [count, setCount] = useState(1);
  const [addCartState, setAddCartState] = useState({loading: false, success: false, error: false});
  const history = useHistory();
  const error = count <= 0 || count > props.book.stock;

  function handleAddCart() {
    const addCart = async () => {
      setAddCartState({loading: true, success: false, error: false});
      try {
        let res = await cartItemService.post({
          cart: cartService.getResource(user?.cart?.id as number),
          product: bookService.getResource(props.book.id),
          count
        });
        setAddCartState({loading: false, success: true, error: false});
      } catch (e) {
        setAddCartState({loading: false, success: false, error: true});
      }
      props.onClose();
    };
    addCart();
  }

  function handleToLogin() {
    history.push('/login', {from: history.location});
  }

  function handleToCart() {
    history.push('/cart');
  }

  return (
    <>
      <Snackbar open={addCartState.success} autoHideDuration={3000}
                onClose={() => setAddCartState({loading: false, success: false, error: false})}>
        <Alert severity={"success"} action={<Button onClick={handleToCart}>转到购物车</Button>}>
          添加成功！
        </Alert>
      </Snackbar>
      <Snackbar open={addCartState.error} autoHideDuration={3000}
                onClose={() => setAddCartState({loading: false, success: false, error: false})}>
        <Alert severity={"error"}>
          出现错误，请联系管理员！
        </Alert>
      </Snackbar>
      <Dialog open={props.open} onClose={props.onClose}>
        {!user && <>
          <DialogTitle>
            <Typography variant={"h5"}>
              登陆后添加《{props.book.title}》到购物车……
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button onClick={props.onClose} color="primary" variant={"contained"} size={"small"}>
              取消
            </Button>
            <Button onClick={handleToLogin} color="secondary" variant={"contained"} size={"small"}
                    disabled={error}>
              登陆
            </Button>
          </DialogActions>
        </>}
        {user && <>
          <DialogTitle>
            <Typography variant={"h5"}>
              添加《{props.book.title}》到购物车……
            </Typography>
          </DialogTitle>
          <DialogContent>
            {addCartState.loading && <LinearProgress/>}
            <DialogContentText>
              《{props.book.title}》目前剩余{props.book.stock}件
            </DialogContentText>
            <TextField
              value={count}
              onChange={event => setCount(parseInt(event.target.value))}
              autoFocus
              margin="dense"
              label="数量"
              type="number"
              fullWidth
              error={error}
              helperText={error ? "数量不正确" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose} color="primary" variant={"contained"} size={"small"}>
              取消
            </Button>
            <Button onClick={handleAddCart} color="secondary" variant={"contained"} size={"small"}
                    disabled={error}>
              添加
            </Button>
          </DialogActions>
        </>
        }
      </Dialog>
    </>
  )
}

export function AddCartButton(props: React.PropsWithoutRef<{ book: IBook, className?: any }>) {
  const [openDialog, setOpen] = useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Button color={"secondary"} size={"small"} variant={"contained"} onClick={handleClick}
              className={props.className}>
        <AddShoppingCartIcon/>
        加入购物车
      </Button>
      <AddCartDialog book={props.book} open={openDialog} onClose={handleClose}/>
    </>
  )
}
