import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette }) => ({
    root: {
      alignItems: "center",
      background:
        palette.type === "light"
          ? palette.background.paper
          : palette.background.default,
      display: "flex",
      justifyContent: "center",

      minHeight: "100vh",
      maxWidth: "100vw",
      width: "100%",
    },
    filterBtn: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "5rem",
      position: "absolute",
      left: 0,
      top: 0,
    },
    shoppingList: {
      justifyContent: "center",
      margin: "0 auto",
      paddingTop: "3rem",
      position: "relative",
    },
    slider: {
      "& div": {
        padding: "0.5rem",
      },
    },
  }),
  { index: 1 }
);
