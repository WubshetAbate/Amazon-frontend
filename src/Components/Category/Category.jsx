import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryImage } from "./CategoryFullInfo";
import styles from "./Category.module.css";

function Category() {
  return (
    <div className={styles.categoryGrid}>
      {categoryImage.map((cat, i) => (
        <CategoryCard key={i} data={cat} />
      ))}
    </div>
  );
}

export default Category;
