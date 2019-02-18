import { CreateAppointmentRequest } from "../models/appointment";

async function createAppointment(
  request: CreateAppointmentRequest
): Promise<CreateAppointmentRequest> {
  const res = await fetch(`/api/appointment`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

export { createAppointment };
