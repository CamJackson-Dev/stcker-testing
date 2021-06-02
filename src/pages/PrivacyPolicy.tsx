import {
  Container,
  Link as MuiLink,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/common/footer";
import Header from "../components/common/header";
import SEO from "../components/common/SEO";
import { COMPANY_NAME, TO_SUPPORT_PAGE } from "../utils/constants";
import { useStyles } from "../utils/styles/page";

const PrivacyPolicyPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square variant="outlined">
      <SEO title={`${COMPANY_NAME} - Privacy Policy`} />
      <Header variant="primary" />
      <Container className={classes.container} maxWidth="lg">
        <Typography className={classes.title} component="h1" variant="h4">
          PRIVACY POLICY
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          1. CONSENT
        </Typography>
        <Typography className={classes.paragraph}>
          <strong>How do you get my consent?</strong>
        </Typography>
        <Typography className={classes.paragraph}>
          When you provide us with personal information to complete a
          transaction, verify your credit card, place an order, arrange for a
          delivery or return a purchase, we imply that you consent to our
          collecting it and using it for that specific reason only. If we ask
          for your personal information for a secondary reason, like marketing,
          we will either ask you directly for your expressed consent, or provide
          you with an opportunity to say no.
        </Typography>
        <Typography className={classes.paragraph}>
          <strong>How do I withdraw my consent?</strong>
        </Typography>
        <Typography className={classes.paragraph}>
          If after you opt-in, you change your mind, you may withdraw your
          consent for us to contact you, for the continued collection, use or
          disclosure of your information, at anytime, by contacting us via
          <Link className={classes.link} to={TO_SUPPORT_PAGE}>
            <strong> support</strong>
          </Link>
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          2. DISCLOSURE
        </Typography>
        <Typography className={classes.paragraph}>
          We may disclose your personal information if we are required by law to
          do so or if you violate our Terms of Service.
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          3. PAYMENT
        </Typography>
        <Typography className={classes.paragraph}>
          Payments are handled by Paypal. For more information visit{" "}
          <MuiLink
            href="https://www.paypal.com/"
            target="__blank"
            underline="hover"
            color="primary"
          >
            <strong>their website. </strong>
            {""}
          </MuiLink>
          <strong>Shipping is free as well as no refunds after payment</strong>
        </Typography>
        <Typography className={classes.subTitle} variant="h6" id="cookies">
          4. COOKIES
        </Typography>
        <Typography className={classes.paragraph}>
          We use cookies, pixels, and other technologies (collectively,
          "cookies") to recognize your browser or device and provide you with
          essential features and services and for additional purposes,
          including:
        </Typography>
        <Typography className={classes.paragraph}>
          1. Preventing fraudulent activity
        </Typography>
        <Typography className={classes.paragraph}>
          2. Keeping track of items stored in your shopping cart.
        </Typography>
        <Typography className={classes.paragraph}>
          3. Add your favourite items to your favourites.
        </Typography>
        <Typography className={classes.paragraph}>
          {COMPANY_NAME}'s cookies allow you to take advantage of some of{" "}
          {COMPANY_NAME}'s essential features. For instance, if you block or
          otherwise reject our cookies, you will not be able to add items to
          your Shopping Cart, proceed to Checkout, or use any {COMPANY_NAME}{" "}
          products and services that require you to sign in.
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          5. AGE OF CONSENT
        </Typography>
        <Typography className={classes.paragraph}>
          By using this site, you represent that you are at least the age of
          majority in your state or province of residence, or that you are the
          age of majority in your state or province of residence and you have
          given us your consent to allow any of your minor dependents to use
          this site.
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          6. WHAT DO WE DO WITH YOUR INFORMATION?
        </Typography>
        <Typography className={classes.paragraph}>
          When you purchase something from our store, as part of the buying and
          selling process, we collect the personal information you give us such
          as your name, address and email address. When you browse our store, we
          also automatically receive your computer’s internet protocol (IP)
          address in order to provide us with information that helps us learn
          about your browser and operating system. Email marketing (if
          applicable): With your permission, we may send you emails about our
          store, new products and other updates.
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          7. THIRD-PARTY SERVICES
        </Typography>
        <Typography className={classes.paragraph}>
          In general, the third-party providers used by us will only collect,
          use and disclose your information to the extent necessary to allow
          them to perform the services they provide to us.
        </Typography>
        <Typography className={classes.paragraph}>
          However, certain third-party service providers, such as payment
          gateways and other payment transaction processors, have their own
          privacy policies in respect to the information we are required to
          provide to them for your purchase-related transactions. For these
          providers, we recommend that you read their privacy policies so you
          can understand the manner in which your personal information will be
          handled by these providers.
        </Typography>
        <Typography className={classes.paragraph}>
          In particular, remember that certain providers may be located in or
          have facilities that are located in a different jurisdiction than
          either you or us. So if you elect to proceed with a transaction that
          involves the services of a third-party service provider, then your
          information may become subject to the laws of the jurisdiction(s) in
          which that service provider or its facilities are located. Once you
          leave our store’s website or are redirected to a third-party website
          or application, you are no longer governed by this Privacy Policy or
          our website’s Terms of Service. When you click on external links on
          our store, they may direct you away from our site. We are not
          responsible for the privacy practices of other sites and encourage you
          to read their privacy statements.
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          7. SECURITY
        </Typography>
        <Typography className={classes.paragraph}>
          To protect your personal information, we take reasonable precautions
          and follow industry best practices to make sure it is not
          inappropriately lost, misused, accessed, disclosed, altered or
          destroyed. If you provide us with your credit card information, the
          information is encrypted using secure socket layer technology (SSL)
          and stored with a AES-256 encryption. Although no method of
          transmission over the Internet or electronic storage is 100% secure,
          we follow all PCI-DSS requirements and implement additional generally
          accepted industry standards.
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          8. CHANGES TO THIS PRIVACY POLICY
        </Typography>
        <Typography className={classes.paragraph}>
          We reserve the right to modify this privacy policy at any time, so
          please review it frequently. Changes and clarifications will take
          effect immediately upon their posting on the website. If we make
          material changes to this policy, we will notify you here that it has
          been updated, so that you are aware of what information we collect,
          how we use it, and under what circumstances, if any, we use and/or
          disclose it. If our store is acquired or merged with another company,
          your information may be transferred to the new owners so that we may
          continue to sell products to you.
        </Typography>
        <Typography className={classes.subTitle} variant="h6">
          9. QUESTIONS AND CONTACT INFORMATION
        </Typography>
        <Typography className={classes.paragraph}>
          If you would like to access, correct, amend or delete any personal
          information we have about you, register a complaint, or simply want
          more information contact our Privacy Compliance Officer via support{" "}
          <Link className={classes.link} to={TO_SUPPORT_PAGE}>
            <strong> support </strong>
          </Link>{" "}
          <strong>
            Re: Privacy Compliance Officer Townsville, QLD, 4810, Australia
          </strong>
        </Typography>
      </Container>
      <Footer />
    </Paper>
  );
};

export default PrivacyPolicyPage;
