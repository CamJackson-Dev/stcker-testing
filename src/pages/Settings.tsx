import { Container, Paper } from "@material-ui/core";
import React from "react";

import Header from "../components/common/header";
import PasswordForm from "../components/PasswordForm";
import ProfileForm from "../components/ProfileForm";
import { useTitle } from "../hooks/useTitle";
import { COMPANY_NAME } from "../utils/constants";
import { useStyles } from "../utils/styles/form";

const SettingsPage: React.FC = () => {
  const classes = useStyles();

  useTitle(`${COMPANY_NAME} - Settings`);
  return (
    <Paper className={classes.root} square variant="outlined">
      <Header variant="primary" />
      <Container maxWidth="sm">
        <ProfileForm />
        <PasswordForm />
      </Container>
    </Paper>
  );
};

export default SettingsPage;
