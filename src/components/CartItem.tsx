import React, {useEffect, useState} from "react";
import {ICartItem} from "../types/ICart";
import {createStyles, Grid, TextField, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Image} from "./Image";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export function CartItem(props: React.PropsWithoutRef<{
  item: ICartItem,
  onChange?: (id: number, count: number) => void
}>) {
  const {item} = props;
  const {product} = item;
  const [count, setCount] = useState(item.count);
  useEffect(() => {
    if (count != item.count) {
      if (props.onChange) {
        props.onChange(item.id, count);
      }
    }
  }, [count]);
  return (
    <Grid container>
      <Grid item xs={4}>
        <Image src={product.cover_pic} alt={product.title} width={150}/>
      </Grid>
      <Grid item container justify={"space-between"} xs={8} direction={"column"}>
        <Grid item>
          <Typography variant={"h5"}>
            {product.title}
          </Typography>
          <Typography variant={"h6"} color={"textSecondary"}>
            {product.author}
          </Typography>
          {item.count > product.stock && <Typography variant={"body2"}>
            库存不足！当前库存{product.stock}件。
          </Typography>}
        </Grid>
        <Grid item container justify={"space-between"} alignItems={"baseline"}>
          <Typography variant={"body1"} color={"textSecondary"}>
            ￥{product.price * item.count}
          </Typography>
          <TextField
            label="数量"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={count}
            onChange={event => setCount(parseInt(event.target.value))}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
