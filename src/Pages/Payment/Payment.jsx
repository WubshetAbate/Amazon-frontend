import React, { useEffect, useState } from "react";
import { useCart } from "../../Components/Product/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";

// Import axios instance
import axios from "../../API/axios"; // make sure path is correct

// Firebase imports
import { db } from "../../Components/Utility/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";

function Payment() {
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [loadingClientSecret, setLoadingClientSecret] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Fetch clientSecret when cart changes
  useEffect(() => {
    if (total > 0 && cartItems.length > 0) {
      const getClientSecret = async () => {
        try {
          setLoadingClientSecret(true);
          const response = await axios.post("/payment/create", {
            total: Math.round(total * 100), // amount in cents
          });
          setClientSecret(response.data.clientSecret);
        } catch (err) {
          console.error("Error fetching client secret:", err);
          setError("Failed to initialize payment. Try again.");
        } finally {
          setLoadingClientSecret(false);
        }
      };
      getClientSecret();
    }
  }, [total, cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setProcessing(false);
      return;
    }

    // Step 1: Save order as "pending"
    let orderRef = null;
    try {
      orderRef = await addDoc(
        collection(db, "users", currentUser?.uid || "guest", "orders"),
        {
          cartItems,
          amount: total,
          status: "pending",
          created: serverTimestamp(),
          clientSecret,
          guest: !currentUser,
        }
      );
    } catch (err) {
      console.error("Error saving pending order:", err);
    }

    // Step 2: Process payment with Stripe
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: currentUser?.email || "guest@example.com",
        },
      },
    });

    // Step 3: Update order based on result
    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);

      if (orderRef) {
        await updateDoc(
          doc(db, "users", currentUser?.uid || "guest", "orders", orderRef.id),
          { status: "failed" }
        );
      }
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);

      if (orderRef) {
        await updateDoc(
          doc(db, "users", currentUser?.uid || "guest", "orders", orderRef.id),
          {
            status: "succeeded",
            paymentIntentId: payload.paymentIntent.id,
          }
        );
      }

      clearCart();

      // Redirect to Auth page with message instead of Orders
      setTimeout(() => {
        navigate("/auth", { state: { showLoginMessage: true } });
      }, 1000);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <section className={styles.paymentWrapper}>
      <h1>Checkout</h1>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      <div className={styles.paymentContainer}>
        {/* Delivery address */}
        <div className={styles.paymentSection}>
          <h3>Delivery Address</h3>
          <div className={styles.paymentDetails}>
            <p>{currentUser?.email || "Guest"}</p>
            <p>123 React Lane</p>
            <p>New York, USA</p>
          </div>
        </div>

        {/* Review items */}
        <div className={styles.paymentSection}>
          <h3>Review Items</h3>
          <div className={styles.paymentDetails}>
            {cartItems.map((item) => (
              <div key={item.id}>
                <p>
                  {item.title} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <h4>Total: ${total.toFixed(2)}</h4>
          </div>
        </div>

        {/* Payment form */}
        {cartItems.length > 0 && (
          <div className={styles.paymentSection}>
            <h3>Payment Method</h3>
            <div className={styles.paymentDetails}>
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <button
                  disabled={
                    processing || disabled || succeeded || loadingClientSecret
                  }
                >
                  {processing
                    ? "Processing..."
                    : loadingClientSecret
                    ? "Loading..."
                    : "Buy Now"}
                </button>
                {error && <div className={styles.error}>{error}</div>}
                {succeeded && (
                  <p className={styles.success}>Payment Successful ✅</p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Payment;
