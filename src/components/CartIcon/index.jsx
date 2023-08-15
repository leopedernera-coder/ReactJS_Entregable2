import React, { useContext } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import stylesCartIcon from "./CartIcon.module.scss";
import { CartContext } from "../../context/CartContext";

const CartIcon = () => {
  const { cartLibros } = useContext(CartContext);
  const cantidad = cartLibros.reduce((acc, libro) => acc + libro.cantidad, 0);

  return (
    <div className={stylesCartIcon.container}>
      <ShoppingCartCheckoutIcon fontSize="large" className={stylesCartIcon.icon} />
      <p className={stylesCartIcon.cantidad_productos}>{cantidad ? cantidad : 0}</p>
    </div>
  );
};

export default CartIcon;
