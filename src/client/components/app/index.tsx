import * as React from "react";
import { ServiceContext } from "../../context/serviceContext";
import routes from "../../../common/routes";
import { Router, Route } from "react-router-dom";
import { Category, Service } from "../../models/category";
import { StaffAvailability, Staff } from "../../models/schedule";
import { history } from "../../history";
import styles from "./index.css";
import { TopNav } from "../common/topNav";
import { Footer } from "../common/footer";
import { Stepper } from "../common/stepper";

class App extends React.Component<
  {},
  {
    categories?: Category[];
    category?: Category;
    services?: Service[];
    service?: Service;
    staff?: Staff;
    staffAvailability?: StaffAvailability[];
  }
> {
  public state = {
    categories: null,
    category: null,
    services: null,
    service: null,
    staff: null,
    staffAvailability: null
  };

  public setCategories = (categories: Category[]) => {
    this.setState({
      categories
    });
  };

  public setCategory = (category: Category) => {
    this.setState({
      category
    });
  };

  public setServices = (services: Service[]) => {
    this.setState({
      services
    });
  };

  public setStaff = async (staff: Staff) => {
    this.setState({
      staff
    });
  };

  public setService = async (service: Service) => {
    this.setState({
      service
    });
  };

  public setStaffAvailability = async (staffs: StaffAvailability[]) => {
    this.setState({
      staffAvailability: staffs
    });
  };

  render() {
    return (
      <ServiceContext.Provider
        value={{
          categories: this.state.categories,
          category: this.state.category,
          services: this.state.services,
          service: this.state.service,
          staff: this.state.staff,
          staffAvailability: this.state.staffAvailability,
          setCategories: this.setCategories,
          setCategory: this.setCategory,
          setServices: this.setServices,
          setService: this.setService,
          setStaffAvailability: this.setStaffAvailability,
          setStaff: this.setStaff
        }}
      >
        <>
          <TopNav />
          <div className={styles.mainApp}>
            <Router history={history}>
              <>
                {routes.map(({ path, component }) => (
                  <Route key={path} path={path} component={component} />
                ))}
              </>
            </Router>
          </div>
          <Footer />
        </>
      </ServiceContext.Provider>
    );
  }
}

export { App };
