import React from "react";
import {
  TableRow,
  TableCell,
  Button,
  Stack,
  Divider,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpIcon from "@mui/icons-material/Help";

import SchoolInfoStore from "../../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";

const SingleClass = observer(({ schoolClass, index }) => {
  const { groups } = SchoolInfoStore;

  const [isEdit, setIsEdit] = useState(false);
  const [className, setClassName] = useState({ name: schoolClass?.name });
  const [error, setError] = useState(false);

  const groupsOnClasses = groups.data.filter(
    (group) => group.student_class_id.$oid === schoolClass._id.$oid
  );

  const onSubmit = async () => {
    setError(false);
    if (className.name.length === 0 || className.name.trim().length === 0) {
      setError("Nazwa klasy nie może być pusta");
      return;
    }

    const response = await SchoolInfoStore.editClass({
      ...className,
      id: schoolClass.name,
    });
    if (response?.error) {
      return setError(response.error);
    }

    setIsEdit(false);
    return;
  };

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async (id) => {
    setError(false);
    const response = await SchoolInfoStore.deleteItem(
      id,
      "classes",
      "studentClass"
    );

    if (response?.error) {
      return setError(`${response.errorMessage}. Błąd: ${response.status}`);
    }
  };

  return (
    <TableRow key={schoolClass.name} height={isEdit ? 90 : 60}>
      <TableCell component="th" scope="row" sx={{ padding: "5px 15px" }}>
        {index + 1}.
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
              value={className?.name}
              id={schoolClass.name}
              label="Edytuj klasę"
              onChange={(e) => setClassName({ name: e.target.value })}
              error={error}
            ></TextField>
            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        ) : (
          <p>{schoolClass.name}</p>
        )}
      </TableCell>
      <TableCell>
        <Stack direction={"row"} gap={2}>
          {groupsOnClasses.length === 0 ? <p>Brak przypisanych grup</p>: groupsOnClasses.map((group) => (
            <Chip key={`group-${group.name}`} label={group.name}></Chip>
          ))}
        </Stack>
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

              <Button
                color="error"
                onClick={() => handleDelete(schoolClass._id)}
              >
                <DeleteIcon />
              </Button>
            </>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
});

export default SingleClass;
