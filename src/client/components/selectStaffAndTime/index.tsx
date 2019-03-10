import * as React from "react";
import { ServiceContext } from "../../context/ServiceContext";
import pageStyles from "../common/page.css";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "./index.css";
import { history } from "../../history";
import buttonStyle from "../common/button.css";
import Moment = require("moment");
import MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
import gridStyles from "../common/grid.css";
import { parse, stringify } from "qs";
import { Stepper } from "../common/stepper";
import { ViewContext } from "../../context/ViewContext";
import Measure from "react-measure";
import { Link } from "react-router-dom";
import { Modal } from "../common/modal";
import { MoreModal } from "./moreModal";

const SelectStaffAndTimeComponent: React.SFC<RouteComponentProps<{}>> = ({
  location
}) => {
  const [start, setStart] = React.useState(moment().add(1, "days"));
  const [end, setEnd] = React.useState(moment().add(7, "days"));
  const { selected } = parse(location.search, {
    ignoreQueryPrefix: true
  });

  const {
    services,
    fetchServices,
    fetchStaffAvailability,
    staffAvailability
  } = React.useContext(ServiceContext);

  const { setIsFooterVisible, setFooterHeight } = React.useContext(ViewContext);

  React.useEffect(() => {
    setIsFooterVisible(false);
    return () => {
      setIsFooterVisible(true);
    };
  }, []);
  React.useEffect(() => {
    fetchServices(selected);
  }, [location.search]);

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
            {staff.availables.map(available => {
              const availableSlot = available.timeSlots.filter(
                t => t.isAvailable
              );

              return (
                <div className={styles.buttonList} key={available.date}>
                  {availableSlot.slice(0, 1).map(timeSlot => (
                    <div key={timeSlot.id}>
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
                    </div>
                  ))}
                  {availableSlot.length > 1 && (
                    <MoreModal
                      selectedDate={selectedDate}
                      selectedStaff={selectedStaff}
                      selectedTimeSlot={selectedTimeSlot}
                      availableSlot={availableSlot}
                      staff={staff}
                      date={available.date}
                      onSelect={(date, staff, timeSlot) => {
                        setDate(date);
                        setStaff(staff);
                        setTimeSlot(timeSlot);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      <Measure
        onResize={({ entry }) => {
          setFooterHeight(entry.height + 26);
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} className={styles.actionArea}>
            <div className={styles.playback}>
              <div>
                <span className={styles.label}>You've selected: </span>
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
              <Link
                to="selectServiceStep1"
                onClick={() => {}}
                className={`${buttonStyle.btn} ${buttonStyle.action} ${
                  buttonStyle.btnLarge
                } ${styles.backButton}`}
              >
                Back
              </Link>
              <button
                onClick={() => {
                  history.push(
                    `/reviewAndBook/staff/${selectedStaff.id}/time/${
                      selectedTimeSlot.id
                    }?${stringify({
                      date: selectedDate,
                      selected: selected
                    })}`
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
        )}
      </Measure>
    </div>
  );
};

const SelectStaffAndTime = withRouter(SelectStaffAndTimeComponent);

export { SelectStaffAndTime };
