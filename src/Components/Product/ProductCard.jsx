import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./ProductCard.module.css";
import { useCart } from "./CartContext"; // Cart Context hook

function ProductCard({ product }) {
  const { id, image, title, rating, price } = product;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Make sure the payload has all the fields your reducer needs
    addToCart({
      id,
      image,
      title,
      price,
      rating,
    });
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${id}`}>
        <img className={styles.productImage} src={image} alt={title} />
      </Link>

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>

        <div className={styles.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>({rating?.count || 0})</small>
        </div>

        <div className={styles.price}>
          <CurrencyFormat amount={price} />
        </div>

        <button className={styles.addToCart} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
