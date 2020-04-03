import React from "react";
import {
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  PopperPlacementType,
  Typography
} from "@material-ui/core";
import {CustomLink} from "./CustomLink";

export interface PlacementMenuItem {
  text?: string;
  icon?: any;
  linkTo?: string;
}

export interface PlacementMenuProps extends React.PropsWithChildren<any> {
  open: boolean;
  anchorRef: React.MutableRefObject<any>;
  onClose: (e?: React.MouseEvent<EventTarget> | React.KeyboardEvent<EventTarget>) => void;
  placement: PopperPlacementType;
  items: Array<PlacementMenuItem | null>;
}

export function PlacementMenu(props: PlacementMenuProps) {

  const handleClose = (e: React.MouseEvent<EventTarget>) => {
    if (props.anchorRef.current && props.anchorRef.current.contains(e.target as HTMLElement)) {
      return;
    }
    props.onClose(e);
  };

  function handleListKeyDown(e: React.KeyboardEvent<EventTarget>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      props.onClose(e);
    }
  }

  return (
    <Popper open={props.open} anchorEl={props.anchorRef.current} transition disablePortal placement={props.placement}>
      {({TransitionProps}) =>
        <Grow {...TransitionProps}>
          <Paper elevation={2}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={props.open} onKeyDown={handleListKeyDown}>
                {props.items.filter(Boolean).map(((value, index) =>
                  <MenuItem onClick={handleClose} key={value?.text}>
                    {
                      !value?.linkTo &&
                      <>{value?.icon}
                        <Typography variant={"body1"}>
                          {value?.text}
                        </Typography>
                      </>
                    }
                    {
                      value?.linkTo &&
                      <CustomLink to={value?.linkTo}>
                        <Grid container>
                          {value?.icon}
                          <Typography variant={"body1"}>
                            {value?.text}
                          </Typography>
                        </Grid>
                      </CustomLink>
                    }
                  </MenuItem>))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      }
    </Popper>
  )
}
