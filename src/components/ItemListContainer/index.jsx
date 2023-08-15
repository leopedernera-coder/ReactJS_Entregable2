import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import stylesItemListContainer from "./ItemListContainer.module.scss";
import db from "../../../db/firebase-config";
import { getDocs, collection } from "firebase/firestore";

const ItemListContainer = () => {
  const [libros, setLibros] = useState([]);
  const LibrosDb = collection(db, "libros");
  const { categoriaNombre } = useParams();
  const [loading, setLoading] = useState(true);

  const getLibros = async () => {
    const librosCollection = await getDocs(LibrosDb);
    const libros = librosCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (categoriaNombre) {
      setLibros(libros.filter((libro) => libro.categoria.toUpperCase() == categoriaNombre.toUpperCase()));
      setLoading(false);
    } else {
      setLibros(libros);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLibros();
  }, [categoriaNombre]);

  return (
    <section>
      {loading ? (
        <h1 className={stylesItemListContainer.cargando}>Cargando libros...</h1>
      ) : (
        <div className={stylesItemListContainer.libros_lista}>
          {libros.map((libro) => (
            <Link to={`/libro/${libro.id}`} key={libro.id}>
              <div key={libro.id} className={stylesItemListContainer.libro_card}>
                <h2 className={stylesItemListContainer.card_titulo}>{libro.titulo}</h2>
                <img className={stylesItemListContainer.card_img} src={libro.img} alt={libro.titulo} width={150} />
                <p className={stylesItemListContainer.card_precio}>${libro.precio}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ItemListContainer;
