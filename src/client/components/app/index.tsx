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

const App: React.SFC<{}> = () => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [services, setServices] = React.useState([]);
  const [service, setService] = React.useState(null);
  const [staff, setStaff] = React.useState(null);
  const [staffAvailability, setStaffAvailability] = React.useState([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFooterVisible, setIsFooterVisible] = React.useState(true);

  return (
    <ServiceContext.Provider
      value={{
        categories: categories,
        category: category,
        services: services,
        service: service,
        staff: staff,
        staffAvailability: staffAvailability,
        setCategories: setCategories,
        setCategory: setCategory,
        setServices: setServices,
        setService: setService,
        setStaffAvailability: setStaffAvailability,
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
