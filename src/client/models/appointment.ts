interface CreateAppointmentRequest {
  date: string;
  services: number[];
  staffId: number;
  timeSlotId: number;
  email: string;
  name: string;
  phone: string;
}

interface Appointment {
  id: number;
  date: string;
  services: number[];
  staffId: number;
  timeSlotId: number;
  customerId: 1;
}

export { CreateAppointmentRequest, Appointment };
