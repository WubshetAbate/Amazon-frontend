import React from "react";
import styles from "./Footer.module.css"

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.column}>
          <h4>Get to Know Us</h4>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Amazon Devices</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
          
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Amazon Payment Products</h4>
          <ul>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Returns & Replacements</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className={styles.middleSection}>
        <img
          className={styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
        />
        <select className={styles.languageSelect}>
          <option>English</option>
          <option>Amharic</option>
         
        </select>
        <select className={styles.currencySelect}>
          <option>USD - U.S. Dollar</option>
          <option>ETB - Ethiopian Birr</option>
         
        </select>
        <select className={styles.countrySelect}>
          <option>United States</option>
          <option>Ethiopia</option>
         
        </select>
      </div>

      <div className={styles.bottomSection}>
        <div>
          <h5>Amazon Music</h5>
          <p>Stream millions of songs</p>
        </div>
        <div>
          <h5>Amazon Ads</h5>
          <p>Reach customers wherever they spend their time</p>
        </div>
        <div>
          <h5>6pm</h5>
          <p>Score deals on fashion brands</p>
        </div>
        <div>
          <h5>AbeBooks</h5>
          <p>Books, art & collectibles</p>
        </div>
      </div>

      <div className={styles.footerNote}>
        <p>
          Conditions of Use &nbsp;|&nbsp; Privacy Notice &nbsp;|&nbsp; Consumer
          Health Data Privacy Disclosure &nbsp;|&nbsp; Your Ads Privacy Choices
        </p>
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}

export default Footer;
