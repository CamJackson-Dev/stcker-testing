import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ spacing, palette }) => ({
    root: {
      marginTop: "2rem",
    },
    error: {
      color: palette.error.main,
    },
    info: {
      color: palette.info.main,
    },
    paper: {
      width: "100%",
      marginBottom: spacing(2),
    },
    success: {
      color: palette.success.main,
    },
    table: {
      minWidth: 750,
    },
    title: {
      flex: "1 1 100%",
    },
    toolbar: {
      paddingLeft: spacing(2),
      paddingRight: spacing(1),
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }),
  { index: 1 }
);
