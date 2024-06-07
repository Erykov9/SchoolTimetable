import React from "react";
import { Box, Button, Stack, TextField, Chip } from "@mui/material";
import CustomAlert from "../../../Alert/CustomAlert";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";
import { useState } from "react";

const AddManyClassrooms = observer(() => {
  const [classrooms, setClassrooms] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [classroomsArray, setClassroomsArray] = useState([]);

  const handleEnter = (e) => {
    setWarning(false);
    if (e.key === "Enter") {
      e.preventDefault();

      if (classroomsArray.includes(e.target.value)) {
        setWarning(`Klasa "${e.target.value}" już istnieje`);
        return;
      }

      setClassroomsArray([...classroomsArray, e.target.value]);
      setClassrooms("");
    }
  };

  const handleChipDelete = (chipLabel) => {
    const newLabelsArray = classroomsArray.filter((label) => label !== chipLabel);
    setClassroomsArray(newLabelsArray);
  };

  const onSubmit = async () => {
    setError(false);
    setWarning(false);
    
    if (classroomsArray.length === 0) {
      setError("Niepoprawne dane.");
      return;
    }

    const response = await SchoolInfoStore.addManyItems(classroomsArray, "classRooms", "klasy", "classroom");

    if (response?.error) {
      setError(response.errorMessage);
      setClassrooms("");
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setClassrooms("");
      setClassroomsArray([]);
      return;
    }

    setClassroomsArray([]);
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
          id="class-name"
          label="Wpisz klasy oddzielone przecinkiem (np. 200, 201, Sala gimnastyczna itp.)"
          variant="outlined"
          value={classrooms}
          onChange={(e) => setClassrooms(e.target.value)}
          onKeyDown={handleEnter}
        />

        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
        {classroomsArray?.map((label) => (
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

export default AddManyClassrooms;