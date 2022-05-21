import React, { useState } from "react";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";

import {
  AppBar,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  Toolbar,
  Typography,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

function Header(props) {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List style={{ height: 50 }}>
        <Grid container justify="center" alignContent="center">
          <Typography variant="h5">
            <Link href="/collections">Coleções</Link>
          </Typography>
        </Grid>
      </List>
      <Divider />
      <List style={{ height: 50 }}>
        <Grid container justify="center" alignContent="center">
          <Typography variant="h5">
            <Link href="/home">Home</Link>
          </Typography>
        </Grid>
      </List>
      <Divider />
      <List style={{ height: 50 }}>
        <Grid container justify="center" alignContent="center">
          <Typography variant="h5">
            <Link href="/fav">Favoritos</Link>
          </Typography>
        </Grid>
      </List>
      <Divider />
      <List style={{ height: 50 }}>
        <Grid container justify="center" alignContent="center">
          <Typography variant="h5">
            <Link href="/characters">Personagens</Link>
          </Typography>
        </Grid>
      </List>
      <Divider />
    </div>
  );

  return (
    <Grid>
      <AppBar position="sticky" color="secondary">
        <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
          {list("left")}
        </Drawer>
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            Marvel Explorer
          </Typography>
          <IconButton onClick={toggleDrawer(true)}>
            <AccountCircle style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
export default Header;
