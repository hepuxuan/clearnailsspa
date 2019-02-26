import { Service } from "../models/category";
async function getServices(
  categoryId: string | number
): Promise<{ services: Service[] }> {
  const res = await fetch(`/api/service?categoryId=${categoryId}`);
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

async function getService(id: string): Promise<Service> {
  const res = await fetch(`/api/service/${id}`);
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

export { getServices, getService };
