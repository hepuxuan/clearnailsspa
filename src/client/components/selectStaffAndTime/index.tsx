import * as React from "react";
import { ServiceContext } from "../../context/serviceContext";
import pageStyles from "../common/page.css";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "./index.css";
import { history } from "../../history";
import buttonStyle from "../common/button.css";
import Moment = require("moment");
import MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
import gridStyles from "../common/grid.css";
import { parse } from "qs";
import { Stepper } from "../common/stepper";
import { ViewContext } from "../../context/viewContext";

const SelectStaffAndTimeComponent: React.SFC<
  RouteComponentProps<{ service: string }>
> = ({ match, location }) => {
  const [start, setStart] = React.useState(moment().add(1, "days"));
  const [end, setEnd] = React.useState(moment().add(7, "days"));

  const {
    services,
    fetchServices,
    fetchStaffAvailability,
    staffAvailability
  } = React.useContext(ServiceContext);

  const { setIsFooterVisible } = React.useContext(ViewContext);

  React.useEffect(() => {
    setIsFooterVisible(false);
    return () => {
      setIsFooterVisible(true);
    };
  }, []);
  React.useEffect(() => {
    const { selected } = parse(location.search, {
      ignoreQueryPrefix: true
    });
    fetchServices(selected);
  }, [match.params.service]);

  React.useEffect(() => {
    fetchStaffAvailability(
      start.format("YYYY-MM-DD"),
      end.format("YYYY-MM-DD")
    );
  }, [start, end]);

  const [selectedStaff, setStaff] = React.useState(null);
  const [selectedTimeSlot, setTimeSlot] = React.useState(null);
  const [selectedDate, setDate] = React.useState(null);

  return (
    <div className={styles.main}>
      <Stepper step={1} />
      <h1 className={pageStyles.title}>
        Please select your technician and time for:
      </h1>
      <div className={styles.subTitle}>
        {services && services.map(service => service.name).join("+")}
      </div>
      <div className={`${gridStyles.grid} ${styles.datatimePicker}`}>
        <div className={styles.placeholder} />
        <button
          className={`${buttonStyle.btn} ${buttonStyle.utility} ${
            styles.leftButton
          }`}
          onClick={() => {
            const newStart = start.subtract(1, "days");
            const newEnd = end.subtract(1, "days");
            setStart(newStart);
            setEnd(newEnd);

            fetchStaffAvailability(
              newStart.format("YYYY-MM-DD"),
              newEnd.format("YYYY-MM-DD")
            );
          }}
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <button
          className={`${buttonStyle.btn} ${buttonStyle.utility} ${
            styles.rightButton
          }`}
          onClick={() => {
            const newStart = start.add(1, "days");
            const newEnd = end.add(1, "days");
            setStart(newStart);
            setEnd(newEnd);

            fetchStaffAvailability(
              newStart.format("YYYY-MM-DD"),
              newEnd.format("YYYY-MM-DD")
            );
          }}
        >
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
        {Array.from(moment.range(start, end).by("day")).map(date => (
          <div className={styles.dateLabel} key={date.format("YYYY-MM-DD")}>
            {date.format("ddd MM/DD")}
          </div>
        ))}
      </div>
      {staffAvailability &&
        staffAvailability.map(staff => (
          <div
            key={staff.id}
            className={`${gridStyles.grid} ${gridStyles.gutter6} ${
              styles.staffRow
            }`}
          >
            <div className={styles.placeholder}>
              <div className={styles.name}>{staff.name}</div>
              <div className={styles.title}>{staff.title}</div>
            </div>
            {staff.availables.map(available => (
              <div className={styles.buttonList} key={available.date}>
                {available.timeSlots.slice(0, 2).map(timeSlot => (
                  <div key={timeSlot.id}>
                    {timeSlot.isAvailable && (
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setDate(available.date);
                          setStaff(staff);
                          setTimeSlot(timeSlot);
                        }}
                        className={`${buttonStyle.btn} ${buttonStyle.utility} ${
                          buttonStyle.btnSmall
                        } ${
                          selectedDate === available.date &&
                          selectedStaff.id === staff.id &&
                          selectedTimeSlot.id === timeSlot.id
                            ? styles.activeLink
                            : ""
                        }`}
                        role="button"
                      >
                        {timeSlot.name}
                      </a>
                    )}
                  </div>
                ))}
                {available.timeSlots.length > 2 && (
                  <div>
                    <a
                      onClick={() => {}}
                      className={`${buttonStyle.btn} ${buttonStyle.utility} ${
                        buttonStyle.btnSmall
                      }`}
                    >
                      More
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      <div className={styles.actionArea}>
        <div className={styles.playback}>
          <div>
            <span className={styles.label}>You've selectedDate: </span>
            <span>
              {services && services.map(service => service.name).join("+")}
            </span>
          </div>
          {selectedStaff && (
            <div>
              <span className={styles.label}>Technician: </span>
              <span>{selectedStaff.name}</span>
            </div>
          )}
          {selectedTimeSlot && (
            <div>
              <span className={styles.label}>Time: </span>
              <span>{selectedTimeSlot.name}</span>
            </div>
          )}
        </div>
        <div className={styles.actionAreaInner}>
          <button
            onClick={() => {}}
            className={`${buttonStyle.btn} ${buttonStyle.action} ${
              buttonStyle.btnLarge
            } ${styles.backButton}`}
          >
            Back
          </button>
          <button
            onClick={() => {
              history.push(
                `/reviewAndBook/service/${match.params.service}/staff/${
                  selectedStaff.id
                }/time/${selectedTimeSlot.id}?date=${selectedDate}`
              );
            }}
            className={`${buttonStyle.btn} ${buttonStyle.action} ${
              buttonStyle.btnLarge
            }`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

const SelectStaffAndTime = withRouter(SelectStaffAndTimeComponent);

export { SelectStaffAndTime };
