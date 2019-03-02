import * as React from "react";
import styles from "./index.css";
import { ServiceContext } from "../../context/ServiceContext";
import { withRouter, RouteComponentProps } from "react-router";
import { ServiceDetails } from "../common/serviceDetails";
import { Link } from "react-router-dom";
import buttonStyles from "../common/button.css";
import { actionArea } from "../selectStaffAndTime/index.css";

const ConfirmationComponent: React.SFC<
  RouteComponentProps<{ appointment: string }>
> = ({ match }) => {
  const { appointment, fetchAppointment } = React.useContext(ServiceContext);
  React.useEffect(() => {
    fetchAppointment(match.params.appointment);
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.title}>Thank you!</div>
      <div className={styles.subTitle}>Here is your appointment’s details:</div>
      <div className={styles.services}>
        {appointment && (
          <ServiceDetails
            services={appointment.services}
            staff={appointment.staff}
            date={appointment.date}
          />
        )}
        <div className={styles.contactUs}>
          If you need to change your appointment, please call us at 312-567-8912
          at your earliest convenience.
        </div>
      </div>
      <div className={styles.subTitle}>Your contact information:</div>
      {appointment && (
        <div className={styles.contactInfo}>
          <div>
            <div className={styles.labelValue}>
              <div className={styles.label}>Your preferred name:</div>
              <div>{appointment.customer.name}</div>
            </div>
            <div className={styles.labelValue}>
              <div className={styles.label}>Email:</div>
              <div>{appointment.customer.email}</div>
            </div>
            <div className={styles.labelValue}>
              <div className={styles.label}>Phone Number:</div>
              <div>{appointment.customer.phone}</div>
            </div>
          </div>
          <div className={styles.labelValue}>
            <div className={styles.label}>Additional Message (optional):</div>
          </div>
        </div>
      )}
      <div className={styles.actionArea}>
        <Link
          className={`${buttonStyles.btn} ${buttonStyles.action} ${
            buttonStyles.btnLarge
          } ${styles.homePageLink}`}
          to="/"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

const Confirmation = withRouter(ConfirmationComponent);

export { Confirmation };
