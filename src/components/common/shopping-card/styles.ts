import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles(
  ({ palette }) => ({
    addToCartBtn: {
      border: "1px solid " + palette.action.disabled,
      padding: "0.5rem",
    },
    card: {
      width: 250,
      position: "relative",
      overflow: "hidden",
      "& .MuiCardMedia-root:hover": {
        transform: "scale(1.3)",
      },
    },
    cardContent: {
      height: 65,
      padding: 10,
      overflow: "hidden",
    },
    cardHeader: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    favourite: {
      color: red[600],
      fontSize: "1.2rem",
    },
    icon: {
      color: palette.action.active,
      fontSize: "1.2rem",
    },
    likeBtn: {
      background: palette.background.paper + ` !important`,
      border: "1px solid " + palette.action.disabled,
      padding: "0.5rem",
      position: "absolute",
      right: 7,
      top: 5,
      zIndex: 200,
    },
    media: {
      height: 250,
      width: "100%",
      transition: "all .5s",
    },
    price: {
      fontWeight: 550,
    },
  }),
  { index: 1 }
);
