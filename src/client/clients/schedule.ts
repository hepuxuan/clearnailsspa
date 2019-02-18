import { Schedule } from "../models/schedule";

async function getAvailableSchedule(
  date: string
): Promise<{
  availables: Schedule[];
}> {
  const res = await fetch(`/api/schedule/available?date=${date}`);
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

export { getAvailableSchedule };
