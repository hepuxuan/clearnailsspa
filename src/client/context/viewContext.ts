import * as React from "react";

const initValue: {
  isMenuOpen: boolean;
  isFooterVisible: boolean;
  setIsFooterVisible: (value: boolean) => void;
  setIsMenuOpen: (value: boolean) => void;
} = {
  isMenuOpen: false,
  isFooterVisible: true,
  setIsFooterVisible: _ => {},
  setIsMenuOpen: _ => {}
};

const ViewContext = React.createContext(initValue);

export { ViewContext };
