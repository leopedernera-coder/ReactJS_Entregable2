import ItemListContainer from "../ItemListContainer";
import styleshome from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <div className={styleshome.libros}>
        <ItemListContainer />
      </div>
    </>
  );
};

export default Home;
