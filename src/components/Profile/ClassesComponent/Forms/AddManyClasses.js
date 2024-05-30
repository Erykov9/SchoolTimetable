import React, { useState } from 'react';
import { TextField, Box, Button, Stack } from '@mui/material';
import CustomAlert from '../../../Alert/CustomAlert';
import SchoolInfoStore from '../../../../mobx/SchoolInfoStore';
import { observer } from 'mobx-react';

const AddManyClasses = observer(() => {
  const [classes, setClasses] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const onSubmit = () => {
    setError(false);
    setWarning(false);
    const forbiddenSeparators = /[;'.&-+~`!@#$%^&*()-]/g;

    if (classes.match(forbiddenSeparators)) {
      setError("Niepoprawny separator. Wpisz klasy oddzielone przecinkiem");
      return;
    }

    if(classes.length === 0) {
      setError("Niepoprawne dane. Wpisz klasy oddzielone przecinkiem");
      return;
    }

    const classesToAdd = classes.split(',').map((c) => c.trim());
    const response = SchoolInfoStore.addManyClasses(classesToAdd);

    if(response?.error) {
      setError(response.error);
      setClasses("");
      return;
    }

    if(response?.warning) {
      setWarning(response.warning);
      setClasses("");
      return;
    }
  };

  return (
    <Box component="form" >
      <Stack gap={2} mb={2}>
        <p style={{fontSize: '12px', opacity: '.6'}}>Aby poprawnie dodać wiele klas, wpisz je oddzielone przecinkiem (np. 1A, 1B, 1C)</p>
        {error && <CustomAlert status="error" message={error} />}
        {warning && <CustomAlert status="warning" message={warning} />}
        <TextField
          id="class-name"
          label="Wpisz klasy oddzielone przecinkiem (np. 1A, 1B, 1C)"
          variant="outlined"
          value={classes}
          multiline
          rows={10}
          onChange={(e) => setClasses(e.target.value)}
        />
        </Stack>
        <Button variant="contained" color="primary" onClick={onSubmit}>Dodaj wiele</Button>
    </Box>
  );
});

export default AddManyClasses;