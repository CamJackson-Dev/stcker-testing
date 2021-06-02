import { Button, ButtonProps } from "@material-ui/core";
import React from "react";

const FormButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      color="primary"
      disableElevation
      fullWidth
      size="large"
      variant="contained"
      type="submit"
      {...props}
    />
  );
};

export default FormButton;
