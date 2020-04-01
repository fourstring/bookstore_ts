import React from "react";
import {IUser} from "../types/IUser";
import {Avatar, createStyles, IconButton, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
);

export function UserIndicator(props: React.PropsWithoutRef<{ user: IUser | null }>) {
  const classes = useStyles();
  return (
    <>
      {props.user &&
      <IconButton>
        <Avatar className={classes.avatar}>
          {props.user?.username[0]}
        </Avatar>
      </IconButton>
      }
    </>
  )
}
