import React from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import CustomAlert from '../../../Alert/CustomAlert';
import SchoolInfoStore from '../../../../mobx/SchoolInfoStore';
import { observer } from 'mobx-react';
import { useState } from 'react';


const AddManyTeachers = observer(() => {
  const [teachers, setTeachers] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const onSubmit = async () => {
    setError(false);
    setWarning(false);
    const forbiddenSeparators = /[;'.&-+~`!@#$%^&*()-]/g;

    if (teachers.match(forbiddenSeparators)) {
      setError("Niepoprawny separator. Wpisz nauczycieli oddzielone przecinkiem");
      return;
    }

    if(teachers.length === 0) {
      setError("Niepoprawne dane. Wpisz nauczycieli oddzielone przecinkiem");
      return;
    }

    const teachersToAdd = teachers.split(',').map((c) => c.trim());
    const response = await SchoolInfoStore.addManyTeachers(teachersToAdd);

    if(response?.error) {
      setError(response.error);
      setTeachers("");
      return;
    }

    if(response?.warning) {
      setWarning(response.warning);
      setTeachers("");
      return;
    }
  };

  return (
        <Box component="form">
      <Stack gap={2} mb={2}>
        <p style={{ fontSize: "12px", opacity: ".6" }}>
          Aby poprawnie dodać wielu nauczycieli, wpisz je oddzielone przecinkiem (np. Jan Kowalski, Andrzej Nowak itp.)
        </p>
        {error && <CustomAlert status="error" message={error} />}
        {warning && <CustomAlert status="warning" message={warning} />}
        <TextField
          id="class-name"
          label="Wpisz etykiety oddzielone przecinkiem (np. Jan Kowalski, Andrzej Nowak itp.)"
          variant="outlined"
          value={teachers}
          multiline
          rows={10}
          onChange={(e) => setTeachers(e.target.value)}
        />
      </Stack>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Dodaj wiele
      </Button>
    </Box>
  );
});

export default AddManyTeachers;