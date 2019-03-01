import * as React from "react";
import { Category, Service } from "../models/category";
import { StaffAvailability, Staff } from "../models/schedule";

const initValue: {
  categories?: Category[];
  category?: Category;
  servicesByCategory?: Service[];
  services?: Service[];
  staff?: Staff;
  staffAvailability?: StaffAvailability[];
  fetchCategories: () => void;
  fetchServices: (ids: string[]) => void;
  fetchServicesByCategory: (id: string) => void;
  fetchStaffAvailability: (start: string, end: string) => void;
  setStaff: (staff: Staff) => void;
} = {
  categories: null,
  category: null,
  servicesByCategory: null,
  services: null,
  staff: null,
  staffAvailability: null,
  fetchCategories: () => {},
  fetchServices: _ => {},
  fetchServicesByCategory: _ => {},
  fetchStaffAvailability: (_1, _2) => {},
  setStaff: staff => {}
};

const ServiceContext = React.createContext(initValue);

export { ServiceContext };
