import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette, breakpoints }) => ({
    root: {
      background: palette.background.default,
      minHeight: "100vh",
      maxWidth: "100vw",
      width: "100%",
    },
    accountTitle: {
      textAlign: "center",
      marginTop: "1rem",
      width: "100%",
    },
    container: {
      padding: "2rem 0",
      [breakpoints.down("lg")]: {
        padding: "2rem 1.5rem",
      },
    },
    filterBtn: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "5rem",
      position: "absolute",
      left: 0,
      top: 0,
    },
    link: {
      color: palette.primary.main,
      textDecoration: "none",
    },
    paragraph: {
      marginBottom: "1rem",
    },
    shoppingList: {
      justifyContent: "center",
      margin: "0 auto",
      paddingTop: "3rem",
      position: "relative",
      width: "100%",
    },
    slider: {
      "& div": {
        padding: "0.5rem",
      },
    },
    subTitle: {
      marginBottom: "1rem",
    },
    title: {
      marginBottom: "2rem",
    },
  }),
  { index: 1 }
);
