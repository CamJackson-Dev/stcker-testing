import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";

import { useStyles } from "./styles";
import { Google } from "./icon";

interface Props extends ButtonProps {
  text: string;
}

export const EnhancedDivider: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.dividerGroup}>
      <Box className={classes.divider}></Box>
      <Typography variant="h6" style={{ margin: "0 0.8rem" }}>
        OR
      </Typography>
      <Box className={classes.divider}></Box>
    </Box>
  );
};

export const GoogleButton: React.FC<Props> = ({ text, ...props }) => {
  const classes = useStyles();
  const { disabled } = props;
  return (
    <Button
      {...props}
      size="large"
      fullWidth
      className={clsx(classes.button, classes.googleBtn)}
    >
      {disabled ? (
        <CircularProgress
          className={classes.loading}
          size={25}
          color="primary"
        />
      ) : (
        <>
          <Google />
          <Typography>{text}</Typography>
          <Typography></Typography>
        </>
      )}
    </Button>
  );
};
