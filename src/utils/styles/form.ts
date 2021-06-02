import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette, breakpoints }) => ({
    root: {
      background:
        palette.type === "light"
          ? palette.background.paper
          : palette.background.default,
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    appbar: {
      background: palette.background.paper,
    },
    button: {
      color: `${palette.common.white} !important`,
      marginBottom: "1rem",
    },
    container: {
      alignItems: "center",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      [breakpoints.down("xs")]: {
        padding: "2rem",
      },
    },
    error: {
      border: `1px solid ${palette.error.main} !important`,
      "&:focus": {
        border: `2px solid ${palette.error.main} !important`,
      },
    },
    emoji: {
      height: 100,
      width: 100,
      margin: "1rem auto",
    },
    legend: {
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "0.5rem",
    },
    link: {
      margin: "0 3px !important",
      color: `${palette.primary.main} !important`,
      textDecoration: "none",
    },
    linkWrapper: {
      display: "flex",
      marginBottom: "1rem",
      "& a": {
        color: `${palette.primary.main} !important`,
        marginLeft: "auto",
        textDecoration: "none",
      },
    },
    logo: {
      height: 45,
      width: 45,
    },
    logoWrapper: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    policyText: {
      marginBottom: "1rem",
      fontSize: "0.9rem",
    },
    text: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    textField: {
      margin: "1rem auto",
    },
    textarea: {
      background: palette.background.default,
      borderRadius: "4px",
      border: `1px solid ${palette.action.disabled}`,
      color: palette.text.primary,
      fontFamily: "Roboto",
      fontSize: "1rem",
      outline: "none",
      padding: "10px 14.5px",
      resize: "none",
      width: "100%",
      "&:focus": {
        border: `2px solid ${palette.primary.main}`,
      },
    },
    title: {
      color: palette.primary.main,
      fontSize: 20,
      fontWeight: 550,
      marginRight: 5,
    },
    toolbar: {
      margin: "auto",
      maxWidth: 850,
      width: "100%",
    },
  }),
  { index: 1 }
);
