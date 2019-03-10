import * as React from "react";
import { useModalState } from "../../../hooks";
import { Modal } from "../../common/modal";
import buttonStyle from "../../common/button.css";
import styles from "./index.css";
import { TimeSlotAvailability, Staff } from "../../../models/schedule";
import moment = require("moment");

const MoreModal: React.SFC<{
  availableSlot: TimeSlotAvailability[];
  onSelect: (
    date: string,
    staff: Staff,
    timeSlot: TimeSlotAvailability
  ) => void;
  date: string;
  staff: Staff;
  selectedDate: string;
  selectedStaff: Staff;
  selectedTimeSlot: TimeSlotAvailability;
}> = ({
  availableSlot,
  selectedDate,
  selectedStaff,
  selectedTimeSlot,
  onSelect,
  date,
  staff
}) => {
  const [isOpen, openModal, closeModal] = useModalState();
  const [_selectedDate, setSelectedDate] = React.useState(selectedDate);
  const [_selectedStaff, setSelectedStaff] = React.useState(selectedStaff);
  const [_selectedTimeSlot, setSelectedTimeSlot] = React.useState(
    selectedTimeSlot
  );
  return (
    <div>
      <a
        onClick={openModal}
        className={`${buttonStyle.btn} ${buttonStyle.utility} ${
          buttonStyle.btnSmall
        }`}
      >
        More
      </a>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className={styles.modalTitle}>{`${
          staff.name
        }'s availability on ${moment(date).format("ddd, MM/DD")}`}</div>
        <div className={styles.date}>
          {availableSlot.map(timeSlot => (
            <div key={timeSlot.id}>
              <a
                onClick={e => {
                  e.preventDefault();

                  setSelectedDate(date);
                  setSelectedStaff(staff);
                  setSelectedTimeSlot(timeSlot);
                }}
                className={`${buttonStyle.btn} ${buttonStyle.utility} ${
                  buttonStyle.btnSmall
                } ${
                  _selectedDate === date &&
                  _selectedStaff.id === staff.id &&
                  _selectedTimeSlot.id === timeSlot.id
                    ? styles.activeLink
                    : ""
                }`}
                role="button"
              >
                {timeSlot.name}
              </a>
            </div>
          ))}
        </div>
        <div className={styles.actionArea}>
          <button
            onClick={() => {
              onSelect(_selectedDate, _selectedStaff, _selectedTimeSlot);
              closeModal();
            }}
            className={`${buttonStyle.btn} ${buttonStyle.action} ${
              buttonStyle.btnLarge
            }`}
          >
            CONFIRM
          </button>
        </div>
      </Modal>
    </div>
  );
};

export { MoreModal };
