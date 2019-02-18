import * as React from "react";
import { Category } from "../models/category";

const initValue: { categories: Category[] } = {
  categories: []
};

const ServiceContext = React.createContext(initValue);

export { ServiceContext };
