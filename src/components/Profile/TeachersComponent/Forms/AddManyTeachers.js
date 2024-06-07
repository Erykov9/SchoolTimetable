import React from "react";
import { Box, Button, Stack, TextField, Chip } from "@mui/material";
import CustomAlert from "../../../Alert/CustomAlert";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";
import { useState } from "react";

const AddManyTeachers = observer(() => {
  const [teachers, setTeachers] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [teachersArray, setTeachersArray] = useState([]);

  const handleEnter = (e) => {
    setWarning(false);
    if (e.key === "Enter") {
      e.preventDefault();

      if (teachersArray.includes(e.target.value)) {
        setWarning(`Nauczyciel "${e.target.value}" już istnieje`);
        return;
      }

      setTeachersArray([...teachersArray, e.target.value]);
      setTeachers("");
    }
  };

  const handleChipDelete = (chipLabel) => {
    const newLabelsArray = teachersArray.filter((label) => label !== chipLabel);
    setTeachersArray(newLabelsArray);
  };

  const onSubmit = async () => {
    setError(false);
    setWarning(false);

    if (teachersArray.length === 0) {
      setError("Niepoprawne dane");
      return;
    }

    const response = await SchoolInfoStore.addManyItems(teachersArray, "teachers", "nauczyciele", "teacher");

    if (response?.error) {
      setError(response.errorMessage);
      setTeachers("");
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setTeachers("");
      setTeachersArray([]);
      return;
    }

    setTeachersArray([]);
  };

  return (
    <Box component="form">
      <Stack gap={2} mb={2}>
        <p style={{ fontSize: "12px", opacity: ".6" }}>
          Aby poprawnie dodać wielu nauczycieli, wypich ich nazwy po Enterze
        </p>

        {error && <CustomAlert status="error" message={error} />}
        {warning && <CustomAlert status="warning" message={warning} />}

        <TextField
          id="class-name"
          label="Wpisz etykiety po enterze)"
          variant="outlined"
          value={teachers}
          onChange={(e) => setTeachers(e.target.value)}
          onKeyDown={handleEnter}
        />
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {teachersArray?.map((teacher) => (
            <Chip
              label={teacher}
              key={teacher}
              onDelete={() => handleChipDelete(teacher)}
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

export default AddManyTeachers;
