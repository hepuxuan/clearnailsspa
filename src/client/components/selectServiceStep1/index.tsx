import * as React from "react";
import { ServiceContext } from "../../context/ServiceContext";
import { Link } from "react-router-dom";
import pageStyles from "../common/page.css";
import styles from "./index.css";
import { Stepper } from "../common/stepper";

const SelectServiceStep1: React.SFC<{}> = () => {
  const { categories, fetchCategories } = React.useContext(ServiceContext);

  React.useEffect(fetchCategories, []);

  return (
    <>
      <Stepper step={0} />
      <h1 className={pageStyles.title}>Please select your service:</h1>
      <div className={styles.buttonList}>
        {categories &&
          categories.map(category => (
            <Link
              key={category.id}
              style={{
                backgroundImage: `url("${category.image}")`
              }}
              to={`/selectServiceStep2/category/${category.id}`}
            >
              {category.name}
            </Link>
          ))}
      </div>
      <div className={`${pageStyles.subTitle} ${styles.subTitle}`}>
        You can schedule up to 2 service in one booking
      </div>
    </>
  );
};

export { SelectServiceStep1 };
