import { Category } from "../models/category";
async function getCategories(): Promise<{ categories: Category[] }> {
  const res = await fetch("/api/category");
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`/api/category/${id}`);
  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error();
  }
}

export { getCategories, getCategory };
