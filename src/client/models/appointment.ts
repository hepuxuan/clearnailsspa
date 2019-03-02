import { Staff, TimeSlot } from "./schedule";
import { Service } from "./category";

interface CreateAppointmentRequest {
  date: string;
  services: string[];
  staffId: number;
  timeSlotId: number;
  email: string;
  name: string;
  phone: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Appointment {
  id: number;
  date: string;
  services: Service[];
  staff: Staff;
  timeSlot: TimeSlot;
  customer: Customer;
  customerId: 1;
}

export { CreateAppointmentRequest, Appointment };
