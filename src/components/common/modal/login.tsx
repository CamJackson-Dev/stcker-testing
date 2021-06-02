import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import {
  COMPANY_LOGO_URL,
  COMPANY_NAME,
  TO_FORGOT_PASSWORD_PAGE,
  TO_REGISTER_PAGE,
} from "../../../utils/constants";
import { LOGIN_USER } from "../../../utils/mutation/auth";
import { User } from "../../../utils/types/user";
import {
  FormValues,
  isObject,
  parseValueIfJSONString,
  resolver,
} from "../../../utils/validations";
import CustomAlert from "../alert";
import Form from "../Form";
import FormButton from "../FormButton";
import FormField from "../FormField";
import { useStyles } from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const [hidden, setHidden] = useState(true);
  const [message, setMessage] = useState("");

  const history = useHistory();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
    resolver,
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const { data } = await loginUser({ variables: formData });
      const user = data.login as User;
      localStorage.setItem("userId", user._id);
      window.location.reload();
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

  const handleNavigate = (path: string) => {
    reset({ email: "", password: "" }, { keepErrors: false });
    onClose();
    history.push(path);
  };

  const handleClose = () => {
    reset({ email: "", password: "" }, { keepErrors: false });
    onClose();
  };

  return (
    <Dialog
      aria-labelledby="login-dialog"
      open={open}
      onClose={handleClose}
      PaperProps={{ className: classes.loginDialog }}
    >
      <Close className={classes.closeIcon} onClick={handleClose} />
      <DialogContent>
        <Avatar
          src={COMPANY_LOGO_URL}
          className={classes.logo}
          variant="square"
          alt={COMPANY_NAME}
        />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <CustomAlert
            message={message}
            open={Boolean(message)}
            onClose={() => setMessage("")}
            severity="error"
          />
          <Typography variant="h6" style={{ textAlign: "center" }} gutterBottom>
            Login to continue shopping
          </Typography>
          <FormField register={register} name="email" errors={errors} />
          <FormField
            register={register}
            name="password"
            errors={errors}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setHidden(!hidden)}
                  >
                    {hidden ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            type={hidden ? "password" : "text"}
          />
          <Typography className={classes.linkWrapper}>
            <Typography onClick={() => handleNavigate(TO_FORGOT_PASSWORD_PAGE)}>
              Forgot Password
            </Typography>
          </Typography>
          <FormButton className={classes.button} disabled={loading}>
            {loading ? <CircularProgress size={25} color="primary" /> : "LOGIN"}
          </FormButton>
          <Typography className={classes.linkWrapper}>
            <Typography onClick={() => handleNavigate(TO_REGISTER_PAGE)}>
              Create account
            </Typography>
          </Typography>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
