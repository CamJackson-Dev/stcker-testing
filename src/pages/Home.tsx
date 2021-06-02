import { useQuery } from "@apollo/client";
import { Grid, Paper } from "@material-ui/core";
import { Shop } from "@material-ui/icons";
import React, { useState } from "react";

import EmptyList from "../components/common/empty-list";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import LoadingPage from "../components/common/loading/page";
import SEO from "../components/common/SEO";
import ShoppingCard from "../components/common/shopping-card";
import { filterProducts } from "../utils/helpers";
import { GET_PRODUCTS } from "../utils/queries/product";
import { useStyles } from "../utils/styles/page";
import { Product } from "../utils/types/product";

const HomePage: React.FC = () => {
  const [value, setValue] = useState("");
  const classes = useStyles();
  const { data, loading } = useQuery(GET_PRODUCTS);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const products = data
    ? filterProducts(data?.products.items as Product[], value)
    : [];
  return (
    <Paper className={classes.root} square variant="outlined">
      <SEO />
      <Header variant="primary" value={value} onChange={handleSearch} />
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {products.length ? (
            <Grid
              container
              justify="center"
              style={{ margin: "2rem auto", width: "100%" }}
            >
              <Grid item xs={12}>
                <Grid container className={classes.shoppingList} spacing={3}>
                  {products.map((product) => (
                    <ShoppingCard key={product._id} product={product} />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              <br />
              <br />
              <EmptyList
                title="No results found"
                subTitle="Try searching for other stickers"
              >
                <Shop width={50} height={50} fontSize="large" />
              </EmptyList>
            </>
          )}
        </>
      )}
      <Footer />
    </Paper>
  );
};

export default HomePage;
