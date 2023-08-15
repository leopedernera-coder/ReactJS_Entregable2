import React from "react";
import { CartContext } from "../../context/CartContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import stylesCheckout from "./Checkout.module.scss";
import db from "../../../db/firebase-config";
import { addDoc, collection, getFirestore } from "firebase/firestore";

function Checkout() {
  const { cartLibros, agregar, restar, borrar } = useContext(CartContext);
  const [orderId, setOrderId] = useState("");
  const precioTotal = cartLibros.reduce((acc, libro) => acc + libro.precio * libro.cantidad, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = (data) => {
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, order).then((docRef) => {
      setOrderId(docRef.id);
    });

    setShowSuccessMessage(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 7000);
    reset();
    localStorage.removeItem("cartLibros");
  };

  const nombre = watch("nombre");
  const apellido = watch("apellido");
  const telefono = watch("telefono");
  const watchEmail1 = watch("email1");
  const watchEmail2 = watch("email2");

  const order = {
    cliente: {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      email: watchEmail1,
    },
    libros: cartLibros,
    total: precioTotal,
  };

  return (
    <div className={stylesCheckout.container}>
      <div>
        <h2 className={stylesCheckout.title}>Checkout</h2>
      </div>
      <div className={stylesCheckout.compra}>
        <h4 className={stylesCheckout.detalletitle}>Detalle de su compra: </h4>
        <br />
        <div>
          {cartLibros && cartLibros.length > 0 ? (
            cartLibros.map((libro) => (
              <div key={libro.id}>
                <p key={libro.id}>
                  <strong>Título:</strong> {libro.titulo} - Cantidad: {libro.cantidad} - Precio total: ${" "}
                  {libro.precio * libro.cantidad}
                </p>
              </div>
            ))
          ) : (
            <p>Aún no hay libros en el Carrito de Compras.</p>
          )}
          <br />
          <h2 className={stylesCheckout.detalleprecio}>Precio Total: $ {precioTotal}</h2>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <p>
        <strong>Por favor, complete los siguientes datos para finalizar la compra.</strong>
      </p>

      <form className={stylesCheckout.formulario} onSubmit={handleSubmit(onSubmit)}>
        <div className={stylesCheckout.campo}>
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" {...register("nombre", { required: true })} />
          {errors.nombre && <span>Este campo es requerido.</span>}
        </div>
        <div className={stylesCheckout.campo}>
          <label htmlFor="apellido">Apellido: </label>
          <input type="text" {...register("apellido", { required: true })} />
          {errors.apellido && <span>Este campo es requerido.</span>}
        </div>
        <div className={stylesCheckout.campo}>
          <label htmlFor="telefono">Teléfono: </label>
          <input type="text" {...register("telefono", { required: true })} />
          {errors.telefono && <span>Este campo es requerido.</span>}
        </div>
        <div className={stylesCheckout.campo}>
          <label htmlFor="email1">Email: </label>
          <input type="email" {...register("email1", { required: true })} />
          {errors.email1 && <span>Este campo es requerido.</span>}
        </div>
        <div className={stylesCheckout.campo}>
          <label htmlFor="email2">Confirmar email: </label>
          <input type="email" {...register("email2", { required: true })} />
          {errors.email2 && <span> Este campo es requerido.</span>}
          {watchEmail1 !== watchEmail2 && <span> Los correos electrónicos no coinciden.</span>}
        </div>
        {showSuccessMessage && orderId && (
          <div>
            <div className={stylesCheckout.ok}> ¡Compra Exitosa!</div>
            <div>
              ID: <span className={stylesCheckout.id}>{orderId}</span>
            </div>
          </div>
        )}
        <button type="submit" className={stylesCheckout.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Checkout;
