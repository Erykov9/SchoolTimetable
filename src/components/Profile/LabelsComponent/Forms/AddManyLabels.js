import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import CustomAlert from "../../../Alert/CustomAlert";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";
import { useState } from "react";

const AddManyLabels = observer(() => {
  const [labels, setLabels] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const onSubmit = async () => {
    setError(false);
    setWarning(false);
    const forbiddenSeparators = /[;'.&-+~`!@#$%^&*()-]/g;

    if (labels.match(forbiddenSeparators)) {
      setError("Niepoprawny separator. Wpisz etykiety oddzielone przecinkiem");
      return;
    }

    if (labels.length === 0) {
      setError("Niepoprawne dane. Wpisz etykiety oddzielone przecinkiem");
      return;
    }

    const labelsToAdd = labels.split(",").map((c) => c.trim());
    const response = await SchoolInfoStore.addManyLabels(labelsToAdd);

    if (response?.error) {
      setError(response.error);
      setLabels("");
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setLabels("");
      return;
    }
  };

  return (
    <Box component="form">
      <Stack gap={2} mb={2}>
        <p style={{ fontSize: "12px", opacity: ".6" }}>
          Aby poprawnie dodać wiele klas, wpisz je oddzielone przecinkiem (np.
          Łatwy, Trudny, Średni itp.)
        </p>
        {error && <CustomAlert status="error" message={error} />}
        {warning && <CustomAlert status="warning" message={warning} />}
        <TextField
          id="class-name"
          label="Wpisz etykiety oddzielone przecinkiem (np. Łatwy, Trudny, Średni itp.)"
          variant="outlined"
          value={labels}
          multiline
          rows={10}
          onChange={(e) => setLabels(e.target.value)}
        />
      </Stack>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Dodaj wiele
      </Button>
    </Box>
  );
});

export default AddManyLabels;
