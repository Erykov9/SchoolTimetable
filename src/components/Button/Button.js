import React from "react";
import styles from "./Button.module.scss";

const Button = ({ title, cb, children, type, icon, isTransparent = false }) => {
  const btnValue = children ? children : title;

  const onClick = (e) => {
    e.preventDefault();
    cb();
  };

  return (
    <button
      className={isTransparent ? styles.button_transparent : styles.button}
      onClick={cb && onClick}
      type={type || "button"}
    >
      <span>
        {icon}{" "}{btnValue?.toUpperCase()}
      </span>
    </button>
  );
};

export default Button;
