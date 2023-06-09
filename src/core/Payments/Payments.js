import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "../helper/cartHelper";
import { Link, NavLink } from "react-router-dom";
import { getmeToken, processPayment } from "../helper/paymentbhelper";
import { createOrder } from "../helper/orderHelper";
import { isAuthenticated } from "../../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Payments = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-outline btn-success"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Войдите в аккаунт и добавьте что-то в корзину</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo((prev) => ({ ...prev, loading: true }));
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data?.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("Payment success");

          const orderData = {
            products: products,
            transaction_id: response.transaction_id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);

          cartEmpty(() => {});

          setReload(!reload);
        })
        .catch((err) => {
          setInfo((prev) => ({ ...prev, loading: false, success: false }));
          console.log("Payment failed");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>С вас {getAmount()} ₽</h3>
      {showbtdropIn()}
    </div>
  );
};
export default Payments;
