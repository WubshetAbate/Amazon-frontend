import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styles from "../../Pages/Auth/Signup.module.css";

// Firebase imports
import { db } from "../../Components/Utility/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

function Auth() {
  const { user, signin, signup, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const showLoginMessage = location.state?.showLoginMessage || false;

  // Migrate guest orders to the logged-in user
  const migrateGuestOrders = async (uid) => {
    try {
      const guestOrdersRef = collection(db, "users", "guest", "orders");
      const guestOrdersSnapshot = await getDocs(guestOrdersRef);

      for (let orderDoc of guestOrdersSnapshot.docs) {
        const orderData = orderDoc.data();
        // Copy to the logged-in user's orders
        await setDoc(doc(db, "users", uid, "orders", orderDoc.id), orderData);
        // Delete the guest order
        await deleteDoc(orderDoc.ref);
      }
    } catch (err) {
      console.error("Error migrating guest orders:", err);
    }
  };

  // Only redirect after a new login/signup
  useEffect(() => {
    if (user && justLoggedIn) {
      migrateGuestOrders(user.uid).then(() => {
        navigate("/orders"); // redirect to orders after migration
      });
    }
  }, [user, justLoggedIn, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signin(email, password);
    setJustLoggedIn(true); // mark that a login just happened
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(email, password);
    setJustLoggedIn(true); // mark that a signup just happened
  };

  return (
    <div className={styles.authPage}>
      {showLoginMessage && (
        <div
          style={{
            background: "#fffae6",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            color: "#333",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Login to see your orders
        </div>
      )}

      <img
        className={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
      />

      <div className={styles.authBox}>
        <h1>Sign-in</h1>
        <form>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={handleSignIn}
            className={styles.signInBtn}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, Cookies Notice and Interest-Based
          Ads Notice.
        </p>

        <button
          onClick={handleSignUp}
          className={styles.registerBtn}
          disabled={loading}
        >
          {loading ? "Loading..." : "Create your Amazon Account"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
