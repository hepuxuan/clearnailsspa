import * as React from "react";
import { ServiceContext } from "../../context/serviceContext";
import routes from "../../../common/routes";
import { Router, Route } from "react-router-dom";
import { history } from "../../history";
import styles from "./index.css";
import { TopNav } from "../common/topNav";
import { Footer } from "../common/footer";
import { ViewContext } from "../../context/viewContext";
import { MenuList } from "../common/menu";
import { getCategories } from "../../clients/category";
import { Category, Service } from "../../models/category";
import { getServices, getService } from "../../clients/service";
import "normalize.css";
import { StaffAvailability } from "../../models/schedule";
import { getStaffAvailability } from "../../clients/schedule";

function useCategories(): [Category[], () => void] {
  const [data, setData] = React.useState([]);
  const fetchData = () => {
    getCategories().then(({ categories }) => {
      setData(categories);
    });
  };

  return [data, fetchData];
}

function useServicesByCategory(): [Service[], (id: string) => void] {
  const [data, setData] = React.useState([]);
  const fetchData = (id: string) => {
    getServices(id).then(({ services }) => {
      setData(services);
    });
  };

  return [data, fetchData];
}

function useServices(): [Service[], (ids: string[]) => void] {
  const [data, setData] = React.useState([]);
  const fetchData = (ids: string[]) => {
    Promise.all(ids.map(id => getService(id))).then(services => {
      setData(services);
    });
  };

  return [data, fetchData];
}

function useStaffAvailability(): [
  StaffAvailability[],
  (start: string, end: string) => void
] {
  const [data, setData] = React.useState([]);
  const fetchData = (start: string, end: string) => {
    getStaffAvailability(start, end).then(({ staffs }) => {
      setData(staffs);
    });
  };

  return [data, fetchData];
}

const App: React.SFC<{}> = () => {
  const [categories, fetchCategories] = useCategories();
  const [servicesByCategory, fetchServicesByCategory] = useServicesByCategory();
  const [services, fetchServices] = useServices();
  const [staff, setStaff] = React.useState(null);
  const [staffAvailability, fetchStaffAvailability] = useStaffAvailability();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFooterVisible, setIsFooterVisible] = React.useState(true);

  return (
    <ServiceContext.Provider
      value={{
        categories,
        servicesByCategory,
        services,
        staff: staff,
        staffAvailability: staffAvailability,
        fetchCategories,
        fetchServicesByCategory,
        fetchServices,
        fetchStaffAvailability,
        setStaff: setStaff
      }}
    >
      <ViewContext.Provider
        value={{
          isMenuOpen,
          setIsMenuOpen,
          isFooterVisible,
          setIsFooterVisible
        }}
      >
        <>
          <TopNav />
          <Router history={history}>
            <>
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  render={() => {
                    return isMenuOpen ? (
                      <MenuList />
                    ) : (
                      <div
                        className={`${styles.mainApp} ${
                          !isFooterVisible ? styles.mainAppWithAction : ""
                        }`}
                      >
                        <Component />
                      </div>
                    );
                  }}
                />
              ))}
            </>
          </Router>
          <Footer />
        </>
      </ViewContext.Provider>
    </ServiceContext.Provider>
  );
};

export { App };
