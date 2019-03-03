import { Category } from "../models/category";
async function getCategories(): Promise<{ categories: Category[] }> {
  const res = await fetch("/api/category");
  if (res.status === 200) {
    const categories = await res.json();
    return {
      // remove ads-on services
      categories: categories.categories.filter(({ id }) => id !== 3)
    };
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
