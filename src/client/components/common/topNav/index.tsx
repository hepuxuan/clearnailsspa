import * as React from "react";
import styles from "./index.css";
import buttonStyles from "../button.css";

const TopNav: React.SFC<{}> = () => {
  return (
    <div className={styles.topNav}>
      <div className={styles.topNavInner}>
        <div className={styles.logo}>
          <img className={styles.icon} src="/public/icon.png" />
          <div>
            <h1>Clear Nails Spa</h1>
            <div className={styles.subTitle}>Leading Nail Salon Experience</div>
          </div>
        </div>
        <div className={styles.linkList}>
          <a className={buttonStyles.link} href="/">
            Home
          </a>
          <a className={buttonStyles.link} href="/about">
            About Us
          </a>
          <a className={buttonStyles.link} href="/services">
            Services
          </a>
          <a className={buttonStyles.link} href="/booking">
            Booking
          </a>
          <a className={buttonStyles.link} href="/contact">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export { TopNav };
