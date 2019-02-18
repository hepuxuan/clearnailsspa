interface Category {
  id: number;
  name: string;
  services: Service[];
}

interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export { Category, Service };
