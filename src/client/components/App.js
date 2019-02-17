import React from "react";
import styles from "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <h1 className={styles.title}>Clear Nails Spa</h1>
        <label>
          Pick a service:
          <select>
            {window.__SERVER_DATA__.services.map(service => (
              <option key={service.id}>
                {service.name}:${service.price}
              </option>
            ))}
          </select>
        </label>
      </>
    );
  }
}

export { App };
