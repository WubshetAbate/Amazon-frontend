import React from "react";
import { FaBars } from "react-icons/fa";
import styles from "./LowerHeader.module.css";

function LowerHeader() {
  return (
    <div className={styles.lowerHeader}>
      <ul className={styles.lowerHeaderList}>
        <li className={styles.lowerHeaderItem}>
          <FaBars className={styles.icon} /> All
        </li>
        <li className={styles.lowerHeaderItem}>Today's Deals</li>
        <li className={styles.lowerHeaderItem}>Customer Service</li>
        <li className={styles.lowerHeaderItem}>Registry</li>
        <li className={styles.lowerHeaderItem}>Gift Cards</li>
        <li className={styles.lowerHeaderItem}>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
