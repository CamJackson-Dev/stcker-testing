import { useMutation } from "@apollo/client";
import { CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CustomAlert from "../components/common/alert";
import Form from "../components/common/Form";
import FormButton from "../components/common/FormButton";
import FormField from "../components/common/FormField";
import { CHANGE_PASSWORD } from "../utils/mutation/user";
import { useStyles } from "../utils/styles/form";
import {
  FormValues,
  isObject,
  parseValueIfJSONString,
  resolver,
} from "../utils/validations";

const initialValues = { password: "", newPassword: "" };

const PasswordForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { ...initialValues },
    resolver,
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      await changePassword({
        variables: { params: formData },
      });
      toast.success("Password changed successfully");
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
    } finally {
      reset({ ...initialValues }, { keepErrors: true });
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CustomAlert
          message={message}
          open={Boolean(message)}
          onClose={() => setMessage("")}
          severity="error"
        />
        <Typography className={classes.legend} component="h1" variant="h6">
          Change Password
        </Typography>
        <FormField
          register={register}
          name="password"
          label="Old Password"
          type="password"
          errors={errors}
        />
        <FormField
          register={register}
          name="newPassword"
          label="New Password"
          type="password"
          errors={errors}
        />
        <FormButton className={classes.button} disabled={loading}>
          {loading ? (
            <CircularProgress size={25} color="primary" />
          ) : (
            "CHANGE PASSWORD"
          )}
        </FormButton>
      </Form>
    </Container>
  );
};

export default PasswordForm;
