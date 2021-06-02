import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles(
  ({ breakpoints, palette }) => ({
    root: {
      margin: "1.5rem 0",
      position: "relative",
      width: "100%",
      overflow: "visible",
    },
    btnGroup: {
      marginBottom: "1rem",
      [breakpoints.down("xs")]: {
        marginBottom: "0.5rem",
      },
    },
    deleteBtn: {
      background: red[500] + ` !important`,
      padding: "0.3rem",
      position: "absolute",
      right: -5,
      top: -10,
      zIndex: 200,
    },
    deleteIcon: {
      color: palette.common.white,
      fontSize: "1.2rem",
    },
    gridContainer: {
      margin: 0,
      width: "100%",
    },
    gridItem: {
      padding: "1rem",
    },
    image: {
      width: "100%",
      flexGrow: 1,
    },
    imageGridItem: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      textTransform: "uppercase",
      marginBottom: "1.5rem",
      [breakpoints.down("sm")]: {
        marginBottom: 0,
        fontSize: "0.9rem",
      },
    },
  }),
  { index: 1 }
);
