import { useMutation } from "@apollo/client";
import {
  CircularProgress,
  IconButton,
  Paper,
  Typography,
  Container,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import Header from "../components/common/header";
import Form from "../components/common/Form";
import { useStyles } from "../utils/styles/form";
import {
  TO_LOGIN_PAGE,
  COMPANY_NAME,
  TO_UNVERIFED_EMAIL_PAGE,
  TO_TERMS_OF_SERVICE_PAGE,
  TO_PRIVACY_POLICY_PAGE,
} from "../utils/constants";
import {
  FormValues,
  isObject,
  parseValueIfJSONString,
  resolver,
} from "../utils/validations";
import { REGISTER_USER } from "../utils/mutation/auth";
import CustomAlert from "../components/common/alert";
import FormButton from "../components/common/FormButton";
import { useTitle } from "../hooks/useTitle";
import FormField from "../components/common/FormField";
import {
  EnhancedDivider,
  GoogleButton,
} from "../components/common/social-button";
import { useSocialAuth } from "../hooks/useSocialAuth";

const RegisterPage: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  const [message, setMessage] = useState("");

  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const classes = useStyles();
  const history = useHistory();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "", firstname: "", lastname: "", password: "" },
    resolver,
  });
  useTitle(`${COMPANY_NAME} - Register`);

  const { isLoading, googleSignIn } = useSocialAuth("register");

  const onSubmit = async (formData: FormValues) => {
    try {
      await registerUser({ variables: formData });
      history.push(TO_UNVERIFED_EMAIL_PAGE, formData.email);
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
            Create Account
          </Typography>
          <FormField register={register} name="firstname" errors={errors} />
          <FormField register={register} name="lastname" errors={errors} />
          <FormField register={register} name="email" errors={errors} />
          <FormField
            register={register}
            name="password"
            errors={errors}
            helperText={
              errors.password?.message ||
              "Password should be up to 12 characters"
            }
            type={hidden ? "password" : "text"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setHidden((prevState) => !prevState)}
                  >
                    {hidden ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography className={classes.policyText}>
            By clicking Create Account, you agree to our
            <Link className={classes.link} to={TO_TERMS_OF_SERVICE_PAGE}>
              Terms of Use
            </Link>
            and{" "}
            <Link className={classes.link} to={TO_PRIVACY_POLICY_PAGE}>
              Privacy Policy.
            </Link>{" "}
          </Typography>
          <FormButton className={classes.button} disabled={disabled}>
            {disabled ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "CREATE ACCOUNT"
            )}
          </FormButton>
          <Typography className={classes.linkWrapper}>
            Already have an account ?<Link to={TO_LOGIN_PAGE}>Login</Link>
          </Typography>
          <EnhancedDivider />
          <GoogleButton
            text="Signup with Google"
            onClick={googleSignIn}
            disabled={disabled}
          />
        </Form>
      </Container>
    </Paper>
  );
};

export default RegisterPage;
