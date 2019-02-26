import * as React from "react";
import { ServiceContext } from "../../context/serviceContext";
import pageStyles from "../common/page.css";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "./index.css";
import { Link } from "react-router-dom";
import buttonStyle from "../common/button.css";
import Moment = require("moment");
import MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
import gridStyles from "../common/grid.css";
import { getService } from "../../clients/service";
import { getStaffAvailability } from "../../clients/schedule";

// const SelectStaffAndTime: React.SFC<{}> = () => {
//   return (
//     <ServiceContext.Consumer>
//       {({ service, getService, getStaffAvailability, staffAvailability }) => (
//         <SelectStaffAndTimeComponent
//           getService={getService}
//           getStaffAvailability={getStaffAvailability}
//           staffAvailability={staffAvailability}
//           service={service}
//         />
//       )}
//     </ServiceContext.Consumer>
//   );
// };

// interface Props  {
//   service: Service;
//   getService: (id: string) => void;
//   getStaffAvailability: (start: string, end: string) => void;
//   staffAvailability: StaffAvailability[];
// }

const SelectStaffAndTimeComponent: React.SFC<
  RouteComponentProps<{ service: string }>
> = ({ match }) => {
  const [start, setStart] = React.useState(moment().add(1, "days"));
  const [end, setEnd] = React.useState(moment().add(3, "days"));

  const {
    service,
    setService,
    setStaffAvailability,
    staffAvailability
  } = React.useContext(ServiceContext);

  React.useEffect(() => {
    getService(match.params.service).then(service => {
      setService(service);
    });
  }, [match.params.service]);

  React.useEffect(() => {
    getStaffAvailability(
      start.format("YYYY-MM-DD"),
      end.format("YYYY-MM-DD")
    ).then(({ staffs }) => {
      setStaffAvailability(staffs);
    });
  }, [start, end]);

  return (
    <div className={pageStyles.main}>
      <h1 className={pageStyles.title}>Please select your appointment time</h1>
      {service && (
        <p className={styles.subTitle}>
          Service you choose: {service.name}
          <Link
            className={buttonStyle.link}
            to={`/selectServiceStep2/category/${service.categoryId}`}
          >
            change
          </Link>
        </p>
      )}
      <div className={`${gridStyles.grid} ${styles.datatimePicker}`}>
        <div className={styles.placeholder} />
        <div className={styles.placeholderSmall}>
          <button
            onClick={() => {
              const newStart = start.subtract(1, "days");
              const newEnd = end.subtract(1, "days");
              setStart(newStart);
              setEnd(newEnd);

              getStaffAvailability(
                newStart.format("YYYY-MM-DD"),
                newEnd.format("YYYY-MM-DD")
              ).then(({ staffs }) => {
                setStaffAvailability(staffs);
              });
            }}
          >
            {"<"}
          </button>
        </div>
        <div
          className={`${gridStyles.grid} ${gridStyles.gutter6} ${
            styles.selectTable
          }`}
        >
          {Array.from(moment.range(start, end).by("day")).map(date => (
            <div key={date.format("YYYY-MM-DD")}>
              <div className={`${buttonStyle.btn} ${buttonStyle.btnSmall}`}>
                <span className={styles.dateLabel}>
                  {date.format("YYYY-MM-DD")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            const newStart = start.add(1, "days");
            const newEnd = end.add(1, "days");
            setStart(newStart);
            setEnd(newEnd);

            getStaffAvailability(
              newStart.format("YYYY-MM-DD"),
              newEnd.format("YYYY-MM-DD")
            ).then(({ staffs }) => {
              setStaffAvailability(staffs);
            });
          }}
          className={styles.placeholderSmall}
        >
          <button>{">"}</button>
        </div>
      </div>
      {staffAvailability &&
        staffAvailability.map(staff => (
          <div
            key={staff.id}
            className={`${gridStyles.grid} ${styles.datatimePicker}`}
          >
            <div className={styles.name}>
              <img className={styles.photo} src={staff.photo} />
              <div>{staff.name}</div>
            </div>
            <div className={styles.placeholderSmall} />
            <div
              className={`${gridStyles.grid} ${gridStyles.gutter6} ${
                styles.selectTable
              }`}
            >
              {staff.availables.map(available => (
                <div className={styles.buttonList} key={available.date}>
                  {available.timeSlots.map(timeSlot => (
                    <div key={timeSlot.id}>
                      {timeSlot.isAvailable ? (
                        <Link
                          className={`${buttonStyle.btn} ${
                            buttonStyle.btnInverse
                          } ${buttonStyle.btnSmall}`}
                          to={`/reviewAndBook/service/${
                            match.params.service
                          }/staff/${staff.id}/time/${timeSlot.id}?date=${
                            available.date
                          }`}
                        >
                          {timeSlot.name}
                        </Link>
                      ) : (
                        <div
                          className={`${buttonStyle.btn} ${
                            buttonStyle.btnInverse
                          } ${buttonStyle.btnSmall} ${styles.notAvailable}`}
                        >
                          {timeSlot.name} booked
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.placeholderSmall} />
          </div>
        ))}
    </div>
  );
};

const SelectStaffAndTime = withRouter(SelectStaffAndTimeComponent);

export { SelectStaffAndTime };
