import React, { createContext, useReducer, useContext, useEffect } from "react";
import { cartReducer } from "../../Components/Utility/reducer";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CLEAR_CART,
} from "../../Components/Utility/action.type";
import { useAuth } from "../../Pages/Auth/AuthContext";
import { db } from "../../Components/Utility/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage (user-specific)
  useEffect(() => {
    if (!user) return;
    const localCart =
      JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
    dispatch({ type: CLEAR_CART });
    localCart.forEach((item) => dispatch({ type: ADD_TO_CART, payload: item }));
  }, [user]);

  // Load cart from Firebase when user logs in
  useEffect(() => {
    if (!user) return;

    const loadCart = async () => {
      try {
        const userCartRef = doc(db, "carts", user.uid);
        const snap = await getDoc(userCartRef);
        if (snap.exists()) {
          const savedCart = snap.data().items || [];
          dispatch({ type: CLEAR_CART });
          savedCart.forEach((item) =>
            dispatch({ type: ADD_TO_CART, payload: item })
          );
          localStorage.setItem(`cart_${user.uid}`, JSON.stringify(savedCart));
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Firebase and localStorage whenever it changes
  useEffect(() => {
    if (user) {
      // Save to localStorage (user-specific)
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cartItems));

      // Save to Firebase
      const saveCart = async () => {
        try {
          const userCartRef = doc(db, "carts", user.uid);
          await setDoc(userCartRef, { items: cartItems }, { merge: true });
        } catch (err) {
          console.error("Error saving cart:", err);
        }
      };
      saveCart();
    }
  }, [cartItems, user]);

  const addToCart = (item) => dispatch({ type: ADD_TO_CART, payload: item });
  const removeFromCart = (id) =>
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  const incrementQuantity = (id) =>
    dispatch({ type: INCREMENT_QUANTITY, payload: id });
  const decrementQuantity = (id) =>
    dispatch({ type: DECREMENT_QUANTITY, payload: id });
  const clearCart = () => dispatch({ type: CLEAR_CART });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
