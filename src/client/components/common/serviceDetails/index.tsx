import * as React from "react";
import { Service } from "../../../models/category";
import { Staff } from "../../../models/schedule";
import { Link } from "react-router-dom";
import moment = require("moment");
import styles from "./index.css";
import gridStyles from "../grid.css";

const ServiceDetails: React.SFC<{
  services: Service[];
  date: string;
  staff: Staff;
}> = ({ services, date, staff }) => {
  return (
    <div
      style={
        services && services.length === 1 ? { justifyContent: "center" } : {}
      }
      className={`${gridStyles.grid} ${styles.services}`}
    >
      {services.map((service, index) => (
        <div key={service.id} className={styles.service}>
          <div className={styles.serviceName}>
            {index + 1}. {service.name}
            <Link className={styles.editLink} to="/selectServiceStep1">
              edit
              <i className="material-icons">edit</i>
            </Link>
          </div>
          <div>Technician: {staff && staff.name}</div>
          <div>Time: {moment(date).format("ddd MM/YY")}</div>
        </div>
      ))}
    </div>
  );
};
export { ServiceDetails };
