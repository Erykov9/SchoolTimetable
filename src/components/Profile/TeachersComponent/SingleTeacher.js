import React from 'react';
import {
  TableRow,
  TableCell,
  Button,
  Stack,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

import SchoolInfoStore from '../../../mobx/SchoolInfoStore';
import { toJS } from 'mobx';

const SingleTeacher = ({teacher, index}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: teacher?.name,
  });
  const [error, setError] = useState(false);

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = () => {
    setError(false);
    if (teacherData.name.length === 0 || teacherData.name.trim().length === 0) {
      setError("Nazwa nauczyciela nie może być pusta");
      return;
    }

    const response = SchoolInfoStore.editItem({ ...teacher, name: teacherData.name }, "teachers", "nauczyciel", "teacher");
    if (response?.error) {
      return setError(response.error);
    }

    setIsEdit(false);
    return;
  };
  const handleDelete = () => {
    setError(false);
    const response = SchoolInfoStore.deleteItem(teacher._id, "teachers", "teacher");
    
    if(response?.error) {
      return setError(`${response.errorMessage}. Błąd: ${response.status}` );
    }
    console.log(toJS(teacher._id))
  };

  return (
    <TableRow key={teacherData._id} height={isEdit ? 90 : 60}>
    <TableCell component="th" scope="row" sx={{ padding: "5px 15px" }}>
      {index + 1}
    </TableCell>
    <TableCell component="th" scope="row" sx={{ padding: "5px 15px" }}>
        {isEdit ? (
          <Stack
            justifyContent={"flexStart"}
            alignItems={"center"}
            flexDirection={"row"}
            gap={2}
          >
            <HelpIcon sx={{ color: "grey" }} />
            <TextField
              value={teacherData?.name}
              id={teacher.name}
              label="Edytuj nauczyciela"
              onChange={(e) => setTeacherData({ name: e.target.value })}
              error={error}
            ></TextField>
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        ) : (
          <p>{teacherData.name}</p>
        )}
      </TableCell>
      <TableCell align="right" sx={{ padding: "5px 15px" }}>
        <Stack gap={1} flexDirection={"row"} justifyContent={"flex-end"}>
          {!isEdit ? (
            <Button startIcon={<EditIcon />} onClick={editHandler} />
          ) : (
            <>
              <Button sx={{ color: "grey" }} onClick={editHandler}>
                <RefreshIcon />
              </Button>
              <Divider orientation="vertical" flexItem />

              <Button color="primary" onClick={onSubmit}>
                <CheckIcon />
              </Button>

              <Divider orientation="vertical" flexItem />

              <Button color="error" onClick={() => handleDelete(teacher._id)}>
                <DeleteIcon />
              </Button>
            </>
          )}
        </Stack>
      </TableCell>
  </TableRow>
  );
};

export default SingleTeacher;