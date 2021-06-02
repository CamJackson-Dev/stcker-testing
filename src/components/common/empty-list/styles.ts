import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette, breakpoints }) => ({
    root: {
      margin: "1rem auto",
      width: 325,
      [breakpoints.down("xs")]: {
        width: "95%",
      },
    },
    text: {
      marginBottom: "1rem",
      textAlign: "center",
    },
    wrapper: {
      alignItems: "center",
      border: "3px solid " + palette.text.primary,
      borderRadius: "50%",
      display: "flex",
      height: "62px",
      justifyContent: "center",
      margin: "1rem auto",
      width: "62px",
    },
  }),
  { index: 1 }
);
