import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<Props> = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      aria-labelledby="payment-success-dialog"
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      PaperProps={{ className: classes.loginDialog }}
    >
      <DialogContent>
        <CheckCircle className={classes.checkIcon} />
        <Typography variant="h6" className={classes.text}>
          Payment Successful
        </Typography>
        <Typography className={classes.text}>
          Your payment was successfully. Check your email for an order
          confirmation
        </Typography>
        <Button
          fullWidth
          className={classes.successBtn}
          onClick={onClose}
          size="large"
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;
