import { Paper, Container, Grid, Typography } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";
import React from "react";

import Header from "../components/common/header";
import ShoppingCard from "../components/common/shopping-card";
import EmptyList from "../components/common/empty-list";
import { useAuthUser } from "../hooks/useAuthUser";
import { useStyles } from "../utils/styles/page";
import { useTitle } from "../hooks/useTitle";
import { COMPANY_NAME } from "../utils/constants";

const FavouritesPage: React.FC = () => {
  const user = useAuthUser();
  const classes = useStyles();
  useTitle(`${COMPANY_NAME} - Favourites`);

  return (
    <Paper className={classes.root} square variant="outlined">
      <Header variant="primary" />

      <Container maxWidth="xl">
        <Typography variant="h6" className={classes.accountTitle}>
          Your Favourite Stickers
        </Typography>

        {user?.favourites.length ? (
          <Grid container spacing={4} className={classes.shoppingList}>
            {user?.favourites.map((product) => (
              <ShoppingCard key={product._id} product={product} />
            ))}
          </Grid>
        ) : (
          <EmptyList
            title="No products listed"
            subTitle="When you like products, they'll appear here"
          >
            <FavoriteBorder width={50} height={50} fontSize="large" />
          </EmptyList>
        )}
      </Container>
    </Paper>
  );
};

export default FavouritesPage;
