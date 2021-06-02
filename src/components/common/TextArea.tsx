import {
  Box,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../utils/validations";
import { useStyles } from "../../utils/styles/form";

interface TextAreaProps extends TextareaAutosizeProps {
  errors: DeepMap<FormValues, FieldError>;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
}

const TextArea: React.FC<TextAreaProps> = ({ register, name, errors }) => {
  const classes = useStyles();

  const commonProps = {
    ...register(name),
    placeholder: name[0].toUpperCase() + name.slice(1),
    maxLength: 1000,
    rowsMax: 10,
    rowsMin: 6,
  };
  const message = errors[name]?.message;

  return (
    <Box style={{ marginBottom: "1rem" }}>
      <TextareaAutosize
        className={
          message ? clsx(classes.textarea, classes.error) : classes.textarea
        }
        {...commonProps}
      />
      {message ? (
        <Typography
          variant="caption"
          color="error"
          style={{ margin: "0 14px" }}
        >
          {message}
        </Typography>
      ) : null}
    </Box>
  );
};

export default TextArea;
