interface Category {
  id: number;
  name: string;
  image: string;
}

interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  description: string;
  categoryId: number;
}

export { Category, Service };
