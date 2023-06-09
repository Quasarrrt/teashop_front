import React, { useState, useEffect } from "react";
import Base from "../../core/Base/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { getCategories, deleteCategory } from "../helper/adminapicall";
import styles from "./ManageCategories.module.css";
import cx from "classnames";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data?.error) {
        console.log(data?.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base className="container  p-1">
      <h2 className="mb-4">Все продукты:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Обратно на панель админа</span>
      </Link>
      <div className={cx("row", styles.margins)}>
        <div className={cx("col-12", styles.margins)}>
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className={cx("row", " text-center", "mb-2", styles.mobile)}
              >
                <div className="col-4">
                  <h3 className="text-black text-left">{category.name}</h3>
                </div>
                <div className={styles.mobileButtons}>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span className="">Обновить</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisCategory(category._id);
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

export default ManageCategories;
