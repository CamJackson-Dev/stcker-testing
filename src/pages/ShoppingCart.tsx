import { ApolloCache, useMutation } from "@apollo/client";
import { Box, Container, Paper, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CartCard from "../components/common/cart-card";
import EmptyList from "../components/common/empty-list";
import Header from "../components/common/header";
import LoadingPage from "../components/common/loading/page";
import PaymentSuccessModal from "../components/common/modal/payment-success";
import { useAuthUser } from "../hooks/useAuthUser";
import { useTitle } from "../hooks/useTitle";
import { COMPANY_NAME } from "../utils/constants";
import { calculateTotalPrice } from "../utils/helpers";
import { CREATE_ORDER, CAPTURE_ORDER } from "../utils/mutation/order";
import { GET_AUTH_USER } from "../utils/queries/user";
import { useStyles } from "../utils/styles/page";
import { Product } from "../utils/types/product";
import { User } from "../utils/types/user";

const ShoppingCartPage: React.FC = () => {
  const user = useAuthUser();

  const [] = useState(false);
  const [show, setShow] = useState(false);

  const [createOrder, { loading: isCreatingOrder }] = useMutation(CREATE_ORDER);
  const [captureOrder, { loading: isCapturingOrder }] =
    useMutation(CAPTURE_ORDER);
  const classes = useStyles();
  useTitle(`${COMPANY_NAME} - Cart`);

  const cartObject: Record<string, Product> = {};
  user?.carts.forEach((product) => {
    if (cartObject[product._id]) {
      cartObject[product._id].count! += 1;
    } else {
      cartObject[product._id] = { ...product, count: 1 };
    }
  });

  useEffect(() => {
    const element = document.getElementById(
      "paypal-button-container"
    )?.childElementCount;
    if (user?.carts.length && !element) {
      (window as any as Window & { paypal: any }).paypal
        ?.Buttons({
          createOrder: async () => {
            try {
              const { data } = await createOrder();
              return data?.createOrder;
            } catch (error) {
              toast.error(error.message);
            }
          },
          onApprove: async (input: any, _: any) => {
            try {
              await captureOrder({
                variables: { orderID: input.orderID },
                update: emptyUserCartInCache,
              });
              setShow(true);
            } catch (error) {
              toast.error(error.message);
            }
          },
        })
        .render("#paypal-button-container");
    }
  }, [user?.carts.length]);

  const loading = isCreatingOrder || isCapturingOrder;
  return (
    <>
      {loading ? (
        <LoadingPage
          style={{
            background: "rgba(0,0,0,0.5)",
            position: "fixed",
            zIndex: 10000,
          }}
        />
      ) : null}
      <Paper className={classes.root} square variant="outlined">
        <Header variant="primary" />
        <PaymentSuccessModal open={show} onClose={() => setShow(false)} />
        <Container maxWidth="md">
          <Typography className={classes.accountTitle} variant="h6">
            Your shopping cart
          </Typography>

          <Container maxWidth="sm">
            {Object.values(cartObject).map((product) => (
              <CartCard key={product._id} product={product} />
            ))}
          </Container>

          {Object.values(cartObject).length ? (
            <>
              <Container
                maxWidth="sm"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6" component="p">
                  ITEMS
                </Typography>
                <Typography variant="h6" component="p">
                  ${calculateTotalPrice(cartObject)}
                </Typography>
              </Container>
              <Container
                maxWidth="sm"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6" component="p">
                  SHIPPING
                </Typography>
                <Typography variant="h6" component="p">
                  FREE
                </Typography>
              </Container>
              <Container
                maxWidth="sm"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6" component="p">
                  TOTAL
                </Typography>
                <Typography variant="h6" component="p">
                  ${calculateTotalPrice(cartObject)}
                </Typography>
              </Container>
              <br />
              <Box id="paypal-button-container"></Box>
            </>
          ) : (
            <EmptyList
              title="You have no items in your cart"
              subTitle="When you add products to your cart, they'll appear here"
            >
              <ShoppingCart width={50} height={50} fontSize="large" />
            </EmptyList>
          )}
        </Container>
      </Paper>
    </>
  );
};

export default ShoppingCartPage;

function emptyUserCartInCache(cache: ApolloCache<any>) {
  let data = cache.readQuery({ query: GET_AUTH_USER }) as any;
  if (!data?.me) return;

  let me = { ...data.me } as User;
  me.carts = [];

  cache.writeQuery({ query: GET_AUTH_USER, data: { me } });
}
