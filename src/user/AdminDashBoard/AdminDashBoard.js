import React from "react";
import Base from "../../core/Base/Base";
import { isAuthenticated } from "../../auth/helper";
import { Link } from "react-router-dom";
import styles from "./AdminDashBoard.module.css";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Создание категорий
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Просмотр категорий
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Создание продукта
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Просмотр продуктов
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card">
        <h4 className="card-header">Информация об админе</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Имя: </span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email: </span> {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base className={styles.root}>
      <div className="row container">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
