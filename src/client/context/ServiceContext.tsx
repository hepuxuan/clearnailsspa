import * as React from "react";
import { Category, Service } from "../models/category";
import { StaffAvailability, Staff } from "../models/schedule";
import { useDataFetch } from "../hooks";
import { getCategories } from "../clients/category";
import { getServices, getService } from "../clients/service";
import { getStaffAvailability } from "../clients/schedule";
import { getStaff } from "../clients/staff";
import { Appointment } from "../models/appointment";
import { getAppointment } from "../clients/appointment";

const initValue: {
  categories?: Category[];
  category?: Category;
  servicesByCategory?: Service[];
  services?: Service[];
  addOnServices?: Service[];
  staff?: Staff;
  staffAvailability?: StaffAvailability[];
  appointment?: Appointment;
  fetchCategories: () => void;
  fetchServices: (ids: string[]) => void;
  fetchAddOnServices: () => void;
  fetchServicesByCategory: (id: string) => void;
  fetchStaffAvailability: (start: string, end: string) => void;
  fetchStaff: (id: string) => void;
  fetchAppointment: (id: string) => void;
} = {
  categories: null,
  category: null,
  servicesByCategory: null,
  services: null,
  staff: null,
  staffAvailability: null,
  appointment: null,
  addOnServices: null,
  fetchCategories: () => {},
  fetchServices: _ => {},
  fetchAddOnServices: () => {},
  fetchServicesByCategory: _ => {},
  fetchStaffAvailability: (_1, _2) => {},
  fetchStaff: _ => {},
  fetchAppointment: _ => {}
};

const ServiceContext = React.createContext(initValue);

const ServiceContextProvider: React.SFC<{ children: any }> = ({ children }) => {
  const [categories, fetchCategories] = useDataFetch(getCategories);
  const [servicesByCategory, fetchServicesByCategory] = useDataFetch(
    getServices
  );
  const [services, fetchServices] = useDataFetch((ids: string[]) =>
    Promise.all(ids.map(id => getService(id)))
  );
  const [staffAvailability, fetchStaffAvailability] = useDataFetch(
    getStaffAvailability
  );

  const [appointment, fetchAppointment] = useDataFetch(getAppointment);
  const [staff, fetchStaff] = useDataFetch(getStaff);
  const [addOnServices, fetchAddOnServices] = useDataFetch(() =>
    getServices(3)
  );
  return (
    <ServiceContext.Provider
      value={{
        categories: categories && categories.categories,
        servicesByCategory: servicesByCategory && servicesByCategory.services,
        services,
        staff,
        appointment,
        addOnServices: addOnServices && addOnServices.services,
        staffAvailability: staffAvailability && staffAvailability.staffs,
        fetchCategories,
        fetchServicesByCategory,
        fetchServices,
        fetchStaffAvailability,
        fetchStaff,
        fetchAppointment,
        fetchAddOnServices
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceContextProvider };
