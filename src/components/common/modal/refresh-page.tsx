import {
  Dialog,
  // DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface Props {
  message: string;
  open: boolean;
  title: string;
}

const RefreshPageModal: React.FC<Props> = ({ open, message, title }) => {
  const classes = useStyles();

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <Dialog
      aria-labelledby="refresh-page-dialog"
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      PaperProps={{ className: classes.refreshPageDialog }}
    >
      <DialogContent>
        <Typography variant="h6" className={classes.title} gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.message}>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button fullWidth autoFocus onClick={handleClick} color="primary">
          RELOAD
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefreshPageModal;
