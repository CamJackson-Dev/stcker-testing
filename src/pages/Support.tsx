import { useMutation } from "@apollo/client";
import {
  CircularProgress,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CustomAlert from "../components/common/alert";
import Form from "../components/common/Form";
import FormButton from "../components/common/FormButton";
import FormField from "../components/common/FormField";
import Header from "../components/common/header";
import TextArea from "../components/common/TextArea";
import { useTitle } from "../hooks/useTitle";
import { COMPANY_NAME } from "../utils/constants";
import { useStyles } from "../utils/styles/form";
import { CREATE_REQUEST } from "../utils/mutation/request";
import {
  FormValues,
  isObject,
  parseValueIfJSONString,
  resolver,
} from "../utils/validations";

const SupportPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const classes = useStyles();
  const [createRequest, { loading }] = useMutation(CREATE_REQUEST);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { subject: "", message: "", email: "" },
    resolver,
  });
  useTitle(`${COMPANY_NAME} - Support`);

  const onSubmit = async (formData: FormValues) => {
    try {
      await createRequest({ variables: { params: formData } });
      toast.success(
        "Message sent successfully. We will get back to you shortly"
      );
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

  return (
    <Paper className={classes.root} square variant="outlined">
      <Header />
      <Container maxWidth="sm" className={classes.container}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CustomAlert
            message={message}
            open={Boolean(message)}
            onClose={() => setMessage("")}
            severity="error"
          />
          <Typography component="h1" variant="h3" className={classes.text}>
            Want To Get In Touch?
          </Typography>
          <Typography component="h2" variant="h5" className={classes.text}>
            Contact us using the form below and we'll be happy to help answer
            your questions.
          </Typography>
          <FormField
            register={register}
            name="email"
            label="Email"
            errors={errors}
          />
          <FormField
            register={register}
            name="subject"
            label="Subject"
            errors={errors}
          />
          <TextArea register={register} name="message" errors={errors} />
          <FormButton className={classes.button} disabled={loading}>
            {loading ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "SUBMIT"
            )}
          </FormButton>
        </Form>
      </Container>
    </Paper>
  );
};

export default SupportPage;
