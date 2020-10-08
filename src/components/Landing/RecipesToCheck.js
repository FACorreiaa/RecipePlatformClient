import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";
import places from "../../assets/static/landing";
import templates from "../../assets/static/landing";
import useWindowPosition from "../../hook/landing";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100hv",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "Column",
    },
  },
}));

function RecipesToCheck() {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="place-to-visit">
      <ImageCard template={templates[0]} checked={checked} />
      <ImageCard template={templates[1]} checked={checked} />
    </div>
  );
}

export default RecipesToCheck;
