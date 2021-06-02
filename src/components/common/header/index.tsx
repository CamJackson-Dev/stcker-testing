import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { Menu as MenuIcon, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import {
  COMPANY_LOGO_URL,
  COMPANY_NAME,
  TO_HOME_PAGE,
} from "../../../utils/constants";
import { useStyles } from "./styles";
import TopBar from "./topbar";
import SideBar from "./sidebar";

export interface Props {
  variant?: "primary" | "secondary";
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const Header: React.FC<Props> = ({ variant, onChange, value }) => {
  const classes = useStyles({ variant });
  const [open, setOpen] = useState(false);

  const logoElement = (
    <Link className={classes.link} to={TO_HOME_PAGE}>
      <Avatar
        alt={COMPANY_NAME}
        className={classes.logo}
        src={COMPANY_LOGO_URL}
        variant="rounded"
      />
    </Link>
  );

  const inputElement = (
    <InputBase
      placeholder="Search for stickers"
      inputProps={{ "aria-label": "Search for stickers" }}
      className={classes.input}
      value={value}
      onChange={onChange}
      endAdornment={
        <IconButton>
          <Search className={classes.icon} />
        </IconButton>
      }
    />
  );

  if (variant === "primary") {
    return (
      <>
        <TopBar>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          {logoElement}
          {inputElement}
        </TopBar>
        <SideBar
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        />
      </>
    );
  }
  return (
    <AppBar className={classes.appbar} position="sticky" variant="outlined">
      <Toolbar className={classes.toolbar}>{logoElement}</Toolbar>
    </AppBar>
  );
};

export default Header;
