import { CircularProgress, Paper, Typography } from "@material-ui/core";
import { useApolloClient, useMutation } from "@apollo/client";
import { Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import React from "react";

import Header from "../components/common/header";
import Form from "../components/common/Form";
import { COMPANY_NAME, TO_HOME_PAGE } from "../utils/constants";
import FormButton from "../components/common/FormButton";
import FormField from "../components/common/FormField";
import { useTitle } from "../hooks/useTitle";
import { FormValues, resolver } from "../utils/validations";
import { RESET_PASSWORD } from "../utils/mutation/auth";
import { GET_AUTH_USER } from "../utils/queries/user";
import { User } from "../utils/types/user";
import { useStyles } from "../utils/styles/form";

const ResetPasswordPage: React.FC = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const { token } = useParams<{ token: string }>();
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
    resolver,
  });
  useTitle(`${COMPANY_NAME} - Reset Password`);

  const onSubmit = async ({ password }: FormValues) => {
    try {
      const { data } = await resetPassword({ variables: { password, token } });
      const user = data.resetPassword as User;
      client.writeQuery({
        query: GET_AUTH_USER,
        data: { me: user },
      });

      localStorage.setItem("userId", user._id);

      history.push(TO_HOME_PAGE);
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
            Reset Password
          </Typography>
          <FormField
            register={register}
            name="password"
            label="New password"
            errors={errors}
            type="password"
          />
          <FormField
            register={register}
            name="confirmPassword"
            label="Confirm your password"
            type="password"
            errors={errors}
          />
          <FormButton className={classes.button} disabled={loading}>
            {loading ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "CONTINUE"
            )}
          </FormButton>
        </Form>
      </Container>
    </Paper>
  );
};

export default ResetPasswordPage;
