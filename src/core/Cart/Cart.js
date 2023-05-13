import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Base from "../Base/Base";
import Card from "../Card/Card";
import { loadCart } from "../helper/cartHelper";
import Payments from "../Payments/Payments";
import { isAuthenticated } from "../../auth/helper";
import cx from "classnames";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllproducts = (products) => {
    return (
      <div className={styles.products}>
        {products.map((product, index) => (
          <div key={index}>
            <Card
              product={product}
              addtoCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Base className="container">
      <div className={styles.wrapper}>
        <div className={styles.productsWrapper}>
          {products.length > 0 ? (
            loadAllproducts(products)
          ) : (
            <h3>Нет продуктов в корзине</h3>
          )}
        </div>
        {!isAuthenticated() && (
          <NavLink
            to="/signin"
            className={cx("btn btn-info h-100", styles.button)}
          >
            Войти в аккаунт для покупки
          </NavLink>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <div className={styles.button}>
            <Payments products={products} setReload={setReload} />
          </div>
        )}
      </div>
    </Base>
  );
};

export default Cart;
