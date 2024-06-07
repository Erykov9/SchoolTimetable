import React, { useState } from "react";
import { TextField, Box, Button, Stack, Chip } from "@mui/material";
import CustomAlert from "../../../Alert/CustomAlert";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";

const AddManyClasses = observer(() => {
  const [classes, setClasses] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [classesArray, setClassesArray] = useState([]);

  const handleEnter = (e) => {
    setWarning(false);
    if (e.key === "Enter") {
      e.preventDefault();

      if (classesArray.includes(e.target.value)) {
        setWarning(`Klasa "${e.target.value}" już istnieje`);
        return;
      }

      setClassesArray([...classesArray, e.target.value]);
      setClasses("");
    }
  };

  const handleChipDelete = (chipLabel) => {
    const newLabelsArray = classesArray.filter((label) => label !== chipLabel);
    setClassesArray(newLabelsArray);
  };

  const onSubmit = async () => {
    setError(false);
    setWarning(false);

    if (classesArray.length === 0) {
      setError("Niepoprawne dane.");
      return;
    }

    const response = await SchoolInfoStore.addManyItems(classesArray, "classes", "klasy", "studentClass");

    if (response?.error) {
      setError(response.errorMessage);
      setClasses("");
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setClasses("");
      setClassesArray([]);
      return;
    }

    setClassesArray([]);
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
          label="Wpisz klasy oddzielone enterem"
          variant="outlined"
          value={classes}
          onChange={(e) => setClasses(e.target.value)}
          onKeyDown={handleEnter}
        />
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {classesArray?.map((singleClass) => (
            <Chip
              key={singleClass}
              label={singleClass}
              onDelete={() => handleChipDelete(singleClass)}
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

export default AddManyClasses;
