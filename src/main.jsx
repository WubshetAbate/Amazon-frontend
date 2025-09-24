import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./Pages/Auth/AuthContext.jsx";
import { CartProvider } from "./Components/Product/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* AuthProvider OUTSIDE */}
      <CartProvider>
        {" "}
        {/* CartProvider INSIDE */}
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
