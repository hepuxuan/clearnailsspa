import * as React from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import { ServiceContext } from "../../context/ServiceContext";
import { Service } from "../../models/category";
import pageStyles from "../common/page.css";
import { parse, stringify } from "qs";
import { history } from "../../history";
import { Staff } from "../../models/schedule";
import buttonStyle from "../common/button.css";
import styles from "./index.css";
import { Formik } from "formik";
import { createAppointment } from "../../clients/appointment";
import { Stepper } from "../common/stepper";
import { TextInput } from "../common/input";
import { ServiceDetails } from "../common/serviceDetails";

const ReviewAndBookWithRouter: React.SFC<
  RouteComponentProps<{
    staff: string;
    time: string;
  }>
> = ({ match, location }) => {
  const { staff, fetchStaff, services, fetchServices } = React.useContext(
    ServiceContext
  );

  const { date, selected } = parse(location.search, {
    ignoreQueryPrefix: true
  });

  React.useEffect(() => {
    if (!date || !selected) {
      history.replace(`/selectStaffAndTime?${stringify({ selected })}`);
    }
  }, [date, selected]);

  React.useEffect(() => {
    fetchStaff(match.params.staff);
  }, [match.params.staff]);

  React.useEffect(() => {
    fetchServices(selected);
  }, [location.search]);

  const { staff: staffId, time } = match.params;

  return (
    <ReviewAndBookComponent
      date={date}
      selectedSeviceIds={selected}
      staffId={staffId}
      time={time}
      staff={staff}
      services={services}
    />
  );
};

class ReviewAndBookComponent extends React.Component<{
  staffId: string;
  selectedSeviceIds: string[];
  date: string;
  services?: Service[];
  staff?: Staff;
  time: string;
}> {
  public handleBook = async (values: any, { setSubmitting }) => {
    const { name, email, phone } = values;
    const { selectedSeviceIds, staffId, time, date } = this.props;
    setSubmitting(true);

    const appoinment = await createAppointment({
      name,
      email,
      phone,
      services: selectedSeviceIds,
      staffId: +staffId,
      timeSlotId: +time,
      date
    });
    setSubmitting(false);
    history.push(`/confirmation/appointment/${appoinment.id}`);
  };

  public render() {
    const { date, services, staff } = this.props;
    return (
      <div className={styles.main}>
        <Stepper step={2} />
        <h1 className={pageStyles.title}>
          Please confirm your booking details:
        </h1>
        <div className={styles.services}>
          {services && (
            <ServiceDetails services={services} staff={staff} date={date} />
          )}
        </div>
        <h2 className={pageStyles.title}>
          Please enter your contact information
        </h2>
        <Formik
          onSubmit={this.handleBook}
          onReset={() => {
            history.push(
              `/selectStaffAndTime?${stringify({
                selected: this.props.selectedSeviceIds
              })}`
            );
          }}
          initialValues={{ name: "", email: "", phone: "" }}
        >
          {({ handleChange, handleReset, handleSubmit, values }) => (
            <form
              onReset={handleReset}
              className={styles.customerForm}
              onSubmit={handleSubmit}
            >
              <div className={styles.inputs}>
                <TextInput
                  label="Your preferred name: "
                  onChange={handleChange}
                  id="name-input"
                  name="name"
                  value={values.name}
                />
                <TextInput
                  onChange={handleChange}
                  label="Your email address: "
                  id="email-input"
                  name="email"
                  value={values.email}
                />
                <TextInput
                  label="Your phone number: "
                  onChange={handleChange}
                  id="phone-input"
                  name="phone"
                  value={values.phone}
                />
              </div>

              <div className={styles.actionArea}>
                <button
                  className={`${buttonStyle.btn} ${buttonStyle.btnLarge} ${
                    styles.backButton
                  } ${buttonStyle.action}`}
                  type="reset"
                >
                  Back
                </button>
                <button
                  className={`${buttonStyle.btn} ${buttonStyle.btnLarge} ${
                    buttonStyle.action
                  } ${styles.confirmButton}`}
                  type="submit"
                >
                  Confirm
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
