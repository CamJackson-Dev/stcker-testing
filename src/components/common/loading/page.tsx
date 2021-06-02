import { CircularProgress, Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface Props {
  style?: React.CSSProperties;
}

const LoadingPage: React.FC<Props> = ({ style }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square variant="outlined" style={style}>
      <CircularProgress size={40} color="primary" />
    </Paper>
  );
};

export default LoadingPage;
