import React from "react";
import Menu from "../Menu/Menu";
import logo from "../../images/logo.png";
import styles from "./Base.module.css";
import { Link } from "react-router-dom";

const Base = ({ className, children }) => (
  <>
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.image} />
        </Link>
        <Menu />
      </div>
    </header>
    <div className={className}>{children}</div>
  </>
);

export default Base;
