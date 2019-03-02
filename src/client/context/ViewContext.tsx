import * as React from "react";

const initValue: {
  isMenuOpen: boolean;
  isFooterVisible: boolean;
  setIsFooterVisible: (value: boolean) => void;
  setIsMenuOpen: (value: boolean) => void;
  topNavHeight: number;
  footerHeight: number;
  setTopNavHeight: (value: number) => void;
  setFooterHeight: (value: number) => void;
} = {
  isMenuOpen: false,
  isFooterVisible: true,
  setIsFooterVisible: _ => {},
  setIsMenuOpen: _ => {},
  topNavHeight: 0,
  footerHeight: 0,
  setTopNavHeight: _ => {},
  setFooterHeight: _ => {}
};

const ViewContext = React.createContext(initValue);

const ViewContextProvider: React.SFC<{ children: any }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFooterVisible, setIsFooterVisible] = React.useState(true);
  const [topNavHeight, setTopNavHeight] = React.useState(0);
  const [footerHeight, setFooterHeight] = React.useState(0);
  return (
    <ViewContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isFooterVisible,
        setIsFooterVisible,
        topNavHeight,
        footerHeight,
        setTopNavHeight,
        setFooterHeight
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export { ViewContext, ViewContextProvider };
