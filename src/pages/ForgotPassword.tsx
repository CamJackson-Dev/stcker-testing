import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import React from "react";

import Header from "../components/common/header";
import Form from "../components/common/Form";
import { useStyles } from "../utils/styles/form";
import {
  COMPANY_NAME,
  TO_LOGIN_PAGE,
  TO_REGISTER_PAGE,
} from "../utils/constants";
import FormButton from "../components/common/FormButton";
import { useTitle } from "../hooks/useTitle";
import FormField from "../components/common/FormField";
import { FormValues, resolver } from "../utils/validations";
import { SEND_PASSWORDRESET_MAIL } from "../utils/mutation/auth";

const ForgotPasswordPage: React.FC = () => {
  const classes = useStyles();
  const [sendPasswordResetMail, { loading }] = useMutation(
    SEND_PASSWORDRESET_MAIL
  );
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "" },
    resolver,
  });
  useTitle(`${COMPANY_NAME} - Forgot Password`);

  const onSubmit = async (formData: FormValues) => {
    try {
      await sendPasswordResetMail({ variables: formData });
      toast.success("Mail was sent successfully");
    } catch (ex) {
      toast.error(ex.message);
    }
  };

  return (
    <Paper className={classes.root} square variant="outlined">
      <Header />
      <Container maxWidth="xs" className={classes.container}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classes.legend} component="h1" variant="h6">
            Forgot Password
          </Typography>
          <Typography>
            Please enter the email you registered your account with and we will
            email you a link where you can reset your password.
          </Typography>
          <FormField register={register} name="email" errors={errors} />
          <FormButton className={classes.button} disabled={loading}>
            {loading ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "SEND RESET LINK"
            )}
          </FormButton>
          <Typography className={classes.linkWrapper}>
            Remember your password ?<Link to={TO_LOGIN_PAGE}>Login</Link>
          </Typography>
          <Typography className={classes.linkWrapper}>
            Don't have an account ?
            <Link to={TO_REGISTER_PAGE}>Create account</Link>
          </Typography>
        </Form>
      </Container>
    </Paper>
  );
};

export default ForgotPasswordPage;
