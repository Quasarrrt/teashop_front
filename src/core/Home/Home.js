import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import SimpleImageSlider from "react-simple-image-slider";
import Base from "../Base/Base";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { getProducts } from "../helper/coreapicalls";
import { API } from "../../backend";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        const imagesData = data?.map(
          (item) => `${API}/product/photo/${item._id}`
        );
        setImages(imagesData);
      }
    });
  };
  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base>
      <div className={styles.slider}>
        {images.length >= 1 && (
          <SimpleImageSlider
            width={"100%"}
            height={750}
            images={images}
            showBullets={false}
            showNavs={true}
            autoPlay={true}
            autoPlayDelay={2}
          />
        )}
      </div>
      <main className={styles.content}>
        <h1 className={styles.header}>Наши новинки</h1>
        <section className={styles.cardContainer}>
          {products?.map((product, index) => {
            if (index < 6) {
              return <Card product={product} key={index} />;
            }
            return null;
          })}
        </section>
        <Link className={styles.button} to="/catalog" exact="true">
          Перейти в каталог
        </Link>
      </main>
    </Base>
  );
}
