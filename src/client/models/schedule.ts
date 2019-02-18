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

export { Schedule, Staff, TimeSlot };
