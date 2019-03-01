import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { ServiceContext } from "../../context/serviceContext";
import { Service } from "../../models/category";
import pageStyles from "../common/page.css";
import { parse } from "qs";
import { history } from "../../history";
import { Staff } from "../../models/schedule";
import buttonStyle from "../common/button.css";
import styles from "./index.css";
import { Formik } from "formik";
import gridStyles from "../common/grid.css";
import inputStyles from "../common/input.css";
import { createAppointment } from "../../clients/appointment";
import { getStaff } from "../../clients/staff";
import { getService } from "../../clients/service";
import { Stepper } from "../common/stepper";

const ReviewAndBookWithRouter: React.SFC<
  RouteComponentProps<{
    service: string;
    staff: string;
    time: string;
  }>
> = ({ match, location }) => {
  const { staff, setStaff, service, setService } = React.useContext(
    ServiceContext
  );

  React.useEffect(() => {
    const { date } = parse(location.search, {
      ignoreQueryPrefix: true
    });
    const { service } = match.params;
    if (!date) {
      history.replace(`/selectStaffAndTime/service/${service}`);
      return;
    }
  }, [location.search]);

  React.useEffect(() => {
    getStaff(match.params.staff).then(staff => setStaff(staff));
  }, [match.params.staff]);

  React.useEffect(() => {
    getService(match.params.service).then(service => setService(service));
  }, [match.params.service]);

  const { date } = parse(location.search, {
    ignoreQueryPrefix: true
  });

  const { service: serviceId, staff: staffId, time } = match.params;

  return (
    <ReviewAndBookComponent
      date={date}
      serviceId={serviceId}
      staffId={staffId}
      time={time}
      staff={staff}
      service={service}
    />
  );
};

class ReviewAndBookComponent extends React.Component<{
  staffId: string;
  serviceId: string;
  date: string;
  service?: Service;
  staff?: Staff;
  time: string;
}> {
  public handleBook = async (values: any, { setSubmitting }) => {
    const { name, email, phone } = values;
    const { serviceId, staffId, time, date } = this.props;
    setSubmitting(true);

    const appoinment = await createAppointment({
      name,
      email,
      phone,
      services: [+serviceId],
      staffId: +staffId,
      timeSlotId: +time,
      date
    });
    setSubmitting(false);
    history.push(`/confirmation/appointment/${appoinment.id}`);
  };

  public render() {
    const { date, serviceId, service, staff } = this.props;
    return (
      <div className={pageStyles.main}>
        <Stepper step={2} />
        <h1 className={pageStyles.title}>
          Please review your appoinment details:
        </h1>
        <div className={styles.subTitle}>
          {service && (
            <p>
              Service you choose: {service.name}
              <Link
                to={`/selectServiceStep2/category/${service.categoryId}`}
                className={buttonStyle.link}
              >
                change
              </Link>
            </p>
          )}
          <p>
            Your technician: {staff && staff.name}
            <Link
              to={`/selectStaffAndTime/service/${serviceId}`}
              className={buttonStyle.link}
            >
              change
            </Link>
          </p>
          <p>
            Appointment time: {date}
            <Link
              to={`/selectStaffAndTime/service/${serviceId}`}
              className={buttonStyle.link}
            >
              change
            </Link>
          </p>
        </div>
        <h2 className={pageStyles.title}>
          Please enter your contact information
        </h2>
        <Formik
          onSubmit={this.handleBook}
          initialValues={{ name: "", email: "", phone: "" }}
        >
          {({ handleChange, handleSubmit }) => (
            <form className={styles.customerForm} onSubmit={handleSubmit}>
              <div
                className={`${gridStyles.grid} ${inputStyles.input} ${
                  styles.inputWrapper
                }`}
              >
                <label className={`${gridStyles.grid4}`} htmlFor="name-input">
                  Your preferred name:{" "}
                </label>
                <input
                  className={`${gridStyles.grid8}`}
                  onChange={handleChange}
                  id="name-input"
                  name="name"
                />
              </div>
              <div
                className={`${gridStyles.grid} ${inputStyles.input} ${
                  styles.inputWrapper
                }`}
              >
                <label className={`${gridStyles.grid4}`} htmlFor="email-input">
                  Your email address:{" "}
                </label>
                <input
                  className={`${gridStyles.grid8}`}
                  onChange={handleChange}
                  id="email-input"
                  name="email"
                />
              </div>
              <div
                className={`${gridStyles.grid} ${inputStyles.input} ${
                  styles.inputWrapper
                }`}
              >
                <label className={`${gridStyles.grid4}`} htmlFor="phone-input">
                  Your phone number:{" "}
                </label>
                <input
                  className={`${gridStyles.grid8}`}
                  onChange={handleChange}
                  id="phone-input"
                  name="phone"
                />
              </div>
              <div>
                <button
                  className={`${buttonStyle.btn} ${buttonStyle.btnLarge}`}
                  type="submit"
                >
                  Book your appointment
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const ReviewAndBook = withRouter(ReviewAndBookWithRouter);

export { ReviewAndBook };
