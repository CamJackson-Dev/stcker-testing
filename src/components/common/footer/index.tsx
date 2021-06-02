import {
  Avatar,
  Container,
  Divider,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import {
  AMERICAN_EXPRESS_LOGO_URL,
  COMPANY_LOGO_URL,
  COMPANY_NAME,
  MASTERCARD_LOGO_URL,
  PAYPAL_LOGO_URL,
  TO_HOME_PAGE,
  TO_ORDERS_PAGE,
  TO_PRIVACY_POLICY_PAGE,
  TO_SETTINGS_PAGE,
  TO_SUPPORT_PAGE,
  TO_TERMS_OF_SERVICE_PAGE,
  VISA_LOGO_URL,
} from "../../../utils/constants";
import { useStyles } from "./styles";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} component="footer">
      <Divider light />
      <Container maxWidth="lg">
        <Box className={classes.wrapper}>
          <Grid container>
            <Grid className={classes.gridItem} item xs={12} md={4}>
              <Link className={classes.link} to={TO_HOME_PAGE}>
                <Avatar
                  alt={COMPANY_NAME}
                  className={classes.logo}
                  src={COMPANY_LOGO_URL}
                  variant="rounded"
                />
              </Link>
            </Grid>
            <Grid className={classes.gridItem} item xs={6} md={4}>
              <Typography variant="body1" component="h2" gutterBottom>
                Let us Help You
              </Typography>
              <ul>
                <li>
                  <Link to={TO_ORDERS_PAGE}>Your Order</Link>
                </li>
                <li>
                  <Link to={TO_SETTINGS_PAGE}>Your Account</Link>
                </li>
                <li>
                  <Link to={TO_SUPPORT_PAGE}>Contact Us</Link>
                </li>
              </ul>
            </Grid>
            <Grid className={classes.gridItem} item xs={6} md={4}>
              <Typography variant="body1" component="h2" gutterBottom>
                Get to Know Us
              </Typography>
              <ul>
                <li>
                  <Link to={TO_PRIVACY_POLICY_PAGE}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={TO_TERMS_OF_SERVICE_PAGE}>Terms of Use</Link>
                </li>
                <li>
                  <Link to={`${TO_PRIVACY_POLICY_PAGE}#cookies`}>
                    {`${COMPANY_NAME} uses cookies: Cookie Policy`}
                  </Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Divider />
      <Box className={classes.wrapper}>
        <Container maxWidth="lg">
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Box className={classes.paymentLogoWrapper}>
                <Avatar
                  src={AMERICAN_EXPRESS_LOGO_URL}
                  variant="rounded"
                  alt="AmericanExpress"
                  className={classes.paymentLogo}
                />
                <Avatar
                  src={MASTERCARD_LOGO_URL}
                  variant="rounded"
                  alt="MasterCard"
                  className={classes.paymentLogo}
                />
                <Avatar
                  src={PAYPAL_LOGO_URL}
                  variant="rounded"
                  alt="Paypal"
                  className={classes.paymentLogo}
                />
                <Avatar
                  src={VISA_LOGO_URL}
                  variant="rounded"
                  alt="Visa"
                  className={classes.paymentLogo}
                />
              </Box>
            </Grid>
          </Grid>
          <Typography className={classes.text}>
            © {COMPANY_NAME}. All Rights Reserved
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
