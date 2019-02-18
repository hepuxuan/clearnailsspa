import * as React from "react";
import { Book } from "./book";
import { ServiceContext } from "../context/serviceContext";

class App extends React.Component {
  render() {
    return (
      <ServiceContext.Provider
        value={{
          categories: (window as any).__SERVER_DATA__.categories
        }}
      >
        <Book />
      </ServiceContext.Provider>
    );
  }
}

export { App };
