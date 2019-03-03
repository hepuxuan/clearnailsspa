import * as React from "react";
import { ServiceContext } from "../../context/ServiceContext";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styles from "./index.css";
import gridStyles from "../common/grid.css";
import pageStyles from "../common/page.css";
import cardStyles from "../common/card.css";
import buttonStyles from "../common/button.css";
import { Stepper } from "../common/stepper";
import { history } from "../../history";
import { ViewContext } from "../../context/ViewContext";
import { stringify } from "qs";
import find from "lodash/find";
import Measure from "react-measure";
import { Service } from "../../models/category";

function handleSelectCategory(e: React.SyntheticEvent<HTMLSelectElement>) {
  history.push(`/selectServiceStep2/category/${e.currentTarget.value}`);
}

const SelectServiceStep2Component: React.SFC<
  RouteComponentProps<{ category: string }>
> = ({ match }) => {
  const {
    servicesByCategory,
    fetchServicesByCategory,
    categories,
    addOnServices,
    fetchCategories,
    fetchAddOnServices
  } = React.useContext(ServiceContext);
  const { setIsFooterVisible, setFooterHeight } = React.useContext(ViewContext);
  React.useEffect(() => {
    fetchServicesByCategory(match.params.category);
  }, [match.params.category]);

  React.useEffect(() => {
    fetchCategories();
    fetchAddOnServices();
    setIsFooterVisible(false);
    return () => {
      setIsFooterVisible(true);
    };
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
          {servicesByCategory &&
            servicesByCategory.map(service => {
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
        </div>
        <div className={styles.subTitle}>ADD-ON SERVICE</div>
        <div className={`${gridStyles.grid} ${gridStyles.gutter6}`}>
          {addOnServices &&
            addOnServices.map(service => {
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
        </div>
      </div>
      <Measure
        onResize={({ entry }) => {
          setFooterHeight(entry.height + 26);
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} className={styles.actionArea}>
            <div className={styles.actionDescription}>
              Now you can schedule Manicure and Pedicure services together!
            </div>
            <button
              onClick={() => {
                history.push(
                  `/selectStaffAndTime?${stringify({
                    selected: selected.map(({ id }) => id)
                  })}`
                );
              }}
              className={`${buttonStyles.btn} ${buttonStyles.action} ${
                buttonStyles.btnLarge
              }`}
            >
              NEXT
            </button>
          </div>
        )}
      </Measure>
    </>
  );
};

const SelectServiceStep2 = withRouter(SelectServiceStep2Component);

const ServiceCard: React.SFC<{
  service: Service;
  selected: Service[];
  setSelected: (services: Service[]) => void;
}> = ({ selected, service, setSelected }) => {
  const ifSelected = find(selected, ({ id }) => id === service.id);
  return (
    <a
      className={`${cardStyles.card} ${styles.serviceCard} ${
        ifSelected ? styles.selected : ""
      }`}
      href="/"
      onClick={e => {
        e.preventDefault();
        if (ifSelected) {
          setSelected(selected.filter(({ id }) => id !== service.id));
        } else {
          setSelected([
            ...selected.filter(
              ({ categoryId }) => service.categoryId !== categoryId
            ),
            service
          ]);
        }
      }}
    >
      <div className={styles.serviceLine1}>
        {service.name}
        <div>
          <span className={styles.price}>${service.price}</span>
          {ifSelected && (
            <i className={`material-icons ${styles.checkIcon}`}>check</i>
          )}
        </div>
      </div>
      <div className={styles.description}>{service.description}</div>
    </a>
  );
};

export { SelectServiceStep2 };
