import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import stylesItemDetailContainer from "./ItemDetailContainer.module.scss";
import { CartContext } from "../../context/CartContext";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../db/firebase-config";
import { ToastContainer, toast } from "react-toastify";

const ItemDetailContainer = ({ data }) => {
  const { agregar } = useContext(CartContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [libro, setLibro] = useState([]);
  const LibrosDb = collection(db, "libros");
  const notify = () => toast("Libro agregado al carrito!");

  const getLibros = async () => {
    const librosCollection = await getDocs(LibrosDb);
    const libros = librosCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const libroEncontrado = libros.find((libro) => libro.id == id);
    setLibro(libroEncontrado);
    setLoading(false);
  };

  useEffect(() => {
    getLibros();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h1>Cargando libro...</h1>
      ) : libro ? (
        <section className={stylesItemDetailContainer.container}>
          <div className={stylesItemDetailContainer.imagen}>
            <img src={libro.img} alt={libro.titulo} />
          </div>
          <div>
            <h2 className={stylesItemDetailContainer.titulo}>{libro.titulo}</h2>
            <p className={stylesItemDetailContainer.autor}>Autor: {libro.autor}</p>
            <p>Editorial: {libro.editorial}</p>
            <p>Páginas: {libro.paginas}</p>
            <p>Categoría: {libro.categoria}</p>
            <p>ISBN: {libro.id}</p>
            <p className={stylesItemDetailContainer.precio}>Precio: ${libro.precio}</p>
            <button className={stylesItemDetailContainer.boton} onClick={() => agregar(libro)}>
              Agregar al carrito
            </button>
            <ToastContainer />
          </div>
        </section>
      ) : (
        <p>Libro no Encontrado.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
