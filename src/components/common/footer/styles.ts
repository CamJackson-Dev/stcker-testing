import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(
  ({ palette, breakpoints }) => ({
    root: {
      margin: "2rem 0 0 0",
      width: "100%",
    },
    wrapper: {
      padding: "64px 0",
      "& ul": {
        listStyleType: "none",
        margin: 0,
        padding: 0,
      },
      "& li": {
        padding: "6px 0",
        color: palette.text.secondary,
      },
      "& a": {
        textDecoration: "none",
        color: palette.text.secondary,
        fontFamily: "Roboto",
      },
      [breakpoints.down("sm")]: {
        padding: "24px 0",
      },
    },
    gridItem: {
      marginBottom: 32,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
    logo: {
      height: 50,
      width: 180,
      [breakpoints.down("sm")]: {
        margin: "auto",
      },
      [breakpoints.down("xs")]: {
        height: 35,
        width: 125,
      },
    },
    paymentLogo: {
      height: 40,
      width: 80,
      [breakpoints.down("xs")]: {
        height: 30,
        width: 60,
      },
    },
    paymentLogoWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [breakpoints.down("sm")]: {
        marginTop: "1rem",
      },
    },
    text: {
      textAlign: "center",
      marginTop: "1rem",
    },
  }),
  { index: 1 }
);
