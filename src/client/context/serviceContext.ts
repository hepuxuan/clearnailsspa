import * as React from "react";
import { Category, Service } from "../models/category";
import { StaffAvailability, Staff } from "../models/schedule";

const initValue: {
  categories?: Category[];
  category?: Category;
  services?: Service[];
  service?: Service;
  staff?: Staff;
  staffAvailability?: StaffAvailability[];
  setCategories: (categories: Category[]) => void;
  setCategory: (category: Category) => void;
  setServices: (services: Service[]) => void;
  setService: (service: Service) => void;
  setStaffAvailability: (staffAvailability: StaffAvailability[]) => void;
  setStaff: (staff: Staff) => void;
} = {
  categories: null,
  category: null,
  services: null,
  service: null,
  staff: null,
  staffAvailability: null,
  setCategories: categories => {},
  setCategory: category => {},
  setServices: services => {},
  setService: service => {},
  setStaffAvailability: staffAvailability => {},
  setStaff: staff => {}
};

const ServiceContext = React.createContext(initValue);

export { ServiceContext };
