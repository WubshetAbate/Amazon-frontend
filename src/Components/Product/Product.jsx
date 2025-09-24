import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";
import FadeLoader from "react-spinners/FadeLoader"; // loader

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false); // stop loader
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <FadeLoader color="#f0c14b" loading={loading} />
      </div>
    );
  }

  return (
    <section className={styles.productGrid}>
      {products.map((singleProduct) => (
        <ProductCard product={singleProduct} key={singleProduct.id} />
      ))}
    </section>
  );
}

export default Product;
