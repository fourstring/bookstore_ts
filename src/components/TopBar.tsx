import React, {useMemo, useState} from "react";
import {Link as RouterLink, useRouteMatch} from "react-router-dom";
import {
  AppBar,
  createStyles,
  Divider,
  Grid,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import {menus} from "./Menu";
import {makeStyles} from "@material-ui/core/styles";
import logo from "../logo.svg";
import {ThemeSwitchButton} from "./ThemeSwitchButton";

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    backgroundColor: theme.palette.type === "dark" ? theme.palette.background.paper : "white",
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
  },
  inline: {
    display: "inline"
  },
  tabItem: {
    paddingTop: 15,
    paddingBottom: 15,
    minWidth: "auto",
    color: theme.palette.text.primary
  },
  flex: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    marginRight: 10
  },
  tabs: {
    marginLeft: 10
  }
}));

export function TopBar() {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const match = useRouteMatch();
  const pathToIndexMap = useMemo<Map<string, number>>(() => {
    let map = new Map<string, number>();
    menus.forEach((menu, index) => map.set(menu.path, index));
    return map;
  }, []);
  const [tabIndex, setIndex] = useState<number | undefined>(pathToIndexMap.get(match.path));
  return (
    <AppBar position={"sticky"} className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems={"baseline"}>
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <RouterLink to={"/"} className={classes.link} onClick={event => setIndex(0)}>
                <Grid container alignItems={"center"}>
                  <img src={logo} width={40} alt={""}/>
                  <Typography color={"inherit"} variant={"h6"} noWrap align={"center"}>
                    <span className={classes.tagline}>eBook在线书城</span>
                  </Typography>
                </Grid>
              </RouterLink>
            </div>
            <Divider flexItem orientation={"vertical"}/>
            {isWideScreen && <Tabs
              value={tabIndex ? tabIndex : 0}
              onChange={((event, value) => setIndex(value))}
              className={classes.tabs}
              indicatorColor={"primary"}
            >
              {menus.map(menu => (
                <Tab
                  key={menu.path}
                  component={RouterLink}
                  to={menu.path}
                  label={menu.label}
                  classes={{root: classes.tabItem}}
                />
              ))}
            </Tabs>}
            <ThemeSwitchButton/>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
