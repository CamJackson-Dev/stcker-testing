import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  CardContent,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@material-ui/icons";
import React from "react";

import { useAuthUser } from "../../../hooks/useAuthUser";
import { useCart } from "../../../hooks/useCart";
import { useFavourite } from "../../../hooks/useFavourite";
import { STICKER_URL } from "../../../utils/constants";
import { Product } from "../../../utils/types/product";
import { useStyles } from "./styles";

interface Props {
  product: Product;
}

const ShoppingCard: React.FC<Props> = ({ product }) => {
  const user = useAuthUser();

  const { handleToggleFavourite, isTogglingFavourite } = useFavourite();
  const { handleAddToCart, isTogglingCart } = useCart();
  const classes = useStyles();

  const isFavourite = user?.favourites.some(
    (favouriteProduct) => favouriteProduct._id === product._id
  );

  return (
    <Grid item xs={"auto"}>
      <Card className={classes.card}>
        <IconButton
          className={classes.likeBtn}
          disabled={isTogglingFavourite}
          onClick={() => handleToggleFavourite(product)}
        >
          {isTogglingFavourite ? (
            <CircularProgress size={15} />
          ) : isFavourite ? (
            <Favorite className={classes.favourite} />
          ) : (
            <FavoriteBorder className={classes.icon} />
          )}
        </IconButton>

        <Box overflow="hidden">
          <CardMedia
            className={classes.media}
            image={product.image || STICKER_URL}
            title={product.name}
          />
        </Box>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardHeader}>{product.name}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Typography className={classes.price}>
            From ${product.price}
          </Typography>
          <IconButton
            className={classes.addToCartBtn}
            disabled={isTogglingCart}
            onClick={() => handleAddToCart(product)}
          >
            {isTogglingCart ? (
              <CircularProgress size={15} />
            ) : (
              <AddShoppingCart className={classes.icon} />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ShoppingCard;
