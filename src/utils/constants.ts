import companyLogo from "./images/logo-light.png";
import sticker from "./images/logo.jpg";
import sadEmoji from "./images/sad-emoji.jpg";
import payPalSvg from "./images/paypal.svg";
import visaSvg from "./images/visa.svg";
import masterCardSvg from "./images/mastercard.svg";
import americanExpressSvg from "./images/americanexpress.svg";

export const TO_FAVOURITES_PAGE = "/account/favourites";
export const TO_FORGOT_PASSWORD_PAGE = "/password-reset";
export const TO_HOME_PAGE = "/";
export const TO_LOGIN_PAGE = "/login";
export const TO_ORDERS_PAGE = "/account/orders";
export const TO_PRIVACY_POLICY_PAGE = "/privacy-policy";
export const TO_RESET_PASSWORD_PAGE = "/password-reset/:token";
export const TO_TERMS_OF_SERVICE_PAGE = "/terms-of-service";
export const TO_REGISTER_PAGE = "/register";
export const TO_SETTINGS_PAGE = "/account/settings";
export const TO_SHOPPING_PAGE = "/shop";
export const TO_SHOPPING_CART_PAGE = "/account/cart";
export const TO_SUPPORT_PAGE = "/support";
export const TO_UNVERIFED_EMAIL_PAGE = "/unverified-email";
export const TO_VERIFY_EMAIL_PAGE = "/verify-email/:token";

export const COMPANY_NAME = "Stcker";

export const AMERICAN_EXPRESS_LOGO_URL = americanExpressSvg;
export const COMPANY_LOGO_URL = companyLogo;
export const MASTERCARD_LOGO_URL = masterCardSvg;
export const PAYPAL_LOGO_URL = payPalSvg;
export const SAD_EMOJI_URL = sadEmoji;
export const STICKER_URL = sticker;
export const VISA_LOGO_URL = visaSvg;

export const BREAKPOINTS = {
  xs: 0,
  sm: 500,
  md: 768,
  lg: 1000,
  xl: 1300,
};

export const TOAST_OPTIONS = {
  error: {
    style: {
      background: "rgb(253, 236, 234)",
      color: "rgb(97, 26, 21)",
      fontFamily: "Roboto",
    },
  },
  success: {
    style: {
      background: "rgb(237, 247, 237)",
      color: "rgb(30, 70, 32)",
      fontFamily: "Roboto",
    },
  },
};
