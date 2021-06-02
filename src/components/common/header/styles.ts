import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Props } from ".";

export const useStyles = makeStyles(
  ({ palette, breakpoints }) => ({
    accountButton: {
      marginLeft: "1.5rem",
      [breakpoints.down("sm")]: {
        marginLeft: "auto",
      },
    },
    appbar: ({ variant }: Props) => ({
      background:
        variant === "primary" && palette.type === "light"
          ? palette.primary.main
          : palette.type === "light"
          ? palette.background.paper
          : palette.background.default,
      width: "100%",
      padding: "2px 0",
    }),
    icon: {
      color: palette.common.white,
      fontSize: "1.7rem",
      [breakpoints.down("xs")]: {
        fontSize: "1.5rem",
      },
    },
    iconButton: {
      marginLeft: "1.5rem",
      [breakpoints.down("xs")]: {
        marginLeft: "0.5rem",
      },
    },
    inputProps: {
      color: palette.common.white,
    },
    input: {
      borderRadius: "6px",
      background: palette.type === "dark" ? palette.background.paper : red[800],
      color: palette.common.white,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 400,
      paddingLeft: "1rem",
      width: "100%",
      [breakpoints.down("sm")]: {
        margin: "0.5rem auto",
        maxWidth: "none",
        width: "90%",
      },
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
    logo: {
      height: 45,
      width: 160,
      marginLeft: "1rem",
      [breakpoints.down("xs")]: {
        marginLeft: "0",
        height: 30,
        width: 108,
      },
    },
    menuIcon: {
      color: palette.common.white,
      [breakpoints.down("xs")]: {
        fontSize: "1.4rem",
      },
    },
    title: ({ variant }: Props) => ({
      color:
        variant === "primary" ? palette.common.white : palette.primary.main,
      fontSize: 20,
      fontWeight: 550,
      marginRight: "1rem",
    }),
    toolbar: ({ variant }: Props) => ({
      margin: "auto",
      maxWidth: variant === "primary" ? "none" : 850,
      display: variant === "primary" ? "flex" : undefined,
      width: "100%",
      [breakpoints.down("xs")]: {
        paddingLeft: variant === "primary" ? "5px" : undefined,
        paddingRight: variant === "primary" ? "5px" : undefined,
      },
    }),
    list: {
      padding: "0px",
    },
    listItem: {
      padding: "10px 30px",
    },
    search: {
      background: "transparent !important",
    },
    subList: {
      "& span": {
        color: palette.text.secondary,
        fontWeight: 550,
      },
    },
    switch: {
      marginLeft: "1.5rem",
    },
    user: {
      padding: "20px",
    },
    userIcon: {
      fontSize: "2rem",
    },
    username: {
      marginLeft: "10px",
      textTransform: "capitalize",
    },
  }),
  { index: 1 }
);
