import * as React from "react";
import styles from "./index.css";

const Stepper: React.SFC<{
  step: number;
}> = ({ step }) => {
  return (
    <div className={styles.stepperRoot}>
      <div
        className={`${styles.singleStep} ${
          step === 0 ? styles.active : styles.mobileInvisible
        }`}
      >
        <span className={styles.stepNumber}>1</span>
        <div className={styles.stepDes}>select your service</div>
      </div>
      <div className={styles.dashLine} />
      <div
        className={`${styles.singleStep} ${
          step === 1 ? styles.active : styles.mobileInvisible
        }`}
      >
        <span className={styles.stepNumber}>2</span>
        <div className={styles.stepDes}>select your technician and time</div>
      </div>
      <div className={styles.dashLine} />
      <div
        className={`${styles.singleStep} ${
          step === 2 ? styles.active : styles.mobileInvisible
        }`}
      >
        <span className={styles.stepNumber}>3</span>
        <div className={styles.stepDes}>confirmation</div>
      </div>
    </div>
  );
};

export { Stepper };
