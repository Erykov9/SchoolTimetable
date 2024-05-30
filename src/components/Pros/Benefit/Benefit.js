import React from "react";
import styles from "../Benefits.module.scss";

const Benefit = ({ icon, p, span }) => {
  return (
    <div className={styles.benefit}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <p>{p}</p>
        <span>{span}</span>
      </div>
    </div>
  );
};

export default Benefit;
