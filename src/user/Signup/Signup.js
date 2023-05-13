import React, { useState } from "react";
import Base from "../../core/Base/Base";
import { Link } from "react-router-dom";
import { signup } from "../../auth/helper";
import styles from "./Signup.module.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Имя</label>
          <input
            className={styles.input}
            onChange={handleChange("name")}
            type="text"
            value={name}
          />
        </div>
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

  const successMessage = () => {
    return (
      <div className={styles.error} style={{ display: success ? "" : "none" }}>
        Аккаунт создан,
        <Link to="/signin" className={styles.link}>
          {" "}
          войти
        </Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className={styles.error}>
        <div style={{ display: error ? "" : "none" }}>{error}</div>
      </div>
    );
  };

  return (
    <Base>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
