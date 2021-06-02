import { useQuery } from "@apollo/client";
import {
  Container,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Receipt, Refresh } from "@material-ui/icons";
import React from "react";

import EmptyList from "../components/common/empty-list";
import Header from "../components/common/header";
import LoadingPage from "../components/common/loading/page";
import OrderTable from "../components/order-table";
import { Data } from "../components/order-table/data";
import { useTitle } from "../hooks/useTitle";
import { COMPANY_NAME } from "../utils/constants";
import { GET_USER_ORDERS } from "../utils/queries/order";
import { useStyles } from "../utils/styles/page";

const OrdersPage: React.FC = () => {
  const { data, loading, refetch } = useQuery(GET_USER_ORDERS);
  const classes = useStyles();
  useTitle(`${COMPANY_NAME} - Orders`);

  const orders = data?.userOrders as Data[];
  return (
    <Paper className={classes.root} square variant="outlined">
      <Header variant="primary" />
      {loading ? (
        <LoadingPage />
      ) : (
        <Container maxWidth="xl">
          <Typography className={classes.accountTitle} variant="h6">
            Your orders
          </Typography>
          {orders?.length ? (
            <OrderTable rows={orders}>
              <Tooltip title="Refresh Orders">
                <IconButton
                  aria-label="Refresh Orders"
                  onClick={() => refetch()}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </OrderTable>
          ) : (
            <EmptyList
              title="You have not place any order"
              subTitle="When you place an order, they'll appear here"
            >
              <Receipt width={50} height={50} fontSize="large" />
            </EmptyList>
          )}
        </Container>
      )}
    </Paper>
  );
};

export default OrdersPage;
