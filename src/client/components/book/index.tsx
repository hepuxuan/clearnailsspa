import * as React from "react";
import { Formik } from "formik";
import { ServiceContext } from "../../context/serviceContext";
import { getAvailableSchedule } from "../../clients/schedule";
import { Schedule } from "../../models/schedule";
import uniqBy from "lodash/uniqBy";
import moment = require("moment");
import { createAppointment } from "../../clients/appointment";

class Book extends React.Component<{}> {
  public state: {
    availables: Schedule[];
    isSearching: boolean;
    isBookSuccess?: boolean;
    bookDate: string;
  } = {
    availables: [],
    isSearching: false,
    isBookSuccess: null,
    bookDate: ""
  };

  /**
   * handleSubmit
   */
  public handleSubmit = async (values: any) => {
    const { staffId, timeSlotId, date, serviceId, name, phone, email } = values;
    const { id } = this.state.availables.find(
      a =>
        a.staff.id === +staffId &&
        a.timeSlot.id === +timeSlotId &&
        a.day === moment(date).format("ddd")
    );
    const request = {
      scheduleId: id,
      date,
      serviceId: +serviceId,
      name,
      phone,
      email
    };

    await createAppointment(request);

    this.setState({
      isBookSuccess: true
    });
  };

  public searchAvailability = async (date: string) => {
    this.setState({
      isSearching: true
    });
    const { availables } = await getAvailableSchedule(date);

    this.setState({
      isSearching: false,
      availables
    });
  };

  public render() {
    return (
      <ServiceContext.Consumer>
        {context => (
          <>
            {this.state.isBookSuccess === true && (
              <div>You have successfully booked {this.state.bookDate}</div>
            )}
            <h1>Clear Nails Spa</h1>
            <Formik
              onSubmit={this.handleSubmit}
              initialValues={{
                categoryId: -1,
                serviceId: -1,
                date: "",
                timeSlotId: -1,
                staffId: -1,
                name: "",
                phone: "",
                email: ""
              }}
            >
              {({ values, handleChange, handleSubmit }) => {
                const selectedCategory = context.categories.find(
                  category => category.id === +values.categoryId
                );
                const availableStaff = uniqBy(
                  this.state.availables.map(a => a.staff),
                  s => s.id
                );
                const availableTimeSlot = uniqBy(
                  this.state.availables.map(a => a.timeSlot),
                  t => t.id
                );
                return (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>
                        Pick a category:
                        <select
                          name="categoryId"
                          value={values.categoryId}
                          onChange={handleChange}
                        >
                          <option value="-1" />
                          {context.categories.map(category => (
                            <option value={category.id} key={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    {selectedCategory && (
                      <div>
                        <label>
                          Pick a service:
                          <select
                            name="serviceId"
                            value={values.serviceId}
                            onChange={handleChange}
                          >
                            <option value="-1" />
                            {selectedCategory.services.map(service => (
                              <option value={service.id} key={service.id}>
                                {service.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}
                    <div>
                      <label>
                        Date:
                        <input
                          name="date"
                          value={values.date}
                          onChange={e => {
                            handleChange(e);
                            this.searchAvailability(e.target.value);
                          }}
                        />
                      </label>
                    </div>
                    {!!availableTimeSlot.length && (
                      <div>
                        <label>
                          Pick an available time:
                          <select
                            name="timeSlotId"
                            value={values.timeSlotId}
                            onChange={handleChange}
                          >
                            <option value="-1" />
                            {availableTimeSlot.map(available => (
                              <option value={available.id} key={available.id}>
                                {available.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}
                    {!!availableStaff.length && (
                      <div>
                        <label>
                          Pick an available Staff:
                          <select
                            name="staffId"
                            value={values.staffId}
                            onChange={handleChange}
                          >
                            <option value="-1" />
                            {availableStaff.map(staff => (
                              <option value={staff.id} key={staff.id}>
                                {staff.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}
                    {values.timeSlotId > 0 && (
                      <>
                        <div>
                          <label>
                            Your Name:
                            <input
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Your Phone Number:
                            <input
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Your Email:
                            <input
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                        <button type="submit">Book</button>
                      </>
                    )}
                  </form>
                );
              }}
            </Formik>
          </>
        )}
      </ServiceContext.Consumer>
    );
  }
}

export { Book };
