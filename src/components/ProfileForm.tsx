import { useMutation } from "@apollo/client";
import { CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CustomAlert from "../components/common/alert";
import Form from "../components/common/Form";
import FormButton from "../components/common/FormButton";
import FormField from "../components/common/FormField";
import { useAuthUser } from "../hooks/useAuthUser";
import { EDIT_PROFILE } from "../utils/mutation/user";
import { GET_AUTH_USER } from "../utils/queries/user";
import { useStyles } from "../utils/styles/form";
import {
  FormValues,
  isObject,
  parseValueIfJSONString,
  resolver,
} from "../utils/validations";

const ProfileForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const user = useAuthUser();

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE);
  const classes = useStyles();
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: user?.email,
      firstname: user?.firstname,
      lastname: user?.lastname,
    },
    resolver,
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      await editProfile({
        variables: { params: formData },
        update: (cache) => {
          let me = { ...user, ...formData };
          cache.writeQuery({ query: GET_AUTH_USER, data: { me } });
        },
      });
      toast.success("Profile saved successfully");
      reset(undefined, { keepDirty: false });
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
    <Container maxWidth="xs" className={classes.container}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CustomAlert
          message={message}
          open={Boolean(message)}
          onClose={() => setMessage("")}
          severity="error"
        />
        <Typography className={classes.legend} component="h1" variant="h6">
          Edit Profile
        </Typography>
        <FormField register={register} name="firstname" errors={errors} />
        <FormField register={register} name="lastname" errors={errors} />
        <FormField register={register} name="email" errors={errors} />
        <FormButton className={classes.button} disabled={loading || !isDirty}>
          {loading ? <CircularProgress size={25} color="primary" /> : "SAVE"}
        </FormButton>
      </Form>
    </Container>
  );
};

export default ProfileForm;
