import React, { useState } from "react";
import styles from "./Menu.module.css";
import cx from "classnames";
import { Link, NavLink, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth/helper";
import logo from "../../images/logo.png";

const Menu = ({ history }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  function burgerOnClick() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }
  return (
    <nav className={styles.nav}>
      <div
        className={cx(styles.navBurger, {
          [styles.navBurgerOpened]: isBurgerMenuOpen,
        })}
        onClick={burgerOnClick}
      />

      <div
        className={cx({
          [styles.navLinks]: isBurgerMenuOpen,
          [styles.navLinksDesktop]: !isBurgerMenuOpen,
        })}
      >
        <div
          className={cx({
            [styles.navLinksWrapper]: isBurgerMenuOpen,
            [styles.navLinksDesktop]: !isBurgerMenuOpen,
          })}
        >
          <NavLink
            activeClassName={styles.navLinkActive}
            to="/about"
            className={cx(styles.navLink, {
              [styles.navLinkShow]: isBurgerMenuOpen,
            })}
          >
            О нас
          </NavLink>
          <NavLink
            activeClassName={styles.navLinkActive}
            to="/catalog"
            className={cx(styles.navLink, {
              [styles.navLinkShow]: isBurgerMenuOpen,
            })}
          >
            Каталог
          </NavLink>
          <NavLink
            activeClassName={styles.navLinkActive}
            to="/contacts"
            className={cx(styles.navLink, {
              [styles.navLinkShow]: isBurgerMenuOpen,
            })}
          >
            Контакты
          </NavLink>
          <NavLink
            activeClassName={styles.navLinkActive}
            to="/cart"
            className={cx(styles.navLink, {
              [styles.navLinkShow]: isBurgerMenuOpen,
            })}
          >
            Корзина
          </NavLink>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <NavLink
              activeClassName={styles.navLinkActive}
              className={cx(styles.navLink, {
                [styles.navLinkShow]: isBurgerMenuOpen,
              })}
              to="/admin/dashboard"
            >
              Панель админа
            </NavLink>
          )}
          {!isAuthenticated() && (
            <>
              <NavLink
                activeClassName={styles.navLinkActive}
                className={cx(styles.navLink, {
                  [styles.navLinkShow]: isBurgerMenuOpen,
                })}
                to="/signup"
              >
                Регистрация
              </NavLink>
              <NavLink
                activeClassName={styles.navLinkActive}
                className={cx(styles.navLink, {
                  [styles.navLinkShow]: isBurgerMenuOpen,
                })}
                to="/signin"
              >
                Вход
              </NavLink>
            </>
          )}
          {isAuthenticated() && (
            <span
              className="nav-link text-warning"
              style={{ cursor: "pointer " }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Выход
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
