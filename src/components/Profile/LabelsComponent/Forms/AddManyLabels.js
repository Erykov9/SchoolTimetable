import React from "react";
import { Box, Button, Stack, TextField, Chip } from "@mui/material";
import CustomAlert from "../../../Alert/CustomAlert";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";
import { useState } from "react";

const AddManyLabels = observer(() => {
  const [labels, setLabels] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [labelsArray, setLabelsArray] = useState([]);

  const handleEnter = (e) => {
    setWarning(false);
    if (e.key === "Enter") {
      e.preventDefault();

      if (labelsArray.includes(e.target.value)) {
        setWarning(`Etykieta "${e.target.value}" już istnieje`);
        return;
      }

      setLabelsArray([...labelsArray, e.target.value]);
      setLabels("");
    }
  };

  const handleChipDelete = (chipLabel) => {
    const newLabelsArray = labelsArray.filter((label) => label !== chipLabel);
    setLabelsArray(newLabelsArray);
  };

  const onSubmit = async () => {
    setError(false);
    setWarning(false);

    if (labelsArray.length === 0) {
      setError("Niepoprawne dane.");
      return;
    }

    const response = await SchoolInfoStore.addManyItems(
      labelsArray,
      "labels",
      "etykiety",
      "lessonLabel"
    );

    if (response?.error) {
      console.log(response);
      setError(response.errorMessage);
      setLabels("");
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setLabels("");
      setLabelsArray([]);
      return;
    }

    setLabelsArray([]);
  };

  return (
    <Box component="form">
      <Stack gap={2} mb={2}>
        <p style={{ fontSize: "12px", opacity: ".6" }}>
          Aby dodać etykiety, wypisz ich nazwy po Enterze
        </p>

        {error && <CustomAlert status="error" message={error} />}
        {warning && <CustomAlert status="warning" message={warning} />}

        <TextField
          id="label-name"
          label="Wpisz etykiety po enterze"
          variant="outlined"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
          onKeyDown={handleEnter}
        />
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {labelsArray?.map((label) => (
            <Chip
              label={label}
              key={label}
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

export default AddManyLabels;
