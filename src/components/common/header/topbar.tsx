import { IconButton, AppBar, Toolbar, Menu } from "@material-ui/core";
import { Hidden, MenuItem, Button, Divider, Badge } from "@material-ui/core";
import {
  AccountCircle,
  Brightness7,
  Brightness4,
  ShoppingCart,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthUser } from "../../../hooks/useAuthUser";
import { useLogout } from "../../../hooks/useLogout";

import {
  TO_LOGIN_PAGE,
  TO_REGISTER_PAGE,
  TO_SHOPPING_CART_PAGE,
} from "../../../utils/constants";
import { useModalContext } from "../../../utils/modal";
import { useThemeModeContext } from "../../../utils/themeMode";
import { useStyles } from "./styles";

const TopBar: React.FC = ({ children }) => {
  const user = useAuthUser();
  const { setModalState } = useModalContext();
  const { themeMode, onToggleThemeMode } = useThemeModeContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const history = useHistory();
  const { handleLogout } = useLogout();
  const classes = useStyles({ variant: "primary" });

  const handleClick = (path: string) => {
    setAnchorEl(null);
    if (!user) {
      setModalState("login");
      return;
    }

    history.push(path);
  };

  const elements = React.Children.toArray(children);
  return (
    <AppBar className={classes.appbar} position="sticky" variant="outlined">
      <Toolbar className={classes.toolbar}>
        {elements[0]}
        {elements[1]}
        <Hidden smDown>{elements[2]}</Hidden>
        <IconButton
          aria-controls="user-menu"
          aria-haspopup="true"
          className={classes.accountButton}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <AccountCircle className={classes.icon} />
        </IconButton>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          keepMounted
          id="user-menu"
          onClose={() => setAnchorEl(null)}
          transformOrigin={{
            vertical: -40,
            horizontal: "center",
          }}
        >
          {!user ? (
            <div>
              <MenuItem onClick={() => handleClick(TO_LOGIN_PAGE)}>
                <Button color="primary">Login</Button>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleClick(TO_REGISTER_PAGE)}>
                <Button variant="contained" color="primary">
                  Sign Up
                </Button>
              </MenuItem>
            </div>
          ) : (
            <MenuItem onClick={handleLogout}>
              <Button color="primary">Logout</Button>
            </MenuItem>
          )}
        </Menu>
        <IconButton onClick={onToggleThemeMode} className={classes.iconButton}>
          {themeMode === "dark" ? (
            <Brightness7 className={classes.icon} />
          ) : (
            <Brightness4 className={classes.icon} />
          )}
        </IconButton>
        <IconButton
          className={classes.iconButton}
          onClick={() => handleClick(TO_SHOPPING_CART_PAGE)}
        >
          <Badge
            showZero
            badgeContent={user?.carts.length || 0}
            color="primary"
          >
            <ShoppingCart className={classes.icon} />
          </Badge>
        </IconButton>
      </Toolbar>
      <Hidden mdUp>{elements[2]}</Hidden>
    </AppBar>
  );
};

export default TopBar;
