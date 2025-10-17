
import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios.js";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Type } from "../../Utility/action.type.js";

// Firestore v9 modular imports
import { doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // 1. Create a payment intent from backend
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}` // Stripe expects cents
      );
      const clientSecret = response.data.clientSecret;

      // 2. Confirm card payment on client
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (!paymentIntent) {
        throw new Error("Payment failed. Please try again.");
      }

      // 3. Save order to Firestore (modular API)
      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // 4. Empty basket + redirect
      dispatch({ type: Type.EMPTY_BASKET });
      navigate("/orders", { replace: true });
    } catch (err) {
      console.error("Payment error:", err);
      setCardError(err.message);
    }

    setProcessing(false);
  };

  return (
    <Layout>
      <section className={classes.payment}>
        <div className={classes.payment_container}>
          <h2>
            Checkout (<Link to="/cart">{totalItem} items</Link>)
          </h2>

          {/* Delivery address */}
          <div className={classes.payment_section}>
            <div className={classes.payment_title}>
              <h3>Delivery Address</h3>
            </div>
            <div className={classes.payment_address}>
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p> Chicago Il</p>
            </div>
          </div>

          {/* Review items */}
          <div className={classes.payment_section}>
            <div className={classes.payment_title}>
              <h3>Review items</h3>
            </div>
            <div className={classes.payment_items}>
              {basket?.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  flex={true}
                  renderAdd={false}
                  renderDesc={true}
                  amount={item.amount}
                />
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className={classes.payment_section}>
            <div className={classes.payment_title}>
              <h3>Payment Method</h3>
            </div>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                <CardElement onChange={handleChange} />
                {cardError && (
                  <div style={{ color: "red", marginTop: "10px" }}>
                    {cardError}
                  </div>
                )}
                <div className={classes.payment_priceContainer}>
                  <CurrencyFormat amount={total} />
                  <button
                    disabled={processing || !stripe || !elements}
                    type="submit"
                    className={classes.payment_button}
                  >
                    {processing ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;

