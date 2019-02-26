import * as React from "react";
import { ServiceContext } from "../../context/serviceContext";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./index.css";
import gridStyles from "../common/grid.css";
import pageStyles from "../common/page.css";
import buttonStyle from "../common/button.css";
import { getServices } from "../../clients/service";
import { getCategories } from "../../clients/category";

const SelectServiceStep2Component: React.SFC<
  RouteComponentProps<{ category: string }>
> = ({ match }) => {
  const { services, setServices, categories, setCategories } = React.useContext(
    ServiceContext
  );
  React.useEffect(() => {
    getServices(match.params.category).then(({ services }) => {
      setServices(services);
    });
  }, [match.params.category]);

  React.useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div className={pageStyles.main}>
      <h1 className={pageStyles.title}>Please select your service:</h1>
      <div className={gridStyles.grid}>
        <div className={`${styles.category} ${styles.buttonList}`}>
          {categories &&
            categories.map(category => (
              <div key={category.id}>
                <Link
                  className={`${buttonStyle.btn} ${
                    category.id !== +match.params.category
                      ? buttonStyle.btnInverse
                      : ""
                  }`}
                  to={`/selectServiceStep2/category/${category.id}`}
                >
                  {category.name}
                </Link>
              </div>
            ))}
        </div>
        <div className={styles.buttonList}>
          {services &&
            services.map(service => (
              <div key={service.id}>
                <Link
                  className={buttonStyle.btn}
                  to={`/selectStaffAndTime/service/${service.id}`}
                >
                  {service.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const SelectServiceStep2 = withRouter(SelectServiceStep2Component);

export { SelectServiceStep2 };
