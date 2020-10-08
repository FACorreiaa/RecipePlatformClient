import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { Link as Scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    height: "100vh",
    fontFamily: "Roboto",
  },
  appbar: {
    background: "none",
  },
  appbarTitle: {
    flexGrow: 1,
  },
  appbarWrapper: {
    width: "80%",
    margin: 0,
  },
  icon: {
    color: "black",
    fontSize: "2rem",
  },
  titlecolor: {
    color: "#5AFF30",
  },
  title: {
    color: "#fff",
    fontSize: "5rem",
  },
  container: {
    textAlign: "center",
  },
  goDown: {
    color: "#5aff3d",
    fontSize: "4rem",
  },
}));
function LandingHeader() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            <span className={classes.titlecolor}>Recipe</span>
            <span>Sharing</span>
          </h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={15}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            my
            <span className={classes.titlecolor}>recipe sharing app!</span>
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}

export default LandingHeader;
