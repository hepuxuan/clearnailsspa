interface Schedule {
  id: number;
  day: string;
  staff: Staff;
  timeSlot: TimeSlot;
}

interface Staff {
  id: number;
  name: string;
  photo: string;
}

interface TimeSlot {
  id: number;
  name: string;
  start: string;
  end: string;
}

interface TimeSlotAvailability extends Staff {
  isAvailable: boolean;
}

interface StaffAvailability extends Staff {
  id: number;
  name: string;
  availables: {
    date: string;
    timeSlots: TimeSlotAvailability[];
  }[];
}

export { Schedule, Staff, TimeSlot, StaffAvailability, TimeSlotAvailability };
