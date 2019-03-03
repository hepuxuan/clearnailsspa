import * as React from "react";
import styles from "./index.css";
import buttonStyles from "../button.css";
import { ViewContext } from "../../../context/ViewContext";
import Measure from "react-measure";
import { isMobile } from "../../../utils";

const Footer: React.SFC<{}> = () => {
  const { isFooterVisible, setFooterHeight } = React.useContext(ViewContext);
  if (!isFooterVisible) {
    return null;
  }

  return (
    <Measure
      onResize={({ entry }) => {
        if (isMobile()) {
          setFooterHeight(0);
        } else {
          setFooterHeight(entry.height);
        }
      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef} className={styles.footer}>
          <div className={styles.footerInner}>
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
            <div className={styles.contact}>
              <div>Clear Nails Spa</div>
              <div>2122 N Halsted St., Chicago, IL 60614</div>
              <div>773.883.8815</div>
            </div>
            <div className={styles.copyRight}>
              Copyright © 2013 ClearNailsSpa.com All rights reserved.
            </div>
          </div>
        </div>
      )}
    </Measure>
  );
};

export { Footer };
