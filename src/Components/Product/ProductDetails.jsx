import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext"; // Import Cart context
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./ProductDetails.module.css";
import FadeLoader from "react-spinners/FadeLoader";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart(); // Get addToCart function from Cart context

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <FadeLoader color="#f0c14b" loading={loading} />
      </div>
    );
  }

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className={styles.productDetails}>
      {/* Left Section: Image */}
      <div className={styles.left}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      {/* Right Section: Info */}
      <div className={styles.right}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.rating}>
          <Rating value={product.rating.rate} precision={0.1} readOnly />
          <small>({product.rating.count} reviews)</small>
        </div>

        <div className={styles.price}>
          <CurrencyFormat amount={product.price} />
        </div>

        <button className={styles.addToCart} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
