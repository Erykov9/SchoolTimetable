import React from 'react';
import { Box, Button, Stack, TextField, Chip } from '@mui/material';
import CustomAlert from '../../../Alert/CustomAlert';
import SchoolInfoStore from '../../../../mobx/SchoolInfoStore';
import { observer } from 'mobx-react';
import { useState } from 'react';

const AddManySubjects = observer(() => {
  const [subjects, setSubjects] = useState('');
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [subjectsArray, setSubjectsArray] = useState([]);

  const handleEnter = (e) => {
    setWarning(false);
    if (e.key === 'Enter') {
      e.preventDefault();

      if (subjectsArray.includes(e.target.value)) {
        setWarning(`Przedmiot "${e.target.value}" już istnieje`);
        return;
      }
      
      setSubjectsArray([...subjectsArray, e.target.value]);
      setSubjects('');
    }
  };

  const handleChipDelete = (chipLabel) => {
    const newLabelsArray = subjectsArray.filter((label) => label !== chipLabel);
    setSubjectsArray(newLabelsArray);
  };

  const onSubmit = async () => {
    setError(false);
    setWarning(false);

    if (subjectsArray.length === 0) {
      setError('Niepoprawne dane.');
      return;
    }

    const response = await SchoolInfoStore.addManySubjects(subjectsArray);

    if (response?.error) {
      setError(response.errorMessage);
      setSubjects('');
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setSubjects('');
      setSubjectsArray([]);
      return;
    }

    setSubjectsArray([]);
  };
  
  return (
    <Box component="form">
    <Stack gap={2} mb={2}>
      <p style={{ fontSize: "12px", opacity: ".6" }}>
        Aby poprawnie dodać wiele klas, wypisz ich nazwy po Enterze
      </p>

      {error && <CustomAlert status="error" message={error} />}
      {warning && <CustomAlert status="warning" message={warning} />}

      <TextField
        id="subject-name"
        label="Wpisz przedmioty oddzielone enterem"
        variant="outlined"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Stack direction="row" gap={1} flexWrap={'wrap'}>
        {subjectsArray?.map((label) => (
          <Chip
            key={label}
            label={label}
            onDelete={() => handleChipDelete(label)}
          />
        ))}
        </Stack>
    </Stack>
    <Button variant="contained" color="primary" onClick={onSubmit}>
      Dodaj wiele
    </Button>
  </Box>
  );
});

export default AddManySubjects;