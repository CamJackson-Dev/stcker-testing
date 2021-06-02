import { useApolloClient, useMutation } from "@apollo/client";
import {
  CircularProgress,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";

import CustomAlert from "../components/common/alert";
import Header from "../components/common/header";
import Form from "../components/common/Form";
import { useStyles } from "../utils/styles/form";
import {
  COMPANY_NAME,
  TO_FORGOT_PASSWORD_PAGE,
  TO_REGISTER_PAGE,
} from "../utils/constants";
import { LOGIN_USER } from "../utils/mutation/auth";
import {
  FormValues,
  isObject,
  parseValueIfJSONString,
  resolver,
} from "../utils/validations";
import { User } from "../utils/types/user";
import { useTitle } from "../hooks/useTitle";
import FormButton from "../components/common/FormButton";
import FormField from "../components/common/FormField";
import {
  EnhancedDivider,
  GoogleButton,
} from "../components/common/social-button";
import { useSocialAuth } from "../hooks/useSocialAuth";
import { writeUserToCacheAndRedirect } from "../utils/helpers";

const LoginPage: React.FC = () => {
  const [message, setMessage] = useState("");

  const client = useApolloClient();
  const history = useHistory();
  const { state } = useLocation<string>();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
    resolver,
  });
  const { googleSignIn, isLoading } = useSocialAuth("login");
  useTitle(`${COMPANY_NAME} - Login`);

  const onSubmit = async (formData: FormValues) => {
    try {
      const { data } = await loginUser({ variables: formData });
      const user = data.login as User;
      writeUserToCacheAndRedirect({ client, history, state, user });
    } catch (ex) {
      const fields = Object.keys(formData);
      const errors = parseValueIfJSONString(ex.message);

      if (isObject(errors)) {
        if (errors.message) {
          setMessage(errors.message);
        }

        Object.keys(errors).forEach((errorKey) => {
          if (fields.includes(errorKey)) {
            setError(errorKey as keyof FormValues, {
              message: errors[errorKey],
            });
          }
        });
      } else {
        setMessage(errors);
      }
    }
  };

  const disabled = isLoading || loading;
  return (
    <Paper className={classes.root} square variant="outlined">
      <Header />
      <Container maxWidth="xs" className={classes.container}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CustomAlert
            message={message}
            open={Boolean(message)}
            onClose={() => setMessage("")}
            severity="error"
          />
          <Typography className={classes.legend} component="h1" variant="h6">
            Login to your Account
          </Typography>
          <FormField register={register} name="email" errors={errors} />
          <FormField
            register={register}
            name="password"
            errors={errors}
            type="password"
          />
          <Typography className={classes.linkWrapper}>
            <Link to={TO_FORGOT_PASSWORD_PAGE}>Forgot Password</Link>
          </Typography>
          <FormButton className={classes.button} disabled={disabled}>
            {disabled ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "LOGIN"
            )}
          </FormButton>
          <Typography className={classes.linkWrapper}>
            Don't have an account ?
            <Link to={TO_REGISTER_PAGE}>Create account</Link>
          </Typography>
          <EnhancedDivider />
          <GoogleButton
            text="Login with Google"
            onClick={googleSignIn}
            disabled={disabled}
          />
        </Form>
      </Container>
    </Paper>
  );
};

export default LoginPage;
