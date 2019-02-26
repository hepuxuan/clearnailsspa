import * as React from "react";
import pageStyles from "../common/page.css";
import styles from "./index.css";

const Confirmation: React.SFC<{}> = () => {
  return (
    <div className={pageStyles.main}>
      <h1 className={pageStyles.title}>Thank you!</h1>
      <p className={styles.subTitle}>Here is a summary of your appointment</p>
      <p className={styles.subTitle}>We look forward to seeing you!</p>
      <div className={styles.subTitle}>
        <div>Need to change your appointment</div>
        <div>Please call us at xxx-xxx-xxxx</div>
      </div>
    </div>
  );
};

export { Confirmation };
