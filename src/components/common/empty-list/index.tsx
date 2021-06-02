import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface Props {
  title: string;
  subTitle: string;
}

const EmptyList: React.FC<Props> = ({ children, subTitle, title }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>{children}</Box>
      <Typography variant="h6" className={classes.text}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.text}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default EmptyList;
