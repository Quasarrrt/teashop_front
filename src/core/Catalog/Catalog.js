import React, { useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import Base from "../Base/Base";
import Card from "../Card/Card";
import { getProducts } from "../helper/coreapicalls";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base>
      <div className={styles.content}>
        <section className={styles.cardContainer}>
          {products?.map((product, index) => {
            return <Card product={product} key={index} />;
          })}
        </section>
      </div>
    </Base>
  );
}
