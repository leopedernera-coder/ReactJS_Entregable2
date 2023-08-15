import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
  const cart = JSON.parse(localStorage.getItem("cartLibros"));
  const [cartLibros, setCartLibros] = useState(cart ? cart : []);

  const agregar = (libro) => {
    const libroEnCarrito = cartLibros.findIndex((item) => item.id === libro.id);
    <ToastContainer />;
    if (libroEnCarrito !== -1) {
      const actualizarCarrito = [...cartLibros];
      actualizarCarrito[libroEnCarrito].cantidad += 1;
      setCartLibros(actualizarCarrito);
      toast.success("Libro agregado al Carrito!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const nuevoCarrito = [...cartLibros, { ...libro, cantidad: 1 }];
      setCartLibros(nuevoCarrito);
      toast.success("Libro agregado al Carrito!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const restar = (libro) => {
    const libroRepetido = cartLibros.find((item) => item.id === libro.id);

    libroRepetido.cantidad !== 1 &&
      setCartLibros(cartLibros.map((item) => (item.id === libro.id ? { ...item, cantidad: libroRepetido.cantidad - 1 } : item)));
  };

  const borrar = (id) => {
    const buscarID = cartLibros.find((item) => item.id === id);

    const nuevoCarrito = cartLibros.filter((item) => {
      return item !== buscarID;
    });
    setCartLibros(nuevoCarrito);
  };

  useEffect(() => {
    localStorage.setItem("cartLibros", JSON.stringify(cartLibros));
  }, [cartLibros]);

  return (
    <CartContext.Provider
      value={{
        agregar,
        cartLibros,
        restar,
        borrar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
