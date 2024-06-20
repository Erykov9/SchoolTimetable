import React from "react";
import styles from "./styles.module.scss";
import { Container, Button, TextField, Box, Stack, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AuthStore from "../../mobx/AuthStore";
import CustomAlert from "../Alert/CustomAlert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [saveLoginData, setSaveLoginData] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSaveLoginData = () => {
    setSaveLoginData(!saveLoginData);
  };

  const handleLogin = async () => {
    setError(false);

    const loginData = {
      email,
      password
    };

    const response = await AuthStore.login(loginData);
    if(response.error) {
      setError(true);
      return;
    }
    
    navigate("/profile");
  };

  return (
    <Container>
      <div className={styles.auth}>
        <div className={styles.logo}>
          <h4>LOGO</h4>
        </div>
        <div className={styles.form}>
          <div className={styles.formWrapper}>
            <Stack mb={2}>
              <Typography variant="h3" fontWeight={300} textAlign={'center'}>Logowanie</Typography >
              <Typography variant="body1" textAlign={'center'} fontWeight={300} p={2}>Witaj ponownie!</Typography>
              {error && <CustomAlert status="error" message="Niepoprawne dane logowania" />}
            </Stack>

            <Box component="form">
              <Stack gap={2} mb={2}>
                <TextField
                  label="Email"
                  id="email"
                  placeholder="jankowalski@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Hasło"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Stack>
              <Button variant="contained" onClick={handleLogin}>Login</Button>
            </Box>
            <FormControlLabel control={<Checkbox checked={saveLoginData} onChange={handleSaveLoginData}/>} label="Zapamiętaj mnie"/>
            <p>
              Nie masz jeszcze konta?{" "}
              <NavLink to="/register">Zarejestruj się</NavLink>.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
