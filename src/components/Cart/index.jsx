import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Carrito.module.scss";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartLibros, agregar, restar, borrar } = useContext(CartContext);

  const precioTotal = cartLibros.reduce((acc, libro) => acc + libro.precio * libro.cantidad, 0);

  return (
    <div className={styles.container}>
      <div>
        {cartLibros && cartLibros.length > 0 ? (
          cartLibros.map((libro, index) => (
            <div className={styles.cart_items} key={libro.id}>
              <div className={styles.imagen}>
                <img src={libro.img} alt={libro.titulo} />
              </div>
              <div className={styles.libro}>
                <p>{libro.titulo}</p>
              </div>
              <div className={styles.cantidad}>
                <p className={styles.count} onClick={() => restar(libro)}>
                  -
                </p>
                <p>{libro.cantidad}</p>
                <p className={styles.count} onClick={() => agregar(libro)}>
                  +
                </p>
              </div>
              <div className={styles.precio}>
                <p>$ {libro.precio * libro.cantidad}</p>
              </div>
              <div className={styles.borrar}>
                <button onClick={() => borrar(libro.id)}>
                  <DeleteIcon className={styles.delete} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyCart}>Aún no hay libros en el Carrito de Compras.</p>
        )}
        <div>
          <h2 className={styles.total}>Total: $ {precioTotal}</h2>
          <div className={styles.frameCheckout}>
            <button
              className={styles.vaciar}
              onClick={() => {
                localStorage.removeItem("cartLibros");
                window.location.reload();
              }}
            >
              Vaciar Carrito
            </button>
            <Link to="/checkout">
              <button className={styles.comprar}>Check-Out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
