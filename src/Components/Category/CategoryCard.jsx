import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard({ data }) {
  return (
    <div className={styles.card}>
      <Link to={`/category/${data.name}`}>
        <h2 className={styles.title}>{data.title}</h2>
        <img className={styles.image} src={data.imgLink} alt={data.title} />
        <p className={styles.link}>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
