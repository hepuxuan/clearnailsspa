interface CreateAppointmentRequest {
  date: string;
  serviceId: number;
  scheduleId: number;
  email: string;
  name: string;
  phone: string;
}

export { CreateAppointmentRequest };
