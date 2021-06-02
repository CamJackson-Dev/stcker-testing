import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import {
  TO_SHOPPING_CART_PAGE,
  TO_FAVOURITES_PAGE,
  TO_FORGOT_PASSWORD_PAGE,
  TO_HOME_PAGE,
  TO_LOGIN_PAGE,
  TO_REGISTER_PAGE,
  TO_UNVERIFED_EMAIL_PAGE,
  TO_VERIFY_EMAIL_PAGE,
  TO_PRIVACY_POLICY_PAGE,
  TO_TERMS_OF_SERVICE_PAGE,
  TO_ORDERS_PAGE,
  TO_RESET_PASSWORD_PAGE,
  TO_SUPPORT_PAGE,
  TO_SETTINGS_PAGE,
} from "../utils/constants";
import RefreshPageModal from "../components/common/modal/refresh-page";
import { useAuthUser } from "../hooks/useAuthUser";
import ProtectedRoute from "./ProtectedRoute";
import RedirectedRoute from "./RedirectedRoute";
import FavouritesPage from "../pages/Favourites";
import ForgotPasswordPage from "../pages/ForgotPassword";
import LoginPage from "../pages/Login";
import OrdersPage from "../pages/Orders";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import RegisterPage from "../pages/Register";
import ResetPasswordPage from "../pages/ResetPassword";
import SettingsPage from "../pages/Settings";
import HomePage from "../pages/Home";
import ShoppingCartPage from "../pages/ShoppingCart";
import SupportPage from "../pages/Support";
import TermsOfServicesPage from "../pages/TermsOfServices";
import UnverifiedEmailPage from "../pages/UnverifiedEmail";
import VerifyEmailPage from "../pages/VerifyEmail";
import LoginModal from "../components/common/modal/login";
import { ModalState } from "../utils/types/modal";
import { ModalProvider } from "../utils/modal";

const Routes = () => {
  const user = useAuthUser();
  const [modalState, setModalState] = useState<ModalState>("none");

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) return;
      if (event.key === "userId") {
        if (event.newValue === null && user) {
          setModalState("refresh-page");
        } else if (event.newValue !== null && !user) {
          window.location.reload();
        }
      }
    };
    if (user) {
      localStorage.setItem("userId", user._id);
    }
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, [user]);

  return (
    <ModalProvider setModalState={setModalState}>
      <LoginModal
        open={modalState === "login"}
        onClose={() => setModalState("none")}
      />
      <RefreshPageModal
        open={modalState === "refresh-page"}
        message="You were logged out of your account. Please press ‘Reload’ to log in to your account"
        title="Please log in again"
      />
      <Switch>
        <Route component={HomePage} exact path={TO_HOME_PAGE} />
        <Route
          component={PrivacyPolicyPage}
          exact
          path={TO_PRIVACY_POLICY_PAGE}
        />
        <Route component={SupportPage} exact path={TO_SUPPORT_PAGE} />
        <Route
          component={TermsOfServicesPage}
          exact
          path={TO_TERMS_OF_SERVICE_PAGE}
        />

        <RedirectedRoute component={LoginPage} exact path={TO_LOGIN_PAGE} />
        <RedirectedRoute
          component={ResetPasswordPage}
          exact
          path={TO_RESET_PASSWORD_PAGE}
        />
        <RedirectedRoute
          component={RegisterPage}
          exact
          path={TO_REGISTER_PAGE}
        />
        <RedirectedRoute
          component={ForgotPasswordPage}
          exact
          path={TO_FORGOT_PASSWORD_PAGE}
        />
        <RedirectedRoute
          component={UnverifiedEmailPage}
          exact
          path={TO_UNVERIFED_EMAIL_PAGE}
        />
        <RedirectedRoute
          component={VerifyEmailPage}
          exact
          path={TO_VERIFY_EMAIL_PAGE}
        />

        <ProtectedRoute
          component={FavouritesPage}
          exact
          path={TO_FAVOURITES_PAGE}
        />
        <ProtectedRoute component={OrdersPage} exact path={TO_ORDERS_PAGE} />
        <ProtectedRoute
          component={ShoppingCartPage}
          exact
          path={TO_SHOPPING_CART_PAGE}
        />
        <ProtectedRoute
          component={SettingsPage}
          exact
          path={TO_SETTINGS_PAGE}
        />
      </Switch>
    </ModalProvider>
  );
};

export default Routes;
