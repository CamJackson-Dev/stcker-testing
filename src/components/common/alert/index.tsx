import { Collapse, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";

interface Props {
  message: string;
  open: boolean;
  onClose: () => void;
  severity: "error" | "info" | "warning" | "success";
}

const CustomAlert: React.FC<Props> = ({ message, open, onClose, severity }) => {
  return (
    <Collapse
      style={{
        margin: "0.5rem auto",
        width: "fit-content",
      }}
      in={open}
    >
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        severity={severity}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
