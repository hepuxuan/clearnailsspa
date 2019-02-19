import * as React from "react";
import { Category } from "../models/category";

const initValue: { categories: Category[]; availableDates: string[] } = {
  categories: [],
  availableDates: []
};

const ServiceContext = React.createContext(initValue);

export { ServiceContext };
