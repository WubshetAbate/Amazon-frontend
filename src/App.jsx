import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./Components/Product/CartContext";
import { AuthProvider } from "./Pages/Auth/AuthContext";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Load Stripe publishable key (frontend key from Stripe Dashboard)
const stripePromise = loadStripe(
  "pk_test_51S9XA1Qc94DjsPI6BsDkEJSJl3SldDLi09gmb7ZznTlFNABsbtPEagZ82mrGxBD8euf5oC6OonyFkO4WWaPLsVj600dYWce6TR"
);

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Category from "./Components/Category/Category";
import CategoryProducts from "./Components/Category/CategoryProducts";
import ProductDetails from "./Components/Product/ProductDetails";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LowerHeader from "./Components/Header/LowerHeader";

function App() {
  return (
    <AuthProvider>
      {/* ✅ AuthProvider outside */}
      <CartProvider>
        {/* ✅ CartProvider inside, can access useAuth */}
        <Elements stripe={stripePromise}>
          <Router>
            <Header /> {/* Top header */}
            <LowerHeader /> {/* Navigation bar */}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/payment" element={<Payment />} /> {/* ✅ fixed */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={<Cart />} />
              {/* Category routes */}
              <Route path="/categories" element={<Category />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryProducts />}
              />
              {/* Product details route */}
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <Footer />
          </Router>
        </Elements>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
