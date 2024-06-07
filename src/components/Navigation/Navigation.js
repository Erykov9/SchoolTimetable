import React from "react";
import styles from "./Navigation.module.scss";
import LoginIcon from "@mui/icons-material/Login";
import {Button} from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const isLogged = false;
  const schoolName = "Szkoła nr 6 we Wsi Małej";

  return (
    <nav className={styles.navigation}>
      <Container>
        <div className={styles.desktop}>
          <div className={styles.logo}>
            <h3>LOGO PLACEHOLDER</h3>
          </div>
          <div className={styles.profile}>
            {!isLogged ? (
                <Button startIcon={<LoginIcon/>} variant="contained" color="primary" onClick={() => navigate('/login')}>Logowanie</Button>
            ) : (
              <div className={styles.loggedIn}>
                <p>ZALOGOWANY JAKO:</p>
                <Button>{schoolName}</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
