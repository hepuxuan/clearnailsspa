import * as React from "react";
import { ServiceContextProvider } from "../../context/ServiceContext";
import routes from "../../../common/routes";
import { Router, Route } from "react-router-dom";
import { history } from "../../history";
import styles from "./index.css";
import { TopNav } from "../common/topNav";
import { Footer } from "../common/footer";
import { ViewContextProvider, ViewContext } from "../../context/ViewContext";
import { MenuList } from "../common/menu";
import "normalize.css";

const Page: React.SFC<{ children: any }> = ({ children }) => {
  const { isMenuOpen, footerHeight, topNavHeight } = React.useContext(
    ViewContext
  );
  return isMenuOpen ? (
    <MenuList />
  ) : (
    <div
      className={styles.mainApp}
      style={{
        minHeight: `calc(100vh - ${footerHeight + topNavHeight}px)`,
        marginBottom: `${footerHeight}px`
      }}
    >
      {children}
    </div>
  );
};
// min-height: calc(100vh - 185px);
//     margin-bottom: 114px;
const App: React.SFC<{}> = () => {
  return (
    <ServiceContextProvider>
      <ViewContextProvider>
        <>
          <TopNav />
          <Router history={history}>
            <>
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  render={() => (
                    <Page>
                      <Component />
                    </Page>
                  )}
                />
              ))}
            </>
          </Router>
          <Footer />
        </>
      </ViewContextProvider>
    </ServiceContextProvider>
  );
};

export { App };
