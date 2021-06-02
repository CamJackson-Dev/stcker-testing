import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette }) => ({
    button: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1rem",
      textTransform: "none",
      minHeight: 42,
    },
    divider: {
      border: `1px solid ${palette.divider}`,
      flexGrow: 1,
    },
    dividerGroup: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0.5rem 0",
    },
    icon: {
      fontSize: "2rem !important",
    },
    loading: { margin: "auto" },
    logo: {
      width: 40,
      height: 40,
      borderRadius: "4px",
    },
    googleBtn: {
      background: `rgb(66, 133, 244)`,
      color: `${palette.background.paper} !important`,
      padding: 1,
      "&:hover": {
        background: `rgb(66, 133, 244)`,
      },
    },
  }),
  { index: 1 }
);
