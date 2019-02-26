import { Staff } from "../models/schedule";

async function getStaff(staffId: string | number): Promise<Staff> {
  const res = await fetch(`/api/staff/${staffId}`);
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

export { getStaff };
