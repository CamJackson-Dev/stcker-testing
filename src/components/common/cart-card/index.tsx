import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Add, Clear, Remove } from "@material-ui/icons";
import React from "react";

import { useCart } from "../../../hooks/useCart";
import { STICKER_URL } from "../../../utils/constants";
import { Product } from "../../../utils/types/product";
import { useStyles } from "./styles";

interface Props {
  product: Product;
}

const CartCard: React.FC<Props> = ({ product }) => {
  const { handleAddToCart, handleRemoveFromCart, isTogglingCart } = useCart();
  const classes = useStyles();

  const totalPrice = ((product.count! * product.price * 100) / 100).toFixed(2);
  return (
    <Card className={classes.root}>
      <IconButton
        className={classes.deleteBtn}
        onClick={() => handleRemoveFromCart({ product, all: true })}
        disabled={isTogglingCart}
      >
        <Clear className={classes.deleteIcon} />
      </IconButton>
      <Grid className={classes.gridContainer} container>
        <Grid xs={5} sm={4} item className={classes.imageGridItem}>
          <Avatar
            src={product.image || STICKER_URL}
            className={classes.image}
            variant="square"
          />
        </Grid>
        <Grid xs={7} sm={8} item className={classes.gridItem}>
          <Typography className={classes.title}>{product.name}</Typography>
          <ButtonGroup
            size="small"
            aria-label="add or remove from  cart"
            className={classes.btnGroup}
          >
            <Button
              onClick={() => handleRemoveFromCart({ product, all: false })}
              disabled={isTogglingCart}
            >
              <Remove />
            </Button>
            <Button>{product.count}</Button>
            <Button
              onClick={() => handleAddToCart(product)}
              disabled={isTogglingCart}
            >
              <Add />
            </Button>
          </ButtonGroup>
          <Typography>${totalPrice}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartCard;
