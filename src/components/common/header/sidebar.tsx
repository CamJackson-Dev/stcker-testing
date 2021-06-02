import React from "react";
import { useHistory } from "react-router-dom";
import {
  ListItem,
  List,
  SwipeableDrawer,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AccountCircle,
  ShoppingCart,
  ExitToApp,
  FavoriteBorder,
  Settings,
  PersonAdd,
  Person,
  Receipt,
  Home,
} from "@material-ui/icons";

import { useStyles } from "./styles";
import {
  COMPANY_NAME,
  TO_FAVOURITES_PAGE,
  TO_HOME_PAGE,
  TO_LOGIN_PAGE,
  TO_ORDERS_PAGE,
  TO_REGISTER_PAGE,
  TO_SETTINGS_PAGE,
  TO_SHOPPING_CART_PAGE,
} from "../../../utils/constants";
import { useAuthUser } from "../../../hooks/useAuthUser";
import { useLogout } from "../../../hooks/useLogout";
import { useModalContext } from "../../../utils/modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const accountSections = [
  {
    name: "Favourites",
    path: TO_FAVOURITES_PAGE,
    icon: <FavoriteBorder />,
  },
  {
    name: "Orders",
    path: TO_ORDERS_PAGE,
    icon: <Receipt />,
  },
  {
    name: "Shopping Cart",
    path: TO_SHOPPING_CART_PAGE,
    icon: <ShoppingCart />,
  },
  {
    name: "Settings",
    path: TO_SETTINGS_PAGE,
    icon: <Settings />,
  },
];

const SideBar: React.FC<Props> = ({ open, onClose, onOpen }) => {
  const user = useAuthUser();

  const { setModalState } = useModalContext();

  const history = useHistory();
  const { handleLogout } = useLogout();
  const classes = useStyles({ variant: undefined });

  const handleClick = (path: string) => {
    onClose();
    const isToRedirectedPage = [
      TO_REGISTER_PAGE,
      TO_LOGIN_PAGE,
      TO_HOME_PAGE,
    ].includes(path);
    if (!user && !isToRedirectedPage) {
      setModalState("login");
      return;
    }
    history.push(path);
  };

  const iOS =
    typeof window !== undefined && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <List className={classes.list}>
        <ListItem className={classes.user}>
          <AccountCircle className={classes.userIcon} />
          <ListItemText
            className={classes.username}
            primary={user ? `Welcome ${user.firstname}` : "Hello Guest"}
          />
        </ListItem>
        <Divider />
        <ListItem
          className={classes.listItem}
          onClick={() => handleClick(TO_HOME_PAGE)}
          button
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        {user ? (
          <div>
            <ListItem
              className={classes.listItem}
              onClick={handleLogout}
              button
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </div>
        ) : (
          <div>
            <ListItem
              className={classes.listItem}
              onClick={() => handleClick(TO_REGISTER_PAGE)}
              button
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary={"Sign Up"} />
            </ListItem>
            <ListItem
              className={classes.listItem}
              onClick={() => handleClick(TO_LOGIN_PAGE)}
              button
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          </div>
        )}
        <Divider />
        <ListItem className={classes.subList}>
          <ListItemText primary={`MY ${COMPANY_NAME.toUpperCase()} ACCOUNT`} />
        </ListItem>

        {accountSections.map((section) => (
          <ListItem
            className={classes.listItem}
            onClick={() => handleClick(section.path)}
            button
            key={section.name}
          >
            <ListItemIcon>{section.icon}</ListItemIcon>
            <ListItemText primary={section.name} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default SideBar;
