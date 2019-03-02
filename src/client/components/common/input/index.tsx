import * as React from "react";
import styles from "./index.css";

const TextInput: React.SFC<{
  id: string;
  label: string;
  value: string;
  onChange: any;
  name: string;
}> = ({ id, value, onChange, name, label }) => {
  const [isFocus, setFocus] = React.useState(false);
  const isActive = value || isFocus;
  return (
    <div className={styles.input}>
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        className={isActive ? styles.active : ""}
      />
      <label
        className={isActive ? styles.active : styles.inactive}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export { TextInput };
