import React from "react";
import { Box, Button, Stack, TextField, Chip } from "@mui/material";
import { useState } from "react";
import CustomAlert from "../../../Alert/CustomAlert";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";

const AddManyGroups = observer(() => {
  const [groups, setGroups] = useState("");
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [groupsArray, setGroupsArray] = useState([]);

  const handleEnter = (e) => {
    setWarning(false);
    if (e.key === "Enter") {
      e.preventDefault();

      if (groupsArray.includes(e.target.value)) {
        setWarning(`Grupa "${e.target.value}" już istnieje`);
        return;
      }

      setGroupsArray([...groupsArray, e.target.value]);
      setGroups("");
    }
  };

  const handleChipDelete = (chipGroup) => {
    const newGroupsArray = groupsArray.filter((group) => group !== chipGroup);
    setGroupsArray(newGroupsArray);
  };

  const onSubmit = async () => {
    setError(false);
    setWarning(false);

    if (groupsArray.length === 0) {
      setError("Niepoprawne dane.");
      return;
    }

    const response = await SchoolInfoStore.addManyItems(
      groupsArray,
      "groups",
      "grupy",
      "classGroup"
    );

    if (response?.error) {
      console.log(response);
      setError(response.errorMessage);
      setGroups("");
      return;
    }

    if (response?.warning) {
      setWarning(response.warning);
      setGroups("");
      setGroupsArray([]);
      return;
    }

    setGroupsArray([]);
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
          value={groups}
          onChange={(e) => setGroups(e.target.value)}
          onKeyDown={handleEnter}
        />
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {groupsArray?.map((label) => (
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

export default AddManyGroups;
