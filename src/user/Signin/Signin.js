import React, { useState } from "react";
import Base from "../../core/Base/Base";
import { Link, Redirect } from "react-router-dom";
import styles from "./Signin.module.css";

import { signin, authenticate, isAuthenticated } from "../../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("sigin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/cart" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div>
          <h2>Loadin...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div>
        <div className={styles.error}>
          <div style={{ display: error ? "" : "none" }}>{error}</div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            className={styles.input}
            type="email"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Пароль</label>
          <input
            onChange={handleChange("password")}
            value={password}
            className={styles.input}
            type="password"
          />
        </div>
        <button className={styles.button} onClick={onSubmit}>
          Отправить
        </button>
      </form>
    );
  };

  return (
    <Base>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/*<p className="text-white text-center">{JSON.stringify(values)}</p>*/}
    </Base>
  );
};

export default Signin;
