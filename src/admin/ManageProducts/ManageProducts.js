import React, { useState, useEffect } from "react";
import Base from "../../core/Base/Base";
import { Link } from "react-router-dom";
import styles from "./ManageProducts.module.css";
import { isAuthenticated } from "../../auth/helper";
import { getProducts, deleteProduct } from "../helper/adminapicall";
import cx from "classnames";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data?.error) {
        console.log(data?.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base className="container p-4">
      <h2 className="mb-4">Все продукты:</h2>
      <Link className="btn btn-info mb-4" to={`/admin/dashboard`}>
        <span className="">Обратно на панель админа</span>
      </Link>
      <div className="row">
        <div className="col-12">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className={cx("row", "text-center", "mb-2", styles.mobile)}
              >
                <div className="col-4">
                  <h3 className="text-black text-left">{product.name}</h3>
                </div>
                <div className={styles.mobileButtons}>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Обновить</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
                      }}
                      className="btn btn-danger"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
