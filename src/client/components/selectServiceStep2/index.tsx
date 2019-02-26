import * as React from "react";
import { ServiceContext } from "../../context/serviceContext";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./index.css";
import gridStyles from "../common/grid.css";
import pageStyles from "../common/page.css";
import buttonStyle from "../common/button.css";
import cardStyles from "../common/card.css";

import { getServices } from "../../clients/service";
import { getCategories } from "../../clients/category";
import { Stepper } from "../common/stepper";

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
    <div className={styles.main}>
      <Stepper step={0} />
      <h1 className={pageStyles.title}>Please select your service:</h1>
      <div className={styles.buttonList}>
        {categories &&
          categories.map(category => (
            <div
              style={{
                backgroundImage: `url("${category.image}")`
              }}
              key={category.id}
            >
              <Link to={`/selectServiceStep2/category/${category.id}`}>
                <div
                  className={`${styles.imageTab}
                  ${
                    +match.params.category !== category.id
                      ? styles.inactiveTab
                      : ""
                  }`}
                >
                  {category.name}
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className={styles.subTitle}>MAIN SERVICE</div>
      <div className={`${gridStyles.grid} ${gridStyles.gutter6}`}>
        {services &&
          services.map(service => (
            <div
              className={`${cardStyles.card} ${styles.serviceCard}`}
              key={service.id}
            >
              <div className={styles.serviceLine1}>
                <Link
                  className={buttonStyle.link}
                  to={`/selectStaffAndTime/service/${service.id}`}
                >
                  {service.name}
                </Link>
                <div className={styles.price}>${service.price}</div>
              </div>
              <div className={styles.description}>{service.description}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

const SelectServiceStep2 = withRouter(SelectServiceStep2Component);

export { SelectServiceStep2 };
