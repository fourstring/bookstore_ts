import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
  /*imgBox: {
    paddingBottom: "100%",
    position: "relative",
    overflow: "hidden"
  },
  img: {
    position: "absolute",
    width: "100%",
  }*/
  img: {
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  imgBox: {},
  imgFixWidth: {
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  }
}));

function _Image(props: React.PropsWithRef<{ src: string, alt: string, width?: number | string }>, ref?: any) {
  const classes = useStyles();
  return (
    <div className={classes.imgBox}>
      <img className={props ? classes.imgFixWidth : classes.img} ref={ref} src={props.src} alt={props.alt}
           width={props.width}/>
    </div>
  )
}

export const Image = React.forwardRef(_Image);
