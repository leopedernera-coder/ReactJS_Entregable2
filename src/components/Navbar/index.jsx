import React from "react";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Navbar.module.scss";
import CartIcon from "../CartIcon";

const Navbar = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const activeStyle = {
    color: "blue",
  };

  useEffect(() => {
    fetch("/src/json/categorias.json")
      .then((response) => response.json())
      .then((data) => setCategorias(data));
  }, []);

  return (
    <header className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="readme.txt" title="Ir al Home" />
      </Link>
      <nav className={styles.nav}>
        <ul>
          {categorias.map((categoria, index) => (
            <NavLink
              title={`Ir a la categoria ${categoria.name}`}
              key={index}
              to={`categoria/${categoria.name}`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li>{categoria.name}</li>
            </NavLink>
          ))}
        </ul>
      </nav>
      <Link to="/cart" title="Ir al Carrito">
        <CartIcon />
      </Link>
      {children}
    </header>
  );
};

export default Navbar;
