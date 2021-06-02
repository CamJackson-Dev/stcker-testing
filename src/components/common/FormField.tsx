import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { useStyles } from "../../utils/styles/form";
import { FormValues } from "../../utils/validations";

type Props = TextFieldProps & {
  register: UseFormRegister<FormValues>;
  name: keyof FormValues;
  errors: DeepMap<FormValues, FieldError>;
};
const FormField: React.FC<Props> = ({
  register,
  name,
  errors,
  ...textFieldProps
}) => {
  const classes = useStyles();

  const commonProps = {
    className: classes.textField,
    error: Boolean(errors[name]?.message),
    helperText: errors[name]?.message,
    fullWidth: true,
    inputRef: register(name).ref,
    label: name[0].toUpperCase() + name.slice(1),
    name: register(name).name,
    onChange: register(name).onChange,
    onBlur: register(name).onBlur,
    size: "small" as const,
    variant: "outlined" as const,
  };

  return <TextField {...commonProps} {...textFieldProps} />;
};

export default FormField;
