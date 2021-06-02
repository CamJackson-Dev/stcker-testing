import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import Header from "../components/common/header";
import Form from "../components/common/Form";
import { useStyles } from "../utils/styles/form";
import { TO_LOGIN_PAGE } from "../utils/constants";
import CustomAlert from "../components/common/alert";
import { useMutation } from "@apollo/client";
import { RESEND_VERIFICATION_MAIL } from "../utils/mutation/auth";
import FormButton from "../components/common/FormButton";

const UnverifiedEmailPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error">("success");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const [resendVerificationMail, { loading }] = useMutation(
    RESEND_VERIFICATION_MAIL
  );
  const classes = useStyles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await resendVerificationMail({ variables: { email: location.state } });
      setStatus("success");
      setMessage("Email sent successfully");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    } finally {
      setOpen(true);
    }
  };

  if (!location.state) return <Redirect to={TO_LOGIN_PAGE} />;
  return (
    <Paper className={classes.root} square variant="outlined">
      <Header />
      <Container maxWidth="xs" className={classes.container}>
        <Form onSubmit={handleSubmit}>
          <CustomAlert
            open={open}
            severity={status}
            onClose={() => setOpen(false)}
            message={message}
          />
          <Typography className={classes.legend} component="h1" variant="h6">
            Verify your email address
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            An email containing verification instructions was sent to
            <strong> {location.state}.</strong> If you have not received a mail
            check your spam settings or check the spelling of your email
            address.
          </Typography>
          <FormButton className={classes.button} disabled={loading}>
            {loading ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "RESEND VERIFICATION EMAIL"
            )}
          </FormButton>
        </Form>
      </Container>
    </Paper>
  );
};

export default UnverifiedEmailPage;
