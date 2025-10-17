

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Links Section */}
      <div className={styles.topLinks}>
        <div className={styles.column}>
          <h4>Get to Know Us</h4>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">About Amazon</a>
          <a href="#">Investor Relations</a>
        </div>
        <div className={styles.column}>
          <h4>Make Money with Us</h4>
          <a href="#">Sell products on Amazon</a>
          <a href="#">Affiliate Program</a>
          <a href="#">Advertise Your Products</a>
          <a href="#">Self-Publish</a>
        </div>
        <div className={styles.column}>
          <h4>Amazon Payment Products</h4>
          <a href="#">Amazon Pay</a>
          <a href="#">Gift Cards</a>
          <a href="#">Reload Balance</a>
        </div>
        <div className={styles.column}>
          <h4>Let Us Help You</h4>
          <a href="#">Your Account</a>
          <a href="#">Shipping Rates</a>
          <a href="#">Returns & Replacements</a>
          <a href="#">Help</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <p>© 2025 Amazon Clone. All Rights Reserved.</p>
        <div className={styles.language}>
          <span role="img" aria-label="globe">
            🌐
          </span>{" "}
          English
        </div>
      </div>
    </footer>
  );
}


