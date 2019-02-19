import * as React from "react";
import { Book } from "./book";
import { ServiceContext } from "../context/serviceContext";

class App extends React.Component {
  render() {
    const { categories, availableDates } = (window as any).__SERVER_DATA__;
    return (
      <ServiceContext.Provider
        value={{
          categories,
          availableDates
        }}
      >
        <Book />
      </ServiceContext.Provider>
    );
  }
}

export { App };
