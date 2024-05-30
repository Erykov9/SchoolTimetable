import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import CustomAlert from "../../../Alert/CustomAlert";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";
import { useState } from "react";

const AddManyClassrooms = observer(() => {
  const [classrooms, setClassrooms] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const onSubmit = async () => {
    setError(false);
    setWarning(false);
    const forbiddenSeparators = /[;'.&-+~`!@#$%^&*()-]/g;

    if (classrooms.match(forbiddenSeparators)) {
      setError("Niepoprawny separator. Wpisz klasy oddzielone przecinkiem");
      return;
    }

    if (classrooms.length === 0) {
      setError("Niepoprawne dane. Wpisz klasy oddzielone przecinkiem");
      return;
    }

    const classroomsToAdd = classrooms.split(",").map((c) => c.trim());
    const response = await SchoolInfoStore.addManyClassrooms(classroomsToAdd);

    if (response?.error) {
      setError(response.error);
      setClassrooms("");
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setClassrooms("");
      return;
    }
  };

  return (
    <Box component="form">
      <Stack gap={2} mb={2}>
        <p style={{ fontSize: "12px", opacity: ".6" }}>
          Aby poprawnie dodać wiele klas, wpisz je oddzielone przecinkiem (np. 200, 201, Sala gimnastyczna itp.)
        </p>
        {error && <CustomAlert status="error" message={error} />}
        {warning && <CustomAlert status="warning" message={warning} />}
        <TextField
          id="class-name"
          label="Wpisz klasy oddzielone przecinkiem (np. 200, 201, Sala gimnastyczna itp.)"
          variant="outlined"
          value={classrooms}
          multiline
          rows={10}
          onChange={(e) => setClassrooms(e.target.value)}
        />
      </Stack>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Dodaj wiele
      </Button>
    </Box>
  );
});

export default AddManyClassrooms;