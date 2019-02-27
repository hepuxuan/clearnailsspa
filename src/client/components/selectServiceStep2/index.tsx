import * as React from "react";
import { ServiceContext } from "../../context/serviceContext";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./index.css";
import gridStyles from "../common/grid.css";
import pageStyles from "../common/page.css";
import cardStyles from "../common/card.css";
import buttonStyles from "../common/button.css";

import { getServices } from "../../clients/service";
import { getCategories } from "../../clients/category";
import { Stepper } from "../common/stepper";
import { history } from "../../history";
import { ViewContext } from "../../context/viewContext";

function handleSelectCategory(e: React.SyntheticEvent<HTMLSelectElement>) {
  history.push(`/selectServiceStep2/category/${e.currentTarget.value}`);
}

const SelectServiceStep2Component: React.SFC<
  RouteComponentProps<{ category: string }>
> = ({ match }) => {
  const { services, setServices, categories, setCategories } = React.useContext(
    ServiceContext
  );
  const { setIsFooterVisible } = React.useContext(ViewContext);
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

  React.useEffect(() => {
    setIsFooterVisible(false);
  }, []);

  const [selected, setSelected] = React.useState([]);

  return (
    <>
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
        <div className={styles.selectServiceWrapper}>
          <select
            onChange={handleSelectCategory}
            value={match.params.category}
            className={styles.selectService}
          >
            {categories &&
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          <div className={styles.downArray}>
            <i className="material-icons">keyboard_arrow_down</i>
          </div>
        </div>
        <div className={styles.subTitle}>MAIN SERVICE</div>
        <div className={`${gridStyles.grid} ${gridStyles.gutter6}`}>
          {services &&
            services.map(service => {
              const ifSelected = selected.indexOf(service.id) !== -1;
              return (
                <a
                  className={`${cardStyles.card} ${styles.serviceCard} ${
                    ifSelected ? styles.selected : ""
                  }`}
                  key={service.id}
                  href="/"
                  onClick={e => {
                    e.preventDefault();
                    if (selected.indexOf(service.id) !== -1) {
                      setSelected(selected.filter(id => id !== service.id));
                    } else {
                      setSelected([...selected, service.id]);
                    }
                  }}
                >
                  <div className={styles.serviceLine1}>
                    {service.name}
                    <div>
                      <span className={styles.price}>${service.price}</span>
                      {ifSelected && (
                        <i className={`material-icons ${styles.checkIcon}`}>
                          check
                        </i>
                      )}
                    </div>
                  </div>
                  <div className={styles.description}>
                    {service.description}
                  </div>
                </a>
              );
            })}
        </div>
      </div>
      <div className={styles.actionArea}>
        <div className={styles.actionDescription}>
          Now you can schedule Manicure and Pedicure services together!
        </div>
        <button className={`${buttonStyles.btn} ${buttonStyles.btnLarge}`}>
          NEXT
        </button>
      </div>
    </>
  );
};

const SelectServiceStep2 = withRouter(SelectServiceStep2Component);

export { SelectServiceStep2 };
