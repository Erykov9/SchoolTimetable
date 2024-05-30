import React from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  TableRow,
  TableCell,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import SchoolInfoStore from "../../../../mobx/SchoolInfoStore";
import CustomAlert from "../../../Alert/CustomAlert";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";


const AddTeacher = ({teacherLength}) => {
  const [teacherName, setTeacherName] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = async () => {
    setError(false);
    if (teacherName.length === 0 || teacherName.trim().length === 0) {
      setError("Nazwa nauczyciela nie może być pusta");
      return console.log("forbidden");
    }

    const response = await SchoolInfoStore.addTeacher({ name: teacherName });
    if (response?.error) {
      return setError(response.errorMessage);
    }

    setTeacherName("");
    return;
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {teacherLength + 1}.
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <HelpIcon sx={{ color: "grey" }} />
          <TextField
            value={teacherName}
            id="new_label"
            label="Dodaj nauczyciela"
            onChange={(e) => setTeacherName(e.target.value)}
            error={error}
          ></TextField>
          {error && <CustomAlert status={"error"} message={error} />}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          <Button
            onClick={() => {
              setTeacherName("");
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

export default AddTeacher;