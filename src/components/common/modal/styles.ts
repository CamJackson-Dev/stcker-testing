import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette, breakpoints }) => ({
    button: {
      color: `${palette.common.white} !important`,
      marginBottom: "1.5rem",
    },
    closeIcon: {
      cursor: "pointer",
      fontSize: "2rem",
      position: "absolute",
      right: "3%",
      top: "3%",
    },
    checkIcon: {
      color: palette.success.main,
      display: "block",
      margin: "1rem auto",
      fontSize: "70px",
    },
    legend: {
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "1.5rem",
    },
    link: {
      margin: "0 3px !important",
      color: `${palette.primary.main} !important`,
      textDecoration: "none",
    },
    linkWrapper: {
      display: "flex",
      marginBottom: "1rem",
      "& p": {
        cursor: "pointer",
        color: `${palette.primary.main} !important`,
        marginLeft: "auto",
      },
    },
    loginDialog: {
      width: 400,
      [breakpoints.down("xs")]: {
        width: "90vw",
      },
    },
    logo: { height: 45, width: 160, margin: "1rem auto" },
    message: {
      textAlign: "center",
      fontSize: "0.9rem",
    },
    refreshPageDialog: {
      width: 270,
    },
    successBtn: {
      background: `${palette.success.main} !important`,
      color: palette.common.white,
      display: "block",
      margin: "1rem auto",
    },
    text: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    title: {
      textAlign: "center",
      fontSize: "1rem",
    },
  }),
  { index: 1 }
);
