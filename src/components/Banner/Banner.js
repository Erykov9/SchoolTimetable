import React from "react";
import styles from "./Banner.module.scss";
import { Button } from "@mui/material";

const Banner = () => {
  return (
    <section id="banner" className={styles.banner}>
      <div className={styles.image}>
        <img src="assets/images/banner1.jpg" alt="banner" />
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>Kreator planu lekcji</h1>
          <h2>Some text or motto or whatever</h2>
          <Button
            variant="contained"
            color="success"
            sx={{ padding: "15px 25px" }}
          >
            Wypróbuj nasz kreator
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
