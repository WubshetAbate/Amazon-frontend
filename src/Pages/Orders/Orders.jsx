import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { db } from "../../Components/Utility/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./Orders.module.css"; // optional CSS

function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { showLoginMessage: true } });
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));
        const snapshot = await getDocs(q);
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) return <p>Loading your orders...</p>;

  if (!orders.length)
    return <p>You have no orders yet. Place an order to see it here!</p>;

  return (
    <div className={styles.ordersPage}>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <h3>Order ID: {order.id}</h3>
          <p>
            <strong>Total Amount:</strong> ${order.amount.toFixed(2)}
          </p>
          <p>
            <strong>Payment ID:</strong> {order.paymentIntentId}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order.created?.toDate
              ? order.created.toDate().toLocaleString()
              : "Unknown"}
          </p>

          <div className={styles.orderItems}>
            {order.cartItems.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <p>
                  {item.title} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
