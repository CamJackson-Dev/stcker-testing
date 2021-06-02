import { useApolloClient, useMutation } from "@apollo/client";
import {
  Avatar,
  CircularProgress,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Header from "../components/common/header";
import Form from "../components/common/Form";
import { useStyles } from "../utils/styles/form";
import { SAD_EMOJI_URL } from "../utils/constants";
import { FormValues, resolver } from "../utils/validations";
import CustomAlert from "../components/common/alert";
import LoadingPage from "../components/common/loading/page";
import { RESEND_VERIFICATION_MAIL, VERIFY_EMAIL } from "../utils/mutation/auth";
import { User } from "../utils/types/user";
import FormButton from "../components/common/FormButton";
import FormField from "../components/common/FormField";
import { writeUserToCacheAndRedirect } from "../utils/helpers";

const VerifyEmailPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"none" | "error">("none");

  const client = useApolloClient();
  const history = useHistory();
  const params = useParams<{ token: string }>();
  const [resendVerificationMail, { loading }] = useMutation(
    RESEND_VERIFICATION_MAIL
  );
  const [verifyEmail] = useMutation(VERIFY_EMAIL);
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: { email: "" },
    resolver,
  });

  useEffect(() => {
    verifyEmail({ variables: { token: params.token } })
      .then(({ data }) => {
        const user = data.verifyEmail as User;
        writeUserToCacheAndRedirect({ client, user, history, state: "" });
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
    // eslint-disable-next-line
  }, [params.token]);

  const onSubmit = async (formData: FormValues) => {
    try {
      await resendVerificationMail({ variables: formData });
    } catch (error) {
      setMessage(error.message);
      setOpen(true);
    }
  };

  if (status === "none") return <LoadingPage />;
  return (
    <Paper className={classes.root} square variant="outlined">
      <Header />
      <Container maxWidth="xs" className={classes.container}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CustomAlert
            open={open}
            severity="error"
            onClose={() => setOpen(false)}
            message={message}
          />
          <Avatar
            src={SAD_EMOJI_URL}
            className={classes.emoji}
            variant="rounded"
          />
          <Typography variant="subtitle1" className={classes.text}>
            Oops it looks like something has gone wrong. Either the token has
            expired or is invalid. Please try resending the verification email
          </Typography>
          <FormField register={register} name="email" errors={errors} />
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

export default VerifyEmailPage;
