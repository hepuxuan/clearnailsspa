import * as React from "react";
import styles from "./index.css";
import buttonStyles from "../button.css";
import { MenuIcon } from "../menu";
import Measure from "react-measure";
import { ViewContext } from "../../../context/ViewContext";

const TopNav: React.SFC<{}> = () => {
  const { setTopNavHeight } = React.useContext(ViewContext);
  return (
    <Measure
      onResize={contentRect => {
        setTopNavHeight(contentRect.entry.height + 21);
      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef} className={styles.topNav}>
          <div className={styles.topNavInner}>
            <div className={styles.logo}>
              <img className={styles.icon} src="/public/icon.png" />
              <div>
                <h1>Clear Nails Spa</h1>
                <div className={styles.subTitle}>
                  Leading Nail Salon Experience
                </div>
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
            <MenuIcon />
          </div>
        </div>
      )}
    </Measure>
  );
};

export { TopNav };
