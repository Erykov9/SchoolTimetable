import React from 'react';
import {
  Button,
  TextField,
  Stack,
  TableRow,
  TableCell,
  Divider,
} from "@mui/material";
import { useState } from "react";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import CustomAlert from "../../../Alert/CustomAlert";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

const AddSubject = ({ subjectLength }) => {
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = async () => {
    setError(false);
    if (subjectName.length === 0 || subjectName.trim().length === 0) {
      setError("Nazwa przedmiotu nie może być pusta");
      return console.log("forbidden");
    }

    const response = await SchoolInfoStore.addItem({ name: subjectName }, "subjects", 'przedmiot', 'lessonType');
    if (response?.error) {
      return setError(response.errorMessage);
    }

    setSubjectName("");
    return;
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {subjectLength + 1}.
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <HelpIcon sx={{ color: "grey" }} />
          <TextField
            value={subjectName}
            id="new_subject"
            label="Dodaj przedmiot"
            onChange={(e) => setSubjectName(e.target.value)}
            error={error}
          ></TextField>
          {error && <CustomAlert status={"error"} message={error} />}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          <Button
            onClick={() => {
              setSubjectName("");
              setError(false);
            }}
            sx={{ color: "grey" }}
          >
            <RefreshIcon />
          </Button>
          <Divider flexItem orientation="vertical" />
          <Button onClick={handleAdd}>
            <AddIcon />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default AddSubject;