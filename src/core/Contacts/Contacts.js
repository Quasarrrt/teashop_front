import React from "react";
import Base from "../Base/Base";
import styles from "./Contacts.module.css";

const Contacts = () => {
  return (
    <Base>
      <main className={styles.contacts}>
        <iframe
          title={"map"}
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A72d79e611fdff04d667cfa1016a5cf9f224ee45362007d8440d78b241587b632&amp;source=constructor"
          frameBorder="0"
          className={styles.map}
        />
        <div className={styles.wrapper}>
          <h1>КОНТАКТЫ</h1>
          <h2 className="">Почта</h2>
          <p>info@teashop.ru</p>
          <h2>Телефоны</h2>
          <p className="">+7 (495) 999 99 99</p>
          <p className="">+7 (495) 999 99 99</p>
          <h2>Телефоны службы сервиса</h2>
          <p className="">+7 (495) 999 99 99</p>
          <h2>Наш адрес</h2>
          <p className="">пр. Вернадского, 78</p>
        </div>
      </main>
    </Base>
  );
};

export default Contacts;
