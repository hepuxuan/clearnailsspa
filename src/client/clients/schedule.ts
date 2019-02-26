import { StaffAvailability } from "../models/schedule";

async function getStaffAvailability(
  start: string,
  end: string
): Promise<{
  staffs: StaffAvailability[];
}> {
  const res = await fetch(`/api/schedule/available?start=${start}&end=${end}`);
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

export { getStaffAvailability };
