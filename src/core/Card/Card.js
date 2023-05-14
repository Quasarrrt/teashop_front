import React, { useState } from "react";
import styles from "./Card.module.css";
import ImageHelper from "../helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";
  const stock = product ? product.stock : 0;
  const category = product ? product.category.name : "default";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart &&
      (stock > 1 ? (
        <button onClick={addToCart} className={styles.addButton}>
          Добавить в корзину
        </button>
      ) : (
        <button disabled className={styles.addButton}>
          Нет в наличии
        </button>
      ))
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className={styles.addButton}
        >
          Удалить из корзины
        </button>
      )
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.textWrapper}>
        <ImageHelper product={product} />
        <p className={styles.name}>{cartTitle}</p>
        <p>{cartDescription}</p>
        <p>{category}</p>
        <p className={styles.price}>{`${cartPrice} ₽`}</p>
      </div>
      <div>
        <div>{showAddtoCart(addtoCart)}</div>
        <div>{showRemoveFromCart(removeFromCart)}</div>
      </div>
    </div>
  );
};

export default Card;
