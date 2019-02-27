import * as React from "react";
import styles from "./index.css";
import { ViewContext } from "../../../context/viewContext";

const MenuIcon: React.SFC<{}> = () => {
  const { isMenuOpen, setIsMenuOpen } = React.useContext(ViewContext);
  return (
    <div className={styles.buttonBase}>
      {isMenuOpen ? (
        <button
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <i className="material-icons">close</i>
        </button>
      ) : (
        <button
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <i className="material-icons">menu</i>
        </button>
      )}
    </div>
  );
};

const MenuList: React.SFC<{}> = () => {
  return (
    <div className={styles.linkList}>
      <div>
        <a href="/home">Home</a>
      </div>
      <div>
        <a href="/about">About Us</a>
      </div>
      <div>
        <a href="/services">Services</a>
      </div>
      <div>
        <a className={styles.active} href="/booking">
          Booking
        </a>
      </div>
      <div>
        <a href="/contact">Contact Us</a>
      </div>
    </div>
  );
};

export { MenuIcon, MenuList };
