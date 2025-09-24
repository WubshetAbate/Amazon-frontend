import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./CategoryProducts.module.css";

function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryName]);

  if (loading) {
    return <p className={styles.loading}>Loading products...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{categoryName}</h1>
        <Link to="/categories" className={styles.backBtn}>
          ← Back to Categories
        </Link>
      </div>

      {products.length === 0 ? (
        <p className={styles.empty}>No products found.</p>
      ) : (
        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.id} className={styles.card}>
              <img src={p.image} alt={p.title} className={styles.image} />
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.price}>${p.price}</p>
              <button className={styles.btn}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
